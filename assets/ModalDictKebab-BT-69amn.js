import { _ as _export_sfc, u as useI18n, s as stores, r as reactive, o as onMounted, g as api, x as resolveComponent, b as createBlock, f as openBlock, w as withCtx, n as createBaseVNode, e as createVNode, y as toDisplayString, i as unref, d as createCommentVNode, t as Img, L as BaseModal } from './index-CtNKyRc2.js';

const _hoisted_1 = { class: "title" };
const _hoisted_2 = { class: "kebab-list" };


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
    close();

    share.dict(data.item, data.type);
};

const gallery = () => {
    if (!data.item?.id || !data.item?.cover?.original) {
        return;
    }

    modals.open('gallery', { data: { imgs: [{
        title: locale.title(data.item?.title),
        ...data.item?.cover
    }] } });
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

    if (payload.item) {
        data.item = payload.item;
    } else {
        data.item = await api.dict()[payload.type.code].get(payload.code, payload.type.id);
    }

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
        createBaseVNode("div", {
          class: "img",
          onClick: gallery
        }, [
          (data.item?.cover?.resized)
            ? (openBlock(), createBlock(Img, {
                key: 0,
                preview: data.item?.cover?.resized,
                original: data.item?.cover?.original,
                alt: data.item?.name,
                aspectRatio: "1 / 1"
              }, null, 8, ["preview", "original", "alt"]))
            : createCommentVNode("", true)
        ]),
        createBaseVNode("span", null, toDisplayString(unref(locale).title(data.item?.title)), 1)
      ])
    ]),
    content: withCtx(() => [
      createBaseVNode("ul", _hoisted_2, [
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
const ModalDictKebab = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-7347057a"]]);

export { ModalDictKebab as default };
//# sourceMappingURL=ModalDictKebab-BT-69amn.js.map
