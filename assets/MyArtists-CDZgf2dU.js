import { _ as _export_sfc, u as useI18n, k as computed, r as reactive, a as api, y as resolveComponent, c as createElementBlock, o as openBlock, v as createBaseVNode, d as createCommentVNode, b as createBlock, z as normalizeClass, x as toDisplayString, h as unref, e as createVNode, s as stores, l as onMounted, F as Fragment, m as renderList, B as Button, g as onBeforeUnmount } from './index-C22B07e5.js';
import { _ as _sfc_main$3 } from './Ready-4GhEXrAj.js';
import { I as Img } from './Img-aXpkq9TQ.js';
import { S as State } from './State-DjrpVdoX.js';
import { E as EmptyLabel } from './EmptyLabel-FkxiRy1p.js';

const _hoisted_1$2 = { class: "name" };
const _hoisted_2$2 = {
  key: 0,
  class: "chevron"
};

    // const player = stores.player();


    
const _sfc_main$2 = {
  __name: 'ArtistPreview',
  props: {
        item: { type: Object, default: () => ({}) },
        showState: { type: Boolean, default: false },
        row: { type: Boolean, default: false },
        disabled: { type: Boolean, default: false },
        invert: { type: Boolean, default: false },
        chevron: { type: Boolean, default: false }
    },
  emits: ['change'],
  setup(__props, { emit: __emit }) {

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
            disabled: props.disabled
        }])
  }, [
    createBaseVNode("div", null, [
      createBaseVNode("div", {
        class: normalizeClass(["profile-image", { disabled: false }])
      }, [
        (profileImage.value?.resized || defaultProfileImage.value?.resized)
          ? (openBlock(), createBlock(Img, {
              key: 0,
              preview: profileImage.value?.resized || defaultProfileImage.value?.resized,
              original: profileImage.value?.original || defaultProfileImage.value?.original,
              skeleton: true
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
        createBaseVNode("span", _hoisted_1$2, toDisplayString(props.item?.name || unref(t)('artists.empty-name')), 1),
        (props.row && props.showState && props.item?.state)
          ? (openBlock(), createBlock(State, {
              key: 0,
              state: props.item?.state
            }, null, 8, ["state"]))
          : createCommentVNode("", true)
      ])
    ]),
    (props.chevron)
      ? (openBlock(), createElementBlock("div", _hoisted_2$2, [
          createVNode(_component_Icon, { icon: "chevron-right" })
        ]))
      : createCommentVNode("", true)
  ], 2))
}
}

};
const ArtistPreview = /*#__PURE__*/_export_sfc(_sfc_main$2, [['__scopeId',"data-v-dc0ad0a6"]]);

const _hoisted_1$1 = { class: "items-list" };
const _hoisted_2$1 = {
  key: 0,
  class: "items"
};
const _hoisted_3 = ["onClick"];

    
const _sfc_main$1 = {
  __name: 'Artists',
  props: {
        empty: { type: Object, default: () => ({}) },
        sort: { type: [Object, null], default: () => ({
            code: 'name',
            direction: 'asc'
        }) },
        handler: { type: [String, null], default: () => null },
        source: { type: Object, default: () => ({ store: 'artists', fnName: 'list' }) }
    },
  emits: ['change'],
  setup(__props, { expose: __expose, emit: __emit }) {

    const emit = __emit;

    const nav = stores.nav();


    const { t } = useI18n();

    const props = __props;

    const data = reactive({
        items: [],
        loading: false,
        skip: 0,
        take: 30, // Temp
        total: 0
    });

    const getItems = async () => {
        clearTimeout(data.setItemsTimeout);
        data.loading = true;

        if (!data.skip) {
            data.items = [];
        }

        let params = {
            skip: data.skip,
            take: data.take
        };

        if (props.sort) {
            params.sort = props.sort.code;
            params.sort_dir = props.sort.direction;
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

        if (props.handler === 'profile' && item?.code) {
            nav.open('artist', { code: item?.code });
        }
    };

    __expose({
        reload
    });

    onMounted(() => {
        getItems();
    });

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$1, [
    (data.items.length)
      ? (openBlock(), createElementBlock("ul", _hoisted_2$1, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(data.items, (item, id) => {
            return (openBlock(), createElementBlock("li", {
              class: normalizeClass({ active: props.id === item.code }),
              onClick: $event => (onClick(item))
            }, [
              createVNode(ArtistPreview, {
                row: true,
                chevron: true,
                item: item
              }, null, 8, ["item"])
            ], 10, _hoisted_3))
          }), 256))
        ]))
      : createCommentVNode("", true),
    (data.loading || (data.items.length < data.total))
      ? (openBlock(), createBlock(Button, {
          key: 1,
          loading: data.loading,
          class: "tertiary size-l",
          name: unref(t)(`blocks.artists.load`),
          onClick: getItems
        }, null, 8, ["loading", "name"]))
      : createCommentVNode("", true),
    (!data.items.length && !data.loading)
      ? (openBlock(), createBlock(EmptyLabel, {
          key: 2,
          "animate-icon": "artists",
          class: "empty",
          title: props.empty?.title,
          description: props.empty?.description
        }, null, 8, ["title", "description"]))
      : createCommentVNode("", true)
  ]))
}
}

};
const Artists = /*#__PURE__*/_export_sfc(_sfc_main$1, [['__scopeId',"data-v-7c15cf68"]]);

const _hoisted_1 = { class: "head" };
const _hoisted_2 = { class: "title" };

    
const _sfc_main = {
  __name: 'MyArtists',
  setup(__props) {

    const { t } = useI18n();


    const tg = stores.tg();

    const data = reactive({
        ready: false
    });

    const init = async () => {
        data.ready = true;
    };

    onMounted(() => {
        tg.showBackButton();
    });

    onBeforeUnmount(() => {
        tg.hideBackButton();
    });

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock(Fragment, null, [
    createBaseVNode("div", _hoisted_1, [
      createBaseVNode("label", _hoisted_2, toDisplayString(unref(t)('pages.favorite-my-artists.title')), 1)
    ]),
    (data.ready)
      ? (openBlock(), createBlock(Artists, {
          key: 0,
          source: {
            store: 'user',
            fnName: 'getMyArtists'
        },
          handler: "profile",
          empty: {
            title: unref(t)('pages.favorite-my-artists.empty.title'),
            description: unref(t)('pages.favorite-my-artists.empty.description')
        }
        }, null, 8, ["empty"]))
      : createCommentVNode("", true),
    createVNode(_sfc_main$3, {
      page: "favorite-my-artists",
      init: init
    })
  ], 64))
}
}

};
const MyArtists = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-570c79a0"]]);

export { MyArtists as default };
//# sourceMappingURL=MyArtists-CDZgf2dU.js.map
