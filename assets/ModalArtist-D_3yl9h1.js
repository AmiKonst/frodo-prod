import { _ as _export_sfc, u as useI18n, s as stores, r as reactive, f as onMounted, a as api, A as resolveComponent, b as createBlock, o as openBlock, k as withCtx, c as createElementBlock, d as createCommentVNode, m as createBaseVNode, e as createVNode, I as IconButton, h as unref, B as Button, t as toDisplayString, F as Fragment, l as renderList, H as knownSites, J as getDomainCode, K as BaseModal, p as message } from './index-D-wR8bOf.js';
import { I as Img } from './Img-D8ss96CI.js';
import { T as TitleWithButtons } from './TitleWithButtons-BliZ9E19.js';

const _hoisted_1 = {
  key: 0,
  class: "box"
};
const _hoisted_2 = { class: "gallery" };
const _hoisted_3 = { class: "buttons" };
const _hoisted_4 = {
  key: 0,
  class: "description"
};
const _hoisted_5 = {
  key: 1,
  class: "links"
};
const _hoisted_6 = ["onClick"];
const _hoisted_7 = {
  key: 0,
  class: "name"
};
const _hoisted_8 = {
  key: 1,
  class: "name"
};
const _hoisted_9 = { class: "url" };


const _sfc_main = {
  __name: 'ModalArtist',
  setup(__props) {

const { t } = useI18n();

const tg = stores.tg();
const modals = stores.modals();
const share = stores.share();

const data = reactive({
    loading: true
});


const openGallery = () => {
    if (!data.item?.id || !data.item?.profileImage?.original) {
        return;
    }

    modals.open('gallery', { data: { imgs: [{
        title: data.item.name,
        ...data.item?.profileImage
    }] } });
};

const donate = () => {
    message.info(t('common.soon'));
};

const close = () => {
    modals.close('artist');
};

const openLink = (item) => {
    if (!item?.url) {
        return
    }

    if (item.code === 'telegram') {
        tg.openLink({
            external_url: item.url,
            type: 'telegram'
        });
    } else {
        tg.openLink({
            external_url: item.url
        });
    }
};

onMounted(async () => {
    const payload = modals.getData('artist');

    if (!payload?.code) {
        close();
        return;
    }

    data.item = await api.artists().get(payload.code);
    data.loading = false;
    console.log(data.item);
});


return (_ctx, _cache) => {
  const _component_Icon = resolveComponent("Icon");

  return (openBlock(), createBlock(BaseModal, {
    name: "artist",
    mobileMode: true,
    closeOutside: true,
    isLoading: data.loading
  }, {
    title: withCtx(() => [
      createBaseVNode("span", null, toDisplayString(data.item?.name), 1)
    ]),
    content: withCtx(() => [
      (data.item)
        ? (openBlock(), createElementBlock("div", _hoisted_1, [
            createBaseVNode("div", _hoisted_2, [
              (data.item?.profileImage)
                ? (openBlock(), createBlock(Img, {
                    key: 0,
                    preview: data.item?.profileImage?.crop,
                    original: data.item?.profileImage?.original,
                    alt: data.item.name,
                    aspectRatio: "1 / 1",
                    skeleton: true,
                    onClick: openGallery
                  }, null, 8, ["preview", "original", "alt"]))
                : createCommentVNode("", true),
              createBaseVNode("div", _hoisted_3, [
                createVNode(IconButton, {
                  icon: "share",
                  class: "secondary size-m",
                  onClick: _cache[0] || (_cache[0] = $event => (unref(share).artist(data.item)))
                }),
                createVNode(Button, {
                  icon: "tg-stars",
                  class: "secondary size-m",
                  name: unref(t)('common.support'),
                  onClick: donate
                }, null, 8, ["name"])
              ])
            ]),
            (data.item.description)
              ? (openBlock(), createElementBlock("div", _hoisted_4, toDisplayString(data.item.description), 1))
              : createCommentVNode("", true),
            (data.item.links?.length)
              ? (openBlock(), createElementBlock("div", _hoisted_5, [
                  createVNode(TitleWithButtons, { title: 'modals.artist.official-pages' }),
                  createBaseVNode("ul", null, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(data.item.links, (item) => {
                      return (openBlock(), createElementBlock("li", {
                        key: item.code,
                        onClick: $event => (openLink(item))
                      }, [
                        createVNode(_component_Icon, {
                          icon: item.code && unref(knownSites).get(item.code) ? item.code : 'link'
                        }, null, 8, ["icon"]),
                        createBaseVNode("div", null, [
                          (item.code && unref(knownSites).get(item.code))
                            ? (openBlock(), createElementBlock("span", _hoisted_7, toDisplayString(unref(t)(`known-sites.${item.code}`)), 1))
                            : (openBlock(), createElementBlock("span", _hoisted_8, toDisplayString(unref(getDomainCode)(item.url)), 1)),
                          createBaseVNode("span", _hoisted_9, toDisplayString(item.url), 1)
                        ])
                      ], 8, _hoisted_6))
                    }), 128))
                  ])
                ]))
              : createCommentVNode("", true)
          ]))
        : createCommentVNode("", true)
    ]),
    _: 1
  }, 8, ["isLoading"]))
}
}

};
const ModalArtist = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-accce539"]]);

export { ModalArtist as default };
//# sourceMappingURL=ModalArtist-D_3yl9h1.js.map
