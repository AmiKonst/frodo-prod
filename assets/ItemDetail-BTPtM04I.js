import { _ as _export_sfc, r as reactive, m as ref, i as computed, j as onMounted, c as createElementBlock, o as openBlock, l as createBaseVNode, n as renderSlot, p as normalizeStyle } from './index-CDDxjamk.js';

const _hoisted_1 = { class: "box" };

    
const _sfc_main = {
  __name: 'ItemDetail',
  props: {
        height: { type: Number, default: 384 }
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
        Math.min(1, scrollTop.value / props.height)
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
        root.value.scrollTop = 0;
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
                height: props.height + 'px'
            })
    }, [
      renderSlot(_ctx.$slots, "background", {}, undefined, true)
    ], 4),
    createBaseVNode("div", _hoisted_1, [
      createBaseVNode("div", {
        class: "preview",
        style: normalizeStyle({
                    opacity: 1,
                    height: props.height + 'px'
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
const ItemDetail = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-45c55fed"]]);

export { ItemDetail as I };
//# sourceMappingURL=ItemDetail-BTPtM04I.js.map
