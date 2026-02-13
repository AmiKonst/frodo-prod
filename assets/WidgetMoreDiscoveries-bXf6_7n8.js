import { _ as _export_sfc, s as stores, u as useI18n, x as ref, o as onMounted, U as resolveDirective, D as withDirectives, c as createElementBlock, f as openBlock, b as createBlock, d as createCommentVNode, O as mergeProps, p as Img, v as toDisplayString, h as unref, F as Fragment, m as renderList, n as normalizeClass, B as Button, $ as nextTick, g as api, r as reactive, e as createVNode, l as createBaseVNode, k as withCtx, E as vShow, S as Slider, a0 as shuffleArray } from './index-SfA68tuZ.js';

const _hoisted_1$1 = {
  key: 1,
  class: "title-text"
};

    
const _sfc_main$1 = {
  __name: 'TitleWithMenu',
  props: {
        title: { type: [Object, String, null], default: null },
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
    (props.title?.img)
      ? (openBlock(), createBlock(Img, mergeProps({ key: 0 }, props.title.img, {
          style: { width: props.title.img.width }
        }), null, 16, ["style"]))
      : createCommentVNode("", true),
    (props.title)
      ? (openBlock(), createElementBlock("span", _hoisted_1$1, toDisplayString(props.title?.text || unref(t)(props.title)), 1))
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
const TitleWithMenu = /*#__PURE__*/_export_sfc(_sfc_main$1, [['__scopeId',"data-v-2df2b273"]]);

const _hoisted_1 = { class: "block" };
const _hoisted_2 = { class: "slider-box" };
const _hoisted_3 = ["onClick"];
const _hoisted_4 = {
  key: 0,
  class: "skeleton"
};
const _hoisted_5 = {
  key: 2,
  class: "name"
};


    
const _sfc_main = {
  __name: 'WidgetMoreDiscoveries',
  props: {
        name: { type: [String, Object], default: 'pages.music.more-discoveries.title' }
    },
  setup(__props) {

    const { t } = useI18n();

    const dict = api.dict();
    const nav = stores.nav();

    const sliderRef = ref();

    const props = __props;

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
  return (openBlock(), createElementBlock("div", _hoisted_1, [
    createVNode(TitleWithMenu, {
      title: props.name,
      items: data.types,
      value: data.type,
      onChange: setType
    }, null, 8, ["title", "items", "value"]),
    createBaseVNode("div", _hoisted_2, [
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
              ? (openBlock(), createElementBlock("div", _hoisted_4))
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
          ], 8, _hoisted_3)
        ]),
        _: 1
      }, 8, ["items"])
    ])
  ]))
}
}

};
const WidgetMoreDiscoveries = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-77f805be"]]);

export { WidgetMoreDiscoveries as default };
//# sourceMappingURL=WidgetMoreDiscoveries-bXf6_7n8.js.map
