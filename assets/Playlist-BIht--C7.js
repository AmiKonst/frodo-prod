import { _ as _export_sfc, u as useI18n, s as stores, r as reactive, l as computed, o as onMounted, a as onBeforeUnmount, c as createElementBlock, b as createBlock, d as createCommentVNode, e as createVNode, w as withCtx, F as Fragment, x as resolveComponent, f as openBlock, i as unref, I as IconButton, q as normalizeClass, A as AudioToggle, t as Img, v as message, g as api } from './index-VUEJiV-V.js';
import { _ as _sfc_main$1 } from './Ready-1EPm8whb.js';
import { I as ItemDetail } from './ItemDetail-DHLqsBts.js';
import { _ as _sfc_main$2 } from './Tracks-CjdplEMN.js';
import './Block-BA6LjfRM.js';
import './TitleWithButtons-bsxQJ_id.js';
import './EmptyLabel-Cr-X7KF3.js';

const _hoisted_1 = {
  key: 1,
  class: "editorial-logo"
};
const _hoisted_2 = {
  key: 0,
  class: "buttons"
};

    
const _sfc_main = {
  __name: 'Playlist',
  props: {
        id: { type: String }
    },
  setup(__props) {

    const { t } = useI18n();

    const locale = stores.locale();
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

    const playAndShuffle = async () => {
        if (state.value) {
            player.stop();
            player.queue.clear();
        }

        player.playlist.play(data.item.id, { shuffle: true });
        return;
    };

    const pause = async () => {
        player.playlist.pause(data.item.id);
    };

    const play = async () => {
        player.playlist.play(data.item.id);
    };

    const like = (e) => {
        message.info(t('common.soon'));
    };

    const openKebab = () => {
        modals.open('playlist-kebab', { quietClose: true, data: {
            id: props.id,
            item: data.item
        } });
    };

    const init = async () => {
        data.item = await api.playlists().get(props.id);
        data.ready = true;
    };

    onMounted(async () => {
        tg.showSettingsButton(openKebab);
    });

    onBeforeUnmount(() => {
        tg.hideSettingsButton(openKebab);
    });

return (_ctx, _cache) => {
  const _component_Icon = resolveComponent("Icon");

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
                  skeleton: true,
                  checktone: true,
                  wathermark: data.item.type === 'EDITORIAL' ? 'playlists-top' : null,
                  onTone: _cache[0] || (_cache[0] = $event => (data.tone = $event))
                }, null, 8, ["preview", "original", "wathermark"]))
              : createCommentVNode("", true),
            (data.item.type === 'EDITORIAL')
              ? (openBlock(), createElementBlock("div", _hoisted_1, [
                  createVNode(_component_Icon, { icon: "editorial" }),
                  createVNode(_component_Icon, { icon: "editorial" })
                ]))
              : createCommentVNode("", true)
          ]),
          preview: withCtx(() => [
            (data.tone)
              ? (openBlock(), createElementBlock("div", _hoisted_2, [
                  createVNode(IconButton, {
                    name: unref(t)('player.shuffle'),
                    class: normalizeClass([{ invert: !sameColors.value }, "tertiary size-xl dirty"]),
                    icon: "random",
                    dunk: true,
                    onClick: playAndShuffle
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
                    dunk: true,
                    onClick: like
                  }, null, 8, ["class"]),
                  createVNode(IconButton, {
                    icon: "tg-stars",
                    class: "tertiary size-xl",
                    dunk: true,
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
                    store: 'playlists',
                    fnName: 'getTracks'
                },
                  options: {
                    type: 'playlist',
                    id: data.item.id
                },
                  showKebab: true,
                  title: { text: unref(locale).title(data.item.title) }
                }, null, 8, ["getById", "options", "title"]))
              : createCommentVNode("", true)
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
const Playlist = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-47169971"]]);

export { Playlist as default };
//# sourceMappingURL=Playlist-BIht--C7.js.map
