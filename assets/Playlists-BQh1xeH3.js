import { _ as _export_sfc, u as useI18n, s as stores, o as onMounted, a as onBeforeUnmount, c as createElementBlock, l as createBaseVNode, e as createVNode, v as toDisplayString, h as unref, F as Fragment, f as openBlock } from './index-aOU_KU_i.js';
import { _ as _sfc_main$1 } from './Ready-DmqJW27_.js';
import { E as EmptyLabel } from './EmptyLabel-auAQDZqv.js';

const _hoisted_1 = { class: "head" };
const _hoisted_2 = { class: "title" };

    
const _sfc_main = {
  __name: 'Playlists',
  setup(__props) {

    const { t } = useI18n();

    // import { storeToRefs } from 'pinia';
    stores.user();
    stores.nav();
    stores.tg();

    stores.others();

    onMounted(() => {
    });

    onBeforeUnmount(() => {
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
const Playlists = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-2cae6bb1"]]);

export { Playlists as default };
//# sourceMappingURL=Playlists-BQh1xeH3.js.map
