import { D as Dictionary } from './Dictionary-CShMeqQc.js';
import { _ as _sfc_main$1 } from './Ready-BlAkbd9s.js';
import { a as api, s as stores, r as reactive, c as createElementBlock, b as createBlock, d as createCommentVNode, e as createVNode, F as Fragment, o as openBlock } from './index-BTMnNZXM.js';
import './Img-B-w7ijwj.js';
import './Tracks-CWwOnIn2.js';
import './State-D_85ba7X.js';
import './TitleWithButtons-wMv5Ngk5.js';
import './Slider-CZYasUIE.js';
import './EmptyLabel-Xc7DdU7d.js';

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
//# sourceMappingURL=Mood-xpKgCLCs.js.map
