import { u as useI18n, r as reactive, b as createBlock, i as unref, f as openBlock } from './index-rWxl7z7a.js';
import { E as EmptyLabel } from './EmptyLabel-Dq8FdHVV.js';

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
//# sourceMappingURL=Error-S6Fc3L0C.js.map
