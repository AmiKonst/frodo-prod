import { _ as _export_sfc, u as useI18n, r as reactive, o as onMounted, a as onBeforeUnmount, c as createElementBlock, b as createBlock, d as createCommentVNode, e as createVNode, h as unref, F as Fragment, f as openBlock } from './index-Bt4oerUp.js';
import { _ as _sfc_main$2 } from './Ready-D9Xb3Vm2.js';
import { _ as _sfc_main$1 } from './Playlists-DEXuSntH.js';
import './Block-Dt_dbFLB.js';
import './TitleWithButtons-C95qX2Ek.js';
import './EmptyLabel-BmHgn5cm.js';
/* empty css                                                                         */

// import EmptyLabel from '🔗/components/ui/EmptyLabel.vue';
    // import stores from '@/stores';

    
const _sfc_main = {
  __name: 'Playlists',
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
            fnName: 'getPlaylists'
        },
          handler: "playlist",
          empty: {
            icon: 'playlist',
            title: unref(t)('pages.favorite.playlists.empty.title'),
            description: unref(t)('pages.favorite.playlists.empty.description')
        },
          showKebab: true,
          title: "pages.favorite.playlists.title"
        }, null, 8, ["empty"]))
      : createCommentVNode("", true),
    createVNode(_sfc_main$2, {
      page: "favorite-playlists",
      init: init
    })
  ], 64))
}
}

};
const Playlists = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-a6286137"]]);

export { Playlists as default };
//# sourceMappingURL=Playlists-CFwTz_wU.js.map
