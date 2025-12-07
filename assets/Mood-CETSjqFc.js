import { D as Dictionary } from './Dictionary-BKj6C5_a.js';
import { _ as _sfc_main$1 } from './Ready-DmGHqbY4.js';
import { g as api, s as stores, r as reactive, c as createElementBlock, b as createBlock, d as createCommentVNode, e as createVNode, F as Fragment, f as openBlock } from './index-DXBCCm8O.js';
import './Img-C4iyL-YW.js';
import './ItemDetail-Di8-M4YK.js';
import './Tracks-lQWhQmlg.js';
import './State-BqISYpYL.js';
import './TitleWithButtons-Cpbc5p4Y.js';
import './Slider-CcCEn26r.js';
import './EmptyLabel-X5dCrVNd.js';
import './ContributorsPreview-sPJP1ob7.js';

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
//# sourceMappingURL=Mood-CETSjqFc.js.map
