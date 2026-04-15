import { u as useI18n, s as stores, r as reactive, o as onMounted, a as onBeforeUnmount, c as createElementBlock, b as createBlock, d as createCommentVNode, e as createVNode, h as unref, F as Fragment, f as openBlock } from './index-10pO3Arh.js';
import { _ as _sfc_main$2 } from './Ready-CvBxJVLd.js';
import { _ as _sfc_main$1 } from './Artists-BZ47eQGI.js';
import './EmptyLabel-Fj8sqyhN.js';
import './Block-dI6s_xGy.js';
import './TitleWithButtons-CbC0c-Jo.js';

const _sfc_main = {
  __name: 'MyArtists',
  setup(__props) {

    const { t } = useI18n();


    stores.messengers();

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
//# sourceMappingURL=MyArtists-C7RDzSNT.js.map
