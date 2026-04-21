import { _ as _export_sfc, s as stores, i as storeToRefs, u as useI18n, r as reactive, b as createBlock, f as openBlock, k as withCtx, l as createBaseVNode, z as normalizeStyle, h as unref, $ as baseUrl, c as createElementBlock, d as createCommentVNode, F as Fragment, v as toDisplayString, e as createVNode, B as Button, M as BaseModal, g as api, a0 as delay, N as copyText, O as message } from './index-BzMg08Mj.js';

const _hoisted_1 = { class: "merge-accounts-box" };
const _hoisted_2 = ["innerHTML"];
const _hoisted_3 = { class: "description" };
const _hoisted_4 = ["innerHTML"];
const _hoisted_5 = { class: "description" };
const _hoisted_6 = { class: "instruction" };
const _hoisted_7 = { class: "code" };
const _hoisted_8 = ["innerHTML"];
const _hoisted_9 = { class: "description" };
const _hoisted_10 = { class: "warning" };
const _hoisted_11 = {
  key: 0,
  class: "enter-box"
};
const _hoisted_12 = {
  key: 1,
  class: "enter-box"
};
const _hoisted_13 = {
  key: 2,
  class: "enter-box"
};


const _sfc_main = {
  __name: 'ModalMergeAccounts',
  setup(__props) {

const others = stores.others();
stores.messengers();
const user = stores.user();
const { theme } = storeToRefs(others);

const modals = stores.modals();


const { t } = useI18n();


const data = reactive({
    step: 'main',
    loading: false,
    code: null,
    token: null,
    newProviders: []
});

const showSuccess = async () => {
    user.me();

    modals.open('success', {
        data: {
            title: t('pages.settings.accounts.get.done'),
            close: t('common.close')
        },
        callback: () => {
            close();
        }
    });
};

const checkCode = async () => {
    clearTimeout(data.getTimeout);

    data.getTimeout = setTimeout(async () => {
        const result = await api.user().checkMergeRequest({
            value: data.code,
            token: data.token
        });


        if (result) {
            showSuccess();
            return
        }

        checkCode();
    }, 1000);
};

const getCode = async () => {
    data.loading = true;

    modals.open('loader', {data: { light: true }});

    const result = await api.user().createMergeRequest();

    if (!result?.value) {
        data.loading = false;
        return;
    }


    await delay(400);


    data.newProviders = ['MAX', 'telegram'].filter(item => !user.providers.includes(item));

    data.code = result.value;
    data.token = result.token;
    data.step = 'get';

    data.loading = false;
    modals.close('loader');

    copyText(data.code);
    message.success(t('pages.settings.accounts.get.copied'));

    checkCode();
};


const verifyCode = async (code) => {
    const payload = await api.user().sendMergeRequest({
        code
    });

    if (!payload) {
        await delay(500);
        message.info(t('pages.settings.accounts.send.error'));
        return;
    }

    await delay(1000);
    user.me();

    modals.open('success', {
        data: {
            title: t('pages.settings.accounts.send.done'),
            close: t('common.close')
        },
        callback: () => {
            close();
        }
    });

    return true;
};

const inputCode = async () => {
    modals.open('code', {
        data: {
            title: t('pages.settings.accounts.send.title'),
            description: t('pages.settings.accounts.send.instruction'),
            verify: t('pages.settings.accounts.send.accept'),
            check: async (code) => {
                return await verifyCode(code);
            }
        }
    });
};

const sendCode = async () => {
    data.step = 'send';
};

const back = async () => {
    clearTimeout(data.getTimeout);
    data.step = 'main';
    data.loading = false;
    data.code = null;
};



const close = () => {
    clearTimeout(data.getTimeout);
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
                            name: data.newProviders.map(item => unref(t)(`pages.settings.accounts.${item.toLowerCase()}`)).join(', ') 
                        })), 1),
                createBaseVNode("label", _hoisted_7, toDisplayString(data.code), 1)
              ], 64))
            : createCommentVNode("", true),
          (data.step === 'send')
            ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
                createBaseVNode("label", {
                  class: "title",
                  innerHTML: unref(t)('pages.settings.accounts.send.title')
                }, null, 8, _hoisted_8),
                createBaseVNode("div", _hoisted_9, toDisplayString(unref(t)('pages.settings.accounts.send.description')), 1),
                createBaseVNode("div", _hoisted_10, toDisplayString(unref(t)('pages.settings.accounts.send.warning', {
                        })), 1)
              ], 64))
            : createCommentVNode("", true)
        ], 4),
        createBaseVNode("div", null, [
          (data.step === 'main')
            ? (openBlock(), createElementBlock("div", _hoisted_11, [
                createVNode(Button, {
                  name: unref(t)('pages.settings.accounts.get.title'),
                  loading: data.loading,
                  onClick: getCode
                }, null, 8, ["name", "loading"]),
                createVNode(Button, {
                  name: unref(t)('pages.settings.accounts.send.title'),
                  disabled: data.loading,
                  onClick: sendCode
                }, null, 8, ["name", "disabled"]),
                createVNode(Button, {
                  name: unref(t)('common.close'),
                  disabled: data.loading,
                  class: "secondary",
                  onClick: close
                }, null, 8, ["name", "disabled"])
              ]))
            : createCommentVNode("", true),
          (data.step === 'get')
            ? (openBlock(), createElementBlock("div", _hoisted_12, [
                createVNode(Button, {
                  name: unref(t)('common.back'),
                  class: "secondary",
                  onClick: back
                }, null, 8, ["name"])
              ]))
            : createCommentVNode("", true),
          (data.step === 'send')
            ? (openBlock(), createElementBlock("div", _hoisted_13, [
                createVNode(Button, {
                  name: unref(t)('pages.settings.accounts.send.button'),
                  onClick: inputCode
                }, null, 8, ["name"]),
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
const ModalMergeAccounts = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-8cb28cd9"]]);

export { ModalMergeAccounts as default };
//# sourceMappingURL=ModalMergeAccounts-DZMX7_bs.js.map
