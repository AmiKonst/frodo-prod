import { D as Dictionary } from './Dictionary-BODnHz6D.js';
import { _ as _sfc_main$1 } from './Ready-DqHQRrr4.js';
import { a as api, s as stores, r as reactive, c as createElementBlock, b as createBlock, d as createCommentVNode, e as createVNode, F as Fragment, o as openBlock } from './index-DUsfbmnu.js';
import './Img-CrkG_xlQ.js';
import './TrackPreview.vue_vue_type_style_index_0_scoped_0fe5f002_lang-DP0_ZhXl.js';
/* empty css                                                                          */
/* empty css                                                                */
/* empty css                                                                    */
/* empty css                                                               */

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
//# sourceMappingURL=Genre-DVcIH2-F.js.map
