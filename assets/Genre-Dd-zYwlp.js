import { D as Dictionary } from './Dictionary-DuJHfayU.js';
import { _ as _sfc_main$1 } from './Ready-DFy8Ysb2.js';
import { g as api, s as stores, r as reactive, c as createElementBlock, b as createBlock, d as createCommentVNode, e as createVNode, F as Fragment, f as openBlock } from './index-BsxOk-dY.js';
import './ItemDetail-CJ8wqsj0.js';
import './Tracks-cPN8vMue.js';
import './Block-CoXMFzSv.js';
import './TitleWithButtons-DZnCqyWW.js';
import './EmptyLabel-ED4im9Nj.js';
import './Donate-DEkDjOb0.js';

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
//# sourceMappingURL=Genre-Dd-zYwlp.js.map
