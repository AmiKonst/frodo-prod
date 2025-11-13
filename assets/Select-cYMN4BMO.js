import { u as useI18n, l as ref, r as reactive, i as computed, j as onMounted, w as watch, m as resolveComponent, c as createElementBlock, o as openBlock, k as createBaseVNode, b as createBlock, d as createCommentVNode, n as normalizeClass, t as toDisplayString, p as withCtx, F as Fragment, q as renderList, v as withModifiers, x as renderSlot, y as withDirectives, h as unref, e as createVNode, z as vShow, A as _sfc_main$1, I as IconButton } from './index-C7KVDunn.js';

const _hoisted_1 = ["disabled", "placeholder", "value"];
const _hoisted_2 = ["title"];
const _hoisted_3 = ["value", "onClick"];
const _hoisted_4 = { class: "actions-block" };
const _hoisted_5 = { class: "error" };


const _sfc_main = {
  __name: 'Select',
  props: {
    isError: { type: Boolean, default: false },
    icon: { type: String, default: '' },
    name: { type: String, default: '' },
    value: { type: [Number, String, Boolean], default: null },
    position: { type: Number, default: 0 },
    optionList: {
        type: Array,
        default: () => []
    },
    leftAuto: { type: Boolean, default: true },
    rightAuto: { type: Boolean, default: false },
    placeholder: { type: String, default: '' },
    error: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    useI18n: { type: Boolean, default: false },
    clearable: { type: Boolean, default: true }
},
  emits: ['change'],
  setup(__props, { emit: __emit }) {

const { t } = useI18n();
const field = ref(null);

const props = __props;

const data = reactive({
    selected: null,
    isOpenDropdown: false
});

const valueTitle = computed(() => {
    const name = data.selected === null ? '' : props.optionList.find((option) => option.code === data.selected)?.name;

    return name && props.useI18n ? t(name) : name;
});

const valueIcon = computed(() =>
    data.selected === null ? '' : props.optionList.find((option) => option.code === data.selected)?.icon
);

const emit = __emit;

const clean = () => {
    field.value.value = '';
    data.selected = null;
    emit('change', {
        name: props.name,
        value: null,
        position: props.position
    });
};

const toggleOpened = () => {
    if (props.disabled) {
        return;
    }

    data.isOpenDropdown = !data.isOpenDropdown;

    if (!data.isOpenDropdown) {
        return false;
    }
};

onMounted(() => {
    data.selected = props.value;
});

watch(() => props.value, (value) => {
    if (value === null && data.selected) {
        data.selected = null;
        return;
    }

    data.selected = value;
});

const onChoose = (event, payload) => {
    data.selected = payload.code;
    data.isOpenDropdown = false;

    emit('change', {
        name: props.name,
        value: payload.code,
        position: props.position
    });
};

return (_ctx, _cache) => {
  const _component_Icon = resolveComponent("Icon");

  return (openBlock(), createElementBlock("div", {
    class: normalizeClass([
            valueIcon.value || props.icon ? 'with-icon' : '',
            props.isError ? 'with-error' : '',
            data.isOpenDropdown ? 'opened' : '',
            props.disabled ? 'disabled' : '',
            'select-field'
        ])
  }, [
    createBaseVNode("div", { onClick: toggleOpened }, [
      createBaseVNode("input", {
        ref_key: "field",
        ref: field,
        autocomplete: "off",
        disabled: props.disabled,
        placeholder: props.placeholder,
        value: valueTitle.value,
        class: normalizeClass({
                    'without-placeholder': !props.placeholder,
                    clearable: props.clearable && data.selected && !props.disabled
                })
      }, null, 10, _hoisted_1),
      createBaseVNode("span", {
        class: "placeholder",
        title: props.placeholder
      }, toDisplayString(props.placeholder), 9, _hoisted_2),
      (valueIcon.value || props.icon)
        ? (openBlock(), createBlock(_component_Icon, {
            key: 0,
            icon: valueIcon.value || props.icon
          }, null, 8, ["icon"]))
        : createCommentVNode("", true),
      (data.isOpenDropdown)
        ? (openBlock(), createBlock(_sfc_main$1, {
            key: 1,
            field: field.value,
            placeOptions: {
                    leftAuto: props.leftAuto,
                    rightAuto: props.rightAuto
                },
            onClose: toggleOpened,
            onOnSwipeBottom: toggleOpened
          }, {
            default: withCtx(() => [
              createBaseVNode("ul", null, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(props.optionList, (option) => {
                  return (openBlock(), createElementBlock("li", {
                    value: option.code,
                    key: option.code,
                    onClick: withModifiers($event => (onChoose($event, option)), ["stop"]),
                    class: normalizeClass({ selected: data.selected === option.code })
                  }, [
                    renderSlot(_ctx.$slots, "default", { option: option }, () => [
                      (option.icon)
                        ? (openBlock(), createBlock(_component_Icon, {
                            key: 0,
                            icon: option.icon
                          }, null, 8, ["icon"]))
                        : createCommentVNode("", true),
                      createBaseVNode("span", null, toDisplayString(props.useI18n ? unref(t)(option.name) : option.name), 1)
                    ]),
                    withDirectives(createVNode(_component_Icon, {
                      icon: "check",
                      class: "check"
                    }, null, 512), [
                      [vShow, data.selected === option.code]
                    ])
                  ], 10, _hoisted_3))
                }), 128))
              ])
            ]),
            _: 3
          }, 8, ["field", "placeOptions"]))
        : createCommentVNode("", true),
      createBaseVNode("div", _hoisted_4, [
        (props.clearable && data.selected && !props.disabled)
          ? (openBlock(), createBlock(IconButton, {
              key: 0,
              tabindex: "-1",
              icon: "close",
              class: "tertiary size-s",
              onClick: withModifiers(clean, ["stop"])
            }))
          : createCommentVNode("", true),
        createVNode(_component_Icon, {
          icon: "chevron-down",
          class: "arrow-down"
        })
      ])
    ]),
    createBaseVNode("span", _hoisted_5, toDisplayString(props.error), 1)
  ], 2))
}
}

};

export { _sfc_main as _ };
//# sourceMappingURL=Select-cYMN4BMO.js.map
