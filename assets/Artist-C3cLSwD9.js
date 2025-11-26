import { _ as _export_sfc, s as stores, u as useI18n, c as createElementBlock, d as createCommentVNode, o as openBlock, b as createBlock, m as createBaseVNode, e as createVNode, t as toDisplayString, h as unref, B as Button, r as reactive, j as onMounted, g as onBeforeUnmount, k as withCtx, F as Fragment, Q as hooks, I as IconButton, n as normalizeClass, p as message, a as api } from './index-BDHwKsHx.js';
import { _ as _sfc_main$2 } from './Ready-Bej-wCof.js';
import { I as Img } from './Img-gcuf_tuI.js';
import { I as ItemDetail } from './ItemDetail-I5PX-FBr.js';
import { R as Releases, T as Tracks } from './Tracks-tEUnBjWm.js';
import './TitleWithButtons-X7bn6Eyi.js';
import './State-0Moetx8B.js';
import './Slider-BL43yEF3.js';
import './EmptyLabel-ZoOpGzKS.js';

const _hoisted_1$1 = { class: "box" };
const _hoisted_2 = { key: 0 };
const _hoisted_3 = { class: "title" };

    
const _sfc_main$1 = {
  __name: 'ArtistPreviewCard',
  props: {
        artist: { type: Object, default: () => ({}) }
    },
  setup(__props) {

    const modals = stores.modals();

    const { t } = useI18n();

    const props = __props;

    const open = () => {
        modals.open('artist', { data: { code: 'cmhryr5hl014coi13tbvq6rxm' } });
    };

return (_ctx, _cache) => {
  return (props.artist?.id)
    ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: "artist-preview-card",
        onClick: open
      }, [
        (props.artist?.profileImage)
          ? (openBlock(), createBlock(Img, {
              key: 0,
              preview: props.artist?.profileImage?.resized,
              original: props.artist?.profileImage?.original,
              alt: props.artist.name
            }, null, 8, ["preview", "original", "alt"]))
          : createCommentVNode("", true),
        createBaseVNode("div", _hoisted_1$1, [
          (props.artist.description)
            ? (openBlock(), createElementBlock("p", _hoisted_2, toDisplayString(props.artist.description), 1))
            : createCommentVNode("", true),
          createBaseVNode("label", _hoisted_3, toDisplayString(unref(t)('modals.artist-kebab.about')), 1),
          createVNode(Button, {
            class: "tertiary link size-s",
            name: unref(t)('common.more')
          }, null, 8, ["name"])
        ])
      ]))
    : createCommentVNode("", true)
}
}

};
const ArtistPreviewCard = /*#__PURE__*/_export_sfc(_sfc_main$1, [['__scopeId',"data-v-f4ca172f"]]);

const _hoisted_1 = { class: "buttons" };

    
const _sfc_main = {
  __name: 'Artist',
  props: {
        code: { type: String }
    },
  setup(__props) {

    const { t } = useI18n();

    stores.locale();
    const nav = stores.nav();
    const tg = stores.tg();
    const modals = stores.modals();
    const others = stores.others();

    const props = __props;

    const data = reactive({
        ready: false,
        item: null
    });

    const like = (e) => {
        let button = e?.target?.closest('button');

        if (button) {
            button.classList.remove('dunk');
            setTimeout(() => {
                button.classList.add('dunk');
            }, 10);
        }

        message.info(t('common.soon'));
    };

    const openKebab = () => {
        modals.open('artist-kebab', { data: { code: 'cmhryr5hl014coi13tbvq6rxm' } });
    };

    const init = async () => {
        data.item = await api.artists().get('cmhryr5hl014coi13tbvq6rxm');
        data.ready = true;

        console.log(data.item);
    };

    const openRelease = (item) => {
        if (!item?.id) {
            return;
        }

        nav.open('release', { id: item?.id });
    };

    const openArtist = () => {
        modals.open('artist', { data: { code: 'cmhryr5hl014coi13tbvq6rxm' } });
    };

    onMounted(async () => {
        tg.showBackButton();
        tg.showSettingsButton(() => {
            modals.open('artist-kebab', { data: { code: 'cmhryr5hl014coi13tbvq6rxm' } });
        });
    });

    onBeforeUnmount(() => {
        tg.hideSettingsButton();
        tg.hideBackButton();
    });

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock(Fragment, null, [
    (data.ready)
      ? (openBlock(), createBlock(ItemDetail, {
          key: 0,
          previewHeight: 420
        }, {
          background: withCtx(() => [
            (data.item?.profileImage)
              ? (openBlock(), createBlock(Img, {
                  key: 0,
                  preview: data.item?.profileImage?.crop,
                  original: data.item?.profileImage?.original,
                  alt: data.item.name,
                  skeleton: true
                }, null, 8, ["preview", "original", "alt"]))
              : createCommentVNode("", true)
          ]),
          preview: withCtx(() => [
            (data.item?.name)
              ? (openBlock(), createElementBlock("div", {
                  key: 0,
                  class: "name",
                  onClick: openArtist
                }, toDisplayString(data.item.name), 1))
              : createCommentVNode("", true),
            createBaseVNode("div", _hoisted_1, [
              createVNode(Button, {
                name: unref(t)('player.shuffle'),
                class: "tertiary active size-m",
                icon: "random"
              }, null, 8, ["name"]),
              createVNode(Button, {
                name: unref(t)('player.play'),
                class: "size-m",
                icon: "play"
              }, null, 8, ["name"])
            ])
          ]),
          toolbar: withCtx(() => [
            createVNode(IconButton, {
              icon: "heart",
              class: normalizeClass(["tertiary size-xl", { invert: unref(others).theme !== 'dark' }]),
              onClick: like
            }, null, 8, ["class"]),
            createVNode(IconButton, {
              icon: "tg-stars",
              class: "tertiary size-xl",
              onClick: like
            }),
            createVNode(IconButton, {
              icon: "apps",
              class: normalizeClass(["tertiary size-l", { invert: unref(others).theme !== 'dark' }]),
              onClick: openKebab
            }, null, 8, ["class"])
          ]),
          detail: withCtx(() => [
            (data.item?.id)
              ? (openBlock(), createBlock(Releases, {
                  key: 0,
                  take: 1,
                  params: {
                    contributors: data.item.id,
                    releaseDate_lte: unref(hooks)().toISOString(),
                    releaseDate_gte: unref(hooks)().subtract(1, 'year').toISOString()
                },
                  loadMore: false,
                  sort: {
                    code: 'releaseDate',
                    direction: 'desc'
                },
                  title: "blocks.releases.new-release",
                  onChange: openRelease
                }, null, 8, ["params"]))
              : createCommentVNode("", true),
            (data.item?.id)
              ? (openBlock(), createBlock(Tracks, {
                  key: 1,
                  type: "row",
                  take: 12,
                  params: {
                    contributors: data.item.id
                },
                  sort: {
                    code: 'ratingTotal',
                    direction: 'desc'
                },
                  buttons: [{ name: 'blocks.tracks.all', page: 'artist-tracks', params: { code: data.item.code } }],
                  title: "blocks.tracks.popular-tracks"
                }, null, 8, ["params", "buttons"]))
              : createCommentVNode("", true),
            (data.item?.id)
              ? (openBlock(), createBlock(Releases, {
                  key: 2,
                  type: "row",
                  take: 8,
                  params: {
                    contributors: data.item.id
                },
                  sort: {
                    code: 'releaseDate',
                    direction: 'desc'
                },
                  buttons: [{ name: 'blocks.releases.all', page: 'artist-releases', params: { code: data.item.code } }],
                  title: "blocks.releases.latest-releases",
                  handler: "release"
                }, null, 8, ["params", "buttons"]))
              : createCommentVNode("", true),
            (data.item?.id)
              ? (openBlock(), createBlock(ArtistPreviewCard, {
                  key: 3,
                  artist: data.item
                }, null, 8, ["artist"]))
              : createCommentVNode("", true)
          ]),
          _: 1
        }))
      : createCommentVNode("", true),
    createVNode(_sfc_main$2, {
      page: `artist-${props.code}`,
      init: init
    }, null, 8, ["page"])
  ], 64))
}
}

};
const Artist = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-0e3a8df9"]]);

export { Artist as default };
//# sourceMappingURL=Artist-C3cLSwD9.js.map
