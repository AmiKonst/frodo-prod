import { D as Dictionary } from './Dictionary-CrVPCy2G.js';
import { _ as _sfc_main$1 } from './Ready-fj_R6j7s.js';
import { g as api, s as stores, r as reactive, c as createElementBlock, b as createBlock, d as createCommentVNode, e as createVNode, F as Fragment, f as openBlock } from './index-CR7k28XP.js';
import './ItemDetail-C43uE1P9.js';
import './Tracks-D5FC0Cdf.js';
import './Block-BgmLh7Pf.js';
import './TitleWithButtons-BDROImmx.js';
import './EmptyLabel-BAQIRAue.js';
import './Collage-BUhMz9MC.js';

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
//# sourceMappingURL=Mood-CxAKLSg9.js.map
