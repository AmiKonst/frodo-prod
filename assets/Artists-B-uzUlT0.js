import { u as useI18n, s as stores, r as reactive, o as onMounted, a as onBeforeUnmount, c as createElementBlock, b as createBlock, d as createCommentVNode, e as createVNode, F as Fragment, f as openBlock } from './index-hoKVoPRA.js';
import { _ as _sfc_main$2 } from './Ready-CA6nC8m1.js';
import { _ as _sfc_main$1 } from './Artists-BkojZEbC.js';
import './Block-HIdqbk_s.js';
import './TitleWithButtons-DYNmx57K.js';
import './EmptyLabel-S26OA1tU.js';

const _sfc_main = {
  __name: 'Artists',
  setup(__props) {

    const { t } = useI18n();

    stores.tg();

    const data = reactive({
        ready: false,
        item: null
    });

    const init = async () => {
        data.ready = true;
    };


    onMounted(async () => {
    });

    onBeforeUnmount(() => {
    });

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock(Fragment, null, [
    (data.ready)
      ? (openBlock(), createBlock(_sfc_main$1, {
          key: 0,
          take: 30,
          skeletonCount: 12,
          params: {
            state: 'PUBLISHED'
        },
          sort: {
            code: 'createdAt',
            direction: 'desc'
        },
          showKebab: true,
          loadMore: true,
          handler: "artist",
          title: "blocks.artists.new-artists"
        }))
      : createCommentVNode("", true),
    createVNode(_sfc_main$2, {
      page: `artists-list`,
      init: init
    })
  ], 64))
}
}

};

export { _sfc_main as default };
//# sourceMappingURL=Artists-B-uzUlT0.js.map
