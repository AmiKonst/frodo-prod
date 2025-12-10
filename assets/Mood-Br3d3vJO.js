import { D as Dictionary } from './Dictionary-DV_vmZ9i.js';
import { _ as _sfc_main$1 } from './Ready-iY044k30.js';
import { g as api, s as stores, r as reactive, c as createElementBlock, b as createBlock, d as createCommentVNode, e as createVNode, F as Fragment, f as openBlock } from './index-DHhva-P5.js';
import './Img-AQ-PuFT_.js';
import './ItemDetail-BzzZfGzz.js';
import './Tracks-ug8Zeqes.js';
import './State-C2KuYI4w.js';
import './TitleWithButtons-Dw707SE2.js';
import './EmptyLabel-CgFRm93W.js';
import './ContributorsPreview-DVvZuhJA.js';
import './AudioToggle-DiYelP1S.js';

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
//# sourceMappingURL=Mood-Br3d3vJO.js.map
