import { _ as _export_sfc, p as ref, s as stores, U as onActivated, j as computed, w as watch, o as onMounted, c as createElementBlock, f as openBlock, F as Fragment, l as renderList, x as normalizeStyle, v as renderSlot, S as nextTick, u as useI18n, r as reactive, b as createBlock, d as createCommentVNode, n as normalizeClass, h as unref, B as Button, k as withCtx, q as createBaseVNode, P as mergeProps, g as api, z as resolveComponent, e as createVNode, t as toDisplayString } from './index-CiX5UvYa.js';
import { T as TitleWithButtons } from './TitleWithButtons-BieelmoW.js';
import { E as EmptyLabel } from './EmptyLabel-Dk7iHHqi.js';

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
    snapType: { type: String, default: 'x mandatory' },
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
    scrollSnapType: props.snapType,
    gap: props.colGap,
    direction: locale.rtl ? 'rtl' : 'ltr',
    scrollBehavior: 'smooth', //'auto' //'smooth'
}));

const colStyle = computed(() => ({
    flex: '0 0 auto',
    scrollSnapAlign: props.colAlign === 'board' ? null : (dynamicColAlign.value === 'auto-direction' ? 'start' : dynamicColAlign.value),
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

// const scrollToActiveCol = async (animate = true) => {
//     await nextTick();

//     const slider = sliderRef.value;
//     if (!slider) return;

//     if (!props.loop || props.colPreloadCount === null) {
//         const relativeIndex = activeColIndex.value - startColIndex.value;
//         const col = slider.children[relativeIndex];
//         if (!col) return;

//         if (!animate) {
//             const originalBehavior = slider.style.scrollBehavior;
//             slider.style.scrollBehavior = 'auto';

//             col.scrollIntoView({
//                 behavior: 'auto',
//                 block: 'nearest',
//                 inline: 'center',
//             });

//             requestAnimationFrame(() => {
//                 slider.style.scrollBehavior = originalBehavior || 'smooth';
//             });
//         } else {
//             col.scrollIntoView({
//                 behavior: 'smooth',
//                 block: 'nearest',
//                 inline: 'center',
//             });
//         }
//         return;
//     }

//     // В цикличном режиме активный столбец в центре среза visibleCols
//     const preload = props.colPreloadCount;
//     const visibleIndex = preload;
//     const col = slider.children[visibleIndex];
//     if (!col) {
//         return;
//     }

//     if (!animate) {
//         const originalBehavior = slider.style.scrollBehavior;
//         slider.style.scrollBehavior = 'auto';

//         col.scrollIntoView({
//             behavior: 'auto',
//             block: 'nearest',
//             inline: 'center'
//         });

//         requestAnimationFrame(() => {
//             slider.style.scrollBehavior = originalBehavior || 'smooth';
//         });
//     } else {
//         col.scrollIntoView({
//             behavior: 'smooth',
//             block: 'nearest',
//             inline: 'center'
//         });
//     }
// };

const scrollToActiveCol = async (animate = true) => {
    await nextTick();

    const slider = sliderRef.value;
    if (!slider) return;

    const originalBehavior = slider.style.scrollBehavior;
    slider.style.scrollBehavior = animate ? 'smooth' : 'auto';

    // получаем элемент активной колонки
    let col;
    if (!props.loop || props.colPreloadCount === null) {
        const relativeIndex = activeColIndex.value - startColIndex.value;
        col = slider.children[relativeIndex];
    } else {
        const preload = props.colPreloadCount;
        col = slider.children[preload];
    }

    if (!col) {
        slider.style.scrollBehavior = originalBehavior;
        return;
    }

    // вместо scrollIntoView используем точный scrollLeft
    const targetLeft =
        col.offsetLeft - slider.clientWidth / 2 + col.clientWidth / 2;

    slider.scrollLeft = targetLeft;

    // возвращаем scroll-behavior
    requestAnimationFrame(() => {
        slider.style.scrollBehavior = originalBehavior || 'auto';
    });
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

    if (props.colAlign === 'none' || props.colAlign === 'board') {
        return;
    }

    if (props.loop) {
        scrollEndTimeout = setTimeout(() => {
            updateActiveColByScroll();
        }, 400);
    }
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
        style: normalizeStyle({
                ...colStyle.value,
                scrollSnapAlign: props.colAlign === 'board' ? (
                    colIndex === 0 ? 'start' : ( colIndex === visibleCols.value?.length - 1 ? 'end' : 'none' )
                ) : colStyle.value.scrollSnapAlign
            }),
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
const Slider = /*#__PURE__*/_export_sfc(_sfc_main$2, [['__scopeId',"data-v-14e02ae5"]]);

const _hoisted_1$1 = { class: "block" };
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

    
const _sfc_main$1 = {
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
  return (openBlock(), createElementBlock("div", _hoisted_1$1, [
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
const Block = /*#__PURE__*/_export_sfc(_sfc_main$1, [['__scopeId',"data-v-6ef14f44"]]);

const _hoisted_1 = ["title"];

    
const _sfc_main = {
  __name: 'State',
  props: {
        state: { type: [String, null], default: null }
    },
  setup(__props) {

    const { t } = useI18n();

    const props = __props;

return (_ctx, _cache) => {
  const _component_Icon = resolveComponent("Icon");

  return (openBlock(), createElementBlock("span", {
    class: normalizeClass(["state", [props.state.toLowerCase()]]),
    title: unref(t)(`state.default.code.${ props.state.toLowerCase() }`)
  }, [
    createVNode(_component_Icon, {
      icon: `workflow-${ props.state.toLowerCase() }`
    }, null, 8, ["icon"]),
    createBaseVNode("span", null, toDisplayString(unref(t)(`state.default.code.${ props.state.toLowerCase() }`)), 1)
  ], 10, _hoisted_1))
}
}

};
const State = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-414a25e2"]]);

export { Block as B, State as S, Slider as a };
//# sourceMappingURL=State-BvLvevNs.js.map
