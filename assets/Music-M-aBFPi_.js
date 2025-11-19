import { _ as _export_sfc, s as stores, u as useI18n, m as ref, j as onMounted, J as resolveDirective, z as withDirectives, c as createElementBlock, o as openBlock, d as createCommentVNode, t as toDisplayString, h as unref, F as Fragment, x as renderList, b as createBlock, v as normalizeClass, B as Button, M as nextTick, N as onActivated, i as computed, w as watch, p as normalizeStyle, n as renderSlot, a as api, r as reactive, e as createVNode, l as createBaseVNode, k as withCtx, A as vShow, O as shuffleArray, g as onBeforeUnmount } from './index-CDDxjamk.js';
import { E as EmptyLabel } from './EmptyLabel-DG4B6ze9.js';
import { I as Img } from './Img-D9u_Zqe-.js';
import { _ as _sfc_main$4 } from './Ready-ab84F2Vu.js';

const _imports_0 = "/img/building.png";

const _hoisted_1$3 = {
  key: 0,
  class: "title-text"
};

    
const _sfc_main$3 = {
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
      ? (openBlock(), createElementBlock("span", _hoisted_1$3, toDisplayString(unref(t)(props.title)), 1))
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
const TitleWithMenu = /*#__PURE__*/_export_sfc(_sfc_main$3, [['__scopeId',"data-v-c6761b49"]]);

const _hoisted_1$2 = ["onClick"];


const _sfc_main$2 = {
  __name: 'Slider',
  props: {
    items: { type: Array, default: () => [] },
    itemsInCol: { type: Number, default: 1 },
    colPreloadCount: { type: [Number, null], default: null },
    itemWidth: { type: [String, null], default: null },
    itemHeight: { type: [String, null], default: null },
    colAlign: { type: String, default: 'center' },
    colGap: { type: String, default: '0px' },
    rowGap: { type: String, default: '0px' },
    overflow: { type: [String, null], default: null },
    disabled: { type: Boolean, default: false },
    loop: { type: Boolean, default: false },
},
  emits: ['change'],
  setup(__props, { expose: __expose, emit: __emit }) {

const props = __props;

const dynamicColAlign = ref(props.colAlign);
ref(0);

const emit = __emit;

const sliderRef = ref(null);
const activeColIndex = ref(0);

const locale = stores.locale();


onActivated(() => {
    scrollToActiveCol(false);
});

// Разбиваем items на колонки по itemsInCol
const cols = computed(() => {
    const result = [];
    for (let i = 0; i < props.items.length; i += props.itemsInCol) {
        result.push(props.items.slice(i, i + props.itemsInCol));
    }
    return result;
});

const totalCols = computed(() => cols.value.length);

// Нормализуем индекс activeCol по модулю количества колонок
const normalizedActiveColIndex = computed(() => {
    return ((activeColIndex.value % totalCols.value) + totalCols.value) % totalCols.value;
});

// В цикличном режиме считаем видимые колонки с учетом preload
const visibleCols = computed(() => {
    if (totalCols.value === 0) {
        return [];
    }

    const preload = props.colPreloadCount ?? 0;

    if (!props.loop || props.colPreloadCount === null) {
        return cols.value.slice(startColIndex.value, endColIndex.value);
    }

    const result = [];
    const center = normalizedActiveColIndex.value;

    for (let i = center - preload; i <= center + preload; i++) {
        const idx = ((i % totalCols.value) + totalCols.value) % totalCols.value;
        result.push(cols.value[idx]);
    }
    return result;
});

// В обычном режиме start и end для среза visibleCols
const startColIndex = computed(() => {
    if (props.colPreloadCount === null) {
        return 0;
    }

    const preload = props.colPreloadCount;
    return Math.max(0, activeColIndex.value - preload);
});

const endColIndex = computed(() => {
    if (props.colPreloadCount === null) {
        return totalCols.value;
    }

    const preload = props.colPreloadCount;
    return Math.min(totalCols.value, activeColIndex.value + preload + 1);
});

const sliderStyle = computed(() => ({
    display: 'flex',
    overflowX: props.overflow === 'hidden' ? 'hidden' : 'auto',
    scrollSnapType: 'x mandatory',
    gap: props.colGap,
    direction: locale.rtl ? 'rtl' : 'ltr',
    scrollBehavior: 'auto' //'smooth'
}));

const colStyle = computed(() => ({
    flex: '0 0 auto',
    scrollSnapAlign: dynamicColAlign.value === 'auto-direction' ? 'start' : dynamicColAlign.value,
    width: props.itemWidth || '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: props.rowGap
}));

const itemStyle = computed(() => ({
    height: props.itemHeight || '100%'
}));

// Генерируем уникальный ключ для колонки — учитываем индекс для отличия одинаковых массивов при цикле
const colKey = (col) => {
    // Можно для безопасности добавить индекс в ключ, т.к. при цикле col может повторяться
    return col.map(item => item.code).join('_');
};

// Вычисляем реальный индекс колонки в полном массиве cols по индексу в visibleCols
const computeRealIndex = (visibleIndex) => {
    if (!props.loop || props.colPreloadCount === null) {
        return startColIndex.value + visibleIndex;
    }

    const preload = props.colPreloadCount;
    const realIndex = activeColIndex.value - preload + visibleIndex;
    // Нормализуем по модулю
    return ((realIndex % totalCols.value) + totalCols.value) % totalCols.value;
};

const scrollToActiveCol = async (animate = true) => {
    await nextTick();

    const slider = sliderRef.value;
    if (!slider) return;

    if (!props.loop || props.colPreloadCount === null) {
        const relativeIndex = activeColIndex.value - startColIndex.value;
        const col = slider.children[relativeIndex];
        if (!col) return;

        if (!animate) {
            const originalBehavior = slider.style.scrollBehavior;
            slider.style.scrollBehavior = 'auto';

            col.scrollIntoView({
                behavior: 'auto',
                block: 'nearest',
                inline: 'center',
            });

            requestAnimationFrame(() => {
                slider.style.scrollBehavior = originalBehavior || 'smooth';
            });
        } else {
            col.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center',
            });
        }
        return;
    }

    // В цикличном режиме активный столбец в центре среза visibleCols
    const preload = props.colPreloadCount;
    const visibleIndex = preload;
    const col = slider.children[visibleIndex];
    if (!col) {
        return;
    }

    if (!animate) {
        const originalBehavior = slider.style.scrollBehavior;
        slider.style.scrollBehavior = 'auto';

        col.scrollIntoView({
            behavior: 'auto',
            block: 'nearest',
            inline: 'center'
        });

        requestAnimationFrame(() => {
            slider.style.scrollBehavior = originalBehavior || 'smooth';
        });
    } else {
        col.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
        });
    }
};

const setActiveCol = async (index) => {
    if (totalCols.value === 0) {
        return;
    }

    if (!props.loop && (index < 0 || index >= totalCols.value)) {
        return;
    }

    // Очистим отложенный таймер скролла — клик пользователя важнее
    clearTimeout(scrollEndTimeout);

    // Установим выравнивание раньше, ДО прокрутки
    if (props.colAlign === 'auto-direction') {
        if (index > activeColIndex.value) {
            dynamicColAlign.value = 'start';
        } else if (index < activeColIndex.value) {
            dynamicColAlign.value = 'end';
        } else {
            dynamicColAlign.value = 'start'; // или center/left
        }
    }

    if (activeColIndex.value !== index) {
        activeColIndex.value = index;
        emit('change', cols.value[normalizedActiveColIndex.value]);
    }

    await scrollToActiveCol(false);
};

let scrollEndTimeout = null;

const onScroll = () => {
    clearTimeout(scrollEndTimeout);

    scrollEndTimeout = setTimeout(() => {
        updateActiveColByScroll();
    }, 400);
};

const onScrollEnd = () => {
    // console.log('end')
    // clearTimeout(scrollEndTimeout);
    // scrollEndTimeout = setTimeout(() => {
    //     console.log('>')
    //     updateActiveColByScroll();
    // }, 600);
};

const updateActiveColByScroll = () => {
    const slider = sliderRef.value;
    if (!slider) {
        return;
    }

    const sliderRect = slider.getBoundingClientRect();

    let minDistance = Infinity;
    let closestIndex = 0;

    Array.from(slider.children).forEach((colEl, i) => {
        const colRect = colEl.getBoundingClientRect();
        const colCenter = colRect.left + colRect.width / 2;
        const sliderCenter = sliderRect.left + sliderRect.width / 2;
        const distance = Math.abs(colCenter - sliderCenter);

        if (distance < minDistance) {
            minDistance = distance;
            closestIndex = i;
        }
    });

    let newActiveCol;
    if (!props.loop || props.colPreloadCount === null) {
        newActiveCol = startColIndex.value + closestIndex;
    } else {
        const preload = props.colPreloadCount;
        newActiveCol = activeColIndex.value - preload + closestIndex;
    }

    // В режиме без цикла проверяем границы
    if (!props.loop) {
        if (newActiveCol < 0) newActiveCol = 0;
        if (newActiveCol >= totalCols.value) newActiveCol = totalCols.value - 1;
    }

    if (newActiveCol !== activeColIndex.value) {
        setActiveCol(newActiveCol);
    }
};

const showItem = (code) => {
    const colIndex = cols.value.findIndex(col => col.some(item => item.code === code));
    if (colIndex !== -1) {
        setActiveCol(colIndex);
    }
};

watch(
    [() => props.items, () => props.itemsInCol],
    async () => {
        await nextTick(); // Убедимся, что cols пересчитались

        if (totalCols.value === 0) {
            activeColIndex.value = 0;
            return;
        }

        // Если активной колонки больше нет — сбрасываем индекс
        if (activeColIndex.value >= totalCols.value) {
            activeColIndex.value = 0;
        }

        await scrollToActiveCol(false);
    },
    { deep: true }
);

__expose({ showItem });

onMounted(() => {
    if (props.colAlign === 'auto-direction') {
        dynamicColAlign.value = 'start';
    }

    scrollToActiveCol(false);
});

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", {
    class: "slider lock-page-swipe",
    ref_key: "sliderRef",
    ref: sliderRef,
    style: normalizeStyle(sliderStyle.value),
    onScroll: onScroll,
    onTouchend: onScrollEnd,
    onMouseup: onScrollEnd
  }, [
    (openBlock(true), createElementBlock(Fragment, null, renderList(visibleCols.value, (col, colIndex) => {
      return (openBlock(), createElementBlock("div", {
        key: colKey(col),
        class: "slider-col",
        style: normalizeStyle(colStyle.value),
        onClick: $event => (setActiveCol(computeRealIndex(colIndex)))
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(col, (item, rowIndex) => {
          return (openBlock(), createElementBlock("div", {
            key: item.code,
            class: "slider-item",
            style: normalizeStyle(itemStyle.value)
          }, [
            renderSlot(_ctx.$slots, "default", { item: item }, undefined, true)
          ], 4))
        }), 128))
      ], 12, _hoisted_1$2))
    }), 128))
  ], 36))
}
}

};
const Slider = /*#__PURE__*/_export_sfc(_sfc_main$2, [['__scopeId',"data-v-f57a4087"]]);

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
    createVNode(_sfc_main$4, {
      page: "music",
      onReady: _cache[0] || (_cache[0] = () => {}),
      init: init
    })
  ], 64))
}
}

});
const Music = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-2f8be9cb"]]);

export { Music as default };
//# sourceMappingURL=Music-M-aBFPi_.js.map
