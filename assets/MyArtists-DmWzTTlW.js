import { u as useI18n, s as stores, r as reactive, f as onMounted, g as onBeforeUnmount, c as createElementBlock, b as createBlock, d as createCommentVNode, e as createVNode, h as unref, F as Fragment, o as openBlock } from './index-CKTGRZtq.js';
import { _ as _sfc_main$2 } from './Ready-FU265Stf.js';
import { _ as _sfc_main$1 } from './Artists-DDKMP9RI.js';
/* empty css                                                                    */
import './State-BhxF9qj2.js';
import './TitleWithButtons-BDlEwcAt.js';
/* empty css                                                                          */
import './Slider-CfwW019_.js';
/* empty css                                                                */
import './EmptyLabel-CPXSCQQQ.js';
/* empty css                                                               */
import './Img-CgH7Ck6-.js';

const _sfc_main = {
  __name: 'MyArtists',
  setup(__props) {

    const { t } = useI18n();


    const tg = stores.tg();

    const data = reactive({
        ready: false
    });

    const init = async () => {
        data.ready = true;
    };

    onMounted(() => {
        tg.showBackButton();
    });

    onBeforeUnmount(() => {
        tg.hideBackButton();
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
//# sourceMappingURL=MyArtists-DmWzTTlW.js.map
