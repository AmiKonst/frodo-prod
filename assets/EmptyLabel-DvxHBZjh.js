import { _ as _export_sfc, c as createElementBlock, f as openBlock, b as createBlock, d as createCommentVNode, q as resolveComponent, n as normalizeClass } from './index-eTRPFRbh.js';

const _hoisted_1 = ["innerHTML"];
const _hoisted_2 = ["innerHTML"];


const _sfc_main = {
  __name: 'EmptyLabel',
  props: {
    icon: { type: String, default: '' },
    sprite: { type: String, default: '' },
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
    (props.icon)
      ? (openBlock(), createBlock(_component_Icon, {
          key: 0,
          icon: props.icon,
          sprite: props.sprite
        }, null, 8, ["icon", "sprite"]))
      : createCommentVNode("", true),
    (props.title)
      ? (openBlock(), createElementBlock("span", {
          key: 1,
          innerHTML: props.title
        }, null, 8, _hoisted_1))
      : createCommentVNode("", true),
    (props.description)
      ? (openBlock(), createElementBlock("span", {
          key: 2,
          class: "description",
          innerHTML: props.description
        }, null, 8, _hoisted_2))
      : createCommentVNode("", true)
  ], 2))
}
}

};
const EmptyLabel = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-f8d0a468"]]);

export { EmptyLabel as E };
//# sourceMappingURL=EmptyLabel-DvxHBZjh.js.map
