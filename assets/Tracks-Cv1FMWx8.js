import { B as Block } from './Block-YhKD3jBM.js';
import { _ as _export_sfc, s as stores, j as computed, g as api, c as createElementBlock, f as openBlock, e as createVNode, l as createBaseVNode, X as TrackPreview, x as ref, b as createBlock, k as withCtx, O as mergeProps, h as unref } from './index-DxeSi4qe.js';
import { C as Collage } from './Collage-DsVwasxX.js';

const _hoisted_1 = { class: "extended-track-preview" };
const _hoisted_2 = { class: "track-preview-box" };

    
const _sfc_main$1 = {
  __name: 'ExtendedTrackPreview',
  props: {
        item: { type: Object, default: () => ({}) },
        skeleton: { type: Boolean, default: false },
        playable: { type: Boolean, default: true },
        light: { type: Boolean, default: false },
        showKebab: { type: Boolean, default: false },
        externalPlay: { type: Boolean, default: false }
    },
  emits: ['change', 'play', 'color'],
  setup(__props, { emit: __emit }) {

    const player = stores.player();

    const emit = __emit;

    const props = __props;

    const state = computed(() => {
        if (!player.panes.default || player.panes.default._item?.id !== props.item?.id) {
            return;
        }

        return player.panes.default._state;
    });

    const artists = computed(() => {
        if (!props.item?.contributors?.length) {
            return [];
        }

        return props.item.contributors.filter(item => item.role === 'PRIMARY' && item.state === 'CONFIRMED').map(item => item.artist.profileImage);
    });

    const defaultProfileImage = computed(() => {
        return api.artists().defaultProfileImage;
    });

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1, [
    createVNode(Collage, {
      items: artists.value,
      default: defaultProfileImage.value,
      highQuality: true,
      vinyl: !!state.value,
      playing: state.value === 'playing',
      borderRadius: "160px"
    }, null, 8, ["items", "default", "vinyl", "playing"]),
    createBaseVNode("div", _hoisted_2, [
      createVNode(TrackPreview, {
        item: props.item,
        light: props.light,
        showKebab: props.showKebab,
        externalPlay: props.externalPlay,
        skeleton: props.skeleton,
        playable: props.playable,
        showLike: true,
        onPlay: _cache[0] || (_cache[0] = $event => (emit('play', $event))),
        onColor: _cache[1] || (_cache[1] = $event => (emit('color', $event))),
        onChange: _cache[2] || (_cache[2] = $event => (emit('change', $event)))
      }, null, 8, ["item", "light", "showKebab", "externalPlay", "skeleton", "playable"])
    ])
  ]))
}
}

};
const ExtendedTrackPreview = /*#__PURE__*/_export_sfc(_sfc_main$1, [['__scopeId',"data-v-623a9177"]]);

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
        subtype: { type: [String, null], default: null },
        getById: { type: [String, null], default: null }
    },
  emits: ['change'],
  setup(__props, { expose: __expose, emit: __emit }) {

    const emit = __emit;

    stores.nav();
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

        // if (props.handler === 'track' && item?.id) {
        //     nav.open('track', { id: item?.id });
        // }
    };

    const onPlaying = async (item) => {
        const { items, total } = block.value.getState();

        await player.tracks({
            params: props.params,
            sort: props.sort,
            options: {
                ...props.options,
                source: props.source,
                items: [...items],
                total,
                getById: props.getById
            },
            loadMore: (!props.options?.type && props.loadMore) || ['artist', 'playlist'].indexOf(props.options?.type) !== -1 
        });

        await player.track(item);
        player.play();
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
    sliderPreudo: props.subtype === 'extended',
    sliderProps: props.subtype === 'extended' ? {
            itemWidth: '342px',
            colAlign: 'center',
            colGap: '8px',
            rowGap: '8px'
        } : {
            itemWidth: '90%',
            colAlign: 'start',
            colGap: '8px',
            rowGap: '8px'
        },
    style: {"--slider-pseudo-width":"calc(50% - 179px)"}
  }), {
    "list-item": withCtx(({ item }) => [
      (props.subtype === 'extended')
        ? (openBlock(), createBlock(ExtendedTrackPreview, {
            key: 0,
            item: item,
            light: true,
            externalPlay: true,
            showKebab: props.showKebab,
            onPlay: $event => (onPlaying(item))
          }, null, 8, ["item", "showKebab", "onPlay"]))
        : (openBlock(), createBlock(TrackPreview, {
            key: 1,
            item: item,
            light: true,
            externalPlay: true,
            showKebab: props.showKebab,
            onPlay: $event => (onPlaying(item))
          }, null, 8, ["item", "showKebab", "onPlay"]))
    ]),
    "list-skeleton": withCtx(() => [
      (props.subtype === 'extended')
        ? (openBlock(), createBlock(ExtendedTrackPreview, {
            key: 0,
            skeleton: true,
            playable: false,
            light: true
          }))
        : (openBlock(), createBlock(TrackPreview, {
            key: 1,
            skeleton: true,
            playable: false,
            light: true
          }))
    ]),
    "row-item": withCtx(({ item }) => [
      (props.subtype === 'extended')
        ? (openBlock(), createBlock(ExtendedTrackPreview, {
            key: 0,
            item: item,
            light: true,
            showKebab: props.showKebab,
            externalPlay: true,
            onPlay: $event => (onPlaying(item))
          }, null, 8, ["item", "showKebab", "onPlay"]))
        : (openBlock(), createBlock(TrackPreview, {
            key: 1,
            item: item,
            light: true,
            showKebab: props.showKebab,
            externalPlay: true,
            onPlay: $event => (onPlaying(item))
          }, null, 8, ["item", "showKebab", "onPlay"]))
    ]),
    "row-skeleton": withCtx(() => [
      (props.subtype === 'extended')
        ? (openBlock(), createBlock(ExtendedTrackPreview, {
            key: 0,
            skeleton: true,
            light: true
          }))
        : (openBlock(), createBlock(TrackPreview, {
            key: 1,
            skeleton: true,
            light: true
          }))
    ]),
    _: 1
  }, 16, ["id", "sliderPreudo", "sliderProps"]))
}
}

};

export { _sfc_main as _ };
//# sourceMappingURL=Tracks-Cv1FMWx8.js.map
