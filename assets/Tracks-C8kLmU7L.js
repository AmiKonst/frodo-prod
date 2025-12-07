import { u as useI18n, s as stores, r as reactive, o as onMounted, a as onBeforeUnmount, c as createElementBlock, b as createBlock, d as createCommentVNode, e as createVNode, F as Fragment, f as openBlock, g as api } from './index-BI-3nrMk.js';
import { _ as _sfc_main$2 } from './Ready-Bl9GBNlW.js';
import { _ as _sfc_main$1 } from './Tracks-SWdZ_p1V.js';
import './State-Cb4344qs.js';
import './TitleWithButtons-DcDwgFt4.js';
import './EmptyLabel-BVDoqm1U.js';
import './Img-CWVg-dCQ.js';
import './ContributorsPreview-CiputVjS.js';

const _sfc_main = {
  __name: 'Tracks',
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
            code: 'ratingTotal',
            direction: 'desc'
        },
          options: {
            type: 'artist',
            id: data.item.id
        },
          loadMore: true,
          title: "blocks.tracks.popular-tracks"
        }, null, 8, ["params", "options"]))
      : createCommentVNode("", true),
    createVNode(_sfc_main$2, {
      page: `artist-tracks-${props.code}`,
      init: init
    }, null, 8, ["page"])
  ], 64))
}
}

};

export { _sfc_main as default };
//# sourceMappingURL=Tracks-C8kLmU7L.js.map
