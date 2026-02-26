import { _ as _export_sfc, u as useI18n, s as stores, r as reactive, j as computed, o as onMounted, a as onBeforeUnmount, c as createElementBlock, l as createBaseVNode, e as createVNode, v as toDisplayString, h as unref, I as IconButton, b as createBlock, d as createCommentVNode, B as Button, k as withCtx, F as Fragment, g as api, f as openBlock } from './index-DkMBstfl.js';
import { E as EmptyLabel } from './EmptyLabel-BiRREyH-.js';
import { C as Collage } from './Collage-B7c1cHuo.js';
import { _ as _sfc_main$1 } from './Ready-xQirgbco.js';

const _hoisted_1 = { class: "head" };
const _hoisted_2 = { class: "title" };
const _hoisted_3 = { class: "more" };
const _hoisted_4 = { class: "title" };

    
const _sfc_main = {
  __name: 'Favorite',
  setup(__props) {

    const { t } = useI18n();

    // import { storeToRefs } from 'pinia';
    stores.user();
    const nav = stores.nav();
    const tg = stores.tg();

    stores.others();


    const data = reactive({
        myArtistsPreview: []
    });

    const defaultProfileImage = computed(() => {
        return api.artists().defaultProfileImage;
    });

    const init = async () => {
        const payload = await api.user().getMyArtistsPreview();

        data.myArtistsPreview = payload?.items || [];
    };

    const openSettings = () => {
        stores.nav().open('settings');
    };

    onMounted(() => {
        tg.showSettingsButton(openSettings);
    });

    onBeforeUnmount(() => {
        tg.hideSettingsButton(openSettings);
    });

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock(Fragment, null, [
    createBaseVNode("div", _hoisted_1, [
      createBaseVNode("label", _hoisted_2, toDisplayString(unref(t)('pages.favorite.title')), 1),
      createVNode(IconButton, {
        icon: "settings",
        class: "tertiary size-l",
        onClick: _cache[0] || (_cache[0] = $event => (unref(nav).open('settings')))
      })
    ]),
    createVNode(EmptyLabel, {
      "animate-icon": "tracks",
      title: unref(t)('pages.favorite.tracks.empty.title'),
      description: unref(t)('pages.favorite.tracks.empty.description')
    }, null, 8, ["title", "description"]),
    createBaseVNode("div", _hoisted_3, [
      createBaseVNode("label", _hoisted_4, toDisplayString(unref(t)('pages.favorite.more.title')), 1),
      createBaseVNode("div", null, [
        createVNode(Button, {
          icon: "playlist",
          name: unref(t)('pages.favorite.playlists.title'),
          class: "tap",
          onClick: _cache[1] || (_cache[1] = $event => (unref(nav).open('favorite-playlists')))
        }, null, 8, ["name"]),
        createVNode(Button, {
          icon: "artists",
          name: unref(t)('pages.favorite.artists.title'),
          class: "tap",
          onClick: _cache[2] || (_cache[2] = $event => (unref(nav).open('favorite-artists')))
        }, null, 8, ["name"]),
        (data.myArtistsPreview?.length)
          ? (openBlock(), createBlock(Button, {
              key: 0,
              name: unref(t)('pages.favorite.my-artists.title'),
              class: "tap",
              onClick: _cache[3] || (_cache[3] = $event => (data.myArtistsPreview?.length === 1 ? unref(nav).open('artist', { code: data.myArtistsPreview[0].code }) : unref(nav).open('favorite-my-artists')))
            }, {
              collage: withCtx(() => [
                createVNode(Collage, {
                  items: data.myArtistsPreview.map(item => item.profileImage),
                  default: defaultProfileImage.value,
                  borderRadius: "12px"
                }, null, 8, ["items", "default"])
              ]),
              _: 1
            }, 8, ["name"]))
          : createCommentVNode("", true)
      ])
    ]),
    createVNode(_sfc_main$1, {
      page: "favorite",
      init: init
    })
  ], 64))
}
}

};
const Favorite = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-dc3bfdad"]]);

export { Favorite as default };
//# sourceMappingURL=Favorite-BMS1XP2Q.js.map
