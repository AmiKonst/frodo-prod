import { _ as _export_sfc, s as stores, u as useI18n, c as createElementBlock, o as openBlock, b as createBlock, d as createCommentVNode, p as createBaseVNode, F as Fragment, l as renderList, h as unref, C as Button, r as reactive, j as computed, U as formatDuration, Q as hooks, f as onMounted, a as api, k as withCtx, e as createVNode, I as IconButton, t as toDisplayString, G as BaseModal, m as message } from './index-DLel4Dq4.js';
import { I as Img } from './Img-DTGM9lDm.js';
import { T as TitleWithButtons } from './TitleWithButtons-DDUmkpSI.js';
import { _ as _sfc_main$2 } from './Artists-C7N7CbXY.js';
import './State-DVepBh-9.js';
import './Slider-DrxJIE5n.js';
import './EmptyLabel-DXyhrKY1.js';

const _hoisted_1$1 = { class: "dicts" };

    
const _sfc_main$1 = {
  __name: 'DictsList',
  props: {
        title: { type: [String, null], default: null },
        type: { type: String, default: '' },
        items: { type: Array, default: () => ([]) }
    },
  setup(__props) {

    const nav = stores.nav();

    const { t } = useI18n();

    const props = __props;


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$1, [
    (props.title)
      ? (openBlock(), createBlock(TitleWithButtons, {
          key: 0,
          title: props.title
        }, null, 8, ["title"]))
      : createCommentVNode("", true),
    createBaseVNode("div", null, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(props.items, (item) => {
        return (openBlock(), createBlock(Button, {
          key: item.id,
          name: item.title,
          class: "secondary size-m",
          onClick: $event => {unref(nav).open(props.type, { code: item.code });}
        }, null, 8, ["name", "onClick"]))
      }), 128))
    ])
  ]))
}
}

};
const DictsList = /*#__PURE__*/_export_sfc(_sfc_main$1, [['__scopeId',"data-v-6dcc5db0"]]);

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
stores.nav();

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
            (data.moods.length)
              ? (openBlock(), createBlock(DictsList, {
                  key: 0,
                  title: "modals.release.moods",
                  items: data.moods,
                  type: "mood"
                }, null, 8, ["items"]))
              : createCommentVNode("", true),
            (data.genres.length)
              ? (openBlock(), createBlock(DictsList, {
                  key: 1,
                  title: "modals.release.genres",
                  items: data.genres,
                  type: "genre"
                }, null, 8, ["items"]))
              : createCommentVNode("", true),
            (primaryArtists.value.length)
              ? (openBlock(), createBlock(_sfc_main$2, {
                  key: 2,
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
              ? (openBlock(), createBlock(_sfc_main$2, {
                  key: 3,
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
              return (openBlock(), createBlock(_sfc_main$2, {
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
const ModalRelease = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-49879a7e"]]);

export { ModalRelease as default };
//# sourceMappingURL=ModalRelease-BTD4Wh1p.js.map
