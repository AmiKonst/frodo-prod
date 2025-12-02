self.onmessage = async (event) => {
    const { id, config } = event.data;

    const queryString = config.params
        ? '?' + new URLSearchParams(config.params).toString()
        : '';

    const body = config.formData
        ? config.formData
        : config.data
            ? JSON.stringify(config.data)
            : undefined;

    if (config.formData && config.headers['Content-Type']) {
        delete config.headers['Content-Type'];
    }

        const res = await fetch(config.baseURL + config.url + queryString, {
            method: config.method,
            headers: config.headers,
            body,
            credentials: 'omit'
        });

        if (!res.ok) {
            throw new Error(`HTTP error ${res.status}`);
        }

        let data;

        switch (config.responseType || 'json') {
            case 'blob':
                data = await res.blob();
                break;
            case 'arraybuffer':
                data = await res.arrayBuffer();
                break;
            case 'text':
                data = await res.text();
                break;
            case 'json':
            default:
                data = await res.json();
                break;
        }


        const headersObj = {};
        res.headers.forEach((value, key) => {
            headersObj[key] = value;
        });

        // console.log(data)

        if (config.responseType) {
            self.postMessage({ id, success: true, data, status: res.status, headers: headersObj }, [data]);
        } else {
            self.postMessage({ id, success: true, data, status: res.status, headers: headersObj });
        }
};
//# sourceMappingURL=requestWorker-ILuAoQM9.js.map
