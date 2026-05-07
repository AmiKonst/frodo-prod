import { _ as _export_sfc, s as stores, v as ref, o as onMounted, a1 as onUnmounted, w as watch, c as createElementBlock, f as openBlock, u as useI18n, r as reactive, g as api, X as resolveDirective, b as createBlock, k as withCtx, l as createBaseVNode, F as Fragment, m as renderList, n as normalizeClass, e as createVNode, a2 as Icon, E as withDirectives, d as createCommentVNode, y as normalizeStyle, h as unref, B as Button, L as BaseModal } from './index-DfObEICq.js';
import { a as REACTIONS_BY_ENTITY } from './reaction-BpWSoPWU.js';

const _sfc_main$1 = {
  __name: 'TgsViewer',
  props: {
    url: { type: String, required: true },
    size: { type: Number, default: 240 }
},
  setup(__props) {

const props = __props;

const tgs = stores.tgs();
const canvasRef = ref(null);
let ctx = null;
const viewerInstance = {
    resource: null,
    isVisible: false,
    draw: () => {
        if (!ctx || !viewerInstance.resource || !viewerInstance.isVisible) {
            return;
        }

        const img = viewerInstance.resource.render();
        if (img) {
            ctx.clearRect(0, 0, props.size, props.size);
            ctx.drawImage(img, 0, 0, props.size, props.size);
        }
    }
};

const initViewer = async () => {
    if (viewerInstance.resource) {
        viewerInstance.resource.release();
        tgs.disposeSticker(viewerInstance.resource.url);
    }

    const res = await tgs.createCacheSticker(props.url, props.size);
    res.acquire();
    
    // Обновляем ресурс в стабильном объекте
    viewerInstance.resource = res;
    
    // Если стор уже крутит цикл, отрисовка начнется автоматически
};

const setupCanvas = () => {
    const canvas = canvasRef.value;
    if (!canvas) {
        return;
    }

    canvas.width = props.size * tgs.dpr;
    canvas.height = props.size * tgs.dpr;
    canvas.style.width = `${props.size}px`;
    canvas.style.height = `${props.size}px`;
    ctx = canvas.getContext('2d');
    ctx.scale(tgs.dpr, tgs.dpr);
};

// Создаем наблюдатель
let observer = null;

onMounted(async () => {
    setupCanvas();
    await tgs.init();

    observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            viewerInstance.isVisible = entry.isIntersecting;
        });
    }, { threshold: 0.1 }); // 10% канваса - тогда видно

    if (canvasRef.value) {
        observer.observe(canvasRef.value);
    }

    
    // Регистрируем пустой вьювер в глобальный цикл
    tgs.registerViewer(viewerInstance);
    
    // Потом грузим данные
    await initViewer();
});

onUnmounted(() => {
    if (observer) {
        observer.disconnect();
    }

    // Удаляем по ссылке на тот же самый объект
    tgs.unregisterViewer(viewerInstance);
    
    if (viewerInstance.resource) {
        viewerInstance.resource.release();
        tgs.disposeSticker(props.url);
    }
});

watch(() => props.url, initViewer);

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("canvas", {
    ref_key: "canvasRef",
    ref: canvasRef,
    class: "canvas"
  }, null, 512))
}
}

};
const TgsViewer = /*#__PURE__*/_export_sfc(_sfc_main$1, [['__scopeId',"data-v-25dab302"]]);

const _hoisted_1 = { class: "reaction-setup" };
const _hoisted_2 = { class: "values" };
const _hoisted_3 = ["onClick"];
const _hoisted_4 = { class: "remove" };
const _hoisted_5 = ["data-code", "onClick"];
const _hoisted_6 = { class: "collections-nav" };
const _hoisted_7 = ["onClick"];
const _hoisted_8 = { class: "buttons" };
const _sfc_main = {
  __name: "ModalSetupReaction",
  setup(__props) {
    const { t } = useI18n();
    const modals = stores.modals();
    const collectionUrl = "https://tgs.bilbomusic.com/collections";
    const scrollContainer = ref(null);
    const data = reactive({
      loading: true,
      collection: null,
      collections: [],
      // [{ code, icon }, ...]
      items: [],
      // [{ code }, ...]
      reactionCount: 4,
      // Сколько слотов для выбора стикеров
      values: []
      // [{ collection - код коллекции, code - код tgs внутри коллекции }, ...]
    });
    const visibleItems = reactive({});
    const getTgsUrl = (col, code) => `${collectionUrl}/${col}/${code}.tgs`;
    const onIntersection = ([{ isIntersecting, target }]) => {
      const code = target.dataset.code;
      if (isIntersecting && !visibleItems[code]) {
        visibleItems[code] = true;
      }
    };
    const selectItem = (payload) => {
      const isDuplicate = data.values.some((item) => item.code === payload.code && item.collection === data.collection);
      if (isDuplicate) {
        return;
      }
      if (data.values.length < data.reactionCount) {
        data.values.push({
          collection: data.collection,
          code: payload.code
        });
      }
    };
    const removeValue = (index) => {
      if (data.values[index]) {
        data.values.splice(index, 1);
      }
    };
    const changeCollection = async (code) => {
      if (data.collection === code) {
        return;
      }
      data.collection = code;
      if (scrollContainer.value) {
        scrollContainer.value.scrollTop = 0;
      }
      Object.keys(visibleItems).forEach((key) => delete visibleItems[key]);
      await getItems();
    };
    const getItems = async () => {
      data.items = await api.tgs().getCollection(data.collection) || [];
    };
    const save = async () => {
      data.loading = true;
      await api.entity().owner(data.entityType, data.entityId, data.field, JSON.stringify({
        values: data.values
      }));
      modals.close("setup-reaction");
    };
    const close = () => {
      modals.close("setup-reaction");
    };
    onMounted(async () => {
      const payload = modals.getData("setup-reaction");
      if (!payload?.code || !payload?.entityType || !payload?.entityId) {
        close();
        return;
      }
      data.entityType = payload.entityType;
      data.entityId = payload.entityId;
      const settings = REACTIONS_BY_ENTITY[payload?.entityType]?.find((item) => item.code === payload?.code);
      if (!settings?.reactionCount) {
        close();
        return;
      }
      data.reactionCount = settings.reactionCount;
      data.field = settings.field;
      data.collections = await api.tgs().getCollections() || [];
      if (!data.collections?.length) {
        close();
        return;
      }
      data.collection = data.collections[0].code;
      await getItems();
      data.loading = false;
    });
    return (_ctx, _cache) => {
      const _directive_intersection_observer = resolveDirective("intersection-observer");
      return openBlock(), createBlock(BaseModal, {
        name: "setup-reaction",
        mobileMode: true,
        closeOutside: true,
        isLoading: data.loading
      }, {
        content: withCtx(() => [
          createBaseVNode("div", _hoisted_1, [
            createBaseVNode("div", _hoisted_2, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(data.reactionCount, (i) => {
                return openBlock(), createElementBlock("div", {
                  key: `slot-${i}`,
                  class: normalizeClass({ "is-filled": data.values[i - 1] }),
                  onClick: ($event) => removeValue(i - 1)
                }, [
                  data.values[i - 1] ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                    createVNode(TgsViewer, {
                      url: getTgsUrl(data.values[i - 1].collection, data.values[i - 1].code),
                      size: 48
                    }, null, 8, ["url"]),
                    createBaseVNode("div", _hoisted_4, [
                      createVNode(Icon, { icon: "close" })
                    ])
                  ], 64)) : (openBlock(), createBlock(Icon, {
                    key: 1,
                    icon: "plus",
                    class: "empty"
                  }))
                ], 10, _hoisted_3);
              }), 128))
            ]),
            createBaseVNode("div", {
              class: "options",
              ref_key: "scrollContainer",
              ref: scrollContainer
            }, [
              createBaseVNode("ul", null, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(data.items, (item) => {
                  return withDirectives((openBlock(), createElementBlock("li", {
                    key: item.code,
                    "data-code": item.code,
                    onClick: ($event) => selectItem(item)
                  }, [
                    visibleItems[item.code] ? (openBlock(), createBlock(TgsViewer, {
                      key: 0,
                      url: getTgsUrl(data.collection, item.code),
                      size: 64
                    }, null, 8, ["url"])) : createCommentVNode("", true)
                  ], 8, _hoisted_5)), [
                    [_directive_intersection_observer, onIntersection]
                  ]);
                }), 128))
              ])
            ], 512),
            createBaseVNode("div", _hoisted_6, [
              createBaseVNode("ul", null, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(data.collections, (item) => {
                  return openBlock(), createElementBlock("li", {
                    key: item.code,
                    class: normalizeClass({ "is-active": data.collection === item.code }),
                    onClick: ($event) => changeCollection(item.code)
                  }, [
                    createBaseVNode("div", {
                      style: normalizeStyle({ "--icon-url": `url(${unref(collectionUrl)}/${item.code}/icon.svg)` })
                    }, null, 4)
                  ], 10, _hoisted_7);
                }), 128))
              ])
            ]),
            createBaseVNode("div", _hoisted_8, [
              createVNode(Button, {
                name: unref(t)("common.soon"),
                disabled: true,
                onClick: save
              }, null, 8, ["name"]),
              createVNode(Button, {
                name: unref(t)("common.close"),
                class: "secondary",
                onClick: close
              }, null, 8, ["name"])
            ])
          ])
        ]),
        _: 1
      }, 8, ["isLoading"]);
    };
  }
};
const ModalSetupReaction = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-6711b48d"]]);

export { ModalSetupReaction as default };
//# sourceMappingURL=ModalSetupReaction-GdzXli3G.js.map
