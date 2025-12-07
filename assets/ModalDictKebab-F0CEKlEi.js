import { _ as _export_sfc, u as useI18n, s as stores, r as reactive, f as onMounted, a as api, v as resolveComponent, b as createBlock, o as openBlock, k as withCtx, p as createBaseVNode, e as createVNode, t as toDisplayString, h as unref, d as createCommentVNode, G as BaseModal } from './index-C8c_MoaP.js';
import { I as Img } from './Img-Bw10qcpF.js';

const _hoisted_1 = { class: "title" };
const _hoisted_2 = { class: "img" };
const _hoisted_3 = { class: "kebab-list" };


const _sfc_main = {
  __name: 'ModalDictKebab',
  setup(__props) {

const { t } = useI18n();

stores.tg();
const modals = stores.modals();
const share = stores.share();
const locale = stores.locale();

const data = reactive({
    loading: true
});


const shareIt = () => {
    console.log(data.item);
    share.dict(data.item, data.type);

    setTimeout(() => {
        close();
    }, 400);
};

const close = () => {
    modals.close('dict-kebab');
};


onMounted(async () => {
    const payload = modals.getData('dict-kebab');

    if (!payload?.code) {
        close();
        return;
    }

    data.type = payload.type;
    data.item = await api.dict()[payload.type.code].get(payload.code, payload.type.id);
    data.loading = false;
});


return (_ctx, _cache) => {
  const _component_Icon = resolveComponent("Icon");

  return (openBlock(), createBlock(BaseModal, {
    name: "dict-kebab",
    mobileMode: true,
    closeOutside: true,
    isLoading: data.loading
  }, {
    title: withCtx(() => [
      createBaseVNode("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          (data.item?.cover?.resized)
            ? (openBlock(), createBlock(Img, {
                key: 0,
                preview: data.item?.cover?.resized,
                original: data.item?.cover?.original,
                alt: data.item?.name
              }, null, 8, ["preview", "original", "alt"]))
            : createCommentVNode("", true)
        ]),
        createBaseVNode("span", null, toDisplayString(unref(locale).title(data.item?.title)), 1)
      ])
    ]),
    content: withCtx(() => [
      createBaseVNode("ul", _hoisted_3, [
        createBaseVNode("li", {
          class: "clickable",
          onClick: shareIt
        }, [
          createVNode(_component_Icon, { icon: "share" }),
          createBaseVNode("span", null, toDisplayString(unref(t)('modals.dict-kebab.share')), 1)
        ])
      ])
    ]),
    _: 1
  }, 8, ["isLoading"]))
}
}

};
const ModalDictKebab = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-ff9cea0f"]]);

export { ModalDictKebab as default };
//# sourceMappingURL=ModalDictKebab-F0CEKlEi.js.map
