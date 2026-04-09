import { D as Dictionary } from './Dictionary-DAETAY42.js';
import { _ as _sfc_main$1 } from './Ready-CtCZTLdQ.js';
import { g as api, s as stores, r as reactive, c as createElementBlock, b as createBlock, d as createCommentVNode, e as createVNode, F as Fragment, f as openBlock } from './index-CuaVwrop.js';
import './ItemDetail-DPFWPeNu.js';
import './Tracks-DumPrjTf.js';
import './Block--CVwuKBn.js';
import './TitleWithButtons-Dra1mcic.js';
import './EmptyLabel-Dq-tUJ9d.js';
import './Collage-DCi8IPO2.js';
import './Donate-Cl4-A5jA.js';

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
//# sourceMappingURL=Mood-CDgwflHP.js.map
