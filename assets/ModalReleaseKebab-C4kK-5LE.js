import { _ as _export_sfc, u as useI18n, g as api, s as stores, r as reactive, o as onMounted, q as resolveComponent, b as createBlock, f as openBlock, k as withCtx, l as createBaseVNode, c as createElementBlock, d as createCommentVNode, e as createVNode, t as toDisplayString, h as unref, p as Img, L as BaseModal } from './index-CC0co4PQ.js';
import { R as RELEASE_REACTIONS } from './reaction-BpWSoPWU.js';

const _hoisted_1 = { class: "title" };
const _hoisted_2 = { class: "kebab-list" };


const _sfc_main = {
  __name: 'ModalReleaseKebab',
  setup(__props) {

const { t } = useI18n();

const releases = api.releases();
// const messengers = stores.messengers();
const modals = stores.modals();
const share = stores.share();
const user = stores.user();

const data = reactive({
    loading: true
});


const shareIt = () => {
    close();

    share.release(data.item);
};

const about = () => {
    close();

    modals.open('release', { quietClose: true, data: {
        id: data.item.id,
        item: data.item
    } });
};

const setupReactions = () => {
    modals.open('options', {
        quietClose: true,
        data: {
            title: t('modals.release-kebab.setup-reactions'),
            options: RELEASE_REACTIONS.map(item => ({
                ...item,
                name: t(item.name)
            }))
        },
        callback: (code) => {
            if (!code) {
                return
            }

            close();

            modals.open('setup-reaction', {
                quietClose: true,
                data: {
                    code,
                    entityType: 'releases',
                    entityId: data.item.id
                }
            });
        }
    });
};

const gallery = () => {
    if (!data.item?.id || !data.item?.cover?.original) {
        return;
    }

    modals.open('gallery', {
        quietClose: true,
        data: { imgs: [{
            title: data.item.title,
            ...data.item?.cover
        }] } });
};

const close = () => {
    modals.close('release-kebab');
};


onMounted(async () => {
    const payload = modals.getData('release-kebab');

    if (!payload?.id) {
        close();
        return;
    }

    if (payload.item) {
        data.item = payload.item;
    } else {
        data.item = await releases.get(payload.id);
    }

    // Получаем артистов пользователя (если не получено ранее)
    await user.getArtists();

    data.loading = false;
});


return (_ctx, _cache) => {
  const _component_Icon = resolveComponent("Icon");

  return (openBlock(), createBlock(BaseModal, {
    name: "release-kebab",
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
                alt: data.item?.title,
                aspectRatio: "1 / 1"
              }, null, 8, ["preview", "original", "alt"]))
            : createCommentVNode("", true)
        ]),
        createBaseVNode("span", null, toDisplayString(data.item?.title), 1)
      ])
    ]),
    content: withCtx(() => [
      createBaseVNode("ul", _hoisted_2, [
        createBaseVNode("li", {
          class: "clickable",
          onClick: shareIt
        }, [
          createVNode(_component_Icon, { icon: "share" }),
          createBaseVNode("span", null, toDisplayString(unref(t)('modals.release-kebab.share')), 1)
        ]),
        createBaseVNode("li", {
          class: "clickable",
          onClick: about
        }, [
          createVNode(_component_Icon, { icon: "help" }),
          createBaseVNode("span", null, toDisplayString(unref(t)('modals.release-kebab.about')), 1)
        ]),
        (data.item?.id && unref(releases).canEditOwnerSettings({ release: data.item }))
          ? (openBlock(), createElementBlock("li", {
              key: 0,
              class: "clickable",
              onClick: setupReactions
            }, [
              createVNode(_component_Icon, { icon: "sticker" }),
              createBaseVNode("span", null, toDisplayString(unref(t)('modals.release-kebab.setup-reactions')), 1)
            ]))
          : createCommentVNode("", true)
      ])
    ]),
    _: 1
  }, 8, ["isLoading"]))
}
}

};
const ModalReleaseKebab = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-7ac2e57f"]]);

export { ModalReleaseKebab as default };
//# sourceMappingURL=ModalReleaseKebab-C4kK-5LE.js.map
