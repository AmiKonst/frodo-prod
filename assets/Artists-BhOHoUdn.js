import { _ as _export_sfc, u as useI18n, r as reactive, o as onMounted, a as onBeforeUnmount, c as createElementBlock, b as createBlock, d as createCommentVNode, e as createVNode, h as unref, F as Fragment, f as openBlock } from './index-CMlHwxef.js';
import { _ as _sfc_main$2 } from './Ready-CObLGNJj.js';
import { _ as _sfc_main$1 } from './Artists-C4mJmO6X.js';
import './Block-DfAzDVTS.js';
import './TitleWithButtons-IaoKodCk.js';
import './EmptyLabel-BXIITihz.js';

// import EmptyLabel from '🔗/components/ui/EmptyLabel.vue';
    // import stores from '@/stores';

    
const _sfc_main = {
  __name: 'Artists',
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
            fnName: 'getArtists'
        },
          showKebab: true,
          handler: "artist",
          empty: {
            icon: 'artists',
            title: unref(t)('pages.favorite.artists.empty.title'),
            description: unref(t)('pages.favorite.artists.empty.description')
        },
          title: "pages.favorite.artists.title"
        }, null, 8, ["empty"]))
      : createCommentVNode("", true),
    createVNode(_sfc_main$2, {
      page: "favorite-artists",
      init: init
    })
  ], 64))
}
}

};
const Artists = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-033c8d27"]]);

export { Artists as default };
//# sourceMappingURL=Artists-BhOHoUdn.js.map
