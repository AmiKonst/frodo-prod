import { _ as _export_sfc, s as stores, r as reactive, o as onMounted, a as onBeforeUnmount, K as resolveDirective, b as createBlock, f as openBlock, k as withCtx, q as createBaseVNode, A as withDirectives, c as createElementBlock, x as normalizeStyle, F as Fragment, l as renderList, z as withModifiers, n as normalizeClass, d as createCommentVNode, e as createVNode, L as Loader, T as Transition, h as unref, B as vShow, H as BaseModal } from './index-BI-3nrMk.js';

const _hoisted_1 = { class: "gallery-wrapper" };
const _hoisted_2 = ["src", "onLoad"];
const MIN_SCALE = 1;
const MAX_SCALE = 4;
const CLOSE_THRESHOLD = 150;
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
      scale: 1,
      x: 0,
      y: 0,
      opacity: 1,
      rotate: 0,
      isClosing: false
    });
    let start = null;
    let lastTap = 0;
    const onZoom = (factor) => {
      const newScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, data.scale * factor));
      const scaleFactor = newScale / data.scale;
      data.x = data.scale === 1 ? 0 : parseInt(data.x * scaleFactor);
      data.y = data.scale === 1 ? 0 : parseInt(data.y * scaleFactor);
      data.scale = newScale;
    };
    const onTouchStart = (e) => {
      if (e.touches.length !== 1) {
        return;
      }
      const now = Date.now();
      if (now - lastTap < 300) {
        if (data.scale === 1) {
          data.scale = MAX_SCALE;
        } else {
          resetZoom();
        }
        lastTap = 0;
        e.preventDefault();
        return;
      }
      lastTap = now;
      start = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      data.isClosing = false;
    };
    const onTouchMove = (e) => {
      if (!start || e.touches.length !== 1) {
        return;
      }
      const dx = e.touches[0].clientX - start.x;
      const dy = e.touches[0].clientY - start.y;
      if (data.scale > 1) {
        data.x += dx;
        data.y += dy;
        data.isClosing = false;
      } else if (dy) {
        data.isClosing = true;
        data.y = Math.max(0, data.y + dy);
        const factor = Math.min(data.y / (window.innerHeight / 2), 1);
        data.opacity = 1 - factor * 0.8;
        data.rotate = factor * 10;
      }
      start = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const onTouchEnd = () => {
      if (data.isClosing) {
        if (data.y > CLOSE_THRESHOLD) {
          close();
        } else {
          data.y = 0;
          data.opacity = 1;
          data.rotate = 0;
        }
      }
      start = null;
      data.isClosing = false;
    };
    const close = () => {
      modals.close(props.name);
    };
    const next = () => {
      if (data.scale !== 1) {
        return;
      }
      if (data.currentIndex < data.imgs.length - 1) {
        data.currentIndex += 1;
        resetZoom();
        data.loading = true;
      }
    };
    const prev = () => {
      if (data.scale !== 1) {
        return;
      }
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
      data.x = 0;
      data.y = 0;
      data.opacity = 1;
      data.rotate = 0;
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
        draggable: false,
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
                      transform: `translate(${data.x}px, ${data.y}px) scale(${data.scale}) rotate(${data.rotate}deg)`,
                      opacity: data.opacity
                    }),
                    onTouchstart: onTouchStart,
                    onTouchmove: withModifiers(onTouchMove, ["prevent"]),
                    onTouchend: onTouchEnd
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
                  ], 38)), [
                    [_directive_touch, onZoom, "zoom"]
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
const ModalGallery = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-cb891d49"]]);

export { ModalGallery as default };
//# sourceMappingURL=ModalGallery-DSdLVguk.js.map
