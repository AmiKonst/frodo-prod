import { _ as _export_sfc, u as useI18n, s as stores, r as reactive, j as computed, M as formatDuration, N as hooks, o as onMounted, g as api, b as createBlock, f as openBlock, k as withCtx, c as createElementBlock, d as createCommentVNode, l as createBaseVNode, p as Img, e as createVNode, I as IconButton, B as Button, h as unref, F as Fragment, m as renderList, v as toDisplayString, K as BaseModal, q as message } from './index-DxeSi4qe.js';
import { D as DictsList } from './DictsList-DEpTa6lC.js';
import { _ as _sfc_main$1 } from './Releases-Ccdmi9T3.js';
import { _ as _sfc_main$2 } from './Artists-BoAdkKHv.js';
import './TitleWithButtons-CTm2X4kd.js';
import './Block-YhKD3jBM.js';
import './EmptyLabel-CVo3wJRr.js';

const _hoisted_1 = {
  key: 0,
  class: "box"
};
const _hoisted_2 = { class: "gallery" };
const _hoisted_3 = { class: "buttons" };
const _hoisted_4 = { class: "static-params" };


const _sfc_main = {
  __name: 'ModalTrack',
  setup(__props) {

const { t } = useI18n();

stores.tg();
const modals = stores.modals();
const share = stores.share();
stores.nav();

const data = reactive({
    loading: true,
    categories: [],
    instruments: [],
    tags: [],
    moods: [],
    genres: []
});

const shareIt = () => {
    share.track(data.item, { type: 'release', release: data.releases[0] });

    setTimeout(() => {
        close();
    }, 400);
};


const items = computed(() => {
    if (!data?.item?.id) {
        return;
    }

    const result = [
        {
            value: data.item.fromProject,
            name: 'modals.track.from-project'
        },
        {
            value: formatDuration(data.item.duration),
            name: 'modals.track.duration'
        },
        {
            value: !data.item.releaseDate ? null :
                hooks(data.item.releaseDate).format('DD MMMM YYYY'),
            name: 'modals.track.release-date'
        },
        {
            value: data.item.instrumental ?
                t('modals.track.yes') :
                t('modals.track.no'),
            name: 'modals.track.instrumental'
        },
        {
            value: data.item.instrumental ? null :
                data.item.language,
            name: 'modals.track.language'
        },

        {
            value: data.item.isExplicit ?
                t('modals.track.yes') :
                t('modals.track.no'),
            name: 'modals.track.is-explicit'
        },
        {
            value: data.item.isRadioEdit ?
                t('modals.track.yes') :
                t('modals.track.no'),
            name: 'modals.track.is-radio-edit'
        },
        {
            value: data.item.isCover ?
                t('modals.track.yes') :
                t('modals.track.no'),
            name: 'modals.track.is-cover'
        },
        {
            value: data.item.contentId ?
                t('modals.track.yes') :
                t('modals.track.no'),
            name: 'modals.track.content-id'
        },
        {
            value: data.item.hasProRights ?
                t('modals.track.yes') :
                t('modals.track.no'),
            name: 'modals.track.has-pro-rights'
        },
        {
            value: data.item.bpm,
            name: 'modals.track.bpm'
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

    modals.open('gallery', {
        quietClose: true,
        data: { imgs: [{
            title: data.item.title,
            ...data.item?.cover
        }] } });
};

const donate = () => {
    message.info(t('common.soon'));
};

const close = () => {
    modals.close('track');
};

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
    const payload = modals.getData('track');

    if (!payload?.id) {
        close();
        return;
    }

    if (payload.item) {
        data.item = payload.item;
    } else  {
        data.item = await api.tracks().get(payload.id);
    }

    if (payload.releases) {
        data.releases = payload.releases;
    } else {
        const releases = await api.releases().list({ tracks: [payload.id] });
        if (releases?.items) {
            data.releases = releases.items;
        }
    }

    await load();

    data.loading = false;
});


return (_ctx, _cache) => {
  return (openBlock(), createBlock(BaseModal, {
    name: "release",
    mobileMode: true,
    closeOutside: true,
    secondary: true,
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
                  onClick: shareIt
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
                  _cache[0] || (_cache[0] = createBaseVNode("i", null, null, -1)),
                  createBaseVNode("span", null, toDisplayString(item.value), 1)
                ]))
              }), 256))
            ]),
            (data.releases.length)
              ? (openBlock(), createBlock(_sfc_main$1, {
                  key: 0,
                  type: "row",
                  items: data.releases,
                  source: null,
                  loadMore: false,
                  title: "modals.track.releases",
                  class: "inline",
                  handler: "release"
                }, null, 8, ["items"]))
              : createCommentVNode("", true),
            (primaryArtists.value.length)
              ? (openBlock(), createBlock(_sfc_main$2, {
                  key: 1,
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
                  key: 2,
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
            }), 256)),
            (data.moods.length)
              ? (openBlock(), createBlock(DictsList, {
                  key: 3,
                  title: "dicts.moods",
                  items: data.moods,
                  type: "mood"
                }, null, 8, ["items"]))
              : createCommentVNode("", true),
            (data.genres.length)
              ? (openBlock(), createBlock(DictsList, {
                  key: 4,
                  title: "dicts.genres",
                  items: data.genres,
                  type: "genre"
                }, null, 8, ["items"]))
              : createCommentVNode("", true),
            (data.categories.length)
              ? (openBlock(), createBlock(DictsList, {
                  key: 5,
                  title: "dicts.categories",
                  items: data.categories,
                  type: "genre"
                }, null, 8, ["items"]))
              : createCommentVNode("", true),
            (data.instruments.length)
              ? (openBlock(), createBlock(DictsList, {
                  key: 6,
                  title: "dicts.instruments",
                  items: data.instruments,
                  clickable: false,
                  type: "genre"
                }, null, 8, ["items"]))
              : createCommentVNode("", true),
            (data.tags.length)
              ? (openBlock(), createBlock(DictsList, {
                  key: 7,
                  title: "dicts.tags",
                  items: data.tags,
                  clickable: false,
                  type: "genre"
                }, null, 8, ["items"]))
              : createCommentVNode("", true)
          ]))
        : createCommentVNode("", true)
    ]),
    _: 1
  }, 8, ["isLoading"]))
}
}

};
const ModalTrack = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-16b38510"]]);

export { ModalTrack as default };
//# sourceMappingURL=ModalTrack-BR4Xka1J.js.map
