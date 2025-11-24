import { _ as _export_sfc, s as stores, r as reactive, l as onMounted, M as resolveDirective, b as createBlock, o as openBlock, t as withCtx, v as createBaseVNode, C as withDirectives, c as createElementBlock, n as normalizeStyle, F as Fragment, m as renderList, h as unref, J as BaseModal } from './index-CRjVsOMo.js';

const _hoisted_1 = { class: "gallery-wrapper" };
const _hoisted_2 = ["src"];
const _sfc_main = {
  __name: "ModalGallery",
  props: {
    name: { type: String, default: "gallery" }
  },
  setup(__props) {
    const modals = stores.modals();
    const props = __props;
    const baseUrl = "https://api.wetap-tech-service.ru";
    const data = reactive({
      imgs: [],
      currentIndex: 0,
      scale: 1,
      baseScale: 1,
      x: 0,
      y: 0
    });
    const basePos = { x: 0, y: 0 };
    const next = () => {
      if (data.currentIndex < data.imgs.length - 1) {
        data.currentIndex += 1;
        resetZoom();
      }
    };
    const prev = () => {
      if (data.currentIndex > 0) {
        data.currentIndex -= 1;
        resetZoom();
      }
    };
    const onPinch = (e) => {
      console.log(">>", e);
      data.scale = data.baseScale * e.scale;
      if (data.scale < 1) {
        data.scale = 1;
      }
      if (data.scale > 4) {
        data.scale = 4;
      }
    };
    const onPinchEnd = () => {
      data.baseScale = data.scale;
    };
    const onPan = (e) => {
      if (data.scale <= 1) {
        return;
      }
      data.x = basePos.x + e.deltaX;
      data.y = basePos.y + e.deltaY;
    };
    const onPanEnd = () => {
      basePos.x = data.x;
      basePos.y = data.y;
      data.baseScale = data.scale;
    };
    const resetZoom = () => {
      data.scale = 1;
      data.baseScale = 1;
      data.x = 0;
      data.y = 0;
      basePos.x = 0;
      basePos.y = 0;
    };
    onMounted(() => {
      const payload = modals.getData(props.name);
      if (payload?.imgs?.length) {
        data.imgs = payload.imgs;
      }
    });
    return (_ctx, _cache) => {
      const _directive_touch = resolveDirective("touch");
      return openBlock(), createBlock(BaseModal, {
        name: props.name,
        full: true,
        mobileMode: true,
        closeOutside: true
      }, {
        content: withCtx(() => [
          createBaseVNode("div", _hoisted_1, [
            withDirectives((openBlock(), createElementBlock("div", {
              class: "slides",
              style: normalizeStyle({ transform: `translateX(${-data.currentIndex * 100}% )` })
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(data.imgs, (img, id) => {
                return openBlock(), createElementBlock("div", {
                  class: "slide",
                  key: id
                }, [
                  withDirectives((openBlock(), createElementBlock("div", {
                    class: "zoom-container",
                    ref_for: true,
                    ref: "zoomArea",
                    style: normalizeStyle({
                      transform: `translate(${data.x}px, ${data.y}px) scale(${data.scale})`
                    })
                  }, [
                    createBaseVNode("img", {
                      src: `${unref(baseUrl)}${img.original || img.resized}`
                    }, null, 8, _hoisted_2)
                  ], 4)), [
                    [
                      _directive_touch,
                      onPinch,
                      "pinch",
                      {
                        stop: true,
                        prevent: true
                      }
                    ],
                    [_directive_touch, onPinchEnd, "pinchend"],
                    [
                      _directive_touch,
                      onPan,
                      "pan",
                      { stop: true }
                    ],
                    [
                      _directive_touch,
                      onPanEnd,
                      "pan",
                      { end: true }
                    ]
                  ])
                ]);
              }), 128))
            ], 4)), [
              [
                _directive_touch,
                next,
                "swipe",
                { left: true }
              ],
              [
                _directive_touch,
                prev,
                "swipe",
                { right: true }
              ]
            ])
          ])
        ]),
        _: 1
      }, 8, ["name"]);
    };
  }
};
const ModalGallery = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0c5e6c82"]]);

export { ModalGallery as default };
//# sourceMappingURL=ModalGallery-C7SII7Et.js.map
