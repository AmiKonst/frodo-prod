import { _ as _export_sfc, s as stores, r as reactive, q as ref, j as computed, f as onMounted, g as onBeforeUnmount, c as createElementBlock, o as openBlock, p as createBaseVNode, y as renderSlot, J as normalizeStyle, n as normalizeClass, v as resolveComponent, b as createBlock, d as createCommentVNode, x as withModifiers, F as Fragment, l as renderList, C as Button, t as toDisplayString, u as useI18n, a as api, h as unref, L as createTextVNode, k as withCtx, e as createVNode, R as mergeProps } from './index-104WYXIP.js';
import { S as State, B as Block } from './State-B6K11K5M.js';
import { I as Img } from './Img-E9NuTJn8.js';

const _hoisted_1$2 = { class: "detail-item" };
const _hoisted_2$2 = { class: "box" };
const _hoisted_3$2 = { class: "toolbar" };

    
const _sfc_main$4 = {
  __name: 'ItemDetail',
  props: {
        previewHeight: { type: Number, default: 384 },
        aspectRatio: { type: [String, null], default: null },
        invertShadow: { type: [Boolean, null], default: null },

    },
  emits: ['mode'],
  setup(__props, { emit: __emit }) {

    // import IconButton from '🔗/components/ui/IconButton.vue';
    stores.others();

    const props = __props;

    const data = reactive({
        mode: 'preview'
    });


    const emit = __emit;

    const detail = ref(null);

    const scrollTop = ref(0);
    const scrollDirection = ref(0);


    const progress = computed(() =>
        Math.min(1, scrollTop.value / (props.previewHeight || detail?.value?.clientWidth))
    );

    // Opacity
        const wrapperOpacity = computed(() => 1 - progress.value);
        const backgroundOpacity = computed(() => 1 - progress.value);

    let lastY = 0;
    const onScroll = (e) => {
        const y = e.target.scrollTop;
        scrollDirection.value = y - lastY;
        lastY = y;

        scrollTop.value = y;
        updateMode();
    };

    const updateMode = () => {
        const newMode = progress.value >= 1 ? "detail" : "preview";
        if (newMode !== data.mode) {
            data.mode = newMode;
            emit('mode', newMode);
        }
    };


    document.body.classList.add('with-tg-header');
    onMounted(() => {
        document.querySelector('.page').addEventListener('scroll', onScroll);
    });

    onBeforeUnmount(() => {
        document.body.classList.remove('with-tg-header');
        document.querySelector('.page').removeEventListener('scroll', onScroll);
    });

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$2, [
    createBaseVNode("div", {
      class: normalizeClass(["background", {
                'with-shadow': props.invertShadow !== null,
                'invert-shadow': !!props.invertShadow
            }]),
      style: normalizeStyle({
                opacity: backgroundOpacity.value,
                'aspect-ratio': props.aspectRatio,
                height: props.previewHeight ? props.previewHeight + 'px' : 'auto'
            })
    }, [
      renderSlot(_ctx.$slots, "background", {}, undefined, true)
    ], 6),
    createBaseVNode("div", _hoisted_2$2, [
      createBaseVNode("div", {
        class: "preview",
        style: normalizeStyle({
                    opacity: 1,
                    'aspect-ratio': props.aspectRatio,
                    height: props.previewHeight ? props.previewHeight + 'px' : 'auto'
                })
      }, [
        createBaseVNode("div", {
          class: "wrapper",
          style: normalizeStyle({ opacity: wrapperOpacity.value })
        }, [
          createBaseVNode("div", _hoisted_3$2, [
            renderSlot(_ctx.$slots, "toolbar", {}, undefined, true)
          ]),
          renderSlot(_ctx.$slots, "preview", {}, undefined, true)
        ], 4)
      ], 4),
      createBaseVNode("div", {
        class: "detail",
        ref_key: "detail",
        ref: detail
      }, [
        renderSlot(_ctx.$slots, "detail", {}, undefined, true)
      ], 512)
    ])
  ]))
}
}

};
const ItemDetail = /*#__PURE__*/_export_sfc(_sfc_main$4, [['__scopeId',"data-v-25a80ce8"]]);

const _sfc_main$3 = {
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
const AudioToggle = /*#__PURE__*/_export_sfc(_sfc_main$3, [['__scopeId',"data-v-2cd8e931"]]);

const _hoisted_1$1 = { class: "artist" };
const _hoisted_2$1 = { key: 1 };
const _hoisted_3$1 = { key: 1 };

    
const _sfc_main$2 = {
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
  return (openBlock(), createElementBlock("span", _hoisted_1$1, [
    (openBlock(true), createElementBlock(Fragment, null, renderList(primaryArtists.value, (item, id) => {
      return (openBlock(), createElementBlock(Fragment, { key: id }, [
        (item.id)
          ? (openBlock(), createBlock(Button, {
              key: 0,
              name: `${item.name}${ id < primaryArtists.value.length - 1 ? ',' : ''}`,
              class: normalizeClass(["size-s tertiary gray link", { invert: props.invert }]),
              onClick: withModifiers($event => (openArtist(item)), ["stop"])
            }, null, 8, ["name", "class", "onClick"]))
          : (openBlock(), createElementBlock("span", _hoisted_2$1, toDisplayString(`${item.name}${ id < primaryArtists.value.length - 1 ? ',' : ''}`), 1))
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
                : (openBlock(), createElementBlock("span", _hoisted_3$1, toDisplayString(`${item.name}${ id < featArtists.value.length - 1 ? ',' : ''}`), 1))
            ], 64))
          }), 128))
        ], 64))
      : createCommentVNode("", true)
  ]))
}
}

};
const ContributorsPreview = /*#__PURE__*/_export_sfc(_sfc_main$2, [['__scopeId',"data-v-5ed6b474"]]);

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
        options: { type: Object, default: () => ({}) },
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
    const player = stores.player();
    
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

    const onPlaying = (item) => {
        const { items, total } = block.value.getState();

        player.tracks({
            params: props.params,
            sort: props.sort,
            options: {
                ...props.options,
                source: props.source,
                items: [...items],
                total
            },
            loadMore: !props.options?.type || ['artist', 'playlist'].indexOf(props.options?.type) !== -1 
        });
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
        light: true,
        onPlay: $event => (onPlaying(item))
      }, null, 8, ["item", "onPlay"])
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
        light: true,
        onPlay: $event => (onPlaying(item))
      }, null, 8, ["item", "onPlay"])
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

export { AudioToggle as A, ContributorsPreview as C, ItemDetail as I, _sfc_main as _ };
//# sourceMappingURL=Tracks-BHPCwwmB.js.map
