import { _ as _export_sfc, s as stores, r as reactive, p as ref, j as computed, o as onMounted, a as onBeforeUnmount, c as createElementBlock, f as openBlock, q as createBaseVNode, v as renderSlot, x as normalizeStyle, n as normalizeClass } from './index-DhNDL289.js';

const _hoisted_1 = { class: "detail-item" };
const _hoisted_2 = { class: "box" };
const _hoisted_3 = { class: "toolbar" };

    
const _sfc_main = {
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
  return (openBlock(), createElementBlock("div", _hoisted_1, [
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
    createBaseVNode("div", _hoisted_2, [
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
          createBaseVNode("div", _hoisted_3, [
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
const ItemDetail = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-25a80ce8"]]);

export { ItemDetail as I };
//# sourceMappingURL=ItemDetail-CU1BwQ29.js.map
