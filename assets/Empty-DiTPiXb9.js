import { x as ref, r as reactive, c as createElementBlock, f as openBlock, y as renderSlot, b as createBlock, d as createCommentVNode, e as createVNode, n as normalizeClass, I as IconButton, k as withCtx, G as _sfc_main$6, C as withModifiers, _ as _export_sfc, s as stores, j as computed, a as onBeforeUnmount, l as createBaseVNode, z as normalizeStyle, a6 as pageSizeOptions, o as onMounted, w as watch, t as resolveComponent, F as Fragment, m as renderList, v as toDisplayString, D as withDirectives, E as vShow, a7 as Teleport, $ as nextTick, u as useI18n, a8 as useSlots, a9 as isMobile, h as unref, aa as vModelText, R as withKeys, P as createTextVNode, a2 as createStaticVNode, a4 as Toggler, B as Button, ab as DateField, V as Loader, q as message } from './index-BSXCxvuN.js';
import { F as Field } from './Field-CjtboTmi.js';
import { _ as _sfc_main$7 } from './Select-DsUZVGz-.js';
import { E as EmptyLabel } from './EmptyLabel-BrAHDrpV.js';

const _sfc_main$5 = {
  __name: 'KebabMenu',
  props: {
    icon: { type: String, default: 'more-vertical' },
    name: { type: String, default: '' },
    leftAuto: { type: Boolean, default: true },
    rightAuto: { type: Boolean, default: false },
    tertiary: { type: Boolean, default: false },
    invert: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    secondary: { type: Boolean, default: false },
    size: { type: [String, null], default: null }
},
  emits: ['toggle'],
  setup(__props, { expose: __expose, emit: __emit }) {

const props = __props;

const emit = __emit;
const menu = ref();

const data = reactive({
    opened: false
});

const close = (e) => {
    data.opened = !data.opened;
    emit('toggle', data.opened);
};

const onToggle = (e) => {
    if (props.disabled) {
        return;
    }

    if (data.opened && e.target.nodeName === 'UL') {
        return;
    }

    data.opened = !data.opened;

    emit('toggle', data.opened);

    if (!data.opened) {
        return false;
    }
};

const show = () => {
    if (!data.opened) {
        onToggle();
    }
};

__expose({
    show,
    close
});

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", {
    class: normalizeClass([{ bottom: data.bottom, opened: data.opened }, "kebab-menu"]),
    ref_key: "menu",
    ref: menu,
    onClick: withModifiers(onToggle, ["stop"])
  }, [
    renderSlot(_ctx.$slots, "trigger", {}, () => [
      createVNode(IconButton, {
        name: props.name,
        icon: props.icon,
        class: normalizeClass({
                    secondary: props.secondary,
                    tertiary: props.tertiary,
                    invert: props.invert,
                    'size-xl': props.size === 'size-xl',
                    'size-l': props.size === 'size-l',
                    'size-m': props.size === 'size-m',
                    'size-s': props.size === 'size-s',
                    active: data.opened
                })
      }, null, 8, ["name", "icon", "class"])
    ]),
    (data.opened)
      ? (openBlock(), createBlock(_sfc_main$6, {
          key: 0,
          field: menu.value,
          placeOptions: {
                leftAuto: props.leftAuto,
                rightAuto: props.rightAuto,
                offset: 8
            },
          size: "size-l",
          onClose: close,
          onOnClick: onToggle,
          onOnSwipeBottom: close
        }, {
          default: withCtx(() => [
            renderSlot(_ctx.$slots, "default")
          ]),
          _: 3
        }, 8, ["field", "placeOptions"]))
      : createCommentVNode("", true)
  ], 2))
}
}

};

const _sfc_main$4 = {
  __name: 'Range',
  props: {
    min: { type: Number, default: 0 },
    max: { type: Number, default: 100 },
    value: { type: Number, default: 0 },
    decimalCount: { type: Number, default: 0 },
    disabled: { type: Boolean, default: false }
},
  emits: ['change'],
  setup(__props, { emit: __emit }) {

const locale = stores.locale();
const emit = __emit;
const range = ref(null);

const props = __props;

const data = reactive({
    value: props.value,
    oldValue: props.value,
    pageX: 0,
    width: 1,
});

const updatePosition = (clientX) => {
    const rect = range.value.getBoundingClientRect();

    let relativeX = clientX - rect.left;
    if (locale.rtl) {
        relativeX = rect.right - clientX;
    }

    const percentage =  props.min + (props.max - props.min) * Math.max(0, Math.min(1, (relativeX / rect.width)));

    data.value = +percentage.toFixed(props.decimalCount);

    emit('change', data.value);
};

const onMouseUp = () => {
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
};

const onMouseMove = (e) => {
    updatePosition(e.clientX);
};

const onMouseDown = (e) => {
    if (props.disabled) {
        return;
    }

    updatePosition(e.clientX);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
};


const pos = computed(() => {
    return (props.max - props.min) ? `${ 100 * (data.value - props.min) / (props.max - props.min) }%` : 0;
});

onBeforeUnmount(() => {
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
});

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", {
    onClick: _cache[0] || (_cache[0] = withModifiers(() => {}, ["stop"])),
    onMousedown: onMouseDown,
    class: normalizeClass(["range", { disabled: props.disabled }]),
    ref_key: "range",
    ref: range
  }, [
    createBaseVNode("span", {
      style: normalizeStyle({ width: pos.value })
    }, _cache[1] || (_cache[1] = [
      createBaseVNode("i", null, null, -1)
    ]), 4)
  ], 34))
}
}

};
const Range = /*#__PURE__*/_export_sfc(_sfc_main$4, [['__scopeId',"data-v-28c042e0"]]);

const _hoisted_1$3 = {
  key: 0,
  class: "pagination"
};
const _hoisted_2$2 = { class: "prev" };
const _hoisted_3$2 = ["title", "onClick"];
const _hoisted_4$1 = { key: 2 };
const _hoisted_5$1 = { class: "next" };
const _hoisted_6$1 = ["onClick"];

const _sfc_main$3 = {
  __name: 'Pagination',
  props: {
    total: { type: Number, default: 1 },
    page: { type: Number, default: 1 },
    pageSize: { type: Number, default: 10 },
    showSizeChanger: { type: Boolean, default: false },
    step: { type: Number, default: 3 },
    maxShowPage: { type: Number, default: 10 },
    isShort: { type: Boolean, default: false },
    pageOptions: {
        type: Array,
        default: pageSizeOptions
    }
},
  emits: ['change'],
  setup(__props, { emit: __emit }) {

const emit = __emit;

const props = __props;

const searchPage = ref(null);

const data = reactive({
    pages: 1,
    currentPage: 1,
    pageSize: props.pageSize,
    opened: false,
    searchPage: null
});

const closeDropdownSearch = () => {
    data.opened = false;
};
const openDropdownSearch = (event) => {
    data.opened = true;
    const rect = event.target.getBoundingClientRect();
    nextTick(() => {
        if (rect.top + searchPage.value.offsetHeight + 10 >= window.innerHeight) {
            searchPage.value.style.top = 'auto';
            searchPage.value.style.bottom = `${searchPage.value.offsetHeight / 2 - 10}px`;
        } else {
            searchPage.value.style.top = `${rect.top + 10}px`;
            searchPage.value.style.bottom = 'auto';
        }
        searchPage.value.style.left = `${rect.right - searchPage.value.offsetWidth / 2}px`;
    });
};

let onSearchChangeTimeout = null;

const onSearchChange = (e) => {
    clearTimeout(onSearchChangeTimeout);
    onSearchChangeTimeout = setTimeout(() => {
        data.searchPage = e.target.value.trim();
    }, 200);
};

const searchFilterPage = computed(() => {
    const arr = Array(data.pages)
        .fill()
        .map((_, i) => `${i + 1}`);
    if (data.searchPage) {
        return arr.filter((el) => el.includes(data.searchPage));
    }
    return arr;
});

const getRange = (start, end) =>
    Array(end - start + 1)
        .fill()
        .map((_, i) => i + start);

const hideOverPages = (currentPage, pagesCount) => {
    if (data.pages <= props.maxShowPage) {
        return [...Array(data.pages)].map((_, i) => i + 1);
    }
    const isFirst = currentPage === 1;
    const isLast = currentPage === pagesCount;
    let delta = 0;
    if (pagesCount <= 2 + props.step) {
        delta = 2 + props.step;
    } else {
        delta += props.step;
        delta -= !isFirst + !isLast;
    }

    const range = {
        start: Math.round(currentPage - 1),
        end: Math.round(currentPage + 1)
    };

    if (range.start - 1 === 1 || range.end + 1 === pagesCount) {
        range.start += 1;
        range.end += 1;
    }

    let pages =
        currentPage > delta
            ? getRange(Math.min(range.start, pagesCount - delta), Math.min(range.end, pagesCount))
            : getRange(1, Math.min(pagesCount, delta + 1));

    const withDots = (value, pair) => (pages.length + 1 !== pagesCount ? pair : [value]);

    if (pages[0] !== 1) {
        const prevPages = [...Array(props.step)].map((_, i) => i + 1);
        if (pages.includes(prevPages[props.step - 1]) || pages[0] - prevPages[props.step - 1] === 1) {
            pages = Array.from(new Set([...prevPages, ...pages]));
        } else {
            pages = withDots(1, [...prevPages, 'prev']).concat(pages);
        }
    }

    if (pages[pages.length - 1] < pagesCount) {
        const nextPages = [...Array(props.step)].map((_, i) => pagesCount - props.step + i + 1);
        if (pages.includes(nextPages[0]) || nextPages[0] - pages[pages.length - 1] === 1) {
            pages = Array.from(new Set([...pages, ...nextPages]));
        } else {
            pages = pages.concat(withDots(pagesCount, ['next', ...nextPages]));
        }
    }

    return pages;
};

const pagination = computed(() => {
    if (data.pages) {
        return !props.isShort ? hideOverPages(data.currentPage, data.pages) : [data.currentPage];
    } else {
        return [];
    }
});

const changePageSize = ({ value }) => {
    data.pageSize = value;
    data.pages = Math.ceil(props.total / data.pageSize);
    if (data.pages < data.pageSize) {
        data.currentPage = data.pages;
    }

    emit('change', {
        page: data.currentPage,
        pageSize: data.pageSize
    });
};

const changePage = (page) => {
    data.opened = false;
    data.currentPage = page;
    emit('change', {
        page: data.currentPage,
        pageSize: data.pageSize
    });
};

const nextPage = (step) => {
    data.currentPage += step;
    emit('change', {
        page: data.currentPage,
        pageSize: data.pageSize
    });
};

const prevPage = (step) => {
    data.currentPage -= step;
    data.currentPage = data.currentPage === 0 ? 1 : data.currentPage;
    emit('change', {
        page: data.currentPage,
        pageSize: data.pageSize
    });
};

onMounted(() => {
    data.currentPage = props.page;
    data.pages = Math.ceil(props.total / data.pageSize);
});

watch(
    () => props.total,
    (total) => {
        data.pages = Math.ceil(total / data.pageSize);
    }
);

return (_ctx, _cache) => {
  const _component_Icon = resolveComponent("Icon");

  return (data.pages > 1)
    ? (openBlock(), createElementBlock("ul", _hoisted_1$3, [
        createBaseVNode("li", _hoisted_2$2, [
          createVNode(IconButton, {
            class: "size-m",
            disabled: data.currentPage === 1,
            icon: "chevron-left",
            onClick: _cache[0] || (_cache[0] = $event => (prevPage(1)))
          }, null, 8, ["disabled"])
        ]),
        (openBlock(true), createElementBlock(Fragment, null, renderList(pagination.value, (page) => {
          return (openBlock(), createElementBlock("li", {
            key: page,
            title: page,
            onClick: withModifiers($event => (props.isShort ? openDropdownSearch($event) : changePage(page)), ["stop"]),
            class: normalizeClass({
                active: !props.isShort && data.currentPage === page,
                'active-short': props.isShort && data.opened
            })
          }, [
            (page === 'prev')
              ? (openBlock(), createBlock(IconButton, {
                  key: 0,
                  class: "size-s",
                  icon: "more-horizontal",
                  onClick: withModifiers(openDropdownSearch, ["stop"])
                }))
              : (page === 'next')
                ? (openBlock(), createBlock(IconButton, {
                    key: 1,
                    class: "size-s",
                    onClick: withModifiers(openDropdownSearch, ["stop"]),
                    icon: "more-horizontal"
                  }))
                : (openBlock(), createElementBlock("span", _hoisted_4$1, toDisplayString(page), 1))
          ], 10, _hoisted_3$2))
        }), 128)),
        createBaseVNode("li", _hoisted_5$1, [
          createVNode(IconButton, {
            class: "size-m",
            disabled: data.currentPage === data.pages,
            icon: "chevron-right",
            onClick: _cache[1] || (_cache[1] = $event => (nextPage(1)))
          }, null, 8, ["disabled"])
        ]),
        (props.showSizeChanger)
          ? (openBlock(), createBlock(_sfc_main$7, {
              key: 0,
              class: "noerror light",
              name: "pageSize",
              value: data.pageSize,
              clearable: false,
              onChange: changePageSize,
              optionList: props.pageOptions
            }, null, 8, ["value", "optionList"]))
          : createCommentVNode("", true),
        (openBlock(), createBlock(Teleport, { to: "body" }, [
          (data.opened)
            ? (openBlock(), createElementBlock("span", {
                key: 0,
                class: "modal-box-background",
                onClick: closeDropdownSearch
              }))
            : createCommentVNode("", true),
          withDirectives(createBaseVNode("div", {
            class: "search-page",
            ref_key: "searchPage",
            ref: searchPage
          }, [
            createVNode(Field, {
              class: "noerror light",
              type: "number",
              name: "searchStr",
              onChange: onSearchChange,
              placeholder: "10",
              icon: "search"
            }),
            createBaseVNode("ul", null, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(searchFilterPage.value, (page) => {
                return (openBlock(), createElementBlock("li", {
                  key: page,
                  class: normalizeClass({
                            selected: data.currentPage == page,
                            matched: data.searchPage == page
                        }),
                  onClick: $event => (changePage(+page))
                }, [
                  createBaseVNode("span", null, toDisplayString(page), 1),
                  withDirectives(createVNode(_component_Icon, { icon: "check" }, null, 512), [
                    [vShow, data.currentPage == page]
                  ])
                ], 10, _hoisted_6$1))
              }), 128))
            ])
          ], 512), [
            [vShow, data.opened]
          ])
        ]))
      ]))
    : createCommentVNode("", true)
}
}

};
const Pagination = /*#__PURE__*/_export_sfc(_sfc_main$3, [['__scopeId',"data-v-06693a19"]]);

const _hoisted_1$2 = ["placeholder", "disabled"];
const _hoisted_2$1 = ["title"];
const _hoisted_3$1 = { class: "actions-block" };
const _hoisted_4 = {
  key: 0,
  class: "box-input"
};
const _hoisted_5 = ["value", "onClick"];
const _hoisted_6 = { class: "error" };
const _hoisted_7 = {
  key: 0,
  class: "values"
};
const _hoisted_8 = {
  key: 0,
  class: "more"
};


const _sfc_main$2 = {
  __name: 'AutoComplete',
  props: {
    name: { type: String, default: '' },
    values: { type: Array, default: () => ([]) },
    icon: { type: String, default: '' },
    maxPreviewValuesCount: { type: [Number, null], default: null },
    maxValuesCount: { type: [Number, null], default: null },
    position: { type: Number, default: 0 },
    optionList: {
        type: Array,
        default: () => []
    },
    optionWidth: { type: [Number, null], default: null },
    placeholder: { type: String, default: '' },
    error: { type: String, default: '' },
    isError: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    useI18n: { type: Boolean, default: false },
    clearable: { type: Boolean, default: true }
},
  emits: ['change', 'search', 'clean'],
  setup(__props, { expose: __expose, emit: __emit }) {

const { t } = useI18n();
const field = ref(null);
const trigger = ref(null);
const slots = useSlots();

const props = __props;

const data = reactive({
    values: props.values,
    searchStr: props.maxValuesCount === 1 && props.values.length === 1 ? 
        (props.useI18n ? t(props.values[0].name) : props.values[0].name) : '',
    isOpenDropdown: false,
    isMobile: isMobile()
});

const previewValues = computed(() => {
    if (!props.maxPreviewValuesCount) {
        return data.values;
    }

    return data.values.slice(0, props.maxPreviewValuesCount);
});

const emit = __emit;

const clean = () => {
    if (field.value) {
        field.value.value = '';
    }
    data.searchStr = '';

    if (props.maxValuesCount && data.values.length === props.maxValuesCount) {
        data.values = [];
        emit('change', {
            name: props.name,
            values: [],
            position: props.position
        });
    }

    emit('search', '');
    emit('clean', '');
};

const toggleOpened = () => {
    if (props.disabled) {
        return;
    }

    data.isOpenDropdown = !data.isOpenDropdown;

    if (!data.isOpenDropdown) {
        return false;
    }
};

const toggleFieldOpened = () => {
    if (data.isOpenDropdown && data.isMobile) {
        return;
    }

    toggleOpened();
};

watch(() => props.values, (values) => {
    data.values = values || [];
});

const onChoose = (event, payload) => {
    if (data.values.find(item => item.code === payload.code)) {
        data.values.splice(data.values.indexOf(data.values.find(item => item.code === payload.code)), 1);
    } else {
        if (props.maxValuesCount && data.values.length === props.maxValuesCount) {
            data.values.pop();
        }

        data.values.unshift(payload);
    }

    emit('change', {
        name: props.name,
        values: data.values,
        position: props.position
    });

    if (props.maxValuesCount === 1 && data.values.length === 1) {
        data.searchStr = props.useI18n ? t(data.values[0].name) : data.values[0].name;
        data.isOpenDropdown = false;
    }
};

const removeValue = (value) => {
    if (data.values.indexOf(value) === -1) {
        return;
    }

    data.values.splice(data.values.indexOf(value), 1);

    emit('change', {
        name: props.name,
        values: data.values,
        position: props.position
    });
};

const onInput = (evn) => {
    if (data.values.length && props.maxValuesCount === data.values.length) {
        return;
    }

    data.isOpenDropdown = true;
    emit('search', evn.target.value);
};

const onBoxInput = (evn) => {
    data.searchStr = evn.target.value;
    onInput(evn);
};

__expose({
    clean
});


return (_ctx, _cache) => {
  const _component_Icon = resolveComponent("Icon");

  return (openBlock(), createElementBlock("div", {
    class: normalizeClass([
            props.icon ? 'with-icon' : '',
            props.isError ? 'with-error' : '',
            data.isOpenDropdown ? 'opened' : '',
            props.disabled ? 'disabled' : '',
            'autocomplete-field'
        ])
  }, [
    (unref(slots).trigger)
      ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "trigge-box",
          onClick: toggleFieldOpened,
          ref_key: "trigger",
          ref: trigger
        }, [
          renderSlot(_ctx.$slots, "trigger", {}, undefined, true)
        ], 512))
      : (openBlock(), createElementBlock("div", {
          key: 1,
          onClick: toggleFieldOpened
        }, [
          withDirectives(createBaseVNode("input", {
            autocomplete: "off",
            ref_key: "field",
            ref: field,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((data.searchStr) = $event)),
            placeholder: props.placeholder,
            disabled: props.disabled,
            class: normalizeClass({
                    clearable: props.clearable && data.searchStr && !props.disabled,
                    'pointer-events-none': props.maxValuesCount === 1 && data.values.length === 1,
                    'without-placeholder': !props.placeholder
                }),
            onInput: onInput,
            onKeyup: withKeys(onInput, ["enter"])
          }, null, 42, _hoisted_1$2), [
            [vModelText, data.searchStr]
          ]),
          createBaseVNode("span", {
            class: "placeholder",
            title: props.placeholder
          }, toDisplayString(props.placeholder), 9, _hoisted_2$1),
          (props.icon)
            ? (openBlock(), createBlock(_component_Icon, {
                key: 0,
                icon: props.icon
              }, null, 8, ["icon"]))
            : createCommentVNode("", true),
          createBaseVNode("div", _hoisted_3$1, [
            (props.clearable && data.searchStr && !props.disabled)
              ? (openBlock(), createBlock(IconButton, {
                  key: 0,
                  tabindex: "-1",
                  icon: "close",
                  class: "input-action tertiary size-s",
                  onClick: withModifiers(clean, ["stop"])
                }))
              : createCommentVNode("", true),
            createVNode(_component_Icon, {
              icon: "chevron-down",
              class: "arrow-down"
            })
          ])
        ])),
    (data.isOpenDropdown)
      ? (openBlock(), createBlock(_sfc_main$6, {
          key: 2,
          field: unref(slots).trigger ? trigger.value : field.value,
          width: props.optionWidth,
          onClose: toggleOpened,
          onOnSwipeBottom: toggleOpened
        }, {
          default: withCtx(() => [
            createBaseVNode("ul", null, [
              (data.isMobile)
                ? (openBlock(), createElementBlock("li", _hoisted_4, [
                    createVNode(Field, {
                      icon: props.icon,
                      placeholder: props.placeholder,
                      value: data.searchStr,
                      autofocus: true,
                      class: "noerror light with-placeholder",
                      onChange: onBoxInput
                    }, null, 8, ["icon", "placeholder", "value"])
                  ]))
                : createCommentVNode("", true),
              (openBlock(true), createElementBlock(Fragment, null, renderList(props.optionList, (option) => {
                return (openBlock(), createElementBlock("li", {
                  value: option.code,
                  key: option.code,
                  onClick: withModifiers($event => (onChoose($event, option)), ["stop"]),
                  class: normalizeClass({ selected: data.values.find(item => item.code === option.code) })
                }, [
                  renderSlot(_ctx.$slots, "option", { option: option }, () => [
                    createTextVNode(toDisplayString(props.useI18n ? unref(t)(option.name) : option.name), 1)
                  ], true),
                  withDirectives(createVNode(_component_Icon, {
                    icon: "check",
                    class: "check"
                  }, null, 512), [
                    [vShow, data.values.find(item => item.code === option.code)]
                  ])
                ], 10, _hoisted_5))
              }), 128))
            ])
          ]),
          _: 3
        }, 8, ["field", "width"]))
      : createCommentVNode("", true),
    createBaseVNode("span", _hoisted_6, toDisplayString(props.error), 1),
    createBaseVNode("div", null, [
      (props.maxValuesCount !== 1 && !!data.values.length)
        ? (openBlock(), createElementBlock("ul", _hoisted_7, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(previewValues.value, (item) => {
              return (openBlock(), createElementBlock("li", {
                key: item.code
              }, [
                renderSlot(_ctx.$slots, "value", { value: item }, () => [
                  createBaseVNode("span", null, toDisplayString(props.useI18n ? unref(t)(item.name) : item.name), 1)
                ], true),
                createVNode(IconButton, {
                  tabindex: "-1",
                  icon: "close",
                  disabled: props.disabled,
                  class: "tertiary size-m",
                  onClick: withModifiers($event => (removeValue(item)), ["stop"])
                }, null, 8, ["disabled", "onClick"])
              ]))
            }), 128)),
            (props.maxPreviewValuesCount && data.values?.length > props.maxPreviewValuesCount)
              ? (openBlock(), createElementBlock("li", _hoisted_8, [
                  createBaseVNode("span", null, [
                    createTextVNode(toDisplayString(unref(t)('ui.autocomplete.more')) + " ", 1),
                    createBaseVNode("b", null, toDisplayString(data.values.length - props.maxPreviewValuesCount), 1)
                  ])
                ]))
              : createCommentVNode("", true)
          ]))
        : createCommentVNode("", true)
    ])
  ], 2))
}
}

};
const AutoComplete = /*#__PURE__*/_export_sfc(_sfc_main$2, [['__scopeId',"data-v-f31ca770"]]);

const _hoisted_1$1 = {
  viewBox: "0 0 200 200",
  class: "progress-bar"
};
const _hoisted_2 = ["stroke-dasharray"];
const _hoisted_3 = ["innerHTML"];

    
const _sfc_main$1 = {
  __name: 'Progress',
  props: {
        title: { type: String, default: '' },
        value: { type: Number, default: 0 }
    },
  setup(__props) {

    const props = __props;

    const data = reactive({
        value: props.value
    });

    watch(
        () => props.value,
        async () => {
            let steps = 14;
            const letters = ((data.value).toString().split('.')[1] || '').length;
            const diff = +((props.value - data.value) / steps).toFixed(letters + 3);

            clearTimeout(data.timeout);

            const doIt = async () => {
                if (!steps) {
                    data.value = props.value;
                    return;
                }

                data.value += diff;
                steps -=1;

                clearTimeout(data.timeout);
                data.timeout = setTimeout(() => {
                    doIt();
                }, 10);
            };

            doIt();
        }
    );

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    (openBlock(), createElementBlock("svg", _hoisted_1$1, [
      _cache[0] || (_cache[0] = createBaseVNode("circle", {
        r: "80",
        cx: "100",
        cy: "100",
        fill: "none",
        "stroke-width": "12",
        stroke: "var(--light-500)"
      }, null, -1)),
      createBaseVNode("circle", {
        r: "80",
        cx: "100",
        cy: "100",
        fill: "none",
        "stroke-width": "12",
        stroke: "url(#progress-bar-gradient)",
        "stroke-linecap": "round",
        "stroke-dasharray": `${ (data.value * 502.4 / 100).toFixed(1) } 502.4`,
        "stroke-dashoffset": "0",
        class: "gradient",
        style: {"transform":"rotate(-90deg)","transform-origin":"center"}
      }, null, 8, _hoisted_2),
      _cache[1] || (_cache[1] = createBaseVNode("defs", null, [
        createBaseVNode("linearGradient", { id: "progress-bar-gradient" }, [
          createBaseVNode("stop", {
            offset: "0%",
            "stop-color": "var(--secondary-500)"
          }),
          createBaseVNode("stop", {
            offset: "100%",
            "stop-color": "var(--primary-500)"
          })
        ])
      ], -1))
    ])),
    (props.title)
      ? (openBlock(), createElementBlock("span", {
          key: 0,
          innerHTML: props.title
        }, null, 8, _hoisted_3))
      : createCommentVNode("", true)
  ]))
}
}

};
const Progress = /*#__PURE__*/_export_sfc(_sfc_main$1, [['__scopeId',"data-v-d5b0e62a"]]);

const _hoisted_1 = { class: "page-container" };
    
const _sfc_main = {
  __name: 'Empty',
  setup(__props) {

    stores.others();

    const locale = stores.locale();
    const modals = stores.modals();

    const { t } = useI18n();

    const data = reactive({
        genresStr: '',
        progress: 10,
        loader: {},
        theme: localStorage.theme || 'light'
    });

    const confirm1 = () => {
        modals.confirm({
            title: 'Подтверждение чего-то чего-то',
            body: 'Вы действительно хотите и не передумaете потом?',
            onOk: async () => {
                console.log(1);
            }
        });   
    };

    const confirm2 = () => {
        const confirmations = [{
            checked: false,
            name: 'Подтверди, что ты прочитaл'
        }];

        modals.confirm({
            title: 'Подтверждение чего-то тaм',
            body: 'Вы действительно хотите и не передумaете потом?',
            info: 'Внимaние, это нереaльно вaжно',
            success: 'Внимaние, это нереaльно вaжно',
            attention: 'Внимaние, это нереaльно вaжно',
            confirmations,
            onOk: async () => {
            }
        }); 
    };

    const confirm3 = () => {
        const confirmations = [{
            checked: false,
            name: 'Подтверди, что ты прочитaл'
        }];

        modals.confirm({
            title: 'Подтверждение чего-то тaм',
            body: 'Вы действительно хотите и не передумaете потом?',
            attention: 'Внимaние, это нереaльно вaжно',
            confirmations,
            additionFields: [
                {
                    checked: false,
                    name: 'Я прочитал условия чего-то там честное слово',
                    // type: 'period',
                    // placeholder: 'Дата релиза',
                    // enableTimePicker: true,
                    // values: null,
                    // validate: (item) => {
                    //     console.log(item);
                    //     // if (!item?.checked || item.values?.length === 2) {
                    //     //     return true;
                    //     // }
                    //     return false;
                    // }
                }
            ],
            onOk: async () => {
            }
        }); 
    };

    const welcome = () => {
        modals.open('welcome');
    };

    const onLanguageChange = (payload) => {
        locale.updateLocale(payload.value);
    };

    const toggleTheme = () => {
        // data.theme = data.theme === 'light' ? 'dark' : 'light';
        // others.setTheme(data.theme);
    };

    const success = () => message.success('Успешный success');
    const error = () => message.error('Успешный error');
    const info = () => message.info('Успешный info');

    const pageSizeOptions2 = [
        { icon: 'star', code: 10, name: 10 },
        { icon: 'play', code: 20, name: 20 },
        { icon: 'unlike', code: 30, name: 30 }
    ];

    const genres = [
        {
            "code": "trance-1",
            "name": "Trance"
        },
        {
            "code": "80s",
            "name": "80s"
        },
        {
            "code": "8-bit",
            "name": "8 bit"
        },
        {
            "code": "classical",
            "name": "Classical"
        },
        {
            "code": "country",
            "name": "Country"
        },
        {
            "code": "grunge",
            "name": "Grunge"
        },
        {
            "code": "guitar",
            "name": "Guitar"
        },
        {
            "code": "chill",
            "name": "Chill"
        },
        {
            "code": "dance",
            "name": "Dance"
        },
        {
            "code": "dubstep",
            "name": "Dubstep"
        },
        {
            "code": "trap-1",
            "name": "Trap"
        },
        {
            "code": "urban",
            "name": "Urban"
        },
        {
            "code": "disco",
            "name": "Disco"
        },
        {
            "code": "rap",
            "name": "Rap"
        },
        {
            "code": "reggae",
            "name": "Reggae"
        },
        {
            "code": "rock",
            "name": "Rock"
        },
        {
            "code": "blues",
            "name": "Blues"
        },
        {
            "code": "folk",
            "name": "Folk"
        },
        {
            "code": "cyberpunk",
            "name": "Cyberpunk"
        },
        {
            "code": "new-age",
            "name": "New age"
        },
        {
            "code": "epic",
            "name": "Epic"
        },
        {
            "code": "surf-rock",
            "name": "Surf Rock"
        },
        {
            "code": "world",
            "name": "World"
        },
        {
            "code": "instrumental",
            "name": "Instrumental"
        },
        {
            "code": "cinematic",
            "name": "Cinematic"
        },
        {
            "code": "synthwave",
            "name": "Synthwave"
        },
        {
            "code": "r-and-b",
            "name": "R&B"
        },
        {
            "code": "ambient-rock",
            "name": "Ambient Rock"
        },
        {
            "code": "alternative-rock",
            "name": "Alternative Rock"
        },
        {
            "code": "soul",
            "name": "Soul"
        },
        {
            "code": "orchestral",
            "name": "Orchestral"
        },
        {
            "code": "acoustic",
            "name": "Acoustic"
        },
        {
            "code": "indie",
            "name": "Indie"
        },
        {
            "code": "jazz",
            "name": "Jazz"
        },
        {
            "code": "electronic",
            "name": "Electronic"
        },
        {
            "code": "ambient",
            "name": "Ambient"
        },
        {
            "code": "house",
            "name": "House"
        },
        {
            "code": "techno",
            "name": "Techno"
        },
        {
            "code": "trailer",
            "name": "Trailer"
        },
        {
            "code": "pop",
            "name": "Pop"
        },
        {
            "code": "funk",
            "name": "Funk"
        },
        {
            "code": "vintage",
            "name": "Vintage"
        },
        {
            "code": "future-bass",
            "name": "Future Bass"
        },
        {
            "code": "piano",
            "name": "Piano"
        },
        {
            "code": "hard-rock-and-metal",
            "name": "Hard Rock and Metal"
        },
        {
            "code": "chillwave",
            "name": "Chillwave"
        },
        {
            "code": "hip-hop",
            "name": "Hip Hop"
        }
    ];

    const genresOptions = computed(() => {
        const str = data.genresStr?.trim().toLowerCase(); 
        return str.length ? genres.filter(item => item.name.toLowerCase().indexOf(str) !== -1) : genres;
    });

    const onSearchGenresTiming = async (value) => {
        console.log(value);
        data.genresStr = value;
    };

    const onSearchGenresTimingChange = ({ values }) => {
        console.log(values);
    };

return (_ctx, _cache) => {
  const _component_Icon = resolveComponent("Icon");

  return (openBlock(), createElementBlock("div", _hoisted_1, [
    createBaseVNode("div", null, [
      createVNode(DateField, {
        autoApply: true,
        range: true,
        "text-input": true,
        placeholder: 'Введите что-то',
        class: "light"
      }),
      createVNode(DateField, {
        "text-input": true,
        range: false,
        placeholder: 'Введите что-то',
        class: "light"
      })
    ]),
    createBaseVNode("div", null, [
      createVNode(Button, {
        name: "confirm 1",
        onClick: confirm1
      }),
      createVNode(Button, {
        name: "confirm 2",
        onClick: confirm2
      }),
      createVNode(Button, {
        name: "confirm 3",
        onClick: confirm3
      })
    ]),
    createBaseVNode("div", null, [
      createVNode(Button, {
        name: "open welcome modal",
        onClick: welcome
      })
    ]),
    createBaseVNode("div", null, [
      createVNode(_sfc_main$7, {
        placeholder: "Language",
        class: "noerror",
        optionList: unref(locale).languages,
        value: unref(locale).locale,
        onChange: onLanguageChange
      }, null, 8, ["optionList", "value"]),
      createTextVNode(" " + toDisplayString(unref(t)('common.close')), 1)
    ]),
    createBaseVNode("div", null, [
      createVNode(Toggler, {
        disabled: "",
        name: "Theme",
        checked: data.theme !== 'light',
        onClick: toggleTheme
      }, null, 8, ["checked"])
    ]),
    createBaseVNode("div", null, [
      createVNode(Button, {
        name: "show loading",
        onClick: _cache[0] || (_cache[0] = $event => (data.loading = true))
      }),
      (data.loading)
        ? (openBlock(), createBlock(Loader, {
            key: 0,
            class: "light"
          }))
        : createCommentVNode("", true)
    ]),
    createBaseVNode("div", null, [
      createVNode(Button, {
        name: "Listen",
        loading: data.loader.q,
        onClick: _cache[1] || (_cache[1] = $event => (data.loader.q = !data.loader.q))
      }, null, 8, ["loading"]),
      createVNode(Button, {
        name: "Listen music",
        loading: data.loader.w,
        onClick: _cache[2] || (_cache[2] = $event => (data.loader.w = !data.loader.w))
      }, null, 8, ["loading"]),
      createVNode(Button, {
        name: "Listen music",
        class: "size-s",
        loading: data.loader.e,
        onClick: _cache[3] || (_cache[3] = $event => (data.loader.e = !data.loader.e))
      }, null, 8, ["loading"]),
      createVNode(Button, {
        name: "Listen",
        class: "secondary",
        loading: data.loader.a,
        onClick: _cache[4] || (_cache[4] = $event => (data.loader.a = !data.loader.a))
      }, null, 8, ["loading"]),
      createVNode(Button, {
        name: "Listen music",
        class: "secondary size-s",
        loading: data.loader.s,
        onClick: _cache[5] || (_cache[5] = $event => (data.loader.s = !data.loader.s))
      }, null, 8, ["loading"]),
      createVNode(Button, {
        name: "Listen",
        class: "tertiary",
        loading: data.loader.z,
        onClick: _cache[6] || (_cache[6] = $event => (data.loader.z = !data.loader.z))
      }, null, 8, ["loading"]),
      createVNode(Button, {
        name: "Listen music",
        class: "tertiary size-s",
        loading: data.loader.x,
        onClick: _cache[7] || (_cache[7] = $event => (data.loader.x = !data.loader.x))
      }, null, 8, ["loading"])
    ]),
    createBaseVNode("div", null, [
      createVNode(Progress, {
        value: data.progress,
        title: "Upload the song"
      }, null, 8, ["value"]),
      createVNode(Button, {
        name: "add 10",
        onClick: _cache[8] || (_cache[8] = $event => (data.progress += 10))
      })
    ]),
    createBaseVNode("div", null, [
      createVNode(EmptyLabel, {
        title: "Песни не найдены",
        description: "Эй, быть может это потому что тут просто верстка компонентов, бэк ведь ещё не интегрирован"
      })
    ]),
    createBaseVNode("div", null, [
      createVNode(AutoComplete, {
        placeholder: "Genres",
        optionList: genresOptions.value,
        class: "noerror light",
        onSearch: onSearchGenresTiming,
        onChange: onSearchGenresTimingChange
      }, null, 8, ["optionList"])
    ]),
    createBaseVNode("div", null, [
      createVNode(AutoComplete, {
        placeholder: "Genres",
        optionList: genresOptions.value,
        maxValuesCount: 1,
        class: "noerror light",
        onSearch: onSearchGenresTiming,
        onChange: onSearchGenresTimingChange
      }, null, 8, ["optionList"])
    ]),
    createBaseVNode("div", null, [
      createVNode(Toggler, {
        name: "Бесплaтно для некоммерческого использовaния",
        checked: true
      }),
      createVNode(Toggler, {
        name: "Бесплaтно для некоммерческого использовaния",
        checked: true,
        disabled: true
      }),
      createVNode(Toggler, {
        name: "Бесплaтно для некоммерческого использовaния",
        disabled: true
      })
    ]),
    createBaseVNode("div", null, [
      createVNode(Toggler, {
        inline: true,
        name: "Нaдо срочно что-то переключить",
        checked: true
      }),
      createVNode(Toggler, {
        inline: true,
        name: "Нaдо срочно что-то переключить",
        disabled: true,
        checked: true
      })
    ]),
    createBaseVNode("div", null, [
      createVNode(Toggler, {
        inline: true,
        name: "Нaдо срочно что-то переключить"
      }),
      createVNode(Toggler, {
        inline: true,
        disabled: "",
        name: "Нaдо срочно что-то переключить"
      })
    ]),
    createBaseVNode("div", null, [
      createBaseVNode("div", null, [
        createVNode(Pagination, {
          isShort: true,
          page: 5,
          total: 2000,
          pageSize: 20
        })
      ])
    ]),
    createBaseVNode("div", null, [
      createBaseVNode("div", null, [
        createVNode(Pagination, {
          page: 5,
          total: 2000,
          pageSize: 20
        })
      ])
    ]),
    createBaseVNode("div", null, [
      createBaseVNode("div", null, [
        createVNode(Pagination, {
          page: 5,
          total: 2000,
          pageSize: 20,
          showSizeChanger: true
        })
      ])
    ]),
    createBaseVNode("div", null, [
      createVNode(Range, {
        style: {"width":"320px"},
        value: 40
      })
    ]),
    createBaseVNode("div", null, [
      createVNode(_sfc_main$5, {
        icon: "settings",
        leftAuto: false,
        rightAuto: true,
        secondary: true
      }, {
        default: withCtx(() => [
          createBaseVNode("ul", null, [
            createBaseVNode("li", null, [
              createVNode(_component_Icon, { icon: "microphone" }),
              _cache[10] || (_cache[10] = createBaseVNode("span", null, "Add to favorite", -1))
            ]),
            createBaseVNode("li", null, [
              createVNode(_component_Icon, { icon: "message" }),
              _cache[11] || (_cache[11] = createBaseVNode("span", null, "Remove it", -1))
            ]),
            createBaseVNode("li", {
              class: "range-box",
              onClick: _cache[9] || (_cache[9] = withModifiers(() => {}, ["stop"]))
            }, [
              createVNode(_component_Icon, { icon: "candlestick" }),
              createVNode(Range, { value: 50 }),
              _cache[12] || (_cache[12] = createBaseVNode("label", null, "50 %", -1))
            ])
          ])
        ]),
        _: 1
      }),
      createVNode(_sfc_main$5, {
        leftAuto: false,
        rightAuto: true
      }, {
        default: withCtx(() => [
          createBaseVNode("ul", null, [
            createBaseVNode("li", null, [
              createVNode(_component_Icon, { icon: "microphone" }),
              _cache[13] || (_cache[13] = createBaseVNode("span", null, "Add to favorite", -1))
            ]),
            createBaseVNode("li", null, [
              createVNode(_component_Icon, { icon: "message" }),
              _cache[14] || (_cache[14] = createBaseVNode("span", null, "Remove it", -1))
            ]),
            createBaseVNode("li", null, [
              createVNode(_component_Icon, { icon: "zip" }),
              _cache[15] || (_cache[15] = createBaseVNode("span", null, "Something any", -1))
            ]),
            createBaseVNode("li", null, [
              createVNode(_component_Icon, { icon: "verified" }),
              _cache[16] || (_cache[16] = createBaseVNode("span", null, "I dont know", -1))
            ])
          ])
        ]),
        _: 1
      }),
      createVNode(_sfc_main$5, {
        secondary: true,
        leftAuto: false,
        rightAuto: true
      }, {
        default: withCtx(() => [
          createBaseVNode("ul", null, [
            createBaseVNode("li", null, [
              createVNode(_component_Icon, { icon: "microphone" }),
              _cache[17] || (_cache[17] = createBaseVNode("span", null, "Add to favorite", -1))
            ]),
            createBaseVNode("li", null, [
              createVNode(_component_Icon, { icon: "message" }),
              _cache[18] || (_cache[18] = createBaseVNode("span", null, "Remove it", -1))
            ]),
            createBaseVNode("li", null, [
              createVNode(_component_Icon, { icon: "zip" }),
              _cache[19] || (_cache[19] = createBaseVNode("span", null, "Something any", -1))
            ]),
            createBaseVNode("li", null, [
              createVNode(_component_Icon, { icon: "verified" }),
              _cache[20] || (_cache[20] = createBaseVNode("span", null, "I dont know", -1))
            ])
          ])
        ]),
        _: 1
      }),
      createVNode(_sfc_main$5, {
        leftAuto: false,
        rightAuto: true,
        size: "size-l"
      }, {
        default: withCtx(() => [
          createBaseVNode("ul", null, [
            createBaseVNode("li", null, [
              createVNode(_component_Icon, { icon: "microphone" }),
              _cache[21] || (_cache[21] = createBaseVNode("span", null, "Add to favorite", -1))
            ]),
            createBaseVNode("li", null, [
              createVNode(_component_Icon, { icon: "message" }),
              _cache[22] || (_cache[22] = createBaseVNode("span", null, "Remove it", -1))
            ]),
            createBaseVNode("li", null, [
              createVNode(_component_Icon, { icon: "zip" }),
              _cache[23] || (_cache[23] = createBaseVNode("span", null, "Something any", -1))
            ]),
            createBaseVNode("li", null, [
              createVNode(_component_Icon, { icon: "verified" }),
              _cache[24] || (_cache[24] = createBaseVNode("span", null, "I dont know", -1))
            ])
          ])
        ]),
        _: 1
      }),
      createVNode(_sfc_main$5, {
        secondary: true,
        leftAuto: false,
        rightAuto: true,
        size: "size-m"
      }, {
        default: withCtx(() => [
          createBaseVNode("ul", null, [
            createBaseVNode("li", null, [
              createVNode(_component_Icon, { icon: "microphone" }),
              _cache[25] || (_cache[25] = createBaseVNode("span", null, "Add to favorite", -1))
            ]),
            createBaseVNode("li", null, [
              createVNode(_component_Icon, { icon: "message" }),
              _cache[26] || (_cache[26] = createBaseVNode("span", null, "Remove it", -1))
            ]),
            createBaseVNode("li", null, [
              createVNode(_component_Icon, { icon: "zip" }),
              _cache[27] || (_cache[27] = createBaseVNode("span", null, "Something any", -1))
            ]),
            createBaseVNode("li", null, [
              createVNode(_component_Icon, { icon: "verified" }),
              _cache[28] || (_cache[28] = createBaseVNode("span", null, "I dont know", -1))
            ])
          ])
        ]),
        _: 1
      }),
      createVNode(_sfc_main$5, {
        secondary: true,
        leftAuto: false,
        rightAuto: true,
        size: "size-s"
      }, {
        default: withCtx(() => [
          createBaseVNode("ul", null, [
            createBaseVNode("li", null, [
              createVNode(_component_Icon, { icon: "microphone" }),
              _cache[29] || (_cache[29] = createBaseVNode("span", null, "Add to favorite", -1))
            ]),
            createBaseVNode("li", null, [
              createVNode(_component_Icon, { icon: "message" }),
              _cache[30] || (_cache[30] = createBaseVNode("span", null, "Remove it", -1))
            ]),
            createBaseVNode("li", null, [
              createVNode(_component_Icon, { icon: "zip" }),
              _cache[31] || (_cache[31] = createBaseVNode("span", null, "Something any", -1))
            ]),
            createBaseVNode("li", null, [
              createVNode(_component_Icon, { icon: "verified" }),
              _cache[32] || (_cache[32] = createBaseVNode("span", null, "I dont know", -1))
            ])
          ])
        ]),
        _: 1
      }),
      createVNode(_sfc_main$5, {
        tertiary: true,
        leftAuto: false,
        rightAuto: true,
        size: "size-s"
      }, {
        default: withCtx(() => [
          createBaseVNode("ul", null, [
            createBaseVNode("li", null, [
              createVNode(_component_Icon, { icon: "microphone" }),
              _cache[33] || (_cache[33] = createBaseVNode("span", null, "Add to favorite", -1))
            ]),
            createBaseVNode("li", null, [
              createVNode(_component_Icon, { icon: "message" }),
              _cache[34] || (_cache[34] = createBaseVNode("span", null, "Remove it", -1))
            ]),
            createBaseVNode("li", null, [
              createVNode(_component_Icon, { icon: "zip" }),
              _cache[35] || (_cache[35] = createBaseVNode("span", null, "Something any", -1))
            ]),
            createBaseVNode("li", null, [
              createVNode(_component_Icon, { icon: "verified" }),
              _cache[36] || (_cache[36] = createBaseVNode("span", null, "I dont know", -1))
            ])
          ])
        ]),
        _: 1
      })
    ]),
    _cache[37] || (_cache[37] = createStaticVNode("<div data-v-c05efee7><ul data-v-c05efee7><li data-v-c05efee7><input type=\"checkbox\" id=\"checkbox-1\" data-v-c05efee7><label for=\"checkbox-1\" data-v-c05efee7>Какой-то чекбокс</label></li><li data-v-c05efee7><input type=\"checkbox\" id=\"checkbox-2\" disabled data-v-c05efee7><label for=\"checkbox-2\" data-v-c05efee7>Какой-то чекбокс</label></li><li data-v-c05efee7><input type=\"checkbox\" id=\"checkbox-3\" disabled checked data-v-c05efee7><label for=\"checkbox-3\" data-v-c05efee7>Какой-то чекбокс</label></li><li data-v-c05efee7><input name=\"radio\" type=\"radio\" id=\"radio-1\" data-v-c05efee7><label for=\"radio-1\" data-v-c05efee7>Какой-то radio 1</label></li><li data-v-c05efee7><input name=\"radio\" type=\"radio\" id=\"radio-2\" data-v-c05efee7><label for=\"radio-2\" data-v-c05efee7>Какой-то radio 2</label></li><li data-v-c05efee7><input name=\"radio\" type=\"radio\" id=\"radio-3\" data-v-c05efee7><label for=\"radio-3\" data-v-c05efee7>Какой-то radio 3</label></li><li data-v-c05efee7><input name=\"radio\" type=\"radio\" id=\"radio-4\" disabled data-v-c05efee7><label for=\"radio-4\" data-v-c05efee7>Какой-то radio 4</label></li><li data-v-c05efee7><input name=\"radio\" type=\"radio\" id=\"radio-5\" checked disabled data-v-c05efee7><label for=\"radio-5\" data-v-c05efee7>Какой-то radio 5</label></li></ul></div>", 1)),
    createBaseVNode("div", null, [
      createVNode(Field, {
        class: "noerror",
        icon: "microphone",
        placeholder: "Введите что-то",
        name: "login",
        autocomplete: "on"
      }),
      createVNode(Field, {
        class: "noerror",
        placeholder: "Введите что-то",
        name: "login",
        autocomplete: "on"
      }),
      createVNode(_sfc_main$7, {
        placeholder: "Выберите что-то",
        class: "noerror",
        optionList: unref(pageSizeOptions)
      }, null, 8, ["optionList"]),
      createVNode(_sfc_main$7, {
        icon: "exit",
        placeholder: "Выберите что-то с иконкaми",
        class: "noerror",
        optionList: pageSizeOptions2
      })
    ]),
    createBaseVNode("div", null, [
      createVNode(Field, {
        icon: "microphone",
        placeholder: "Введите что-то",
        name: "login",
        autocomplete: "on",
        class: "light"
      }),
      createVNode(Field, {
        placeholder: "Введите что-то",
        name: "login",
        autocomplete: "on",
        class: "light"
      }),
      createVNode(Field, {
        placeholder: "Введите что-то",
        name: "login",
        autocomplete: "on",
        class: "light",
        info: "Какой-то текст для пояснения"
      }),
      createVNode(Field, {
        placeholder: "Время",
        class: "light",
        type: "time",
        info: "Какой-то текст для пояснения"
      })
    ]),
    createBaseVNode("div", null, [
      createVNode(Field, {
        icon: "microphone",
        placeholder: "Введите что-то",
        name: "login",
        autocomplete: "on",
        isError: true,
        error: "То, что вы сказали, является"
      }),
      createVNode(Field, {
        icon: "microphone",
        placeholder: "Введите что-то",
        name: "login",
        autocomplete: "on",
        class: "light",
        isError: true,
        error: "То, что вы сказали, является"
      }),
      createVNode(Field, {
        placeholder: "Введите что-то",
        name: "login",
        autocomplete: "on",
        class: "light",
        isError: true
      })
    ]),
    createBaseVNode("div", null, [
      createVNode(Field, {
        placeholder: "Введите что-то",
        name: "login",
        autocomplete: "on",
        class: "inside"
      }),
      createVNode(Field, {
        icon: "microphone",
        placeholder: "Введите что-то",
        name: "login",
        autocomplete: "on",
        class: "light inside"
      }),
      createVNode(Field, {
        placeholder: "Введите что-то",
        name: "login",
        autocomplete: "on",
        class: "light inside",
        info: "Какой-то текст для пояснения"
      }),
      createVNode(_sfc_main$7, {
        placeholder: "Выберите что-то",
        class: "noerror light",
        optionList: unref(pageSizeOptions)
      }, null, 8, ["optionList"])
    ]),
    createBaseVNode("div", null, [
      createVNode(Field, {
        icon: "microphone",
        placeholder: "Введите что-то",
        autocomplete: "on",
        disabled: ""
      }),
      createVNode(Field, {
        placeholder: "Введите что-то",
        name: "login",
        autocomplete: "on",
        value: "sdfjsdf",
        disabled: ""
      }),
      createVNode(Field, {
        icon: "microphone",
        placeholder: "Введите что-то",
        name: "login",
        autocomplete: "on",
        class: "light",
        disabled: ""
      }),
      createVNode(Field, {
        placeholder: "Введите что-то",
        name: "login",
        autocomplete: "on",
        class: "light",
        value: "sdfjsdf",
        disabled: ""
      })
    ]),
    createBaseVNode("div", null, [
      createVNode(_component_Icon, { icon: "star" }),
      createVNode(_component_Icon, { icon: "map-pin" }),
      createVNode(_component_Icon, { icon: "apps" }),
      createVNode(_component_Icon, { icon: "home" }),
      createVNode(_component_Icon, { icon: "sliders" }),
      createVNode(_component_Icon, { icon: "trash" }),
      createVNode(_component_Icon, { icon: "share" }),
      createVNode(_component_Icon, { icon: "bell" }),
      createVNode(_component_Icon, { icon: "picture" }),
      createVNode(_component_Icon, { icon: "search" }),
      createVNode(_component_Icon, { icon: "zip" }),
      createVNode(_component_Icon, { icon: "unlike" }),
      createVNode(_component_Icon, { icon: "verified" }),
      createVNode(_component_Icon, { icon: "loupe-plus" }),
      createVNode(_component_Icon, { icon: "loupe-minus" }),
      createVNode(_component_Icon, { icon: "minimize" }),
      createVNode(_component_Icon, { icon: "maximaze" }),
      createVNode(_component_Icon, { icon: "headphones" }),
      createVNode(_component_Icon, { icon: "message" }),
      createVNode(_component_Icon, { icon: "email" }),
      createVNode(_component_Icon, { icon: "lock" }),
      createVNode(_component_Icon, { icon: "filter" }),
      createVNode(_component_Icon, { icon: "paperclip" }),
      createVNode(_component_Icon, { icon: "exclamation" }),
      createVNode(_component_Icon, { icon: "close" }),
      createVNode(_component_Icon, { icon: "help" }),
      createVNode(_component_Icon, { icon: "settings" }),
      createVNode(_component_Icon, { icon: "copy" }),
      createVNode(_component_Icon, { icon: "plus" }),
      createVNode(_component_Icon, { icon: "minus" }),
      createVNode(_component_Icon, { icon: "more-horizontal" }),
      createVNode(_component_Icon, { icon: "more-vertical" }),
      createVNode(_component_Icon, { icon: "wallet" }),
      createVNode(_component_Icon, { icon: "candlestick" }),
      createVNode(_component_Icon, { icon: "arrow-left" }),
      createVNode(_component_Icon, { icon: "chevron-down" }),
      createVNode(_component_Icon, { icon: "chevron-up" }),
      createVNode(_component_Icon, { icon: "chevron-right" }),
      createVNode(_component_Icon, { icon: "chevron-left" }),
      createVNode(_component_Icon, { icon: "download" }),
      createVNode(_component_Icon, { icon: "upload" }),
      createVNode(_component_Icon, { icon: "exit" }),
      createVNode(_component_Icon, { icon: "refresh" }),
      createVNode(_component_Icon, { icon: "random" }),
      createVNode(_component_Icon, { icon: "repeat" }),
      createVNode(_component_Icon, { icon: "microphone" }),
      createVNode(_component_Icon, { icon: "microphone-off" }),
      createVNode(_component_Icon, { icon: "sound" }),
      createVNode(_component_Icon, { icon: "sound-off" }),
      createVNode(_component_Icon, { icon: "player-back" }),
      createVNode(_component_Icon, { icon: "player-forward" }),
      createVNode(_component_Icon, { icon: "pause" }),
      createVNode(_component_Icon, { icon: "play" }),
      createVNode(_component_Icon, { icon: "backward-5" }),
      createVNode(_component_Icon, { icon: "backward-10" }),
      createVNode(_component_Icon, { icon: "forward-5" }),
      createVNode(_component_Icon, { icon: "forward-10" }),
      createVNode(_component_Icon, { icon: "replay" }),
      createVNode(_component_Icon, { icon: "note" }),
      createVNode(_component_Icon, { icon: "note-2" }),
      createVNode(_component_Icon, { icon: "user" }),
      createVNode(_component_Icon, { icon: "calendar" }),
      createVNode(_component_Icon, { icon: "clock" })
    ]),
    createBaseVNode("div", null, [
      createVNode(IconButton, {
        class: "round size-xl",
        icon: "play"
      })
    ]),
    createBaseVNode("div", null, [
      createVNode(Button, {
        name: "Listen",
        icon: "microphone",
        class: "secondary",
        onClick: error
      }),
      createVNode(Button, {
        name: "Listen",
        onClick: success
      }),
      createVNode(Button, {
        name: "Listen",
        icon: "microphone",
        onClick: error
      }),
      createVNode(Button, {
        name: "Listen",
        icon: "microphone",
        class: "tertiary",
        onClick: error
      }),
      createVNode(IconButton, {
        name: "Listen",
        icon: "microphone"
      }),
      createVNode(IconButton, {
        class: "tertiary",
        icon: "microphone",
        onClick: info
      })
    ]),
    createBaseVNode("div", null, [
      createVNode(Button, {
        name: "Listen",
        class: "size-l"
      }),
      createVNode(IconButton, {
        name: "Listen",
        class: "size-l",
        icon: "microphone"
      })
    ]),
    createBaseVNode("div", null, [
      createVNode(Button, {
        name: "Listen",
        class: "size-m"
      }),
      createVNode(Button, {
        name: "Listen",
        class: "size-m",
        icon: "microphone"
      }),
      createVNode(IconButton, {
        name: "Listen",
        class: "size-m",
        icon: "microphone"
      }),
      createVNode(IconButton, {
        name: "Listen",
        class: "size-m tertiary",
        icon: "microphone"
      })
    ]),
    createBaseVNode("div", null, [
      createVNode(Button, {
        name: "Listen",
        class: "size-s"
      }),
      createVNode(IconButton, {
        name: "Listen",
        class: "size-s",
        icon: "microphone"
      })
    ]),
    createBaseVNode("div", null, [
      createVNode(Button, {
        name: "Listen",
        class: "size-m",
        disabled: ""
      }),
      createVNode(IconButton, {
        name: "Listen",
        class: "size-m",
        disabled: "",
        icon: "microphone"
      })
    ]),
    createBaseVNode("div", null, [
      createVNode(Button, {
        name: "Play",
        class: "secondary"
      }),
      createVNode(IconButton, {
        name: "Play",
        class: "secondary",
        icon: "microphone"
      })
    ]),
    createBaseVNode("div", null, [
      createVNode(Button, {
        name: "Listen",
        class: "size-l secondary"
      }),
      createVNode(IconButton, {
        name: "Listen",
        class: "size-l secondary",
        icon: "microphone"
      })
    ])
  ]))
}
}

};
const Empty = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-c05efee7"]]);

export { Empty as default };
//# sourceMappingURL=Empty-DiTPiXb9.js.map
