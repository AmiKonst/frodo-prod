const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/ModalStudioAuth-ARzGUMv9.js","assets/index-gV8FgsDe.js","assets/index-D0vBOt7B.css","assets/ModalStudioAuth-Dlo-MbQy.css","assets/ModalEditFirstName-C9CrxJ6Q.js","assets/Field-Ki0m75kn.js","assets/Field-DxVcON4E.css","assets/ModalEditFirstName-DkVTLprY.css"])))=>i.map(i=>d[i]);
import { _ as _export_sfc, u as useI18n, s as stores, t as resolveComponent, c as createElementBlock, f as openBlock, l as createBaseVNode, e as createVNode, v as toDisplayString, h as unref, n as normalizeClass, a2 as createStaticVNode, x as ref, r as reactive, j as computed, b as createBlock, d as createCommentVNode, I as IconButton, C as withModifiers, z as normalizeStyle, P as createTextVNode, B as Button, q as message, p as Img, a3 as defineAsyncComponent, o as onMounted, a as onBeforeUnmount, a4 as Toggler, F as Fragment, a5 as __vitePreload } from './index-gV8FgsDe.js';
import { _ as _sfc_main$7 } from './Ready-CUpFw5wo.js';
import { _ as _sfc_main$6 } from './Select-CyFn3Bhm.js';

const _sfc_main$5 = {
  __name: 'Theme',
  setup(__props) {

    const { t } = useI18n();
    const settings = stores.settings();

return (_ctx, _cache) => {
  const _component_Icon = resolveComponent("Icon");

  return (openBlock(), createElementBlock("ul", null, [
    createBaseVNode("li", {
      class: normalizeClass({ active: !unref(settings).theme }),
      onClick: _cache[0] || (_cache[0] = $event => (unref(settings).setTheme()))
    }, [
      createVNode(_component_Icon, { icon: "telegram" }),
      createBaseVNode("span", null, toDisplayString(unref(t)('pages.settings.theme.telegram')), 1)
    ], 2),
    createBaseVNode("li", {
      class: normalizeClass({ active: unref(settings).theme === 'light' }),
      onClick: _cache[1] || (_cache[1] = $event => (unref(settings).setTheme('light')))
    }, [
      _cache[3] || (_cache[3] = createStaticVNode("<svg xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" viewBox=\"0 0 30 30\" data-v-237a3201><defs data-v-237a3201><filter x=\"5px\" y=\"5px\" width=\"30px\" height=\"30px\" filterUnits=\"userSpaceOnUse\" id=\"filter58\" data-v-237a3201><feOffset dx=\"0\" dy=\"0\" in=\"SourceAlpha\" result=\"shadowOffsetInner\" data-v-237a3201></feOffset><feGaussianBlur stdDeviation=\"2.5\" in=\"shadowOffsetInner\" result=\"shadowGaussian\" data-v-237a3201></feGaussianBlur><feComposite in2=\"shadowGaussian\" operator=\"atop\" in=\"SourceAlpha\" result=\"shadowComposite\" data-v-237a3201></feComposite><feColorMatrix type=\"matrix\" values=\"0 0 0 0 1  0 0 0 0 0.631372549019608  0 0 0 0 0  0 0 0 0.976470588235294 0  \" in=\"shadowComposite\" data-v-237a3201></feColorMatrix></filter><g id=\"widget59\" data-v-237a3201><path d=\"M 20 10  C 25.6 10  30 14.4  30 20  C 30 25.6  25.6 30  20 30  C 14.4 30  10 25.6  10 20  C 10 14.4  14.4 10  20 10  Z \" fill-rule=\"nonzero\" fill=\"#f59a23\" stroke=\"none\" data-v-237a3201></path></g></defs><g transform=\"matrix(1 0 0 1 -5 -5 )\" data-v-237a3201><use xlink:href=\"#widget59\" filter=\"url(#filter58)\" data-v-237a3201></use><use xlink:href=\"#widget59\" data-v-237a3201></use></g></svg>", 1)),
      createBaseVNode("span", null, toDisplayString(unref(t)('pages.settings.theme.light')), 1)
    ], 2),
    createBaseVNode("li", {
      class: normalizeClass({ active: unref(settings).theme === 'dark' }),
      onClick: _cache[2] || (_cache[2] = $event => (unref(settings).setTheme('dark')))
    }, [
      _cache[4] || (_cache[4] = createStaticVNode("<svg xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" viewBox=\"0 0 38 40\" data-v-237a3201><defs data-v-237a3201><filter x=\"1px\" y=\"40px\" width=\"38px\" height=\"40px\" filterUnits=\"userSpaceOnUse\" id=\"filter17\" data-v-237a3201><feOffset dx=\"0\" dy=\"0\" in=\"SourceAlpha\" result=\"shadowOffsetInner\" data-v-237a3201></feOffset><feGaussianBlur stdDeviation=\"5\" in=\"shadowOffsetInner\" result=\"shadowGaussian\" data-v-237a3201></feGaussianBlur><feComposite in2=\"shadowGaussian\" operator=\"atop\" in=\"SourceAlpha\" result=\"shadowComposite\" data-v-237a3201></feComposite><feColorMatrix type=\"matrix\" values=\"0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.349019607843137 0  \" in=\"shadowComposite\" data-v-237a3201></feColorMatrix></filter><g id=\"widget18\" data-v-237a3201><path d=\"M 8.21739130434783 20  C 4.95736246797399 20  2.1130464280657 18.4418468517661  0.344134641180861 15.9998912057482  C 0.359848145177513 15.9999637099837  0.375571405442318 16  0.391304347826087 16  C 5.8695652173913 16  10.1739130434783 11.6  10.1739130434783 6  C 10.1739130434783 3.73247410744199  9.46818753650638 1.66169593197917  8.26456103860729 0.000108794379229948  C 13.7203398824256 0.0252825116047802  18 4.41608257274656  18 10  C 18 15.6  13.695652173913 20  8.21739130434783 20  Z \" fill-rule=\"nonzero\" fill=\"#e5dcd4\" stroke=\"none\" transform=\"matrix(1 0 0 1 11 50 )\" data-v-237a3201></path></g></defs><g transform=\"matrix(1 0 0 1 -1 -40 )\" data-v-237a3201><use xlink:href=\"#widget18\" filter=\"url(#filter17)\" data-v-237a3201></use><use xlink:href=\"#widget18\" data-v-237a3201></use></g></svg>", 1)),
      createBaseVNode("span", null, toDisplayString(unref(t)('pages.settings.theme.dark')), 1)
    ], 2)
  ]))
}
}

};
const Theme = /*#__PURE__*/_export_sfc(_sfc_main$5, [['__scopeId',"data-v-237a3201"]]);

const _hoisted_1$2 = ["accept", "multiple"];
const _sfc_main$4 = {
  __name: "FileUploader",
  props: {
    acceptedFormats: { type: Array, default: () => [] },
    maxSize: { type: Number, default: 150 * 1024 * 1024 },
    maxFiles: { type: Number, default: 1 },
    icon: { type: String, default: "upload" },
    loading: { type: Boolean, default: false },
    dropZone: { type: Boolean, default: false },
    description: { type: String, default: "ui.file-uploader.drop.description" },
    zoneType: { type: String, default: "" },
    zoneSize: { type: [Object, null], default: null },
    showPreview: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    preview: { type: [String, null], default: null },
    clearable: { type: Boolean, default: false }
  },
  emits: ["change"],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    const fileInput = ref(null);
    const emit = __emit;
    const data = reactive({
      over: false,
      files: [],
      hasChanges: false
    });
    const selectFile = () => {
      if (props.disabled) {
        return;
      }
      if (props.loading) {
        return;
      }
      fileInput.value.click();
    };
    const props = __props;
    const previewSrc = computed(() => {
      if (!props.showPreview || !(data.files.length || props.preview && !data.hasChanges) || props.maxFiles !== 1) {
        return;
      }
      if (data.files?.length) {
        return URL.createObjectURL(data.files[0]);
      }
      if (props.preview) {
        return encodeURI(`${"https://api.wetap-tech-service.ru"}${props.preview}`);
      }
    });
    const onDragEnter = () => data.over = true;
    const onDragLeave = () => data.over = false;
    const handleFiles = (e) => {
      data.over = false;
      if (!e?.target?.files?.length) {
        return;
      }
      const files = Array.from(e.target.files);
      handleFileChange(files);
    };
    const handleDrop = (e) => {
      const files = Array.from(e.dataTransfer.files);
      handleFileChange(files);
    };
    const handleFileChange = (files) => {
      if (props.disabled) {
        return;
      }
      data.over = false;
      if (!files.length) {
        return;
      }
      if (files.length > props.maxFiles) {
        message.info(t("ui.file-uploader.max-files", { msg: props.maxFiles }));
        return;
      }
      let error = false;
      const items = files.splice(0, props.maxFiles);
      const extensions = props.acceptedFormats.map((item) => item.split("/")[1] || item);
      items.forEach((file) => {
        const ext = file.name.split(".").pop().toLowerCase();
        if (!extensions.includes(ext)) {
          message.info(t("ui.file-uploader.format", { msg: extensions.join(", ") }));
          error = true;
          return;
        }
        if (file.size > props.maxSize) {
          message.info(t("ui.file-uploader.size", { name: file.name, size: parseInt(props.maxSize / (1024 * 1024)) }));
          error = true;
          return;
        }
      });
      if (error) {
        return;
      }
      data.files = items;
      if (items.length > 1) {
        emit("change", items);
      } else {
        emit("change", items[0]);
      }
    };
    const clear = () => {
      data.files = [];
      data.hasChanges = true;
      emit("change", {});
    };
    return (_ctx, _cache) => {
      const _component_Icon = resolveComponent("Icon");
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["upload", { "dropzone-upload": props.dropZone }]),
        style: normalizeStyle({
          "background-image": previewSrc.value ? `url('${previewSrc.value}')` : null
        })
      }, [
        createBaseVNode("input", {
          type: "file",
          ref_key: "fileInput",
          ref: fileInput,
          style: { "display": "none" },
          accept: __props.acceptedFormats.join(", "),
          multiple: props.maxFiles !== 1,
          onChange: handleFiles
        }, null, 40, _hoisted_1$2),
        !props.dropZone ? (openBlock(), createBlock(IconButton, {
          key: 0,
          icon: props.icon,
          class: "size-m round upload",
          loading: props.loading,
          onClick: selectFile
        }, null, 8, ["icon", "loading"])) : (openBlock(), createElementBlock("div", {
          key: 1,
          class: normalizeClass(["dropzone", [props.zoneType, data.over ? "over" : "", previewSrc.value ? "light" : "", props.loading ? "loading" : ""]]),
          style: normalizeStyle({ width: props.zoneSize?.width, height: props.zoneSize?.height }),
          onClick: selectFile,
          onDragover: _cache[0] || (_cache[0] = withModifiers(() => {
          }, ["prevent"])),
          onDragenter: withModifiers(onDragEnter, ["self"]),
          onDragleave: withModifiers(onDragLeave, ["self"]),
          onDrop: withModifiers(handleDrop, ["prevent"])
        }, [
          createBaseVNode("p", {
            class: normalizeClass({ loading: props.loading })
          }, [
            createTextVNode(toDisplayString(unref(t)(props.description)) + " ", 1),
            createVNode(_component_Icon, {
              icon: props.icon
            }, null, 8, ["icon"])
          ], 2),
          props.loading ? (openBlock(), createBlock(Button, {
            key: 0,
            loading: true,
            class: "tertiary size-l loader",
            name: unref(t)(props.description)
          }, null, 8, ["name"])) : createCommentVNode("", true)
        ], 38)),
        props.clearable && (data.files.length || props.preview && !data.hasChanges) ? (openBlock(), createBlock(IconButton, {
          key: 2,
          icon: "trash",
          class: "size-s clear",
          onClick: clear
        })) : createCommentVNode("", true)
      ], 6);
    };
  }
};
const FileUploader = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-40596054"]]);

const _hoisted_1$1 = { class: "profile" };
const _hoisted_2$1 = { class: "title" };
const _hoisted_3$1 = {
  key: 0,
  class: "roles"
};

    
const _sfc_main$3 = {
  __name: 'Profile',
  setup(__props) {

    const avatar = ref(null);

    const user = stores.user();
    const modals = stores.modals();
    const { t } = useI18n();

    const data = reactive({
        loading: false
    });

    const roles = computed(() => {
        return user.profile?.roles?.filter(item => item.roleId !== 'user' && item.roleId !== 'admin').map(item => t(`constants.roles.${ item.roleId }`)).join(', ');
    });

    const updateAvatar = async (file) => {
        data.loading = true;

        await user.updateAvatar(file);

        data.loading = false;
        animateAvatarAgainPlease();
    };

    // =)
    const animateAvatarAgainPlease = () => {
        avatar?.value?.classList.remove('animate-1');
        setTimeout(() => {
            avatar?.value?.classList.add('animate-1');
        }, 10);

        if (!user.profile?.profileImage?.original) {
            returnl;
        }

        modals.open('gallery', { data: { imgs: [{
            title: user.profile.firstName || user.profile.userName,
            ...user.profile?.profileImage
        }] } });
    };

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$1, [
    createBaseVNode("div", {
      class: "avatar animate-1",
      ref_key: "avatar",
      ref: avatar,
      onClick: animateAvatarAgainPlease
    }, [
      (unref(user)?.profile?.profileImage?.resized)
        ? (openBlock(), createBlock(Img, {
            key: 0,
            preview: unref(user)?.profile?.profileImage?.resized,
            original: unref(user)?.profile?.profileImage?.original,
            alt: unref(user)?.profile?.lastName
          }, null, 8, ["preview", "original", "alt"]))
        : createCommentVNode("", true)
    ], 512),
    createBaseVNode("label", _hoisted_2$1, toDisplayString(unref(user)?.profile?.firstName), 1),
    (roles.value)
      ? (openBlock(), createElementBlock("label", _hoisted_3$1, toDisplayString(roles.value), 1))
      : createCommentVNode("", true),
    createVNode(FileUploader, {
      class: "upload",
      icon: "upload-img",
      acceptedFormats: ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/jfif'],
      loading: data.loading,
      onChange: updateAvatar
    }, null, 8, ["loading"])
  ]))
}
}

};
const Profile = /*#__PURE__*/_export_sfc(_sfc_main$3, [['__scopeId',"data-v-c8a3b5b7"]]);

const _sfc_main$2 = {
  __name: 'Language',
  setup(__props) {

    const locale = stores.locale();
    const { t } = useI18n();

    const onLanguageChange = (payload) => {
        locale.updateLocale(payload.value);
    };

return (_ctx, _cache) => {
  return (openBlock(), createBlock(_sfc_main$6, {
    class: "noerror inline",
    placeholder: unref(t)('pages.settings.base.language'),
    optionList: unref(locale).languages,
    value: unref(locale).locale,
    clearable: false,
    onChange: onLanguageChange
  }, null, 8, ["placeholder", "optionList", "value"]))
}
}

};

const _sfc_main$1 = {
  __name: 'Vibration',
  setup(__props) {

    const settings = stores.settings();
    const { t } = useI18n();

    const onVibrationChange = (payload) => {
        settings.setVibration(payload.value);
    };

    const optionList = [
        {
            icon: 'vibro',
            code: true,
            name: 'pages.settings.base.vibration.enabled'
        }, {
            icon: 'vibro-off',
            code: false,
            name: 'pages.settings.base.vibration.disabled'
        }
    ];

return (_ctx, _cache) => {
  return (openBlock(), createBlock(_sfc_main$6, {
    class: "noerror inline",
    placeholder: unref(t)('pages.settings.base.vibration.title'),
    optionList: optionList,
    value: unref(settings).vibration,
    clearable: false,
    useI18n: true,
    onChange: onVibrationChange
  }, null, 8, ["placeholder", "value"]))
}
}

};

const _hoisted_1 = { class: "head" };
const _hoisted_2 = { class: "title" };
const _hoisted_3 = { class: "block" };
const _hoisted_4 = { class: "block" };
const _hoisted_5 = { class: "title" };
const _hoisted_6 = { class: "clickable" };
const _hoisted_7 = { class: "clickable" };
const _hoisted_8 = { class: "block" };
const _hoisted_9 = { class: "title" };
const _hoisted_10 = { class: "clickable offset" };
const _hoisted_11 = { class: "block" };
const _hoisted_12 = { class: "title" };
const _hoisted_13 = { class: "offset" };
const _hoisted_14 = { class: "block" };
const _hoisted_15 = { class: "title" };
const _hoisted_16 = { class: "block" };
const _hoisted_17 = { class: "title" };

    
const _sfc_main = {
  __name: 'Settings',
  setup(__props) {

    const { t } = useI18n();

    const modals = stores.modals();
    const user = stores.user();
    stores.nav();
    const tg = stores.tg();
    stores.others();
    const share = stores.share();


    const authInStudio = () => {
        modals.open('studio-auth', {
            quietClose: true
        });
    };

    const editFirstName = () => {
        modals.open('edit-firstname', {
            quietClose: true
        });
    };

    const invite = () => {
        share.invite();
    };


    const mailUs = () => {
        tg.openLink({
            external_url: 'mailto:help@bilbomusic.com',
            target: '_blank'
        });
    };

    const openTelegramGroup = () => {
        tg.openLink({
            external_url: 'https://t.me/bilbomusic',
            type: 'telegram'
        });
    };

    const openTermsOfUse = () => {
        tg.openLink({
            'external_url': 'https://github.com/Bilbo-Music/bilbo-docs-public/blob/main/terms%20of%20service/Bilbo%20Music.md'
        });
    };

    const openDocumentation = () => {
        tg.openLink({
            'external_url': 'https://github.com/Bilbo-Music/bilbo-docs-public'
        });
    };

    modals.register({
        'studio-auth': defineAsyncComponent(() => __vitePreload(() => import('./ModalStudioAuth-ARzGUMv9.js'),true              ?__vite__mapDeps([0,1,2,3]):void 0)),
        'edit-firstname': defineAsyncComponent(() => __vitePreload(() => import('./ModalEditFirstName-C9CrxJ6Q.js'),true              ?__vite__mapDeps([4,1,2,5,6,7]):void 0))
    });

    onMounted(() => {
    });

    onBeforeUnmount(() => {
        modals.unRegister(['studio-auth', 'edit-firstname']);
    });

return (_ctx, _cache) => {
  const _component_Icon = resolveComponent("Icon");

  return (openBlock(), createElementBlock(Fragment, null, [
    createBaseVNode("div", _hoisted_1, [
      createBaseVNode("label", _hoisted_2, toDisplayString(unref(t)('pages.settings.title')), 1)
    ]),
    createBaseVNode("div", _hoisted_3, [
      (unref(user).profile?.id)
        ? (openBlock(), createBlock(Profile, { key: 0 }))
        : createCommentVNode("", true)
    ]),
    createBaseVNode("div", _hoisted_4, [
      createBaseVNode("label", _hoisted_5, toDisplayString(unref(t)('pages.settings.base.title')), 1),
      createBaseVNode("ul", null, [
        createBaseVNode("li", _hoisted_6, [
          createVNode(_sfc_main$2)
        ]),
        createBaseVNode("li", _hoisted_7, [
          createVNode(_sfc_main$1)
        ]),
        createBaseVNode("li", {
          class: "clickable offset",
          onClick: editFirstName
        }, [
          createVNode(_component_Icon, { icon: "user" }),
          createBaseVNode("span", null, toDisplayString(unref(t)('pages.settings.base.profile.title')), 1)
        ])
      ])
    ]),
    createBaseVNode("div", _hoisted_8, [
      createBaseVNode("label", _hoisted_9, toDisplayString(unref(t)('pages.settings.sound.title')), 1),
      createBaseVNode("ul", null, [
        createBaseVNode("li", _hoisted_10, [
          createVNode(Toggler, {
            class: "reverse",
            inline: true,
            name: unref(t)('pages.settings.sound.autofade'),
            checked: true
          }, null, 8, ["name"])
        ])
      ])
    ]),
    createBaseVNode("div", _hoisted_11, [
      createBaseVNode("label", _hoisted_12, toDisplayString(unref(t)('pages.settings.theme.title')), 1),
      createBaseVNode("ul", null, [
        createBaseVNode("li", _hoisted_13, [
          createVNode(Theme)
        ])
      ])
    ]),
    createBaseVNode("div", _hoisted_14, [
      createBaseVNode("label", _hoisted_15, toDisplayString(unref(t)('pages.settings.devices.title')), 1),
      createBaseVNode("ul", null, [
        createBaseVNode("li", {
          class: "clickable offset",
          onClick: authInStudio
        }, [
          createVNode(_component_Icon, { icon: "apps" }),
          createBaseVNode("span", null, toDisplayString(unref(t)('pages.settings.devices.studio')), 1)
        ])
      ])
    ]),
    createBaseVNode("div", _hoisted_16, [
      createBaseVNode("label", _hoisted_17, toDisplayString(unref(t)('pages.settings.help.title')), 1),
      createBaseVNode("ul", null, [
        createBaseVNode("li", {
          class: "clickable offset",
          onClick: invite
        }, [
          createVNode(_component_Icon, { icon: "share" }),
          createBaseVNode("span", null, toDisplayString(unref(t)('pages.settings.help.invite')), 1)
        ]),
        createBaseVNode("li", {
          class: "clickable offset",
          onClick: mailUs
        }, [
          createVNode(_component_Icon, { icon: "email" }),
          createBaseVNode("span", null, toDisplayString(unref(t)('pages.settings.help.email')), 1)
        ]),
        createBaseVNode("li", {
          class: "clickable offset",
          onClick: openTelegramGroup
        }, [
          createVNode(_component_Icon, { icon: "telegram" }),
          createBaseVNode("span", null, toDisplayString(unref(t)('pages.settings.help.tg')), 1)
        ]),
        createBaseVNode("li", {
          class: "clickable offset",
          onClick: openTermsOfUse
        }, [
          createVNode(_component_Icon, { icon: "paperclip" }),
          createBaseVNode("span", null, toDisplayString(unref(t)('pages.settings.help.terms-of-use')), 1)
        ]),
        createBaseVNode("li", {
          class: "clickable offset",
          onClick: openDocumentation
        }, [
          createVNode(_component_Icon, { icon: "paperclip" }),
          createBaseVNode("span", null, toDisplayString(unref(t)('pages.settings.help.documentation')), 1)
        ])
      ])
    ]),
    createVNode(_sfc_main$7, { page: "settings" })
  ], 64))
}
}

};
const Settings = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-bddc4a15"]]);

export { Settings as default };
//# sourceMappingURL=Settings-u2GDpU7l.js.map
