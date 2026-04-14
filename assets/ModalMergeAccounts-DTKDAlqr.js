import { _ as _export_sfc, s as stores, i as storeToRefs, u as useI18n, r as reactive, b as createBlock, f as openBlock, k as withCtx, l as createBaseVNode, z as normalizeStyle, h as unref, X as baseUrl, c as createElementBlock, d as createCommentVNode, F as Fragment, v as toDisplayString, e as createVNode, B as Button, K as BaseModal } from './index-DXG18fWA.js';

const _hoisted_1 = { class: "merge-accounts-box" };
const _hoisted_2 = ["innerHTML"];
const _hoisted_3 = { class: "description" };
const _hoisted_4 = ["innerHTML"];
const _hoisted_5 = { class: "description" };
const _hoisted_6 = { class: "instruction" };
const _hoisted_7 = { class: "code" };
const _hoisted_8 = {
  key: 0,
  class: "enter-box"
};
const _hoisted_9 = {
  key: 1,
  class: "enter-box"
};
const _hoisted_10 = {
  key: 2,
  class: "enter-box"
};


const _sfc_main = {
  __name: 'ModalMergeAccounts',
  setup(__props) {

const others = stores.others();
stores.messengers();
const { theme } = storeToRefs(others);

const modals = stores.modals();


const { t } = useI18n();


const data = reactive({
    step: 'main',
    loading: false,
    code: 132453,
    // waity: 0,
    // waityTotal: 5
});

const getCode = async () => {
    data.step = 'get';
    data.loading = true;
    // data.waitInterval = setInterval(() => {
    //     data.waity = (data.waity + 1) % data.waityTotal
    // }, 600);
};

const back = async () => {
    data.step = 'main';
    data.loading = false;
    data.code = null;
    // clearInterval(data.waitInterval);
};



const close = () => {
    // clearInterval(data.waitInterval);
    modals.close('merge-accounts');
};

return (_ctx, _cache) => {
  return (openBlock(), createBlock(BaseModal, {
    name: "loader",
    full: true
  }, {
    content: withCtx(() => [
      createBaseVNode("div", _hoisted_1, [
        createBaseVNode("div", {
          style: normalizeStyle({
                        'background-image': `url(${unref(baseUrl)}/themes/${unref(theme)}/accounts/main.jpg)`,
                        'background-color': 'var(--white-500)'
                    })
        }, [
          (data.step === 'main')
            ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                createBaseVNode("label", {
                  class: "title",
                  innerHTML: unref(t)('pages.settings.accounts.subtitle')
                }, null, 8, _hoisted_2),
                createBaseVNode("div", _hoisted_3, toDisplayString(unref(t)('pages.settings.accounts.description')), 1)
              ], 64))
            : createCommentVNode("", true),
          (data.step === 'get')
            ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                createBaseVNode("label", {
                  class: "title",
                  innerHTML: unref(t)('pages.settings.accounts.get.title')
                }, null, 8, _hoisted_4),
                createBaseVNode("div", _hoisted_5, toDisplayString(unref(t)('pages.settings.accounts.get.description')), 1),
                createBaseVNode("div", _hoisted_6, toDisplayString(unref(t)('pages.settings.accounts.get.instruction', {
                            name: unref(t)('pages.settings.accounts.max')
                        })), 1),
                createBaseVNode("label", _hoisted_7, toDisplayString(data.code), 1)
              ], 64))
            : createCommentVNode("", true)
        ], 4),
        createBaseVNode("div", null, [
          (data.step === 'main')
            ? (openBlock(), createElementBlock("div", _hoisted_8, [
                createVNode(Button, {
                  name: unref(t)('pages.settings.accounts.get.title'),
                  loading: data.loading,
                  onClick: getCode
                }, null, 8, ["name", "loading"]),
                createVNode(Button, {
                  name: unref(t)('pages.settings.accounts.send.title'),
                  onClick: _cache[0] || (_cache[0] = () => {})
                }, null, 8, ["name"]),
                createVNode(Button, {
                  name: unref(t)('common.close'),
                  class: "secondary",
                  onClick: close
                }, null, 8, ["name"])
              ]))
            : createCommentVNode("", true),
          (data.step === 'get')
            ? (openBlock(), createElementBlock("div", _hoisted_9, [
                createVNode(Button, {
                  name: unref(t)('common.back'),
                  class: "secondary",
                  onClick: back
                }, null, 8, ["name"])
              ]))
            : createCommentVNode("", true),
          (data.step === 'send')
            ? (openBlock(), createElementBlock("div", _hoisted_10, [
                createVNode(Button, {
                  name: unref(t)('common.back'),
                  class: "secondary",
                  onClick: back
                }, null, 8, ["name"])
              ]))
            : createCommentVNode("", true)
        ])
      ])
    ]),
    _: 1
  }))
}
}

};
const ModalMergeAccounts = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-345da150"]]);

export { ModalMergeAccounts as default };
//# sourceMappingURL=ModalMergeAccounts-DTKDAlqr.js.map
