import { _ as _export_sfc, u as useI18n, s as stores, r as reactive, o as onMounted, g as api, y as resolveComponent, b as createBlock, f as openBlock, k as withCtx, q as createBaseVNode, c as createElementBlock, d as createCommentVNode, e as createVNode, I as IconButton, t as toDisplayString, h as unref, F as Fragment, l as renderList, H as BaseModal, m as message } from './index-D5NVi5sD.js';
import { I as Img } from './Img-DBPL09VA.js';

const _hoisted_1 = { class: "title" };
const _hoisted_2 = { class: "kebab-list" };
const _hoisted_3 = { class: "" };
const _hoisted_4 = { class: "buttons" };
const _hoisted_5 = ["onClick"];


const _sfc_main = {
  __name: 'ModalTrackKebab',
  setup(__props) {

const { t } = useI18n();

stores.tg();
const modals = stores.modals();
const share = stores.share();
const nav = stores.nav();

const data = reactive({
    loading: true,
    releases: []
});


const shareIt = () => {
    share.track(data.item, { type: 'release', release: data.releases[0] });

    setTimeout(() => {
        close();
    }, 400);
};

const about = () => {
    setTimeout(() => {
        close();
    }, 400);

    modals.open('track', { quietClose: true, data: {
        id: data.item.id,
        item: data.item,
        releases: data.releases || []
    } });
};

const openRelease = (release) => {
    nav.open('release', { id: release?.id });
    close();
};

const download = () => {
    setTimeout(() => {
        close();
    }, 400);

    modals.open('track-download', { quietClose: true, data: {
        id: data.item.id,
        item: data.item,
        releases: data.releases || []
    } });
};

const gallery = () => {
    if (!data.item?.id || !data.item?.cover?.original) {
        return;
    }

    modals.open('gallery', { data: { imgs: [{
        title: data.item.title,
        ...data.item?.cover
    }] } });
};

const like = () => {
    message.info(t('common.soon'));
};

const close = () => {
    modals.close('track-kebab');
};


onMounted(async () => {
    const payload = modals.getData('track-kebab');

    if (!payload?.id) {
        close();
        return;
    }

    data.item = await api.tracks().get(payload.id);

    const releases = await api.releases().list({ tracks: [payload.id] });
    if (releases?.items) {
        data.releases = releases.items;
    }

    data.loading = false;
});


return (_ctx, _cache) => {
  const _component_Icon = resolveComponent("Icon");

  return (openBlock(), createBlock(BaseModal, {
    name: "track-kebab",
    mobileMode: true,
    closeOutside: true,
    isLoading: data.loading
  }, {
    title: withCtx(() => [
      createBaseVNode("div", _hoisted_1, [
        createBaseVNode("div", {
          class: "img",
          onClick: gallery
        }, [
          (data.item?.cover?.resized)
            ? (openBlock(), createBlock(Img, {
                key: 0,
                preview: data.item?.cover?.resized,
                original: data.item?.cover?.original,
                alt: data.item?.title
              }, null, 8, ["preview", "original", "alt"]))
            : createCommentVNode("", true)
        ]),
        createBaseVNode("span", null, toDisplayString(data.item?.title), 1)
      ])
    ]),
    content: withCtx(() => [
      createBaseVNode("ul", _hoisted_2, [
        createBaseVNode("li", _hoisted_3, [
          createBaseVNode("div", _hoisted_4, [
            createVNode(IconButton, {
              icon: "download",
              class: "tertiary size-xl",
              onClick: download
            }),
            createVNode(IconButton, {
              icon: "heart",
              class: "tertiary size-xl",
              onClick: like
            })
          ])
        ]),
        createBaseVNode("li", {
          class: "clickable",
          onClick: shareIt
        }, [
          createVNode(_component_Icon, { icon: "share" }),
          createBaseVNode("span", null, toDisplayString(unref(t)('modals.track-kebab.share')), 1)
        ]),
        (data.releases?.length)
          ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(data.releases, (item) => {
              return (openBlock(), createElementBlock("li", {
                key: item.id,
                class: "clickable",
                onClick: $event => (openRelease(item))
              }, [
                (item?.cover)
                  ? (openBlock(), createBlock(Img, {
                      key: 0,
                      preview: item?.cover?.crop,
                      original: item?.cover?.original,
                      alt: item.title,
                      skeleton: true
                    }, null, 8, ["preview", "original", "alt"]))
                  : (openBlock(), createBlock(_component_Icon, {
                      key: 1,
                      icon: "playlist"
                    })),
                createBaseVNode("span", null, toDisplayString(unref(t)('modals.track-kebab.go-to-release', { 'release-title': item.title })), 1)
              ], 8, _hoisted_5))
            }), 128))
          : createCommentVNode("", true),
        createBaseVNode("li", {
          class: "clickable",
          onClick: about
        }, [
          createVNode(_component_Icon, { icon: "help" }),
          createBaseVNode("span", null, toDisplayString(unref(t)('modals.track-kebab.about')), 1)
        ])
      ])
    ]),
    _: 1
  }, 8, ["isLoading"]))
}
}

};
const ModalTrackKebab = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-9a32a766"]]);

export { ModalTrackKebab as default };
//# sourceMappingURL=ModalTrackKebab-BgBBrHjj.js.map
