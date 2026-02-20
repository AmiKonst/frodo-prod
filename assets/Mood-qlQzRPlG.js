import { D as Dictionary } from './Dictionary-BOp8otF2.js';
import { _ as _sfc_main$1 } from './Ready-BrmvPZ-y.js';
import { g as api, s as stores, r as reactive, c as createElementBlock, b as createBlock, d as createCommentVNode, e as createVNode, F as Fragment, f as openBlock } from './index-BK31XTzT.js';
import './ItemDetail-Btu66BRV.js';
import './Tracks-Bsn1Vcwh.js';
import './Block-BL1Vq-nU.js';
import './TitleWithButtons-B5ih5304.js';
import './EmptyLabel-CFDrXWqO.js';
import './Collage-4AuS5-uu.js';

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
//# sourceMappingURL=Mood-qlQzRPlG.js.map
