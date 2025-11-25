import { _ as _export_sfc, s as stores, r as reactive, i as ref, k as computed, l as onMounted, g as onBeforeUnmount, c as createElementBlock, o as openBlock, v as createBaseVNode, p as renderSlot, n as normalizeStyle } from './index-zMl0mo8M.js';

const _hoisted_1 = { class: "detail-item" };
const _hoisted_2 = { class: "box" };

    
const _sfc_main = {
  __name: 'ItemDetail',
  props: {
        previewHeight: { type: Number, default: 384 },
        more: { type: Boolean, default: true }
    },
  emits: ['mode', 'more'],
  setup(__props, { emit: __emit }) {

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
      class: "background",
      style: normalizeStyle({
                opacity: backgroundOpacity.value,
                height: props.previewHeight + 'px'
            })
    }, [
      renderSlot(_ctx.$slots, "background", {}, undefined, true)
    ], 4),
    createBaseVNode("div", _hoisted_2, [
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
  ]))
}
}

};
const ItemDetail = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-852aa666"]]);

export { ItemDetail as I };
//# sourceMappingURL=ItemDetail-Ne4lLSR-.js.map
