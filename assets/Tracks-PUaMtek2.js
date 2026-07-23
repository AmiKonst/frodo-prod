import { _ as _export_sfc, u as useI18n, r as reactive, o as onMounted, a as onBeforeUnmount, c as createElementBlock, b as createBlock, d as createCommentVNode, e as createVNode, h as unref, F as Fragment, f as openBlock } from './index-BnJZuQ6k.js';
import { _ as _sfc_main$2 } from './Ready-DLrDF23C.js';
import { _ as _sfc_main$1 } from './Tracks-BWi0BLJZ.js';
import './Block-Dy2wu4We.js';
import './TitleWithButtons-Dm3xIi4W.js';
import './EmptyLabel-4781rUtn.js';

// import EmptyLabel from '🔗/components/ui/EmptyLabel.vue';
    // import stores from '@/stores';

    
const _sfc_main = {
  __name: 'Tracks',
  setup(__props) {

    const { t } = useI18n();


    // const messengers = stores.messengers();

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
            store: 'favorite',
            fnName: 'getTracks'
        },
          handler: "track",
          empty: {
            icon: 'favorite',
            title: unref(t)('pages.favorite.tracks.empty.title'),
            description: unref(t)('pages.favorite.tracks.empty.description')
        },
          showKebab: true,
          sort: {
            code: 'releaseDate',
            direction: 'desc'
        },
          title: "pages.favorite.tracks.title"
        }, null, 8, ["empty"]))
      : createCommentVNode("", true),
    createVNode(_sfc_main$2, {
      page: "favorite-tracks",
      init: init
    })
  ], 64))
}
}

};
const Tracks = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-ae9ec122"]]);

export { Tracks as default };
//# sourceMappingURL=Tracks-PUaMtek2.js.map
