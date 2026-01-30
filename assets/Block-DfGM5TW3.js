import { _ as _export_sfc, s as stores, u as useI18n, r as reactive, o as onMounted, c as createElementBlock, f as openBlock, b as createBlock, d as createCommentVNode, F as Fragment, p as renderList, q as normalizeClass, z as renderSlot, i as unref, H as Button, w as withCtx, n as createBaseVNode, m as mergeProps, S as Slider, g as api } from './index-DqRqB12a.js';
import { T as TitleWithButtons } from './TitleWithButtons-DR5Cq9cf.js';
import { E as EmptyLabel } from './EmptyLabel-BNe2hxyR.js';

const _hoisted_1 = { class: "block" };
const _hoisted_2 = {
  key: 1,
  class: "items-list"
};
const _hoisted_3 = {
  key: 0,
  class: "items"
};
const _hoisted_4 = ["onClick"];
const _hoisted_5 = {
  key: 1,
  class: "items"
};
const _hoisted_6 = {
  key: 2,
  class: "slider-box"
};
const _hoisted_7 = ["onClick"];
const _hoisted_8 = ["onClick"];

    
const _sfc_main = {
  __name: 'Block',
  props: {
        code: { type: String, default: '' },
        empty: { type: Object, default: () => ({}) },
        items: { type: Array, default: () => ([]) },
        title: { type: [Object, String, null], default: null },
        params: { type: Object, default: () => ({}) },
        sort: { type: [Object, null], default: null },
        loadMore: { type: Boolean, default: true },
        skeleton: { type: Boolean, default: false },
        skeletonCount: { type: Number, default: 30 },
        take: { type: Number, default: 30 },
        itemsInCol: { type: Number, default: 1 },
        handler: { type: [String, null], default: () => null },
        type: { type: String, default: 'list' },
        source: { type: [Object, null], default: null },
        id: { type: [String, null], default: null },
        sliderProps: { type: Object, default: () => ({}) },
        buttons: { type: Array, default: () => ([]) },
        folder: { type: [Object, null], default: null },
        getById: { type: [String, null], default: null }
    },
  emits: ['change'],
  setup(__props, { expose: __expose, emit: __emit }) {

    const emit = __emit;

    stores.nav();


    const { t } = useI18n();

    const props = __props;

    const data = reactive({
        items: props.items,
        loading: false,
        skip: props.items?.length || 0,
        total: props.items?.length || 0
    });


    const getState = () => ({
        items: data.items,
        total: data.total
    });

    const getItems = async () => {
        clearTimeout(data.setItemsTimeout);
        data.loading = true;

        if (!data.skip) {
            data.items = [];
        }

        let params;

        if (props.getById) {
            params = props.getById;
        } else {
            params = {
                ...(props.params || {}),
                skip: data.skip,
                take: props.take
            };

            if (props.sort) {
                params.sort = props.sort.code;
                params.sort_dir = props.sort.direction;
            }
        }

        const payload = await api[props.source.store]()[props.source.fnName](params) || [];

        data.setItemsTimeout = setTimeout(() => {
            if (payload?.items?.length) {
                data.items.splice(data.items.length, 0, ...(payload.items || []));
            }

            data.skip = data.items.length;
            data.total = payload?.total || 0;

            data.loading = false;
        }, 200);
    };

    const reload = () => {
        data.skip = 0;
        getItems();
    };

    const onClick = (item) => {
        emit('change', item);
    };

    __expose({
        reload,
        getState
    });

    onMounted(() => {
        if (props.source) {
            getItems();
        }
    });

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1, [
    (props.title)
      ? (openBlock(), createBlock(TitleWithButtons, {
          key: 0,
          title: props.title,
          items: props.buttons
        }, null, 8, ["title", "items"]))
      : createCommentVNode("", true),
    (props.type === 'list')
      ? (openBlock(), createElementBlock("div", _hoisted_2, [
          (data.items.length)
            ? (openBlock(), createElementBlock("ul", _hoisted_3, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(data.items, (item, id) => {
                  return (openBlock(), createElementBlock("li", {
                    class: normalizeClass({ active: props.id && (props.id === item.code || props.id === item.id) }),
                    onClick: $event => (onClick(item))
                  }, [
                    renderSlot(_ctx.$slots, "list-item", { item: item }, undefined, true)
                  ], 10, _hoisted_4))
                }), 256))
              ]))
            : createCommentVNode("", true),
          (props.skeleton && data.loading)
            ? (openBlock(), createElementBlock("ul", _hoisted_5, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(Array.from({ length: props.skeletonCount }, () => ({ code: Math.random() })), (item, id) => {
                  return (openBlock(), createElementBlock("li", null, [
                    renderSlot(_ctx.$slots, "list-skeleton", {}, undefined, true)
                  ]))
                }), 256))
              ]))
            : createCommentVNode("", true),
          (props.loadMore && ((data.loading && !props.skeleton) || (data.items.length < data.total)))
            ? (openBlock(), createBlock(Button, {
                key: 2,
                loading: data.loading,
                class: "tertiary size-l",
                name: unref(t)(`blocks.${props.code}.load`),
                onClick: getItems
              }, null, 8, ["loading", "name"]))
            : createCommentVNode("", true),
          (!data.items.length && !data.loading)
            ? (openBlock(), createBlock(EmptyLabel, {
                key: 3,
                class: "empty",
                title: props.empty?.title || unref(t)('common.empty.title'),
                description: props.empty?.description || unref(t)('common.empty.description')
              }, null, 8, ["title", "description"]))
            : createCommentVNode("", true)
        ]))
      : createCommentVNode("", true),
    (props.type === 'row')
      ? (openBlock(), createElementBlock("div", _hoisted_6, [
          (data.items.length && !data.loading)
            ? (openBlock(), createBlock(Slider, mergeProps({
                key: 0,
                colPreloadCount: Math.ceil(props.take / props.itemsInCol),
                itemsInCol: props.itemsInCol,
                items: data.items
              }, props.sliderProps, { ref: "sliderRef" }), {
                default: withCtx(({ item }) => [
                  createBaseVNode("div", {
                    class: "slide",
                    onClick: $event => (onClick(item))
                  }, [
                    renderSlot(_ctx.$slots, "row-item", { item: item }, undefined, true)
                  ], 8, _hoisted_7)
                ]),
                _: 3
              }, 16, ["colPreloadCount", "itemsInCol", "items"]))
            : createCommentVNode("", true),
          (data.loading)
            ? (openBlock(), createBlock(Slider, mergeProps({
                key: 1,
                colPreloadCount: Math.ceil(props.take / props.itemsInCol),
                itemsInCol: props.itemsInCol,
                items: Array.from({ length: props.skeletonCount }, () => ({ code: Math.random() }))
              }, props.sliderProps, { ref: "sliderRef" }), {
                default: withCtx(({ item }) => [
                  createBaseVNode("div", {
                    class: "slide",
                    onClick: $event => (onClick(item))
                  }, [
                    renderSlot(_ctx.$slots, "row-skeleton", {}, undefined, true)
                  ], 8, _hoisted_8)
                ]),
                _: 3
              }, 16, ["colPreloadCount", "itemsInCol", "items"]))
            : createCommentVNode("", true),
          (!data.items.length && !data.loading)
            ? (openBlock(), createBlock(EmptyLabel, {
                key: 2,
                class: "empty",
                title: props.empty?.title || unref(t)('common.empty.title'),
                description: props.empty?.description || unref(t)('common.empty.description')
              }, null, 8, ["title", "description"]))
            : createCommentVNode("", true)
        ]))
      : createCommentVNode("", true)
  ]))
}
}

};
const Block = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-ba8e3738"]]);

export { Block as B };
//# sourceMappingURL=Block-DfGM5TW3.js.map
