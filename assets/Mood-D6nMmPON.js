import { D as Dictionary } from './Dictionary-CEBwQ8lc.js';
import { _ as _sfc_main$1 } from './Ready-4sHgADA7.js';
import { g as api, s as stores, r as reactive, c as createElementBlock, b as createBlock, d as createCommentVNode, e as createVNode, F as Fragment, f as openBlock } from './index-C4gFX1_P.js';
import './ItemDetail-BYtmD3z8.js';
import './Tracks-Cs5lLDN6.js';
import './Block-ak6XTrkp.js';
import './TitleWithButtons-DqJJGFAX.js';
import './EmptyLabel-Cl5S_z5P.js';

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
//# sourceMappingURL=Mood-D6nMmPON.js.map
