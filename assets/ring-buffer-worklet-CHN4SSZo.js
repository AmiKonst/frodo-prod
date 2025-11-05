import Module from './ring-buffer-static/variable-buffer-kernel.wasmmodule.js';
import { HeapAudioBuffer, RingBuffer } from './ring-buffer-static/wasm-audio-helper.js';

class RingBufferWorklet extends AudioWorkletProcessor {
    constructor(options) {
        super();

        this._kernelBufferSize = options.processorOptions.kernelBufferSize;
        this._channelCount = options.processorOptions.channelCount;
        this._sampleRate = 48000;

        // --- Параметры буфера ---
        const bufferDurationSec = 16; // 16 секунд
        const bufferFrames = Math.floor(this._sampleRate * bufferDurationSec);

        this._inputRingBuffer = new RingBuffer(bufferFrames, this._channelCount);
        this._outputRingBuffer = new RingBuffer(bufferFrames, this._channelCount);

        this._needMoreThresholdSec = 8;      // 🔹 Порог в секундах для "needMoreData"
        // this._needMoreIntervalMs = 1000;     // 🔹 Минимальный интервал между повторными событиями
        // this._lastNeedMoreAt = 0;            // 🔹 Время последнего вызова

        // --- Heap буферы для wasm ---
        this._heapInputBuffer = new HeapAudioBuffer(Module, this._kernelBufferSize, this._channelCount);
        this._heapOutputBuffer = new HeapAudioBuffer(Module, this._kernelBufferSize, this._channelCount);

        // --- WASM ядро ---
        this._kernel = new Module.VariableBufferKernel(this._kernelBufferSize);

        // Флаг паузы
        this._paused = false;

        // Массив Float32Array по каналам
        this._lastOutput = [];

        // Для отслеживания положения
        this._playedFrames = 0;
        this._lastReportedSeconds = 0;
        this._reportIntervalSec = 1; // сообщаем только при изменении на ≥1 сек


        this._fadeInEnabled = false;
        this._fadeInDuration = 3; // секунд
        this._fadeOutEnabled = false;
        this._fadeOutDuration = 3; // секунд
        this._fadeOutBuffers = []; // массив активных fadeOut буферов

        function tryFlushResidual() {
            if (!this._residualChunk) return;

            const rb = this._inputRingBuffer;
            const K = this._kernelBufferSize;
            const framesFree = Math.max(0, rb._length - rb.framesAvailable);

            if (framesFree < K) {
                // нет места даже на один блок
                return;
            }

            // сколько полных блоков мы можем записать прямо сейчас
            const maxBlocksBySpace = Math.floor(framesFree / K);
            const framesInResidual = this._residualChunk[0].length;
            const fullBlocksInResidual = Math.floor(framesInResidual / K);
            const blocksToWrite = Math.min(maxBlocksBySpace, fullBlocksInResidual);
            const framesToWrite = blocksToWrite * K;

            if (blocksToWrite <= 0) return;

            // подготовим subChunk и запишем
            const subChunk = this._residualChunk.map(ch => ch.subarray(0, framesToWrite));
            rb.push(subChunk);

            // обновим residual (оставшийся хвост)
            const leftover = framesInResidual - framesToWrite;
            if (leftover > 0) {
                this._residualChunk = this._residualChunk.map(ch => ch.subarray(framesToWrite));
            } else {
                this._residualChunk = null;
            }

            return true;
        }


        // --- validate incoming chunk ---
        function validateChunk(chunk) {
            const frames = chunk[0].length;
            for (let ch = 0; ch < chunk.length; ch++) {
                const arr = chunk[ch];
                if (!arr || arr.length !== frames) {
                    return { ok: false, reason: 'bad_length' };
                }

                // quick NaN/Inf check on boundaries and some samples (not every sample to save CPU)
                if (!isFinite(arr[0]) || !isFinite(arr[frames-1])) {
                    return { ok: false, reason: 'nan_inf_edge' };
                }

                // sample a few points
                for (let i = 0; i < Math.min(8, frames); i++) {
                    if (!isFinite(arr[i])) {
                        return { ok: false, reason: 'nan_inf_sample' };
                    }
                }
            }

            return { ok: true };
        }


        this.clear = () => {
            this._paused = true;
            this._shouldFadeInNextChunk = true;

            // полностью очистить все ringbuffers
            this._inputRingBuffer.clear();
            this._outputRingBuffer.clear();

            // сброс состояния ядра и кэшей
            this._residualChunk = null;
            this._lastOutput = null;
            this._lastSample = null;
            this._staleCount = 0;
            this._needMore = false;

            // безопасно очистить текущий выход (на случай, если process уже крутится)
            if (this._heapOutputBuffer) {
                const out = this._heapOutputBuffer.getChannelData();
                for (let ch = 0; ch < out.length; ch++) out[ch].fill(0);
            }

            // Количество проигранного
            this._playedFrames = 0;
            this._lastReportedSeconds = 0;
        }


        this.port.onmessage = (event) => {
            const data = event.data;

            switch (data.command) {
                case 'pushChunk': {
                    try {
                        const chunk = data.chunk; // массив Float32Array по каналам
                        const K = this._kernelBufferSize;


                        // если есть остаток от прошлого раза — добавляем его в начало
                        if (this._residualChunk) {
                            for (let ch = 0; ch < this._channelCount; ch++) {
                                const old = this._residualChunk[ch];
                                const combined = new Float32Array(old.length + chunk[ch].length);
                                combined.set(old, 0);
                                combined.set(chunk[ch], old.length);
                                chunk[ch] = combined;
                            }
                            this._residualChunk = null;
                        }

                        const frames = chunk[0].length;

                        const validation = validateChunk(chunk);
                        if (!validation.ok) {
                            this._residualChunk = chunk.map(ch => ch.slice());
                            break;
                        }


                        const fullBlocks = Math.floor(frames / K);

                        // --- если весь чанк меньше одного блока — просто сохраняем остаток ---
                        if (fullBlocks === 0) {
                            this._residualChunk = chunk.map(ch => ch.slice());
                            break;
                        }


                        const framesToWrite = fullBlocks * K;
                        const rb = this._inputRingBuffer;
                        const framesFree = rb._length - rb.framesAvailable;

                        // --- если есть место хотя бы на один блок ---
                        const writableFrames = Math.min(framesToWrite, Math.floor(framesFree / K) * K);

                        if (writableFrames > 0) {
                            const subChunk = chunk.map(ch => ch.subarray(0, writableFrames));

                            // --- FADING LOGIC ---
                            if (this._fadeInEnabled && this._shouldFadeInNextChunk) {
                                const fadeInFrames = Math.min(
                                    writableFrames,
                                    Math.floor(this._fadeInDuration * sampleRate)
                                );
                                for (let ch = 0; ch < this._channelCount; ch++) {
                                    const data = subChunk[ch];
                                    for (let i = 0; i < fadeInFrames; i++) {
                                        const gain = i / fadeInFrames;
                                        data[i] *= gain;
                                    }
                                }
                                this._shouldFadeInNextChunk = false;
                            }

                            rb.push(subChunk);


                            const leftover = frames - writableFrames;
                            if (leftover > 0) {
                                this._residualChunk = chunk.map(ch => ch.subarray(writableFrames));
                            } else {
                                this._residualChunk = null;
                            }
                        } else {
                            console.warn(`[pushChunk] buffer full (free=${framesFree}, need=${framesToWrite})`);
                            this._residualChunk = chunk.map(ch => ch.slice());
                        }

                        delete this._needMore;
                        this._paused = false;
                    } catch (err) {}
                    break;
                }

                case 'strongClear':
                    this.clear();
                    break;

                case 'clear':
                    if (!this._fadeOutEnabled) {
                        this.clear();
                        break;
                    }

                    // --- fadeOut включён ---
                    const framesAvailable = this._outputRingBuffer.framesAvailable;
                    const maxFrames = Math.floor(this._sampleRate * this._fadeOutDuration);
                    const framesToCopy = Math.min(framesAvailable, maxFrames);

                    if (framesToCopy > 0) {
                        const temp = [];
                        for (let ch = 0; ch < this._channelCount; ch++) {
                            temp[ch] = new Float32Array(framesToCopy);
                        }
                        this._outputRingBuffer.pull(temp);

                        this._fadeOutBuffers.push({
                            data: temp,
                            position: 0,
                            totalFrames: framesToCopy
                        });
                    }

                    this.clear();
                    break;

                case 'setCrossfadeDuration':
                    if (data > 0) {
                        this._fadeInDuration = +data || 3;
                        this._fadeOutDuration = +data || 3;
                    }
                    break;

                case 'enableCrossfade':
                    this._fadeInEnabled = true;
                    this._fadeOutEnabled = true;
                    break;

                case 'disableCrossfade':
                    this._fadeInEnabled = false;
                    this._fadeOutEnabled = false;
                    break;

                case 'pause':
                    this._paused = true;
                    break;

                case 'resume':
                    this._paused = false;
                    break;
            }
        };
    }

    process(inputs, outputs) {
        const output = outputs[0];
        const frames = output[0].length; // обычно 128
        const channels = output.length;


        if (this._paused) {
            // обнуляем выход
            for (let ch = 0; ch < channels; ch++) {
                output[ch].fill(0);
            }

            // воспроизводим fadeOut буферы
            if (this._fadeOutBuffers?.length > 0) {
                for (let i = this._fadeOutBuffers.length - 1; i >= 0; i--) {
                    const fb = this._fadeOutBuffers[i];
                    const remaining = fb.totalFrames - fb.position;
                    if (remaining <= 0) {
                        this._fadeOutBuffers.splice(i, 1);
                        continue;
                    }

                    const framesNow = Math.min(frames, remaining);
                    const start = fb.position;
                    const end = start + framesNow;

                    for (let ch = 0; ch < channels; ch++) {
                        const src = fb.data[ch];
                        const dst = output[ch];
                        for (let f = 0; f < framesNow; f++) {
                            const globalPos = start + f;
                            const t = globalPos / fb.totalFrames;
                            const gain = 1 - t;
                            dst[f] += src[globalPos] * gain;
                        }
                    }

                    fb.position += framesNow;
                    if (fb.position >= fb.totalFrames) {
                        this._fadeOutBuffers.splice(i, 1);
                    }
                }

                // пока есть активные fadeOutBuffers — продолжаем вызывать process()
                return true;
            }

            // если пауза и нет fadeOut — просто тишина
            return true;
        }


        // --- kernel processing (оставляем как есть) ---
        if (this._inputRingBuffer.framesAvailable >= this._kernelBufferSize) {
            this._inputRingBuffer.pull(this._heapInputBuffer.getChannelData());

            this._kernel.process(
                this._heapInputBuffer.getHeapAddress(),
                this._heapOutputBuffer.getHeapAddress(),
                this._channelCount
            );

            this._outputRingBuffer.push(this._heapOutputBuffer.getChannelData());
        }

        // --- безопасное чтение из выходного кольца ---
        // Пара состояний для управления повтором/затуханием:
        if (typeof this._staleCount === 'undefined') {
            this._staleCount = 0;
        }

        if (typeof this._maxHoldQuanta === 'undefined') {
            this._maxHoldQuanta = 2; // сколько квантов можно "повторять" максимум
        }

        if (typeof this._fadeFrames === 'undefined') {
            this._fadeFrames = Math.min(32, frames); // fade внутри кванта
        }

        if (this._outputRingBuffer.framesAvailable >= frames) {
            // Нормально: есть полный квант — читаем и кешируем
            this._outputRingBuffer.pull(output);



            // --- проверка целостности только что полученного кванта ---
            function analyzeBlock(output, lastSamplePerChannel) {
                const frames = output[0].length;
                const channels = output.length;
                let bad = false;
                let reason = null;
                let maxAbs = 0;
                let anyNonZero = false;
                for (let ch = 0; ch < channels; ch++) {
                    const arr = output[ch];
                    if (!arr) {
                        bad = true;
                        reason = 'no_channel';
                        break;
                    }

                    for (let i = 0; i < frames; i += Math.max(1, Math.floor(frames / 8))) { // sample some positions
                        const v = arr[i];

                        if (!isFinite(v)) {
                            bad = true;
                            reason = 'nan_inf';
                            break;
                        }

                        const a = Math.abs(v);
                        if (a > maxAbs) {
                            maxAbs = a;
                        }

                        if (a > 1e-8) {
                            anyNonZero = true;
                        }
                    }
                    if (bad) {
                        break;
                    }
                }

                // all-zero after non-zero detection handled outside (we'll check lastOutput)
                return { bad, reason, maxAbs, anyNonZero };
            }

            // call it
            const analysis = analyzeBlock.call(this, output, this._lastSample);
            if (analysis.bad) {
                // protective fallback: replace output with lastOutput (if exists) or zero
                if (this._lastOutput && this._lastOutput.length > 0) {
                    for (let ch = 0; ch < channels; ch++) output[ch].set(this._lastOutput[ch]);
                } else {
                    for (let ch = 0; ch < channels; ch++) output[ch].fill(0);
                }
            }


            // Сохраняем последний квант (копия)
            this._lastOutput = output.map(ch => ch.slice());
            // И запомним последний сэмпл на канал (для информации)
            this._lastSample = output.map(ch => ch[frames - 1]);

            this._staleCount = 0; // сброс счётчика "старости"
        } else {
            // Мало данных (gap)
            if (this._lastOutput && this._lastOutput.length > 0 && this._staleCount < this._maxHoldQuanta) {
                // Повторим последний квант, но применим fade-out по квантам:
                const holdFactor = 1 - (this._staleCount / this._maxHoldQuanta); // 1.0, 0.5, ...
                for (let ch = 0; ch < channels; ch++) {
                    const src = this._lastOutput[ch];
                    const dst = output[ch];
                    // внутри кванта делаем линейный fade-to-zero (чтобы убрать скачок)
                    for (let i = 0; i < frames; i++) {
                        const fade = (i < this._fadeFrames) ? (1 - i / this._fadeFrames) : 0;
                        dst[i] = src[i] * fade * holdFactor;
                    }
                }
                this._staleCount++;
                // Если этот был последний повтор — очистим lastOutput, чтобы после него быть тишине
                if (this._staleCount >= this._maxHoldQuanta) {
                    this._lastOutput = null;
                }
            } else {
                // Нет lastOutput или уже исчерпали повторы — отдаем тишину
                for (let ch = 0; ch < channels; ch++) {
                    output[ch].fill(0);
                }
                // гарантируем, что lastOutput не будет использоваться дальше
                this._lastOutput = null;
                this._staleCount = 0;
            }
        }

        // --- Проверка порога 8 секунд ---
        const secondsAvailable = this._outputRingBuffer.framesAvailable / this._sampleRate;

        if (!this._needMore && secondsAvailable && !this._inputRingBuffer.framesAvailable) {
            if (secondsAvailable <= this._needMoreThresholdSec) {


                // Пробуем подгрузить из еще одного буффера
                try {
                    if (typeof this.tryFlushResidual === 'function') {
                        if (this.tryFlushResidual()) {
                            return true;
                        }
                    }
                } catch (e) {
                }


                this._needMore = true;
                this.port.postMessage({
                    event: 'needMoreData'
                });
            }
        }


        // Обновляем счётчик проигранных кадров только если реально было аудио
        const isPlayingAudio =
            !this._paused &&
            !this._wasEmpty &&
            this._outputRingBuffer.framesAvailable >= frames;

        if (isPlayingAudio) {
            this._playedFrames += frames;

            const playedSeconds = Math.floor(this._playedFrames / this._sampleRate);
            if (playedSeconds > this._lastReportedSeconds) {
                this._lastReportedSeconds = playedSeconds;
                this.port.postMessage({
                    event: 'playedSeconds',
                    value: playedSeconds
                });
            }
        }

        // Проверка, что оба буфера пустые (воспроизведение окончено)
        // проверяем состояние буферов
        const inputEmpty = this._inputRingBuffer.framesAvailable === 0;
        const outputEmpty = this._outputRingBuffer.framesAvailable === 0;
        const allEmpty = inputEmpty && outputEmpty;

        // если оба пустые, и раньше не были — посылаем сообщение один раз
        if (allEmpty && !this._wasEmpty) {
            this.port.postMessage({ event: 'buffersEmpty' });
            this._wasEmpty = true;
        }

        // если теперь что-то пришло — сбрасываем флаг
        if (!allEmpty && this._wasEmpty) {
            this._wasEmpty = false;
        }

        // --- обработка активных fade-out буферов ---
        if (this._fadeOutBuffers.length > 0) {
            for (let i = this._fadeOutBuffers.length - 1; i >= 0; i--) {
                const fb = this._fadeOutBuffers[i];
                const remaining = fb.totalFrames - fb.position;
                if (remaining <= 0) {
                    this._fadeOutBuffers.splice(i, 1);
                    continue;
                }

                const framesNow = Math.min(frames, remaining);
                const start = fb.position;
                const end = start + framesNow;

                for (let ch = 0; ch < output.length; ch++) {
                    const src = fb.data[ch];
                    const dst = output[ch];

                    for (let f = 0; f < framesNow; f++) {
                        const globalPos = start + f;
                        const t = globalPos / fb.totalFrames; // 0..1
                        const gain = 1 - t; // линейное затухание
                        dst[f] += src[globalPos] * gain;
                    }
                }

                fb.position += framesNow;
                if (fb.position >= fb.totalFrames) {
                    this._fadeOutBuffers.splice(i, 1);
                }
            }
        }


        return true;
    }

}

registerProcessor('ring-buffer-worklet', RingBufferWorklet);
