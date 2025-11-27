import { _ as _export_sfc, u as useI18n, s as stores, r as reactive, j as computed, f as onMounted, g as onBeforeUnmount, c as createElementBlock, b as createBlock, d as createCommentVNode, e as createVNode, k as withCtx, F as Fragment, o as openBlock, l as renderList, h as unref, I as IconButton, n as normalizeClass, m as createBaseVNode, t as toDisplayString, p as message, a as api } from './index-DdilQp92.js';
import { _ as _sfc_main$1 } from './Ready-DTdHgb0y.js';
import { I as Img } from './Img-CX7AlmAk.js';
import { I as ItemDetail } from './ItemDetail-7jqW43sH.js';
import { _ as _sfc_main$2, a as _sfc_main$3, A as AudioToggle } from './Tracks-CDZ71rek.js';
import { _ as _sfc_main$4 } from './Artists-hc2eCUE4.js';
import './State-Cx8z5bJp.js';
import './TitleWithButtons-HApIfKE7.js';
import './Slider-CBqZ8uk1.js';
import './EmptyLabel-3XzRi0wH.js';

const _hoisted_1 = { class: "buttons" };

    
const _sfc_main = {
  __name: 'Release',
  props: {
        id: { type: String }
    },
  setup(__props) {

    const { t } = useI18n();

    stores.locale();
    const tg = stores.tg();
    stores.modals();
    const others = stores.others();
    const player = stores.player();

    const props = __props;

    const data = reactive({
        ready: false,
        item: null,
        tone: null
    });

    const primaryArtists = computed(() => {
        if (!data.item?.contributors?.length) {
            return [];
        }

        return data.item.contributors.filter(item => item.role === 'PRIMARY' && item.state === 'CONFIRMED').map(item => item.artist);
    });

    const featuresArtists = computed(() => {
        if (!data.item?.contributors?.length) {
            return [];
        }

        return data.item.contributors.filter(item => item.role === 'FEATURED' && item.state === 'CONFIRMED').map(item => item.artist);
    });

    const state = computed(() => {
        if (!data.item?.id || !player.panes.default || player.panes.default._queue?.release?.id !== data.item?.id) {
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
        player.release.pause(data.item);
    };

    const play = async () => {
        player.release.play(data.item);
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

    const openKebab = () => {
        // modals.open('artist-kebab', { data: { code: 'cmhryr5hl014coi13tbvq6rxm' || props.code } })
    };

    const init = async () => {
        data.item = await api.releases().get(props.id);
        data.ready = true;

        console.log(data.item);
    };

    const openArtist = () => {
        // modals.open('artist', { data: { code: 'cmhryr5hl014coi13tbvq6rxm' || props.code } })
    };

    onMounted(async () => {
        tg.showBackButton();
        tg.showSettingsButton(() => {
            // modals.open('artist-kebab', { data: { code: 'cmhryr5hl014coi13tbvq6rxm' || props.code } })
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
          previewHeight: null,
          aspectRatio: '1 / 1',
          invertShadow: sameColors.value === null ? null : !sameColors.value
        }, {
          background: withCtx(() => [
            (data.item?.cover)
              ? (openBlock(), createBlock(Img, {
                  key: 0,
                  preview: data.item?.cover?.crop,
                  original: data.item?.cover?.original,
                  alt: data.item.title,
                  skeleton: true,
                  checktone: true,
                  onTone: _cache[0] || (_cache[0] = $event => (data.tone = $event))
                }, null, 8, ["preview", "original", "alt"]))
              : createCommentVNode("", true)
          ]),
          preview: withCtx(() => [
            (data.item?.title)
              ? (openBlock(), createElementBlock("div", {
                  key: 0,
                  class: "title",
                  onClick: openArtist
                }, toDisplayString(data.item.name), 1))
              : createCommentVNode("", true),
            createBaseVNode("div", _hoisted_1, [
              createVNode(IconButton, {
                name: unref(t)('player.shuffle'),
                class: normalizeClass([{ invert: !sameColors.value }, "tertiary size-xl"]),
                icon: "random"
              }, null, 8, ["name", "class"]),
              createVNode(AudioToggle, {
                state: state.value,
                light: true,
                class: normalizeClass(["size-l secondary", { invert: data.tone !== 'dark' }]),
                onPlay: play,
                onPause: pause
              }, null, 8, ["state", "class"])
            ])
          ]),
          toolbar: withCtx(() => [
            createVNode(IconButton, {
              icon: "heart",
              class: normalizeClass(["tertiary size-xl", { invert: !sameColors.value }]),
              onClick: like
            }, null, 8, ["class"]),
            createVNode(IconButton, {
              icon: "tg-stars",
              class: "tertiary size-xl",
              onClick: like
            }),
            createVNode(IconButton, {
              icon: "apps",
              class: normalizeClass(["tertiary size-l", { invert: !sameColors.value }]),
              onClick: openKebab
            }, null, 8, ["class"])
          ]),
          detail: withCtx(() => [
            (data.item?.id)
              ? (openBlock(), createBlock(_sfc_main$2, {
                  key: 0,
                  getById: data.item.id,
                  loadMore: false,
                  source: {
                    store: 'releases',
                    fnName: 'getTracks'
                },
                  title: { text: data.item.title }
                }, null, 8, ["getById", "title"]))
              : createCommentVNode("", true),
            (openBlock(true), createElementBlock(Fragment, null, renderList(primaryArtists.value, (item) => {
              return (openBlock(), createBlock(_sfc_main$3, {
                key: item.id,
                type: "row",
                take: 8,
                skeletonCount: 8,
                params: {
                        contributors: item.id
                    },
                sort: null,
                title: { text: unref(t)('blocks.releases.more-from-author', { name: item.name }) },
                handler: "release"
              }, null, 8, ["params", "title"]))
            }), 128)),
            (openBlock(true), createElementBlock(Fragment, null, renderList(primaryArtists.value.length, (item) => {
              return (openBlock(), createBlock(_sfc_main$4, {
                key: item.id,
                items: primaryArtists.value,
                type: "row",
                source: null,
                loadMore: false,
                handler: "artist",
                title: "blocks.artists.primary"
              }, null, 8, ["items"]))
            }), 128)),
            (openBlock(true), createElementBlock(Fragment, null, renderList(featuresArtists.value.length, (item) => {
              return (openBlock(), createBlock(_sfc_main$4, {
                key: item.id,
                items: featuresArtists.value,
                type: "row",
                source: null,
                loadMore: false,
                handler: "artist",
                title: "blocks.artists.features"
              }, null, 8, ["items"]))
            }), 128))
          ]),
          _: 1
        }, 8, ["invertShadow"]))
      : createCommentVNode("", true),
    createVNode(_sfc_main$1, {
      page: `release-${props.id}`,
      init: init
    }, null, 8, ["page"])
  ], 64))
}
}

};
const Release = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-be0d4a5d"]]);

export { Release as default };
//# sourceMappingURL=Release-BG4tADeM.js.map
