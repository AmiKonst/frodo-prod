import { _ as _export_sfc, u as useI18n, s as stores, r as reactive, o as onMounted, g as api, t as resolveComponent, b as createBlock, f as openBlock, k as withCtx, l as createBaseVNode, e as createVNode, v as toDisplayString, h as unref, d as createCommentVNode, p as Img, K as BaseModal } from './index-BWKG_aXv.js';

const _hoisted_1 = { class: "title" };
const _hoisted_2 = { class: "kebab-list" };


const _sfc_main = {
  __name: 'ModalReleaseKebab',
  setup(__props) {

const { t } = useI18n();

stores.tg();
const modals = stores.modals();
const share = stores.share();

const data = reactive({
    loading: true
});


const shareIt = () => {
    close();

    share.release(data.item);
};

const about = () => {
    close();

    modals.open('release', { quietClose: true, data: {
        id: data.item.id,
        item: data.item
    } });
};

const gallery = () => {
    if (!data.item?.id || !data.item?.cover?.original) {
        return;
    }

    modals.open('gallery', {
        quietClose: true,
        data: { imgs: [{
            title: data.item.title,
            ...data.item?.cover
        }] } });
};

const close = () => {
    modals.close('release-kebab');
};


onMounted(async () => {
    const payload = modals.getData('release-kebab');

    if (!payload?.id) {
        close();
        return;
    }

    if (payload.item) {
        data.item = payload.item;
    } else {
        data.item = await api.releases().get(payload.id);
    }

    data.loading = false;
});


return (_ctx, _cache) => {
  const _component_Icon = resolveComponent("Icon");

  return (openBlock(), createBlock(BaseModal, {
    name: "release-kebab",
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
                alt: data.item?.title,
                aspectRatio: "1 / 1"
              }, null, 8, ["preview", "original", "alt"]))
            : createCommentVNode("", true)
        ]),
        createBaseVNode("span", null, toDisplayString(data.item?.title), 1)
      ])
    ]),
    content: withCtx(() => [
      createBaseVNode("ul", _hoisted_2, [
        createBaseVNode("li", {
          class: "clickable",
          onClick: shareIt
        }, [
          createVNode(_component_Icon, { icon: "share" }),
          createBaseVNode("span", null, toDisplayString(unref(t)('modals.release-kebab.share')), 1)
        ]),
        createBaseVNode("li", {
          class: "clickable",
          onClick: about
        }, [
          createVNode(_component_Icon, { icon: "help" }),
          createBaseVNode("span", null, toDisplayString(unref(t)('modals.release-kebab.about')), 1)
        ])
      ])
    ]),
    _: 1
  }, 8, ["isLoading"]))
}
}

};
const ModalReleaseKebab = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-193539ed"]]);

export { ModalReleaseKebab as default };
//# sourceMappingURL=ModalReleaseKebab-DdnQi1tz.js.map
