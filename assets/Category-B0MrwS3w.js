import { D as Dictionary } from './Dictionary-LJYQwhbO.js';
import { _ as _sfc_main$1 } from './Ready-iR76JErS.js';
import { g as api, s as stores, r as reactive, c as createElementBlock, b as createBlock, d as createCommentVNode, e as createVNode, F as Fragment, f as openBlock } from './index-DpXZ90da.js';
import './ItemDetail-DimAh5Kh.js';
import './Tracks-Csgccmk-.js';
import './Block-Dnfa4--J.js';
import './TitleWithButtons-DdRHYOOT.js';
import './EmptyLabel-DfjzfwYH.js';
import './Collage-BcJW-iRt.js';
import './Donate-7lBQyTLx.js';

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
//# sourceMappingURL=Category-B0MrwS3w.js.map
