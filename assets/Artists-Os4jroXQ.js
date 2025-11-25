import { _ as _export_sfc, u as useI18n, s as stores, l as onMounted, g as onBeforeUnmount, c as createElementBlock, v as createBaseVNode, e as createVNode, x as toDisplayString, h as unref, F as Fragment, o as openBlock } from './index-h2KunT5V.js';
import { _ as _sfc_main$1 } from './Ready-DLyYQ5xO.js';
import { E as EmptyLabel } from './EmptyLabel-CtfNmPdt.js';

const _hoisted_1 = { class: "head" };
const _hoisted_2 = { class: "title" };

    
const _sfc_main = {
  __name: 'Artists',
  setup(__props) {

    const { t } = useI18n();

    // import { storeToRefs } from 'pinia';
    stores.user();
    stores.nav();
    const tg = stores.tg();

    stores.others();
    // const { ready } = storeToRefs(others);

    onMounted(() => {
        tg.showBackButton();
    });

    onBeforeUnmount(() => {
        tg.hideBackButton();
    });

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock(Fragment, null, [
    createBaseVNode("div", _hoisted_1, [
      createBaseVNode("label", _hoisted_2, toDisplayString(unref(t)('pages.favorite-artists.title')), 1)
    ]),
    createVNode(EmptyLabel, {
      class: "empty-label",
      "animate-icon": "artists",
      title: unref(t)('pages.favorite-artists.empty.title'),
      description: unref(t)('pages.favorite-artists.empty.description')
    }, null, 8, ["title", "description"]),
    createVNode(_sfc_main$1, { page: "favorite-artists" })
  ], 64))
}
}

};
const Artists = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-7e149a1b"]]);

export { Artists as default };
//# sourceMappingURL=Artists-Os4jroXQ.js.map
