import { _ as _export_sfc, u as useI18n, r as reactive, i as computed, a as api, j as onMounted, c as createElementBlock, o as openBlock, d as createCommentVNode, b as createBlock, F as Fragment, q as renderList, h as unref, B as Button, m as resolveComponent, n as normalizeClass, k as createBaseVNode, e as createVNode, t as toDisplayString, s as stores, g as onBeforeUnmount } from './index-DnuixuCF.js';
import { _ as _sfc_main$2 } from './Ready-COhtED9N.js';
import { E as EmptyLabel } from './EmptyLabel-Dq6tiRqs.js';
import { I as Img } from './Img-GdQOlsWF.js';

const _hoisted_1$1 = { class: "items-list" };
const _hoisted_2$1 = {
  key: 0,
  class: "items"
};
const _hoisted_3 = ["onClick"];
const _hoisted_4 = { class: "artist-preview" };

    
const _sfc_main$1 = {
  __name: 'Artists',
  props: {
        empty: { type: Object, default: () => ({}) },
        sort: { type: Object, default: () => ({
            code: 'name',
            direction: 'asc'
        }) },
        source: { type: Object, default: () => ({ store: 'artists', fnName: 'list' }) }
    },
  emits: ['change'],
  setup(__props, { expose: __expose, emit: __emit }) {

    const emit = __emit;

    const { t } = useI18n();

    const props = __props;

    const data = reactive({
        items: [],
        loading: false,
        skip: 0,
        take: 30, // Temp
        total: 0,
        sort: props.sort
    });

    const defaultProfileImage = computed(() => {
        return api.artists().defaultProfileImage;
    });

    const getItems = async () => {
        data.loading = true;

        if (!data.skip) {
            data.items = [];
        }

        let params = {
            skip: data.skip,
            take: data.take
        };

        // if (data.sort) {
        //     params.sort = data.sort.code;
        //     params.sort_dir = data.sort.direction;
        // }

        const payload = await api[props.source.store]()[props.source.fnName](params) || [];

        setTimeout(() => {
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

    __expose({
        reload
    });

    onMounted(() => {
        getItems();
    });

return (_ctx, _cache) => {
  const _component_Icon = resolveComponent("Icon");

  return (openBlock(), createElementBlock("div", _hoisted_1$1, [
    (data.items.length)
      ? (openBlock(), createElementBlock("ul", _hoisted_2$1, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(data.items, (item, id) => {
            return (openBlock(), createElementBlock("li", {
              class: normalizeClass({ active: props.id === item.code }),
              onClick: $event => (emit('change', item))
            }, [
              createBaseVNode("span", _hoisted_4, [
                (item.profileImage?.resized || defaultProfileImage.value?.resized)
                  ? (openBlock(), createBlock(Img, {
                      key: 0,
                      preview: item.profileImage?.resized || defaultProfileImage.value?.resized,
                      original: item.profileImage?.original || defaultProfileImage.value?.original,
                      alt: item?.name,
                      skeleton: true
                    }, null, 8, ["preview", "original", "alt"]))
                  : createCommentVNode("", true),
                createBaseVNode("span", null, toDisplayString(item.name), 1),
                createVNode(_component_Icon, { icon: "chevron-right" })
              ])
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
const Artists = /*#__PURE__*/_export_sfc(_sfc_main$1, [['__scopeId',"data-v-84417d9b"]]);

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
          source: { store: 'user', fnName: 'getMyArtists' },
          empty: { title: unref(t)('pages.favorite-my-artists.empty.title'), description: unref(t)('pages.favorite-my-artists.empty.description') }
        }, null, 8, ["empty"]))
      : createCommentVNode("", true),
    createVNode(_sfc_main$2, {
      page: "favorite-my-artists",
      init: init
    })
  ], 64))
}
}

};
const MyArtists = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-40648495"]]);

export { MyArtists as default };
//# sourceMappingURL=MyArtists-ooshdC3D.js.map
