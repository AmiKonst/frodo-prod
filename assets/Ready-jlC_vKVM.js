import { s as stores, j as storeToRefs, k as watch, a as onBeforeUnmount } from './index-BoU5CK3p.js';

const _sfc_main = {
  __name: 'Ready',
  props: {
    page: { type: String, default: '' },
    init: { type: Function, default: async () => {} }
},
  setup(__props) {

const nav = stores.nav();
const others = stores.others();

const { ready } = storeToRefs(others);

const props = __props;

const onReady = async () => {
    if (props.init) {
        await props.init();
    }

    nav.ready(props.page);

    others.setPageReady(true);
};

others.setPageReady(false);

if (ready.value) {
    onReady();
}

watch(
    () => ready.value,
    async () => {
        if (ready.value) {
            onReady();
        }
    }
);

onBeforeUnmount(() => {
    others.setPageReady(null);
});

return (_ctx, _cache) => {
  return null
}
}

};

export { _sfc_main as _ };
//# sourceMappingURL=Ready-jlC_vKVM.js.map
