import { D as Dictionary } from './Dictionary-CMsl1RLS.js';
import { _ as _sfc_main$1 } from './Ready-5CEw0uSh.js';
import { g as api, s as stores, r as reactive, c as createElementBlock, b as createBlock, d as createCommentVNode, e as createVNode, F as Fragment, f as openBlock } from './index-CYRtVo48.js';
import './ItemDetail-Dc1wdgbx.js';
import './Tracks-DXZ_gRMv.js';
import './Block-C61-PU63.js';
import './TitleWithButtons-Dx9y8JyM.js';
import './EmptyLabel-P6KLjgjb.js';
import './Donate-BKFwjJPS.js';

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
//# sourceMappingURL=Category-Bw86qaWF.js.map
