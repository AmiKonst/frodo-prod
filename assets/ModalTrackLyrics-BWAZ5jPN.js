import { _ as _export_sfc, u as useI18n, s as stores, r as reactive, l as computed, o as onMounted, g as api, b as createBlock, f as openBlock, w as withCtx, c as createElementBlock, d as createCommentVNode, n as createBaseVNode, y as toDisplayString, P as TrackWave, A as AudioToggle, q as normalizeClass, i as unref, L as BaseModal } from './index-YxpfQUzc.js';

const _hoisted_1 = { class: "title" };
const _hoisted_2 = {
  key: 0,
  class: "kebab-list"
};


const _sfc_main = {
  __name: 'ModalTrackLyrics',
  setup(__props) {

const { t } = useI18n();

const modals = stores.modals();
const player = stores.player();
const others = stores.others();

const data = reactive({
    loading: true
});

const state = computed(() => {
    if (!player.panes.default || player.panes.default._item?.id !== data.item?.id) {
        return;
    }

    return player.panes.default._state;
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

const close = () => {
    modals.close('track-lyrics');
};

onMounted(async () => {
    const payload = modals.getData('track-lyrics');

    if (!payload?.id) {
        close();
        return;
    }

    if (payload.item) {
        data.item = payload.item;
    } else {
        data.item = await api.tracks().get(payload.id);
    }

    if (!data.item.lyrics) {
        close();
        return;
    }

    data.loading = false;
});


return (_ctx, _cache) => {
  return (openBlock(), createBlock(BaseModal, {
    name: "track-lyrics",
    mobileMode: true,
    closeOutside: true,
    isLoading: data.loading
  }, {
    title: withCtx(() => [
      createBaseVNode("div", _hoisted_1, [
        createBaseVNode("span", null, toDisplayString(data.item?.title), 1),
        createBaseVNode("div", null, [
          (data.item?.trackFile)
            ? (openBlock(), createBlock(TrackWave, {
                key: 0,
                wave: data.item.wave,
                id: data.item.id,
                duration: data.item.duration,
                simplify: 2,
                class: "wave"
              }, null, 8, ["wave", "id", "duration"]))
            : createCommentVNode("", true),
          (data.item?.wave)
            ? (openBlock(), createBlock(AudioToggle, {
                key: 1,
                state: state.value,
                light: true,
                class: normalizeClass(["secondary size-m", { invert: unref(others).theme !== 'dark' }]),
                onPlay: play,
                onPause: pause
              }, null, 8, ["state", "class"]))
            : createCommentVNode("", true)
        ])
      ])
    ]),
    content: withCtx(() => [
      (data.item?.lyrics)
        ? (openBlock(), createElementBlock("ul", _hoisted_2, [
            createBaseVNode("li", null, [
              createBaseVNode("p", null, toDisplayString(data.item.lyrics), 1)
            ])
          ]))
        : createCommentVNode("", true)
    ]),
    _: 1
  }, 8, ["isLoading"]))
}
}

};
const ModalTrackLyrics = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-7c73bf13"]]);

export { ModalTrackLyrics as default };
//# sourceMappingURL=ModalTrackLyrics-BWAZ5jPN.js.map
