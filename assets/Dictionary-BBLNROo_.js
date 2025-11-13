import { _ as _export_sfc, u as useI18n, a as api, s as stores, r as reactive, i as computed, j as onMounted, g as onBeforeUnmount, c as createElementBlock, o as openBlock, k as createBaseVNode, e as createVNode, d as createCommentVNode, t as toDisplayString, h as unref, B as Button } from './index-DfScVddu.js';
import { I as Img } from './Img-CvZubzjf.js';
import { E as EmptyLabel } from './EmptyLabel-B_EDZpCt.js';

const _hoisted_1 = { class: "dictionary" };
const _hoisted_2 = { class: "welcome" };
const _hoisted_3 = { class: "wrapper" };
const _hoisted_4 = {
  key: 0,
  class: "title"
};
const _hoisted_5 = { class: "buttons" };

    
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


    document.body.classList.add('with-tg-header');
    onMounted(async () => {
        tg.showBackButton();

        data.item = await dict[props.type.code].get(props.code, props.type.id);
        console.log(data.item);
    });

    onBeforeUnmount(() => {
        document.body.classList.remove('with-tg-header');
        tg.hideBackButton();
    });

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1, [
    createBaseVNode("div", _hoisted_2, [
      createVNode(Img, {
        preview: data.item?.cover?.original,
        original: data.item?.cover?.original,
        alt: title.value,
        skeleton: true
      }, null, 8, ["preview", "original", "alt"]),
      createBaseVNode("div", _hoisted_3, [
        (title.value)
          ? (openBlock(), createElementBlock("div", _hoisted_4, toDisplayString(title.value), 1))
          : createCommentVNode("", true),
        createBaseVNode("div", _hoisted_5, [
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
      ])
    ]),
    createVNode(EmptyLabel, {
      class: "empty",
      title: unref(t)(`pages.dictionary.empty.title`),
      description: unref(t)(`pages.dictionary.empty.description`)
    }, null, 8, ["title", "description"])
  ]))
}
}

};
const Dictionary = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-e396b6b4"]]);

export { Dictionary as D };
//# sourceMappingURL=Dictionary-BBLNROo_.js.map
