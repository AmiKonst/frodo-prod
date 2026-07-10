import { D as Dictionary } from './Dictionary-DcocA703.js';
import { _ as _sfc_main$1 } from './Ready-B_a5e_gO.js';
import { g as api, s as stores, r as reactive, c as createElementBlock, b as createBlock, d as createCommentVNode, e as createVNode, F as Fragment, f as openBlock } from './index-CGxb6vj5.js';
import './ItemDetail-9NwDOyvR.js';
import './Tracks-DC-Q6yNn.js';
import './Block-DGPqYrkq.js';
import './TitleWithButtons-CiTReal3.js';
import './EmptyLabel-Bkg8mugv.js';
import './Donate-9DsJBgIk.js';

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
//# sourceMappingURL=Genre-DskkAp5M.js.map
