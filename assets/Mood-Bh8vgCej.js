import { D as Dictionary } from './Dictionary-BPXBycnP.js';
import { _ as _sfc_main$1 } from './Ready-DqjfQjjV.js';
import { g as api, s as stores, r as reactive, c as createElementBlock, b as createBlock, d as createCommentVNode, e as createVNode, F as Fragment, f as openBlock } from './index-KCasvexA.js';
import './ItemDetail-3VSgA_nP.js';
import './Tracks-BK7E_XhS.js';
import './Block-D3w4Z4jm.js';
import './TitleWithButtons-8lsoIDj4.js';
import './EmptyLabel-B7BGfKzG.js';
import './Collage-CVySZkf7.js';

const _sfc_main = {
  __name: 'Mood',
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

        data.type = types.find(item => item.code === 'moods');
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
//# sourceMappingURL=Mood-Bh8vgCej.js.map
