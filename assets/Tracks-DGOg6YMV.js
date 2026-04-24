import { B as Block } from './Block-B8Spihwb.js';
import { _ as _export_sfc, x as ref, w as watch, j as computed, a as onBeforeUnmount, c as createElementBlock, d as createCommentVNode, f as openBlock, F as Fragment, m as renderList, b as createBlock, p as normalizeClass, q as Img, z as normalizeStyle, s as stores, g as api, e as createVNode, l as createBaseVNode, a3 as TrackPreview, k as withCtx, E as mergeProps, h as unref } from './index-BZkX1NIq.js';

const _sfc_main$2 = {
  __name: 'Collage',
  props: {
        items: { type: Array, default: () => [] },
        default: { type: [Object, null], default: null },
        gap: { type: String, default: '2px' },
        highQuality: { type: Boolean, default: false },
        borderRadius: { type: String, default: '8px' },
        maxPreviewCount: { type: [Number, null], default: 8 },
        animationType: {
            type: String,
            default: 'none',
            validator: val => ['none', 'breath', 'float', 'tilt', 'pulse'].includes(val)
        },
        playing: { type: Boolean, default: false },
        vinyl: { type: Boolean, default: false }
    },
  setup(__props) {

    const props = __props;

    const currentRotation = ref(0);
    let animationFrameId = null;

    // Функция для обновления угла вращения
    const updateRotation = (timestamp) => {
        const rotationSpeed = 360 / 24000; // 360deg за 24 сек
        currentRotation.value += rotationSpeed * (16); // приближенно 60fps
        currentRotation.value %= 360;
        animationFrameId = requestAnimationFrame(updateRotation);
    };

    watch(
        () => props.playing,
        (val) => {
            if (val) {
                // Запуск вращения
                animationFrameId = requestAnimationFrame(updateRotation);
            } else {
                // Остановка вращения
                if (animationFrameId) {
                    cancelAnimationFrame(animationFrameId);
                    animationFrameId = null;
                }
            }
        },
        { immediate: true }
    );

    watch(
        () => props.vinyl,
        (val) => {
            if (!props.vinyl) {
                currentRotation.value = 0;
            }
        },
        { immediate: true }
    );

    const itemsToRender = computed(() => {
        return props.maxPreviewCount !== null
            ? props.items.slice(0, props.maxPreviewCount)
            : props.items;
    });

    const animationClass = computed(() => {
        return props.animationType !== 'none' ? `img-anim-${props.animationType}` : '';
    });

    function cornerClass(count, pos) {
        const cornersMap = {
            1: { 1: 'corner-all' },
            2: { 1: 'corner-left', 2: 'corner-right' },
            3: { 1: 'corner-top-left', 2: 'corner-top-right', 3: 'corner-bottom' },
            4: {
                1: 'corner-top-left',
                2: 'corner-top-right',
                3: 'corner-bottom-left',
                4: 'corner-bottom-right'
            },
            5: { 1: 'corner-top-left', 2: 'corner-top-right', 5: 'corner-bottom' },
            6: { 1: 'corner-top-left', 3: 'corner-top-right', 4: 'corner-bottom-left', 6: 'corner-bottom-right' },
            7: { 1: 'corner-top-left', 3: 'corner-top-right', 4: 'corner-bottom-left', 6: 'corner-bottom-right' },
            8: { 1: 'corner-top-left', 4: 'corner-top-right', 5: 'corner-bottom-left', 8: 'corner-bottom-right' }
        };

        return (cornersMap[count] && cornersMap[count][pos]) || '';
    }

    onBeforeUnmount(() => {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
    });

return (_ctx, _cache) => {
  return (itemsToRender.value.length)
    ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: normalizeClass(["collage", {
            vinyl: props.vinyl
        }]),
        style: normalizeStyle({
            '--gap': props.gap,
            '--border-radius': props.borderRadius,
            transform: `rotate(${currentRotation.value}deg)`
        })
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(itemsToRender.value, (item, index) => {
          return (openBlock(), createBlock(Img, {
            key: index,
            class: normalizeClass(["collage-item", [
                    `layout-${itemsToRender.value.length}-${index + 1}`,
                    cornerClass(itemsToRender.value.length, index + 1),
                    animationClass.value
                ]]),
            skeleton: true,
            preview: props.highQuality ? (item?.crop || props.default?.crop) : (item?.resized || props.default?.resized),
            original: item?.original || props.default?.original,
            alt: item?.alt || ''
          }, null, 8, ["class", "preview", "original", "alt"]))
        }), 128))
      ], 6))
    : createCommentVNode("", true)
}
}

};
const Collage = /*#__PURE__*/_export_sfc(_sfc_main$2, [['__scopeId',"data-v-42355d29"]]);

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

export { Collage as C, _sfc_main as _ };
//# sourceMappingURL=Tracks-DGOg6YMV.js.map
