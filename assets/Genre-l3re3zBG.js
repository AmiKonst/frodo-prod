import { D as Dictionary } from './Dictionary-BeWSeqpL.js';
import { _ as _sfc_main$1 } from './Ready-B0PdsUbI.js';
import { g as api, s as stores, r as reactive, c as createElementBlock, b as createBlock, d as createCommentVNode, e as createVNode, F as Fragment, f as openBlock } from './index-BCxK_-8k.js';
import './ItemDetail-B8flsjw6.js';
import './Tracks-CZLrLWJB.js';
import './Block-DHhjfNqn.js';
import './TitleWithButtons-wyzJYGtM.js';
import './EmptyLabel-BG67O5vr.js';
import './Collage-VZ0byvha.js';

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
//# sourceMappingURL=Genre-l3re3zBG.js.map
