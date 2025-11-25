import { _ as _export_sfc, u as useI18n, y as resolveComponent, c as createElementBlock, o as openBlock, e as createVNode, v as createBaseVNode, x as toDisplayString, h as unref, z as normalizeClass } from './index-28UnDxfp.js';

const _hoisted_1 = ["title"];

    
const _sfc_main = {
  __name: 'State',
  props: {
        state: { type: [String, null], default: null }
    },
  setup(__props) {

    const { t } = useI18n();

    const props = __props;

return (_ctx, _cache) => {
  const _component_Icon = resolveComponent("Icon");

  return (openBlock(), createElementBlock("span", {
    class: normalizeClass(["state", [props.state.toLowerCase()]]),
    title: unref(t)(`state.default.code.${ props.state.toLowerCase() }`)
  }, [
    createVNode(_component_Icon, {
      icon: `workflow-${ props.state.toLowerCase() }`
    }, null, 8, ["icon"]),
    createBaseVNode("span", null, toDisplayString(unref(t)(`state.default.code.${ props.state.toLowerCase() }`)), 1)
  ], 10, _hoisted_1))
}
}

};
const State = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-414a25e2"]]);

export { State as S };
//# sourceMappingURL=State-BtkS-Yfh.js.map
