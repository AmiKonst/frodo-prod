import { u as useI18n, s as stores, r as reactive, o as onMounted, a as onBeforeUnmount, c as createElementBlock, b as createBlock, d as createCommentVNode, e as createVNode, h as unref, F as Fragment, f as openBlock } from './index-2Ea_BUm3.js';
import { _ as _sfc_main$2 } from './Ready-BJwqI0nY.js';
import { _ as _sfc_main$1 } from './Artists-CM5ngKN6.js';
import './EmptyLabel-BnEfysrj.js';
import './Block-FeBT2cJx.js';
import './TitleWithButtons-AfOJSnkI.js';

const _sfc_main = {
  __name: 'MyArtists',
  setup(__props) {

    const { t } = useI18n();


    stores.tg();

    const data = reactive({
        ready: false
    });

    const init = async () => {
        data.ready = true;
    };

    onMounted(() => {
    });

    onBeforeUnmount(() => {
    });

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock(Fragment, null, [
    (data.ready)
      ? (openBlock(), createBlock(_sfc_main$1, {
          key: 0,
          source: {
            store: 'user',
            fnName: 'getMyArtists'
        },
          handler: "artist",
          empty: {
            title: unref(t)('pages.favorite-my-artists.empty.title'),
            description: unref(t)('pages.favorite-my-artists.empty.description')
        },
          title: "pages.favorite-my-artists.title"
        }, null, 8, ["empty"]))
      : createCommentVNode("", true),
    createVNode(_sfc_main$2, {
      page: "favorite-my-artists",
      init: init
    })
  ], 64))
}
}

};

export { _sfc_main as default };
//# sourceMappingURL=MyArtists-DOfHwFFf.js.map
