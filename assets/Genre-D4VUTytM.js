import { D as Dictionary } from './Dictionary-FXXVxwQf.js';
import { _ as _sfc_main$1 } from './Ready-uzdqbP1F.js';
import { g as api, s as stores, r as reactive, c as createElementBlock, b as createBlock, d as createCommentVNode, e as createVNode, F as Fragment, f as openBlock } from './index-Ds8hw2Kq.js';
import './Img-DM9zBnWe.js';
import './ItemDetail-D3iUJcg2.js';
import './Tracks-DWE2m2p9.js';
import './State-B1ghwxzF.js';
import './TitleWithButtons-8oSDOWD4.js';
import './EmptyLabel-D6Uik0Fy.js';
import './ContributorsPreview-BfRlAAiM.js';
import './AudioToggle-Ct-YnknI.js';

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
//# sourceMappingURL=Genre-D4VUTytM.js.map
