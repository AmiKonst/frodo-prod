import { D as Dictionary } from './Dictionary-swxowUYj.js';
import { _ as _sfc_main$1 } from './Ready-YmVa1JLN.js';
import { g as api, s as stores, r as reactive, c as createElementBlock, b as createBlock, d as createCommentVNode, e as createVNode, F as Fragment, f as openBlock } from './index-ErbI98v-.js';
import './ItemDetail-AIA3bvSv.js';
import './Tracks-Ah605YLl.js';
import './Block-BaDN6NxT.js';
import './TitleWithButtons-CbknntcI.js';
import './EmptyLabel-Cf2TyZYB.js';
import './Collage-C6r-AHQl.js';
import './Donate-Dx-0SGCe.js';

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
//# sourceMappingURL=Genre-a6P0lcJr.js.map
