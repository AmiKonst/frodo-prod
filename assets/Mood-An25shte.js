import { D as Dictionary } from './Dictionary-DouaAoA4.js';
import { _ as _sfc_main$1 } from './Ready-BMW-Cziy.js';
import { g as api, s as stores, r as reactive, c as createElementBlock, b as createBlock, d as createCommentVNode, e as createVNode, F as Fragment, f as openBlock } from './index-9Bs__Z_A.js';
import './Img-BezXIE4e.js';
import './ItemDetail-CtjBreRh.js';
import './Tracks-9kcIKV_B.js';
import './State-DStlSQUZ.js';
import './TitleWithButtons-faYCR8SX.js';
import './EmptyLabel-AZu1wGtC.js';
import './ContributorsPreview-CMxoFBy_.js';
import './AudioToggle-D8seJEV-.js';

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
//# sourceMappingURL=Mood-An25shte.js.map
