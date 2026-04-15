import { u as useI18n, s as stores, r as reactive, o as onMounted, a as onBeforeUnmount, c as createElementBlock, b as createBlock, d as createCommentVNode, e as createVNode, F as Fragment, f as openBlock, g as api } from './index-7exvV88S.js';
import { _ as _sfc_main$2 } from './Ready-dMrDvLEi.js';
import { _ as _sfc_main$1 } from './Tracks-LVj7Gk5x.js';
import './Block-DBs0HlFC.js';
import './TitleWithButtons-DLQ59jVy.js';
import './EmptyLabel-D12H9WKZ.js';
import './Collage-CHKqCsgx.js';

const _sfc_main = {
  __name: 'Tracks',
  props: {
        code: { type: String }
    },
  setup(__props) {

    const { t } = useI18n();

    const messengers = stores.messengers();
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
        messengers.showSettingsButton(openArtistKebab);
    });

    onBeforeUnmount(() => {
        messengers.hideSettingsButton(openArtistKebab);
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
          showKebab: true,
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
//# sourceMappingURL=Tracks-CAQpVr4U.js.map
