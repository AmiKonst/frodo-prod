import { S as State, B as Block } from './State-DRMByaeq.js';
import { _ as _export_sfc, y as resolveComponent, c as createElementBlock, o as openBlock, p as createBaseVNode, b as createBlock, d as createCommentVNode, z as withModifiers, n as normalizeClass, u as useI18n, F as Fragment, N as createTextVNode, t as toDisplayString, h as unref, s as stores, j as computed, l as renderList, B as Button, r as reactive, a as api, e as createVNode, I as IconButton, K as hooks, q as ref, k as withCtx, S as mergeProps, f as onMounted, g as onBeforeUnmount } from './index-D3R6xFb2.js';
import { I as Img } from './Img-Cg4gaCDd.js';

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
const AudioToggle = /*#__PURE__*/_export_sfc(_sfc_main$6, [['__scopeId',"data-v-2cd8e931"]]);

const _hoisted_1$3 = {
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
    ? (openBlock(), createElementBlock("span", _hoisted_1$3, [
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

const _hoisted_1$2 = { class: "artist" };
const _hoisted_2$2 = { key: 1 };
const _hoisted_3$2 = { key: 1 };

    
const _sfc_main$4 = {
  __name: 'ContributorsPreview',
  props: {
        items: { type: Array, default: () => ([]) },
        invert: { type: Boolean, default: false }
    },
  setup(__props) {

    const nav = stores.nav();

    const props = __props;

    const primaryArtists = computed(() => {
        return props.items?.filter(item =>
            item.role === 'PRIMARY' && (item.artist?.name || item.unregisteredArtistName)).map(item => ({
                name: item.artist?.name || item.unregisteredArtistName,
                id: item.state === 'CONFIRMED' ? item.artist?.id : null,
                code: item.state === 'CONFIRMED' ? item.artist?.code : null
            })) || []
    });

    const featArtists = computed(() => {
        return props.items?.filter(item =>
            item.role === 'FEATURED' && (item.artist?.name || item.unregisteredArtistName)).map(item => ({
                name: item.artist?.name || item.unregisteredArtistName,
                id: item.state === 'CONFIRMED' ? item.artist?.id : null,
                code: item.state === 'CONFIRMED' ? item.artist?.code : null
            })) || []
    });

    const openArtist = (item) => {
        if (!item?.code) {
            return;
        }

        nav.open('artist', { code: item?.code });
    };

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("span", _hoisted_1$2, [
    (openBlock(true), createElementBlock(Fragment, null, renderList(primaryArtists.value, (item, id) => {
      return (openBlock(), createElementBlock(Fragment, { key: id }, [
        (item.id)
          ? (openBlock(), createBlock(Button, {
              key: 0,
              name: `${item.name}${ id < primaryArtists.value.length - 1 ? ',' : ''}`,
              class: normalizeClass(["size-s tertiary gray link", { invert: props.invert }]),
              onClick: withModifiers($event => (openArtist(item)), ["stop"])
            }, null, 8, ["name", "class", "onClick"]))
          : (openBlock(), createElementBlock("span", _hoisted_2$2, toDisplayString(`${item.name}${ id < primaryArtists.value.length - 1 ? ',' : ''}`), 1))
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
                    class: normalizeClass(["size-s tertiary gray link", { invert: props.invert }]),
                    onClick: withModifiers($event => (openArtist(item)), ["stop"])
                  }, null, 8, ["name", "class", "onClick"]))
                : (openBlock(), createElementBlock("span", _hoisted_3$2, toDisplayString(`${item.name}${ id < featArtists.value.length - 1 ? ',' : ''}`), 1))
            ], 64))
          }), 128))
        ], 64))
      : createCommentVNode("", true)
  ]))
}
}

};
const ContributorsPreview = /*#__PURE__*/_export_sfc(_sfc_main$4, [['__scopeId',"data-v-5ed6b474"]]);

const _hoisted_1$1 = {
  key: 1,
  class: "buttons"
};
const _hoisted_2$1 = {
  key: 0,
  class: "from"
};
const _hoisted_3$1 = {
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

    // const getTracks = async () => {
    //     const payload = await api.releases().tracks.list(props.item.id) || [];
    //     return payload?.items || [];
    // }

    const pause = async () => {
        player.release.pause(props.item);
        // // Если не наш релиз играет, ничего не делаем
        // if (player.panes.default?._queue?.release?.id !== props.item?.id) {
        //     return;
        // }

        // // Если идет воспроизведение
        // if (state.value === 'playing') {
        //     player.panes.default.pause();
        //     return;
        // }
    };

    const play = async () => {
        player.release.play(props.item);
        // // Если там не этот релиз включен
        // if (player.panes.default?._queue?.release?.id !== props.item?.id) {
        //     const tracks = await getTracks();

        //     if (!tracks?.length) {
        //         return;
        //     }

        //     const queue = await player.trackQueue(tracks, { type: 'release', release: props.item });

        //     if (!queue?.items?.length) {
        //         return;
        //     }

        //     const track = await player.track(queue.items[0]);
        //     track.play();
        //     return;
        // }

        // const queue = player.panes.default.queue();

        // // Если стоит на паузе
        // if (player.panes.default._state === 'paused') {
        //     player.panes.default.resume();
        //     return;
        // }

        // // Если закончилось воспроизведение
        // if (player.panes.default._state === 'stopped' && queue.items?.length) {
        //     const track = await player.track(queue.items[0]);
        //     track.play();
        //     return;
        // }
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
          ? (openBlock(), createElementBlock("div", _hoisted_1$1, [
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
          ? (openBlock(), createElementBlock("span", _hoisted_2$1, toDisplayString(unref(t)('releases.from')) + " " + toDisplayString(props.item?.fromProject), 1))
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
const ReleasePreview = /*#__PURE__*/_export_sfc(_sfc_main$3, [['__scopeId',"data-v-3584ff6d"]]);

const _sfc_main$2 = {
  __name: 'Releases',
  props: {
        empty: { type: Object, default: () => ({}) },
        items: { type: Array, default: () => ([]) },
        title: { type: [Object, String, null], default: null },
        params: { type: Object, default: () => ({}) },
        sort: { type: [Object, null], default: () => ({
            code: 'title',
            direction: 'asc'
        }) },
        loadMore: { type: Boolean, default: true },
        skeleton: { type: Boolean, default: true },
        skeletonCount: { type: Number, default: 30 },
        itemsInCol: { type: Number, default: 1 },
        take: { type: Number, default: 30 },
        handler: { type: [String, null], default: () => null },
        type: { type: String, default: 'list' },
        source: { type: [Object, null], default: () => ({ store: 'releases', fnName: 'list' }) },
        buttons: { type: Array, default: () => ([]) },
        getById: { type: [String, null], default: null }
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

        if (props.handler === 'release' && item?.id) {
            nav.open('release', { id: item?.id });
        }
    };

    __expose({
        reload
    });


return (_ctx, _cache) => {
  return (openBlock(), createBlock(Block, mergeProps({ code: "releases" }, props, {
    ref_key: "block",
    ref: block,
    onChange: onClick,
    sliderProps: {
            itemWidth: '146px',
            itemHeight: '208px',
            colAlign: 'start',
            colGap: '8px',
            rowGap: '8px',
            snapType: 'none'
        }
  }), {
    "list-item": withCtx(({ item }) => [
      createVNode(ReleasePreview, {
        row: true,
        item: item
      }, null, 8, ["item"])
    ]),
    "list-skeleton": withCtx(() => [
      createVNode(ReleasePreview, {
        row: true,
        playable: false,
        skeleton: true
      })
    ]),
    "row-item": withCtx(({ item }) => [
      createVNode(ReleasePreview, {
        row: false,
        playable: false,
        item: item
      }, null, 8, ["item"])
    ]),
    "row-skeleton": withCtx(() => [
      createVNode(ReleasePreview, {
        row: false,
        playable: false,
        skeleton: true
      })
    ]),
    _: 1
  }, 16))
}
}

};

const _hoisted_1 = {
  key: 0,
  class: "from"
};
const _hoisted_2 = { key: 0 };
const _hoisted_3 = {
  key: 0,
  class: "tag"
};
const _hoisted_4 = {
  key: 1,
  class: "tag"
};
const _hoisted_5 = {
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
          ? (openBlock(), createElementBlock("span", _hoisted_1, [
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
        ? (openBlock(), createElementBlock("div", _hoisted_2, [
            (props.item?.contentId)
              ? (openBlock(), createElementBlock("span", _hoisted_3, toDisplayString(unref(t)('tracks.content-id')), 1))
              : createCommentVNode("", true),
            (props.item?.hasProRights)
              ? (openBlock(), createElementBlock("span", _hoisted_4, toDisplayString(unref(t)('tracks.pro')), 1))
              : createCommentVNode("", true),
            (props.item?.isExplicit)
              ? (openBlock(), createElementBlock("span", _hoisted_5, toDisplayString(unref(t)('tracks.is-explicit')), 1))
              : createCommentVNode("", true)
          ]))
        : createCommentVNode("", true)
    ])
  ], 2))
}
}

};
const TrackPreview = /*#__PURE__*/_export_sfc(_sfc_main$1, [['__scopeId',"data-v-0fe5f002"]]);

const _sfc_main = {
  __name: 'Tracks',
  props: {
        empty: { type: Object, default: () => ({}) },
        items: { type: Array, default: () => ([]) },
        title: { type: [Object, String, null], default: null },
        params: { type: Object, default: () => ({}) },
        sort: { type: [Object, null], default: () => ({
            code: 'name',
            direction: 'asc'
        }) },
        loadMore: { type: Boolean, default: true },
        skeleton: { type: Boolean, default: true },
        skeletonCount: { type: Number, default: 6 },
        itemsInCol: { type: Number, default: 3 },
        take: { type: Number, default: 30 },
        handler: { type: [String, null], default: () => null },
        type: { type: String, default: 'list' },
        source: { type: [Object, null], default: () => ({ store: 'tracks', fnName: 'list' }) },
        buttons: { type: Array, default: () => ([]) },
        getById: { type: [String, null], default: null }
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

        if (props.handler === 'track' && item?.id) {
            nav.open('track', { id: item?.id });
        }
    };

    __expose({
        reload
    });


return (_ctx, _cache) => {
  return (openBlock(), createBlock(Block, mergeProps({ code: "tracks" }, props, {
    ref_key: "block",
    ref: block,
    onChange: onClick,
    sliderProps: {
            itemWidth: '90%',
            colAlign: 'start',
            colGap: '8px',
            rowGap: '8px'
        }
  }), {
    "list-item": withCtx(({ item }) => [
      createVNode(TrackPreview, {
        item: item,
        light: true
      }, null, 8, ["item"])
    ]),
    "list-skeleton": withCtx(() => [
      createVNode(TrackPreview, {
        skeleton: true,
        playable: false,
        light: true
      })
    ]),
    "row-item": withCtx(({ item }) => [
      createVNode(TrackPreview, {
        item: item,
        light: true
      }, null, 8, ["item"])
    ]),
    "row-skeleton": withCtx(() => [
      createVNode(TrackPreview, {
        skeleton: true,
        light: true
      })
    ]),
    _: 1
  }, 16))
}
}

};

export { AudioToggle as A, _sfc_main as _, _sfc_main$2 as a };
//# sourceMappingURL=Tracks-DnHvKwKF.js.map
