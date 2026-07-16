import { _ as _export_sfc, u as useI18n, s as stores, r as reactive, o as onMounted, q as resolveComponent, b as createBlock, f as openBlock, k as withCtx, l as createBaseVNode, c as createElementBlock, F as Fragment, m as renderList, d as createCommentVNode, t as toDisplayString, L as BaseModal } from './index-CfjYYhy-.js';

const _hoisted_1 = { class: "title" };
const _hoisted_2 = { class: "kebab-list" };
const _hoisted_3 = ["onClick"];


const _sfc_main = {
  __name: 'ModalOptions',
  setup(__props) {

const { t } = useI18n();

const modals = stores.modals();

const data = reactive({
    loading: true,
    title: '',
    options: []
});


const choose = (payload) => {
    close(payload?.code);
};

const close = (code) => {
    modals.close('options', code);
};


onMounted(async () => {
    const payload = modals.getData('options');

    if (!payload?.options?.length) {
        close();
        return;
    }

    data.options = payload.options;
    data.title = payload.title;

    data.loading = false;
});


return (_ctx, _cache) => {
  const _component_Icon = resolveComponent("Icon");

  return (openBlock(), createBlock(BaseModal, {
    name: "options",
    mobileMode: true,
    closeOutside: true,
    isLoading: data.loading
  }, {
    title: withCtx(() => [
      createBaseVNode("div", _hoisted_1, [
        createBaseVNode("span", null, toDisplayString(data.title), 1)
      ])
    ]),
    content: withCtx(() => [
      createBaseVNode("ul", _hoisted_2, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(data.options, (item, id) => {
          return (openBlock(), createElementBlock("li", {
            key: id,
            class: "clickable",
            onClick: $event => (choose(item))
          }, [
            (item.icon)
              ? (openBlock(), createBlock(_component_Icon, {
                  key: 0,
                  icon: item.icon
                }, null, 8, ["icon"]))
              : createCommentVNode("", true),
            createBaseVNode("span", null, toDisplayString(item.name), 1)
          ], 8, _hoisted_3))
        }), 128))
      ])
    ]),
    _: 1
  }, 8, ["isLoading"]))
}
}

};
const ModalOptions = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-ab06f685"]]);

export { ModalOptions as default };
//# sourceMappingURL=ModalOptions-xvwaxR9L.js.map
