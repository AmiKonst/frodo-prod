import { _ as _export_sfc, u as useI18n, s as stores, r as reactive, l as computed, o as onMounted, a as onBeforeUnmount, c as createElementBlock, b as createBlock, d as createCommentVNode, e as createVNode, w as withCtx, F as Fragment, f as openBlock, n as createBaseVNode, p as renderList, i as unref, I as IconButton, q as normalizeClass, A as AudioToggle, t as Img, v as message, g as api } from './index-rWxl7z7a.js';
import { _ as _sfc_main$1 } from './Ready-BSl2ShCW.js';
import { I as ItemDetail } from './ItemDetail-Ca4v07ej.js';
/* empty css                                                                           */
import { _ as _sfc_main$3 } from './Releases-D1LIy3-Q.js';
import { _ as _sfc_main$2 } from './Tracks-C2xrxrpG.js';
import { _ as _sfc_main$4 } from './Artists-DK5sbqTs.js';
import './Block-BH4_EPgd.js';
import './TitleWithButtons-BoibIKsr.js';
import './EmptyLabel-Dq8FdHVV.js';

const _hoisted_1 = {
  key: 0,
  class: "buttons"
};

    
const _sfc_main = {
  __name: 'Release',
  props: {
        id: { type: String }
    },
  setup(__props) {

    const { t } = useI18n();

    stores.locale();
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
        player.release.pause(data.item.id);
    };

    const play = async () => {
        player.release.play(data.item.id);
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
        modals.open('release-kebab', { quietClose: true, data: {
            id: props.id,
            item: data.item
        } });
    };

    const init = async () => {
        data.item = await api.releases().get(props.id);
        data.ready = true;
    };

    onMounted(async () => {
        tg.showBackButton();
        tg.showSettingsButton(openKebab);

        window.onerror = function (message, source, lineno, colno, error) {
    document.getElementById("errorLabel").innerText =
        "Ошибка: " + message +
        "\nСтрока: " + lineno +
        "\nФайл: " + source;
};
    });

    onBeforeUnmount(() => {
        tg.hideSettingsButton(openKebab);
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
                ], 64))
              : createCommentVNode("", true)
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
                  options: {
                    type: 'release',
                    id: data.item.id
                },
                  showKebab: true,
                  title: { text: data.item.title }
                }, null, 8, ["getById", "options", "title"]))
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
            (primaryArtists.value.length)
              ? (openBlock(), createBlock(_sfc_main$4, {
                  key: 1,
                  items: primaryArtists.value,
                  type: "row",
                  source: null,
                  loadMore: false,
                  handler: "artist",
                  title: "blocks.artists.primary"
                }, null, 8, ["items"]))
              : createCommentVNode("", true),
            (featuresArtists.value.length)
              ? (openBlock(), createBlock(_sfc_main$4, {
                  key: 2,
                  items: featuresArtists.value,
                  type: "row",
                  source: null,
                  loadMore: false,
                  handler: "artist",
                  title: "blocks.artists.features"
                }, null, 8, ["items"]))
              : createCommentVNode("", true),
            _cache[1] || (_cache[1] = createBaseVNode("label", {
              id: "errorLabel",
              style: {"color":"red"}
            }, null, -1))
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
const Release = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-355a489f"]]);

export { Release as default };
//# sourceMappingURL=Release-ZxX5mM6G.js.map
