import { s as stores, f as storeToRefs, w as watch, g as onBeforeUnmount } from './index-28UnDxfp.js';

const _sfc_main = {
  __name: 'Ready',
  props: {
    page: { type: String, default: '' },
    init: { type: Function, default: async () => {} }
},
  emits: ['ready'],
  setup(__props, { emit: __emit }) {

const nav = stores.nav();
const others = stores.others();

const { ready } = storeToRefs(others);

const props = __props;

const emit = __emit;

const onReady = async () => {
    if (props.init) {
        await props.init();
    }

    if (props.page === nav.page) {
        emit('ready');
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
//# sourceMappingURL=Ready-UgO2-eLN.js.map
