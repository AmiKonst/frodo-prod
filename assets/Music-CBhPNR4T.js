const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/WidgetMoreDiscoveries-CD8cYi3Q.js","assets/index-CR7k28XP.js","assets/index-C7V_IU1n.css","assets/WidgetMoreDiscoveries-CdT2AMwv.css"])))=>i.map(i=>d[i]);
import { c as createElementBlock, d as createCommentVNode, f as openBlock, b as createBlock, F as Fragment, _ as _export_sfc, s as stores, u as useI18n, j as computed, r as reactive, g as api, t as resolveComponent, l as createBaseVNode, n as normalizeClass, p as Img, e as createVNode, C as withModifiers, I as IconButton, A as AudioToggle, Y as State, v as toDisplayString, h as unref, x as ref, k as withCtx, O as mergeProps, m as renderList, w as watch, o as onMounted, al as resolveDynamicComponent, a3 as defineAsyncComponent, am as markRaw, a5 as __vitePreload, an as onActivated, ao as onDeactivated } from './index-CR7k28XP.js';
import { _ as _sfc_main$d } from './Artists-BDnnZnFK.js';
import { _ as _sfc_main$e } from './Tracks-D5FC0Cdf.js';
import { _ as _sfc_main$f } from './Releases-ybq47tzP.js';
import { B as Block } from './Block-BgmLh7Pf.js';
/* empty css                                                                         */
import { T as TitleWithButtons } from './TitleWithButtons-BDROImmx.js';
import { _ as _sfc_main$g } from './Ready-fj_R6j7s.js';
import './Collage-BUhMz9MC.js';
import './EmptyLabel-BAQIRAue.js';

const _sfc_main$c = {
  __name: 'WidgetArtists',
  props: {
        item: { type: [Object, null], default: null }
    },
  setup(__props) {

    const props = __props;

return (_ctx, _cache) => {
  return (props.item?.id && props.item?.artists?.length)
    ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
        (!props.item.template || props.item.template === 'ROW_BIG')
          ? (openBlock(), createBlock(_sfc_main$d, {
              key: 0,
              items: props.item.artists.map(item => item.artist),
              type: "row",
              source: null,
              loadMore: false,
              handler: "artist",
              title: props.item.name ? {
                    text: props.item.name,
                    img: props.item.cover?.resized ? {
                        preview: props.item.cover.resized,
                        original: props.item.cover.original,
                        skeleton: true,
                        aspectRatio: '1 / 1',
                        width: '48px',
                        height: '48px'
                    } : null
                } : null
            }, null, 8, ["items", "title"]))
          : (props.item.template === 'ROW')
            ? (openBlock(), createBlock(_sfc_main$d, {
                key: 1,
                items: props.item.artists.map(item => item.artist),
                type: "row",
                subtype: "row",
                itemsInCol: 2,
                source: null,
                loadMore: false,
                handler: "artist",
                title: props.item.name ? {
                    text: props.item.name,
                    img: props.item.cover?.resized ? {
                        preview: props.item.cover.resized,
                        original: props.item.cover.original,
                        skeleton: true,
                        aspectRatio: '1 / 1',
                        width: '48px',
                        height: '48px'
                    } : null
                } : null
              }, null, 8, ["items", "title"]))
            : (props.item.template === 'LIST')
              ? (openBlock(), createBlock(_sfc_main$d, {
                  key: 2,
                  items: props.item.artists.map(item => item.artist),
                  type: "list",
                  source: null,
                  loadMore: false,
                  showKebab: true,
                  handler: "artist",
                  title: props.item.name ? {
                    text: props.item.name,
                    img: props.item.cover?.resized ? {
                        preview: props.item.cover.resized,
                        original: props.item.cover.original,
                        skeleton: true,
                        aspectRatio: '1 / 1',
                        width: '48px',
                        height: '48px'
                    } : null
                } : null
                }, null, 8, ["items", "title"]))
              : createCommentVNode("", true)
      ], 64))
    : createCommentVNode("", true)
}
}

};

const _sfc_main$b = {
  __name: 'WidgetTracks',
  props: {
        item: { type: [Object, null], default: null }
    },
  setup(__props) {

    const props = __props;

return (_ctx, _cache) => {
  return (props.item?.id && props.item?.tracks?.length)
    ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
        (!props.item.template || props.item.template === 'ROW_BIG')
          ? (openBlock(), createBlock(_sfc_main$e, {
              key: 0,
              items: props.item.tracks.map(item => item.track),
              type: "row",
              subtype: "extended",
              itemsInCol: 1,
              source: null,
              loadMore: false,
              handler: "track",
              title: props.item.name ? {
                    text: props.item.name,
                    img: props.item.cover?.resized ? {
                        preview: props.item.cover.resized,
                        original: props.item.cover.original,
                        skeleton: true,
                        aspectRatio: '1 / 1',
                        width: '48px',
                        height: '48px'
                    } : null
                } : null
            }, null, 8, ["items", "title"]))
          : (props.item.template === 'ROW')
            ? (openBlock(), createBlock(_sfc_main$e, {
                key: 1,
                items: props.item.tracks.map(item => item.track),
                type: "row",
                source: null,
                loadMore: false,
                handler: "track",
                title: props.item.name ? {
                    text: props.item.name,
                    img: props.item.cover?.resized ? {
                        preview: props.item.cover.resized,
                        original: props.item.cover.original,
                        skeleton: true,
                        aspectRatio: '1 / 1',
                        width: '48px',
                        height: '48px'
                    } : null
                } : null
              }, null, 8, ["items", "title"]))
            : (props.item.template === 'LIST')
              ? (openBlock(), createBlock(_sfc_main$e, {
                  key: 2,
                  items: props.item.tracks.map(item => item.track),
                  type: "list",
                  source: null,
                  loadMore: false,
                  showKebab: true,
                  handler: "track",
                  title: props.item.name ? {
                    text: props.item.name,
                    img: props.item.cover?.resized ? {
                        preview: props.item.cover.resized,
                        original: props.item.cover.original,
                        skeleton: true,
                        aspectRatio: '1 / 1',
                        width: '48px',
                        height: '48px'
                    } : null
                } : null
                }, null, 8, ["items", "title"]))
              : createCommentVNode("", true)
      ], 64))
    : createCommentVNode("", true)
}
}

};

const _sfc_main$a = {
  __name: 'WidgetReleases',
  props: {
        item: { type: [Object, null], default: null }
    },
  setup(__props) {

    const props = __props;

return (_ctx, _cache) => {
  return (props.item?.id && props.item?.releases?.length)
    ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
        (!props.item.template || props.item.template === 'ROW_BIG')
          ? (openBlock(), createBlock(_sfc_main$f, {
              key: 0,
              items: props.item.releases.map(item => item.release),
              loadMore: false,
              light: false,
              source: null,
              type: "row",
              title: props.item.name ? {
                    text: props.item.name,
                    img: props.item.cover?.resized ? {
                        preview: props.item.cover.resized,
                        original: props.item.cover.original,
                        skeleton: true,
                        aspectRatio: '1 / 1',
                        width: '48px',
                        height: '48px'
                    } : null
                } : null,
              handler: "release"
            }, null, 8, ["items", "title"]))
          : (props.item.template === 'ROW')
            ? (openBlock(), createBlock(_sfc_main$f, {
                key: 1,
                items: props.item.releases.map(item => item.release),
                loadMore: false,
                light: true,
                source: null,
                subtype: "row",
                type: "row",
                title: props.item.name ? {
                    text: props.item.name,
                    img: props.item.cover?.resized ? {
                        preview: props.item.cover.resized,
                        original: props.item.cover.original,
                        skeleton: true,
                        aspectRatio: '1 / 1',
                        width: '48px',
                        height: '48px'
                    } : null
                } : null,
                handler: "release"
              }, null, 8, ["items", "title"]))
            : (props.item.template === 'LIST')
              ? (openBlock(), createBlock(_sfc_main$f, {
                  key: 2,
                  items: props.item.releases.map(item => item.release),
                  loadMore: false,
                  light: true,
                  source: null,
                  showKebab: true,
                  title: props.item.name ? {
                    text: props.item.name,
                    img: props.item.cover?.resized ? {
                        preview: props.item.cover.resized,
                        original: props.item.cover.original,
                        skeleton: true,
                        aspectRatio: '1 / 1',
                        width: '48px',
                        height: '48px'
                    } : null
                } : null,
                  handler: "release"
                }, null, 8, ["items", "title"]))
              : createCommentVNode("", true)
      ], 64))
    : createCommentVNode("", true)
}
}

};

const _hoisted_1$3 = {
  key: 1,
  class: "buttons"
};
const _hoisted_2$3 = {
  key: 2,
  class: "logo"
};
const _hoisted_3 = { class: "title" };
const _hoisted_4 = { key: 0 };

    
const _sfc_main$9 = {
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
          ? (openBlock(), createElementBlock("div", _hoisted_1$3, [
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
          ? (openBlock(), createElementBlock("div", _hoisted_2$3, [
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
const PlaylistPreview = /*#__PURE__*/_export_sfc(_sfc_main$9, [['__scopeId',"data-v-b3daf68c"]]);

const _sfc_main$8 = {
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

const _sfc_main$7 = {
  __name: 'WidgetPlaylists',
  props: {
        item: { type: [Object, null], default: null }
    },
  setup(__props) {

    const props = __props;

return (_ctx, _cache) => {
  return (props.item?.id && props.item?.playlists?.length)
    ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
        (!props.item.template || props.item.template === 'ROW_BIG')
          ? (openBlock(), createBlock(_sfc_main$8, {
              key: 0,
              items: props.item.playlists.map(item => item.playlist),
              loadMore: false,
              light: false,
              source: null,
              type: "row",
              title: props.item.name ? {
                    text: props.item.name,
                    img: props.item.cover?.resized ? {
                        preview: props.item.cover.resized,
                        original: props.item.cover.original,
                        skeleton: true,
                        aspectRatio: '1 / 1',
                        width: '48px',
                        height: '48px'
                    } : null
                } : null,
              handler: "playlist"
            }, null, 8, ["items", "title"]))
          : (props.item.template === 'ROW')
            ? (openBlock(), createBlock(_sfc_main$8, {
                key: 1,
                items: props.item.playlists.map(item => item.playlist),
                loadMore: false,
                light: true,
                source: null,
                type: "row",
                title: props.item.name ? {
                    text: props.item.name,
                    img: props.item.cover?.resized ? {
                        preview: props.item.cover.resized,
                        original: props.item.cover.original,
                        skeleton: true,
                        aspectRatio: '1 / 1',
                        width: '48px',
                        height: '48px'
                    } : null
                } : null,
                handler: "playlist"
              }, null, 8, ["items", "title"]))
            : (props.item.template === 'LIST')
              ? (openBlock(), createBlock(_sfc_main$8, {
                  key: 2,
                  items: props.item.playlists.map(item => item.playlist),
                  loadMore: false,
                  light: true,
                  source: null,
                  showKebab: true,
                  title: props.item.name ? {
                    text: props.item.name,
                    img: props.item.cover?.resized ? {
                        preview: props.item.cover.resized,
                        original: props.item.cover.original,
                        skeleton: true,
                        aspectRatio: '1 / 1',
                        width: '48px',
                        height: '48px'
                    } : null
                } : null,
                  handler: "playlist"
                }, null, 8, ["items", "title"]))
              : createCommentVNode("", true)
      ], 64))
    : createCommentVNode("", true)
}
}

};

const _hoisted_1$2 = { class: "name" };
const _hoisted_2$2 = { key: 0 };

    
const _sfc_main$6 = {
  __name: 'WidgetPreview',
  props: {
        item: { type: Object, default: () => ({}) },
        row: { type: Boolean, default: false },
        disabled: { type: Boolean, default: false },
        light: { type: Boolean, default: false },
        showKebab: { type: Boolean, default: false },
        skeleton: { type: Boolean, default: false },
        invert: { type: Boolean, default: false }
    },
  emits: ['change'],
  setup(__props, { emit: __emit }) {

    stores.modals();

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
        return api.showcase().defaultWidgetCover;
    });

    const openKebab = () => {
        // modals.open('release-kebab', { quietClose: true, data: { id: props.item?.id } })
    };

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", {
    class: normalizeClass(["widget-preview", {
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
              aspectRatio: "1 / 1"
            }, null, 8, ["preview", "original"]))
          : createCommentVNode("", true)
      ])
    ]),
    createBaseVNode("div", null, [
      createBaseVNode("div", null, [
        createBaseVNode("span", _hoisted_1$2, toDisplayString(props.item?.name || unref(t)('widgets.empty-name')), 1)
      ])
    ]),
    (props.showKebab)
      ? (openBlock(), createElementBlock("div", _hoisted_2$2, [
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
const WidgetPreview = /*#__PURE__*/_export_sfc(_sfc_main$6, [['__scopeId',"data-v-a7594f85"]]);

const _sfc_main$5 = {
  __name: 'Widgets',
  props: {
        empty: { type: Object, default: () => ({}) },
        items: { type: Array, default: () => ([]) },
        title: { type: [Object, String, null], default: null },
        params: { type: Object, default: () => ({}) },
        sort: { type: [Object, null], default: () => ({
            code: 'position',
            direction: 'asc'
        }) },
        light: { type: Boolean, default: true },
        showKebab: { type: Boolean, default: false },
        loadMore: { type: Boolean, default: true },
        skeleton: { type: Boolean, default: true },
        open: { type: Boolean, default: false },
        skeletonCount: { type: Number, default: 3 },
        itemsInCol: { type: Number, default: 1 },
        take: { type: Number, default: 30 },
        handler: { type: [String, null], default: () => null },
        type: { type: String, default: 'list' },
        source: { type: [Object, null], default: () => ({ store: 'showcase', fnName: 'listWidget' }) },
        buttons: { type: Array, default: () => ([]) },
        getById: { type: [String, null], default: null },
        subtype: { type: [String, null], default: null }
    },
  emits: ['change', 'open'],
  setup(__props, { expose: __expose, emit: __emit }) {

    const emit = __emit;

    stores.nav();
    
    const block = ref(null);

    const props = __props;

    const reload = () => {
        if (block?.value?.reload) {
            block.value.reload();
        }
    };

    const onClick = (item) => {
        emit('change', item);

        // if (props.handler === 'release' && item?.id) {
        //     nav.open('release', { id: item?.id });
        // }
    };

    __expose({
        reload
    });


return (_ctx, _cache) => {
  return (openBlock(), createBlock(Block, mergeProps({ code: "widgets" }, props, {
    ref_key: "block",
    ref: block,
    onChange: onClick,
    onOpen: _cache[0] || (_cache[0] = $event => (emit('open'))),
    sliderProps: {
            itemWidth: props.light ? '96px' : '128px',
            // itemHeight: '208px',
            colAlign: 'start',
            colGap: '8px',
            rowGap: '8px',
            snapType: 'none'
        }
  }), {
    "list-item": withCtx(({ item }) => [
      createVNode(WidgetPreview, {
        row: props.subtype === null ? true : props.subtype === 'row',
        light: props.light,
        item: item,
        showKebab: props.showKebab
      }, null, 8, ["row", "light", "item", "showKebab"])
    ]),
    "list-skeleton": withCtx(() => [
      createVNode(WidgetPreview, {
        row: props.subtype === null ? true : props.subtype === 'row',
        playable: false,
        light: props.light,
        skeleton: true
      }, null, 8, ["row", "light"])
    ]),
    "row-item": withCtx(({ item }) => [
      createVNode(WidgetPreview, {
        row: props.subtype === 'row' || false,
        playable: false,
        light: props.light,
        item: item,
        showKebab: props.showKebab
      }, null, 8, ["row", "light", "item", "showKebab"])
    ]),
    "row-skeleton": withCtx(() => [
      createVNode(WidgetPreview, {
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

const _sfc_main$4 = {
  __name: 'SubWidgets',
  props: {
        sectionId: { type: [String, null], default: null },
        item: { type: [Object, null], default: null }
    },
  emits: ['change', 'open'],
  setup(__props, { emit: __emit }) {

    const emit = __emit;

    const props = __props;

return (_ctx, _cache) => {
  return (props.item?.id)
    ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
        (!props.item.template || props.item.template === 'ROW_BIG')
          ? (openBlock(), createBlock(_sfc_main$5, {
              key: 0,
              loadMore: false,
              type: "row",
              open: true,
              light: false,
              params: {
                    sectionId: props.sectionId,
                    parentId: props.item.id,
                    showed: true
                },
              title: {
                    text: props.item.name,
                    img: props.item.cover?.resized ? {
                        preview: props.item.cover.resized,
                        original: props.item.cover.original,
                        skeleton: true,
                        aspectRatio: '1 / 1',
                        width: '48px'
                    } : null
                },
              onOpen: _cache[0] || (_cache[0] = $event => (emit('open', $event))),
              onChange: _cache[1] || (_cache[1] = $event => (emit('change', $event)))
            }, null, 8, ["params", "title"]))
          : (props.item.template === 'ROW')
            ? (openBlock(), createBlock(_sfc_main$5, {
                key: 1,
                loadMore: false,
                type: "row",
                open: true,
                light: true,
                params: {
                    sectionId: props.sectionId,
                    parentId: props.item.id,
                    showed: true
                },
                title: {
                    text: props.item.name,
                    img: props.item.cover?.resized ? {
                        preview: props.item.cover.resized,
                        original: props.item.cover.original,
                        skeleton: true,
                        aspectRatio: '1 / 1',
                        width: '48px'
                    } : null
                },
                onOpen: _cache[2] || (_cache[2] = $event => (emit('open', $event))),
                onChange: _cache[3] || (_cache[3] = $event => (emit('change', $event)))
              }, null, 8, ["params", "title"]))
            : (props.item.template === 'LIST')
              ? (openBlock(), createBlock(_sfc_main$5, {
                  key: 2,
                  loadMore: false,
                  type: "list",
                  open: true,
                  params: {
                    sectionId: props.sectionId,
                    parentId: props.item.id,
                    showed: true
                },
                  title: {
                    text: props.item.name,
                    img: props.item.cover?.resized ? {
                        preview: props.item.cover.resized,
                        original: props.item.cover.original,
                        skeleton: true,
                        aspectRatio: '1 / 1',
                        width: '48px'
                    } : null
                },
                  onOpen: _cache[4] || (_cache[4] = $event => (emit('open', $event))),
                  onChange: _cache[5] || (_cache[5] = $event => (emit('change', $event)))
                }, null, 8, ["params", "title"]))
              : createCommentVNode("", true)
      ], 64))
    : createCommentVNode("", true)
}
}

};

const _sfc_main$3 = {
  __name: 'Total',
  props: {
        total: { type: [Number, null], default: null }
    },
  setup(__props) {

    const props = __props;

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("span", null, toDisplayString(props.total), 1))
}
}

};
const Total = /*#__PURE__*/_export_sfc(_sfc_main$3, [['__scopeId',"data-v-4b219446"]]);

const _hoisted_1$1 = { class: "menu" };
const _hoisted_2$1 = ["onClick"];

    
const _sfc_main$2 = {
  __name: 'Menu',
  props: {
        items: { type: Array, default: () => ([]) },
        code: { type: [String, null], default: null },
        useI18n: { type: Boolean, default: true }
    },
  emits: ['change'],
  setup(__props, { emit: __emit }) {

    const { t } = useI18n();
    const emit = __emit;

    const props = __props;

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("ul", _hoisted_1$1, [
    (openBlock(true), createElementBlock(Fragment, null, renderList(props.items, (item) => {
      return (openBlock(), createElementBlock("li", {
        key: item.code,
        class: normalizeClass({
                active: item.code === props.code,
                total: !!item.total
            }),
        onClick: $event => (emit('change', item.code))
      }, [
        createBaseVNode("span", null, toDisplayString(props.useI18n ? unref(t)(item.name) : item.name), 1),
        (item.total)
          ? (openBlock(), createBlock(Total, {
              key: 0,
              total: item.total
            }, null, 8, ["total"]))
          : createCommentVNode("", true)
      ], 10, _hoisted_2$1))
    }), 128))
  ]))
}
}

};
const Menu = /*#__PURE__*/_export_sfc(_sfc_main$2, [['__scopeId',"data-v-27d19797"]]);

const _hoisted_1 = {
  key: 1,
  class: "widget-head"
};
const _hoisted_2 = {
  key: 0,
  class: "description"
};


    
const _sfc_main$1 = {
  __name: 'Showcase',
  props: {
        page: { type: String, default: 'MUSIC' }
    },
  setup(__props) {

    const { t } = useI18n();

    // const modals = stores.modals();
    const showcase = api.showcase();

    const props = __props;

    const staticMap = {
        'more-discoveries': async () => defineAsyncComponent(() => __vitePreload(() => import('./WidgetMoreDiscoveries-CD8cYi3Q.js'),true              ?__vite__mapDeps([0,1,2,3]):void 0))
    };

    const data = reactive({
        widget: null,
        widgets: [],
        widgetComponents: {},
        parents: [{
            id: props.parentId
        }],
        sections: [],
        section: null
    });

    const loadStaticComponents = async (code) => {
        if (data.widgetComponents[code] || !staticMap[code]) {
            return;
        }

        data.widgetComponents[code] = markRaw(await staticMap[code]());
    };

    const getWidgets = async () => {
        const parent = data.parents[data.parents.length - 1];

        // modals.open('loader', {data: {light: true}})

        // if (parent?.id) {
        //     console.log(await showcase.widget.get(parent.id));
        // }

        data.widgets = [];
        data.widget = parent.widget;


        const payload = await showcase.widget.list({
            sectionId: data.section?.id,
            parentId: parent?.id || 'null',
            showed: true
        });

        await Promise.all(payload?.items.filter(item => item.type === 'STATIC').map(async (item) => loadStaticComponents(item.code)));

        const widgets = payload?.items || [];

        if (
            data.widget?.tracks?.length ||
            data.widget?.releases?.length ||
            data.widget?.artists?.length ||
            data.widget?.playlists?.length
        ) {
            widgets.unshift({
                ...data.widget,
                name: null,
                cover: null
            });
        }

        console.log(widgets);

        data.widgets = widgets;
        // setTimeout(() => {
        //     modals.close('loader');
        // }, 200);
    };

    const openSubWidget = (payload, parent) => {
        if (!payload?.id || !parent?.id) {
            return;
        }

        data.parents.push({
            id: parent.id,
            widget: parent
        });

        data.parents.push({
            id: payload.id,
            widget: payload
        });

        getWidgets();
    };

    const openWidget = (payload) => {
        if (!payload?.id) {
            return;
        }

        data.parents.push({
            id: payload.id,
            widget: payload
        });

        getWidgets();
    };

    const setSection = (code) => {
        data.section = data.sections.find(item => item.code === code);

        data.parents = [
            {
                id: null
            }
        ];

        getWidgets();
    };

    const getSections = async () => {
        // Секции
        let payload = await showcase.section.list({
            showed: true,
            page: props.page
        });

        data.sections = payload?.items || [];
        data.section = data.sections[0];

        getWidgets();
    };

    const back = () => {
        if (data.parents.length > 1) {
            data.parents.pop();
            getWidgets();
        }
    };

    watch(
        () => props.page,
        () => {
            getSections();
        }
    );

    onMounted(() => {
        getSections();
    });

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock(Fragment, null, [
    createBaseVNode("div", {
      class: normalizeClass(["head", { 'with-cover': !!data.widget?.headerCover }])
    }, [
      (data.widget?.headerCover)
        ? (openBlock(), createBlock(Img, {
            key: 0,
            preview: data.widget?.headerCover?.resized,
            original: data.widget?.headerCover?.original,
            skeleton: true,
            checktone: true,
            alt: data.widget.name,
            aspectRatio: "113 / 57",
            onTone: _cache[0] || (_cache[0] = $event => (data.tone = $event))
          }, null, 8, ["preview", "original", "alt"]))
        : createCommentVNode("", true),
      createVNode(Menu, {
        items: data.sections,
        code: data.section?.code,
        useI18n: false,
        onChange: setSection
      }, null, 8, ["items", "code"]),
      (data.widget?.id)
        ? (openBlock(), createElementBlock("div", _hoisted_1, [
            createVNode(IconButton, {
              class: "tertiary size-l",
              icon: "chevron-left",
              onClick: back
            }),
            createBaseVNode("div", null, [
              createVNode(TitleWithButtons, {
                class: "size-l",
                title: {
                        text: data.widget.name
                    }
              }, null, 8, ["title"]),
              (data.widget?.description)
                ? (openBlock(), createElementBlock("div", _hoisted_2, toDisplayString(data.widget.description), 1))
                : createCommentVNode("", true)
            ])
          ]))
        : createCommentVNode("", true)
    ], 2),
    (openBlock(true), createElementBlock(Fragment, null, renderList(data.widgets, (item) => {
      return (openBlock(), createElementBlock(Fragment, {
        key: item.id
      }, [
        (item.type === 'EDITORIAL')
          ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              (item.artists?.length)
                ? (openBlock(), createBlock(_sfc_main$c, {
                    key: 0,
                    item: item
                  }, null, 8, ["item"]))
                : (item.tracks?.length)
                  ? (openBlock(), createBlock(_sfc_main$b, {
                      key: 1,
                      item: item
                    }, null, 8, ["item"]))
                  : (item.releases?.length)
                    ? (openBlock(), createBlock(_sfc_main$a, {
                        key: 2,
                        item: item
                      }, null, 8, ["item"]))
                    : (item.playlists?.length)
                      ? (openBlock(), createBlock(_sfc_main$7, {
                          key: 3,
                          item: item
                        }, null, 8, ["item"]))
                      : (openBlock(), createBlock(_sfc_main$4, {
                          key: 4,
                          item: item,
                          sectionId: data.section?.id,
                          onChange: $event => (openSubWidget($event, item)),
                          onOpen: $event => (openWidget(item))
                        }, null, 8, ["item", "sectionId", "onChange", "onOpen"]))
            ], 64))
          : createCommentVNode("", true),
        (item.type === 'STATIC')
          ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              (data.widgetComponents[item.code])
                ? (openBlock(), createBlock(resolveDynamicComponent(data.widgetComponents[item.code]), {
                    key: 0,
                    name: { text: item.name }
                  }, null, 8, ["name"]))
                : createCommentVNode("", true)
            ], 64))
          : createCommentVNode("", true)
      ], 64))
    }), 128))
  ], 64))
}
}

};
const Showcase = /*#__PURE__*/_export_sfc(_sfc_main$1, [['__scopeId',"data-v-a0848b65"]]);

const _sfc_main = /*@__PURE__*/Object.assign({
        name: 'music'
    }, {
  __name: 'Music',
  setup(__props) {

    const { t } = useI18n();

    stores.user();

    stores.others();

    const data = reactive({
        ready: false
    });

    const init = async () => {
        data.ready = true;
    };

    

    onActivated(() => {
        document.body.classList.add('with-tg-header');
    });

    onDeactivated(() => {
        document.body.classList.remove('with-tg-header');
    });

    // onBeforeUnmount(() => {
    // });

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock(Fragment, null, [
    (data.ready)
      ? (openBlock(), createBlock(Showcase, {
          key: 0,
          page: "MUSIC"
        }))
      : createCommentVNode("", true),
    createVNode(_sfc_main$g, {
      page: "music",
      init: init
    })
  ], 64))
}
}

});
const Music = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-3cedbfa5"]]);

export { Music as default };
//# sourceMappingURL=Music-CBhPNR4T.js.map
