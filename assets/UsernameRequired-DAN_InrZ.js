import { _ as _export_sfc, u as useI18n, r as reactive, c as createElementBlock, l as createBaseVNode, e as createVNode, h as unref, f as openBlock } from './index-ErbI98v-.js';
import { E as EmptyLabel } from './EmptyLabel-Cf2TyZYB.js';

const _hoisted_1 = { class: "box" };

    
const _sfc_main = {
  __name: 'UsernameRequired',
  setup(__props) {

    const { t, tm, rt } = useI18n();

    const description = window.messenger?.code === 'tg' ? tm('pages.username-required.tg-descriptions').map(item => rt(item)) : [];

    const data = reactive({
        description: description[Math.min(parseInt(Math.random() * description.length), description.length - 1)] 
    });

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1, [
    _cache[0] || (_cache[0] = createBaseVNode("label", { class: "g-c hashtag" }, "#BilboMusic ", -1)),
    createVNode(EmptyLabel, {
      class: "empty",
      title: unref(t)('pages.username-required.title'),
      description: data.description
    }, null, 8, ["title", "description"])
  ]))
}
}

};
const UsernameRequired = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-3172bc23"]]);

export { UsernameRequired as default };
//# sourceMappingURL=UsernameRequired-DAN_InrZ.js.map
