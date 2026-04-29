import { D as Dictionary } from './Dictionary-DycXLd0h.js';
import { _ as _sfc_main$1 } from './Ready-D9Xb3Vm2.js';
import { g as api, s as stores, r as reactive, c as createElementBlock, b as createBlock, d as createCommentVNode, e as createVNode, F as Fragment, f as openBlock } from './index-Bt4oerUp.js';
import './ItemDetail-jIrtJryQ.js';
import './Tracks-DoNZS4in.js';
import './Block-Dt_dbFLB.js';
import './TitleWithButtons-C95qX2Ek.js';
import './EmptyLabel-BmHgn5cm.js';
import './Donate-BCFOxZ60.js';

const _sfc_main = {
  __name: 'Genre',
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

        data.type = types.find(item => item.code === 'genres');
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
//# sourceMappingURL=Genre-CtVfLHbi.js.map
