import { D as Dictionary } from './Dictionary-ByXyWCBn.js';
import { _ as _sfc_main$1 } from './Ready-Dru0EF4_.js';
import { g as api, s as stores, r as reactive, c as createElementBlock, b as createBlock, d as createCommentVNode, e as createVNode, F as Fragment, f as openBlock } from './index-D3rr0FWO.js';
import './ItemDetail-DUL3zqMS.js';
import './Tracks-DBZcCgpI.js';
import './Block-TW7XEMGc.js';
import './TitleWithButtons-CiYxVu_B.js';
import './EmptyLabel-Dxiw-Yf7.js';

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
//# sourceMappingURL=Category-B5euWmLg.js.map
