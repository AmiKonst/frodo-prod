import { D as Dictionary } from './Dictionary-D6YrYPSp.js';
import { _ as _sfc_main$1 } from './Ready-qlXZGRsT.js';
import { g as api, s as stores, r as reactive, c as createElementBlock, b as createBlock, d as createCommentVNode, e as createVNode, F as Fragment, f as openBlock } from './index-C3yNwPiv.js';
import './ItemDetail-obJpq_R4.js';
import './Tracks-DA86bHp5.js';
import './Block-BGScWOuP.js';
import './TitleWithButtons-agM5Gj3v.js';
import './EmptyLabel-D43JU2Cy.js';
import './Donate-DTwNMF5P.js';

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
//# sourceMappingURL=Mood-Bv018ccf.js.map
