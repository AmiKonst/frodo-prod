import { _ as _export_sfc, u as useI18n, s as stores, r as reactive, o as onMounted, g as api, z as resolveComponent, b as createBlock, f as openBlock, k as withCtx, q as createBaseVNode, e as createVNode, t as toDisplayString, h as unref, d as createCommentVNode, H as BaseModal } from './index-DjIZj4BJ.js';
import { I as Img } from './Img-BEGjzL5n.js';

const _hoisted_1 = { class: "title" };
const _hoisted_2 = { class: "kebab-list" };


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

    modals.open('artist', { quietClose: true, data: {
        code: data.item.code,
        item: data.item
    } });
};

const gallery = () => {
    if (!data.item?.id || !data.item?.profileImage?.original) {
        return;
    }

    modals.open('gallery', { data: { imgs: [{
        title: data.item.name,
        ...data.item?.profileImage
    }] } });
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
        createBaseVNode("div", {
          class: "img",
          onClick: gallery
        }, [
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
      createBaseVNode("ul", _hoisted_2, [
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
const ModalArtistKebab = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-47cc9bc2"]]);

export { ModalArtistKebab as default };
//# sourceMappingURL=ModalArtistKebab-BlX-72-h.js.map
