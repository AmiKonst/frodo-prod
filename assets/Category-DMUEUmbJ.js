import { D as Dictionary } from './Dictionary-yPzAzGid.js';
import { _ as _sfc_main$1 } from './Ready-CvBxJVLd.js';
import { g as api, s as stores, r as reactive, c as createElementBlock, b as createBlock, d as createCommentVNode, e as createVNode, F as Fragment, f as openBlock } from './index-10pO3Arh.js';
import './ItemDetail-BgW7iAWF.js';
import './Tracks-Ux6VfDNr.js';
import './Block-dI6s_xGy.js';
import './TitleWithButtons-CbC0c-Jo.js';
import './EmptyLabel-Fj8sqyhN.js';
import './Collage-CFp_XuGr.js';
import './Donate-DYzJ8QHq.js';

const _sfc_main = {
  __name: 'Category',
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

        data.type = types.find(item => item.code === 'categories');
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
      page: "category",
      init: init
    })
  ], 64))
}
}

};

export { _sfc_main as default };
//# sourceMappingURL=Category-DMUEUmbJ.js.map
