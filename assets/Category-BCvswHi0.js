import { D as Dictionary } from './Dictionary-2ih0-g86.js';
import { _ as _sfc_main$1 } from './Ready-Deqe0KX3.js';
import { g as api, s as stores, r as reactive, c as createElementBlock, b as createBlock, d as createCommentVNode, e as createVNode, F as Fragment, f as openBlock } from './index-DNB2u1CE.js';
import './ItemDetail-Cjz4pVMb.js';
import './Tracks-BB-Bie2X.js';
import './Block-CVi9c7G0.js';
import './TitleWithButtons--2la0jMc.js';
import './EmptyLabel-B_-eiWRx.js';
import './Collage-COBCodBC.js';
import './Donate-DdQZzgn7.js';

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
//# sourceMappingURL=Category-BCvswHi0.js.map
