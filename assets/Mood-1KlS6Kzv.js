import { D as Dictionary } from './Dictionary-CHwiH6MG.js';
import { _ as _sfc_main$1 } from './Ready-DOuJl6BB.js';
import { g as api, s as stores, r as reactive, c as createElementBlock, b as createBlock, d as createCommentVNode, e as createVNode, F as Fragment, f as openBlock } from './index-CB_7iPVf.js';
import './ItemDetail-uzJifWTH.js';
import './Tracks-DiaOHQz4.js';
import './Block-Dws78ujt.js';
import './TitleWithButtons-C0_Ja9yA.js';
import './EmptyLabel-BREAS2AP.js';
import './Collage-BFxcsdPm.js';

const _sfc_main = {
  __name: 'Mood',
  props: {
        code: { type: String }
    },
  setup(__props) {

    const dict = api.dict();
    stores.locale();


    const props = __props;

    const data = reactive({
        ready: false,
        type: null
    });

    const init = async () => {
        const types = await dict.getTypes();

        data.type = types.find(item => item.code === 'moods');
        data.ready = true;
    };

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock(Fragment, null, [
    (data.ready)
      ? (openBlock(), createBlock(Dictionary, {
          key: 0,
          code: props.code,
          type: data.type
        }, null, 8, ["code", "type"]))
      : createCommentVNode("", true),
    createVNode(_sfc_main$1, {
      page: "mood",
      init: init
    })
  ], 64))
}
}

};

export { _sfc_main as default };
//# sourceMappingURL=Mood-1KlS6Kzv.js.map
