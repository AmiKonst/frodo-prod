import { _ as _export_sfc, l as computed, c as createElementBlock, f as openBlock, F as Fragment, p as renderList, q as normalizeClass, s as stores, j as storeToRefs, u as useI18n, r as reactive, U as resolveDirective, b as createBlock, w as withCtx, D as withDirectives, n as createBaseVNode, B as normalizeStyle, i as unref, Z as baseUrl, y as toDisplayString, d as createCommentVNode, e as createVNode, Y as createTextVNode, H as Button, C as withModifiers, L as BaseModal } from './index-B832Ct45.js';

const _sfc_main$1 = {
  __name: 'Steps',
  props: {
        total: { type: Number, default: 1 },
        value: { type: Number, default: 1 }
    },
  setup(__props) {

    const props = __props;

    const items = computed(() => {
        return Array(props.total);
    });

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("ul", null, [
    (openBlock(true), createElementBlock(Fragment, null, renderList(items.value, (item, id) => {
      return (openBlock(), createElementBlock("li", {
        class: normalizeClass({ active: id + 1 === props.value })
      }, null, 2))
    }), 256))
  ]))
}
}

};
const Steps = /*#__PURE__*/_export_sfc(_sfc_main$1, [['__scopeId',"data-v-04011cd1"]]);

const _hoisted_1 = ["innerHTML"];
const _hoisted_2 = { class: "description" };
const _hoisted_3 = ["innerHTML"];
const _hoisted_4 = { class: "description" };
const _hoisted_5 = {
  key: 1,
  class: "enter-box"
};


const _sfc_main = {
  __name: 'ModalWelcome',
  setup(__props) {

const others = stores.others();
const tg = stores.tg();
const { theme } = storeToRefs(others);

const modals = stores.modals();


const { t, tm, rt } = useI18n();

const slides = Array.isArray(tm('modals.welcome.slides')) ? tm('modals.welcome.slides').map(item => ({
    code: rt(item.code),
    title: rt(item.title),
    description: rt(item.description)
})) : [];

const data = reactive({
    slides: [slides[0]]
});

const id = computed(() => {
    return slides.findIndex(item => item.code === data.slides[data.slides.length - 1].code);
});

const next = () => {
    let nextId = id.value;

    if (nextId === -1) {
        return;
    }

    nextId += 1;
    if (nextId > slides.length - 1) {
        nextId = 0;
    }

    data.slides.push(slides[nextId]);
};

const prev = () => {
    let nextId = id.value;

    if (nextId === -1) {
        return;
    }

    nextId -= 1;
    if (nextId < 0) {
        nextId = slides.length - 1;
    }

    data.slides.push(slides[nextId]);
};

const close = () => {
    localStorage.welcome = true;

    modals.close('welcome');
};

return (_ctx, _cache) => {
  const _directive_touch = resolveDirective("touch");

  return (openBlock(), createBlock(BaseModal, {
    name: "loader",
    full: true
  }, {
    content: withCtx(() => [
      withDirectives((openBlock(), createElementBlock("div", {
        class: "welcome-box",
        onClick: next
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(data.slides, (item, itemId) => {
          return (openBlock(), createElementBlock("div", {
            key: itemId,
            style: normalizeStyle({
                        'background-image': `url(${unref(baseUrl)}/themes/${unref(theme)}/welcome/${item.code}.jpg)`,
                        'background-color': 'var(--white-500)'
                    })
          }, [
            createBaseVNode("label", {
              class: "title",
              innerHTML: item.title
            }, null, 8, _hoisted_1),
            createBaseVNode("div", _hoisted_2, toDisplayString(item.description), 1)
          ], 4))
        }), 128)),
        createBaseVNode("div", null, [
          createBaseVNode("label", {
            class: "title",
            innerHTML: data.slides[data.slides.length - 1].title
          }, null, 8, _hoisted_3),
          createBaseVNode("div", _hoisted_4, toDisplayString(data.slides[data.slides.length - 1].description), 1),
          (id.value !== unref(slides).length - 1)
            ? (openBlock(), createBlock(Steps, {
                key: 0,
                total: 3,
                value: id.value + 1
              }, null, 8, ["value"]))
            : createCommentVNode("", true),
          (id.value === unref(slides).length - 1)
            ? (openBlock(), createElementBlock("div", _hoisted_5, [
                createBaseVNode("div", null, [
                  createBaseVNode("span", null, [
                    createTextVNode(toDisplayString(unref(t)('modals.welcome.terms')) + " ", 1),
                    createVNode(Button, {
                      name: unref(t)('modals.welcome.terms-button'),
                      class: "tertiary size-s",
                      onClick: _cache[0] || (_cache[0] = withModifiers($event => (unref(tg).openLink({
                                        'external_url': 'https://github.com/Bilbo-Music/bilbo-docs-public/blob/main/terms%20of%20service/Bilbo%20Music.md'
                                    })), ["stop"]))
                    }, null, 8, ["name"]),
                    createTextVNode(" " + toDisplayString(unref(t)('modals.welcome.terms-2')), 1)
                  ])
                ]),
                createVNode(Button, {
                  name: unref(t)('modals.welcome.close'),
                  onClick: close
                }, null, 8, ["name"])
              ]))
            : createCommentVNode("", true)
        ])
      ])), [
        [
          _directive_touch,
          next,
          "swipe",
          { left: true }
        ],
        [
          _directive_touch,
          prev,
          "swipe",
          { right: true }
        ]
      ])
    ]),
    _: 1
  }))
}
}

};
const ModalWelcome = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-179a1bcb"]]);

export { ModalWelcome as default };
//# sourceMappingURL=ModalWelcome-B6h4UVOc.js.map
