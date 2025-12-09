import { S as State, B as Block } from './State-0HfWrjtu.js';
import { _ as _export_sfc, u as useI18n, c as createElementBlock, d as createCommentVNode, f as openBlock, F as Fragment, M as createTextVNode, t as toDisplayString, h as unref, s as stores, j as computed, r as reactive, g as api, q as createBaseVNode, b as createBlock, n as normalizeClass, e as createVNode, z as withModifiers, I as IconButton, D as Button, L as hooks, p as ref, k as withCtx, R as mergeProps } from './index-B7gNE82-.js';
import { I as Img } from './Img-DO8mDIge.js';
import { A as AudioToggle } from './AudioToggle-B4DBiUrO.js';
import { C as ContributorsPreview } from './ContributorsPreview-WLcUm38Z.js';

const _hoisted_1$1 = {
  key: 0,
  class: "release-type"
};

    
const _sfc_main$2 = {
  __name: 'ReleaseType',
  props: {
        trackCount: { type: [Number, null], default: null }
    },
  setup(__props) {

    const { t } = useI18n();

    const props = __props;

return (_ctx, _cache) => {
  return (props.trackCount)
    ? (openBlock(), createElementBlock("span", _hoisted_1$1, [
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
const ReleaseType = /*#__PURE__*/_export_sfc(_sfc_main$2, [['__scopeId',"data-v-cd8bd733"]]);

const _hoisted_1 = {
  key: 1,
  class: "buttons"
};
const _hoisted_2 = {
  key: 0,
  class: "from"
};
const _hoisted_3 = {
  key: 0,
  class: "year"
};
const _hoisted_4 = { key: 0 };

    
const _sfc_main$1 = {
  __name: 'ReleasePreview',
  props: {
        item: { type: Object, default: () => ({}) },
        showState: { type: Boolean, default: false },
        row: { type: Boolean, default: false },
        disabled: { type: Boolean, default: false },
        light: { type: Boolean, default: false },
        playable: { type: Boolean, default: true },
        showKebab: { type: Boolean, default: false },
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

    const openKebab = () => {
        modals.open('release-kebab', { quietClose: true, data: { id: props.item?.id } });
    };

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
        if (!player.panes.default || player.panes.default._queue?.id !== props.item?.id) {
            return;
        }

        return player.panes.default._state;
    });

    // const getTracks = async () => {
    //     const payload = await api.releases().tracks.list(props.item.id) || [];
    //     return payload?.items || [];
    // }

    const pause = async () => {
        player.release.pause(props.item.id);
        // // Если не наш релиз играет, ничего не делаем
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
        player.release.play(props.item.id);
        // // Если там не этот релиз включен
        // if (player.panes.default?._queue?.id !== props.item?.id) {
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
          ? (openBlock(), createElementBlock("span", _hoisted_2, toDisplayString(unref(t)('releases.from')) + " " + toDisplayString(props.item?.fromProject), 1))
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
            ? (openBlock(), createElementBlock("span", _hoisted_3, toDisplayString(unref(hooks)(props.item.releaseDate).year()), 1))
            : createCommentVNode("", true),
          createVNode(ReleaseType, {
            trackCount: props.item.trackCount,
            class: "release-type"
          }, null, 8, ["trackCount"])
        ])
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
const ReleasePreview = /*#__PURE__*/_export_sfc(_sfc_main$1, [['__scopeId',"data-v-b47abf57"]]);

const _sfc_main = {
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
        light: { type: Boolean, default: true },
        showKebab: { type: Boolean, default: false },
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
        light: props.light,
        item: item,
        showKebab: props.showKebab
      }, null, 8, ["light", "item", "showKebab"])
    ]),
    "list-skeleton": withCtx(() => [
      createVNode(ReleasePreview, {
        row: true,
        playable: false,
        light: props.light,
        skeleton: true
      }, null, 8, ["light"])
    ]),
    "row-item": withCtx(({ item }) => [
      createVNode(ReleasePreview, {
        row: false,
        playable: false,
        item: item,
        showKebab: props.showKebab
      }, null, 8, ["item", "showKebab"])
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

export { _sfc_main as _ };
//# sourceMappingURL=Releases-CubXxQ_j.js.map
