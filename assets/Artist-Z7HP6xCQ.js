import { _ as _export_sfc, s as stores, u as useI18n, c as createElementBlock, d as createCommentVNode, f as openBlock, b as createBlock, n as createBaseVNode, t as Img, e as createVNode, y as toDisplayString, i as unref, H as Button, r as reactive, l as computed, o as onMounted, a as onBeforeUnmount, w as withCtx, F as Fragment, O as hooks, I as IconButton, q as normalizeClass, A as AudioToggle, v as message, g as api } from './index-D_APBmRE.js';
import { _ as _sfc_main$2 } from './Ready-CYVvygMh.js';
import { I as ItemDetail } from './ItemDetail-DKJNhNW0.js';
/* empty css                                                                           */
import { _ as _sfc_main$3 } from './Releases-BQedLmmO.js';
import { _ as _sfc_main$4 } from './Tracks-Dh5xWH9S.js';
import './Block-DKUhvQze.js';
import './TitleWithButtons-BbJnyUv2.js';
import './EmptyLabel-B76L4uV2.js';

const _hoisted_1$1 = { class: "box" };
const _hoisted_2 = { class: "title" };
const _hoisted_3 = { key: 0 };

    
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
          createBaseVNode("label", _hoisted_2, toDisplayString(unref(t)('modals.artist-kebab.about')), 1),
          (props.artist.description)
            ? (openBlock(), createElementBlock("p", _hoisted_3, toDisplayString(props.artist.description), 1))
            : createCommentVNode("", true),
          createVNode(Button, {
            class: "secondary size-s",
            name: unref(t)('common.more')
          }, null, 8, ["name"])
        ])
      ]))
    : createCommentVNode("", true)
}
}

};
const ArtistPreviewCard = /*#__PURE__*/_export_sfc(_sfc_main$1, [['__scopeId',"data-v-47835276"]]);

const _hoisted_1 = {
  key: 1,
  class: "buttons"
};

    
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
    const player = stores.player();

    const props = __props;

    const data = reactive({
        ready: false,
        item: null,
        tone: null
    });

    const state = computed(() => {
        if (!data.item?.id || !player.panes.default || player.panes.default._queue?.id !== data.item?.id) {
            return;
        }

        return player.panes.default._state;
    });

    const sameColors = computed(() => {
        if (data.tone === null) {
            return null;
        }

        return (others.theme !== 'dark' && data.tone !== 'dark') || (others.theme === 'dark' && data.tone === 'dark');
    });

    const pause = async () => {
        player.artist.pause(data.item.id);
    };

    const play = async () => {
        player.artist.play(data.item.id);
    };

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
        modals.open('artist', { quietClose: true, data: {
            code: props.code,
            item: data.item
        } });
    };

    const openArtistKebab = () => {
        modals.open('artist-kebab', { quietClose: true, data: {
            code: props.code,
            item: data.item
        } });
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
                  skeleton: true,
                  checktone: true,
                  onTone: _cache[0] || (_cache[0] = $event => (data.tone = $event))
                }, null, 8, ["preview", "original", "alt"]))
              : createCommentVNode("", true)
          ]),
          preview: withCtx(() => [
            (data.item?.name && data.tone)
              ? (openBlock(), createElementBlock("div", {
                  key: 0,
                  class: normalizeClass(["name", { invert: !sameColors.value }]),
                  onClick: openArtist
                }, toDisplayString(data.item.name), 3))
              : createCommentVNode("", true),
            (data.tone)
              ? (openBlock(), createElementBlock("div", _hoisted_1, [
                  createVNode(IconButton, {
                    name: unref(t)('player.shuffle'),
                    class: normalizeClass([{ invert: !sameColors.value }, "tertiary size-xl dirty"]),
                    icon: "random"
                  }, null, 8, ["name", "class"]),
                  createVNode(AudioToggle, {
                    state: state.value,
                    light: true,
                    class: normalizeClass(["size-l secondary dirty", { invert: data.tone !== 'dark' }]),
                    onPlay: play,
                    onPause: pause
                  }, null, 8, ["state", "class"])
                ]))
              : createCommentVNode("", true)
          ]),
          toolbar: withCtx(() => [
            (data.tone)
              ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                  createVNode(IconButton, {
                    icon: "unlike",
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
                    onClick: openArtistKebab
                  }, null, 8, ["class"])
                ], 64))
              : createCommentVNode("", true)
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
                  light: false,
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
                    contributors: data.item.id,
                    state: 'PUBLISHED'
                },
                  sort: {
                    code: 'ratingTotal',
                    direction: 'desc'
                },
                  options: {
                    type: 'artist',
                    id: data.item.id
                },
                  loadMore: false,
                  buttons: [{
                    name: 'blocks.tracks.all',
                    page: 'artist-tracks',
                    params: {
                        code: data.item.code
                    }
                }],
                  title: "blocks.tracks.popular-tracks"
                }, null, 8, ["params", "options", "buttons"]))
              : createCommentVNode("", true),
            (data.item?.id)
              ? (openBlock(), createBlock(_sfc_main$3, {
                  key: 2,
                  type: "row",
                  take: 8,
                  skeletonCount: 8,
                  params: {
                    contributors: data.item.id,
                    state: 'PUBLISHED'
                },
                  sort: {
                    code: 'releaseDate',
                    direction: 'desc'
                },
                  loadMore: false,
                  buttons: [{
                    name: 'blocks.releases.all',
                    page: 'artist-releases',
                    params: {
                        code: data.item.code
                    }
                }],
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
const Artist = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-5f16dd5f"]]);

export { Artist as default };
//# sourceMappingURL=Artist-Z7HP6xCQ.js.map
