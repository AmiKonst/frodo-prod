import { _ as _export_sfc, s as stores, u as useI18n, c as createElementBlock, f as openBlock, b as createBlock, d as createCommentVNode, n as createBaseVNode, F as Fragment, p as renderList, i as unref, q as normalizeClass, H as Button } from './index-DCNJa9Wi.js';
import { T as TitleWithButtons } from './TitleWithButtons-7qGpAfHv.js';

const _hoisted_1 = { class: "dicts" };

    
const _sfc_main = {
  __name: 'DictsList',
  props: {
        title: { type: [String, null], default: null },
        type: { type: String, default: '' },
        clickable: { type: Boolean, default: true },
        items: { type: Array, default: () => ([]) }
    },
  setup(__props) {

    const nav = stores.nav();

    const { t } = useI18n();

    const props = __props;


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1, [
    (props.title)
      ? (openBlock(), createBlock(TitleWithButtons, {
          key: 0,
          title: props.title
        }, null, 8, ["title"]))
      : createCommentVNode("", true),
    createBaseVNode("div", null, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(props.items, (item) => {
        return (openBlock(), createBlock(Button, {
          key: item.id,
          name: item.title,
          class: normalizeClass(props.clickable ? 'secondary size-m' : 'tertiary link size-m'),
          onClick: $event => (props.clickable ? unref(nav).open(props.type, { code: item.code }) : null)
        }, null, 8, ["name", "class", "onClick"]))
      }), 128))
    ])
  ]))
}
}

};
const DictsList = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-3f7f6f5b"]]);

export { DictsList as D };
//# sourceMappingURL=DictsList-BxMD9KxI.js.map
