import { u as useI18n, s as stores, r as reactive, o as onMounted, a as onBeforeUnmount, c as createElementBlock, b as createBlock, d as createCommentVNode, e as createVNode, F as Fragment, f as openBlock, g as api } from './index-CUCm_fvO.js';
import { _ as _sfc_main$2 } from './Ready-BitJXeGI.js';
import { _ as _sfc_main$1 } from './Releases-DJySXTvy.js';
import './Block-BK_8isVT.js';
import './TitleWithButtons-BhwgcHOp.js';
import './EmptyLabel-CuhNP1xK.js';

const _sfc_main = {
  __name: 'Releases',
  props: {
        code: { type: String }
    },
  setup(__props) {

    const { t } = useI18n();

    const tg = stores.tg();
    const modals = stores.modals();

    const props = __props;

    const data = reactive({
        ready: false,
        item: null
    });

    const init = async () => {
        data.item = await api.artists().getByCode(props.code);
        data.ready = true;
    };

    const openArtistKebab = () => {
        modals.open('artist-kebab', { quietClose: true, data: { code: props.code } });
    };

    onMounted(async () => {
        tg.showBackButton();
        tg.showSettingsButton(openArtistKebab);
    });

    onBeforeUnmount(() => {
        tg.hideSettingsButton(openArtistKebab);
        tg.hideBackButton();
    });

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock(Fragment, null, [
    (data.item?.id)
      ? (openBlock(), createBlock(_sfc_main$1, {
          key: 0,
          params: {
            contributors: data.item.id,
            state: 'PUBLISHED'
        },
          sort: {
            code: 'releaseDate',
            direction: 'desc'
        },
          showKebab: true,
          loadMore: true,
          title: "blocks.releases.latest-releases",
          handler: "release"
        }, null, 8, ["params"]))
      : createCommentVNode("", true),
    createVNode(_sfc_main$2, {
      page: `artist-releases-${props.code}`,
      init: init
    }, null, 8, ["page"])
  ], 64))
}
}

};

export { _sfc_main as default };
//# sourceMappingURL=Releases-BrnU5t1S.js.map
