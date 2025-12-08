import { D as Dictionary } from './Dictionary-BFTYmVHj.js';
import { _ as _sfc_main$1 } from './Ready-BIe7V7ko.js';
import { g as api, s as stores, r as reactive, c as createElementBlock, b as createBlock, d as createCommentVNode, e as createVNode, F as Fragment, f as openBlock } from './index-DELd_N75.js';
import './Img-B7zQpR5P.js';
import './ItemDetail-BJTXIuPo.js';
import './Tracks-BqUUtd4r.js';
import './State-D7PrnqCa.js';
import './TitleWithButtons-CL-adEFd.js';
import './EmptyLabel-CQcB2CWT.js';
import './ContributorsPreview-DKIByIUj.js';
import './AudioToggle-eBr6c_Lb.js';

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
//# sourceMappingURL=Category-DaAnzJUu.js.map
