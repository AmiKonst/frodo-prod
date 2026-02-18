import { D as Dictionary } from './Dictionary-OI0J37Vp.js';
import { _ as _sfc_main$1 } from './Ready-Dhp0qG4o.js';
import { g as api, s as stores, r as reactive, c as createElementBlock, b as createBlock, d as createCommentVNode, e as createVNode, F as Fragment, f as openBlock } from './index-C0MwdcC7.js';
import './ItemDetail-CXTItppL.js';
import './Tracks-OZn8vH8e.js';
import './Block-B72wMFlZ.js';
import './TitleWithButtons-DGlUXKR5.js';
import './EmptyLabel-CBmHCo6E.js';
import './Collage-ZXwKOA_0.js';

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
//# sourceMappingURL=Genre-B12SEoqV.js.map
