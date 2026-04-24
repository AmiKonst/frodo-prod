import { _ as _export_sfc, u as useI18n, s as stores, r as reactive, j as computed, o as onMounted, a as onBeforeUnmount, c as createElementBlock, l as createBaseVNode, b as createBlock, d as createCommentVNode, e as createVNode, v as toDisplayString, h as unref, I as IconButton, C as createSlots, k as withCtx, B as Button, F as Fragment, g as api, f as openBlock } from './index-DqmhbH1W.js';
import { _ as _sfc_main$1, C as Collage } from './Tracks-_47cJBGD.js';
import './EmptyLabel-DCEkIbIE.js';
import { _ as _sfc_main$2 } from './Ready-DtJcS1_e.js';
import './Block-oOANgwlZ.js';
import './TitleWithButtons-DaVSwulm.js';

const _hoisted_1 = { class: "head" };
const _hoisted_2 = { class: "title" };
const _hoisted_3 = { class: "more" };
const _hoisted_4 = { class: "title" };

    
const _sfc_main = {
  __name: 'Favorite',
  setup(__props) {

    const { t } = useI18n();



    stores.user();
    const nav = stores.nav();
    const messengers = stores.messengers();

    stores.others();


    const data = reactive({
        ready: false,
        myArtistsPreview: [],
        artistsPreview: [],
        releasesPreview: [],
        playlistsPreview: []
    });

    const defaultProfileImage = computed(() => {
        return api.artists().defaultProfileImage;
    });

    const defaultReleaseCover = computed(() => {
        return api.artists().defaultCover;
    });

    const defaultPlaylistCover = computed(() => {
        return api.playlists().defaultCover;
    });
    

    // Preview
        const getMyArtistsPreview = async () => {
            const payload = await api.user().getMyArtistsPreview();

            data.myArtistsPreview = payload?.items || [];
        };

        const getArtistsPreview = async () => {
            const payload = await api.favorite().artists.preview();
            data.artistsPreview = payload?.items || [];
        };

        const getReleasesPreview = async () => {
            const payload = await api.favorite().releases.preview();
            data.releasesPreview = payload?.items || [];
        };

        const getPlaylistsPreview = async () => {
            const payload = await api.favorite().playlists.preview();
            data.playlistsPreview = payload?.items || [];
        };

    const init = async () => {
        getMyArtistsPreview();
        getArtistsPreview();
        getReleasesPreview();
        getPlaylistsPreview();

        data.ready = true;
    };

    const openSettings = () => {
        stores.nav().open('settings');
    };

    onMounted(() => {
        messengers.showSettingsButton(openSettings);
    });

    onBeforeUnmount(() => {
        messengers.hideSettingsButton(openSettings);
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
    (data.ready)
      ? (openBlock(), createBlock(_sfc_main$1, {
          key: 0,
          type: "row",
          take: 12,
          source: {
            store: 'favorite',
            fnName: 'getTracks'
        },
          handler: "track",
          loadMore: false,
          buttons: [{
            name: 'blocks.tracks.all',
            page: 'favorite-tracks',
            hideIfEmpty: true
        }],
          empty: {
            icon: 'favorite',
            title: unref(t)('pages.favorite.tracks.empty.title'),
            description: unref(t)('pages.favorite.tracks.empty.description')
        },
          showKebab: true,
          sort: {
            code: 'releaseDate',
            direction: 'desc'
        },
          title: "pages.favorite.tracks.title"
        }, null, 8, ["empty"]))
      : createCommentVNode("", true),
    createBaseVNode("div", _hoisted_3, [
      createBaseVNode("label", _hoisted_4, toDisplayString(unref(t)('pages.favorite.more.title')), 1),
      createBaseVNode("div", null, [
        createVNode(Button, {
          icon: "playlist",
          name: unref(t)('pages.favorite.playlists.title'),
          class: "tap",
          onClick: _cache[1] || (_cache[1] = $event => (data.playlistsPreview?.length === 1 ? unref(nav).open('playlist', { id: data.playlistsPreview[0].id }) : unref(nav).open('favorite-playlists')))
        }, createSlots({ _: 2 }, [
          (data.playlistsPreview.length)
            ? {
                name: "collage",
                fn: withCtx(() => [
                  createVNode(Collage, {
                    items: data.playlistsPreview.map(item => item.cover),
                    default: defaultPlaylistCover.value,
                    borderRadius: "12px"
                  }, null, 8, ["items", "default"])
                ]),
                key: "0"
              }
            : undefined
        ]), 1032, ["name"]),
        createVNode(Button, {
          icon: "artists",
          name: unref(t)('pages.favorite.artists.title'),
          class: "tap",
          onClick: _cache[2] || (_cache[2] = $event => (data.artistsPreview?.length === 1 ? unref(nav).open('artist', { code: data.artistsPreview[0].code }) : unref(nav).open('favorite-artists')))
        }, createSlots({ _: 2 }, [
          (data.artistsPreview.length)
            ? {
                name: "collage",
                fn: withCtx(() => [
                  createVNode(Collage, {
                    items: data.artistsPreview.map(item => item.profileImage),
                    default: defaultProfileImage.value,
                    borderRadius: "12px"
                  }, null, 8, ["items", "default"])
                ]),
                key: "0"
              }
            : undefined
        ]), 1032, ["name"]),
        createVNode(Button, {
          icon: "release",
          name: unref(t)('pages.favorite.releases.title'),
          class: "tap",
          onClick: _cache[3] || (_cache[3] = $event => (data.releasesPreview?.length === 1 ? unref(nav).open('release', { id: data.releasesPreview[0].id }) : unref(nav).open('favorite-releases')))
        }, createSlots({ _: 2 }, [
          (data.releasesPreview.length)
            ? {
                name: "collage",
                fn: withCtx(() => [
                  createVNode(Collage, {
                    items: data.releasesPreview.map(item => item.cover),
                    default: defaultReleaseCover.value,
                    borderRadius: "12px"
                  }, null, 8, ["items", "default"])
                ]),
                key: "0"
              }
            : undefined
        ]), 1032, ["name"]),
        (data.myArtistsPreview?.length)
          ? (openBlock(), createBlock(Button, {
              key: 0,
              name: unref(t)('pages.favorite.my-artists.title'),
              class: "tap",
              onClick: _cache[4] || (_cache[4] = $event => (data.myArtistsPreview?.length === 1 ? unref(nav).open('artist', { code: data.myArtistsPreview[0].code }) : unref(nav).open('favorite-my-artists')))
            }, createSlots({ _: 2 }, [
              (data.myArtistsPreview.length)
                ? {
                    name: "collage",
                    fn: withCtx(() => [
                      createVNode(Collage, {
                        items: data.myArtistsPreview.map(item => item.profileImage),
                        default: defaultProfileImage.value,
                        borderRadius: "12px"
                      }, null, 8, ["items", "default"])
                    ]),
                    key: "0"
                  }
                : undefined
            ]), 1032, ["name"]))
          : createCommentVNode("", true)
      ])
    ]),
    createVNode(_sfc_main$2, {
      page: "favorite",
      init: init
    })
  ], 64))
}
}

};
const Favorite = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-e0443212"]]);

export { Favorite as default };
//# sourceMappingURL=Favorite-CPf9mUa8.js.map
