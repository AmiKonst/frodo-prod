import { D as Dictionary } from './Dictionary-DcyyDelt.js';
import { _ as _sfc_main$1 } from './Ready-C5K1C5nY.js';
import { g as api, s as stores, r as reactive, c as createElementBlock, b as createBlock, d as createCommentVNode, e as createVNode, F as Fragment, f as openBlock } from './index-DWzXmQCg.js';
import './ItemDetail-UPHe4B7u.js';
import './Tracks-DqyTdfaR.js';
import './Block-Cbe8SF6a.js';
import './TitleWithButtons-DRH87EXY.js';
import './EmptyLabel-Cxv3B-E5.js';
import './Donate-BEsGLXCt.js';

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
//# sourceMappingURL=Genre-CEya3lJT.js.map
