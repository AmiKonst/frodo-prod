import { _ as _export_sfc, s as stores, u as useI18n, c as createElementBlock, f as openBlock, b as createBlock, d as createCommentVNode, O as mergeProps, p as Img, v as toDisplayString, h as unref, F as Fragment, m as renderList, B as Button } from './index-BB2_Hcod.js';

const _hoisted_1 = { class: "title" };
const _hoisted_2 = {
  key: 1,
  class: "title-text"
};

    
const _sfc_main = {
  __name: 'TitleWithButtons',
  props: {
        title: { type: [Object, String, null], default: null },
        items: { type: Array, default: () => [] }
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
  return (openBlock(), createElementBlock("label", _hoisted_1, [
    (props.title?.img)
      ? (openBlock(), createBlock(Img, mergeProps({ key: 0 }, props.title.img, {
          style: { width: props.title.img.width }
        }), null, 16, ["style"]))
      : createCommentVNode("", true),
    (props.title)
      ? (openBlock(), createElementBlock("span", _hoisted_2, toDisplayString(props.title?.text || unref(t)(props.title)), 1))
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
const TitleWithButtons = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-f4f18980"]]);

export { TitleWithButtons as T };
//# sourceMappingURL=TitleWithButtons-BoUQVBI8.js.map
