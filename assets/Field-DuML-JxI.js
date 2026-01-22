import { _ as _export_sfc, u as useI18n, h as ref, r as reactive, o as onMounted, Q as IMask, x as resolveComponent, c as createElementBlock, f as openBlock, n as createBaseVNode, b as createBlock, d as createCommentVNode, R as withKeys, q as normalizeClass, y as toDisplayString, I as IconButton } from './index-CDNh39nb.js';

const _hoisted_1 = ["type", "name", "min", "max", "maxlength", "disabled", "placeholder", "autocomplete", "readonly"];
const _hoisted_2 = ["title"];
const _hoisted_3 = { class: "actions-block" };
const _hoisted_4 = { class: "error" };


const _sfc_main = {
  __name: 'Field',
  props: {
    isError: { type: Boolean, default: false },
    icon: { type: String, default: '' },
    value: { type: [String, Number, Object], default: '' },
    name: { type: [String, Number], default: '' },
    id: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    type: { type: String, default: 'text' },
    maxlength: { type: [Number, null], default: null },
    max: { type: Number, default: null },
    min: { type: Number, default: null },
    disabled: { type: Boolean, default: false },
    error: { type: String, default: '' },
    autocomplete: { type: String, default: 'off' },
    readonly: { type: Boolean, default: false },
    clearable: { type: Boolean, default: true },
    info: { type: [String, Boolean], default: false },
    mask: { type: [Object, null], default: null },
    autofocus: { type: [String, Boolean], default: false }
},
  emits: ['change', 'pressEnter'],
  setup(__props, { expose: __expose, emit: __emit }) {

const props = __props;

const { t } = useI18n();

const field = ref(null);

const data = reactive({
    type: props.type
});

const emit = __emit;

__expose({ field, data });

const showPassword = () => {
    data.type = 'text';
};

const hidePassword = () => {
    data.type = 'password';
};

const clean = () => {
    field.value.value = '';
    setTimeout(() => {
        onInput({ target: field.value });
        field.value.focus();
    });
};

onMounted(() => {
    if (field.value && props.mask) {
        data.maskInstance = IMask(field.value, props.mask);

        data.maskInstance.on('accept', () => {
            emit('change', { target: data.maskInstance });
        });

        if (props.value !== null) {
            if (props.mask.format) {
                data.maskInstance.value = props.mask.format(props.value);
            }
            data.maskInstance.typedValue = props.value;
        }

    } else {
        if (props.value !== null) {
            field.value.value = props.value;
        }
    }

    if (props.autofocus) {
        field.value.focus();
    }
});

const onPressEnter = (evn) => {
    onInput(evn);
    emit('pressEnter', evn);
};

const onBlur = (evn) => {
    let value = evn.target.value.trimStart();

    if (value) {
        if (typeof props.min === 'number') {
            if (parseFloat(value, 10) < props.min || Number.isNaN(parseInt(value, 10))) {
                value = props.min;

                setTimeout(() => {
                    if (evn.target && evn.target.value !== value) {
                        evn.target.value = value;
                    }

                    emit('change', evn);
                });
            }
        }
    }
};

const onInput = (evn) => {
    if (!evn?.target || props.mask) {
        return;
    }

    if (['.', ',', '-'].includes(evn.data)) {
        if (!evn.target.value) {
            emit('change', evn);
        }
        return;
    }

    let value = evn.target.value.trimStart();

    if (value) {
        if (typeof props.min === 'number') ;

        if (typeof props.max === 'number') {
            if (parseFloat(value, 10) > props.max) {
                value = props.max;
            }
        }
    } else {
        value = '';
    }


    evn.target.value = value;

    setTimeout(() => {
        if (evn.target && evn.target.value !== value) {
            evn.target.value = value;
        }
    });

    emit('change', evn);
};

return (_ctx, _cache) => {
  const _component_Icon = resolveComponent("Icon");

  return (openBlock(), createElementBlock("div", {
    class: normalizeClass(["field", [
        props.icon ? 'with-icon' : '',
        props.isError || props.error ? 'with-error' : ''
    ]])
  }, [
    createBaseVNode("div", null, [
      createBaseVNode("input", {
        class: normalizeClass({
                    'without-placeholder': !props.placeholder,
                    clearable: props.clearable && !props.readonly,
                    info: !!props.info
                }),
        ref_key: "field",
        ref: field,
        type: data.type === 'time' || props.mask ? 'text' : data.type,
        name: props.name,
        min: props.min,
        max: props.max,
        maxlength: props.maxlength,
        disabled: props.disabled,
        placeholder: props.placeholder,
        autocomplete: __props.autocomplete,
        readonly: props.readonly,
        onInput: onInput,
        onBlur: onBlur,
        onKeyup: withKeys(onPressEnter, ["enter"])
      }, null, 42, _hoisted_1),
      createBaseVNode("span", {
        class: "placeholder",
        title: props.placeholder
      }, toDisplayString(props.placeholder), 9, _hoisted_2),
      (props.icon)
        ? (openBlock(), createBlock(_component_Icon, {
            key: 0,
            icon: props.icon
          }, null, 8, ["icon"]))
        : createCommentVNode("", true),
      createBaseVNode("div", _hoisted_3, [
        (props.type === 'password' && data.type === 'password')
          ? (openBlock(), createBlock(IconButton, {
              key: 0,
              tabindex: "-1",
              icon: "eye-closed",
              class: "tertiary size-s",
              onClick: showPassword
            }))
          : (props.type === 'password' && data.type === 'text')
            ? (openBlock(), createBlock(IconButton, {
                key: 1,
                tabindex: "-1",
                icon: "eye-opened",
                class: "tertiary size-s",
                onClick: hidePassword
              }))
            : (props.clearable && !props.readonly)
              ? (openBlock(), createBlock(IconButton, {
                  key: 2,
                  tabindex: "-1",
                  icon: "close",
                  class: "tertiary size-s clean",
                  onClick: clean
                }))
              : createCommentVNode("", true),
        (props.info)
          ? (openBlock(), createBlock(_component_Icon, {
              key: 3,
              icon: "help",
              class: "icon-info",
              title: props.info
            }, null, 8, ["title"]))
          : createCommentVNode("", true)
      ])
    ]),
    createBaseVNode("span", _hoisted_4, toDisplayString(props.error), 1)
  ], 2))
}
}

};
const Field = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-5ac701b4"]]);

export { Field as F };
//# sourceMappingURL=Field-DuML-JxI.js.map
