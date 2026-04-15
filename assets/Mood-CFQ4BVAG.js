import { D as Dictionary } from './Dictionary-BP6E9Net.js';
import { _ as _sfc_main$1 } from './Ready-mscTzoY8.js';
import { g as api, s as stores, r as reactive, c as createElementBlock, b as createBlock, d as createCommentVNode, e as createVNode, F as Fragment, f as openBlock } from './index-ClP55Rim.js';
import './ItemDetail-B04pu4or.js';
import './Tracks-CEBoUW6J.js';
import './Block-FlXlqW05.js';
import './TitleWithButtons-IeMWSRIq.js';
import './EmptyLabel-B7nHo-OM.js';
import './Collage-BSfYQoOs.js';
import './Donate-Tz6xOBL9.js';

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
//# sourceMappingURL=Mood-CFQ4BVAG.js.map
