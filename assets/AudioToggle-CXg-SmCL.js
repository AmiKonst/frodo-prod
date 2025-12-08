import { _ as _export_sfc, y as resolveComponent, c as createElementBlock, f as openBlock, q as createBaseVNode, b as createBlock, d as createCommentVNode, z as withModifiers, n as normalizeClass } from './index-DhNDL289.js';

const _sfc_main = {
  __name: 'AudioToggle',
  props: {
        state: { type: [String, null], default: null }, // null, play, pause
        disabled: { type: Boolean, default: false },
        light: { type: Boolean, default: false }
    },
  emits: ['play', 'pause'],
  setup(__props, { emit: __emit }) {

    const emit = __emit;

    const props = __props;

    const handleClick = (e) => {
        if (e?.target?.blur) {
            e.target.blur();
        }

        if (props.disabled) {
            return;
        }

        if (props.state === null || props.state === "paused" || props.state === "stopped") {
            emit("play");
        } else if (props.state === "playing") {
            emit("pause");
        }
    };

return (_ctx, _cache) => {
  const _component_Icon = resolveComponent("Icon");

  return (openBlock(), createElementBlock("button", {
    class: normalizeClass(["audio-toggle", {
            playing: __props.state === 'playing',
            paused: __props.state === 'paused',
            empty: __props.state === null,
            light: !!props.light,
            disabled: !!props.disabled
        }]),
    onClick: withModifiers(handleClick, ["stop"])
  }, [
    _cache[0] || (_cache[0] = createBaseVNode("div", { class: "audio-play-icon" }, [
      createBaseVNode("div", { class: "part one" }),
      createBaseVNode("div", { class: "part two" })
    ], -1)),
    (props.state === 'playing' && !props.light)
      ? (openBlock(), createBlock(_component_Icon, {
          key: 0,
          icon: "logo"
        }))
      : createCommentVNode("", true)
  ], 2))
}
}

};
const AudioToggle = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-15e57cfa"]]);

export { AudioToggle as A };
//# sourceMappingURL=AudioToggle-CXg-SmCL.js.map
