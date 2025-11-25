import { _ as _export_sfc, s as stores, i as ref, u as useI18n, r as reactive, l as onMounted, b as createBlock, o as openBlock, t as withCtx, e as createVNode, v as createBaseVNode, B as Button, h as unref, L as createTextVNode, x as toDisplayString, J as BaseModal } from './index-C31MFRLz.js';
import { F as Field } from './Field-BgU8SZ3J.js';

const _hoisted_1 = { class: "buttons" };

const _sfc_main = {
  __name: 'ModalEditFirstName',
  props: {
    name: {
        type: String,
        default: 'edit-firstname'
    }
},
  setup(__props) {

const modals = stores.modals();
const user = stores.user();

const field = ref(null);

const { t } = useI18n();

const data = reactive({
    firstName: user.profile?.firstName,
    loading: true
});

const props = __props;

const onFieldChange = ({ target }) => {
    data.firstName = target.value?.trim();
};

const save = async () => {
    if (data.firstName?.trim().length < 2) {
        return;
    }

    data.loading = true;

    await user.updateFirstName(data.firstName.trim());

    setTimeout(() => {
        modals.open('success', {
            data: {
                title: t('modals.edit-firstname.done.title'),
                description: t('modals.edit-firstname.done.description'),
                close: t('modals.edit-firstname.done.close')
            },
            quietClose: true
        });

        modals.close(props.name);
    }, 200);
};

onMounted(async () => {
    data.loading = false;

    if (field.value?.field?.focus) {
        field.value.field.focus();
    }
});


return (_ctx, _cache) => {
  return (openBlock(), createBlock(BaseModal, {
    isLoading: data.loading,
    name: props.name,
    mobileMode: true,
    closeOutside: true,
    class: "modal-edit-firstname"
  }, {
    title: withCtx(() => [
      createTextVNode(toDisplayString(unref(t)('modals.edit-firstname.title')), 1)
    ]),
    content: withCtx(() => [
      createVNode(Field, {
        ref_key: "field",
        ref: field,
        name: "firstname",
        class: "light inside noerror",
        value: data.firstName,
        onChange: onFieldChange
      }, null, 8, ["value"]),
      createBaseVNode("div", _hoisted_1, [
        createVNode(Button, {
          onClick: save,
          disabled: data.firstName?.trim().length < 2,
          class: "size-m",
          name: unref(t)('modals.edit-firstname.save')
        }, null, 8, ["disabled", "name"])
      ])
    ]),
    _: 1
  }, 8, ["isLoading", "name"]))
}
}

};
const ModalEditFirstName = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-b89ed420"]]);

export { ModalEditFirstName as default };
//# sourceMappingURL=ModalEditFirstName-HxVABqjN.js.map
