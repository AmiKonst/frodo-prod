import { _ as _export_sfc, s as stores, u as useI18n, c as createElementBlock, f as openBlock, d as createCommentVNode, y as toDisplayString, i as unref, F as Fragment, p as renderList, b as createBlock, H as Button } from './index-CC6lvHTZ.js';

const _hoisted_1 = { class: "title" };
const _hoisted_2 = {
  key: 0,
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
const TitleWithButtons = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-d52bb235"]]);

export { TitleWithButtons as T };
//# sourceMappingURL=TitleWithButtons-DYcJtGw5.js.map
