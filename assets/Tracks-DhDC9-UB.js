import { S as State, B as Block } from './State-0HfWrjtu.js';
import { _ as _export_sfc, s as stores, u as useI18n, j as computed, r as reactive, g as api, c as createElementBlock, f as openBlock, q as createBaseVNode, d as createCommentVNode, z as withModifiers, n as normalizeClass, b as createBlock, t as toDisplayString, h as unref, F as Fragment, M as createTextVNode, D as Button, e as createVNode, I as IconButton, p as ref, k as withCtx, R as mergeProps } from './index-B7gNE82-.js';
import { I as Img } from './Img-DO8mDIge.js';
import { C as ContributorsPreview } from './ContributorsPreview-WLcUm38Z.js';
import { A as AudioToggle } from './AudioToggle-B4DBiUrO.js';

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
const _hoisted_6 = { key: 0 };

    
const _sfc_main$1 = {
  __name: 'TrackPreview',
  props: {
        item: { type: Object, default: () => ({}) },
        showState: { type: Boolean, default: false },
        disabled: { type: Boolean, default: false },
        light: { type: Boolean, default: false },
        showKebab: { type: Boolean, default: false },
        skeleton: { type: Boolean, default: false },
        invert: { type: Boolean, default: false }
    },
  emits: ['change', 'play'],
  setup(__props, { emit: __emit }) {

    const player = stores.player();
    const modals = stores.modals();

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

    reactive({
    });


    const defaultCover = computed(() => {
        return api.tracks().defaultCover;
    });

    const openKebab = () => {
        modals.open('track-kebab', { quietClose: true, data: { id: props.item?.id } });
    };

    const state = computed(() => {
        if (!player.panes.default || player.panes.default._item?.id !== props.item?.id) {
            return;
        }

        return player.panes.default._state;
    });


    const toggle = () => {
        if (!props.item?.wave) {
            return;
        }

        if ([undefined, 'paused', 'stopped'].indexOf(state.value) !== -1) {
            play();
        } else if (state.value === 'playing') {
            pause();
        }
    };

    const play = async () => {
        if (!state.value || state.value === 'stopped') {
            await player.track(props.item);

            if (!player.panes?.default) {
                return;
            }

            player.panes.default.play();
            emit('play', props.item);
            return;
        }

        if (player.panes.default && state.value === 'paused') {
            player.panes.default.resume();
            return;
        }
    };

    const pause = async () => {
        if (!player.panes?.default) {
            return;
        }

        if (state.value === 'playing') {
            player.panes.default.pause();
            return;
        }
    };

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", {
    class: normalizeClass(["track-preview", {
        disabled: props.disabled,
        invert: props.invert,
        light: props.light,
        skeleton: props.skeleton
    }]),
    onClick: toggle
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
    ]),
    (props.showKebab)
      ? (openBlock(), createElementBlock("div", _hoisted_6, [
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
const TrackPreview = /*#__PURE__*/_export_sfc(_sfc_main$1, [['__scopeId',"data-v-2e6c2f89"]]);

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
        showKebab: { type: Boolean, default: false },
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
    id: unref(player).panes?.default?._item?.id,
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
        showKebab: props.showKebab,
        onPlay: $event => (onPlaying(item))
      }, null, 8, ["item", "showKebab", "onPlay"])
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
        showKebab: props.showKebab,
        onPlay: $event => (onPlaying(item))
      }, null, 8, ["item", "showKebab", "onPlay"])
    ]),
    "row-skeleton": withCtx(() => [
      createVNode(TrackPreview, {
        skeleton: true,
        light: true
      })
    ]),
    _: 1
  }, 16, ["id"]))
}
}

};

export { _sfc_main as _ };
//# sourceMappingURL=Tracks-DhDC9-UB.js.map
