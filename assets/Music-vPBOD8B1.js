import { _ as _export_sfc, s as stores, u as useI18n, p as ref, o as onMounted, M as resolveDirective, A as withDirectives, c as createElementBlock, f as openBlock, d as createCommentVNode, t as toDisplayString, h as unref, F as Fragment, l as renderList, b as createBlock, n as normalizeClass, D as Button, S as nextTick, g as api, r as reactive, e as createVNode, q as createBaseVNode, k as withCtx, B as vShow, V as shuffleArray, a as onBeforeUnmount } from './index-Hn1fNOiG.js';
import { E as EmptyLabel } from './EmptyLabel-BtlNvJSO.js';
import { I as Img } from './Img-D3RcHAex.js';
import { a as Slider } from './State-BhnQKsfB.js';
import { _ as _sfc_main$4 } from './Artists-SDcLJXNd.js';
import { _ as _sfc_main$3 } from './Ready-DbqwjdlZ.js';
import './TitleWithButtons-CBpW6p1W.js';

const _imports_0 = "/img/building.png";

const _hoisted_1$2 = {
  key: 0,
  class: "title-text"
};

    
const _sfc_main$2 = {
  __name: 'TitleWithMenu',
  props: {
        title: { type: [String, null], default: null },
        value: { type: [String, null], default: null },
        items: { type: Array, default: () => [] }
    },
  emits: ['change'],
  setup(__props, { expose: __expose, emit: __emit }) {

    const locale = stores.locale();

    const { t } = useI18n();

    const props = __props;

    const emit = __emit;

    const containerRef = ref(null);
    const buttonRefs = ref({});

    const setButtonRef = (code, el) => {
        if (el) {
            buttonRefs.value[code] = el;
        }
    };

    const scrollToCenter = (code) => {
        nextTick(() => {
            const container = containerRef.value;
            const componentInstance = buttonRefs.value[code];
            const button = componentInstance?.el;

            if (!container || !button) {
                return;
            }

            const containerRect = container.getBoundingClientRect();
            const buttonRect = button.getBoundingClientRect();

            const offset = (buttonRect.left + buttonRect.width / 2) - (containerRect.left + containerRect.width / 2);

            container.scrollTo({
                left: container.scrollLeft + offset,
                behavior: 'smooth',
            });
        });
    };

    const setValue = (value) => {
        if (props.value !== value) {
            emit('change', value);
            scrollToCenter(value);
        }
    };

    const scrollLeft = () => {
        const container = containerRef.value;
        if (!container) {
            return;
        }

        container.scrollTo({
            left: 0,
            // left: !locale.rtl ? container.scrollWidth : 0,
            behavior: 'smooth',
        });
    };


    const scrollRight = () => {
        const container = containerRef.value;
        if (!container) {
            return;
        }

        container.scrollTo({
            left: !locale.rtl ? container.scrollWidth : -container.scrollWidth,
            behavior: 'smooth',
        });
    };

    onMounted(() => {
        if (props.items?.length && props.value && props.value !== props.items[0].code) {
            scrollToCenter(props.value);
        }
    });

    __expose({
        setValue
    });

return (_ctx, _cache) => {
  const _directive_touch = resolveDirective("touch");

  return withDirectives((openBlock(), createElementBlock("label", {
    class: "title lock-page-swipe",
    ref_key: "containerRef",
    ref: containerRef
  }, [
    (props.title)
      ? (openBlock(), createElementBlock("span", _hoisted_1$2, toDisplayString(unref(t)(props.title)), 1))
      : createCommentVNode("", true),
    (openBlock(true), createElementBlock(Fragment, null, renderList(props.items, (item) => {
      return (openBlock(), createBlock(Button, {
        key: item.code,
        name: unref(t)(item.name),
        class: normalizeClass(["size-s menu", { active: props.value === item.code }]),
        ref_for: true,
        ref: el => setButtonRef(item.code, el),
        onClick: $event => (setValue(item.code))
      }, null, 8, ["name", "class", "onClick"]))
    }), 128))
  ])), [
    [
      _directive_touch,
      scrollLeft,
      "swipe",
      {
        right: true,
        stop: true
      }
    ],
    [
      _directive_touch,
      scrollRight,
      "swipe",
      {
        left: true,
        stop: true
      }
    ]
  ])
}
}

};
const TitleWithMenu = /*#__PURE__*/_export_sfc(_sfc_main$2, [['__scopeId',"data-v-75f6cf26"]]);

const _hoisted_1$1 = { class: "block" };
const _hoisted_2$1 = { class: "slider-box" };
const _hoisted_3$1 = ["onClick"];
const _hoisted_4$1 = {
  key: 0,
  class: "skeleton"
};
const _hoisted_5 = {
  key: 2,
  class: "name"
};


    
const _sfc_main$1 = {
  __name: 'MoreDiscoveries',
  setup(__props) {

    const { t } = useI18n();

    const dict = api.dict();
    const nav = stores.nav();

    const sliderRef = ref();

    const data = reactive({
        type: 'categories',
        items: [],
        loadedItems: [],
        types: [
            {
                page: 'category',
                code: 'categories',
                name: 'pages.music.more-discoveries.categories.title'
            },
            {
                page: 'genre',
                code: 'genres',
                name: 'pages.music.more-discoveries.genres.title'
            },
            {
                page: 'mood',
                code: 'moods',
                name: 'pages.music.more-discoveries.moods.title'
            }
        ]
    });

    const setType = async (type) => {
        data.type = type;

        const payload = await dict[type].all();
        data.items = shuffleArray(payload?.items || []);
        data.loadedItems = [];
    };

    const handleLoad = (code) => {
        data.loadedItems.push(code);
    };

    const handleError = (code) => {
        data.loadedItems.push(code);
    };

    const open = (payload) => {
        const page = data.types.find(item => item.code === data.type)?.page;

        if (!page) {
            return;
        }

        nav.open(page, { code: payload?.code });
    };

    onMounted(() => {
        setType(data.type);
    });

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$1, [
    createVNode(TitleWithMenu, {
      title: "pages.music.more-discoveries.title",
      items: data.types,
      value: data.type,
      onChange: setType
    }, null, 8, ["items", "value"]),
    createBaseVNode("div", _hoisted_2$1, [
      createVNode(Slider, {
        colPreloadCount: 4,
        items: data.items,
        itemsInCol: 1,
        loop: true,
        itemWidth: "100%",
        itemHeight: "60px",
        colAlign: "center",
        colGap: "8px",
        rowGap: "8px",
        ref_key: "sliderRef",
        ref: sliderRef
      }, {
        default: withCtx(({ item }) => [
          createBaseVNode("div", {
            class: "slide",
            onClick: $event => (open(item))
          }, [
            (!item.cover || !data.loadedItems.includes(item.code))
              ? (openBlock(), createElementBlock("div", _hoisted_4$1))
              : createCommentVNode("", true),
            (item.cover?.resized)
              ? withDirectives((openBlock(), createBlock(Img, {
                  key: 1,
                  preview: item.cover?.resized,
                  original: item.cover?.original,
                  alt: item?.title,
                  onLoad: $event => (handleLoad(item.code)),
                  onError: $event => (handleError(item.code))
                }, null, 8, ["preview", "original", "alt", "onLoad", "onError"])), [
                  [vShow, data.loadedItems.includes(item.code)]
                ])
              : createCommentVNode("", true),
            (data.loadedItems.includes(item.code))
              ? (openBlock(), createElementBlock("span", _hoisted_5, toDisplayString(item.title), 1))
              : createCommentVNode("", true)
          ], 8, _hoisted_3$1)
        ]),
        _: 1
      }, 8, ["items"])
    ])
  ]))
}
}

};
const MoreDiscoveries = /*#__PURE__*/_export_sfc(_sfc_main$1, [['__scopeId',"data-v-eac85397"]]);

const _hoisted_1 = { class: "empty-block" };
const _hoisted_2 = { class: "empty-logo" };
const _hoisted_3 = ["alt"];
const _hoisted_4 = ["alt"];

    
const _sfc_main = /*@__PURE__*/Object.assign({
        name: 'music'
    }, {
  __name: 'Music',
  setup(__props) {

    const { t } = useI18n();

    stores.user();

    stores.others();

    const data = reactive({
        ready: false
    });

    const init = async () => {
        data.ready = true;
    };

    

    onBeforeUnmount(() => {
        console.log('>');
    });

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock(Fragment, null, [
    (data.ready)
      ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
          createVNode(MoreDiscoveries),
          createVNode(_sfc_main$4, {
            take: 12,
            skeletonCount: 4,
            type: "row",
            params: {
                state: 'PUBLISHED'
            },
            sort: {
                code: 'createdAt',
                direction: 'desc'
            },
            buttons: [{
                name: 'blocks.artists.all',
                page: 'artists'
            }],
            loadMore: false,
            handler: "artist",
            title: "blocks.artists.new-artists"
          }),
          createBaseVNode("div", _hoisted_1, [
            createBaseVNode("div", _hoisted_2, [
              createBaseVNode("img", {
                "data-v-ec08b062": "",
                src: _imports_0,
                alt: unref(t)('pages.music.lock.title')
              }, null, 8, _hoisted_3),
              createBaseVNode("img", {
                "data-v-ec08b062": "",
                src: _imports_0,
                alt: unref(t)('pages.music.lock.title')
              }, null, 8, _hoisted_4)
            ]),
            createVNode(EmptyLabel, {
              class: "empty",
              title: unref(t)('pages.music.lock.title'),
              description: unref(t)('pages.music.lock.description')
            }, null, 8, ["title", "description"])
          ])
        ], 64))
      : createCommentVNode("", true),
    createVNode(_sfc_main$3, {
      page: "music",
      onReady: _cache[0] || (_cache[0] = () => {}),
      init: init
    })
  ], 64))
}
}

});
const Music = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-b14f15c9"]]);

export { Music as default };
//# sourceMappingURL=Music-vPBOD8B1.js.map
