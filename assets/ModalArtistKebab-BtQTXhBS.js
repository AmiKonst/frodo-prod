import { _ as _export_sfc, u as useI18n, s as stores, r as reactive, f as onMounted, a as api, A as resolveComponent, b as createBlock, o as openBlock, v as withCtx, z as createBaseVNode, e as createVNode, t as toDisplayString, h as unref, d as createCommentVNode, K as BaseModal } from './index-DUsfbmnu.js';
import { I as Img } from './Img-CrkG_xlQ.js';

const _hoisted_1 = { class: "title" };
const _hoisted_2 = { class: "img" };
const _hoisted_3 = { class: "kebab-list" };


const _sfc_main = {
  __name: 'ModalArtistKebab',
  setup(__props) {

const { t } = useI18n();

stores.tg();
const modals = stores.modals();
const share = stores.share();

const data = reactive({
    loading: true
});


const shareIt = () => {
    share.artist(data.item);

    setTimeout(() => {
        close();
    }, 400);
};

const about = () => {
    setTimeout(() => {
        close();
    }, 400);
    modals.open('artist', { quietClose: true, data: { code: data.item.code } });
};

const close = () => {
    modals.close('artist-kebab');
};


onMounted(async () => {
    const payload = modals.getData('artist-kebab');

    if (!payload?.code) {
        close();
        return;
    }

    data.item = await api.artists().getByCode(payload.code);
    data.loading = false;
});


return (_ctx, _cache) => {
  const _component_Icon = resolveComponent("Icon");

  return (openBlock(), createBlock(BaseModal, {
    name: "artist-kebab",
    mobileMode: true,
    closeOutside: true,
    isLoading: data.loading
  }, {
    title: withCtx(() => [
      createBaseVNode("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          (data.item?.profileImage?.resized)
            ? (openBlock(), createBlock(Img, {
                key: 0,
                preview: data.item?.profileImage?.resized,
                original: data.item?.profileImage?.original,
                alt: data.item?.name
              }, null, 8, ["preview", "original", "alt"]))
            : createCommentVNode("", true)
        ]),
        createBaseVNode("span", null, toDisplayString(data.item?.name), 1)
      ])
    ]),
    content: withCtx(() => [
      createBaseVNode("ul", _hoisted_3, [
        createBaseVNode("li", {
          class: "clickable",
          onClick: shareIt
        }, [
          createVNode(_component_Icon, { icon: "share" }),
          createBaseVNode("span", null, toDisplayString(unref(t)('modals.artist-kebab.share')), 1)
        ]),
        createBaseVNode("li", {
          class: "clickable",
          onClick: about
        }, [
          createVNode(_component_Icon, { icon: "help" }),
          createBaseVNode("span", null, toDisplayString(unref(t)('modals.artist-kebab.about')), 1)
        ])
      ])
    ]),
    _: 1
  }, 8, ["isLoading"]))
}
}

};
const ModalArtistKebab = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-aa81d838"]]);

export { ModalArtistKebab as default };
//# sourceMappingURL=ModalArtistKebab-BtQTXhBS.js.map
