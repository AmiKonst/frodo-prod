import { D as Dictionary } from './Dictionary-B5SHECOI.js';
import { _ as _sfc_main$1 } from './Ready-Bz1WJvsj.js';
import { g as api, s as stores, r as reactive, c as createElementBlock, b as createBlock, d as createCommentVNode, e as createVNode, F as Fragment, f as openBlock } from './index-DJgDPUSd.js';
import './ItemDetail-BGyiS-0Z.js';
import './Tracks-Drd4W_tF.js';
import './Block-oj4jR2JJ.js';
import './TitleWithButtons-BLw5Nn5a.js';
import './EmptyLabel-K10Gh1pz.js';
import './Collage-DtbEmJDL.js';

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
//# sourceMappingURL=Mood-Dgc0Adt_.js.map
