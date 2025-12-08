import { D as Dictionary } from './Dictionary-CQq-zMQc.js';
import { _ as _sfc_main$1 } from './Ready-DlpqsgVL.js';
import { g as api, s as stores, r as reactive, c as createElementBlock, b as createBlock, d as createCommentVNode, e as createVNode, F as Fragment, f as openBlock } from './index-DhNDL289.js';
import './Img-Bt9vGMTL.js';
import './ItemDetail-CU1BwQ29.js';
import './Tracks-BE5iTCdU.js';
import './State-BjnB8-vT.js';
import './TitleWithButtons-DgUGK7VZ.js';
import './EmptyLabel-C-GIavby.js';
import './ContributorsPreview-B4ehQycO.js';
import './AudioToggle-CXg-SmCL.js';

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
//# sourceMappingURL=Mood--76JcorY.js.map
