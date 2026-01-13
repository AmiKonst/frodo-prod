import { B as Block } from './Block-DF4lYS_M.js';
import { s as stores, h as ref, b as createBlock, f as openBlock, w as withCtx, e as createVNode, T as TrackPreview, m as mergeProps, i as unref } from './index-CtNKyRc2.js';

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
//# sourceMappingURL=Tracks-6Djb9wfi.js.map
