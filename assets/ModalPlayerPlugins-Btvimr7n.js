import { _ as _export_sfc, s as stores, u as useI18n, v as ref, r as reactive, j as computed, o as onMounted, w as watch, b as createBlock, f as openBlock, k as withCtx, l as createBaseVNode, e as createVNode, c as createElementBlock, Y as Loader, d as createCommentVNode, n as normalizeClass, h as unref, p as Img, F as Fragment, m as renderList, L as BaseModal } from './index-BnJZuQ6k.js';
import { F as Field } from './Field-C_uv4kPy.js';
import { E as EmptyLabel } from './EmptyLabel-4781rUtn.js';
import { M as Menu } from './Menu-D6Bbxu12.js';

const _hoisted_1 = { class: "player-plugins-box" };
const _hoisted_2 = {
  key: 0,
  class: "loader"
};
const _hoisted_3 = {
  key: 1,
  class: "plugins-list"
};
const _hoisted_4 = ["onClick"];

// const others = stores.others();

const _sfc_main = {
  __name: 'ModalPlayerPlugins',
  setup(__props) {

const player = stores.player();
const playerPlugin = stores.playerPlugin();
const modals = stores.modals();


const { t } = useI18n();


    const categories = ref([
        {
            code: '',
            name: t('modals.player-plugins.categories.all')
        }, {
            code: 'visualizer',
            name: t('modals.player-plugins.categories.visualizer')
        }, {
            code: 'game',
            name: t('modals.player-plugins.categories.game')
        }
    ]);

    const data = reactive({
        loading: true,
        category: '',
        plugins: [],
        searchStr: ''
    });

    const plugins = computed(() => {
        let list = data.plugins;

        if (data.searchStr?.length) {
            const searchStr = data.searchStr.toLowerCase().trim();

            list = list.filter(item => {
                return item.name?.includes(searchStr) || item.description?.includes(searchStr);
            });
        }

        if (!data.category) {
            return list;
        }

        return list.filter(item => item.category === data.category);
    });

    const setCategory = (category) => {
        data.category = category;
    };

    const onSearchChange = async (e) => {
        data.searchStr = e.target.value?.toLowerCase().trim() || '';

        // clearTimeout(data.searchTimeout);

        // data.searchTimeout = setTimeout(() => {
        //     delete data.searchTimeout;
        //     getItems();
        // }, 200);
    };

    const getItems = async () => {
        data.loading = true;

        // Логика поиска, фильтра, пагинации будет реализована потом, когда будет бэк ToDo

        try {
            // const response = await fetch('http://localhost:5173/plugins.json')
            const response = await fetch('https://plugins.bilbomusic.com/plugins.json');
            if (response.ok) {
                const items = await response.json();
                if (Array.isArray(items) && items.length > 0) {
                    data.plugins = items;
                }
            }
        } catch (error) {
        }

        data.loading = false;
    };

    onMounted(async () => {
        await getItems();
    });


    const setPlugin = (item) => {
        if (item.code === playerPlugin.plugin?.code) {
            close();
            return;
        }

        modals.open('loader', {data: { light: true }});
        playerPlugin.setPlugin(item);
    };

    const clearPlugin = () => {
        playerPlugin.clearPlugin();
        close();
    };

    const close = () => {
        modals.close('player-plugins');
    };

    watch(
        () => playerPlugin.isIframeReady,
        (value) => {
            if (value) {
                setTimeout(() => {
                    modals.close('loader');
                    player.expand();

                    close();
                }, 100);
            }
        }
    );

return (_ctx, _cache) => {
  return (openBlock(), createBlock(BaseModal, {
    name: "player-plugins",
    full: true
  }, {
    content: withCtx(() => [
      createBaseVNode("div", _hoisted_1, [
        createVNode(Menu, {
          items: categories.value,
          code: data.category,
          onChange: setCategory
        }, null, 8, ["items", "code"]),
        createVNode(Field, {
          icon: "search",
          placeholder: "...",
          class: "noerror light",
          onChange: onSearchChange
        }),
        (data.loading)
          ? (openBlock(), createElementBlock("div", _hoisted_2, [
              createBaseVNode("div", null, [
                createVNode(Loader, {
                  inside: true,
                  class: "tertiary"
                })
              ])
            ]))
          : (openBlock(), createElementBlock("div", _hoisted_3, [
              (plugins.value.length)
                ? (openBlock(), createElementBlock("div", {
                    key: 0,
                    class: normalizeClass(["plugin", { 'is-active': !unref(playerPlugin).plugin?.code }]),
                    onClick: clearPlugin
                  }, [
                    createVNode(Img, {
                      preview: 'https://plugins.bilbomusic.com/img/plugin/crop/bilbo.jpg',
                      original: 'https://plugins.bilbomusic.com/img/plugin/original/bilbo.jpg',
                      aspectRatio: "419 / 140",
                      skeleton: true
                    })
                  ], 2))
                : createCommentVNode("", true),
              (openBlock(true), createElementBlock(Fragment, null, renderList(plugins.value, (item) => {
                return (openBlock(), createElementBlock("div", {
                  class: normalizeClass(["plugin", { 'is-active': unref(playerPlugin).plugin?.code === item.code }]),
                  key: item.code,
                  onClick: $event => (setPlugin(item))
                }, [
                  createVNode(Img, {
                    preview: item.cover.crop,
                    original: item.cover.original,
                    alt: item.name,
                    aspectRatio: "419 / 140",
                    skeleton: true
                  }, null, 8, ["preview", "original", "alt"])
                ], 10, _hoisted_4))
              }), 128)),
              (!plugins.value.length && !data.loading)
                ? (openBlock(), createBlock(EmptyLabel, {
                    key: 1,
                    class: "empty",
                    title: unref(t)('modals.player-plugins.empty.title'),
                    description: unref(t)('modals.player-plugins.empty.description')
                  }, null, 8, ["title", "description"]))
                : createCommentVNode("", true)
            ]))
      ])
    ]),
    _: 1
  }))
}
}

};
const ModalPlayerPlugins = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-ce7c72fb"]]);

export { ModalPlayerPlugins as default };
//# sourceMappingURL=ModalPlayerPlugins-Btvimr7n.js.map
