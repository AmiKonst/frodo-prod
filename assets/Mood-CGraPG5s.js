import { D as Dictionary } from './Dictionary-CFDzSxIf.js';
import { _ as _sfc_main$1 } from './Ready-DqJ7w4x5.js';
import { g as api, s as stores, r as reactive, c as createElementBlock, b as createBlock, d as createCommentVNode, e as createVNode, F as Fragment, f as openBlock } from './index-CUOkArLi.js';
import './Img-D3tvasOH.js';
import './ItemDetail-BOBbrLEp.js';
import './Tracks-X4fy57i8.js';
import './State-DryRNXBD.js';
import './TitleWithButtons-Rc4xD_vZ.js';
import './EmptyLabel-C7q6ONME.js';
import './ContributorsPreview-pjj8aBku.js';
import './AudioToggle-Bd7ImAcJ.js';

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
//# sourceMappingURL=Mood-CGraPG5s.js.map
