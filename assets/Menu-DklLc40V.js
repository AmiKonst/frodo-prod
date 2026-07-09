import { _ as _export_sfc, c as createElementBlock, f as openBlock, t as toDisplayString, u as useI18n, F as Fragment, m as renderList, n as normalizeClass, l as createBaseVNode, b as createBlock, d as createCommentVNode, h as unref } from './index-Tfbpknhu.js';

const _sfc_main$1 = {
  __name: 'Total',
  props: {
        total: { type: [Number, null], default: null }
    },
  setup(__props) {

    const props = __props;

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("span", null, toDisplayString(props.total), 1))
}
}

};
const Total = /*#__PURE__*/_export_sfc(_sfc_main$1, [['__scopeId',"data-v-4b219446"]]);

const _hoisted_1 = { class: "menu" };
const _hoisted_2 = ["onClick"];

    
const _sfc_main = {
  __name: 'Menu',
  props: {
        items: { type: Array, default: () => ([]) },
        code: { type: [String, null], default: null },
        useI18n: { type: Boolean, default: true }
    },
  emits: ['change'],
  setup(__props, { emit: __emit }) {

    const { t } = useI18n();
    const emit = __emit;

    const props = __props;

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("ul", _hoisted_1, [
    (openBlock(true), createElementBlock(Fragment, null, renderList(props.items, (item) => {
      return (openBlock(), createElementBlock("li", {
        key: item.code,
        class: normalizeClass({
                active: item.code === props.code,
                total: !!item.total
            }),
        onClick: $event => (emit('change', item.code))
      }, [
        createBaseVNode("span", null, toDisplayString(props.useI18n ? unref(t)(item.name) : item.name), 1),
        (item.total)
          ? (openBlock(), createBlock(Total, {
              key: 0,
              total: item.total
            }, null, 8, ["total"]))
          : createCommentVNode("", true)
      ], 10, _hoisted_2))
    }), 128))
  ]))
}
}

};
const Menu = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-27d19797"]]);

export { Menu as M };
//# sourceMappingURL=Menu-DklLc40V.js.map
