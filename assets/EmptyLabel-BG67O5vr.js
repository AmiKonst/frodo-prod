import { s as stores, i as storeToRefs, j as computed, c as createElementBlock, f as openBlock, l as createBaseVNode, _ as _export_sfc, b as createBlock, d as createCommentVNode, t as resolveComponent, n as normalizeClass } from './index-BCxK_-8k.js';

const _hoisted_1$1 = ["width", "height"];
const _hoisted_2$1 = ["src"];


const _sfc_main$1 = {
  __name: 'AnimateIcon',
  props: {
    icon: { type: String, default: '' },
    size: { type: [Array, null], default: () => ['128', '128'] }
},
  setup(__props) {

const others = stores.others();
const { animateSvgSpritePath } = storeToRefs(others);

const props = __props;

const src = computed(() => `${ animateSvgSpritePath.value }/${props.icon}.mp4`);

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("video", {
    width: props.size[0],
    height: props.size[1],
    preload: "none",
    autoplay: "autoplay",
    loop: "true",
    muted: "muted",
    playsinline: ""
  }, [
    createBaseVNode("source", {
      src: src.value,
      type: "video/mp4"
    }, null, 8, _hoisted_2$1)
  ], 8, _hoisted_1$1))
}
}

};

const _hoisted_1 = ["innerHTML"];
const _hoisted_2 = ["innerHTML"];

const _sfc_main = {
  __name: 'EmptyLabel',
  props: {
    icon: { type: String, default: '' },
    animateIcon: { type: String, default: '' },
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    invert: { type: Boolean, default: false }
},
  setup(__props) {

const props = __props;

return (_ctx, _cache) => {
  const _component_Icon = resolveComponent("Icon");

  return (openBlock(), createElementBlock("div", {
    class: normalizeClass({ invert: props.invert })
  }, [
    (props.animateIcon)
      ? (openBlock(), createBlock(_sfc_main$1, {
          key: 0,
          icon: props.animateIcon
        }, null, 8, ["icon"]))
      : createCommentVNode("", true),
    (props.icon)
      ? (openBlock(), createBlock(_component_Icon, {
          key: 1,
          icon: props.icon
        }, null, 8, ["icon"]))
      : createCommentVNode("", true),
    (props.title)
      ? (openBlock(), createElementBlock("span", {
          key: 2,
          innerHTML: props.title
        }, null, 8, _hoisted_1))
      : createCommentVNode("", true),
    (props.description)
      ? (openBlock(), createElementBlock("span", {
          key: 3,
          class: "description",
          innerHTML: props.description
        }, null, 8, _hoisted_2))
      : createCommentVNode("", true)
  ], 2))
}
}

};
const EmptyLabel = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-363f011f"]]);

export { EmptyLabel as E };
//# sourceMappingURL=EmptyLabel-BG67O5vr.js.map
