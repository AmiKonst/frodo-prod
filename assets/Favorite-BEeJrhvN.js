import { _ as _export_sfc, l as computed, c as createElementBlock, d as createCommentVNode, f as openBlock, F as Fragment, n as renderList, b as createBlock, p as normalizeClass, q as Img, B as normalizeStyle, u as useI18n, s as stores, r as reactive, o as onMounted, a as onBeforeUnmount, y as createBaseVNode, e as createVNode, x as toDisplayString, i as unref, I as IconButton, H as Button, w as withCtx, g as api } from './index-BuRa5k8h.js';
import { E as EmptyLabel } from './EmptyLabel-DydE-UXH.js';
import { _ as _sfc_main$2 } from './Ready-B39T53jk.js';

const _sfc_main$1 = {
  __name: 'Collage',
  props: {
        items: { type: Array, default: () => [] },
        default: { type: [Object, null], default: null },
        gap: { type: String, default: '2px' },
        borderRadius: { type: String, default: '8px' },
        maxPreviewCount: { type: [Number, null], default: 8 },
        animationType: {
            type: String,
            default: 'none',
            validator: val => ['none', 'breath', 'float', 'tilt', 'pulse'].includes(val)
        }
    },
  setup(__props) {

    const props = __props;

    const itemsToRender = computed(() => {
        return props.maxPreviewCount !== null
            ? props.items.slice(0, props.maxPreviewCount)
            : props.items;
    });

    const animationClass = computed(() => {
        return props.animationType !== 'none' ? `img-anim-${props.animationType}` : '';
    });

    function cornerClass(count, pos) {
        const cornersMap = {
            1: { 1: 'corner-all' },
            2: { 1: 'corner-left', 2: 'corner-right' },
            3: { 1: 'corner-top-left', 2: 'corner-top-right', 3: 'corner-bottom' },
            4: {
                1: 'corner-top-left',
                2: 'corner-top-right',
                3: 'corner-bottom-left',
                4: 'corner-bottom-right'
            },
            5: { 1: 'corner-top-left', 2: 'corner-top-right', 5: 'corner-bottom' },
            6: { 1: 'corner-top-left', 3: 'corner-top-right', 4: 'corner-bottom-left', 6: 'corner-bottom-right' },
            7: { 1: 'corner-top-left', 3: 'corner-top-right', 4: 'corner-bottom-left', 6: 'corner-bottom-right' },
            8: { 1: 'corner-top-left', 4: 'corner-top-right', 5: 'corner-bottom-left', 8: 'corner-bottom-right' }
        };

        return (cornersMap[count] && cornersMap[count][pos]) || '';
    }

return (_ctx, _cache) => {
  return (itemsToRender.value.length)
    ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: "collage",
        style: normalizeStyle({
            '--gap': props.gap,
            '--border-radius': props.borderRadius
        })
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(itemsToRender.value, (item, index) => {
          return (openBlock(), createBlock(Img, {
            key: index,
            class: normalizeClass(["collage-item", [
                    `layout-${itemsToRender.value.length}-${index + 1}`,
                    cornerClass(itemsToRender.value.length, index + 1),
                    animationClass.value
                ]]),
            skeleton: true,
            preview: item?.resized || props.default?.resized,
            original: item?.original || props.default?.original,
            alt: item?.alt || ''
          }, null, 8, ["class", "preview", "original", "alt"]))
        }), 128))
      ], 4))
    : createCommentVNode("", true)
}
}

};
const Collage = /*#__PURE__*/_export_sfc(_sfc_main$1, [['__scopeId',"data-v-ff6e9fc8"]]);

const _hoisted_1 = { class: "head" };
const _hoisted_2 = { class: "title" };
const _hoisted_3 = { class: "more" };
const _hoisted_4 = { class: "title" };

    
const _sfc_main = {
  __name: 'Favorite',
  setup(__props) {

    const { t } = useI18n();

    // import { storeToRefs } from 'pinia';
    stores.user();
    const nav = stores.nav();
    const tg = stores.tg();

    stores.others();


    const data = reactive({
        myArtistsPreview: []
    });

    const defaultProfileImage = computed(() => {
        return api.artists().defaultProfileImage;
    });

    const init = async () => {
        const payload = await api.user().getMyArtistsPreview();

        data.myArtistsPreview = payload?.items || [];
    };

    const openSettings = () => {
        stores.nav().open('settings');
    };

    onMounted(() => {
        tg.showSettingsButton(openSettings);
    });

    onBeforeUnmount(() => {
        tg.hideSettingsButton(openSettings);
    });

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock(Fragment, null, [
    createBaseVNode("div", _hoisted_1, [
      createBaseVNode("label", _hoisted_2, toDisplayString(unref(t)('pages.favorite.title')), 1),
      createVNode(IconButton, {
        icon: "settings",
        class: "tertiary size-l",
        onClick: _cache[0] || (_cache[0] = $event => (unref(nav).open('settings')))
      })
    ]),
    createVNode(EmptyLabel, {
      "animate-icon": "tracks",
      title: unref(t)('pages.favorite.tracks.empty.title'),
      description: unref(t)('pages.favorite.tracks.empty.description')
    }, null, 8, ["title", "description"]),
    createBaseVNode("div", _hoisted_3, [
      createBaseVNode("label", _hoisted_4, toDisplayString(unref(t)('pages.favorite.more.title')), 1),
      createBaseVNode("div", null, [
        createVNode(Button, {
          icon: "playlist",
          name: unref(t)('pages.favorite.playlists.title'),
          class: "tap",
          onClick: _cache[1] || (_cache[1] = $event => (unref(nav).open('favorite-playlists')))
        }, null, 8, ["name"]),
        createVNode(Button, {
          icon: "artists",
          name: unref(t)('pages.favorite.artists.title'),
          class: "tap",
          onClick: _cache[2] || (_cache[2] = $event => (unref(nav).open('favorite-artists')))
        }, null, 8, ["name"]),
        (data.myArtistsPreview?.length)
          ? (openBlock(), createBlock(Button, {
              key: 0,
              name: unref(t)('pages.favorite.my-artists.title'),
              class: "tap",
              onClick: _cache[3] || (_cache[3] = $event => (data.myArtistsPreview?.length === 1 ? unref(nav).open('artist', { code: data.myArtistsPreview[0].code }) : unref(nav).open('favorite-my-artists')))
            }, {
              collage: withCtx(() => [
                createVNode(Collage, {
                  items: data.myArtistsPreview.map(item => item.profileImage),
                  default: defaultProfileImage.value,
                  borderRadius: "12px"
                }, null, 8, ["items", "default"])
              ]),
              _: 1
            }, 8, ["name"]))
          : createCommentVNode("", true)
      ])
    ]),
    createVNode(_sfc_main$2, {
      page: "favorite",
      init: init
    })
  ], 64))
}
}

};
const Favorite = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-dc3bfdad"]]);

export { Favorite as default };
//# sourceMappingURL=Favorite-BEeJrhvN.js.map
