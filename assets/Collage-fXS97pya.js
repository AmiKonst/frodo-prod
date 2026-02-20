import { _ as _export_sfc, x as ref, w as watch, j as computed, a as onBeforeUnmount, c as createElementBlock, d as createCommentVNode, f as openBlock, F as Fragment, m as renderList, b as createBlock, n as normalizeClass, p as Img, z as normalizeStyle } from './index-aOU_KU_i.js';

const _sfc_main = {
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
const Collage = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-42355d29"]]);

export { Collage as C };
//# sourceMappingURL=Collage-fXS97pya.js.map
