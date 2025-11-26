import { _ as _export_sfc, u as useI18n, s as stores, r as reactive, i as computed, j as onMounted, g as onBeforeUnmount, c as createElementBlock, b as createBlock, d as createCommentVNode, e as createVNode, k as withCtx, F as Fragment, o as openBlock, l as renderList, h as unref, I as IconButton, n as normalizeClass, m as createBaseVNode, t as toDisplayString, B as Button, p as message, a as api } from './index-BDHwKsHx.js';
import { _ as _sfc_main$1 } from './Ready-Bej-wCof.js';
import { I as Img } from './Img-gcuf_tuI.js';
import { I as ItemDetail } from './ItemDetail-I5PX-FBr.js';
import { T as Tracks, R as Releases } from './Tracks-tEUnBjWm.js';
import './TitleWithButtons-X7bn6Eyi.js';
import './State-0Moetx8B.js';
import './Slider-BL43yEF3.js';
import './EmptyLabel-ZoOpGzKS.js';

const _hoisted_1 = { class: "buttons" };

    
const _sfc_main = {
  __name: 'Release',
  props: {
        id: { type: String }
    },
  setup(__props) {

    const { t } = useI18n();

    stores.locale();
    const tg = stores.tg();
    stores.modals();
    const others = stores.others();

    const props = __props;

    const data = reactive({
        ready: false,
        item: null
    });

    const primaryArtists = computed(() => {
        if (!data.item?.contributors?.length) {
            return [];
        }

        return data.item.contributors.filter(item => item.role === 'PRIMARY' && item.state === 'CONFIRMED').map(item => item.artist);
    });

    const like = (e) => {
        let button = e?.target?.closest('button');

        if (button) {
            button.classList.remove('dunk');
            setTimeout(() => {
                button.classList.add('dunk');
            }, 10);
        }

        message.info(t('common.soon'));
    };

    const openKebab = () => {
        // modals.open('artist-kebab', { data: { code: 'cmhryr5hl014coi13tbvq6rxm' || props.code } })
    };

    const init = async () => {
        data.item = await api.releases().get(props.id);
        data.ready = true;

        console.log(data.item);
    };

    const openArtist = () => {
        // modals.open('artist', { data: { code: 'cmhryr5hl014coi13tbvq6rxm' || props.code } })
    };

    onMounted(async () => {
        tg.showBackButton();
        tg.showSettingsButton(() => {
            // modals.open('artist-kebab', { data: { code: 'cmhryr5hl014coi13tbvq6rxm' || props.code } })
        });
    });

    onBeforeUnmount(() => {
        tg.hideSettingsButton();
        tg.hideBackButton();
    });

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock(Fragment, null, [
    (data.ready)
      ? (openBlock(), createBlock(ItemDetail, {
          key: 0,
          previewHeight: null,
          aspectRatio: '1 / 1'
        }, {
          background: withCtx(() => [
            (data.item?.cover)
              ? (openBlock(), createBlock(Img, {
                  key: 0,
                  preview: data.item?.cover?.crop,
                  original: data.item?.cover?.original,
                  alt: data.item.title,
                  skeleton: true
                }, null, 8, ["preview", "original", "alt"]))
              : createCommentVNode("", true)
          ]),
          preview: withCtx(() => [
            (data.item?.title)
              ? (openBlock(), createElementBlock("div", {
                  key: 0,
                  class: "title",
                  onClick: openArtist
                }, toDisplayString(data.item.name), 1))
              : createCommentVNode("", true),
            createBaseVNode("div", _hoisted_1, [
              createVNode(Button, {
                name: unref(t)('player.shuffle'),
                class: "tertiary active size-m",
                icon: "random"
              }, null, 8, ["name"]),
              createVNode(Button, {
                name: unref(t)('player.play'),
                class: "size-m",
                icon: "play"
              }, null, 8, ["name"])
            ])
          ]),
          toolbar: withCtx(() => [
            createVNode(IconButton, {
              icon: "heart",
              class: normalizeClass(["tertiary size-xl", { invert: unref(others).theme !== 'dark' }]),
              onClick: like
            }, null, 8, ["class"]),
            createVNode(IconButton, {
              icon: "tg-stars",
              class: "tertiary size-xl",
              onClick: like
            }),
            createVNode(IconButton, {
              icon: "apps",
              class: normalizeClass(["tertiary size-l", { invert: unref(others).theme !== 'dark' }]),
              onClick: openKebab
            }, null, 8, ["class"])
          ]),
          detail: withCtx(() => [
            (data.item?.id)
              ? (openBlock(), createBlock(Tracks, {
                  key: 0,
                  getById: data.item.id,
                  loadMore: false,
                  source: {
                    store: 'releases',
                    fnName: 'getTracks'
                },
                  title: { text: data.item.title }
                }, null, 8, ["getById", "title"]))
              : createCommentVNode("", true),
            (openBlock(true), createElementBlock(Fragment, null, renderList(primaryArtists.value, (item) => {
              return (openBlock(), createBlock(Releases, {
                key: item.id,
                type: "row",
                take: 8,
                params: {
                        contributors: item.id
                    },
                sort: null,
                title: { text: unref(t)('blocks.releases.more-from-author', { name: item.name }) },
                handler: "release"
              }, null, 8, ["params", "title"]))
            }), 128))
          ]),
          _: 1
        }))
      : createCommentVNode("", true),
    createVNode(_sfc_main$1, {
      page: `release-${props.id}`,
      init: init
    }, null, 8, ["page"])
  ], 64))
}
}

};
const Release = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-567109a1"]]);

export { Release as default };
//# sourceMappingURL=Release-rBZ5MTlQ.js.map
