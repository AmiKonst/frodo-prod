import { D as Dictionary } from './Dictionary-BrmyjyCz.js';
import { _ as _sfc_main$1 } from './Ready-DUwg01Y-.js';
import { g as api, s as stores, r as reactive, c as createElementBlock, b as createBlock, d as createCommentVNode, e as createVNode, F as Fragment, f as openBlock } from './index-DzFgkFV4.js';
import './ItemDetail-CgEdrTpD.js';
import './Tracks-Da9oVjDL.js';
import './Block-Bp4STsxy.js';
import './TitleWithButtons-DenLd3Jh.js';
import './EmptyLabel-CR315zaK.js';
import './Donate-Vklv4HLs.js';

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
//# sourceMappingURL=Category-B6Tb1LM2.js.map
