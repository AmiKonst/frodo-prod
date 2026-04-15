import { _ as _export_sfc, u as useI18n, s as stores, o as onMounted, a as onBeforeUnmount, c as createElementBlock, l as createBaseVNode, e as createVNode, v as toDisplayString, h as unref, F as Fragment, f as openBlock } from './index-BV0G1DwU.js';
import { _ as _sfc_main$1 } from './Ready-BFKQkgoe.js';
import { E as EmptyLabel } from './EmptyLabel-Bothlhu6.js';

const _hoisted_1 = { class: "head" };
const _hoisted_2 = { class: "title" };

    
const _sfc_main = {
  __name: 'Artists',
  setup(__props) {

    const { t } = useI18n();

    // import { storeToRefs } from 'pinia';
    stores.user();
    stores.nav();
    stores.messengers();

    stores.others();
    // const { ready } = storeToRefs(others);

    onMounted(() => {
    });

    onBeforeUnmount(() => {
    });

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock(Fragment, null, [
    createBaseVNode("div", _hoisted_1, [
      createBaseVNode("label", _hoisted_2, toDisplayString(unref(t)('pages.favorite-artists.title')), 1)
    ]),
    createVNode(EmptyLabel, {
      animateClass: "random",
      icon: "artists",
      class: "empty-label",
      title: unref(t)('pages.favorite-artists.empty.title'),
      description: unref(t)('pages.favorite-artists.empty.description')
    }, null, 8, ["title", "description"]),
    createVNode(_sfc_main$1, { page: "favorite-artists" })
  ], 64))
}
}

};
const Artists = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-b194621a"]]);

export { Artists as default };
//# sourceMappingURL=Artists-DDLpVLdp.js.map
