import { D as Dictionary } from './Dictionary-BMaRKjyq.js';
import { _ as _sfc_main$1 } from './Ready-BVWA-kB1.js';
import { a as api, s as stores, r as reactive, c as createElementBlock, b as createBlock, d as createCommentVNode, e as createVNode, F as Fragment, o as openBlock } from './index-104WYXIP.js';
import './Img-E9NuTJn8.js';
import './Tracks-BHPCwwmB.js';
import './State-B6K11K5M.js';
import './TitleWithButtons-gnZzz47A.js';
import './Slider-DBdTPL2x.js';
import './EmptyLabel-BhL4SMvP.js';

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
//# sourceMappingURL=Category-DnuKx8TO.js.map
