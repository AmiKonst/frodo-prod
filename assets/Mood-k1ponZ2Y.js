import { D as Dictionary } from './Dictionary-Z2LjKd8J.js';
import { _ as _sfc_main$1 } from './Ready-GpGi-JQK.js';
import { g as api, s as stores, r as reactive, c as createElementBlock, b as createBlock, d as createCommentVNode, e as createVNode, F as Fragment, f as openBlock } from './index-CRRNskBZ.js';
import './ItemDetail-Cf5bUAdv.js';
import './Tracks-CYsIN9dX.js';
import './Block-CWj2IF5i.js';
import './TitleWithButtons-DMWQjdHA.js';
import './EmptyLabel-DrkgHY8l.js';
import './Donate-Ig-SMDET.js';

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
//# sourceMappingURL=Mood-k1ponZ2Y.js.map
