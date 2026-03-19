import { u as useI18n, s as stores, r as reactive, o as onMounted, a as onBeforeUnmount, c as createElementBlock, b as createBlock, d as createCommentVNode, e as createVNode, F as Fragment, f as openBlock, g as api } from './index-IzUk3CLS.js';
import { _ as _sfc_main$2 } from './Ready-CoRh-qw8.js';
import { _ as _sfc_main$1 } from './Releases-K1-5k3tU.js';
import './Block-BCDrmDAk.js';
import './TitleWithButtons-Cv_yDlgj.js';
import './EmptyLabel-BRWGhZNk.js';

const _sfc_main = {
  __name: 'Releases',
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
//# sourceMappingURL=Releases-C1_FH7I7.js.map
