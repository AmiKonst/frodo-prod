import { _ as _export_sfc, s as stores, u as useI18n, c as createElementBlock, d as createCommentVNode, o as openBlock, b as createBlock, z as createBaseVNode, e as createVNode, t as toDisplayString, h as unref, B as Button, r as reactive, f as onMounted, g as onBeforeUnmount, v as withCtx, F as Fragment, R as hooks, I as IconButton, x as normalizeClass, y as message, a as api } from './index-CKTGRZtq.js';
import { _ as _sfc_main$2 } from './Ready-FU265Stf.js';
import { I as Img } from './Img-CgH7Ck6-.js';
import { I as ItemDetail } from './TrackPreview.vue_vue_type_style_index_0_scoped_0fe5f002_lang-Bn00wOa1.js';
import { a as _sfc_main$3, _ as _sfc_main$4 } from './Tracks-CyillPvV.js';
import './State-BhxF9qj2.js';
import './TitleWithButtons-BDlEwcAt.js';
/* empty css                                                                          */
import './Slider-CfwW019_.js';
/* empty css                                                                */
import './EmptyLabel-CPXSCQQQ.js';
/* empty css                                                                    */
/* empty css                                                               */

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
        modals.open('artist', { quietClose: true, data: { code: props.artist.code } });
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
const ArtistPreviewCard = /*#__PURE__*/_export_sfc(_sfc_main$1, [['__scopeId',"data-v-f3275fa7"]]);

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
        modals.open('artist-kebab', { quietClose: true, data: { code: props.code } });
    };

    const init = async () => {
        data.item = await api.artists().getByCode(props.code);
        data.ready = true;
    };

    const openRelease = (item) => {
        if (!item?.id) {
            return;
        }

        nav.open('release', { id: item?.id });
    };

    const openArtist = () => {
        modals.open('artist', { quietClose: true, data: { code: props.code } });
    };

    const openArtistKebab = () => {
        modals.open('artist-kebab', { quietClose: true, data: { code: props.code } });
    };

    onMounted(async () => {
        tg.showBackButton();
        tg.showSettingsButton(openArtistKebab);
    });

    onBeforeUnmount(() => {
        tg.hideSettingsButton(openArtistKebab);
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
              ? (openBlock(), createBlock(_sfc_main$3, {
                  key: 0,
                  take: 1,
                  skeletonCount: 1,
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
              ? (openBlock(), createBlock(_sfc_main$4, {
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
              ? (openBlock(), createBlock(_sfc_main$3, {
                  key: 2,
                  type: "row",
                  take: 8,
                  skeletonCount: 8,
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
const Artist = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-7745b797"]]);

export { Artist as default };
//# sourceMappingURL=Artist-DLbTSFfK.js.map
