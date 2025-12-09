import { _ as _export_sfc, u as useI18n, s as stores, r as reactive, j as computed, o as onMounted, g as api, y as resolveComponent, b as createBlock, f as openBlock, k as withCtx, c as createElementBlock, d as createCommentVNode, q as createBaseVNode, t as toDisplayString, h as unref, e as createVNode, D as Button, n as normalizeClass, F as Fragment, l as renderList, H as BaseModal } from './index-9Bs__Z_A.js';
import { I as Img } from './Img-BezXIE4e.js';

const _hoisted_1 = { class: "title" };
const _hoisted_2 = {
  key: 0,
  class: "kebab-list"
};
const _hoisted_3 = {
  key: 0,
  class: "static"
};
const _hoisted_4 = { class: "icons" };
const _hoisted_5 = {
  key: 1,
  class: "static"
};
const _hoisted_6 = { class: "icons" };
const _hoisted_7 = {
  key: 2,
  class: "download free"
};
const _hoisted_8 = ["innerHTML"];
const _hoisted_9 = ["id"];


const _sfc_main = {
  __name: 'ModalTrackDownload',
  setup(__props) {

const { t } = useI18n();

const tg = stores.tg();
const modals = stores.modals();

const data = reactive({
    loading: true,
    downloading: false,
});

const gallery = () => {
    if (!data.item?.id || !data.item?.cover?.original) {
        return;
    }

    modals.open('gallery', { data: { imgs: [{
        title: data.item.title,
        ...data.item?.cover
    }] } });
};

const download = async () => {
    data.downloading = true;

    const arrayBuffer = await api.tracks().downloadWholeFile(data.item?.id, 'ogg');

    const blob = new Blob([arrayBuffer], { type: 'audio/mpeg' });

    const name = `${artists.value.join(', ')} - ${data.item.title} (BilboMusic).ogg`;

    new File([blob], name);

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.click();

    URL.revokeObjectURL(url);
    data.downloading = false;
};

const artists = computed(() => {
    if (!data.item?.contributors?.length) {
        return;
    }

    return data.item.contributors.filter(item => item.role === 'PRIMARY' && item.state === 'CONFIRMED').map(item => item.artist.name)
});

const openExternal = (item) => {

    if (!item?.url) {
        return
    }

    tg.openLink({
        external_url: `${item.url}?${item.provider.getParams}`
    });
};

const close = () => {
    modals.close('track-download');
};

onMounted(async () => {
    const payload = modals.getData('track-download');

    if (!payload?.id) {
        close();
        return;
    }

    if (payload.item) {
        data.item = payload.item;
    } else {
        data.item = await api.tracks().get(payload.id);
    }

    data.licenses = await api.licenses().tracks.list(payload.id);

    data.loading = false;
});


return (_ctx, _cache) => {
  const _component_Icon = resolveComponent("Icon");

  return (openBlock(), createBlock(BaseModal, {
    name: "track-download",
    mobileMode: true,
    closeOutside: true,
    secondary: true,
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
                alt: data.item?.title,
                aspectRatio: "1 / 1"
              }, null, 8, ["preview", "original", "alt"]))
            : createCommentVNode("", true)
        ]),
        createBaseVNode("span", null, toDisplayString(data.item?.title), 1)
      ])
    ]),
    content: withCtx(() => [
      (data.item?.id)
        ? (openBlock(), createElementBlock("ul", _hoisted_2, [
            (data.item.contentId)
              ? (openBlock(), createElementBlock("li", _hoisted_3, [
                  createBaseVNode("label", null, toDisplayString(unref(t)('modals.track-download.content-id.title')), 1),
                  createBaseVNode("div", null, [
                    createBaseVNode("p", null, toDisplayString(unref(t)('modals.track-download.content-id.description')), 1),
                    createBaseVNode("span", _hoisted_4, [
                      createVNode(_component_Icon, { icon: "youtube" })
                    ])
                  ])
                ]))
              : createCommentVNode("", true),
            (data.item.hasProRights)
              ? (openBlock(), createElementBlock("li", _hoisted_5, [
                  createBaseVNode("label", null, toDisplayString(unref(t)('modals.track-download.pro.title')), 1),
                  createBaseVNode("div", null, [
                    createBaseVNode("p", null, toDisplayString(unref(t)('modals.track-download.pro.description')), 1),
                    createBaseVNode("span", _hoisted_6, [
                      createVNode(_component_Icon, { icon: "tv" }),
                      createVNode(_component_Icon, { icon: "radio" }),
                      createVNode(_component_Icon, { icon: "shop" })
                    ])
                  ])
                ]))
              : createCommentVNode("", true),
            (data.item.nonCommercialUsage)
              ? (openBlock(), createElementBlock("li", _hoisted_7, [
                  createBaseVNode("div", null, [
                    createBaseVNode("label", null, toDisplayString(unref(t)('modals.track-download.free.title')), 1)
                  ]),
                  createBaseVNode("div", null, [
                    createBaseVNode("p", {
                      innerHTML: unref(t)('modals.track-download.free.description', { artist: artists.value.join(', ') })
                    }, null, 8, _hoisted_8),
                    createVNode(Button, {
                      name: unref(t)('modals.track-download.free.download'),
                      class: normalizeClass(["size-s", { secondary: !data.downloading }]),
                      loading: data.downloading,
                      onClick: download
                    }, null, 8, ["name", "class", "loading"])
                  ])
                ]))
              : createCommentVNode("", true),
            (data.licenses?.length)
              ? (openBlock(true), createElementBlock(Fragment, { key: 3 }, renderList(data.licenses, (item) => {
                  return (openBlock(), createElementBlock("li", {
                    id: item.id,
                    class: "download"
                  }, [
                    createBaseVNode("div", null, [
                      createBaseVNode("label", null, toDisplayString(item.provider?.name), 1),
                      (item.provider?.profileImage?.resized)
                        ? (openBlock(), createBlock(Img, {
                            key: 0,
                            preview: item.provider?.profileImage?.resized,
                            original: item.provider?.profileImage?.original,
                            alt: item.provider?.name
                          }, null, 8, ["preview", "original", "alt"]))
                        : createCommentVNode("", true)
                    ]),
                    createBaseVNode("div", null, [
                      createBaseVNode("p", null, toDisplayString(item.provider?.description), 1),
                      createVNode(Button, {
                        name: unref(t)('modals.track-download.external.open'),
                        class: "secondary size-s",
                        onClick: $event => (openExternal(item))
                      }, null, 8, ["name", "onClick"])
                    ])
                  ], 8, _hoisted_9))
                }), 256))
              : createCommentVNode("", true)
          ]))
        : createCommentVNode("", true)
    ]),
    _: 1
  }, 8, ["isLoading"]))
}
}

};
const ModalTrackDownload = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-1a5ed67f"]]);

export { ModalTrackDownload as default };
//# sourceMappingURL=ModalTrackDownload-DDidUZBv.js.map
