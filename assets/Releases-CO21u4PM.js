import { _ as _export_sfc, u as useI18n, r as reactive, o as onMounted, a as onBeforeUnmount, c as createElementBlock, b as createBlock, d as createCommentVNode, e as createVNode, h as unref, F as Fragment, f as openBlock } from './index-C0Uadw9q.js';
import { _ as _sfc_main$2 } from './Ready-CcQPldRz.js';
import { _ as _sfc_main$1 } from './Releases-E8-4l93P.js';
import './Block-D62F5hrH.js';
import './TitleWithButtons-CkesmMc2.js';
import './EmptyLabel-B5aJ7sMa.js';

// import EmptyLabel from '🔗/components/ui/EmptyLabel.vue';
    // import stores from '@/stores';

    
const _sfc_main = {
  __name: 'Releases',
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
            fnName: 'getReleases'
        },
          handler: "release",
          showKebab: true,
          empty: {
            icon: 'release',
            title: unref(t)('pages.favorite.releases.empty.title'),
            description: unref(t)('pages.favorite.releases.empty.description')
        },
          sort: {
            code: 'releaseDate',
            direction: 'desc'
        },
          title: "pages.favorite.releases.title"
        }, null, 8, ["empty"]))
      : createCommentVNode("", true),
    createVNode(_sfc_main$2, {
      page: "favorite-releases",
      init: init
    })
  ], 64))
}
}

};
const Releases = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-9efd8e86"]]);

export { Releases as default };
//# sourceMappingURL=Releases-CO21u4PM.js.map
