import { _ as _export_sfc, u as useI18n, g as api, s as stores, r as reactive, l as computed, o as onMounted, a as onBeforeUnmount, b as createBlock, f as openBlock, w as withCtx, d as createCommentVNode, c as createElementBlock, e as createVNode, p as normalizeClass, I as IconButton, F as Fragment, v as toDisplayString, i as unref, A as AudioToggle, q as Img } from './index-MSeQtd-7.js';
import { I as ItemDetail } from './ItemDetail-CMb8UmVT.js';
import { _ as _sfc_main$1 } from './Tracks-D0Hyu-BI.js';

const _hoisted_1 = {
  key: 1,
  class: "buttons"
};

    
const _sfc_main = {
  __name: 'Dictionary',
  props: {
        code: { type: String },
        type: { type: Object }
    },
  setup(__props) {

    const { t } = useI18n();

    const dict = api.dict();
    const locale = stores.locale();
    const tg = stores.tg();
    const others = stores.others();
    const player = stores.player();
    const modals = stores.modals();

    const props = __props;

    const data = reactive({
        item: null,
        tone: null
    });

    const state = computed(() => {
        if (!data.item?.id || !player.panes.default || player.panes.default._queue?.id !== data.item?.id) {
            return;
        }

        return player.panes.default._state;
    });

    const sameColors = computed(() => {
        if (data.tone === null) {
            return null;
        }

        return (others.theme !== 'dark' && data.tone !== 'dark') || (others.theme === 'dark' && data.tone === 'dark');
    });


    const pause = async () => {
        player.dict.pause(data.item.code);
    };

    const play = async () => {
        player.dict.play(data.item.code, props.type.code);
    };

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
        modals.open('dict-kebab', { quietClose: true, data: {
            type: props.type,
            code: props.code,
            item: data.item
        } });
    };


    onMounted(async () => {
        tg.showBackButton();

        data.item = await dict[props.type.code].get(props.code, props.type.id);
    });

    onBeforeUnmount(() => {
        tg.hideBackButton();
    });

return (_ctx, _cache) => {
  return (openBlock(), createBlock(ItemDetail, {
    previewHeight: 420,
    invertShadow: sameColors.value === null ? null : !sameColors.value
  }, {
    background: withCtx(() => [
      createVNode(Img, {
        preview: data.item?.cover?.original,
        original: data.item?.cover?.original,
        skeleton: true,
        checktone: true,
        onTone: _cache[0] || (_cache[0] = $event => (data.tone = $event))
      }, null, 8, ["preview", "original"])
    ]),
    preview: withCtx(() => [
      (data.item?.title && data.tone)
        ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass(["title", { invert: !sameColors.value }])
          }, toDisplayString(unref(locale).title(data.item?.title)), 3))
        : createCommentVNode("", true),
      (data.tone)
        ? (openBlock(), createElementBlock("div", _hoisted_1, [
            createVNode(IconButton, {
              name: unref(t)('player.shuffle'),
              class: normalizeClass([{ invert: !sameColors.value }, "tertiary size-xl dirty"]),
              icon: "random"
            }, null, 8, ["name", "class"]),
            createVNode(AudioToggle, {
              state: state.value,
              light: true,
              class: normalizeClass(["size-l secondary dirty", { invert: data.tone !== 'dark' }]),
              onPlay: play,
              onPause: pause
            }, null, 8, ["state", "class"])
          ]))
        : createCommentVNode("", true)
    ]),
    toolbar: withCtx(() => [
      (data.tone)
        ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
            createVNode(IconButton, {
              icon: "heart",
              class: normalizeClass(["tertiary size-xl", { invert: !sameColors.value }]),
              onClick: like
            }, null, 8, ["class"]),
            createVNode(IconButton, {
              icon: "tg-stars",
              class: "tertiary size-xl",
              onClick: like
            }),
            createVNode(IconButton, {
              icon: "apps",
              class: normalizeClass(["tertiary size-l", { invert: !sameColors.value }]),
              onClick: openKebab
            }, null, 8, ["class"])
          ], 64))
        : createCommentVNode("", true)
    ]),
    detail: withCtx(() => [
      (data.item?.id)
        ? (openBlock(), createBlock(_sfc_main$1, {
            key: 0,
            skeletonCount: 16,
            showKebab: true,
            params: {
                    dicts: data.item.id,
                    state: 'PUBLISHED'
                },
            sort: {
                    code: 'ratingTotal',
                    direction: 'desc'
                },
            options: {
                    type: 'dict',
                    id: data.item.id
                }
          }, null, 8, ["params", "options"]))
        : createCommentVNode("", true)
    ]),
    _: 1
  }, 8, ["invertShadow"]))
}
}

};
const Dictionary = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-9549bb9f"]]);

export { Dictionary as D };
//# sourceMappingURL=Dictionary-5_NpW78L.js.map
