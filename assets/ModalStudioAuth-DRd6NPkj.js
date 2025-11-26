import { _ as _export_sfc, r as reactive, i as ref, w as watch, l as onMounted, c as createElementBlock, o as openBlock, F as Fragment, m as renderList, s as stores, u as useI18n, b as createBlock, t as withCtx, v as createBaseVNode, e as createVNode, h as unref, B as Button, L as createTextVNode, x as toDisplayString, J as BaseModal, K as message } from './index-C22B07e5.js';

const _hoisted_1$1 = { class: "code-inputs" };
const _hoisted_2 = ["onInput", "onFocus", "onKeydown"];
    
const _sfc_main$1 = {
  __name: 'Code',
  props: {
        count: { type: Number, default: 6 }
    },
  emits: ['change'],
  setup(__props, { emit: __emit }) {

    const props = __props;

    const data = reactive({
        values: ref(Array(props.count).fill('')),
        inputs: {}
    });

    const emit = __emit;

    const onInput = (e, id) => {
        if (/^[0-9]$/.test(e.target.value)) {
            data.values[id] = +e.target.value;
            nextInput(id);
        } else {
            data.values[id] = '';
        }
    };

    const focusInput = (id) => {
        if (data.inputs[id]) {
            data.inputs[id].focus();
        }
    };

    const nextInput = (id) => {
        if (id + 1 < props.count) {
            focusInput(id + 1);
        }
    };

    const onKeydown = (id, event) => {
        if (event.key === 'Backspace' && !data.values[id] && id > 0) {
            data.values[id - 1] = '';
            focusInput(id - 1);
        }
    };

    watch(data.values, (newValues) => {
        if (data.values.every(item => /^[0-9]$/.test(item))) {
            emit('change', data.values.join(''));
        } else {
            emit('change', null);
        }
    });

    onMounted(() => {
        focusInput(0);
    });

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$1, [
    (openBlock(true), createElementBlock(Fragment, null, renderList(data.values, (digit, id) => {
      return (openBlock(), createElementBlock("input", {
        key: id,
        ref_for: true,
        ref: el => data.inputs[id] = el,
        placeholder: " ",
        type: "text",
        maxlength: "1",
        onInput: $event => (onInput($event, id)),
        onFocus: $event => (focusInput(id)),
        onKeydown: $event => (onKeydown(id, $event))
      }, null, 40, _hoisted_2))
    }), 128))
  ]))
}
}

};
const Code = /*#__PURE__*/_export_sfc(_sfc_main$1, [['__scopeId',"data-v-c41197db"]]);

const _hoisted_1 = ["innerHTML"];

const _sfc_main = {
  __name: 'ModalStudioAuth',
  props: {
    name: {
        type: String,
        default: 'sudio-auth'
    }
},
  setup(__props) {

const modals = stores.modals();
const user = stores.user();

const { t } = useI18n();

const data = reactive({
    once: false,
    loading: false,
    code: ''
});

const props = __props;

const setCode = (code) => {
    data.code = code;

    if (data.code && !data.once) {
        data.once = true;
        verify();
    }
};

const verify = async () => {
    data.loading = true;

    const payload = await user.externalLogin(data.code);

    if (!payload) {
        setTimeout(() => {
            message.info(t('modals.studio-auth.fail.title'));
            data.loading = false;
        }, 500);
        return;
    }

    setTimeout(() => {
        modals.open('success', {
            data: {
                title: t('modals.studio-auth.done.title'),
                description: t('modals.studio-auth.done.description'),
                close: t('modals.studio-auth.done.close')
            },
            quietClose: true
        });

        modals.close(props.name);
    }, 1000);
};

onMounted(async () => {
    data.loading = false;
});

return (_ctx, _cache) => {
  return (openBlock(), createBlock(BaseModal, {
    isLoading: data.loading,
    name: props.name,
    mobileMode: true,
    closeOutside: true,
    class: "modal-studio-auth"
  }, {
    title: withCtx(() => [
      createTextVNode(toDisplayString(unref(t)('modals.studio-auth.title')), 1)
    ]),
    content: withCtx(() => [
      createBaseVNode("span", {
        class: "description",
        innerHTML: unref(t)('modals.studio-auth.description')
      }, null, 8, _hoisted_1),
      createVNode(Code, { onChange: setCode }),
      createVNode(Button, {
        onClick: verify,
        disabled: !data.code,
        class: "size-l",
        name: unref(t)('modals.studio-auth.verify')
      }, null, 8, ["disabled", "name"])
    ]),
    _: 1
  }, 8, ["isLoading", "name"]))
}
}

};
const ModalStudioAuth = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-133f6701"]]);

export { ModalStudioAuth as default };
//# sourceMappingURL=ModalStudioAuth-DRd6NPkj.js.map
