import { u as useI18n, r as reactive, b as createBlock, h as unref, o as openBlock } from './index-CpC3Lif0.js';
import { E as EmptyLabel } from './EmptyLabel-B1BNRZq0.js';

const _sfc_main = {
  __name: 'Error',
  setup(__props) {

    const { t, tm, rt } = useI18n();

    const description = tm('pages.error.descriptions').map(item => rt(item));

    const data = reactive({
        description: description[Math.min(parseInt(Math.random() * description.length), description.length - 1)] 
    });

return (_ctx, _cache) => {
  return (openBlock(), createBlock(EmptyLabel, {
    title: unref(t)('pages.error.title'),
    description: data.description
  }, null, 8, ["title", "description"]))
}
}

};

export { _sfc_main as default };
//# sourceMappingURL=Error-DOQa_4Bn.js.map
