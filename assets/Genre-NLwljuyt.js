import { D as Dictionary } from './Dictionary-Ct9g0xqb.js';
import { _ as _sfc_main$1 } from './Ready-CWAnPCtN.js';
import { g as api, s as stores, r as reactive, c as createElementBlock, b as createBlock, d as createCommentVNode, e as createVNode, F as Fragment, f as openBlock } from './index-B7gNE82-.js';
import './Img-DO8mDIge.js';
import './ItemDetail-BKZc8BeS.js';
import './Tracks-DhDC9-UB.js';
import './State-0HfWrjtu.js';
import './TitleWithButtons-rwSc2hRo.js';
import './EmptyLabel-B0KXfUJx.js';
import './ContributorsPreview-WLcUm38Z.js';
import './AudioToggle-B4DBiUrO.js';

const _sfc_main = {
  __name: 'Genre',
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

        data.type = types.find(item => item.code === 'genres');
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
//# sourceMappingURL=Genre-NLwljuyt.js.map
