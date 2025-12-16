import { B as Block } from './Block--JYsbLX-.js';
import { _ as _export_sfc, s as stores, u as useI18n, l as computed, r as reactive, g as api, x as resolveComponent, c as createElementBlock, f as openBlock, n as createBaseVNode, d as createCommentVNode, b as createBlock, q as normalizeClass, t as Img, W as State, y as toDisplayString, i as unref, e as createVNode, C as withModifiers, I as IconButton, h as ref, w as withCtx, m as mergeProps } from './index-Bd4G-eOK.js';

const _hoisted_1 = { class: "name" };
const _hoisted_2 = {
  key: 0,
  class: "chevron"
};
const _hoisted_3 = { key: 1 };

    
const _sfc_main$1 = {
  __name: 'ArtistPreview',
  props: {
        item: { type: Object, default: () => ({}) },
        showState: { type: Boolean, default: false },
        row: { type: Boolean, default: false },
        disabled: { type: Boolean, default: false },
        invert: { type: Boolean, default: false },
        skeleton: { type: Boolean, default: false },
        showKebab: { type: Boolean, default: false },
        chevron: { type: Boolean, default: false }
    },
  emits: ['change'],
  setup(__props, { emit: __emit }) {

    const modals = stores.modals();

    const { t } = useI18n();

    const props = __props;

    const profileImage = computed(() => {
        let url;
        if (props.item?.profileImage instanceof File) {
            url = URL.createObjectURL(props.item.profileImage);
        }

        return url ? {
            resized: url,
            cover: url,
            original: url
        } : props.item?.profileImage;
    });

    reactive({
    });

    const openKebab = () => {
        modals.open('artist-kebab', { quietClose: true, data: { code: props.item?.code } });
    };

    const defaultProfileImage = computed(() => {
        return api.artists().defaultProfileImage;
    });

    // onMounted(() => {
    //     getItems();
    // });

return (_ctx, _cache) => {
  const _component_Icon = resolveComponent("Icon");

  return (openBlock(), createElementBlock("div", {
    class: normalizeClass(["artist-preview", {
            row: props.row,
            invert: props.invert,
            disabled: props.disabled,
            skeleton: props.skeleton
        }])
  }, [
    createBaseVNode("div", null, [
      createBaseVNode("div", {
        class: normalizeClass(["profile-image", { disabled: false }])
      }, [
        (profileImage.value?.resized || defaultProfileImage.value?.resized || props.skeleton)
          ? (openBlock(), createBlock(Img, {
              key: 0,
              preview: props.skeleton ? null : profileImage.value?.resized || defaultProfileImage.value?.resized,
              original: props.skeleton ? null : profileImage.value?.original || defaultProfileImage.value?.original,
              skeleton: true,
              aspectRatio: "1 / 1"
            }, null, 8, ["preview", "original"]))
          : createCommentVNode("", true)
      ]),
      (!props.row && props.showState && props.item?.state)
        ? (openBlock(), createBlock(State, {
            key: 0,
            state: props.item?.state,
            class: "solid"
          }, null, 8, ["state"]))
        : createCommentVNode("", true)
    ]),
    createBaseVNode("div", null, [
      createBaseVNode("div", null, [
        createBaseVNode("span", _hoisted_1, toDisplayString(props.item?.name || unref(t)('artists.empty-name')), 1),
        (props.row && props.showState && props.item?.state)
          ? (openBlock(), createBlock(State, {
              key: 0,
              state: props.item?.state
            }, null, 8, ["state"]))
          : createCommentVNode("", true)
      ])
    ]),
    (props.chevron)
      ? (openBlock(), createElementBlock("div", _hoisted_2, [
          createVNode(_component_Icon, { icon: "chevron-right" })
        ]))
      : createCommentVNode("", true),
    (props.showKebab)
      ? (openBlock(), createElementBlock("div", _hoisted_3, [
          createVNode(IconButton, {
            onClick: withModifiers(openKebab, ["stop"]),
            class: "size-s tertiary",
            icon: "more-vertical"
          })
        ]))
      : createCommentVNode("", true)
  ], 2))
}
}

};
const ArtistPreview = /*#__PURE__*/_export_sfc(_sfc_main$1, [['__scopeId',"data-v-a9e12485"]]);

const _sfc_main = {
  __name: 'Artists',
  props: {
        empty: { type: Object, default: () => ({}) },
        items: { type: Array, default: () => ([]) },
        title: { type: [Object, String, null], default: null },
        params: { type: Object, default: () => ({}) },
        sort: { type: [Object, null], default: () => ({
            code: 'name',
            direction: 'asc'
        }) },
        loadMore: { type: Boolean, default: true },
        showKebab: { type: Boolean, default: false },
        skeleton: { type: Boolean, default: true },
        skeletonCount: { type: Number, default: 3 },
        take: { type: Number, default: 30 },
        itemsInCol: { type: Number, default: 1 },
        handler: { type: [String, null], default: () => null },
        type: { type: String, default: 'list' },
        source: { type: [Object, null], default: () => ({ store: 'artists', fnName: 'list' }) },
        buttons: { type: Array, default: () => ([]) }
    },
  emits: ['change'],
  setup(__props, { expose: __expose, emit: __emit }) {

    const emit = __emit;

    const nav = stores.nav();
    
    const block = ref(null);

    const props = __props;

    const reload = () => {
        if (block?.value?.reload) {
            block.value.reload();
        }
    };

    const onClick = (item) => {
        emit('change', item);

        if (props.handler === 'artist' && item?.code) {
            nav.open('artist', { code: item?.code });
        }
    };

    __expose({
        reload
    });


return (_ctx, _cache) => {
  return (openBlock(), createBlock(Block, mergeProps({ code: "artists" }, props, {
    ref_key: "block",
    ref: block,
    onChange: onClick,
    sliderProps: {
            itemWidth: '120px',
            colAlign: 'start',
            colGap: '8px',
            rowGap: '8px'
        }
  }), {
    "list-item": withCtx(({ item }) => [
      createVNode(ArtistPreview, {
        row: true,
        item: item,
        showKebab: props.showKebab
      }, null, 8, ["item", "showKebab"])
    ]),
    "list-skeleton": withCtx(() => [
      createVNode(ArtistPreview, {
        row: true,
        skeleton: true
      })
    ]),
    "row-item": withCtx(({ item }) => [
      createVNode(ArtistPreview, {
        row: false,
        item: item,
        showKebab: props.showKebab
      }, null, 8, ["item", "showKebab"])
    ]),
    "row-skeleton": withCtx(() => [
      createVNode(ArtistPreview, {
        row: false,
        skeleton: true
      })
    ]),
    _: 1
  }, 16))
}
}

};

export { _sfc_main as _ };
//# sourceMappingURL=Artists-N6nn768q.js.map
