import { _ as _export_sfc, A as resolveComponent, c as createElementBlock, o as openBlock, m as createBaseVNode, b as createBlock, d as createCommentVNode, C as withModifiers, n as normalizeClass, u as useI18n, F as Fragment, L as createTextVNode, t as toDisplayString, h as unref, i as computed, l as renderList, B as Button, s as stores, r as reactive, a as api, e as createVNode, I as IconButton, Q as hooks, j as onMounted, k as withCtx, g as onBeforeUnmount } from './index-D_Cy5WcJ.js';
import { T as TitleWithButtons } from './TitleWithButtons-Cz9UD3MZ.js';
import { I as Img } from './Img-DrYDMvVh.js';
import { S as State } from './State-B8jHMGIF.js';
import { S as Slider } from './Slider-9PbjhZSu.js';
import { E as EmptyLabel } from './EmptyLabel-dwpXfR3r.js';

const _sfc_main$6 = {
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

    const handleClick = (e) => {
        window.q = e;
        if (e?.target?.blur) {
            e.target.blur();
        }

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
    onClick: withModifiers(handleClick, ["stop"])
  }, [
    _cache[0] || (_cache[0] = createBaseVNode("div", { class: "audio-play-icon" }, [
      createBaseVNode("div", { class: "part one" }),
      createBaseVNode("div", { class: "part two" })
    ], -1)),
    (props.state === 'playing' && !props.light)
      ? (openBlock(), createBlock(_component_Icon, {
          key: 0,
          icon: "logo"
        }))
      : createCommentVNode("", true)
  ], 2))
}
}

};
const AudioToggle = /*#__PURE__*/_export_sfc(_sfc_main$6, [['__scopeId',"data-v-a49fc8b2"]]);

const _hoisted_1$5 = {
  key: 0,
  class: "release-type"
};

    
const _sfc_main$5 = {
  __name: 'ReleaseType',
  props: {
        trackCount: { type: [Number, null], default: null }
    },
  setup(__props) {

    const { t } = useI18n();

    const props = __props;

return (_ctx, _cache) => {
  return (props.trackCount)
    ? (openBlock(), createElementBlock("span", _hoisted_1$5, [
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
const ReleaseType = /*#__PURE__*/_export_sfc(_sfc_main$5, [['__scopeId',"data-v-cd8bd733"]]);

const _hoisted_1$4 = { class: "artist" };
const _hoisted_2$4 = { key: 1 };
const _hoisted_3$4 = { key: 1 };

    
const _sfc_main$4 = {
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
  return (openBlock(), createElementBlock("span", _hoisted_1$4, [
    (openBlock(true), createElementBlock(Fragment, null, renderList(primaryArtists.value, (item, id) => {
      return (openBlock(), createElementBlock(Fragment, { key: id }, [
        (item.id)
          ? (openBlock(), createBlock(Button, {
              key: 0,
              name: `${item.name}${ id < primaryArtists.value.length - 1 ? ',' : ''}`,
              class: normalizeClass(["size-s tertiary gray link", { invert: props.invert }])
            }, null, 8, ["name", "class"]))
          : (openBlock(), createElementBlock("span", _hoisted_2$4, toDisplayString(`${item.name}${ id < primaryArtists.value.length - 1 ? ',' : ''}`), 1))
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
                : (openBlock(), createElementBlock("span", _hoisted_3$4, toDisplayString(`${item.name}${ id < featArtists.value.length - 1 ? ',' : ''}`), 1))
            ], 64))
          }), 128))
        ], 64))
      : createCommentVNode("", true)
  ]))
}
}

};
const ContributorsPreview = /*#__PURE__*/_export_sfc(_sfc_main$4, [['__scopeId',"data-v-5161aee9"]]);

const _hoisted_1$3 = {
  key: 1,
  class: "buttons"
};
const _hoisted_2$3 = {
  key: 0,
  class: "from"
};
const _hoisted_3$3 = {
  key: 0,
  class: "year"
};

    
const _sfc_main$3 = {
  __name: 'ReleasePreview',
  props: {
        item: { type: Object, default: () => ({}) },
        showState: { type: Boolean, default: false },
        row: { type: Boolean, default: false },
        disabled: { type: Boolean, default: false },
        playable: { type: Boolean, default: true },
        skeleton: { type: Boolean, default: false },
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
          ? (openBlock(), createElementBlock("span", _hoisted_2$3, toDisplayString(unref(t)('releases.from')) + " " + toDisplayString(props.item?.fromProject), 1))
          : createCommentVNode("", true),
        (props.row && props.showState && props.item?.state)
          ? (openBlock(), createBlock(State, {
              key: 1,
              state: props.item?.state
            }, null, 8, ["state"]))
          : createCommentVNode("", true)
      ]),
      createBaseVNode("div", null, [
        (props.item?.contributors)
          ? (openBlock(), createBlock(ContributorsPreview, {
              key: 0,
              items: props.item?.contributors,
              invert: props.invert
            }, null, 8, ["items", "invert"]))
          : (props.skeleton)
            ? (openBlock(), createBlock(Button, {
                key: 1,
                class: "size-s tertiary gray link",
                name: "Artists"
              }))
            : createCommentVNode("", true),
        createBaseVNode("span", null, [
          (props.item.releaseDate)
            ? (openBlock(), createElementBlock("span", _hoisted_3$3, toDisplayString(unref(hooks)(props.item.releaseDate).year()), 1))
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
const ReleasePreview = /*#__PURE__*/_export_sfc(_sfc_main$3, [['__scopeId',"data-v-764d5f16"]]);

const _hoisted_1$2 = { class: "block" };
const _hoisted_2$2 = {
  key: 1,
  class: "items-list"
};
const _hoisted_3$2 = {
  key: 0,
  class: "items"
};
const _hoisted_4$2 = {
  key: 1,
  class: "items"
};
const _hoisted_5$2 = ["onClick"];
const _hoisted_6$1 = {
  key: 2,
  class: "slider-box"
};
const _hoisted_7$1 = ["onClick"];
const _hoisted_8$1 = ["onClick"];

    
const _sfc_main$2 = {
  __name: 'Releases',
  props: {
        empty: { type: Object, default: () => ({}) },
        title: { type: [Object, String, null], default: null },
        params: { type: Object, default: () => ({}) },
        sort: { type: [Object, null], default: () => ({
            code: 'title',
            direction: 'asc'
        }) },
        loadMore: { type: Boolean, default: true },
        take: { type: Number, default: 30 },
        handler: { type: [String, null], default: () => null },
        type: { type: String, default: 'list' },
        source: { type: Object, default: () => ({ store: 'releases', fnName: 'list' }) },
        buttons: { type: Array, default: () => ([]) }
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

        if (props.handler === 'release' && item?.id) {
            nav.open('release', { id: item?.id });
        }
    };

    __expose({
        reload
    });

    onMounted(() => {
        getItems();
    });

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$2, [
    (props.title)
      ? (openBlock(), createBlock(TitleWithButtons, {
          key: 0,
          title: props.title,
          items: props.buttons
        }, null, 8, ["title", "items"]))
      : createCommentVNode("", true),
    (props.type === 'list')
      ? (openBlock(), createElementBlock("div", _hoisted_2$2, [
          (!props.loadMore && data.loading && !data.items.length)
            ? (openBlock(), createElementBlock("ul", _hoisted_3$2, [
                createBaseVNode("li", null, [
                  createVNode(ReleasePreview, {
                    row: true,
                    playable: false,
                    skeleton: true
                  })
                ])
              ]))
            : createCommentVNode("", true),
          (data.items.length)
            ? (openBlock(), createElementBlock("ul", _hoisted_4$2, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(data.items, (item, id) => {
                  return (openBlock(), createElementBlock("li", {
                    class: normalizeClass({ active: props.id === item.code }),
                    onClick: $event => (onClick(item))
                  }, [
                    createVNode(ReleasePreview, {
                      row: true,
                      item: item
                    }, null, 8, ["item"])
                  ], 10, _hoisted_5$2))
                }), 256))
              ]))
            : createCommentVNode("", true),
          (props.loadMore && (data.loading || (data.items.length < data.total)))
            ? (openBlock(), createBlock(Button, {
                key: 2,
                loading: data.loading,
                class: "tertiary size-l",
                name: unref(t)(`blocks.releases.load`),
                onClick: getItems
              }, null, 8, ["loading", "name"]))
            : createCommentVNode("", true),
          (!data.items.length && !data.loading)
            ? (openBlock(), createBlock(EmptyLabel, {
                key: 3,
                class: "empty",
                title: props.empty?.title || unref(t)('common.empty.title'),
                description: props.empty?.description || unref(t)('common.empty.description')
              }, null, 8, ["title", "description"]))
            : createCommentVNode("", true)
        ]))
      : createCommentVNode("", true),
    (props.type === 'row')
      ? (openBlock(), createElementBlock("div", _hoisted_6$1, [
          (data.items.length && !data.loading)
            ? (openBlock(), createBlock(Slider, {
                key: 0,
                colPreloadCount: props.take,
                items: data.items,
                itemsInCol: 1,
                itemWidth: "146px",
                itemHeight: "208px",
                colAlign: "start",
                colGap: "8px",
                rowGap: "8px",
                snapType: "none",
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
                  ], 8, _hoisted_7$1)
                ]),
                _: 1
              }, 8, ["colPreloadCount", "items"]))
            : createCommentVNode("", true),
          (data.loading)
            ? (openBlock(), createBlock(Slider, {
                key: 1,
                colPreloadCount: props.take,
                items: Array.from(Array(props.take).keys()),
                itemsInCol: 1,
                itemWidth: "146px",
                itemHeight: "208px",
                colAlign: "start",
                colGap: "8px",
                rowGap: "8px",
                snapType: "none",
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
                      skeleton: true
                    })
                  ], 8, _hoisted_8$1)
                ]),
                _: 1
              }, 8, ["colPreloadCount", "items"]))
            : createCommentVNode("", true),
          (!data.items.length && !data.loading)
            ? (openBlock(), createBlock(EmptyLabel, {
                key: 2,
                class: "empty",
                title: props.empty?.title || unref(t)('common.empty.title'),
                description: props.empty?.description || unref(t)('common.empty.description')
              }, null, 8, ["title", "description"]))
            : createCommentVNode("", true)
        ]))
      : createCommentVNode("", true)
  ]))
}
}

};
const Releases = /*#__PURE__*/_export_sfc(_sfc_main$2, [['__scopeId',"data-v-1d0954ac"]]);

const _hoisted_1$1 = {
  key: 0,
  class: "from"
};
const _hoisted_2$1 = { key: 0 };
const _hoisted_3$1 = {
  key: 0,
  class: "tag"
};
const _hoisted_4$1 = {
  key: 1,
  class: "tag"
};
const _hoisted_5$1 = {
  key: 2,
  class: "tag"
};

    
const _sfc_main$1 = {
  __name: 'TrackPreview',
  props: {
        item: { type: Object, default: () => ({}) },
        showState: { type: Boolean, default: false },
        disabled: { type: Boolean, default: false },
        light: { type: Boolean, default: false },
        skeleton: { type: Boolean, default: false },
        invert: { type: Boolean, default: false }
    },
  emits: ['change', 'play'],
  setup(__props, { emit: __emit }) {

    const player = stores.player();


    const emit = __emit;

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

    const data = reactive({
    });


    const defaultCover = computed(() => {
        return api.tracks().defaultCover;
    });

    const state = computed(() => {
        if (!player.panes.default || player.panes.default._item?.id !== props.item?.id) {
            return;
        }

        return player.panes.default._state;
    });



    // const onEnd = () => {
    //     data.track.off('end', onEnd);
    //     // data.track.off('position', onPosition);
    //     // console.log('end', data.track);
    // };

    // const onPosition = (pos) => {
    //     // console.log('position', pos, props.item.title);
    // }

    const play = async () => {
        if ((data.track && state.value === 'stopped') || !data.track || data.track.id !== player.panes?.default?._pult?.id) {

            data.track = await player.track(props.item);
            // data.track.on('end', onEnd);
            // data.track.on('position', onPosition);

            data.track.play();
            emit('play', props.item);
            return;
        }

        if (data.track && state.value === 'paused') {
            data.track.resume();
            return;
        }
    };

    const pause = async () => {
        if (data.track && state.value === 'playing') {
            data.track.pause();
            return;
        }
    };

    onMounted(() => {
        if (player.panes?.default?._pult && player.panes?.default?._pult?.id === props.item.id) {
            data.track = player.panes.default._pult;
        }
    });

    onBeforeUnmount(() => {
        if (data.track) ;
    });

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", {
    class: normalizeClass(["track-preview", {
        disabled: props.disabled,
        invert: props.invert,
        light: props.light,
        skeleton: props.skeleton
    }])
  }, [
    createBaseVNode("div", null, [
      createBaseVNode("div", {
        class: normalizeClass(["cover", { disabled: !props.item?.wave }]),
        onClick: _cache[0] || (_cache[0] = withModifiers(() => {}, ["stop"]))
      }, [
        (cover.value?.resized || defaultCover.value?.resized || props.skeleton)
          ? (openBlock(), createBlock(Img, {
              key: 0,
              preview: props.skeleton ? null : cover.value?.resized || defaultCover.value?.resized,
              original: props.skeleton ? null : cover.value?.original || defaultCover.value?.original,
              skeleton: true,
              aspectRatio: "1 / 1"
            }, null, 8, ["preview", "original"]))
          : createCommentVNode("", true),
        (props.item?.wave)
          ? (openBlock(), createBlock(AudioToggle, {
              key: 1,
              state: state.value,
              onPlay: play,
              onPause: pause
            }, null, 8, ["state"]))
          : createCommentVNode("", true)
      ], 2)
    ]),
    createBaseVNode("div", null, [
      createBaseVNode("div", {
        class: normalizeClass({ mask: props.item?.fromProject || props.item?.version})
      }, [
        createBaseVNode("span", {
          class: normalizeClass(["title", { full: props.item?.fromProject || props.item?.version}])
        }, toDisplayString(props.item?.title || unref(t)('tracks.empty-name')), 3),
        (props.item?.fromProject || props.item?.version)
          ? (openBlock(), createElementBlock("span", _hoisted_1$1, [
              (props.item?.fromProject)
                ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                    createTextVNode(toDisplayString(unref(t)('tracks.from')) + " " + toDisplayString(props.item?.fromProject), 1)
                  ], 64))
                : createCommentVNode("", true),
              (props.item?.fromProject && props.item?.version)
                ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                    createTextVNode(" / ")
                  ], 64))
                : createCommentVNode("", true),
              (props.item?.version)
                ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
                    createTextVNode(toDisplayString(unref(t)(`tracks.versions.${props.item?.version}`)), 1)
                  ], 64))
                : createCommentVNode("", true)
            ]))
          : createCommentVNode("", true),
        (props.showState && props.item?.state)
          ? (openBlock(), createBlock(State, {
              key: 1,
              state: props.item?.state
            }, null, 8, ["state"]))
          : createCommentVNode("", true)
      ], 2),
      createBaseVNode("div", null, [
        (props.item?.contributors)
          ? (openBlock(), createBlock(ContributorsPreview, {
              key: 0,
              items: props.item?.contributors
            }, null, 8, ["items"]))
          : (props.skeleton)
            ? (openBlock(), createBlock(Button, {
                key: 1,
                class: "size-s tertiary gray link",
                name: "Artists"
              }))
            : createCommentVNode("", true)
      ]),
      (props.item?.contentId || props.item?.hasProRights || props.item?.isExplicit)
        ? (openBlock(), createElementBlock("div", _hoisted_2$1, [
            (props.item?.contentId)
              ? (openBlock(), createElementBlock("span", _hoisted_3$1, toDisplayString(unref(t)('tracks.content-id')), 1))
              : createCommentVNode("", true),
            (props.item?.hasProRights)
              ? (openBlock(), createElementBlock("span", _hoisted_4$1, toDisplayString(unref(t)('tracks.pro')), 1))
              : createCommentVNode("", true),
            (props.item?.isExplicit)
              ? (openBlock(), createElementBlock("span", _hoisted_5$1, toDisplayString(unref(t)('tracks.is-explicit')), 1))
              : createCommentVNode("", true)
          ]))
        : createCommentVNode("", true)
    ])
  ], 2))
}
}

};
const TrackPreview = /*#__PURE__*/_export_sfc(_sfc_main$1, [['__scopeId',"data-v-0fe5f002"]]);

const _hoisted_1 = { class: "block" };
const _hoisted_2 = {
  key: 1,
  class: "items-list"
};
const _hoisted_3 = {
  key: 0,
  class: "items"
};
const _hoisted_4 = {
  key: 1,
  class: "items"
};
const _hoisted_5 = ["onClick"];
const _hoisted_6 = {
  key: 2,
  class: "slider-box"
};
const _hoisted_7 = ["onClick"];
const _hoisted_8 = { class: "slide" };

    
const _sfc_main = {
  __name: 'Tracks',
  props: {
        empty: { type: Object, default: () => ({}) },
        title: { type: [Object, String, null], default: null },
        loadMore: { type: Boolean, default: true },
        params: { type: Object, default: () => ({}) },
        sort: { type: [Object, null], default: () => ({
            code: 'title',
            direction: 'asc'
        }) },
        take: { type: Number, default: 30 },
        itemsInCol: { type: Number, default: 3 },
        handler: { type: [String, null], default: () => null },
        type: { type: String, default: 'list' },
        source: { type: Object, default: () => ({ store: 'tracks', fnName: 'list' }) },
        buttons: { type: Array, default: () => ([]) },
        getById: { type: [String, null], default: null }
    },
  emits: ['change'],
  setup(__props, { expose: __expose, emit: __emit }) {

    const emit = __emit;

    stores.nav();


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

        let params;
        if (props.getById) {
            params = props.getById;
        } else {
            params = {
                ...(props.params || {}),
                skip: data.skip,
                take: props.take
            };

            if (props.sort) {
                params.sort = props.sort.code;
                params.sort_dir = props.sort.direction;
            }
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

        // if (props.handler === 'track' && item?.id) {
        //     nav.open('track', { id: item?.id });
        // }
    };

    __expose({
        reload
    });

    onMounted(() => {
        getItems();
    });

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1, [
    (props.title)
      ? (openBlock(), createBlock(TitleWithButtons, {
          key: 0,
          title: props.title,
          items: props.buttons
        }, null, 8, ["title", "items"]))
      : createCommentVNode("", true),
    (props.type === 'list')
      ? (openBlock(), createElementBlock("div", _hoisted_2, [
          (!props.loadMore && data.loading && !data.items.length)
            ? (openBlock(), createElementBlock("ul", _hoisted_3, [
                (openBlock(), createElementBlock(Fragment, null, renderList([1,2,3,4,5,6], (item, id) => {
                  return createBaseVNode("li", null, [
                    createVNode(TrackPreview, {
                      skeleton: true,
                      playable: false,
                      light: true
                    })
                  ])
                }), 64))
              ]))
            : createCommentVNode("", true),
          (data.items.length)
            ? (openBlock(), createElementBlock("ul", _hoisted_4, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(data.items, (item, id) => {
                  return (openBlock(), createElementBlock("li", {
                    class: normalizeClass({ active: props.id === item.code }),
                    onClick: $event => (onClick(item))
                  }, [
                    createVNode(TrackPreview, {
                      item: item,
                      light: true
                    }, null, 8, ["item"])
                  ], 10, _hoisted_5))
                }), 256))
              ]))
            : createCommentVNode("", true),
          (props.loadMore && (data.loading || (data.items.length < data.total)))
            ? (openBlock(), createBlock(Button, {
                key: 2,
                loading: data.loading,
                class: "tertiary size-l",
                name: unref(t)(`blocks.tracks.load`),
                onClick: getItems
              }, null, 8, ["loading", "name"]))
            : createCommentVNode("", true),
          (!data.items.length && !data.loading)
            ? (openBlock(), createBlock(EmptyLabel, {
                key: 3,
                class: "empty",
                title: props.empty?.title || unref(t)('common.empty.title'),
                description: props.empty?.description || unref(t)('common.empty.description')
              }, null, 8, ["title", "description"]))
            : createCommentVNode("", true)
        ]))
      : createCommentVNode("", true),
    (props.type === 'row')
      ? (openBlock(), createElementBlock("div", _hoisted_6, [
          (data.items.length && !data.loading)
            ? (openBlock(), createBlock(Slider, {
                key: 0,
                colPreloadCount: Math.ceil(props.take / props.itemsInCol),
                items: data.items,
                itemsInCol: props.itemsInCol,
                itemWidth: "90%",
                colAlign: "start",
                colGap: "8px",
                rowGap: "8px",
                ref: "sliderRef"
              }, {
                default: withCtx(({ item }) => [
                  createBaseVNode("div", {
                    class: "slide",
                    onClick: $event => (onClick(item))
                  }, [
                    createVNode(TrackPreview, {
                      item: item,
                      light: true
                    }, null, 8, ["item"])
                  ], 8, _hoisted_7)
                ]),
                _: 1
              }, 8, ["colPreloadCount", "items", "itemsInCol"]))
            : createCommentVNode("", true),
          (data.loading)
            ? (openBlock(), createBlock(Slider, {
                key: 1,
                colPreloadCount: Math.ceil(props.take / props.itemsInCol),
                items: Array.from(Array(props.take).keys()),
                itemsInCol: props.itemsInCol,
                itemWidth: "90%",
                colAlign: "start",
                colGap: "8px",
                rowGap: "8px",
                ref: "sliderRef"
              }, {
                default: withCtx(({ item }) => [
                  createBaseVNode("div", _hoisted_8, [
                    createVNode(TrackPreview, {
                      skeleton: true,
                      light: true
                    })
                  ])
                ]),
                _: 1
              }, 8, ["colPreloadCount", "items", "itemsInCol"]))
            : createCommentVNode("", true),
          (!data.items.length && !data.loading)
            ? (openBlock(), createBlock(EmptyLabel, {
                key: 2,
                class: "empty",
                title: props.empty?.title || unref(t)('common.empty.title'),
                description: props.empty?.description || unref(t)('common.empty.description')
              }, null, 8, ["title", "description"]))
            : createCommentVNode("", true)
        ]))
      : createCommentVNode("", true)
  ]))
}
}

};
const Tracks = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-75763799"]]);

export { Releases as R, Tracks as T };
//# sourceMappingURL=Tracks-BsxW8yCT.js.map
