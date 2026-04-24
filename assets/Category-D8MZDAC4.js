import { D as Dictionary } from './Dictionary-Dn6g6EQE.js';
import { _ as _sfc_main$1 } from './Ready-DtJcS1_e.js';
import { g as api, s as stores, r as reactive, c as createElementBlock, b as createBlock, d as createCommentVNode, e as createVNode, F as Fragment, f as openBlock } from './index-DqmhbH1W.js';
import './ItemDetail-DVy-duVD.js';
import './Tracks-_47cJBGD.js';
import './Block-oOANgwlZ.js';
import './TitleWithButtons-DaVSwulm.js';
import './EmptyLabel-DCEkIbIE.js';
import './Donate-6bV3-4PF.js';

const _sfc_main = {
  __name: 'Category',
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

        data.type = types.find(item => item.code === 'categories');
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
      page: "category",
      init: init
    })
  ], 64))
}
}

};

export { _sfc_main as default };
//# sourceMappingURL=Category-D8MZDAC4.js.map
