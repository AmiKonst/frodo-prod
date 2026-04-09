import { _ as _export_sfc, u as useI18n, s as stores, o as onMounted, a as onBeforeUnmount, c as createElementBlock, l as createBaseVNode, e as createVNode, v as toDisplayString, h as unref, F as Fragment, f as openBlock } from './index-CuaVwrop.js';
import { _ as _sfc_main$1 } from './Ready-CtCZTLdQ.js';
import { E as EmptyLabel } from './EmptyLabel-Dq-tUJ9d.js';

const _hoisted_1 = { class: "head" };
const _hoisted_2 = { class: "title" };

    
const _sfc_main = {
  __name: 'Playlists',
  setup(__props) {

    const { t } = useI18n();

    // import { storeToRefs } from 'pinia';
    stores.user();
    stores.nav();
    stores.messengers();

    stores.others();

    alert(window.WebApp.version);

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
      icon: "playlist",
      animateClass: "random",
      class: "empty-label",
      title: unref(t)('pages.favorite-playlists.empty.title'),
      description: unref(t)('pages.favorite-playlists.empty.description')
    }, null, 8, ["title", "description"]),
    createVNode(_sfc_main$1, { page: "favorite-playlists" })
  ], 64))
}
}

};
const Playlists = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-744b3d68"]]);

export { Playlists as default };
//# sourceMappingURL=Playlists-ZzzxhH4z.js.map
