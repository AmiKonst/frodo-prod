import { _ as _export_sfc, u as useI18n, s as stores, r as reactive, j as computed, J as formatDuration, K as hooks, f as onMounted, a as api, b as createBlock, o as openBlock, k as withCtx, c as createElementBlock, d as createCommentVNode, p as createBaseVNode, e as createVNode, I as IconButton, h as unref, B as Button, F as Fragment, l as renderList, t as toDisplayString, H as BaseModal, m as message } from './index-D3R6xFb2.js';
import { I as Img } from './Img-Cg4gaCDd.js';
import { _ as _sfc_main$1 } from './Artists-mc02wI-3.js';
import './State-DRMByaeq.js';
import './TitleWithButtons-C8MNvmSc.js';
import './Slider-C1SLiaLo.js';
import './EmptyLabel-CRdgH2sW.js';

const _hoisted_1 = {
  key: 0,
  class: "box"
};
const _hoisted_2 = { class: "gallery" };
const _hoisted_3 = { class: "buttons" };
const _hoisted_4 = { class: "static-params" };


const _sfc_main = {
  __name: 'ModalRelease',
  setup(__props) {

const { t } = useI18n();

stores.tg();
const modals = stores.modals();
const share = stores.share();

const data = reactive({
    loading: true,
    moods: [],
    genres: []
});

const items = computed(() => {
    if (!data?.item?.id) {
        return;
    }
    const result = [
        {
            value: data.item.fromProject,
            name: 'modals.release.from-project'
        },
        {
            value: data.item.type,
            name: 'modals.release.type'
        },
        {
            value: formatDuration(data.item.duration),
            name: 'modals.release.duration'
        },
        {
            value: data.item.trackCount,
            name: 'modals.release.track-count'
        },
        {
            value: !data.item.preorderDate ? null :
                hooks(data.item.preorderDate).format('DD MMMM YYYY, HH:mm'),
            name: 'modals.release.preorder-date'
        },
        {
            value: !data.item.releaseDate ? null :
                hooks(data.item.releaseDate).format('DD MMMM YYYY, HH:mm'),
            name: 'modals.release.release-date'
        },
        {
            value: data.item.instrumental ?
                t('modals.release.yes') :
                t('modals.release.no'),
            name: 'modals.release.instrumental'
        },
        {
            value: data.item.instrumental ? null :
                data.item.language,
            name: 'modals.release.language'
        },
    ];

    return result.filter(item => item.value !== null);
});

// Contributors
    const primaryArtists = computed(() => {
        if (!data.item?.contributors?.length) {
            return [];
        }

        return data.item.contributors.filter(item => item.role === 'PRIMARY' && item.state === 'CONFIRMED').map(item => item.artist);
    });

    const featuresArtists = computed(() => {
        if (!data.item?.contributors?.length) {
            return [];
        }

        return data.item.contributors.filter(item => item.role === 'FEATURED' && item.state === 'CONFIRMED').map(item => item.artist);
    });

    const otherArtists = computed(() => {
        return [
            {
                role: 'PRODUCER',
                title: 'blocks.artists.producer'
            },
            {
                role: 'REMIXER',
                title: 'blocks.artists.remixer'
            },
            {
                role: 'COMPOSER',
                title: 'blocks.artists.composer'
            },
            {
                role: 'MIXER',
                title: 'blocks.artists.mixer'
            },
            {
                role: 'MASTERING_ENGINEER',
                title: 'blocks.artists.mastering-engineer'
            },
            {
                role: 'LYRICIST',
                title: 'blocks.artists.lyricist'
            }
        ].map(payload => ({
            title: payload.title,
            contributors: data.item.contributors.filter(item => item.role === payload.role && item.state === 'CONFIRMED').map(item => item.artist)
        })).filter(item => !!item.contributors?.length)
    });


const openGallery = () => {
    if (!data.item?.id || !data.item?.cover?.original) {
        return;
    }

    modals.open('gallery', { data: { imgs: [{
        title: data.item.title,
        ...data.item?.cover
    }] } });
};

const donate = () => {
    message.info(t('common.soon'));
};

const close = () => {
    modals.close('release');
};

// const openLink = (item) => {
//     if (!item?.url) {
//         return
//     }

//     if (item.code === 'telegram') {
//         tg.openLink({
//             external_url: item.url,
//             type: 'telegram'
//         });
//     } else {
//         tg.openLink({
//             external_url: item.url
//         });
//     }
// }

const load = async () => {
    if (!data.item?.dicts?.length) {
        data.loading = false;
        return;
    }

    data.loading = true;

    const types = {};

    (await api.dict().getTypes())?.forEach(item => types[item.code] = item.id);

    Object.keys(types).forEach(type => {
        if (data[type]) {
            data[type] = data.item.dicts.filter(item => item.dictId === types[type]).map(item => ({ ...item, name: item.title })) || [];
        }
    });

    data.loading = false;
};

onMounted(async () => {
    const payload = modals.getData('release');

    if (!payload?.id) {
        close();
        return;
    }

    data.item = await api.releases().get(payload.id);
    await load();
    data.loading = false;
    console.log(data);
});


return (_ctx, _cache) => {
  return (openBlock(), createBlock(BaseModal, {
    name: "release",
    mobileMode: true,
    closeOutside: true,
    isLoading: data.loading
  }, {
    title: withCtx(() => [
      createBaseVNode("span", null, toDisplayString(data.item?.title), 1)
    ]),
    content: withCtx(() => [
      (data.item)
        ? (openBlock(), createElementBlock("div", _hoisted_1, [
            createBaseVNode("div", _hoisted_2, [
              (data.item?.cover)
                ? (openBlock(), createBlock(Img, {
                    key: 0,
                    preview: data.item?.cover?.crop,
                    original: data.item?.cover?.original,
                    alt: data.item.title,
                    aspectRatio: "1 / 1",
                    skeleton: true,
                    onClick: openGallery
                  }, null, 8, ["preview", "original", "alt"]))
                : createCommentVNode("", true),
              createBaseVNode("div", _hoisted_3, [
                createVNode(IconButton, {
                  icon: "share",
                  class: "secondary size-m",
                  onClick: _cache[0] || (_cache[0] = $event => (unref(share).release(data.item)))
                }),
                createVNode(Button, {
                  icon: "tg-stars",
                  class: "secondary size-m",
                  name: unref(t)('common.support'),
                  onClick: donate
                }, null, 8, ["name"])
              ])
            ]),
            createBaseVNode("ul", _hoisted_4, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(items.value, (item, id) => {
                return (openBlock(), createElementBlock("li", null, [
                  createBaseVNode("label", null, toDisplayString(unref(t)(item.name)), 1),
                  _cache[1] || (_cache[1] = createBaseVNode("i", null, null, -1)),
                  createBaseVNode("span", null, toDisplayString(item.value), 1)
                ]))
              }), 256))
            ]),
            (primaryArtists.value.length)
              ? (openBlock(), createBlock(_sfc_main$1, {
                  key: 0,
                  items: primaryArtists.value,
                  type: "row",
                  source: null,
                  loadMore: false,
                  handler: "artist",
                  class: "inline",
                  title: "blocks.artists.primary"
                }, null, 8, ["items"]))
              : createCommentVNode("", true),
            (featuresArtists.value.length)
              ? (openBlock(), createBlock(_sfc_main$1, {
                  key: 1,
                  items: featuresArtists.value,
                  type: "row",
                  source: null,
                  loadMore: false,
                  handler: "artist",
                  class: "inline",
                  title: "blocks.artists.features"
                }, null, 8, ["items"]))
              : createCommentVNode("", true),
            (openBlock(true), createElementBlock(Fragment, null, renderList(otherArtists.value, (item, id) => {
              return (openBlock(), createBlock(_sfc_main$1, {
                items: item.contributors,
                type: "list",
                source: null,
                loadMore: false,
                handler: "artist",
                class: "inline",
                title: item.title
              }, null, 8, ["items", "title"]))
            }), 256))
          ]))
        : createCommentVNode("", true)
    ]),
    _: 1
  }, 8, ["isLoading"]))
}
}

};
const ModalRelease = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-3adec201"]]);

export { ModalRelease as default };
//# sourceMappingURL=ModalRelease-DqGhIKS4.js.map
