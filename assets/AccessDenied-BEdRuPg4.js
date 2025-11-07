import { _ as _export_sfc, u as useI18n, r as reactive, c as createElementBlock, k as createBaseVNode, e as createVNode, h as unref, F as Fragment, o as openBlock } from './index-Bx6N_rW8.js';
import { E as EmptyLabel } from './EmptyLabel-wFGddf4E.js';

const _sfc_main = {
  __name: 'AccessDenied',
  setup(__props) {

    const { t, tm, rt } = useI18n();

    const description = tm('pages.access-denied.descriptions').map(item => rt(item));

    const data = reactive({
        description: description[Math.min(parseInt(Math.random() * description.length), description.length - 1)] 
    });

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock(Fragment, null, [
    _cache[0] || (_cache[0] = createBaseVNode("label", { class: "g-c hashtag" }, "#BilboMusic ", -1)),
    createVNode(EmptyLabel, {
      class: "empty",
      title: unref(t)('pages.access-denied.title'),
      description: data.description
    }, null, 8, ["title", "description"])
  ], 64))
}
}

};
const AccessDenied = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-aa4e16d8"]]);

export { AccessDenied as default };
//# sourceMappingURL=AccessDenied-BEdRuPg4.js.map
