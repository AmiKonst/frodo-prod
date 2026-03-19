import { u as useI18n, s as stores, c as createElementBlock, d as createCommentVNode, h as unref, f as openBlock, b as createBlock, B as Button, I as IconButton, F as Fragment } from './index-IzUk3CLS.js';

const _sfc_main = {
  __name: 'Donate',
  props: {
        inside: { type: Boolean, default: false },
        dunk: { type: Boolean, default: false }
    },
  setup(__props) {

    const { t } = useI18n();
    const messengers = stores.messengers();

    const props = __props;

    const donate = () => {
        message.info(t('common.soon'));
    };

return (_ctx, _cache) => {
  return (unref(messengers).isTg)
    ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
        (props.inside)
          ? (openBlock(), createBlock(Button, {
              key: 0,
              icon: "tg-stars",
              class: "secondary size-m",
              name: unref(t)('common.support'),
              dunk: props.dunk,
              onClick: donate
            }, null, 8, ["name", "dunk"]))
          : (openBlock(), createBlock(IconButton, {
              key: 1,
              icon: "tg-stars",
              class: "tertiary size-xl",
              dunk: props.dunk,
              onClick: donate
            }, null, 8, ["dunk"]))
      ], 64))
    : createCommentVNode("", true)
}
}

};

export { _sfc_main as _ };
//# sourceMappingURL=Donate-Cqiodg6l.js.map
