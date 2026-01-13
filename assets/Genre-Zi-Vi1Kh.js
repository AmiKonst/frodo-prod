import { D as Dictionary } from './Dictionary-DSo67wGm.js';
import { _ as _sfc_main$1 } from './Ready-CK80f0xP.js';
import { g as api, s as stores, r as reactive, c as createElementBlock, b as createBlock, d as createCommentVNode, e as createVNode, F as Fragment, f as openBlock } from './index-BitdTg2e.js';
import './ItemDetail-B5qcJYNW.js';
import './Tracks-BMkU4Cvc.js';
import './Block-BnczIn_j.js';
import './TitleWithButtons-CuoQKvTt.js';
import './EmptyLabel-B2N6KFwN.js';

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
//# sourceMappingURL=Genre-Zi-Vi1Kh.js.map
