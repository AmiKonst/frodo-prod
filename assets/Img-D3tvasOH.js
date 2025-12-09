import { _ as _export_sfc, p as ref, j as computed, c as createElementBlock, f as openBlock, d as createCommentVNode, q as createBaseVNode, v as renderSlot, L as createTextVNode, t as toDisplayString, x as normalizeStyle, n as normalizeClass } from './index-CUOkArLi.js';

const _hoisted_1 = ["src", "alt"];
const _hoisted_2 = ["src", "alt"];
const _hoisted_3 = ["src", "alt"];
const _sfc_main = {
  __name: "Img",
  props: {
    preview: { type: String, default: "" },
    original: { type: String, default: "" },
    alt: { type: String, default: "" },
    wathermark: { type: [String, null], default: null },
    aspectRatio: { type: [String, null], default: null },
    skeleton: { type: Boolean, default: false },
    checktone: { type: Boolean, default: false }
  },
  emits: ["load", "error", "tone"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const isLoaded = ref(false);
    const checkTone = (e) => {
      const image = e.target;
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const sampleWidth = 100;
      const aspectRatio = image.naturalHeight / image.naturalWidth;
      canvas.width = sampleWidth;
      canvas.height = sampleWidth * aspectRatio;
      ctx?.drawImage(image, 0, 0, canvas.width, canvas.height);
      try {
        const imageData = ctx?.getImageData(0, canvas.height * 0.66, canvas.width, canvas.height * 0.33);
        if (!imageData) return;
        let totalLuminance = 0;
        const data = imageData.data;
        const pixelCount = data.length / 4;
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
          totalLuminance += luminance;
        }
        const avgLuminance = totalLuminance / pixelCount;
        const tone = avgLuminance < 128 ? "dark" : "light";
        emit("tone", tone);
      } catch (err) {
      }
    };
    function handleLoad(e) {
      isLoaded.value = true;
      if (props.checktone) {
        checkTone(e);
      }
      emit("load", e);
    }
    function handleError(e) {
      emit("error", e);
    }
    const src = computed(() => {
      return `${props.preview?.indexOf("http") === -1 ? "https://api.wetap-tech-service.ru" : ""}${props.preview}`;
    });
    return (_ctx, _cache) => {
      return props.wathermark ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: normalizeClass(["wathermark", props.wathermark]),
        style: normalizeStyle({ "aspect-ratio": props.aspectRatio })
      }, [
        props.preview ? (openBlock(), createElementBlock("img", {
          key: 0,
          src: src.value,
          alt: props.alt,
          crossorigin: "anonymous",
          onLoad: handleLoad,
          onError: handleError
        }, null, 40, _hoisted_1)) : createCommentVNode("", true),
        _cache[0] || (_cache[0] = createBaseVNode("span", null, null, -1)),
        createBaseVNode("label", null, [
          renderSlot(_ctx.$slots, "default", {}, () => [
            createTextVNode(toDisplayString(props.alt), 1)
          ], true)
        ])
      ], 6)) : props.skeleton ? (openBlock(), createElementBlock("div", {
        key: 1,
        class: normalizeClass(["skeleton-wrapper", { loaded: isLoaded.value }]),
        style: normalizeStyle({ "aspect-ratio": props.aspectRatio })
      }, [
        props.preview ? (openBlock(), createElementBlock("img", {
          key: 0,
          src: src.value,
          alt: props.alt,
          crossorigin: "anonymous",
          onLoad: handleLoad,
          onError: handleError
        }, null, 40, _hoisted_2)) : createCommentVNode("", true)
      ], 6)) : (openBlock(), createElementBlock("img", {
        key: 2,
        src: src.value,
        alt: props.alt,
        style: normalizeStyle({ "aspect-ratio": props.aspectRatio }),
        crossorigin: "anonymous",
        onLoad: handleLoad,
        onError: handleError
      }, null, 44, _hoisted_3));
    };
  }
};
const Img = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-51682be5"]]);

export { Img as I };
//# sourceMappingURL=Img-D3tvasOH.js.map
