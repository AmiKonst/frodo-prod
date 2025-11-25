import { _ as _export_sfc, s as stores, r as reactive, l as onMounted, g as onBeforeUnmount, M as resolveDirective, b as createBlock, o as openBlock, t as withCtx, v as createBaseVNode, C as withDirectives, c as createElementBlock, n as normalizeStyle, F as Fragment, m as renderList, z as normalizeClass, d as createCommentVNode, e as createVNode, N as Loader, T as Transition, h as unref, D as vShow, J as BaseModal } from './index-CBnf8P3q.js';

const _hoisted_1 = { class: "gallery-wrapper" };
const _hoisted_2 = ["src", "onLoad"];
const MIN_SCALE = 1;
const MAX_SCALE = 4;
const _sfc_main = {
  __name: "ModalGallery",
  props: {
    name: { type: String, default: "gallery" }
  },
  setup(__props) {
    const modals = stores.modals();
    const props = __props;
    const BASE_URL = "https://api.wetap-tech-service.ru";
    const data = reactive({
      imgs: [],
      currentIndex: 0,
      loaded: {},
      startScale: 1,
      scale: 1,
      x: 0,
      y: 0
    });
    const onZoom = (ev) => {
      alert(ev);
      console.log(ev, "zoom");
      const newScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, data.startScale * ev));
      const scaleFactor = newScale / data.scale;
      data.x = data.x * scaleFactor;
      data.y = data.y * scaleFactor;
      data.scale = newScale;
    };
    const onZoomStart = () => {
      alert("start");
      data.startScale = data.scale;
    };
    const onDrag = (ev) => {
      alert(ev, "drag");
      if (data.scale === 1) {
        return;
      }
      data.x += ev.delta.x;
      data.y += ev.delta.y;
    };
    const next = () => {
      if (data.currentIndex < data.imgs.length - 1) {
        data.currentIndex += 1;
        resetZoom();
        data.loading = true;
      }
    };
    const prev = () => {
      if (data.currentIndex > 0) {
        data.currentIndex -= 1;
        resetZoom();
      }
    };
    const onImageLoad = (id) => {
      data.loaded[id] = true;
    };
    const resetZoom = () => {
      data.scale = 1;
      data.startScale = 1;
      data.x = 0;
      data.y = 0;
    };
    onMounted(() => {
      const payload = modals.getData(props.name);
      if (payload?.imgs?.length) {
        data.imgs = payload.imgs;
      }
    });
    onBeforeUnmount(() => {
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
                    class: normalizeClass(["zoom-container", { loading: !data.loaded[id] }]),
                    style: normalizeStyle({
                      transform: `translate(${data.x}px, ${data.y}px) scale(${data.scale})`
                    })
                  }, [
                    !data.loaded[id] ? (openBlock(), createBlock(Loader, {
                      key: 0,
                      class: "opacity-mode"
                    })) : createCommentVNode("", true),
                    createVNode(Transition, { name: "fade" }, {
                      default: withCtx(() => [
                        withDirectives(createBaseVNode("img", {
                          src: `${unref(BASE_URL)}${img.original || img.resized}`,
                          onLoad: ($event) => onImageLoad(id)
                        }, null, 40, _hoisted_2), [
                          [vShow, data.loaded[id]]
                        ])
                      ]),
                      _: 2
                    }, 1024)
                  ], 6)), [
                    [_directive_touch, onZoom, "zoom"],
                    [
                      _directive_touch,
                      onZoomStart,
                      "zoom",
                      { in: true }
                    ],
                    [
                      _directive_touch,
                      onZoomStart,
                      "zoom",
                      { out: true }
                    ],
                    [_directive_touch, onDrag, "drag"]
                  ])
                ]);
              }), 128))
            ], 4)), [
              [
                _directive_touch,
                data.scale === 1 ? next : null,
                "swipe",
                { left: true }
              ],
              [
                _directive_touch,
                data.scale === 1 ? prev : null,
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
const ModalGallery = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-5642542a"]]);

export { ModalGallery as default };
//# sourceMappingURL=ModalGallery-Bob5cSfi.js.map
