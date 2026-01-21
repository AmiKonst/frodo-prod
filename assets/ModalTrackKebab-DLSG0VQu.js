import { _ as _export_sfc, u as useI18n, s as stores, r as reactive, l as computed, o as onMounted, g as api, x as resolveComponent, b as createBlock, f as openBlock, w as withCtx, n as createBaseVNode, c as createElementBlock, d as createCommentVNode, e as createVNode, I as IconButton, A as AudioToggle, q as normalizeClass, i as unref, P as TrackWave, y as toDisplayString, F as Fragment, p as renderList, t as Img, L as BaseModal, v as message } from './index-CtLLdJFd.js';

const _hoisted_1 = { class: "title" };
const _hoisted_2 = { class: "kebab-list" };
const _hoisted_3 = { class: "" };
const _hoisted_4 = { class: "buttons" };
const _hoisted_5 = { key: 0 };
const _hoisted_6 = ["onClick"];
const _hoisted_7 = ["onClick"];


const _sfc_main = {
  __name: 'ModalTrackKebab',
  setup(__props) {

const { t } = useI18n();

stores.tg();
const modals = stores.modals();
const share = stores.share();
const player = stores.player();
const nav = stores.nav();
const others = stores.others();

const data = reactive({
    loading: true,
    releases: []
});

const state = computed(() => {
    if (!player.panes.default || player.panes.default._item?.id !== data.item?.id) {
        return;
    }

    return player.panes.default._state;
});

const locked = computed(() => {
    if (!data.item?.releaseDate) {
        return false;
    }

    const releaseDate = new Date(data.item.releaseDate);
    const now = new Date();

    return releaseDate > now;
});

const play = async () => {
    if (!state.value) {
        await player.track(data.item);

        if (!player.panes?.default) {
            return;
        }

        player.panes.default.play();
        return;
    }

    await player.play();
};

const pause = async () => {
    await player.pause();
};


const shareIt = () => {
    share.track(data.item, { type: 'release', release: data.releases[0] });

    close();
};

const about = () => {
    close();

    modals.open('track', { quietClose: true, data: {
        id: data.item.id,
        item: data.item,
        releases: data.releases || []
    } });
};

const lyrics = () => {
    close();

    modals.open('track-lyrics', { quietClose: true, data: {
        id: data.item.id,
        item: data.item
    } });
};

const openRelease = (release) => {
    nav.open('release', { id: release?.id });
    close();
};

const openArtist = (artist) => {
    nav.open('artist', { code: artist?.code });
    close();
};

const download = () => {
    close();

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

    modals.open('gallery', {
        quietClose: true,
        data: { imgs: [{
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

// Contributors
    const contributors = computed(() => {
        if (!data.item?.contributors?.length) {
            return [];
        }

        return data.item.contributors.filter(item => (item.role === 'PRIMARY' || item.role === 'FEATURED')
            && item.state === 'CONFIRMED').map(item => item.artist);
    });

onMounted(async () => {
    const payload = modals.getData('track-kebab');

    if (!payload?.id) {
        close();
        return;
    }

    if (payload.item) {
        data.item = payload.item;
    } else {
        data.item = await api.tracks().get(payload.id);
    }

    if (payload.releases) {
        data.releases = payload.releases;
    } else {
        const releases = await api.releases().list({ tracks: [payload.id] });
        if (releases?.items) {
            data.releases = releases.items;
        }
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
        createBaseVNode("li", _hoisted_3, [
          createBaseVNode("div", _hoisted_4, [
            createVNode(IconButton, {
              icon: "download",
              class: "tertiary size-xl",
              onClick: download,
              disabled: locked.value
            }, null, 8, ["disabled"]),
            (data.item?.wave)
              ? (openBlock(), createBlock(AudioToggle, {
                  key: 0,
                  state: state.value,
                  light: true,
                  class: normalizeClass([{ invert: unref(others).theme !== 'dark' }, "secondary size-s"]),
                  disabled: locked.value,
                  onPlay: play,
                  onPause: pause
                }, null, 8, ["state", "class", "disabled"]))
              : createCommentVNode("", true),
            createVNode(IconButton, {
              icon: "unlike",
              class: "tertiary size-xl",
              onClick: like
            })
          ])
        ]),
        (data.item?.trackFile)
          ? (openBlock(), createElementBlock("li", _hoisted_5, [
              createVNode(TrackWave, {
                wave: data.item.wave,
                id: data.item.id,
                duration: data.item.duration,
                simplify: 2,
                class: "wave"
              }, null, 8, ["wave", "id", "duration"])
            ]))
          : createCommentVNode("", true),
        createBaseVNode("li", {
          class: "clickable",
          onClick: shareIt
        }, [
          createVNode(_component_Icon, { icon: "share" }),
          createBaseVNode("span", null, toDisplayString(unref(t)('modals.track-kebab.share')), 1)
        ]),
        (!locked.value)
          ? (openBlock(), createElementBlock("li", {
              key: 1,
              class: "clickable",
              onClick: about
            }, [
              createVNode(_component_Icon, { icon: "help" }),
              createBaseVNode("span", null, toDisplayString(unref(t)('modals.track-kebab.about')), 1)
            ]))
          : createCommentVNode("", true),
        (!locked.value && !data.item?.instrumental && data.item?.lyrics)
          ? (openBlock(), createElementBlock("li", {
              key: 2,
              class: "clickable",
              onClick: lyrics
            }, [
              createVNode(_component_Icon, { icon: "lyrics" }),
              createBaseVNode("span", null, toDisplayString(unref(t)('modals.track-kebab.show-lyrics')), 1)
            ]))
          : createCommentVNode("", true),
        (data.releases?.length)
          ? (openBlock(true), createElementBlock(Fragment, { key: 3 }, renderList(data.releases, (item) => {
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
              ], 8, _hoisted_6))
            }), 128))
          : createCommentVNode("", true),
        (contributors.value?.length)
          ? (openBlock(true), createElementBlock(Fragment, { key: 4 }, renderList(contributors.value, (item) => {
              return (openBlock(), createElementBlock("li", {
                key: item.id,
                class: "clickable",
                onClick: $event => (openArtist(item))
              }, [
                (item?.profileImage)
                  ? (openBlock(), createBlock(Img, {
                      key: 0,
                      preview: item?.profileImage?.crop,
                      original: item?.profileImage?.original,
                      alt: item.name,
                      skeleton: true
                    }, null, 8, ["preview", "original", "alt"]))
                  : (openBlock(), createBlock(_component_Icon, {
                      key: 1,
                      icon: "artists"
                    })),
                createBaseVNode("span", null, toDisplayString(item.name), 1)
              ], 8, _hoisted_7))
            }), 128))
          : createCommentVNode("", true)
      ])
    ]),
    _: 1
  }, 8, ["isLoading"]))
}
}

};
const ModalTrackKebab = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-7cc6296e"]]);

export { ModalTrackKebab as default };
//# sourceMappingURL=ModalTrackKebab-DLSG0VQu.js.map
