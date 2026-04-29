import { _ as _export_sfc, r as reactive, x as ref, w as watch, o as onMounted, c as createElementBlock, f as openBlock, F as Fragment, m as renderList, s as stores, u as useI18n, b as createBlock, k as withCtx, l as createBaseVNode, e as createVNode, B as Button, T as createTextVNode, v as toDisplayString, M as BaseModal } from './index-Bt4oerUp.js';

const _hoisted_1$1 = ["value", "onInput", "onFocus", "onKeydown"];
    
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

    const onPaste = (e) => {
        const pasteData = e.clipboardData.getData('text').trim();
        
        if (!/^\d+$/.test(pasteData)) {
            return;
        }

        const digits = pasteData.split('').slice(0, props.count);

        digits.forEach((char, index) => {
            data.values[index] = char;
        });

        const lastIndex = Math.min(digits.length, props.count - 1);
        focusInput(lastIndex);
        
        e.preventDefault();
    };

    // const onInput = (e, id) => {
    //     if (/^[0-9]$/.test(e.target.value)) {
    //         data.values[id] = +e.target.value;
    //         nextInput(id);
    //     } else {
    //         data.values[id] = '';
    //     }
    // };

    const onInput = (e, id) => {
        const inputVal = e.target.value;
        
        // 1. Если это вставка или автозаполнение (длина > 1)
        if (inputVal.length > 1) {
            const digits = inputVal
                .replace(/\D/g, '')          // Оставляем только цифры
                .split('')
                .slice(0, props.count);      // Обрезаем до нужной длины
                
            digits.forEach((char, index) => {
                if (index < props.count) {
                    data.values[index] = char;
                }
            });

            // Фокусим последнее заполненное поле
            focusInput(Math.min(digits.length - 1, props.count - 1));
            return;
        }

        // 2. Обычный ввод одного символа
        if (/^[0-9]$/.test(inputVal)) {
            data.values[id] = inputVal;
            nextInput(id);
        } else {
            // Очищаем, если ввели не цифру (или нажали Del)
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
  return (openBlock(), createElementBlock("div", {
    class: "code-inputs",
    onPaste: onPaste
  }, [
    (openBlock(true), createElementBlock(Fragment, null, renderList(data.values, (digit, id) => {
      return (openBlock(), createElementBlock("input", {
        key: id,
        ref_for: true,
        ref: el => data.inputs[id] = el,
        value: data.values[id],
        placeholder: " ",
        type: "text",
        inputmode: "numeric",
        autocomplete: "one-time-code",
        onInput: $event => (onInput($event, id)),
        onFocus: $event => (focusInput(id)),
        onKeydown: $event => (onKeydown(id, $event))
      }, null, 40, _hoisted_1$1))
    }), 128))
  ], 32))
}
}

};
const Code = /*#__PURE__*/_export_sfc(_sfc_main$1, [['__scopeId',"data-v-89c3c5d4"]]);

const _hoisted_1 = ["innerHTML"];

const _sfc_main = {
  __name: 'ModalCode',
  props: {
    name: {
        type: String,
        default: 'code'
    }
},
  setup(__props) {

const modals = stores.modals();
stores.user();

const { t } = useI18n();

const data = reactive({
    once: false,
    loading: false,
    code: '',

    title: '',
    description: '',
    verify: '',
    check: null
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
    if (!data.check) {
        return;
    }

    data.loading = true;

    const payload = await data.check(data.code);

    if (!payload) {
        data.loading = false;
        return;
    }

    modals.close(props.name);
};


onMounted(() => {
    const payload = modals.getData(props.name);

    data.title = payload?.title;
    data.description = payload?.description;
    data.verify = payload?.verify;
    data.check = payload?.check;

    data.loading = false;
});


return (_ctx, _cache) => {
  return (openBlock(), createBlock(BaseModal, {
    isLoading: data.loading,
    name: props.name,
    mobileMode: true,
    closeOutside: true,
    class: "modal-code"
  }, {
    title: withCtx(() => [
      createTextVNode(toDisplayString(data.title), 1)
    ]),
    content: withCtx(() => [
      createBaseVNode("span", {
        class: "description",
        innerHTML: data.description
      }, null, 8, _hoisted_1),
      createVNode(Code, { onChange: setCode }),
      createVNode(Button, {
        onClick: verify,
        disabled: !data.code,
        class: "size-l",
        name: data.verify
      }, null, 8, ["disabled", "name"])
    ]),
    _: 1
  }, 8, ["isLoading", "name"]))
}
}

};
const ModalCode = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-090135c2"]]);

export { ModalCode as default };
//# sourceMappingURL=ModalCode-D-yXxV8Y.js.map
