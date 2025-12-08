import { _ as _export_sfc, s as stores, j as computed, p as ref, o as onMounted, S as nextTick, a as onBeforeUnmount, w as watch, c as createElementBlock, f as openBlock, q as createBaseVNode, y as withModifiers, n as normalizeClass, u as useI18n, r as reactive, g as api, z as resolveComponent, b as createBlock, k as withCtx, d as createCommentVNode, e as createVNode, I as IconButton, t as toDisplayString, h as unref, F as Fragment, l as renderList, H as BaseModal, m as message } from './index-CXbeo1LR.js';
import { I as Img } from './Img-BKlNfE0n.js';
import { A as AudioToggle } from './AudioToggle-BFDij8hl.js';

const _sfc_main$1 = {
  __name: 'TrackWave',
  props: {
    wave: { type: Array, default: () => ([]) },
    id: { type: String, default: '' },
    pane: { type: String, default: 'default' },
    min: { type: Number, default: 0 },
    max: { type: Number, default: 400 },
    duration: { type: Number, required: true },
    readonly: { type: Boolean, default: false },
    simplify: { type: Number, default: 1 }, // коэффициент упрощения
},
  emits: ['change'],
  setup(__props, { emit: __emit }) {

const player = stores.player();


const emit = __emit;

const props = __props;

const pos = computed(() => {
    if (!player.panes[props.pane] || player.panes[props.pane]._item?.id !== props.id) {
        return 0;
    }

    const pane = player.panes[props.pane];

    return pane._seek + pane._playedSeconds * 1000;
});

const canvas = ref(null);
const root = ref(null);

let ctx = null;
let dpr = 1;
let resizeObserver = null;
let rafId = null;

const smoothedPos = ref(pos.value);

const hoverActive = ref(false);
const hoverIndex = ref(-1);
const dragging = ref(false);

// вычисляем "упрощённый" массив wave
const simplifiedWave = computed(() => {
    const factor = Math.max(1, Math.floor(props.simplify));
    const result = [];
    for (let i = 0; i < props.wave.length; i += factor) {
        const slice = props.wave.slice(i, i + factor);
        // можно брать максимум, чтобы пики сохранялись
        const val = Math.max(...slice);
        result.push(val);
    }
    return result;
});

// количество столбиков
const nBars = computed(() => simplifiedWave.value.length);

// индекс проигрывания
computed(() => {
    if (!props.duration || props.duration <= 0 || nBars.value === 0) return -1;
    const p = Math.max(0, Math.min(pos.value, props.duration));
    const frac = p / props.duration;
    const idx = Math.floor(frac * nBars.value);
    return Math.max(0, Math.min(idx, nBars.value - 1));
});

function getCssNumber(varName, fallback = '0') {
    if (!root.value) return parseFloat(fallback) || 0;
    const val = getComputedStyle(root.value).getPropertyValue(varName).trim();
    return val ? parseFloat(val) : parseFloat(fallback) || 0;
}

function resizeCanvas() {
    if (!canvas.value) return;
    const el = canvas.value;
    const container = root.value || el.parentElement || el;
    const rect = container.getBoundingClientRect();

    dpr = window.devicePixelRatio || 1;

    // Размеры в CSS-пикселях (от контейнера)
    const displayWidth = Math.max(1, Math.floor(rect.width));
    const displayHeight = Math.max(1, Math.floor(rect.height));

    // ВАЖНО: не трогаем style.width/height (оставляем 100% из CSS)
    // Меняем только атрибуты для бэкбуфера под DPR
    const bufferWidth = Math.max(1, Math.floor(displayWidth * dpr));
    const bufferHeight = Math.max(1, Math.floor(displayHeight * dpr));

    if (el.width !== bufferWidth || el.height !== bufferHeight) {
        el.width = bufferWidth;
        el.height = bufferHeight;
    }

    ctx = el.getContext('2d');
    // Единицы — в CSS-пикселях
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);

    draw();
}

function clearCanvas() {
    if (!ctx || !root.value) return;
    const rect = root.value.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, rect.height);
}

function drawRoundedRect(x, y, w, h, r) {
    if (r <= 0) {
        ctx.fillRect(x, y, w, h);
        return;
    }
    const right = x + w;
    const bottom = y + h;
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(right, y, right, bottom, r);
    ctx.arcTo(right, bottom, x, bottom, r);
    ctx.arcTo(x, bottom, x, y, r);
    ctx.arcTo(x, y, right, y, r);
    ctx.closePath();
    ctx.fill();
}

function draw() {
    if (!ctx || !root.value) return;

    const rect = root.value.getBoundingClientRect();
    const W = rect.width;
    const H = rect.height;

    clearCanvas();

    const n = nBars.value ?? (props.wave?.length || 0);
    if (n === 0) return;

    const css = getComputedStyle(root.value);
    const unplayedColor = css.getPropertyValue('--wave-unplayed') || '#e6e6e6';
    const playedColor = css.getPropertyValue('--wave-played') || '#ff5500';
    const hoverColor = css.getPropertyValue('--wave-hover') || '#ff8a4d';
    const centerBg = css.getPropertyValue('--wave-bg') || 'transparent';
    const gapToken = css.getPropertyValue('--wave-gap').trim();
    const gap = gapToken ? parseFloat(gapToken) : 2;
    const radiusToken = css.getPropertyValue('--wave-radius').trim();
    const barRadius = radiusToken ? parseFloat(radiusToken) : 2;

    if (centerBg !== 'transparent') {
        ctx.fillStyle = centerBg;
        ctx.fillRect(0, 0, W, H);
    }

    const totalGap = gap * (n - 1);
    let barW = (W - totalGap) / n;
    if (barW < 1) barW = Math.max(0.5, W / (n * 2));

    const vMin = props.min;
    const vMax = Math.max(props.max, vMin + 1);
    const valueRange = vMax - vMin;

    const centerY = H / 2;
    const playedThreshold = Math.max(
        0,
        Math.min(smoothedPos.value / Math.max(1, props.duration), 1)
    ) * n;

    for (let i = 0; i < n; i++) {
        const raw = Number(simplifiedWave.value ? simplifiedWave.value[i] : props.wave[i]) || 0;
        let frac = (raw - vMin) / valueRange;
        frac = Math.max(0, Math.min(1, frac));
        const barHeight = Math.max(1, frac * H);

        const x = i * (barW + gap);
        const y = centerY - barHeight / 2;

        let state = 'unplayed';
        if (hoverActive.value && !props.readonly && hoverIndex.value >= 0) {
            if (i <= hoverIndex.value) state = 'hover';
            else if (i < playedThreshold) state = 'played';
        } else {
            if (i < playedThreshold) state = 'played';
        }

        if (state === 'played') ctx.fillStyle = playedColor.trim();
        else if (state === 'hover') ctx.fillStyle = hoverColor.trim();
        else ctx.fillStyle = unplayedColor.trim();

        drawRoundedRect(x, y, barW, barHeight, barRadius);
    }
}

function clientXToIndex(clientX) {
    const container = root.value || canvas.value;
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const W = rect.width;
    const n = nBars.value ?? (props.wave?.length || 0);
    if (n === 0) return -1;

    const gap = getCssNumber('--wave-gap', '2');
    const totalGap = gap * (n - 1);
    let barW = (W - totalGap) / n;
    if (barW < 1) barW = Math.max(0.5, W / (n * 2));

    let idx = Math.floor(x / (barW + gap));
    if (idx < 0) idx = 0;
    if (idx >= n) idx = n - 1;
    return idx;
}

function indexToMs(index) {
    const n = nBars.value;
    if (!props.duration || n <= 0) return 0;
    const frac = Math.max(0, Math.min(1, (index + 0.5) / n));
    return frac * props.duration;
}

function onPointerMove(e) {
    if (!canvas.value) return;
    if (props.readonly) return;
    const idx = clientXToIndex(e.clientX);
    if (idx !== hoverIndex.value) {
        hoverIndex.value = idx;
        hoverActive.value = true;
        draw();
    }
    if (dragging.value) {
        const ms = indexToMs(idx);

        onChange(Math.round(ms));
    }
}

function onPointerLeave() {
    if (dragging.value) return;
    hoverActive.value = false;
    hoverIndex.value = -1;
    draw();
}

let changeTimeout;

const onChange = (position) => {
    emit('change', position);

    clearTimeout(changeTimeout);
    changeTimeout = setTimeout(() => {
        if (!player.panes[props.pane] || player.panes[props.pane]._item?.id !== props.id) {
            return;
        }

        player.panes[props.pane].seek(position || 0);
    }, 100);
};

function onPointerDown(e) {
    if (props.readonly) return;
    if (!canvas.value) return;
    const idx = clientXToIndex(e.clientX);
    if (idx < 0) return;
    const el = e.currentTarget || root.value;
    try {
        el.setPointerCapture && el.setPointerCapture(e.pointerId);
    } catch (err) {}
    dragging.value = true;
    hoverActive.value = true;
    hoverIndex.value = idx;
    draw();
    const ms = indexToMs(idx);
    onChange(Math.round(ms));
    const onUp = (ev) => {
        try {
            el.releasePointerCapture && el.releasePointerCapture(ev.pointerId);
        } catch (err) {}
        dragging.value = false;
        window.removeEventListener('pointerup', onUp);
    };
    window.addEventListener('pointerup', onUp);
}

function startAnimationLoop() {
    const ease = 0.12;
    function loop() {
        const target = pos.value || 0;
        smoothedPos.value += (target - smoothedPos.value) * ease;

        if (smoothedPos.value < 1 || !pos.value) {
            smoothedPos.value = 0;
        }

        draw();
        rafId = requestAnimationFrame(loop);
    }
    if (!rafId) {
        rafId = requestAnimationFrame(loop);
    }
}

function stopAnimationLoop() {
    if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
    }
}

onMounted(() => {
    nextTick(() => {
        resizeCanvas();
        if (window.ResizeObserver && root.value) {
            resizeObserver = new ResizeObserver(resizeCanvas);
            resizeObserver.observe(root.value);
        } else {
            window.addEventListener('resize', resizeCanvas);
        }
        smoothedPos.value = pos.value || 0;
        startAnimationLoop();
    });
});

onBeforeUnmount(() => {
    if (resizeObserver && root.value) resizeObserver.unobserve(root.value);
    else window.removeEventListener('resize', resizeCanvas);
    stopAnimationLoop();
});

watch(
    () => [props.wave, props.min, props.max, props.duration, props.simplify],
    () => {
        nextTick(resizeCanvas);
    },
    { deep: true }
);

watch(
    () => pos.value,
    () => {
        if (!rafId) startAnimationLoop();
    }
);

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", {
    ref_key: "root",
    ref: root,
    class: normalizeClass(["track-wave", { 'is-readonly': __props.readonly }]),
    onPointermove: withModifiers(onPointerMove, ["prevent"]),
    onPointerleave: onPointerLeave,
    onPointerdown: withModifiers(onPointerDown, ["prevent"])
  }, [
    createBaseVNode("canvas", {
      ref_key: "canvas",
      ref: canvas,
      class: "wave-canvas"
    }, null, 512)
  ], 34))
}
}

};
const TrackWave = /*#__PURE__*/_export_sfc(_sfc_main$1, [['__scopeId',"data-v-7d3e0a8b"]]);

const _hoisted_1 = { class: "title" };
const _hoisted_2 = { class: "kebab-list" };
const _hoisted_3 = { class: "" };
const _hoisted_4 = { class: "buttons" };
const _hoisted_5 = { key: 0 };
const _hoisted_6 = ["onClick"];


const _sfc_main = {
  __name: 'ModalTrackKebab',
  setup(__props) {

const { t } = useI18n();

stores.tg();
const modals = stores.modals();
const share = stores.share();
const player = stores.player();
const nav = stores.nav();

const data = reactive({
    loading: true,
    releases: []
});

const state = computed(() => {
    if (!player.panes.default || player.panes.default._item?.id !== data.item?.id) {
        return;
    }

    return player.panes.default._state;
});

const seek = async (position) => {
    if (state.value !== 'playing') {
        await play();
        setTimeout(() => {
            if (player.panes.default) {
                player.panes.default.seek(position || 0);
            }
        }, 2000);
    }
};

const play = async () => {
    if ((data.track && state.value === 'stopped') || !data.track || data.track.id !== player.panes?.default?._pult?.id) {

        data.track = await player.track(data.item);

        data.track.play();
        return;
    }

    if (data.track && state.value === 'paused') {
        data.track.resume();
        return;
    }
};

const pause = async () => {
    if (data.track && state.value === 'playing') {
        data.track.pause();
        return;
    }
};


const shareIt = () => {
    share.track(data.item, { type: 'release', release: data.releases[0] });

    setTimeout(() => {
        close();
    }, 400);
};

const about = () => {
    setTimeout(() => {
        close();
    }, 400);

    modals.open('track', { quietClose: true, data: {
        id: data.item.id,
        item: data.item,
        releases: data.releases || []
    } });
};

const openRelease = (release) => {
    nav.open('release', { id: release?.id });
    close();
};

const download = () => {
    setTimeout(() => {
        close();
    }, 400);

    modals.open('track-download', { quietClose: true, data: {
        id: data.item.id,
        item: data.item,
        releases: data.releases || []
    } });
};

const gallery = () => {
    if (!data.item?.id || !data.item?.cover?.original) {
        return;
    }

    modals.open('gallery', { data: { imgs: [{
        title: data.item.title,
        ...data.item?.cover
    }] } });
};

const like = () => {
    message.info(t('common.soon'));
};

const close = () => {
    modals.close('track-kebab');
};


onMounted(async () => {
    const payload = modals.getData('track-kebab');

    if (!payload?.id) {
        close();
        return;
    }

    data.item = await api.tracks().get(payload.id);

    const releases = await api.releases().list({ tracks: [payload.id] });
    if (releases?.items) {
        data.releases = releases.items;
    }

    data.loading = false;
});


return (_ctx, _cache) => {
  const _component_Icon = resolveComponent("Icon");

  return (openBlock(), createBlock(BaseModal, {
    name: "track-kebab",
    mobileMode: true,
    closeOutside: true,
    isLoading: data.loading
  }, {
    title: withCtx(() => [
      createBaseVNode("div", _hoisted_1, [
        createBaseVNode("div", {
          class: "img",
          onClick: gallery
        }, [
          (data.item?.cover?.resized)
            ? (openBlock(), createBlock(Img, {
                key: 0,
                preview: data.item?.cover?.resized,
                original: data.item?.cover?.original,
                alt: data.item?.title
              }, null, 8, ["preview", "original", "alt"]))
            : createCommentVNode("", true)
        ]),
        createBaseVNode("span", null, toDisplayString(data.item?.title), 1)
      ])
    ]),
    content: withCtx(() => [
      createBaseVNode("ul", _hoisted_2, [
        createBaseVNode("li", _hoisted_3, [
          createBaseVNode("div", _hoisted_4, [
            createVNode(IconButton, {
              icon: "download",
              class: "tertiary size-xl",
              onClick: download
            }),
            (data.item?.wave)
              ? (openBlock(), createBlock(AudioToggle, {
                  key: 0,
                  state: state.value,
                  light: true,
                  class: "secondary size-s",
                  onPlay: play,
                  onPause: pause
                }, null, 8, ["state"]))
              : createCommentVNode("", true),
            createVNode(IconButton, {
              icon: "heart",
              class: "tertiary size-xl",
              onClick: like
            })
          ])
        ]),
        (data.item?.trackFile)
          ? (openBlock(), createElementBlock("li", _hoisted_5, [
              createVNode(TrackWave, {
                wave: data.item.wave,
                id: data.item.id,
                duration: data.item.duration,
                simplify: 2,
                class: "wave",
                onChange: seek
              }, null, 8, ["wave", "id", "duration"])
            ]))
          : createCommentVNode("", true),
        createBaseVNode("li", {
          class: "clickable",
          onClick: shareIt
        }, [
          createVNode(_component_Icon, { icon: "share" }),
          createBaseVNode("span", null, toDisplayString(unref(t)('modals.track-kebab.share')), 1)
        ]),
        (data.releases?.length)
          ? (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(data.releases, (item) => {
              return (openBlock(), createElementBlock("li", {
                key: item.id,
                class: "clickable",
                onClick: $event => (openRelease(item))
              }, [
                (item?.cover)
                  ? (openBlock(), createBlock(Img, {
                      key: 0,
                      preview: item?.cover?.crop,
                      original: item?.cover?.original,
                      alt: item.title,
                      skeleton: true
                    }, null, 8, ["preview", "original", "alt"]))
                  : (openBlock(), createBlock(_component_Icon, {
                      key: 1,
                      icon: "playlist"
                    })),
                createBaseVNode("span", null, toDisplayString(unref(t)('modals.track-kebab.go-to-release', { 'release-title': item.title })), 1)
              ], 8, _hoisted_6))
            }), 128))
          : createCommentVNode("", true),
        createBaseVNode("li", {
          class: "clickable",
          onClick: about
        }, [
          createVNode(_component_Icon, { icon: "help" }),
          createBaseVNode("span", null, toDisplayString(unref(t)('modals.track-kebab.about')), 1)
        ])
      ])
    ]),
    _: 1
  }, 8, ["isLoading"]))
}
}

};
const ModalTrackKebab = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-fe7cec0a"]]);

export { ModalTrackKebab as default };
//# sourceMappingURL=ModalTrackKebab-BWstNcya.js.map
