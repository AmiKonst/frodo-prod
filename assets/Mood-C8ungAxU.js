import { D as Dictionary } from './Dictionary-DzYWKXPq.js';
import { _ as _sfc_main$1 } from './Ready-D9_cDsr7.js';
import { g as api, s as stores, r as reactive, c as createElementBlock, b as createBlock, d as createCommentVNode, e as createVNode, F as Fragment, f as openBlock } from './index-ChmYYzql.js';
import './Img-DoZz5Vk1.js';
import './ItemDetail-CYCtmq45.js';
import './Tracks-U0bBS__N.js';
import './State-QwhQ3OE2.js';
import './TitleWithButtons-Dw4Mj1tK.js';
import './EmptyLabel-D728H_mC.js';
import './ContributorsPreview-CJeqZb4k.js';
import './AudioToggle-Ah2uSIA0.js';

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
//# sourceMappingURL=Mood-C8ungAxU.js.map
