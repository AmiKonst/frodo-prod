import { _ as _export_sfc, r as reactive, i as ref, k as computed, l as onMounted, g as onBeforeUnmount, c as createElementBlock, o as openBlock, v as createBaseVNode, p as renderSlot, n as normalizeStyle } from './index-Dvg0BFop.js';

const _hoisted_1 = { class: "box" };

    
const _sfc_main = {
  __name: 'ItemDetail',
  props: {
        previewHeight: { type: Number, default: 384 }
    },
  emits: ['mode'],
  setup(__props, { emit: __emit }) {

    const props = __props;

    const data = reactive({
        mode: 'preview'
    });


    const emit = __emit;

    const root = ref(null);
    const detail = ref(null);

    const scrollTop = ref(0);
    const scrollDirection = ref(0);


    const progress = computed(() =>
        Math.min(1, scrollTop.value / props.previewHeight)
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

    onMounted(() => {
        document.querySelector('.page').addEventListener('scroll', onScroll);
        root.value.scrollTop = 0;
    });

    onBeforeUnmount(() => {
        document.querySelector('.page').removeEventListener('scroll', onScroll);
    });

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", {
    class: "detail-item",
    ref_key: "root",
    ref: root,
    onScroll: onScroll
  }, [
    createBaseVNode("div", {
      class: "background",
      style: normalizeStyle({
                opacity: backgroundOpacity.value,
                height: props.previewHeight + 'px'
            })
    }, [
      renderSlot(_ctx.$slots, "background", {}, undefined, true)
    ], 4),
    createBaseVNode("div", _hoisted_1, [
      createBaseVNode("div", {
        class: "preview",
        style: normalizeStyle({
                    opacity: 1,
                    height: props.previewHeight + 'px'
                })
      }, [
        createBaseVNode("div", {
          class: "wrapper",
          style: normalizeStyle({ opacity: wrapperOpacity.value })
        }, [
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
  ], 544))
}
}

};
const ItemDetail = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-a3dbb877"]]);

export { ItemDetail as I };
//# sourceMappingURL=ItemDetail-iUwEO65j.js.map
