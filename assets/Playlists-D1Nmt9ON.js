import { _ as _export_sfc, u as useI18n, s as stores, o as onMounted, a as onBeforeUnmount, c as createElementBlock, y as createBaseVNode, e as createVNode, x as toDisplayString, i as unref, F as Fragment, f as openBlock } from './index-0hYSVCtU.js';
import { _ as _sfc_main$1 } from './Ready-BweqZ8bi.js';
import { E as EmptyLabel } from './EmptyLabel-Dw666zwo.js';

const _hoisted_1 = { class: "head" };
const _hoisted_2 = { class: "title" };

    
const _sfc_main = {
  __name: 'Playlists',
  setup(__props) {

    const { t } = useI18n();

    // import { storeToRefs } from 'pinia';
    stores.user();
    stores.nav();
    const tg = stores.tg();

    stores.others();

    onMounted(() => {
        tg.showBackButton();
    });

    onBeforeUnmount(() => {
        tg.hideBackButton();
    });

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock(Fragment, null, [
    createBaseVNode("div", _hoisted_1, [
      createBaseVNode("label", _hoisted_2, toDisplayString(unref(t)('pages.favorite-playlists.title')), 1)
    ]),
    createVNode(EmptyLabel, {
      class: "empty-label",
      "animate-icon": "playlists",
      title: unref(t)('pages.favorite-playlists.empty.title'),
      description: unref(t)('pages.favorite-playlists.empty.description')
    }, null, 8, ["title", "description"]),
    createVNode(_sfc_main$1, { page: "favorite-playlists" })
  ], 64))
}
}

};
const Playlists = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-d6de71ff"]]);

export { Playlists as default };
//# sourceMappingURL=Playlists-D1Nmt9ON.js.map
