import { _ as _export_sfc, i as ref, s as stores, j as onActivated, k as computed, w as watch, l as onMounted, c as createElementBlock, o as openBlock, F as Fragment, m as renderList, n as normalizeStyle, p as renderSlot, q as nextTick } from './index-BiOKNy-j.js';

const _hoisted_1 = ["onClick"];


const _sfc_main = {
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
      ], 12, _hoisted_1))
    }), 128))
  ], 36))
}
}

};
const Slider = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-14e02ae5"]]);

export { Slider as S };
//# sourceMappingURL=Slider-CRrPG1Ms.js.map
