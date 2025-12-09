import { _ as _export_sfc, s as stores, j as computed, c as createElementBlock, f as openBlock, d as createCommentVNode, F as Fragment, l as renderList, b as createBlock, z as withModifiers, n as normalizeClass, D as Button, t as toDisplayString, q as createBaseVNode } from './index-9Bs__Z_A.js';

const _hoisted_1 = { class: "artist" };
const _hoisted_2 = { key: 1 };
const _hoisted_3 = { key: 1 };

    
const _sfc_main = {
  __name: 'ContributorsPreview',
  props: {
        items: { type: Array, default: () => ([]) },
        invert: { type: Boolean, default: false }
    },
  setup(__props) {

    const nav = stores.nav();

    const props = __props;

    const primaryArtists = computed(() => {
        return props.items?.filter(item =>
            item.role === 'PRIMARY' && (item.artist?.name || item.unregisteredArtistName)).map(item => ({
                name: item.artist?.name || item.unregisteredArtistName,
                id: item.state === 'CONFIRMED' ? item.artist?.id : null,
                code: item.state === 'CONFIRMED' ? item.artist?.code : null
            })) || []
    });

    const featArtists = computed(() => {
        return props.items?.filter(item =>
            item.role === 'FEATURED' && (item.artist?.name || item.unregisteredArtistName)).map(item => ({
                name: item.artist?.name || item.unregisteredArtistName,
                id: item.state === 'CONFIRMED' ? item.artist?.id : null,
                code: item.state === 'CONFIRMED' ? item.artist?.code : null
            })) || []
    });

    const openArtist = (item) => {
        if (!item?.code) {
            return;
        }

        nav.open('artist', { code: item?.code });
    };

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("span", _hoisted_1, [
    (openBlock(true), createElementBlock(Fragment, null, renderList(primaryArtists.value, (item, id) => {
      return (openBlock(), createElementBlock(Fragment, { key: id }, [
        (item.id)
          ? (openBlock(), createBlock(Button, {
              key: 0,
              name: `${item.name}${ id < primaryArtists.value.length - 1 ? ',' : ''}`,
              class: normalizeClass(["size-s tertiary gray link", { invert: props.invert }]),
              onClick: withModifiers($event => (openArtist(item)), ["stop"])
            }, null, 8, ["name", "class", "onClick"]))
          : (openBlock(), createElementBlock("span", _hoisted_2, toDisplayString(`${item.name}${ id < primaryArtists.value.length - 1 ? ',' : ''}`), 1))
      ], 64))
    }), 128)),
    (featArtists.value?.length)
      ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
          _cache[0] || (_cache[0] = createBaseVNode("span", null, "feat.", -1)),
          (openBlock(true), createElementBlock(Fragment, null, renderList(featArtists.value, (item, id) => {
            return (openBlock(), createElementBlock(Fragment, { key: id }, [
              (item.id)
                ? (openBlock(), createBlock(Button, {
                    key: 0,
                    name: `${item.name}${ id < featArtists.value.length - 1 ? ',' : ''}`,
                    class: normalizeClass(["size-s tertiary gray link", { invert: props.invert }]),
                    onClick: withModifiers($event => (openArtist(item)), ["stop"])
                  }, null, 8, ["name", "class", "onClick"]))
                : (openBlock(), createElementBlock("span", _hoisted_3, toDisplayString(`${item.name}${ id < featArtists.value.length - 1 ? ',' : ''}`), 1))
            ], 64))
          }), 128))
        ], 64))
      : createCommentVNode("", true)
  ]))
}
}

};
const ContributorsPreview = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-5ed6b474"]]);

export { ContributorsPreview as C };
//# sourceMappingURL=ContributorsPreview-CMxoFBy_.js.map
