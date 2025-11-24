import { _ as _export_sfc, s as stores, r as reactive, i as ref, l as onMounted, M as resolveDirective, b as createBlock, o as openBlock, t as withCtx, v as createBaseVNode, C as withDirectives, c as createElementBlock, n as normalizeStyle, F as Fragment, m as renderList, h as unref, J as BaseModal } from './index-x4ToM-Ie.js';

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
    const data = reactive({
      imgs: []
    });
    const currentIndex = ref(0);
    const slideOffset = ref(0);
    const baseUrl = "https://api.wetap-tech-service.ru";
    const scale = ref(1);
    const baseScale = ref(1);
    const position = reactive({
      x: 0,
      y: 0
    });
    const basePos = { x: 0, y: 0 };
    const next = () => {
      if (currentIndex.value < data.imgs.length - 1) {
        currentIndex.value++;
        resetZoom();
      }
    };
    const prev = () => {
      if (currentIndex.value > 0) {
        currentIndex.value--;
        resetZoom();
      }
    };
    const onPinch = (e) => {
      scale.value = baseScale.value * e.scale;
      if (scale.value < 1) scale.value = 1;
      if (scale.value > 4) scale.value = 4;
    };
    const onPan = (e) => {
      if (scale.value === 1) return;
      position.x = basePos.x + e.deltaX;
      position.y = basePos.y + e.deltaY;
    };
    const onPanEnd = () => {
      basePos.x = position.x;
      basePos.y = position.y;
      baseScale.value = scale.value;
    };
    const resetZoom = () => {
      scale.value = 1;
      baseScale.value = 1;
      position.x = 0;
      position.y = 0;
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
              style: normalizeStyle({ transform: `translateX(${-currentIndex.value * 100 + slideOffset.value}px)` })
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(data.imgs, (img, index) => {
                return openBlock(), createElementBlock("div", {
                  class: "slide",
                  key: index
                }, [
                  withDirectives((openBlock(), createElementBlock("div", {
                    class: "zoom-container",
                    ref_for: true,
                    ref: "zoomArea",
                    style: normalizeStyle({
                      transform: `translate(${position.x}px, ${position.y}px) scale(${scale.value})`
                    })
                  }, [
                    createBaseVNode("img", {
                      src: `${unref(baseUrl)}${img.original || img.resized}`
                    }, null, 8, _hoisted_2)
                  ], 4)), [
                    [_directive_touch, onPinch, "pinch"],
                    [
                      _directive_touch,
                      void 0,
                      "pinch",
                      { stop: true }
                    ],
                    [_directive_touch, onPan, "pan"],
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
const ModalGallery = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0709f9f2"]]);

export { ModalGallery as default };
//# sourceMappingURL=ModalGallery-CeCqoy-Y.js.map
