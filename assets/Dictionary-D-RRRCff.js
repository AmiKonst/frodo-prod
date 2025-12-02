import { _ as _export_sfc, u as useI18n, a as api, s as stores, r as reactive, l as computed, f as onMounted, g as onBeforeUnmount, b as createBlock, o as openBlock, v as withCtx, c as createElementBlock, d as createCommentVNode, z as createBaseVNode, t as toDisplayString, e as createVNode, h as unref, B as Button } from './index-CKTGRZtq.js';
import { I as Img } from './Img-CgH7Ck6-.js';
import { I as ItemDetail } from './TrackPreview.vue_vue_type_style_index_0_scoped_0fe5f002_lang-Bn00wOa1.js';
/* empty css                                                                          */
/* empty css                                                                */
/* empty css                                                                    */
/* empty css                                                               */

const _hoisted_1 = {
  key: 0,
  class: "title"
};
const _hoisted_2 = { class: "buttons" };

    
const _sfc_main = {
  __name: 'Dictionary',
  props: {
        code: { type: String },
        type: { type: Object }
    },
  setup(__props) {

    const { t } = useI18n();

    const dict = api.dict();
    const locale = stores.locale();
    const tg = stores.tg();

    const props = __props;

    const data = reactive({
        item: null
    });

    const title = computed(() => {
        return data.item?.title ? data.item?.title[locale.locale] || '' : '';
    });


    onMounted(async () => {
        tg.showBackButton();

        data.item = await dict[props.type.code].get(props.code, props.type.id);
    });

    onBeforeUnmount(() => {
        tg.hideBackButton();
    });

return (_ctx, _cache) => {
  return (openBlock(), createBlock(ItemDetail, null, {
    background: withCtx(() => [
      createVNode(Img, {
        preview: data.item?.cover?.original,
        original: data.item?.cover?.original,
        alt: title.value,
        skeleton: true
      }, null, 8, ["preview", "original", "alt"])
    ]),
    preview: withCtx(() => [
      (title.value)
        ? (openBlock(), createElementBlock("div", _hoisted_1, toDisplayString(title.value), 1))
        : createCommentVNode("", true),
      createBaseVNode("div", _hoisted_2, [
        createVNode(Button, {
          name: unref(t)('player.shuffle'),
          class: "tertiary active size-m",
          icon: "random"
        }, null, 8, ["name"]),
        createVNode(Button, {
          name: unref(t)('player.play'),
          class: "size-m",
          icon: "play"
        }, null, 8, ["name"])
      ])
    ]),
    detail: withCtx(() => _cache[0] || (_cache[0] = [])),
    _: 1
  }))
}
}

};
const Dictionary = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-85eb6b50"]]);

export { Dictionary as D };
//# sourceMappingURL=Dictionary-D-RRRCff.js.map
