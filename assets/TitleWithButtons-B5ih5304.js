import { _ as _export_sfc, s as stores, u as useI18n, t as resolveComponent, c as createElementBlock, f as openBlock, b as createBlock, d as createCommentVNode, O as mergeProps, p as Img, P as createTextVNode, v as toDisplayString, h as unref, F as Fragment, m as renderList, B as Button } from './index-BK31XTzT.js';

const _hoisted_1 = { class: "title" };
const _hoisted_2 = {
  key: 1,
  class: "title-text"
};

    
const _sfc_main = {
  __name: 'TitleWithButtons',
  props: {
        title: { type: [Object, String, null], default: null },
        items: { type: Array, default: () => [] },
        icon: { type: [String, null], default: null }
    },
  setup(__props) {

    stores.locale();
    const nav = stores.nav();

    const { t } = useI18n();

    const props = __props;

    const onClick = (item) => {
        if (item.page) {
            nav.open(item.page, item.params);
        }
    };

return (_ctx, _cache) => {
  const _component_Icon = resolveComponent("Icon");

  return (openBlock(), createElementBlock("label", _hoisted_1, [
    (props.title?.img)
      ? (openBlock(), createBlock(Img, mergeProps({ key: 0 }, props.title.img, {
          style: { width: props.title.img.width, height: props.title.img.height }
        }), null, 16, ["style"]))
      : createCommentVNode("", true),
    (props.title)
      ? (openBlock(), createElementBlock("span", _hoisted_2, [
          createTextVNode(toDisplayString(props.title?.text || unref(t)(props.title)) + " ", 1),
          (props.icon)
            ? (openBlock(), createBlock(_component_Icon, {
                key: 0,
                icon: props.icon,
                class: "icon"
              }, null, 8, ["icon"]))
            : createCommentVNode("", true)
        ]))
      : createCommentVNode("", true),
    (openBlock(true), createElementBlock(Fragment, null, renderList(props.items, (item, id) => {
      return (openBlock(), createBlock(Button, {
        key: item.id,
        name: unref(t)(item.name),
        class: "size-s secondary",
        onClick: $event => (onClick(item))
      }, null, 8, ["name", "onClick"]))
    }), 128))
  ]))
}
}

};
const TitleWithButtons = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-90b3a958"]]);

export { TitleWithButtons as T };
//# sourceMappingURL=TitleWithButtons-B5ih5304.js.map
