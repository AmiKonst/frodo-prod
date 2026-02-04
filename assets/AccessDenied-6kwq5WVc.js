import { _ as _export_sfc, u as useI18n, r as reactive, c as createElementBlock, n as createBaseVNode, e as createVNode, i as unref, f as openBlock } from './index-DTAKzpUk.js';
import { E as EmptyLabel } from './EmptyLabel-CtLlE50y.js';

const _hoisted_1 = { class: "box" };

    
const _sfc_main = {
  __name: 'AccessDenied',
  setup(__props) {

    const { t, tm, rt } = useI18n();

    const description = tm('pages.access-denied.descriptions').map(item => rt(item));

    const data = reactive({
        description: description[Math.min(parseInt(Math.random() * description.length), description.length - 1)] 
    });

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1, [
    _cache[0] || (_cache[0] = createBaseVNode("label", { class: "g-c hashtag" }, "#BilboMusic ", -1)),
    createVNode(EmptyLabel, {
      class: "empty",
      title: unref(t)('pages.access-denied.title'),
      description: data.description
    }, null, 8, ["title", "description"])
  ]))
}
}

};
const AccessDenied = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-2761429b"]]);

export { AccessDenied as default };
//# sourceMappingURL=AccessDenied-6kwq5WVc.js.map
