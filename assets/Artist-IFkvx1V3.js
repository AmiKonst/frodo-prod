import { _ as _export_sfc, y as resolveComponent, c as createElementBlock, o as openBlock, v as createBaseVNode, b as createBlock, d as createCommentVNode, A as withModifiers, z as normalizeClass, u as useI18n, F as Fragment, G as createTextVNode, x as toDisplayString, h as unref, k as computed, m as renderList, B as Button, s as stores, r as reactive, a as api, e as createVNode, I as IconButton, $ as hooks, l as onMounted, t as withCtx, g as onBeforeUnmount } from './index-WuWwFjaj.js';
import { _ as _sfc_main$6 } from './Ready-CjS4ob66.js';
import { I as Img } from './Img-CXmpNgLr.js';
import { I as ItemDetail } from './ItemDetail-YRzVwTOX.js';
import { E as EmptyLabel } from './EmptyLabel-DxGgGsIh.js';
import { S as State } from './State-DhttjB_Y.js';
import { S as Slider } from './Slider-Cn90wAky.js';

const _sfc_main$5 = {
  __name: 'AudioToggle',
  props: {
        state: { type: [String, null], default: null }, // null, play, pause
        disabled: { type: Boolean, default: false },
        light: { type: Boolean, default: false }
    },
  emits: ['play', 'pause'],
  setup(__props, { emit: __emit }) {

    const emit = __emit;

    const props = __props;

    const handleClick = () => {
        if (props.disabled) {
            return;
        }

        if (props.state === null || props.state === "paused" || props.state === "stopped") {
            emit("play");
        } else if (props.state === "playing") {
            emit("pause");
        }
    };

return (_ctx, _cache) => {
  const _component_Icon = resolveComponent("Icon");

  return (openBlock(), createElementBlock("button", {
    class: normalizeClass(["audio-toggle", {
            playing: __props.state === 'playing',
            paused: __props.state === 'paused',
            empty: __props.state === null,
            light: !!props.light,
            disabled: !!props.disabled
        }]),
    onClick: withModifiers(handleClick, ["stop"]),
    onMouseenter: _cache[0] || (_cache[0] = $event => (_ctx.hovered = true)),
    onMouseleave: _cache[1] || (_cache[1] = $event => (_ctx.hovered = false))
  }, [
    _cache[2] || (_cache[2] = createBaseVNode("div", { class: "audio-play-icon" }, [
      createBaseVNode("div", { class: "part one" }),
      createBaseVNode("div", { class: "part two" })
    ], -1)),
    (props.state === 'playing' && !props.light)
      ? (openBlock(), createBlock(_component_Icon, {
          key: 0,
          icon: "logo"
        }))
      : createCommentVNode("", true)
  ], 34))
}
}

};
const AudioToggle = /*#__PURE__*/_export_sfc(_sfc_main$5, [['__scopeId',"data-v-28c266c3"]]);

const _hoisted_1$4 = {
  key: 0,
  class: "release-type"
};

    
const _sfc_main$4 = {
  __name: 'ReleaseType',
  props: {
        trackCount: { type: [Number, null], default: null }
    },
  setup(__props) {

    const { t } = useI18n();

    const props = __props;

return (_ctx, _cache) => {
  return (props.trackCount)
    ? (openBlock(), createElementBlock("span", _hoisted_1$4, [
        (props.trackCount >= 7)
          ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              createTextVNode(toDisplayString(unref(t)('pluralization.releases.album', 1)), 1)
            ], 64))
          : (props.trackCount >= 4 && props.trackCount < 7)
            ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                createTextVNode(toDisplayString(unref(t)('pluralization.releases.ep', 1)), 1)
              ], 64))
            : (openBlock(), createElementBlock(Fragment, { key: 2 }, [
                createTextVNode(toDisplayString(unref(t)('pluralization.releases.single', 1)), 1)
              ], 64))
      ]))
    : createCommentVNode("", true)
}
}

};
const ReleaseType = /*#__PURE__*/_export_sfc(_sfc_main$4, [['__scopeId',"data-v-cd8bd733"]]);

const _hoisted_1$3 = { class: "artist" };
const _hoisted_2$3 = { key: 1 };
const _hoisted_3$2 = { key: 1 };

    
const _sfc_main$3 = {
  __name: 'ContributorsPreview',
  props: {
        items: { type: Array, default: () => ([]) },
        invert: { type: Boolean, default: false }
    },
  setup(__props) {

    const props = __props;

    const primaryArtists = computed(() => {
        return props.items?.filter(item =>
            item.role === 'PRIMARY' && (item.artist?.name || item.unregisteredArtistName)).map(item => ({
                name: item.artist?.name || item.unregisteredArtistName,
                id: item.state === 'CONFIRMED' ? item.artist?.id : null
            })) || []
    });

    const featArtists = computed(() => {
        return props.items?.filter(item =>
            item.role === 'FEATURED' && (item.artist?.name || item.unregisteredArtistName)).map(item => ({
                name: item.artist?.name || item.unregisteredArtistName,
                id: item.state === 'CONFIRMED' ? item.artist?.id : null
            })) || []
    });

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("span", _hoisted_1$3, [
    (openBlock(true), createElementBlock(Fragment, null, renderList(primaryArtists.value, (item, id) => {
      return (openBlock(), createElementBlock(Fragment, { key: id }, [
        (item.id)
          ? (openBlock(), createBlock(Button, {
              key: 0,
              name: `${item.name}${ id < primaryArtists.value.length - 1 ? ',' : ''}`,
              class: normalizeClass(["size-s tertiary gray link", { invert: props.invert }])
            }, null, 8, ["name", "class"]))
          : (openBlock(), createElementBlock("span", _hoisted_2$3, toDisplayString(`${item.name}${ id < primaryArtists.value.length - 1 ? ',' : ''}`), 1))
      ], 64))
    }), 128)),
    (featArtists.value?.length)
      ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
          _cache[0] || (_cache[0] = createBaseVNode("span", null, "feat.", -1)),
          (openBlock(true), createElementBlock(Fragment, null, renderList(featArtists.value, (item, id) => {
            return (openBlock(), createElementBlock(Fragment, { key: id }, [
              (item.id)
                ? (openBlock(), createBlock(Button, {
                    key: 0,
                    name: `${item.name}${ id < featArtists.value.length - 1 ? ',' : ''}`,
                    class: normalizeClass(["size-s tertiary gray link", { invert: props.invert }])
                  }, null, 8, ["name", "class"]))
                : (openBlock(), createElementBlock("span", _hoisted_3$2, toDisplayString(`${item.name}${ id < featArtists.value.length - 1 ? ',' : ''}`), 1))
            ], 64))
          }), 128))
        ], 64))
      : createCommentVNode("", true)
  ]))
}
}

};
const ContributorsPreview = /*#__PURE__*/_export_sfc(_sfc_main$3, [['__scopeId',"data-v-5161aee9"]]);

const _hoisted_1$2 = {
  key: 1,
  class: "buttons"
};
const _hoisted_2$2 = {
  key: 0,
  class: "from"
};
const _hoisted_3$1 = {
  key: 0,
  class: "year"
};

    
const _sfc_main$2 = {
  __name: 'ReleasePreview',
  props: {
        item: { type: Object, default: () => ({}) },
        showState: { type: Boolean, default: false },
        row: { type: Boolean, default: false },
        disabled: { type: Boolean, default: false },
        playable: { type: Boolean, default: true },
        invert: { type: Boolean, default: false }
    },
  emits: ['change'],
  setup(__props, { emit: __emit }) {

    const player = stores.player();
    const modals = stores.modals();

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
        return api.releases().defaultCover;
    });


    const open = () => {
        if (!props.item?.id) {
            return;
        }

        modals.reopen('release', {
            data: props.item?.id,
            popover: true
        });
    };

    const state = computed(() => {
        if (!player.panes.default || player.panes.default._queue?.release?.id !== props.item?.id) {
            return;
        }

        return player.panes.default._state;
    });

    const getTracks = async () => {
        const payload = await api.releases().tracks.list(props.item.id) || [];
        return payload?.items || [];
    };

    const pause = async () => {
        // Если не наш релиз играет, ничего не делаем
        if (player.panes.default?._queue?.release?.id !== props.item?.id) {
            return;
        }

        // Если идет воспроизведение
        if (state.value === 'playing') {
            player.panes.default.pause();
            return;
        }
    };

    const play = async () => {
        // Если там не этот релиз включен
        if (player.panes.default?._queue?.release?.id !== props.item?.id) {
            const tracks = await getTracks();

            if (!tracks?.length) {
                return;
            }

            const queue = await player.trackQueue(tracks, { type: 'release', release: props.item });

            if (!queue?.items?.length) {
                return;
            }

            const track = await player.track(queue.items[0]);
            track.play();
            return;
        }

        const queue = player.panes.default.queue();

        // Если стоит на паузе
        if (player.panes.default._state === 'paused') {
            player.panes.default.resume();
            return;
        }

        // Если закончилось воспроизведение
        if (player.panes.default._state === 'stopped' && queue.items?.length) {
            const track = await player.track(queue.items[0]);
            track.play();
            return;
        }
    };

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", {
    class: normalizeClass(["release-preview", {
            row: props.row,
            invert: props.invert,
            disabled: props.disabled
        }])
  }, [
    createBaseVNode("div", null, [
      createBaseVNode("div", {
        class: normalizeClass(["cover", { disabled: false }])
      }, [
        (cover.value?.resized || defaultCover.value?.resized)
          ? (openBlock(), createBlock(Img, {
              key: 0,
              preview: cover.value?.resized || defaultCover.value?.resized,
              original: cover.value?.original || defaultCover.value?.original,
              skeleton: true
            }, null, 8, ["preview", "original"]))
          : createCommentVNode("", true),
        (props.playable)
          ? (openBlock(), createElementBlock("div", _hoisted_1$2, [
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
        createBaseVNode("span", {
          class: normalizeClass(["title", { full: props.item?.fromProject }])
        }, toDisplayString(props.item?.title || unref(t)('releases.empty-name')), 3),
        (props.item?.fromProject)
          ? (openBlock(), createElementBlock("span", _hoisted_2$2, toDisplayString(unref(t)('releases.from')) + " " + toDisplayString(props.item?.fromProject), 1))
          : createCommentVNode("", true),
        (props.row && props.showState && props.item?.state)
          ? (openBlock(), createBlock(State, {
              key: 1,
              state: props.item?.state
            }, null, 8, ["state"]))
          : createCommentVNode("", true)
      ]),
      createBaseVNode("div", null, [
        createVNode(ContributorsPreview, {
          items: props.item?.contributors,
          invert: props.invert
        }, null, 8, ["items", "invert"]),
        createBaseVNode("span", null, [
          (props.item.releaseDate)
            ? (openBlock(), createElementBlock("span", _hoisted_3$1, toDisplayString(unref(hooks)(props.item.releaseDate).year()), 1))
            : createCommentVNode("", true),
          createVNode(ReleaseType, {
            trackCount: props.item.trackCount,
            class: "release-type"
          }, null, 8, ["trackCount"])
        ])
      ])
    ])
  ], 2))
}
}

};
const ReleasePreview = /*#__PURE__*/_export_sfc(_sfc_main$2, [['__scopeId',"data-v-ef4d13e3"]]);

const _hoisted_1$1 = {
  key: 0,
  class: "items-list"
};
const _hoisted_2$1 = {
  key: 0,
  class: "items"
};
const _hoisted_3 = ["onClick"];
const _hoisted_4 = {
  key: 1,
  class: "slider-box"
};
const _hoisted_5 = ["onClick"];

    
const _sfc_main$1 = {
  __name: 'Releases',
  props: {
        empty: { type: Object, default: () => ({}) },
        params: { type: Object, default: () => ({}) },
        sort: { type: [Object, null], default: () => ({
            code: 'title',
            direction: 'asc'
        }) },
        take: { type: Number, default: 30 },
        handler: { type: [String, null], default: () => null },
        type: { type: String, default: 'list' },
        source: { type: Object, default: () => ({ store: 'releases', fnName: 'list' }) }
    },
  emits: ['change'],
  setup(__props, { expose: __expose, emit: __emit }) {

    const emit = __emit;

    const nav = stores.nav();


    const { t } = useI18n();

    const props = __props;

    const data = reactive({
        items: [],
        loading: false,
        skip: 0,
        total: 0
    });


    const getItems = async () => {
        clearTimeout(data.setItemsTimeout);
        data.loading = true;

        if (!data.skip) {
            data.items = [];
        }

        let params = {
            ...(props.params || {}),
            skip: data.skip,
            take: props.take
        };

        if (props.sort) {
            params.sort = props.sort.code;
            params.sort_dir = props.sort.direction;
        }

        const payload = await api[props.source.store]()[props.source.fnName](params) || [];

        data.setItemsTimeout = setTimeout(() => {
            if (payload?.items?.length) {
                data.items.splice(data.items.length, 0, ...(payload.items || []));
            }

            data.skip = data.items.length;
            data.total = payload?.total || 0;

            data.loading = false;
        }, 200);
    };

    const reload = () => {
        data.skip = 0;
        getItems();
    };

    const onClick = (item) => {
        emit('change', item);

        if (props.handler === 'album' && item?.id) {
            nav.open('album', { id: item?.id });
        }
    };

    __expose({
        reload
    });

    onMounted(() => {
        getItems();
    });

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock(Fragment, null, [
    (props.type === 'list')
      ? (openBlock(), createElementBlock("div", _hoisted_1$1, [
          (data.items.length)
            ? (openBlock(), createElementBlock("ul", _hoisted_2$1, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(data.items, (item, id) => {
                  return (openBlock(), createElementBlock("li", {
                    class: normalizeClass({ active: props.id === item.code }),
                    onClick: $event => (onClick(item))
                  }, [
                    createVNode(ReleasePreview, {
                      row: true,
                      item: item
                    }, null, 8, ["item"])
                  ], 10, _hoisted_3))
                }), 256))
              ]))
            : createCommentVNode("", true),
          (data.loading || (data.items.length < data.total))
            ? (openBlock(), createBlock(Button, {
                key: 1,
                loading: data.loading,
                class: "tertiary size-l",
                name: unref(t)(`blocks.releases.load`),
                onClick: getItems
              }, null, 8, ["loading", "name"]))
            : createCommentVNode("", true),
          (!data.items.length && !data.loading)
            ? (openBlock(), createBlock(EmptyLabel, {
                key: 2,
                "animate-icon": "releases",
                class: "empty",
                title: props.empty?.title,
                description: props.empty?.description
              }, null, 8, ["title", "description"]))
            : createCommentVNode("", true)
        ]))
      : createCommentVNode("", true),
    (props.type === 'row')
      ? (openBlock(), createElementBlock("div", _hoisted_4, [
          createVNode(Slider, {
            colPreloadCount: props.take,
            items: data.items,
            itemsInCol: 1,
            itemWidth: "146px",
            colAlign: "none",
            colGap: "8px",
            rowGap: "8px",
            ref: "sliderRef"
          }, {
            default: withCtx(({ item }) => [
              createBaseVNode("div", {
                class: "slide",
                onClick: $event => (onClick(item))
              }, [
                createVNode(ReleasePreview, {
                  row: false,
                  playable: false,
                  item: item
                }, null, 8, ["item"])
              ], 8, _hoisted_5)
            ]),
            _: 1
          }, 8, ["colPreloadCount", "items"])
        ]))
      : createCommentVNode("", true)
  ], 64))
}
}

};
const Releases = /*#__PURE__*/_export_sfc(_sfc_main$1, [['__scopeId',"data-v-012499e8"]]);

const _hoisted_1 = {
  key: 0,
  class: "name"
};
const _hoisted_2 = { class: "buttons" };

    
const _sfc_main = {
  __name: 'Artist',
  props: {
        code: { type: String }
    },
  setup(__props) {

    const { t } = useI18n();

    stores.locale();
    const tg = stores.tg();

    const data = reactive({
        ready: false,
        item: null
    });

    const init = async () => {
        data.item = await api.artists().get('cmhryr5hl014coi13tbvq6rxm');
        data.ready = true;
        console.log(data.item);
    };

    onMounted(async () => {
        tg.showBackButton();
    });

    onBeforeUnmount(() => {
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
                  preview: data.item?.profileImage?.original,
                  original: data.item?.profileImage?.original,
                  alt: data.item.name,
                  skeleton: true
                }, null, 8, ["preview", "original", "alt"]))
              : createCommentVNode("", true)
          ]),
          preview: withCtx(() => [
            (data.item?.name)
              ? (openBlock(), createElementBlock("div", _hoisted_1, toDisplayString(data.item.name), 1))
              : createCommentVNode("", true),
            createBaseVNode("div", _hoisted_2, [
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
          detail: withCtx(() => [
            (data.item?.id)
              ? (openBlock(), createBlock(Releases, {
                  key: 0,
                  type: "row",
                  take: 8,
                  params: {
                    contributors: data.item.id
                },
                  sort: {
                    code: 'releaseDate',
                    direction: 'desc'
                }
                }, null, 8, ["params"]))
              : createCommentVNode("", true)
          ]),
          _: 1
        }))
      : createCommentVNode("", true),
    createVNode(_sfc_main$6, {
      page: "artist",
      init: init
    })
  ], 64))
}
}

};
const Artist = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-b3f7ae44"]]);

export { Artist as default };
//# sourceMappingURL=Artist-IFkvx1V3.js.map
