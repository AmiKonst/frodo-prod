import { B as Block } from './Block-DnM3pBfR.js';
import { _ as _export_sfc, s as stores, u as useI18n, j as computed, r as reactive, g as api, t as resolveComponent, c as createElementBlock, f as openBlock, l as createBaseVNode, d as createCommentVNode, b as createBlock, p as normalizeClass, q as Img, e as createVNode, D as withModifiers, I as IconButton, A as AudioToggle, S as State, v as toDisplayString, h as unref, x as ref, k as withCtx, E as mergeProps } from './index-BzMg08Mj.js';
/* empty css                                                                         */

const _hoisted_1 = {
  key: 1,
  class: "buttons"
};
const _hoisted_2 = {
  key: 2,
  class: "logo"
};
const _hoisted_3 = { class: "title" };
const _hoisted_4 = { key: 0 };

    
const _sfc_main$1 = {
  __name: 'PlaylistPreview',
  props: {
        item: { type: Object, default: () => ({}) },
        showState: { type: Boolean, default: false },
        row: { type: Boolean, default: false },
        light: { type: Boolean, default: false },
        playable: { type: Boolean, default: true },
        invert: { type: Boolean, default: false },
        disabled: { type: Boolean, default: false },
        showKebab: { type: Boolean, default: false },
        skeleton: { type: Boolean, default: false }
    },
  emits: ['change'],
  setup(__props, { emit: __emit }) {

    const player = stores.player();
    const modals = stores.modals();
    const locale = stores.locale();

    const { t } = useI18n();

    const props = __props;

    const cover = computed(() => {
        let url;
        if (props.item?.cover instanceof File) {
            url = URL.createObjectURL(props.item.cover);
        }

        return url ? {
            resized: url,
            cover: url,
            original: url
        } : props.item?.cover;
    });

    reactive({
    });


    const defaultCover = computed(() => {
        return api.playlists().defaultCover;
    });

    const openKebab = () => {
        modals.open('playlist-kebab', { quietClose: true, data: { id: props.item?.id } });
    };

    const open = () => {
        if (!props.item?.id) {
            return;
        }

        modals.reopen('playlist', {
            data: props.item?.id,
            popover: true
        });
    };

    const state = computed(() => {
        if (!player.panes.default || player.panes.default._queue?.id !== props.item?.id) {
            return;
        }

        return player.panes.default._state;
    });

    const pause = async () => {
        player.playlist.pause(props.item.id);
        // // Если не наш плейлист играет, ничего не делаем
        // if (player.panes.default?._queue?.id !== props.item?.id) {
        //     return;
        // }

        // // Если идет воспроизведение
        // if (state.value === 'playing') {
        //     player.panes.default.pause();
        //     return;
        // }
    };

    const play = async () => {
        player.playlist.play(props.item.id);
    };

return (_ctx, _cache) => {
  const _component_Icon = resolveComponent("Icon");

  return (openBlock(), createElementBlock("div", {
    class: normalizeClass(["playlist-preview", {
            row: props.row,
            invert: props.invert,
            light: props.light,
            disabled: props.disabled,
            skeleton: props.skeleton
        }])
  }, [
    createBaseVNode("div", null, [
      createBaseVNode("div", {
        class: normalizeClass(["cover", { disabled: false }])
      }, [
        (cover.value?.resized || defaultCover.value?.resized || props.skeleton)
          ? (openBlock(), createBlock(Img, {
              key: 0,
              preview: props.skeleton ? null : cover.value?.resized || defaultCover.value?.resized,
              original: props.skeleton ? null : cover.value?.original || defaultCover.value?.original,
              skeleton: true,
              aspectRatio: "1 / 1",
              wathermark: props.item.type === 'EDITORIAL' ? 'playlists' : null
            }, null, 8, ["preview", "original", "wathermark"]))
          : createCommentVNode("", true),
        (props.playable)
          ? (openBlock(), createElementBlock("div", _hoisted_1, [
              createVNode(IconButton, {
                onClick: withModifiers(open, ["stop"]),
                class: "open size-s tertiary invert",
                icon: "preview-list"
              }),
              createVNode(AudioToggle, {
                state: state.value,
                onPlay: play,
                onPause: pause
              }, null, 8, ["state"])
            ]))
          : createCommentVNode("", true),
        (props.item.type === 'EDITORIAL')
          ? (openBlock(), createElementBlock("div", _hoisted_2, [
              createVNode(_component_Icon, { icon: "editorial" }),
              createVNode(_component_Icon, { icon: "editorial" })
            ]))
          : createCommentVNode("", true)
      ]),
      (!props.row && props.showState && props.item?.state)
        ? (openBlock(), createBlock(State, {
            key: 0,
            state: props.item?.state,
            class: "solid"
          }, null, 8, ["state"]))
        : createCommentVNode("", true)
    ]),
    createBaseVNode("div", null, [
      createBaseVNode("div", null, [
        createBaseVNode("span", _hoisted_3, toDisplayString(unref(locale).title(props.item?.title) || unref(t)('playlists.empty-name')), 1),
        (props.row && props.showState && props.item?.state)
          ? (openBlock(), createBlock(State, {
              key: 0,
              state: props.item?.state
            }, null, 8, ["state"]))
          : createCommentVNode("", true)
      ])
    ]),
    (props.showKebab)
      ? (openBlock(), createElementBlock("div", _hoisted_4, [
          createVNode(IconButton, {
            onClick: withModifiers(openKebab, ["stop"]),
            class: "size-s tertiary",
            icon: "more-vertical"
          })
        ]))
      : createCommentVNode("", true)
  ], 2))
}
}

};
const PlaylistPreview = /*#__PURE__*/_export_sfc(_sfc_main$1, [['__scopeId',"data-v-b3daf68c"]]);

const _sfc_main = {
  __name: 'Playlists',
  props: {
        empty: { type: Object, default: () => ({}) },
        items: { type: Array, default: () => ([]) },
        title: { type: [Object, String, null], default: null },
        params: { type: Object, default: () => ({}) },
        sort: { type: [Object, null], default: () => ({
            code: 'title',
            direction: 'asc'
        }) },
        light: { type: Boolean, default: true },
        showKebab: { type: Boolean, default: false },
        loadMore: { type: Boolean, default: true },
        skeleton: { type: Boolean, default: true },
        skeletonCount: { type: Number, default: 30 },
        itemsInCol: { type: Number, default: 1 },
        take: { type: Number, default: 30 },
        handler: { type: [String, null], default: () => null },
        type: { type: String, default: 'list' },
        source: { type: [Object, null], default: () => ({ store: 'playlists', fnName: 'list' }) },
        buttons: { type: Array, default: () => ([]) },
        getById: { type: [String, null], default: null },
        subtype: { type: [String, null], default: null }
    },
  emits: ['change'],
  setup(__props, { expose: __expose, emit: __emit }) {

    const emit = __emit;

    const nav = stores.nav();
    
    const block = ref(null);

    const props = __props;

    const reload = () => {
        if (block?.value?.reload) {
            block.value.reload();
        }
    };

    const onClick = (item) => {
        emit('change', item);

        if (props.handler === 'playlist' && item?.id) {
            nav.open('playlist', { id: item?.id });
        }
    };

    __expose({
        reload
    });


return (_ctx, _cache) => {
  return (openBlock(), createBlock(Block, mergeProps({ code: "playlists" }, props, {
    ref_key: "block",
    ref: block,
    onChange: onClick,
    sliderProps: props.subtype === 'row' ? {
            itemWidth: '60%',
            colAlign: 'start',
            colGap: '8px',
            rowGap: '8px'
        } : {
            itemWidth: props.light ? '90px' : '130px',
            // itemHeight: '192px',
            colAlign: 'start',
            colGap: '8px',
            rowGap: '8px',
            snapType: 'none'
        }
  }), {
    "list-item": withCtx(({ item }) => [
      createVNode(PlaylistPreview, {
        row: props.subtype === null ? true : props.subtype === 'row',
        light: props.light,
        item: item,
        showKebab: props.showKebab
      }, null, 8, ["row", "light", "item", "showKebab"])
    ]),
    "list-skeleton": withCtx(() => [
      createVNode(PlaylistPreview, {
        row: props.subtype === null ? true : props.subtype === 'row',
        playable: false,
        light: props.light,
        skeleton: true
      }, null, 8, ["row", "light"])
    ]),
    "row-item": withCtx(({ item }) => [
      createVNode(PlaylistPreview, {
        row: props.subtype === 'row' || false,
        playable: false,
        light: props.light,
        item: item,
        showKebab: props.showKebab
      }, null, 8, ["row", "light", "item", "showKebab"])
    ]),
    "row-skeleton": withCtx(() => [
      createVNode(PlaylistPreview, {
        row: props.subtype === 'row' || false,
        light: props.light,
        playable: false,
        skeleton: true
      }, null, 8, ["row", "light"])
    ]),
    _: 1
  }, 16, ["sliderProps"]))
}
}

};

export { _sfc_main as _ };
//# sourceMappingURL=Playlists-CiYRzbvJ.js.map
