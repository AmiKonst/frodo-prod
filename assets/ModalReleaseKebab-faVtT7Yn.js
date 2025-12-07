import { _ as _export_sfc, u as useI18n, s as stores, r as reactive, o as onMounted, g as api, y as resolveComponent, b as createBlock, f as openBlock, k as withCtx, q as createBaseVNode, e as createVNode, t as toDisplayString, h as unref, d as createCommentVNode, H as BaseModal } from './index-BI-3nrMk.js';
import { I as Img } from './Img-CWVg-dCQ.js';

const _hoisted_1 = { class: "title" };
const _hoisted_2 = { class: "img" };
const _hoisted_3 = { class: "kebab-list" };


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
    share.release(data.item);

    setTimeout(() => {
        close();
    }, 400);
};

const about = () => {
    setTimeout(() => {
        close();
    }, 400);
    modals.open('release', { quietClose: true, data: { id: data.item.id } });
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

    data.item = await api.releases().get(payload.id);
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
        createBaseVNode("div", _hoisted_2, [
          (data.item?.cover?.resized)
            ? (openBlock(), createBlock(Img, {
                key: 0,
                preview: data.item?.cover?.resized,
                original: data.item?.cover?.original,
                alt: data.item?.title
              }, null, 8, ["preview", "original", "alt"]))
            : createCommentVNode("", true)
        ]),
        createBaseVNode("span", null, toDisplayString(data.item?.title), 1)
      ])
    ]),
    content: withCtx(() => [
      createBaseVNode("ul", _hoisted_3, [
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
const ModalReleaseKebab = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-b2b82291"]]);

export { ModalReleaseKebab as default };
//# sourceMappingURL=ModalReleaseKebab-faVtT7Yn.js.map
