import { al as DOMAdapter, am as uid, ag as EventEmitter, ad as ExtensionType, af as UPDATE_PRIORITY, ae as Ticker, an as deprecation, ao as v8_0_0, ap as Color, aq as Texture, ar as ImageSource, as as Matrix, ak as getDefaultExportFromCjs, ah as warn, at as Rectangle, au as Bounds, ab as Point, av as earcut, aw as BigPool, ai as extensions, ax as InstructionSet, ay as v8_3_4, az as nextPow2, aA as Cache, aB as TextureSource, aC as boundsPool, aD as ViewContainer, aE as updateQuadBounds } from './index-CfLbgll1.js';

const idCounts = /* @__PURE__ */ Object.create(null);
const idHash = /* @__PURE__ */ Object.create(null);
function createIdFromString(value, groupId) {
  let id = idHash[value];
  if (id === void 0) {
    if (idCounts[groupId] === void 0) {
      idCounts[groupId] = 1;
    }
    idHash[value] = id = idCounts[groupId]++;
  }
  return id;
}

let context;
function getTestContext() {
  if (!context || context?.isContextLost()) {
    const canvas = DOMAdapter.get().createCanvas();
    context = canvas.getContext("webgl", {});
  }
  return context;
}

let maxFragmentPrecision;
function getMaxFragmentPrecision() {
  if (!maxFragmentPrecision) {
    maxFragmentPrecision = "mediump";
    const gl = getTestContext();
    if (gl) {
      if (gl.getShaderPrecisionFormat) {
        const shaderFragment = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT);
        maxFragmentPrecision = shaderFragment.precision ? "highp" : "mediump";
      }
    }
  }
  return maxFragmentPrecision;
}

function addProgramDefines(src, isES300, isFragment) {
  if (isES300)
    return src;
  if (isFragment) {
    src = src.replace("out vec4 finalColor;", "");
    return `
        
        #ifdef GL_ES // This checks if it is WebGL1
        #define in varying
        #define finalColor gl_FragColor
        #define texture texture2D
        #endif
        ${src}
        `;
  }
  return `
        
        #ifdef GL_ES // This checks if it is WebGL1
        #define in attribute
        #define out varying
        #endif
        ${src}
        `;
}

function ensurePrecision(src, options, isFragment) {
  const maxSupportedPrecision = isFragment ? options.maxSupportedFragmentPrecision : options.maxSupportedVertexPrecision;
  if (src.substring(0, 9) !== "precision") {
    let precision = isFragment ? options.requestedFragmentPrecision : options.requestedVertexPrecision;
    if (precision === "highp" && maxSupportedPrecision !== "highp") {
      precision = "mediump";
    }
    return `precision ${precision} float;
${src}`;
  } else if (maxSupportedPrecision !== "highp" && src.substring(0, 15) === "precision highp") {
    return src.replace("precision highp", "precision mediump");
  }
  return src;
}

function insertVersion(src, isES300) {
  if (!isES300)
    return src;
  return `#version 300 es
${src}`;
}

const fragmentNameCache = {};
const VertexNameCache = {};
function setProgramName(src, { name = `pixi-program` }, isFragment = true) {
  name = name.replace(/\s+/g, "-");
  name += isFragment ? "-fragment" : "-vertex";
  const nameCache = isFragment ? fragmentNameCache : VertexNameCache;
  if (nameCache[name]) {
    nameCache[name]++;
    name += `-${nameCache[name]}`;
  } else {
    nameCache[name] = 1;
  }
  if (src.indexOf("#define SHADER_NAME") !== -1)
    return src;
  const shaderName = `#define SHADER_NAME ${name}`;
  return `${shaderName}
${src}`;
}

function stripVersion(src, isES300) {
  if (!isES300)
    return src;
  return src.replace("#version 300 es", "");
}

const processes = {
  // strips any version headers..
  stripVersion,
  // adds precision string if not already present
  ensurePrecision,
  // add some defines if WebGL1 to make it more compatible with WebGL2 shaders
  addProgramDefines,
  // add the program name to the shader
  setProgramName,
  // add the version string to the shader header
  insertVersion
};
const programCache$1 = /* @__PURE__ */ Object.create(null);
const _GlProgram = class _GlProgram {
  /**
   * Creates a shiny new GlProgram. Used by WebGL renderer.
   * @param options - The options for the program.
   */
  constructor(options) {
    options = { ..._GlProgram.defaultOptions, ...options };
    const isES300 = options.fragment.indexOf("#version 300 es") !== -1;
    const preprocessorOptions = {
      stripVersion: isES300,
      ensurePrecision: {
        requestedFragmentPrecision: options.preferredFragmentPrecision,
        requestedVertexPrecision: options.preferredVertexPrecision,
        maxSupportedVertexPrecision: "highp",
        maxSupportedFragmentPrecision: getMaxFragmentPrecision()
      },
      setProgramName: {
        name: options.name
      },
      addProgramDefines: isES300,
      insertVersion: isES300
    };
    let fragment = options.fragment;
    let vertex = options.vertex;
    Object.keys(processes).forEach((processKey) => {
      const processOptions = preprocessorOptions[processKey];
      fragment = processes[processKey](fragment, processOptions, true);
      vertex = processes[processKey](vertex, processOptions, false);
    });
    this.fragment = fragment;
    this.vertex = vertex;
    this._key = createIdFromString(`${this.vertex}:${this.fragment}`, "gl-program");
  }
  /** destroys the program */
  destroy() {
    this.fragment = null;
    this.vertex = null;
    this._attributeData = null;
    this._uniformData = null;
    this._uniformBlockData = null;
    this.transformFeedbackVaryings = null;
  }
  /**
   * Helper function that creates a program for a given source.
   * It will check the program cache if the program has already been created.
   * If it has that one will be returned, if not a new one will be created and cached.
   * @param options - The options for the program.
   * @returns A program using the same source
   */
  static from(options) {
    const key = `${options.vertex}:${options.fragment}`;
    if (!programCache$1[key]) {
      programCache$1[key] = new _GlProgram(options);
    }
    return programCache$1[key];
  }
};
/** The default options used by the program. */
_GlProgram.defaultOptions = {
  preferredVertexPrecision: "highp",
  preferredFragmentPrecision: "mediump"
};
let GlProgram = _GlProgram;

const attributeFormatData = {
  uint8x2: { size: 2, stride: 2, normalised: false },
  uint8x4: { size: 4, stride: 4, normalised: false },
  sint8x2: { size: 2, stride: 2, normalised: false },
  sint8x4: { size: 4, stride: 4, normalised: false },
  unorm8x2: { size: 2, stride: 2, normalised: true },
  unorm8x4: { size: 4, stride: 4, normalised: true },
  snorm8x2: { size: 2, stride: 2, normalised: true },
  snorm8x4: { size: 4, stride: 4, normalised: true },
  uint16x2: { size: 2, stride: 4, normalised: false },
  uint16x4: { size: 4, stride: 8, normalised: false },
  sint16x2: { size: 2, stride: 4, normalised: false },
  sint16x4: { size: 4, stride: 8, normalised: false },
  unorm16x2: { size: 2, stride: 4, normalised: true },
  unorm16x4: { size: 4, stride: 8, normalised: true },
  snorm16x2: { size: 2, stride: 4, normalised: true },
  snorm16x4: { size: 4, stride: 8, normalised: true },
  float16x2: { size: 2, stride: 4, normalised: false },
  float16x4: { size: 4, stride: 8, normalised: false },
  float32: { size: 1, stride: 4, normalised: false },
  float32x2: { size: 2, stride: 8, normalised: false },
  float32x3: { size: 3, stride: 12, normalised: false },
  float32x4: { size: 4, stride: 16, normalised: false },
  uint32: { size: 1, stride: 4, normalised: false },
  uint32x2: { size: 2, stride: 8, normalised: false },
  uint32x3: { size: 3, stride: 12, normalised: false },
  uint32x4: { size: 4, stride: 16, normalised: false },
  sint32: { size: 1, stride: 4, normalised: false },
  sint32x2: { size: 2, stride: 8, normalised: false },
  sint32x3: { size: 3, stride: 12, normalised: false },
  sint32x4: { size: 4, stride: 16, normalised: false }
};
function getAttributeInfoFromFormat(format) {
  return attributeFormatData[format] ?? attributeFormatData.float32;
}

const WGSL_TO_VERTEX_TYPES = {
  f32: "float32",
  "vec2<f32>": "float32x2",
  "vec3<f32>": "float32x3",
  "vec4<f32>": "float32x4",
  vec2f: "float32x2",
  vec3f: "float32x3",
  vec4f: "float32x4",
  i32: "sint32",
  "vec2<i32>": "sint32x2",
  "vec3<i32>": "sint32x3",
  "vec4<i32>": "sint32x4",
  u32: "uint32",
  "vec2<u32>": "uint32x2",
  "vec3<u32>": "uint32x3",
  "vec4<u32>": "uint32x4",
  bool: "uint32",
  "vec2<bool>": "uint32x2",
  "vec3<bool>": "uint32x3",
  "vec4<bool>": "uint32x4"
};
function extractAttributesFromGpuProgram({ source, entryPoint }) {
  const results = {};
  const mainVertStart = source.indexOf(`fn ${entryPoint}`);
  if (mainVertStart !== -1) {
    const arrowFunctionStart = source.indexOf("->", mainVertStart);
    if (arrowFunctionStart !== -1) {
      const functionArgsSubstring = source.substring(mainVertStart, arrowFunctionStart);
      const inputsRegex = /@location\((\d+)\)\s+([a-zA-Z0-9_]+)\s*:\s*([a-zA-Z0-9_<>]+)(?:,|\s|$)/g;
      let match;
      while ((match = inputsRegex.exec(functionArgsSubstring)) !== null) {
        const format = WGSL_TO_VERTEX_TYPES[match[3]] ?? "float32";
        results[match[2]] = {
          location: parseInt(match[1], 10),
          format,
          stride: getAttributeInfoFromFormat(format).stride,
          offset: 0,
          instance: false,
          start: 0
        };
      }
    }
  }
  return results;
}

function extractStructAndGroups(wgsl) {
  const linePattern = /(^|[^/])@(group|binding)\(\d+\)[^;]+;/g;
  const groupPattern = /@group\((\d+)\)/;
  const bindingPattern = /@binding\((\d+)\)/;
  const namePattern = /var(<[^>]+>)? (\w+)/;
  const typePattern = /:\s*(\w+)/;
  const structPattern = /struct\s+(\w+)\s*{([^}]+)}/g;
  const structMemberPattern = /(\w+)\s*:\s*([\w\<\>]+)/g;
  const structName = /struct\s+(\w+)/;
  const groups = wgsl.match(linePattern)?.map((item) => ({
    group: parseInt(item.match(groupPattern)[1], 10),
    binding: parseInt(item.match(bindingPattern)[1], 10),
    name: item.match(namePattern)[2],
    isUniform: item.match(namePattern)[1] === "<uniform>",
    type: item.match(typePattern)[1]
  }));
  if (!groups) {
    return {
      groups: [],
      structs: []
    };
  }
  const structs = wgsl.match(structPattern)?.map((struct) => {
    const name = struct.match(structName)[1];
    const members = struct.match(structMemberPattern).reduce((acc, member) => {
      const [name2, type] = member.split(":");
      acc[name2.trim()] = type.trim();
      return acc;
    }, {});
    if (!members) {
      return null;
    }
    return { name, members };
  }).filter(({ name }) => groups.some((group) => group.type === name)) ?? [];
  return {
    groups,
    structs
  };
}

var ShaderStage = /* @__PURE__ */ ((ShaderStage2) => {
  ShaderStage2[ShaderStage2["VERTEX"] = 1] = "VERTEX";
  ShaderStage2[ShaderStage2["FRAGMENT"] = 2] = "FRAGMENT";
  ShaderStage2[ShaderStage2["COMPUTE"] = 4] = "COMPUTE";
  return ShaderStage2;
})(ShaderStage || {});

function generateGpuLayoutGroups({ groups }) {
  const layout = [];
  for (let i = 0; i < groups.length; i++) {
    const group = groups[i];
    if (!layout[group.group]) {
      layout[group.group] = [];
    }
    if (group.isUniform) {
      layout[group.group].push({
        binding: group.binding,
        visibility: ShaderStage.VERTEX | ShaderStage.FRAGMENT,
        buffer: {
          type: "uniform"
        }
      });
    } else if (group.type === "sampler") {
      layout[group.group].push({
        binding: group.binding,
        visibility: ShaderStage.FRAGMENT,
        sampler: {
          type: "filtering"
        }
      });
    } else if (group.type === "texture_2d") {
      layout[group.group].push({
        binding: group.binding,
        visibility: ShaderStage.FRAGMENT,
        texture: {
          sampleType: "float",
          viewDimension: "2d",
          multisampled: false
        }
      });
    }
  }
  return layout;
}

function generateLayoutHash({ groups }) {
  const layout = [];
  for (let i = 0; i < groups.length; i++) {
    const group = groups[i];
    if (!layout[group.group]) {
      layout[group.group] = {};
    }
    layout[group.group][group.name] = group.binding;
  }
  return layout;
}

function removeStructAndGroupDuplicates(vertexStructsAndGroups, fragmentStructsAndGroups) {
  const structNameSet = /* @__PURE__ */ new Set();
  const dupeGroupKeySet = /* @__PURE__ */ new Set();
  const structs = [...vertexStructsAndGroups.structs, ...fragmentStructsAndGroups.structs].filter((struct) => {
    if (structNameSet.has(struct.name)) {
      return false;
    }
    structNameSet.add(struct.name);
    return true;
  });
  const groups = [...vertexStructsAndGroups.groups, ...fragmentStructsAndGroups.groups].filter((group) => {
    const key = `${group.name}-${group.binding}`;
    if (dupeGroupKeySet.has(key)) {
      return false;
    }
    dupeGroupKeySet.add(key);
    return true;
  });
  return { structs, groups };
}

const programCache = /* @__PURE__ */ Object.create(null);
class GpuProgram {
  /**
   * Create a new GpuProgram
   * @param options - The options for the gpu program
   */
  constructor(options) {
    /**
     * @internal
     * @ignore
     */
    this._layoutKey = 0;
    /**
     * @internal
     * @ignore
     */
    this._attributeLocationsKey = 0;
    const { fragment, vertex, layout, gpuLayout, name } = options;
    this.name = name;
    this.fragment = fragment;
    this.vertex = vertex;
    if (fragment.source === vertex.source) {
      const structsAndGroups = extractStructAndGroups(fragment.source);
      this.structsAndGroups = structsAndGroups;
    } else {
      const vertexStructsAndGroups = extractStructAndGroups(vertex.source);
      const fragmentStructsAndGroups = extractStructAndGroups(fragment.source);
      this.structsAndGroups = removeStructAndGroupDuplicates(vertexStructsAndGroups, fragmentStructsAndGroups);
    }
    this.layout = layout ?? generateLayoutHash(this.structsAndGroups);
    this.gpuLayout = gpuLayout ?? generateGpuLayoutGroups(this.structsAndGroups);
    this.autoAssignGlobalUniforms = !!(this.layout[0]?.globalUniforms !== void 0);
    this.autoAssignLocalUniforms = !!(this.layout[1]?.localUniforms !== void 0);
    this._generateProgramKey();
  }
  // TODO maker this pure
  _generateProgramKey() {
    const { vertex, fragment } = this;
    const bigKey = vertex.source + fragment.source + vertex.entryPoint + fragment.entryPoint;
    this._layoutKey = createIdFromString(bigKey, "program");
  }
  get attributeData() {
    this._attributeData ?? (this._attributeData = extractAttributesFromGpuProgram(this.vertex));
    return this._attributeData;
  }
  /** destroys the program */
  destroy() {
    this.gpuLayout = null;
    this.layout = null;
    this.structsAndGroups = null;
    this.fragment = null;
    this.vertex = null;
  }
  /**
   * Helper function that creates a program for a given source.
   * It will check the program cache if the program has already been created.
   * If it has that one will be returned, if not a new one will be created and cached.
   * @param options - The options for the program.
   * @returns A program using the same source
   */
  static from(options) {
    const key = `${options.vertex.source}:${options.fragment.source}:${options.fragment.entryPoint}:${options.vertex.entryPoint}`;
    if (!programCache[key]) {
      programCache[key] = new GpuProgram(options);
    }
    return programCache[key];
  }
}

const UNIFORM_TYPES_VALUES = [
  "f32",
  "i32",
  "vec2<f32>",
  "vec3<f32>",
  "vec4<f32>",
  "mat2x2<f32>",
  "mat3x3<f32>",
  "mat4x4<f32>",
  "mat3x2<f32>",
  "mat4x2<f32>",
  "mat2x3<f32>",
  "mat4x3<f32>",
  "mat2x4<f32>",
  "mat3x4<f32>"
];
const UNIFORM_TYPES_MAP = UNIFORM_TYPES_VALUES.reduce((acc, type) => {
  acc[type] = true;
  return acc;
}, {});

function getDefaultUniformValue(type, size) {
  switch (type) {
    case "f32":
      return 0;
    case "vec2<f32>":
      return new Float32Array(2 * size);
    case "vec3<f32>":
      return new Float32Array(3 * size);
    case "vec4<f32>":
      return new Float32Array(4 * size);
    case "mat2x2<f32>":
      return new Float32Array([
        1,
        0,
        0,
        1
      ]);
    case "mat3x3<f32>":
      return new Float32Array([
        1,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        1
      ]);
    case "mat4x4<f32>":
      return new Float32Array([
        1,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1
      ]);
  }
  return null;
}

const _UniformGroup = class _UniformGroup {
  /**
   * Create a new Uniform group
   * @param uniformStructures - The structures of the uniform group
   * @param options - The optional parameters of this uniform group
   */
  constructor(uniformStructures, options) {
    /** used internally to know if a uniform group was used in the last render pass */
    this._touched = 0;
    /** a unique id for this uniform group used through the renderer */
    this.uid = uid("uniform");
    /** a resource type, used to identify how to handle it when its in a bind group / shader resource */
    this._resourceType = "uniformGroup";
    /** the resource id used internally by the renderer to build bind group keys */
    this._resourceId = uid("resource");
    /** used ito identify if this is a uniform group */
    this.isUniformGroup = true;
    /**
     * used to flag if this Uniform groups data is different from what it has stored in its buffer / on the GPU
     * @internal
     * @ignore
     */
    this._dirtyId = 0;
    // implementing the interface - UniformGroup are not destroyed
    this.destroyed = false;
    options = { ..._UniformGroup.defaultOptions, ...options };
    this.uniformStructures = uniformStructures;
    const uniforms = {};
    for (const i in uniformStructures) {
      const uniformData = uniformStructures[i];
      uniformData.name = i;
      uniformData.size = uniformData.size ?? 1;
      if (!UNIFORM_TYPES_MAP[uniformData.type]) {
        throw new Error(`Uniform type ${uniformData.type} is not supported. Supported uniform types are: ${UNIFORM_TYPES_VALUES.join(", ")}`);
      }
      uniformData.value ?? (uniformData.value = getDefaultUniformValue(uniformData.type, uniformData.size));
      uniforms[i] = uniformData.value;
    }
    this.uniforms = uniforms;
    this._dirtyId = 1;
    this.ubo = options.ubo;
    this.isStatic = options.isStatic;
    this._signature = createIdFromString(Object.keys(uniforms).map(
      (i) => `${i}-${uniformStructures[i].type}`
    ).join("-"), "uniform-group");
  }
  /** Call this if you want the uniform groups data to be uploaded to the GPU only useful if `isStatic` is true. */
  update() {
    this._dirtyId++;
  }
};
/** The default options used by the uniform group. */
_UniformGroup.defaultOptions = {
  /** if true the UniformGroup is handled as an Uniform buffer object. */
  ubo: false,
  /** if true, then you are responsible for when the data is uploaded to the GPU by calling `update()` */
  isStatic: false
};
let UniformGroup = _UniformGroup;

class BindGroup {
  /**
   * Create a new instance eof the Bind Group.
   * @param resources - The resources that are bound together for use by a shader.
   */
  constructor(resources) {
    /** The resources that are bound together for use by a shader. */
    this.resources = /* @__PURE__ */ Object.create(null);
    this._dirty = true;
    let index = 0;
    for (const i in resources) {
      const resource = resources[i];
      this.setResource(resource, index++);
    }
    this._updateKey();
  }
  /**
   * Updates the key if its flagged as dirty. This is used internally to
   * match this bind group to a WebGPU BindGroup.
   * @internal
   * @ignore
   */
  _updateKey() {
    if (!this._dirty)
      return;
    this._dirty = false;
    const keyParts = [];
    let index = 0;
    for (const i in this.resources) {
      keyParts[index++] = this.resources[i]._resourceId;
    }
    this._key = keyParts.join("|");
  }
  /**
   * Set a resource at a given index. this function will
   * ensure that listeners will be removed from the current resource
   * and added to the new resource.
   * @param resource - The resource to set.
   * @param index - The index to set the resource at.
   */
  setResource(resource, index) {
    const currentResource = this.resources[index];
    if (resource === currentResource)
      return;
    if (currentResource) {
      resource.off?.("change", this.onResourceChange, this);
    }
    resource.on?.("change", this.onResourceChange, this);
    this.resources[index] = resource;
    this._dirty = true;
  }
  /**
   * Returns the resource at the current specified index.
   * @param index - The index of the resource to get.
   * @returns - The resource at the specified index.
   */
  getResource(index) {
    return this.resources[index];
  }
  /**
   * Used internally to 'touch' each resource, to ensure that the GC
   * knows that all resources in this bind group are still being used.
   * @param tick - The current tick.
   * @internal
   * @ignore
   */
  _touch(tick) {
    const resources = this.resources;
    for (const i in resources) {
      resources[i]._touched = tick;
    }
  }
  /** Destroys this bind group and removes all listeners. */
  destroy() {
    const resources = this.resources;
    for (const i in resources) {
      const resource = resources[i];
      resource.off?.("change", this.onResourceChange, this);
    }
    this.resources = null;
  }
  onResourceChange(resource) {
    this._dirty = true;
    if (resource.destroyed) {
      const resources = this.resources;
      for (const i in resources) {
        if (resources[i] === resource) {
          resources[i] = null;
        }
      }
    } else {
      this._updateKey();
    }
  }
}

var RendererType = /* @__PURE__ */ ((RendererType2) => {
  RendererType2[RendererType2["WEBGL"] = 1] = "WEBGL";
  RendererType2[RendererType2["WEBGPU"] = 2] = "WEBGPU";
  RendererType2[RendererType2["BOTH"] = 3] = "BOTH";
  return RendererType2;
})(RendererType || {});

class Shader extends EventEmitter {
  constructor(options) {
    super();
    /**
     * A record of the uniform groups and resources used by the shader.
     * This is used by WebGL renderer to sync uniform data.
     * @internal
     * @ignore
     */
    this._uniformBindMap = /* @__PURE__ */ Object.create(null);
    this._ownedBindGroups = [];
    let {
      gpuProgram,
      glProgram,
      groups,
      resources,
      compatibleRenderers,
      groupMap
    } = options;
    this.gpuProgram = gpuProgram;
    this.glProgram = glProgram;
    if (compatibleRenderers === void 0) {
      compatibleRenderers = 0;
      if (gpuProgram)
        compatibleRenderers |= RendererType.WEBGPU;
      if (glProgram)
        compatibleRenderers |= RendererType.WEBGL;
    }
    this.compatibleRenderers = compatibleRenderers;
    const nameHash = {};
    if (!resources && !groups) {
      resources = {};
    }
    if (resources && groups) {
      throw new Error("[Shader] Cannot have both resources and groups");
    } else if (!gpuProgram && groups && !groupMap) {
      throw new Error("[Shader] No group map or WebGPU shader provided - consider using resources instead.");
    } else if (!gpuProgram && groups && groupMap) {
      for (const i in groupMap) {
        for (const j in groupMap[i]) {
          const uniformName = groupMap[i][j];
          nameHash[uniformName] = {
            group: i,
            binding: j,
            name: uniformName
          };
        }
      }
    } else if (gpuProgram && groups && !groupMap) {
      const groupData = gpuProgram.structsAndGroups.groups;
      groupMap = {};
      groupData.forEach((data) => {
        groupMap[data.group] = groupMap[data.group] || {};
        groupMap[data.group][data.binding] = data.name;
        nameHash[data.name] = data;
      });
    } else if (resources) {
      groups = {};
      groupMap = {};
      if (gpuProgram) {
        const groupData = gpuProgram.structsAndGroups.groups;
        groupData.forEach((data) => {
          groupMap[data.group] = groupMap[data.group] || {};
          groupMap[data.group][data.binding] = data.name;
          nameHash[data.name] = data;
        });
      }
      let bindTick = 0;
      for (const i in resources) {
        if (nameHash[i])
          continue;
        if (!groups[99]) {
          groups[99] = new BindGroup();
          this._ownedBindGroups.push(groups[99]);
        }
        nameHash[i] = { group: 99, binding: bindTick, name: i };
        groupMap[99] = groupMap[99] || {};
        groupMap[99][bindTick] = i;
        bindTick++;
      }
      for (const i in resources) {
        const name = i;
        let value = resources[i];
        if (!value.source && !value._resourceType) {
          value = new UniformGroup(value);
        }
        const data = nameHash[name];
        if (data) {
          if (!groups[data.group]) {
            groups[data.group] = new BindGroup();
            this._ownedBindGroups.push(groups[data.group]);
          }
          groups[data.group].setResource(value, data.binding);
        }
      }
    }
    this.groups = groups;
    this._uniformBindMap = groupMap;
    this.resources = this._buildResourceAccessor(groups, nameHash);
  }
  /**
   * Sometimes a resource group will be provided later (for example global uniforms)
   * In such cases, this method can be used to let the shader know about the group.
   * @param name - the name of the resource group
   * @param groupIndex - the index of the group (should match the webGPU shader group location)
   * @param bindIndex - the index of the bind point (should match the webGPU shader bind point)
   */
  addResource(name, groupIndex, bindIndex) {
    var _a, _b;
    (_a = this._uniformBindMap)[groupIndex] || (_a[groupIndex] = {});
    (_b = this._uniformBindMap[groupIndex])[bindIndex] || (_b[bindIndex] = name);
    if (!this.groups[groupIndex]) {
      this.groups[groupIndex] = new BindGroup();
      this._ownedBindGroups.push(this.groups[groupIndex]);
    }
  }
  _buildResourceAccessor(groups, nameHash) {
    const uniformsOut = {};
    for (const i in nameHash) {
      const data = nameHash[i];
      Object.defineProperty(uniformsOut, data.name, {
        get() {
          return groups[data.group].getResource(data.binding);
        },
        set(value) {
          groups[data.group].setResource(value, data.binding);
        }
      });
    }
    return uniformsOut;
  }
  /**
   * Use to destroy the shader when its not longer needed.
   * It will destroy the resources and remove listeners.
   * @param destroyPrograms - if the programs should be destroyed as well.
   * Make sure its not being used by other shaders!
   */
  destroy(destroyPrograms = false) {
    this.emit("destroy", this);
    if (destroyPrograms) {
      this.gpuProgram?.destroy();
      this.glProgram?.destroy();
    }
    this.gpuProgram = null;
    this.glProgram = null;
    this.removeAllListeners();
    this._uniformBindMap = null;
    this._ownedBindGroups.forEach((bindGroup) => {
      bindGroup.destroy();
    });
    this._ownedBindGroups = null;
    this.resources = null;
    this.groups = null;
  }
  static from(options) {
    const { gpu, gl, ...rest } = options;
    let gpuProgram;
    let glProgram;
    if (gpu) {
      gpuProgram = GpuProgram.from(gpu);
    }
    if (gl) {
      glProgram = GlProgram.from(gl);
    }
    return new Shader({
      gpuProgram,
      glProgram,
      ...rest
    });
  }
}

const blendModeIds = {
  normal: 0,
  add: 1,
  multiply: 2,
  screen: 3,
  overlay: 4,
  erase: 5,
  "normal-npm": 6,
  "add-npm": 7,
  "screen-npm": 8,
  min: 9,
  max: 10
};
const BLEND = 0;
const OFFSET = 1;
const CULLING = 2;
const DEPTH_TEST = 3;
const WINDING = 4;
const DEPTH_MASK = 5;
const _State = class _State {
  constructor() {
    this.data = 0;
    this.blendMode = "normal";
    this.polygonOffset = 0;
    this.blend = true;
    this.depthMask = true;
  }
  /**
   * Activates blending of the computed fragment color values.
   * @default true
   */
  get blend() {
    return !!(this.data & 1 << BLEND);
  }
  set blend(value) {
    if (!!(this.data & 1 << BLEND) !== value) {
      this.data ^= 1 << BLEND;
    }
  }
  /**
   * Activates adding an offset to depth values of polygon's fragments
   * @default false
   */
  get offsets() {
    return !!(this.data & 1 << OFFSET);
  }
  set offsets(value) {
    if (!!(this.data & 1 << OFFSET) !== value) {
      this.data ^= 1 << OFFSET;
    }
  }
  /** The culling settings for this state none - No culling back - Back face culling front - Front face culling */
  set cullMode(value) {
    if (value === "none") {
      this.culling = false;
      return;
    }
    this.culling = true;
    this.clockwiseFrontFace = value === "front";
  }
  get cullMode() {
    if (!this.culling) {
      return "none";
    }
    return this.clockwiseFrontFace ? "front" : "back";
  }
  /**
   * Activates culling of polygons.
   * @default false
   */
  get culling() {
    return !!(this.data & 1 << CULLING);
  }
  set culling(value) {
    if (!!(this.data & 1 << CULLING) !== value) {
      this.data ^= 1 << CULLING;
    }
  }
  /**
   * Activates depth comparisons and updates to the depth buffer.
   * @default false
   */
  get depthTest() {
    return !!(this.data & 1 << DEPTH_TEST);
  }
  set depthTest(value) {
    if (!!(this.data & 1 << DEPTH_TEST) !== value) {
      this.data ^= 1 << DEPTH_TEST;
    }
  }
  /**
   * Enables or disables writing to the depth buffer.
   * @default true
   */
  get depthMask() {
    return !!(this.data & 1 << DEPTH_MASK);
  }
  set depthMask(value) {
    if (!!(this.data & 1 << DEPTH_MASK) !== value) {
      this.data ^= 1 << DEPTH_MASK;
    }
  }
  /**
   * Specifies whether or not front or back-facing polygons can be culled.
   * @default false
   */
  get clockwiseFrontFace() {
    return !!(this.data & 1 << WINDING);
  }
  set clockwiseFrontFace(value) {
    if (!!(this.data & 1 << WINDING) !== value) {
      this.data ^= 1 << WINDING;
    }
  }
  /**
   * The blend mode to be applied when this state is set. Apply a value of `normal` to reset the blend mode.
   * Setting this mode to anything other than NO_BLEND will automatically switch blending on.
   * @default 'normal'
   */
  get blendMode() {
    return this._blendMode;
  }
  set blendMode(value) {
    this.blend = value !== "none";
    this._blendMode = value;
    this._blendModeId = blendModeIds[value] || 0;
  }
  /**
   * The polygon offset. Setting this property to anything other than 0 will automatically enable polygon offset fill.
   * @default 0
   */
  get polygonOffset() {
    return this._polygonOffset;
  }
  set polygonOffset(value) {
    this.offsets = !!value;
    this._polygonOffset = value;
  }
  toString() {
    return `[pixi.js/core:State blendMode=${this.blendMode} clockwiseFrontFace=${this.clockwiseFrontFace} culling=${this.culling} depthMask=${this.depthMask} polygonOffset=${this.polygonOffset}]`;
  }
  /**
   * A quickly getting an instance of a State that is configured for 2d rendering.
   * @returns a new State with values set for 2d rendering
   */
  static for2d() {
    const state = new _State();
    state.depthTest = false;
    state.blend = true;
    return state;
  }
};
_State.default2d = _State.for2d();
let State = _State;

class ResizePlugin {
  /**
   * Initialize the plugin with scope of application instance
   * @static
   * @private
   * @param {object} [options] - See application options
   */
  static init(options) {
    Object.defineProperty(
      this,
      "resizeTo",
      /**
       * The HTML element or window to automatically resize the
       * renderer's view element to match width and height.
       * @member {Window|HTMLElement}
       * @name resizeTo
       * @memberof app.Application#
       */
      {
        set(dom) {
          globalThis.removeEventListener("resize", this.queueResize);
          this._resizeTo = dom;
          if (dom) {
            globalThis.addEventListener("resize", this.queueResize);
            this.resize();
          }
        },
        get() {
          return this._resizeTo;
        }
      }
    );
    this.queueResize = () => {
      if (!this._resizeTo) {
        return;
      }
      this._cancelResize();
      this._resizeId = requestAnimationFrame(() => this.resize());
    };
    this._cancelResize = () => {
      if (this._resizeId) {
        cancelAnimationFrame(this._resizeId);
        this._resizeId = null;
      }
    };
    this.resize = () => {
      if (!this._resizeTo) {
        return;
      }
      this._cancelResize();
      let width;
      let height;
      if (this._resizeTo === globalThis.window) {
        width = globalThis.innerWidth;
        height = globalThis.innerHeight;
      } else {
        const { clientWidth, clientHeight } = this._resizeTo;
        width = clientWidth;
        height = clientHeight;
      }
      this.renderer.resize(width, height);
      this.render();
    };
    this._resizeId = null;
    this._resizeTo = null;
    this.resizeTo = options.resizeTo || null;
  }
  /**
   * Clean up the ticker, scoped to application
   * @static
   * @private
   */
  static destroy() {
    globalThis.removeEventListener("resize", this.queueResize);
    this._cancelResize();
    this._cancelResize = null;
    this.queueResize = null;
    this.resizeTo = null;
    this.resize = null;
  }
}
/** @ignore */
ResizePlugin.extension = ExtensionType.Application;

class TickerPlugin {
  /**
   * Initialize the plugin with scope of application instance
   * @static
   * @private
   * @param {object} [options] - See application options
   */
  static init(options) {
    options = Object.assign({
      autoStart: true,
      sharedTicker: false
    }, options);
    Object.defineProperty(
      this,
      "ticker",
      {
        set(ticker) {
          if (this._ticker) {
            this._ticker.remove(this.render, this);
          }
          this._ticker = ticker;
          if (ticker) {
            ticker.add(this.render, this, UPDATE_PRIORITY.LOW);
          }
        },
        get() {
          return this._ticker;
        }
      }
    );
    this.stop = () => {
      this._ticker.stop();
    };
    this.start = () => {
      this._ticker.start();
    };
    this._ticker = null;
    this.ticker = options.sharedTicker ? Ticker.shared : new Ticker();
    if (options.autoStart) {
      this.start();
    }
  }
  /**
   * Clean up the ticker, scoped to application.
   * @static
   * @private
   */
  static destroy() {
    if (this._ticker) {
      const oldTicker = this._ticker;
      this.ticker = null;
      oldTicker.destroy();
    }
  }
}
/** @ignore */
TickerPlugin.extension = ExtensionType.Application;

class AbstractBitmapFont extends EventEmitter {
  constructor() {
    super(...arguments);
    /** The map of characters by character code. */
    this.chars = /* @__PURE__ */ Object.create(null);
    /**
     * The line-height of the font face in pixels.
     * @type {number}
     */
    this.lineHeight = 0;
    /**
     * The name of the font face
     * @type {string}
     */
    this.fontFamily = "";
    /** The metrics of the font face. */
    this.fontMetrics = { fontSize: 0, ascent: 0, descent: 0 };
    /**
     * The offset of the font face from the baseline.
     * @type {number}
     */
    this.baseLineOffset = 0;
    /** The range and type of the distance field for this font. */
    this.distanceField = { type: "none", range: 0 };
    /** The map of base page textures (i.e., sheets of glyphs). */
    this.pages = [];
    /** should the fill for this font be applied as a tint to the text. */
    this.applyFillAsTint = true;
    /** The size of the font face in pixels. */
    this.baseMeasurementFontSize = 100;
    this.baseRenderedFontSize = 100;
  }
  /**
   * The name of the font face.
   * @deprecated since 8.0.0 Use `fontFamily` instead.
   */
  get font() {
    deprecation(v8_0_0, "BitmapFont.font is deprecated, please use BitmapFont.fontFamily instead.");
    return this.fontFamily;
  }
  /**
   * The map of base page textures (i.e., sheets of glyphs).
   * @deprecated since 8.0.0 Use `pages` instead.
   */
  get pageTextures() {
    deprecation(v8_0_0, "BitmapFont.pageTextures is deprecated, please use BitmapFont.pages instead.");
    return this.pages;
  }
  /**
   * The size of the font face in pixels.
   * @deprecated since 8.0.0 Use `fontMetrics.fontSize` instead.
   */
  get size() {
    deprecation(v8_0_0, "BitmapFont.size is deprecated, please use BitmapFont.fontMetrics.fontSize instead.");
    return this.fontMetrics.fontSize;
  }
  /**
   * The kind of distance field for this font or "none".
   * @deprecated since 8.0.0 Use `distanceField.type` instead.
   */
  get distanceFieldRange() {
    deprecation(v8_0_0, "BitmapFont.distanceFieldRange is deprecated, please use BitmapFont.distanceField.range instead.");
    return this.distanceField.range;
  }
  /**
   * The range of the distance field in pixels.
   * @deprecated since 8.0.0 Use `distanceField.range` instead.
   */
  get distanceFieldType() {
    deprecation(v8_0_0, "BitmapFont.distanceFieldType is deprecated, please use BitmapFont.distanceField.type instead.");
    return this.distanceField.type;
  }
  destroy(destroyTextures = false) {
    this.emit("destroy", this);
    this.removeAllListeners();
    for (const i in this.chars) {
      this.chars[i].texture?.destroy();
    }
    this.chars = null;
    if (destroyTextures) {
      this.pages.forEach((page) => page.texture.destroy(true));
      this.pages = null;
    }
  }
}

const _FillGradient = class _FillGradient {
  constructor(x0, y0, x1, y1) {
    /** unique id for this fill gradient */
    this.uid = uid("fillGradient");
    this.type = "linear";
    this.gradientStops = [];
    this._styleKey = null;
    this.x0 = x0;
    this.y0 = y0;
    this.x1 = x1;
    this.y1 = y1;
  }
  addColorStop(offset, color) {
    this.gradientStops.push({ offset, color: Color.shared.setValue(color).toHexa() });
    this._styleKey = null;
    return this;
  }
  // TODO move to the system!
  buildLinearGradient() {
    const defaultSize = _FillGradient.defaultTextureSize;
    const { gradientStops } = this;
    const canvas = DOMAdapter.get().createCanvas();
    canvas.width = defaultSize;
    canvas.height = defaultSize;
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, _FillGradient.defaultTextureSize, 1);
    for (let i = 0; i < gradientStops.length; i++) {
      const stop = gradientStops[i];
      gradient.addColorStop(stop.offset, stop.color);
    }
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, defaultSize, defaultSize);
    this.texture = new Texture({
      source: new ImageSource({
        resource: canvas,
        addressModeU: "clamp-to-edge",
        addressModeV: "repeat"
      })
    });
    const { x0, y0, x1, y1 } = this;
    const m = new Matrix();
    const dx = x1 - x0;
    const dy = y1 - y0;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx);
    m.translate(-x0, -y0);
    m.scale(1 / defaultSize, 1 / defaultSize);
    m.rotate(-angle);
    m.scale(256 / dist, 1);
    this.transform = m;
    this._styleKey = null;
  }
  get styleKey() {
    if (this._styleKey) {
      return this._styleKey;
    }
    const stops = this.gradientStops.map((stop) => `${stop.offset}-${stop.color}`).join("-");
    const texture = this.texture.uid;
    const transform = this.transform.toArray().join("-");
    return `fill-gradient-${this.uid}-${stops}-${texture}-${transform}-${this.x0}-${this.y0}-${this.x1}-${this.y1}`;
  }
};
_FillGradient.defaultTextureSize = 256;
let FillGradient = _FillGradient;

const repetitionMap = {
  repeat: {
    addressModeU: "repeat",
    addressModeV: "repeat"
  },
  "repeat-x": {
    addressModeU: "repeat",
    addressModeV: "clamp-to-edge"
  },
  "repeat-y": {
    addressModeU: "clamp-to-edge",
    addressModeV: "repeat"
  },
  "no-repeat": {
    addressModeU: "clamp-to-edge",
    addressModeV: "clamp-to-edge"
  }
};
class FillPattern {
  constructor(texture, repetition) {
    /** unique id for this fill pattern */
    this.uid = uid("fillPattern");
    this.transform = new Matrix();
    this._styleKey = null;
    this.texture = texture;
    this.transform.scale(
      1 / texture.frame.width,
      1 / texture.frame.height
    );
    if (repetition) {
      texture.source.style.addressModeU = repetitionMap[repetition].addressModeU;
      texture.source.style.addressModeV = repetitionMap[repetition].addressModeV;
    }
  }
  setTransform(transform) {
    const texture = this.texture;
    this.transform.copyFrom(transform);
    this.transform.invert();
    this.transform.scale(
      1 / texture.frame.width,
      1 / texture.frame.height
    );
    this._styleKey = null;
  }
  get styleKey() {
    if (this._styleKey)
      return this._styleKey;
    this._styleKey = `fill-pattern-${this.uid}-${this.texture.uid}-${this.transform.toArray().join("-")}`;
    return this._styleKey;
  }
}

var parseSvgPath;
var hasRequiredParseSvgPath;

function requireParseSvgPath () {
	if (hasRequiredParseSvgPath) return parseSvgPath;
	hasRequiredParseSvgPath = 1;
	parseSvgPath = parse;

	/**
	 * expected argument lengths
	 * @type {Object}
	 */

	var length = {a: 7, c: 6, h: 1, l: 2, m: 2, q: 4, s: 4, t: 2, v: 1, z: 0};

	/**
	 * segment pattern
	 * @type {RegExp}
	 */

	var segment = /([astvzqmhlc])([^astvzqmhlc]*)/ig;

	/**
	 * parse an svg path data string. Generates an Array
	 * of commands where each command is an Array of the
	 * form `[command, arg1, arg2, ...]`
	 *
	 * @param {String} path
	 * @return {Array}
	 */

	function parse(path) {
		var data = [];
		path.replace(segment, function(_, command, args){
			var type = command.toLowerCase();
			args = parseValues(args);

			// overloaded moveTo
			if (type == 'm' && args.length > 2) {
				data.push([command].concat(args.splice(0, 2)));
				type = 'l';
				command = command == 'm' ? 'l' : 'L';
			}

			while (true) {
				if (args.length == length[type]) {
					args.unshift(command);
					return data.push(args)
				}
				if (args.length < length[type]) throw new Error('malformed path data')
				data.push([command].concat(args.splice(0, length[type])));
			}
		});
		return data
	}

	var number = /-?[0-9]*\.?[0-9]+(?:e[-+]?\d+)?/ig;

	function parseValues(args) {
		var numbers = args.match(number);
		return numbers ? numbers.map(Number) : []
	}
	return parseSvgPath;
}

var parseSvgPathExports = requireParseSvgPath();
const parse = /*@__PURE__*/getDefaultExportFromCjs(parseSvgPathExports);

function SVGToGraphicsPath(svgPath, path) {
  const commands = parse(svgPath);
  const subpaths = [];
  let currentSubPath = null;
  let lastX = 0;
  let lastY = 0;
  for (let i = 0; i < commands.length; i++) {
    const command = commands[i];
    const type = command[0];
    const data = command;
    switch (type) {
      case "M":
        lastX = data[1];
        lastY = data[2];
        path.moveTo(lastX, lastY);
        break;
      case "m":
        lastX += data[1];
        lastY += data[2];
        path.moveTo(lastX, lastY);
        break;
      case "H":
        lastX = data[1];
        path.lineTo(lastX, lastY);
        break;
      case "h":
        lastX += data[1];
        path.lineTo(lastX, lastY);
        break;
      case "V":
        lastY = data[1];
        path.lineTo(lastX, lastY);
        break;
      case "v":
        lastY += data[1];
        path.lineTo(lastX, lastY);
        break;
      case "L":
        lastX = data[1];
        lastY = data[2];
        path.lineTo(lastX, lastY);
        break;
      case "l":
        lastX += data[1];
        lastY += data[2];
        path.lineTo(lastX, lastY);
        break;
      case "C":
        lastX = data[5];
        lastY = data[6];
        path.bezierCurveTo(
          data[1],
          data[2],
          data[3],
          data[4],
          lastX,
          lastY
        );
        break;
      case "c":
        path.bezierCurveTo(
          lastX + data[1],
          lastY + data[2],
          lastX + data[3],
          lastY + data[4],
          lastX + data[5],
          lastY + data[6]
        );
        lastX += data[5];
        lastY += data[6];
        break;
      case "S":
        lastX = data[3];
        lastY = data[4];
        path.bezierCurveToShort(
          data[1],
          data[2],
          lastX,
          lastY
        );
        break;
      case "s":
        path.bezierCurveToShort(
          lastX + data[1],
          lastY + data[2],
          lastX + data[3],
          lastY + data[4]
        );
        lastX += data[3];
        lastY += data[4];
        break;
      case "Q":
        lastX = data[3];
        lastY = data[4];
        path.quadraticCurveTo(
          data[1],
          data[2],
          lastX,
          lastY
        );
        break;
      case "q":
        path.quadraticCurveTo(
          lastX + data[1],
          lastY + data[2],
          lastX + data[3],
          lastY + data[4]
        );
        lastX += data[3];
        lastY += data[4];
        break;
      case "T":
        lastX = data[1];
        lastY = data[2];
        path.quadraticCurveToShort(
          lastX,
          lastY
        );
        break;
      case "t":
        lastX += data[1];
        lastY += data[2];
        path.quadraticCurveToShort(
          lastX,
          lastY
        );
        break;
      case "A":
        lastX = data[6];
        lastY = data[7];
        path.arcToSvg(
          data[1],
          data[2],
          data[3],
          data[4],
          data[5],
          lastX,
          lastY
        );
        break;
      case "a":
        lastX += data[6];
        lastY += data[7];
        path.arcToSvg(
          data[1],
          data[2],
          data[3],
          data[4],
          data[5],
          lastX,
          lastY
        );
        break;
      case "Z":
      case "z":
        path.closePath();
        if (subpaths.length > 0) {
          currentSubPath = subpaths.pop();
          if (currentSubPath) {
            lastX = currentSubPath.startX;
            lastY = currentSubPath.startY;
          } else {
            lastX = 0;
            lastY = 0;
          }
        }
        currentSubPath = null;
        break;
      default:
        warn(`Unknown SVG path command: ${type}`);
    }
    if (type !== "Z" && type !== "z") {
      if (currentSubPath === null) {
        currentSubPath = { startX: lastX, startY: lastY };
        subpaths.push(currentSubPath);
      }
    }
  }
  return path;
}

class Circle {
  /**
   * @param x - The X coordinate of the center of this circle
   * @param y - The Y coordinate of the center of this circle
   * @param radius - The radius of the circle
   */
  constructor(x = 0, y = 0, radius = 0) {
    /**
     * The type of the object, mainly used to avoid `instanceof` checks
     * @default 'circle'
     */
    this.type = "circle";
    this.x = x;
    this.y = y;
    this.radius = radius;
  }
  /**
   * Creates a clone of this Circle instance
   * @returns A copy of the Circle
   */
  clone() {
    return new Circle(this.x, this.y, this.radius);
  }
  /**
   * Checks whether the x and y coordinates given are contained within this circle
   * @param x - The X coordinate of the point to test
   * @param y - The Y coordinate of the point to test
   * @returns Whether the x/y coordinates are within this Circle
   */
  contains(x, y) {
    if (this.radius <= 0)
      return false;
    const r2 = this.radius * this.radius;
    let dx = this.x - x;
    let dy = this.y - y;
    dx *= dx;
    dy *= dy;
    return dx + dy <= r2;
  }
  /**
   * Checks whether the x and y coordinates given are contained within this circle including the stroke.
   * @param x - The X coordinate of the point to test
   * @param y - The Y coordinate of the point to test
   * @param width - The width of the line to check
   * @returns Whether the x/y coordinates are within this Circle
   */
  strokeContains(x, y, width) {
    if (this.radius === 0)
      return false;
    const dx = this.x - x;
    const dy = this.y - y;
    const r = this.radius;
    const w2 = width / 2;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < r + w2 && distance > r - w2;
  }
  /**
   * Returns the framing rectangle of the circle as a Rectangle object
   * @param out
   * @returns The framing rectangle
   */
  getBounds(out) {
    out = out || new Rectangle();
    out.x = this.x - this.radius;
    out.y = this.y - this.radius;
    out.width = this.radius * 2;
    out.height = this.radius * 2;
    return out;
  }
  /**
   * Copies another circle to this one.
   * @param circle - The circle to copy from.
   * @returns Returns itself.
   */
  copyFrom(circle) {
    this.x = circle.x;
    this.y = circle.y;
    this.radius = circle.radius;
    return this;
  }
  /**
   * Copies this circle to another one.
   * @param circle - The circle to copy to.
   * @returns Returns given parameter.
   */
  copyTo(circle) {
    circle.copyFrom(this);
    return circle;
  }
  toString() {
    return `[pixi.js/math:Circle x=${this.x} y=${this.y} radius=${this.radius}]`;
  }
}

class Ellipse {
  /**
   * @param x - The X coordinate of the center of this ellipse
   * @param y - The Y coordinate of the center of this ellipse
   * @param halfWidth - The half width of this ellipse
   * @param halfHeight - The half height of this ellipse
   */
  constructor(x = 0, y = 0, halfWidth = 0, halfHeight = 0) {
    /**
     * The type of the object, mainly used to avoid `instanceof` checks
     * @default 'ellipse'
     */
    this.type = "ellipse";
    this.x = x;
    this.y = y;
    this.halfWidth = halfWidth;
    this.halfHeight = halfHeight;
  }
  /**
   * Creates a clone of this Ellipse instance
   * @returns {Ellipse} A copy of the ellipse
   */
  clone() {
    return new Ellipse(this.x, this.y, this.halfWidth, this.halfHeight);
  }
  /**
   * Checks whether the x and y coordinates given are contained within this ellipse
   * @param x - The X coordinate of the point to test
   * @param y - The Y coordinate of the point to test
   * @returns Whether the x/y coords are within this ellipse
   */
  contains(x, y) {
    if (this.halfWidth <= 0 || this.halfHeight <= 0) {
      return false;
    }
    let normx = (x - this.x) / this.halfWidth;
    let normy = (y - this.y) / this.halfHeight;
    normx *= normx;
    normy *= normy;
    return normx + normy <= 1;
  }
  /**
   * Checks whether the x and y coordinates given are contained within this ellipse including stroke
   * @param x - The X coordinate of the point to test
   * @param y - The Y coordinate of the point to test
   * @param width
   * @returns Whether the x/y coords are within this ellipse
   */
  strokeContains(x, y, width) {
    const { halfWidth, halfHeight } = this;
    if (halfWidth <= 0 || halfHeight <= 0) {
      return false;
    }
    const halfStrokeWidth = width / 2;
    const innerA = halfWidth - halfStrokeWidth;
    const innerB = halfHeight - halfStrokeWidth;
    const outerA = halfWidth + halfStrokeWidth;
    const outerB = halfHeight + halfStrokeWidth;
    const normalizedX = x - this.x;
    const normalizedY = y - this.y;
    const innerEllipse = normalizedX * normalizedX / (innerA * innerA) + normalizedY * normalizedY / (innerB * innerB);
    const outerEllipse = normalizedX * normalizedX / (outerA * outerA) + normalizedY * normalizedY / (outerB * outerB);
    return innerEllipse > 1 && outerEllipse <= 1;
  }
  /**
   * Returns the framing rectangle of the ellipse as a Rectangle object
   * @param out
   * @returns The framing rectangle
   */
  getBounds(out) {
    out = out || new Rectangle();
    out.x = this.x - this.halfWidth;
    out.y = this.y - this.halfHeight;
    out.width = this.halfWidth * 2;
    out.height = this.halfHeight * 2;
    return out;
  }
  /**
   * Copies another ellipse to this one.
   * @param ellipse - The ellipse to copy from.
   * @returns Returns itself.
   */
  copyFrom(ellipse) {
    this.x = ellipse.x;
    this.y = ellipse.y;
    this.halfWidth = ellipse.halfWidth;
    this.halfHeight = ellipse.halfHeight;
    return this;
  }
  /**
   * Copies this ellipse to another one.
   * @param ellipse - The ellipse to copy to.
   * @returns Returns given parameter.
   */
  copyTo(ellipse) {
    ellipse.copyFrom(this);
    return ellipse;
  }
  toString() {
    return `[pixi.js/math:Ellipse x=${this.x} y=${this.y} halfWidth=${this.halfWidth} halfHeight=${this.halfHeight}]`;
  }
}

function squaredDistanceToLineSegment(x, y, x1, y1, x2, y2) {
  const a = x - x1;
  const b = y - y1;
  const c = x2 - x1;
  const d = y2 - y1;
  const dot = a * c + b * d;
  const lenSq = c * c + d * d;
  let param = -1;
  if (lenSq !== 0) {
    param = dot / lenSq;
  }
  let xx;
  let yy;
  if (param < 0) {
    xx = x1;
    yy = y1;
  } else if (param > 1) {
    xx = x2;
    yy = y2;
  } else {
    xx = x1 + param * c;
    yy = y1 + param * d;
  }
  const dx = x - xx;
  const dy = y - yy;
  return dx * dx + dy * dy;
}

class Polygon {
  /**
   * @param points - This can be an array of Points
   *  that form the polygon, a flat array of numbers that will be interpreted as [x,y, x,y, ...], or
   *  the arguments passed can be all the points of the polygon e.g.
   *  `new Polygon(new Point(), new Point(), ...)`, or the arguments passed can be flat
   *  x,y values e.g. `new Polygon(x,y, x,y, x,y, ...)` where `x` and `y` are Numbers.
   */
  constructor(...points) {
    /**
     * The type of the object, mainly used to avoid `instanceof` checks
     * @default 'polygon'
     */
    this.type = "polygon";
    let flat = Array.isArray(points[0]) ? points[0] : points;
    if (typeof flat[0] !== "number") {
      const p = [];
      for (let i = 0, il = flat.length; i < il; i++) {
        p.push(flat[i].x, flat[i].y);
      }
      flat = p;
    }
    this.points = flat;
    this.closePath = true;
  }
  /**
   * Creates a clone of this polygon.
   * @returns - A copy of the polygon.
   */
  clone() {
    const points = this.points.slice();
    const polygon = new Polygon(points);
    polygon.closePath = this.closePath;
    return polygon;
  }
  /**
   * Checks whether the x and y coordinates passed to this function are contained within this polygon.
   * @param x - The X coordinate of the point to test.
   * @param y - The Y coordinate of the point to test.
   * @returns - Whether the x/y coordinates are within this polygon.
   */
  contains(x, y) {
    let inside = false;
    const length = this.points.length / 2;
    for (let i = 0, j = length - 1; i < length; j = i++) {
      const xi = this.points[i * 2];
      const yi = this.points[i * 2 + 1];
      const xj = this.points[j * 2];
      const yj = this.points[j * 2 + 1];
      const intersect = yi > y !== yj > y && x < (xj - xi) * ((y - yi) / (yj - yi)) + xi;
      if (intersect) {
        inside = !inside;
      }
    }
    return inside;
  }
  /**
   * Checks whether the x and y coordinates given are contained within this polygon including the stroke.
   * @param x - The X coordinate of the point to test
   * @param y - The Y coordinate of the point to test
   * @param strokeWidth - The width of the line to check
   * @returns Whether the x/y coordinates are within this polygon
   */
  strokeContains(x, y, strokeWidth) {
    const halfStrokeWidth = strokeWidth / 2;
    const halfStrokeWidthSqrd = halfStrokeWidth * halfStrokeWidth;
    const { points } = this;
    const iterationLength = points.length - (this.closePath ? 0 : 2);
    for (let i = 0; i < iterationLength; i += 2) {
      const x1 = points[i];
      const y1 = points[i + 1];
      const x2 = points[(i + 2) % points.length];
      const y2 = points[(i + 3) % points.length];
      const distanceSqrd = squaredDistanceToLineSegment(x, y, x1, y1, x2, y2);
      if (distanceSqrd <= halfStrokeWidthSqrd) {
        return true;
      }
    }
    return false;
  }
  /**
   * Returns the framing rectangle of the polygon as a Rectangle object
   * @param out - optional rectangle to store the result
   * @returns The framing rectangle
   */
  getBounds(out) {
    out = out || new Rectangle();
    const points = this.points;
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;
    for (let i = 0, n = points.length; i < n; i += 2) {
      const x = points[i];
      const y = points[i + 1];
      minX = x < minX ? x : minX;
      maxX = x > maxX ? x : maxX;
      minY = y < minY ? y : minY;
      maxY = y > maxY ? y : maxY;
    }
    out.x = minX;
    out.width = maxX - minX;
    out.y = minY;
    out.height = maxY - minY;
    return out;
  }
  /**
   * Copies another polygon to this one.
   * @param polygon - The polygon to copy from.
   * @returns Returns itself.
   */
  copyFrom(polygon) {
    this.points = polygon.points.slice();
    this.closePath = polygon.closePath;
    return this;
  }
  /**
   * Copies this polygon to another one.
   * @param polygon - The polygon to copy to.
   * @returns Returns given parameter.
   */
  copyTo(polygon) {
    polygon.copyFrom(this);
    return polygon;
  }
  toString() {
    return `[pixi.js/math:PolygoncloseStroke=${this.closePath}points=${this.points.reduce((pointsDesc, currentPoint) => `${pointsDesc}, ${currentPoint}`, "")}]`;
  }
  /**
   * Get the last X coordinate of the polygon
   * @readonly
   */
  get lastX() {
    return this.points[this.points.length - 2];
  }
  /**
   * Get the last Y coordinate of the polygon
   * @readonly
   */
  get lastY() {
    return this.points[this.points.length - 1];
  }
  /**
   * Get the first X coordinate of the polygon
   * @readonly
   */
  get x() {
    return this.points[this.points.length - 2];
  }
  /**
   * Get the first Y coordinate of the polygon
   * @readonly
   */
  get y() {
    return this.points[this.points.length - 1];
  }
}

const isCornerWithinStroke = (pX, pY, cornerX, cornerY, radius, halfStrokeWidth) => {
  const dx = pX - cornerX;
  const dy = pY - cornerY;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance >= radius - halfStrokeWidth && distance <= radius + halfStrokeWidth;
};
class RoundedRectangle {
  /**
   * @param x - The X coordinate of the upper-left corner of the rounded rectangle
   * @param y - The Y coordinate of the upper-left corner of the rounded rectangle
   * @param width - The overall width of this rounded rectangle
   * @param height - The overall height of this rounded rectangle
   * @param radius - Controls the radius of the rounded corners
   */
  constructor(x = 0, y = 0, width = 0, height = 0, radius = 20) {
    /**
     * The type of the object, mainly used to avoid `instanceof` checks
     * @default 'roundedRectangle'
     */
    this.type = "roundedRectangle";
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.radius = radius;
  }
  /**
   * Returns the framing rectangle of the rounded rectangle as a Rectangle object
   * @param out - optional rectangle to store the result
   * @returns The framing rectangle
   */
  getBounds(out) {
    out = out || new Rectangle();
    out.x = this.x;
    out.y = this.y;
    out.width = this.width;
    out.height = this.height;
    return out;
  }
  /**
   * Creates a clone of this Rounded Rectangle.
   * @returns - A copy of the rounded rectangle.
   */
  clone() {
    return new RoundedRectangle(this.x, this.y, this.width, this.height, this.radius);
  }
  /**
   * Copies another rectangle to this one.
   * @param rectangle - The rectangle to copy from.
   * @returns Returns itself.
   */
  copyFrom(rectangle) {
    this.x = rectangle.x;
    this.y = rectangle.y;
    this.width = rectangle.width;
    this.height = rectangle.height;
    return this;
  }
  /**
   * Copies this rectangle to another one.
   * @param rectangle - The rectangle to copy to.
   * @returns Returns given parameter.
   */
  copyTo(rectangle) {
    rectangle.copyFrom(this);
    return rectangle;
  }
  /**
   * Checks whether the x and y coordinates given are contained within this Rounded Rectangle
   * @param x - The X coordinate of the point to test.
   * @param y - The Y coordinate of the point to test.
   * @returns - Whether the x/y coordinates are within this Rounded Rectangle.
   */
  contains(x, y) {
    if (this.width <= 0 || this.height <= 0) {
      return false;
    }
    if (x >= this.x && x <= this.x + this.width) {
      if (y >= this.y && y <= this.y + this.height) {
        const radius = Math.max(0, Math.min(this.radius, Math.min(this.width, this.height) / 2));
        if (y >= this.y + radius && y <= this.y + this.height - radius || x >= this.x + radius && x <= this.x + this.width - radius) {
          return true;
        }
        let dx = x - (this.x + radius);
        let dy = y - (this.y + radius);
        const radius2 = radius * radius;
        if (dx * dx + dy * dy <= radius2) {
          return true;
        }
        dx = x - (this.x + this.width - radius);
        if (dx * dx + dy * dy <= radius2) {
          return true;
        }
        dy = y - (this.y + this.height - radius);
        if (dx * dx + dy * dy <= radius2) {
          return true;
        }
        dx = x - (this.x + radius);
        if (dx * dx + dy * dy <= radius2) {
          return true;
        }
      }
    }
    return false;
  }
  /**
   * Checks whether the x and y coordinates given are contained within this rectangle including the stroke.
   * @param pX - The X coordinate of the point to test
   * @param pY - The Y coordinate of the point to test
   * @param strokeWidth - The width of the line to check
   * @returns Whether the x/y coordinates are within this rectangle
   */
  strokeContains(pX, pY, strokeWidth) {
    const { x, y, width, height, radius } = this;
    const halfStrokeWidth = strokeWidth / 2;
    const innerX = x + radius;
    const innerY = y + radius;
    const innerWidth = width - radius * 2;
    const innerHeight = height - radius * 2;
    const rightBound = x + width;
    const bottomBound = y + height;
    if ((pX >= x - halfStrokeWidth && pX <= x + halfStrokeWidth || pX >= rightBound - halfStrokeWidth && pX <= rightBound + halfStrokeWidth) && pY >= innerY && pY <= innerY + innerHeight) {
      return true;
    }
    if ((pY >= y - halfStrokeWidth && pY <= y + halfStrokeWidth || pY >= bottomBound - halfStrokeWidth && pY <= bottomBound + halfStrokeWidth) && pX >= innerX && pX <= innerX + innerWidth) {
      return true;
    }
    return (
      // Top-left
      pX < innerX && pY < innerY && isCornerWithinStroke(pX, pY, innerX, innerY, radius, halfStrokeWidth) || pX > rightBound - radius && pY < innerY && isCornerWithinStroke(pX, pY, rightBound - radius, innerY, radius, halfStrokeWidth) || pX > rightBound - radius && pY > bottomBound - radius && isCornerWithinStroke(pX, pY, rightBound - radius, bottomBound - radius, radius, halfStrokeWidth) || pX < innerX && pY > bottomBound - radius && isCornerWithinStroke(pX, pY, innerX, bottomBound - radius, radius, halfStrokeWidth)
    );
  }
  toString() {
    return `[pixi.js/math:RoundedRectangle x=${this.x} y=${this.y}width=${this.width} height=${this.height} radius=${this.radius}]`;
  }
}

const fragTemplate = [
  "precision mediump float;",
  "void main(void){",
  "float test = 0.1;",
  "%forloop%",
  "gl_FragColor = vec4(0.0);",
  "}"
].join("\n");
function generateIfTestSrc(maxIfs) {
  let src = "";
  for (let i = 0; i < maxIfs; ++i) {
    if (i > 0) {
      src += "\nelse ";
    }
    if (i < maxIfs - 1) {
      src += `if(test == ${i}.0){}`;
    }
  }
  return src;
}
function checkMaxIfStatementsInShader(maxIfs, gl) {
  if (maxIfs === 0) {
    throw new Error("Invalid value of `0` passed to `checkMaxIfStatementsInShader`");
  }
  const shader = gl.createShader(gl.FRAGMENT_SHADER);
  try {
    while (true) {
      const fragmentSrc = fragTemplate.replace(/%forloop%/gi, generateIfTestSrc(maxIfs));
      gl.shaderSource(shader, fragmentSrc);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        maxIfs = maxIfs / 2 | 0;
      } else {
        break;
      }
    }
  } finally {
    gl.deleteShader(shader);
  }
  return maxIfs;
}

let maxTexturesPerBatchCache = null;
function getMaxTexturesPerBatch() {
  if (maxTexturesPerBatchCache)
    return maxTexturesPerBatchCache;
  const gl = getTestContext();
  maxTexturesPerBatchCache = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);
  maxTexturesPerBatchCache = checkMaxIfStatementsInShader(
    maxTexturesPerBatchCache,
    gl
  );
  gl.getExtension("WEBGL_lose_context")?.loseContext();
  return maxTexturesPerBatchCache;
}

const cachedGroups = {};
function getTextureBatchBindGroup(textures, size) {
  let uid = 2166136261;
  for (let i = 0; i < size; i++) {
    uid ^= textures[i].uid;
    uid = Math.imul(uid, 16777619);
    uid >>>= 0;
  }
  return cachedGroups[uid] || generateTextureBatchBindGroup(textures, size, uid);
}
let maxTextures = 0;
function generateTextureBatchBindGroup(textures, size, key) {
  const bindGroupResources = {};
  let bindIndex = 0;
  if (!maxTextures)
    maxTextures = getMaxTexturesPerBatch();
  for (let i = 0; i < maxTextures; i++) {
    const texture = i < size ? textures[i] : Texture.EMPTY.source;
    bindGroupResources[bindIndex++] = texture.source;
    bindGroupResources[bindIndex++] = texture.style;
  }
  const bindGroup = new BindGroup(bindGroupResources);
  cachedGroups[key] = bindGroup;
  return bindGroup;
}

class ViewableBuffer {
  constructor(sizeOrBuffer) {
    if (typeof sizeOrBuffer === "number") {
      this.rawBinaryData = new ArrayBuffer(sizeOrBuffer);
    } else if (sizeOrBuffer instanceof Uint8Array) {
      this.rawBinaryData = sizeOrBuffer.buffer;
    } else {
      this.rawBinaryData = sizeOrBuffer;
    }
    this.uint32View = new Uint32Array(this.rawBinaryData);
    this.float32View = new Float32Array(this.rawBinaryData);
    this.size = this.rawBinaryData.byteLength;
  }
  /** View on the raw binary data as a `Int8Array`. */
  get int8View() {
    if (!this._int8View) {
      this._int8View = new Int8Array(this.rawBinaryData);
    }
    return this._int8View;
  }
  /** View on the raw binary data as a `Uint8Array`. */
  get uint8View() {
    if (!this._uint8View) {
      this._uint8View = new Uint8Array(this.rawBinaryData);
    }
    return this._uint8View;
  }
  /**  View on the raw binary data as a `Int16Array`. */
  get int16View() {
    if (!this._int16View) {
      this._int16View = new Int16Array(this.rawBinaryData);
    }
    return this._int16View;
  }
  /** View on the raw binary data as a `Int32Array`. */
  get int32View() {
    if (!this._int32View) {
      this._int32View = new Int32Array(this.rawBinaryData);
    }
    return this._int32View;
  }
  /** View on the raw binary data as a `Float64Array`. */
  get float64View() {
    if (!this._float64Array) {
      this._float64Array = new Float64Array(this.rawBinaryData);
    }
    return this._float64Array;
  }
  /** View on the raw binary data as a `BigUint64Array`. */
  get bigUint64View() {
    if (!this._bigUint64Array) {
      this._bigUint64Array = new BigUint64Array(this.rawBinaryData);
    }
    return this._bigUint64Array;
  }
  /**
   * Returns the view of the given type.
   * @param type - One of `int8`, `uint8`, `int16`,
   *    `uint16`, `int32`, `uint32`, and `float32`.
   * @returns - typed array of given type
   */
  view(type) {
    return this[`${type}View`];
  }
  /** Destroys all buffer references. Do not use after calling this. */
  destroy() {
    this.rawBinaryData = null;
    this._int8View = null;
    this._uint8View = null;
    this._int16View = null;
    this.uint16View = null;
    this._int32View = null;
    this.uint32View = null;
    this.float32View = null;
  }
  /**
   * Returns the size of the given type in bytes.
   * @param type - One of `int8`, `uint8`, `int16`,
   *   `uint16`, `int32`, `uint32`, and `float32`.
   * @returns - size of the type in bytes
   */
  static sizeOf(type) {
    switch (type) {
      case "int8":
      case "uint8":
        return 1;
      case "int16":
      case "uint16":
        return 2;
      case "int32":
      case "uint32":
      case "float32":
        return 4;
      default:
        throw new Error(`${type} isn't a valid view type`);
    }
  }
}

function fastCopy(sourceBuffer, destinationBuffer) {
  const lengthDouble = sourceBuffer.byteLength / 8 | 0;
  const sourceFloat64View = new Float64Array(sourceBuffer, 0, lengthDouble);
  const destinationFloat64View = new Float64Array(destinationBuffer, 0, lengthDouble);
  destinationFloat64View.set(sourceFloat64View);
  const remainingBytes = sourceBuffer.byteLength - lengthDouble * 8;
  if (remainingBytes > 0) {
    const sourceUint8View = new Uint8Array(sourceBuffer, lengthDouble * 8, remainingBytes);
    const destinationUint8View = new Uint8Array(destinationBuffer, lengthDouble * 8, remainingBytes);
    destinationUint8View.set(sourceUint8View);
  }
}

const BLEND_TO_NPM = {
  normal: "normal-npm",
  add: "add-npm",
  screen: "screen-npm"
};

function getAdjustedBlendModeBlend(blendMode, textureSource) {
  if (textureSource.alphaMode === "no-premultiply-alpha") {
    return BLEND_TO_NPM[blendMode] || blendMode;
  }
  return blendMode;
}

class BatchTextureArray {
  constructor() {
    /** Respective locations for textures. */
    this.ids = /* @__PURE__ */ Object.create(null);
    this.textures = [];
    this.count = 0;
  }
  /** Clear the textures and their locations. */
  clear() {
    for (let i = 0; i < this.count; i++) {
      const t = this.textures[i];
      this.textures[i] = null;
      this.ids[t.uid] = null;
    }
    this.count = 0;
  }
}

class Batch {
  constructor() {
    this.renderPipeId = "batch";
    this.action = "startBatch";
    // TODO - eventually this could be useful for flagging batches as dirty and then only rebuilding those ones
    // public elementStart = 0;
    // public elementSize = 0;
    // for drawing..
    this.start = 0;
    this.size = 0;
    this.textures = new BatchTextureArray();
    this.blendMode = "normal";
    this.canBundle = true;
  }
  destroy() {
    this.textures = null;
    this.gpuBindGroup = null;
    this.bindGroup = null;
    this.batcher = null;
  }
}
const batchPool = [];
let batchPoolIndex = 0;
function getBatchFromPool() {
  return batchPoolIndex > 0 ? batchPool[--batchPoolIndex] : new Batch();
}
function returnBatchToPool(batch) {
  batchPool[batchPoolIndex++] = batch;
}
let BATCH_TICK = 0;
const _Batcher = class _Batcher {
  constructor(options = {}) {
    /** unique id for this batcher */
    this.uid = uid("batcher");
    /** Indicates whether the batch data has been modified and needs updating. */
    this.dirty = true;
    /** The current index of the batch being processed. */
    this.batchIndex = 0;
    /** An array of all batches created during the current rendering process. */
    this.batches = [];
    this._elements = [];
    _Batcher.defaultOptions.maxTextures = _Batcher.defaultOptions.maxTextures ?? getMaxTexturesPerBatch();
    options = { ..._Batcher.defaultOptions, ...options };
    const { maxTextures, attributesInitialSize, indicesInitialSize } = options;
    this.attributeBuffer = new ViewableBuffer(attributesInitialSize * 4);
    this.indexBuffer = new Uint16Array(indicesInitialSize);
    this.maxTextures = maxTextures;
  }
  begin() {
    this.elementSize = 0;
    this.elementStart = 0;
    this.indexSize = 0;
    this.attributeSize = 0;
    for (let i = 0; i < this.batchIndex; i++) {
      returnBatchToPool(this.batches[i]);
    }
    this.batchIndex = 0;
    this._batchIndexStart = 0;
    this._batchIndexSize = 0;
    this.dirty = true;
  }
  add(batchableObject) {
    this._elements[this.elementSize++] = batchableObject;
    batchableObject._indexStart = this.indexSize;
    batchableObject._attributeStart = this.attributeSize;
    batchableObject._batcher = this;
    this.indexSize += batchableObject.indexSize;
    this.attributeSize += batchableObject.attributeSize * this.vertexSize;
  }
  checkAndUpdateTexture(batchableObject, texture) {
    const textureId = batchableObject._batch.textures.ids[texture._source.uid];
    if (!textureId && textureId !== 0)
      return false;
    batchableObject._textureId = textureId;
    batchableObject.texture = texture;
    return true;
  }
  updateElement(batchableObject) {
    this.dirty = true;
    const attributeBuffer = this.attributeBuffer;
    if (batchableObject.packAsQuad) {
      this.packQuadAttributes(
        batchableObject,
        attributeBuffer.float32View,
        attributeBuffer.uint32View,
        batchableObject._attributeStart,
        batchableObject._textureId
      );
    } else {
      this.packAttributes(
        batchableObject,
        attributeBuffer.float32View,
        attributeBuffer.uint32View,
        batchableObject._attributeStart,
        batchableObject._textureId
      );
    }
  }
  /**
   * breaks the batcher. This happens when a batch gets too big,
   * or we need to switch to a different type of rendering (a filter for example)
   * @param instructionSet
   */
  break(instructionSet) {
    const elements = this._elements;
    if (!elements[this.elementStart])
      return;
    let batch = getBatchFromPool();
    let textureBatch = batch.textures;
    textureBatch.clear();
    const firstElement = elements[this.elementStart];
    let blendMode = getAdjustedBlendModeBlend(firstElement.blendMode, firstElement.texture._source);
    if (this.attributeSize * 4 > this.attributeBuffer.size) {
      this._resizeAttributeBuffer(this.attributeSize * 4);
    }
    if (this.indexSize > this.indexBuffer.length) {
      this._resizeIndexBuffer(this.indexSize);
    }
    const f32 = this.attributeBuffer.float32View;
    const u32 = this.attributeBuffer.uint32View;
    const indexBuffer = this.indexBuffer;
    let size = this._batchIndexSize;
    let start = this._batchIndexStart;
    let action = "startBatch";
    const maxTextures = this.maxTextures;
    for (let i = this.elementStart; i < this.elementSize; ++i) {
      const element = elements[i];
      elements[i] = null;
      const texture = element.texture;
      const source = texture._source;
      const adjustedBlendMode = getAdjustedBlendModeBlend(element.blendMode, source);
      const breakRequired = blendMode !== adjustedBlendMode;
      if (source._batchTick === BATCH_TICK && !breakRequired) {
        element._textureId = source._textureBindLocation;
        size += element.indexSize;
        if (element.packAsQuad) {
          this.packQuadAttributes(
            element,
            f32,
            u32,
            element._attributeStart,
            element._textureId
          );
          this.packQuadIndex(
            indexBuffer,
            element._indexStart,
            element._attributeStart / this.vertexSize
          );
        } else {
          this.packAttributes(
            element,
            f32,
            u32,
            element._attributeStart,
            element._textureId
          );
          this.packIndex(
            element,
            indexBuffer,
            element._indexStart,
            element._attributeStart / this.vertexSize
          );
        }
        element._batch = batch;
        continue;
      }
      source._batchTick = BATCH_TICK;
      if (textureBatch.count >= maxTextures || breakRequired) {
        this._finishBatch(
          batch,
          start,
          size - start,
          textureBatch,
          blendMode,
          instructionSet,
          action
        );
        action = "renderBatch";
        start = size;
        blendMode = adjustedBlendMode;
        batch = getBatchFromPool();
        textureBatch = batch.textures;
        textureBatch.clear();
        ++BATCH_TICK;
      }
      element._textureId = source._textureBindLocation = textureBatch.count;
      textureBatch.ids[source.uid] = textureBatch.count;
      textureBatch.textures[textureBatch.count++] = source;
      element._batch = batch;
      size += element.indexSize;
      if (element.packAsQuad) {
        this.packQuadAttributes(
          element,
          f32,
          u32,
          element._attributeStart,
          element._textureId
        );
        this.packQuadIndex(
          indexBuffer,
          element._indexStart,
          element._attributeStart / this.vertexSize
        );
      } else {
        this.packAttributes(
          element,
          f32,
          u32,
          element._attributeStart,
          element._textureId
        );
        this.packIndex(
          element,
          indexBuffer,
          element._indexStart,
          element._attributeStart / this.vertexSize
        );
      }
    }
    if (textureBatch.count > 0) {
      this._finishBatch(
        batch,
        start,
        size - start,
        textureBatch,
        blendMode,
        instructionSet,
        action
      );
      start = size;
      ++BATCH_TICK;
    }
    this.elementStart = this.elementSize;
    this._batchIndexStart = start;
    this._batchIndexSize = size;
  }
  _finishBatch(batch, indexStart, indexSize, textureBatch, blendMode, instructionSet, action) {
    batch.gpuBindGroup = null;
    batch.bindGroup = null;
    batch.action = action;
    batch.batcher = this;
    batch.textures = textureBatch;
    batch.blendMode = blendMode;
    batch.start = indexStart;
    batch.size = indexSize;
    ++BATCH_TICK;
    this.batches[this.batchIndex++] = batch;
    instructionSet.add(batch);
  }
  finish(instructionSet) {
    this.break(instructionSet);
  }
  /**
   * Resizes the attribute buffer to the given size (1 = 1 float32)
   * @param size - the size in vertices to ensure (not bytes!)
   */
  ensureAttributeBuffer(size) {
    if (size * 4 <= this.attributeBuffer.size)
      return;
    this._resizeAttributeBuffer(size * 4);
  }
  /**
   * Resizes the index buffer to the given size (1 = 1 float32)
   * @param size - the size in vertices to ensure (not bytes!)
   */
  ensureIndexBuffer(size) {
    if (size <= this.indexBuffer.length)
      return;
    this._resizeIndexBuffer(size);
  }
  _resizeAttributeBuffer(size) {
    const newSize = Math.max(size, this.attributeBuffer.size * 2);
    const newArrayBuffer = new ViewableBuffer(newSize);
    fastCopy(this.attributeBuffer.rawBinaryData, newArrayBuffer.rawBinaryData);
    this.attributeBuffer = newArrayBuffer;
  }
  _resizeIndexBuffer(size) {
    const indexBuffer = this.indexBuffer;
    let newSize = Math.max(size, indexBuffer.length * 1.5);
    newSize += newSize % 2;
    const newIndexBuffer = newSize > 65535 ? new Uint32Array(newSize) : new Uint16Array(newSize);
    if (newIndexBuffer.BYTES_PER_ELEMENT !== indexBuffer.BYTES_PER_ELEMENT) {
      for (let i = 0; i < indexBuffer.length; i++) {
        newIndexBuffer[i] = indexBuffer[i];
      }
    } else {
      fastCopy(indexBuffer.buffer, newIndexBuffer.buffer);
    }
    this.indexBuffer = newIndexBuffer;
  }
  packQuadIndex(indexBuffer, index, indicesOffset) {
    indexBuffer[index] = indicesOffset + 0;
    indexBuffer[index + 1] = indicesOffset + 1;
    indexBuffer[index + 2] = indicesOffset + 2;
    indexBuffer[index + 3] = indicesOffset + 0;
    indexBuffer[index + 4] = indicesOffset + 2;
    indexBuffer[index + 5] = indicesOffset + 3;
  }
  packIndex(element, indexBuffer, index, indicesOffset) {
    const indices = element.indices;
    const size = element.indexSize;
    const indexOffset = element.indexOffset;
    const attributeOffset = element.attributeOffset;
    for (let i = 0; i < size; i++) {
      indexBuffer[index++] = indicesOffset + indices[i + indexOffset] - attributeOffset;
    }
  }
  destroy() {
    for (let i = 0; i < this.batches.length; i++) {
      returnBatchToPool(this.batches[i]);
    }
    this.batches = null;
    for (let i = 0; i < this._elements.length; i++) {
      this._elements[i]._batch = null;
    }
    this._elements = null;
    this.indexBuffer = null;
    this.attributeBuffer.destroy();
    this.attributeBuffer = null;
  }
};
_Batcher.defaultOptions = {
  maxTextures: null,
  attributesInitialSize: 4,
  indicesInitialSize: 6
};
let Batcher = _Batcher;

var BufferUsage = /* @__PURE__ */ ((BufferUsage2) => {
  BufferUsage2[BufferUsage2["MAP_READ"] = 1] = "MAP_READ";
  BufferUsage2[BufferUsage2["MAP_WRITE"] = 2] = "MAP_WRITE";
  BufferUsage2[BufferUsage2["COPY_SRC"] = 4] = "COPY_SRC";
  BufferUsage2[BufferUsage2["COPY_DST"] = 8] = "COPY_DST";
  BufferUsage2[BufferUsage2["INDEX"] = 16] = "INDEX";
  BufferUsage2[BufferUsage2["VERTEX"] = 32] = "VERTEX";
  BufferUsage2[BufferUsage2["UNIFORM"] = 64] = "UNIFORM";
  BufferUsage2[BufferUsage2["STORAGE"] = 128] = "STORAGE";
  BufferUsage2[BufferUsage2["INDIRECT"] = 256] = "INDIRECT";
  BufferUsage2[BufferUsage2["QUERY_RESOLVE"] = 512] = "QUERY_RESOLVE";
  BufferUsage2[BufferUsage2["STATIC"] = 1024] = "STATIC";
  return BufferUsage2;
})(BufferUsage || {});

class Buffer extends EventEmitter {
  /**
   * Creates a new Buffer with the given options
   * @param options - the options for the buffer
   */
  constructor(options) {
    let { data, size } = options;
    const { usage, label, shrinkToFit } = options;
    super();
    /**
     * emits when the underlying buffer has changed shape (i.e. resized)
     * letting the renderer know that it needs to discard the old buffer on the GPU and create a new one
     * @event change
     */
    /**
     * emits when the underlying buffer data has been updated. letting the renderer know
     * that it needs to update the buffer on the GPU
     * @event update
     */
    /**
     * emits when the buffer is destroyed. letting the renderer know that it needs to destroy the buffer on the GPU
     * @event destroy
     */
    /** a unique id for this uniform group used through the renderer */
    this.uid = uid("buffer");
    /**
     * a resource type, used to identify how to handle it when its in a bind group / shader resource
     * @internal
     * @ignore
     */
    this._resourceType = "buffer";
    /**
     * the resource id used internally by the renderer to build bind group keys
     * @internal
     * @ignore
     */
    this._resourceId = uid("resource");
    /**
     * used internally to know if a uniform group was used in the last render pass
     * @internal
     * @ignore
     */
    this._touched = 0;
    /**
     * @internal
     * @ignore
     */
    this._updateID = 1;
    /**
     * should the GPU buffer be shrunk when the data becomes smaller?
     * changing this will cause the buffer to be destroyed and a new one created on the GPU
     * this can be expensive, especially if the buffer is already big enough!
     * setting this to false will prevent the buffer from being shrunk. This will yield better performance
     * if you are constantly setting data that is changing size often.
     * @default true
     */
    this.shrinkToFit = true;
    /**
     * Has the buffer been destroyed?
     * @readonly
     */
    this.destroyed = false;
    if (data instanceof Array) {
      data = new Float32Array(data);
    }
    this._data = data;
    size = size ?? data?.byteLength;
    const mappedAtCreation = !!data;
    this.descriptor = {
      size,
      usage,
      mappedAtCreation,
      label
    };
    this.shrinkToFit = shrinkToFit ?? true;
  }
  /** the data in the buffer */
  get data() {
    return this._data;
  }
  set data(value) {
    this.setDataWithSize(value, value.length, true);
  }
  /** whether the buffer is static or not */
  get static() {
    return !!(this.descriptor.usage & BufferUsage.STATIC);
  }
  set static(value) {
    if (value) {
      this.descriptor.usage |= BufferUsage.STATIC;
    } else {
      this.descriptor.usage &= ~BufferUsage.STATIC;
    }
  }
  /**
   * Sets the data in the buffer to the given value. This will immediately update the buffer on the GPU.
   * If you only want to update a subset of the buffer, you can pass in the size of the data.
   * @param value - the data to set
   * @param size - the size of the data in bytes
   * @param syncGPU - should the buffer be updated on the GPU immediately?
   */
  setDataWithSize(value, size, syncGPU) {
    this._updateID++;
    this._updateSize = size * value.BYTES_PER_ELEMENT;
    if (this._data === value) {
      if (syncGPU)
        this.emit("update", this);
      return;
    }
    const oldData = this._data;
    this._data = value;
    if (oldData.length !== value.length) {
      if (!this.shrinkToFit && value.byteLength < oldData.byteLength) {
        if (syncGPU)
          this.emit("update", this);
      } else {
        this.descriptor.size = value.byteLength;
        this._resourceId = uid("resource");
        this.emit("change", this);
      }
      return;
    }
    if (syncGPU)
      this.emit("update", this);
  }
  /**
   * updates the buffer on the GPU to reflect the data in the buffer.
   * By default it will update the entire buffer. If you only want to update a subset of the buffer,
   * you can pass in the size of the buffer to update.
   * @param sizeInBytes - the new size of the buffer in bytes
   */
  update(sizeInBytes) {
    this._updateSize = sizeInBytes ?? this._updateSize;
    this._updateID++;
    this.emit("update", this);
  }
  /** Destroys the buffer */
  destroy() {
    this.destroyed = true;
    this.emit("destroy", this);
    this.emit("change", this);
    this._data = null;
    this.descriptor = null;
    this.removeAllListeners();
  }
}

function ensureIsBuffer(buffer, index) {
  if (!(buffer instanceof Buffer)) {
    let usage = index ? BufferUsage.INDEX : BufferUsage.VERTEX;
    if (buffer instanceof Array) {
      if (index) {
        buffer = new Uint32Array(buffer);
        usage = BufferUsage.INDEX | BufferUsage.COPY_DST;
      } else {
        buffer = new Float32Array(buffer);
        usage = BufferUsage.VERTEX | BufferUsage.COPY_DST;
      }
    }
    buffer = new Buffer({
      data: buffer,
      label: index ? "index-mesh-buffer" : "vertex-mesh-buffer",
      usage
    });
  }
  return buffer;
}

function getGeometryBounds(geometry, attributeId, bounds) {
  const attribute = geometry.getAttribute(attributeId);
  if (!attribute) {
    bounds.minX = 0;
    bounds.minY = 0;
    bounds.maxX = 0;
    bounds.maxY = 0;
    return bounds;
  }
  const data = attribute.buffer.data;
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  const byteSize = data.BYTES_PER_ELEMENT;
  const offset = (attribute.offset || 0) / byteSize;
  const stride = (attribute.stride || 2 * 4) / byteSize;
  for (let i = offset; i < data.length; i += stride) {
    const x = data[i];
    const y = data[i + 1];
    if (x > maxX)
      maxX = x;
    if (y > maxY)
      maxY = y;
    if (x < minX)
      minX = x;
    if (y < minY)
      minY = y;
  }
  bounds.minX = minX;
  bounds.minY = minY;
  bounds.maxX = maxX;
  bounds.maxY = maxY;
  return bounds;
}

function ensureIsAttribute(attribute) {
  if (attribute instanceof Buffer || Array.isArray(attribute) || attribute.BYTES_PER_ELEMENT) {
    attribute = {
      buffer: attribute
    };
  }
  attribute.buffer = ensureIsBuffer(attribute.buffer, false);
  return attribute;
}
class Geometry extends EventEmitter {
  /**
   * Create a new instance of a geometry
   * @param options - The options for the geometry.
   */
  constructor(options) {
    const { attributes, indexBuffer, topology } = options;
    super();
    /** The unique id of the geometry. */
    this.uid = uid("geometry");
    /**
     * the layout key will be generated by WebGPU all geometries that have the same structure
     * will have the same layout key. This is used to cache the pipeline layout
     * @internal
     * @ignore
     */
    this._layoutKey = 0;
    /** the instance count of the geometry to draw */
    this.instanceCount = 1;
    this._bounds = new Bounds();
    this._boundsDirty = true;
    this.attributes = attributes;
    this.buffers = [];
    this.instanceCount = options.instanceCount || 1;
    for (const i in attributes) {
      const attribute = attributes[i] = ensureIsAttribute(attributes[i]);
      const bufferIndex = this.buffers.indexOf(attribute.buffer);
      if (bufferIndex === -1) {
        this.buffers.push(attribute.buffer);
        attribute.buffer.on("update", this.onBufferUpdate, this);
        attribute.buffer.on("change", this.onBufferUpdate, this);
      }
    }
    if (indexBuffer) {
      this.indexBuffer = ensureIsBuffer(indexBuffer, true);
      this.buffers.push(this.indexBuffer);
    }
    this.topology = topology || "triangle-list";
  }
  onBufferUpdate() {
    this._boundsDirty = true;
    this.emit("update", this);
  }
  /**
   * Returns the requested attribute.
   * @param id - The name of the attribute required
   * @returns - The attribute requested.
   */
  getAttribute(id) {
    return this.attributes[id];
  }
  /**
   * Returns the index buffer
   * @returns - The index buffer.
   */
  getIndex() {
    return this.indexBuffer;
  }
  /**
   * Returns the requested buffer.
   * @param id - The name of the buffer required.
   * @returns - The buffer requested.
   */
  getBuffer(id) {
    return this.getAttribute(id).buffer;
  }
  /**
   * Used to figure out how many vertices there are in this geometry
   * @returns the number of vertices in the geometry
   */
  getSize() {
    for (const i in this.attributes) {
      const attribute = this.attributes[i];
      const buffer = attribute.buffer;
      return buffer.data.length / (attribute.stride / 4 || attribute.size);
    }
    return 0;
  }
  /** Returns the bounds of the geometry. */
  get bounds() {
    if (!this._boundsDirty)
      return this._bounds;
    this._boundsDirty = false;
    return getGeometryBounds(this, "aPosition", this._bounds);
  }
  /**
   * destroys the geometry.
   * @param destroyBuffers - destroy the buffers associated with this geometry
   */
  destroy(destroyBuffers = false) {
    this.emit("destroy", this);
    this.removeAllListeners();
    if (destroyBuffers) {
      this.buffers.forEach((buffer) => buffer.destroy());
    }
    this.attributes = null;
    this.buffers = null;
    this.indexBuffer = null;
    this._bounds = null;
  }
}

const placeHolderBufferData = new Float32Array(1);
const placeHolderIndexData = new Uint32Array(1);
class BatchGeometry extends Geometry {
  constructor() {
    const vertexSize = 6;
    const attributeBuffer = new Buffer({
      data: placeHolderBufferData,
      label: "attribute-batch-buffer",
      usage: BufferUsage.VERTEX | BufferUsage.COPY_DST,
      shrinkToFit: false
    });
    const indexBuffer = new Buffer({
      data: placeHolderIndexData,
      label: "index-batch-buffer",
      usage: BufferUsage.INDEX | BufferUsage.COPY_DST,
      // | BufferUsage.STATIC,
      shrinkToFit: false
    });
    const stride = vertexSize * 4;
    super({
      attributes: {
        aPosition: {
          buffer: attributeBuffer,
          format: "float32x2",
          stride,
          offset: 0
        },
        aUV: {
          buffer: attributeBuffer,
          format: "float32x2",
          stride,
          offset: 2 * 4
        },
        aColor: {
          buffer: attributeBuffer,
          format: "unorm8x4",
          stride,
          offset: 4 * 4
        },
        aTextureIdAndRound: {
          buffer: attributeBuffer,
          format: "uint16x2",
          stride,
          offset: 5 * 4
        }
      },
      indexBuffer
    });
  }
}

function addBits(srcParts, parts, name) {
  if (srcParts) {
    for (const i in srcParts) {
      const id = i.toLocaleLowerCase();
      const part = parts[id];
      if (part) {
        let sanitisedPart = srcParts[i];
        if (i === "header") {
          sanitisedPart = sanitisedPart.replace(/@in\s+[^;]+;\s*/g, "").replace(/@out\s+[^;]+;\s*/g, "");
        }
        if (name) {
          part.push(`//----${name}----//`);
        }
        part.push(sanitisedPart);
      } else {
        warn(`${i} placement hook does not exist in shader`);
      }
    }
  }
}

const findHooksRx = /\{\{(.*?)\}\}/g;
function compileHooks(programSrc) {
  const parts = {};
  const partMatches = programSrc.match(findHooksRx)?.map((hook) => hook.replace(/[{()}]/g, "")) ?? [];
  partMatches.forEach((hook) => {
    parts[hook] = [];
  });
  return parts;
}

function extractInputs(fragmentSource, out) {
  let match;
  const regex = /@in\s+([^;]+);/g;
  while ((match = regex.exec(fragmentSource)) !== null) {
    out.push(match[1]);
  }
}
function compileInputs(fragments, template, sort = false) {
  const results = [];
  extractInputs(template, results);
  fragments.forEach((fragment) => {
    if (fragment.header) {
      extractInputs(fragment.header, results);
    }
  });
  const mainInput = results;
  if (sort) {
    mainInput.sort();
  }
  const finalString = mainInput.map((inValue, i) => `       @location(${i}) ${inValue},`).join("\n");
  let cleanedString = template.replace(/@in\s+[^;]+;\s*/g, "");
  cleanedString = cleanedString.replace("{{in}}", `
${finalString}
`);
  return cleanedString;
}

function extractOutputs(fragmentSource, out) {
  let match;
  const regex = /@out\s+([^;]+);/g;
  while ((match = regex.exec(fragmentSource)) !== null) {
    out.push(match[1]);
  }
}
function extractVariableName(value) {
  const regex = /\b(\w+)\s*:/g;
  const match = regex.exec(value);
  return match ? match[1] : "";
}
function stripVariable(value) {
  const regex = /@.*?\s+/g;
  return value.replace(regex, "");
}
function compileOutputs(fragments, template) {
  const results = [];
  extractOutputs(template, results);
  fragments.forEach((fragment) => {
    if (fragment.header) {
      extractOutputs(fragment.header, results);
    }
  });
  let index = 0;
  const mainStruct = results.sort().map((inValue) => {
    if (inValue.indexOf("builtin") > -1) {
      return inValue;
    }
    return `@location(${index++}) ${inValue}`;
  }).join(",\n");
  const mainStart = results.sort().map((inValue) => `       var ${stripVariable(inValue)};`).join("\n");
  const mainEnd = `return VSOutput(
                ${results.sort().map((inValue) => ` ${extractVariableName(inValue)}`).join(",\n")});`;
  let compiledCode = template.replace(/@out\s+[^;]+;\s*/g, "");
  compiledCode = compiledCode.replace("{{struct}}", `
${mainStruct}
`);
  compiledCode = compiledCode.replace("{{start}}", `
${mainStart}
`);
  compiledCode = compiledCode.replace("{{return}}", `
${mainEnd}
`);
  return compiledCode;
}

function injectBits(templateSrc, fragmentParts) {
  let out = templateSrc;
  for (const i in fragmentParts) {
    const parts = fragmentParts[i];
    const toInject = parts.join("\n");
    if (toInject.length) {
      out = out.replace(`{{${i}}}`, `//-----${i} START-----//
${parts.join("\n")}
//----${i} FINISH----//`);
    } else {
      out = out.replace(`{{${i}}}`, "");
    }
  }
  return out;
}

const cacheMap = /* @__PURE__ */ Object.create(null);
const bitCacheMap = /* @__PURE__ */ new Map();
let CACHE_UID = 0;
function compileHighShader({
  template,
  bits
}) {
  const cacheId = generateCacheId(template, bits);
  if (cacheMap[cacheId])
    return cacheMap[cacheId];
  const { vertex, fragment } = compileInputsAndOutputs(template, bits);
  cacheMap[cacheId] = compileBits(vertex, fragment, bits);
  return cacheMap[cacheId];
}
function compileHighShaderGl({
  template,
  bits
}) {
  const cacheId = generateCacheId(template, bits);
  if (cacheMap[cacheId])
    return cacheMap[cacheId];
  cacheMap[cacheId] = compileBits(template.vertex, template.fragment, bits);
  return cacheMap[cacheId];
}
function compileInputsAndOutputs(template, bits) {
  const vertexFragments = bits.map((shaderBit) => shaderBit.vertex).filter((v) => !!v);
  const fragmentFragments = bits.map((shaderBit) => shaderBit.fragment).filter((v) => !!v);
  let compiledVertex = compileInputs(vertexFragments, template.vertex, true);
  compiledVertex = compileOutputs(vertexFragments, compiledVertex);
  const compiledFragment = compileInputs(fragmentFragments, template.fragment, true);
  return {
    vertex: compiledVertex,
    fragment: compiledFragment
  };
}
function generateCacheId(template, bits) {
  return bits.map((highFragment) => {
    if (!bitCacheMap.has(highFragment)) {
      bitCacheMap.set(highFragment, CACHE_UID++);
    }
    return bitCacheMap.get(highFragment);
  }).sort((a, b) => a - b).join("-") + template.vertex + template.fragment;
}
function compileBits(vertex, fragment, bits) {
  const vertexParts = compileHooks(vertex);
  const fragmentParts = compileHooks(fragment);
  bits.forEach((shaderBit) => {
    addBits(shaderBit.vertex, vertexParts, shaderBit.name);
    addBits(shaderBit.fragment, fragmentParts, shaderBit.name);
  });
  return {
    vertex: injectBits(vertex, vertexParts),
    fragment: injectBits(fragment, fragmentParts)
  };
}

const vertexGPUTemplate = (
  /* wgsl */
  `
    @in aPosition: vec2<f32>;
    @in aUV: vec2<f32>;

    @out @builtin(position) vPosition: vec4<f32>;
    @out vUV : vec2<f32>;
    @out vColor : vec4<f32>;

    {{header}}

    struct VSOutput {
        {{struct}}
    };

    @vertex
    fn main( {{in}} ) -> VSOutput {

        var worldTransformMatrix = globalUniforms.uWorldTransformMatrix;
        var modelMatrix = mat3x3<f32>(
            1.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 0.0, 1.0
          );
        var position = aPosition;
        var uv = aUV;

        {{start}}
        
        vColor = vec4<f32>(1., 1., 1., 1.);

        {{main}}

        vUV = uv;

        var modelViewProjectionMatrix = globalUniforms.uProjectionMatrix * worldTransformMatrix * modelMatrix;

        vPosition =  vec4<f32>((modelViewProjectionMatrix *  vec3<f32>(position, 1.0)).xy, 0.0, 1.0);
       
        vColor *= globalUniforms.uWorldColorAlpha;

        {{end}}

        {{return}}
    };
`
);
const fragmentGPUTemplate = (
  /* wgsl */
  `
    @in vUV : vec2<f32>;
    @in vColor : vec4<f32>;
   
    {{header}}

    @fragment
    fn main(
        {{in}}
      ) -> @location(0) vec4<f32> {
        
        {{start}}

        var outColor:vec4<f32>;
      
        {{main}}
        
        var finalColor:vec4<f32> = outColor * vColor;

        {{end}}

        return finalColor;
      };
`
);
const vertexGlTemplate = (
  /* glsl */
  `
    in vec2 aPosition;
    in vec2 aUV;

    out vec4 vColor;
    out vec2 vUV;

    {{header}}

    void main(void){

        mat3 worldTransformMatrix = uWorldTransformMatrix;
        mat3 modelMatrix = mat3(
            1.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 0.0, 1.0
          );
        vec2 position = aPosition;
        vec2 uv = aUV;
        
        {{start}}
        
        vColor = vec4(1.);
        
        {{main}}
        
        vUV = uv;
        
        mat3 modelViewProjectionMatrix = uProjectionMatrix * worldTransformMatrix * modelMatrix;

        gl_Position = vec4((modelViewProjectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);

        vColor *= uWorldColorAlpha;

        {{end}}
    }
`
);
const fragmentGlTemplate = (
  /* glsl */
  `
   
    in vec4 vColor;
    in vec2 vUV;

    out vec4 finalColor;

    {{header}}

    void main(void) {
        
        {{start}}

        vec4 outColor;
      
        {{main}}
        
        finalColor = outColor * vColor;
        
        {{end}}
    }
`
);

const globalUniformsBit = {
  name: "global-uniforms-bit",
  vertex: {
    header: (
      /* wgsl */
      `
        struct GlobalUniforms {
            uProjectionMatrix:mat3x3<f32>,
            uWorldTransformMatrix:mat3x3<f32>,
            uWorldColorAlpha: vec4<f32>,
            uResolution: vec2<f32>,
        }

        @group(0) @binding(0) var<uniform> globalUniforms : GlobalUniforms;
        `
    )
  }
};
const globalUniformsBitGl = {
  name: "global-uniforms-bit",
  vertex: {
    header: (
      /* glsl */
      `
          uniform mat3 uProjectionMatrix;
          uniform mat3 uWorldTransformMatrix;
          uniform vec4 uWorldColorAlpha;
          uniform vec2 uResolution;
        `
    )
  }
};

function compileHighShaderGpuProgram({ bits, name }) {
  const source = compileHighShader({
    template: {
      fragment: fragmentGPUTemplate,
      vertex: vertexGPUTemplate
    },
    bits: [
      globalUniformsBit,
      ...bits
    ]
  });
  return GpuProgram.from({
    name,
    vertex: {
      source: source.vertex,
      entryPoint: "main"
    },
    fragment: {
      source: source.fragment,
      entryPoint: "main"
    }
  });
}
function compileHighShaderGlProgram({ bits, name }) {
  return new GlProgram({
    name,
    ...compileHighShaderGl({
      template: {
        vertex: vertexGlTemplate,
        fragment: fragmentGlTemplate
      },
      bits: [
        globalUniformsBitGl,
        ...bits
      ]
    })
  });
}

const colorBit = {
  name: "color-bit",
  vertex: {
    header: (
      /* wgsl */
      `
            @in aColor: vec4<f32>;
        `
    ),
    main: (
      /* wgsl */
      `
            vColor *= vec4<f32>(aColor.rgb * aColor.a, aColor.a);
        `
    )
  }
};
const colorBitGl = {
  name: "color-bit",
  vertex: {
    header: (
      /* glsl */
      `
            in vec4 aColor;
        `
    ),
    main: (
      /* glsl */
      `
            vColor *= vec4(aColor.rgb * aColor.a, aColor.a);
        `
    )
  }
};

const textureBatchBitGpuCache = {};
function generateBindingSrc(maxTextures) {
  const src = [];
  if (maxTextures === 1) {
    src.push("@group(1) @binding(0) var textureSource1: texture_2d<f32>;");
    src.push("@group(1) @binding(1) var textureSampler1: sampler;");
  } else {
    let bindingIndex = 0;
    for (let i = 0; i < maxTextures; i++) {
      src.push(`@group(1) @binding(${bindingIndex++}) var textureSource${i + 1}: texture_2d<f32>;`);
      src.push(`@group(1) @binding(${bindingIndex++}) var textureSampler${i + 1}: sampler;`);
    }
  }
  return src.join("\n");
}
function generateSampleSrc(maxTextures) {
  const src = [];
  if (maxTextures === 1) {
    src.push("outColor = textureSampleGrad(textureSource1, textureSampler1, vUV, uvDx, uvDy);");
  } else {
    src.push("switch vTextureId {");
    for (let i = 0; i < maxTextures; i++) {
      if (i === maxTextures - 1) {
        src.push(`  default:{`);
      } else {
        src.push(`  case ${i}:{`);
      }
      src.push(`      outColor = textureSampleGrad(textureSource${i + 1}, textureSampler${i + 1}, vUV, uvDx, uvDy);`);
      src.push(`      break;}`);
    }
    src.push(`}`);
  }
  return src.join("\n");
}
function generateTextureBatchBit(maxTextures) {
  if (!textureBatchBitGpuCache[maxTextures]) {
    textureBatchBitGpuCache[maxTextures] = {
      name: "texture-batch-bit",
      vertex: {
        header: `
                @in aTextureIdAndRound: vec2<u32>;
                @out @interpolate(flat) vTextureId : u32;
            `,
        main: `
                vTextureId = aTextureIdAndRound.y;
            `,
        end: `
                if(aTextureIdAndRound.x == 1)
                {
                    vPosition = vec4<f32>(roundPixels(vPosition.xy, globalUniforms.uResolution), vPosition.zw);
                }
            `
      },
      fragment: {
        header: `
                @in @interpolate(flat) vTextureId: u32;

                ${generateBindingSrc(maxTextures)}
            `,
        main: `
                var uvDx = dpdx(vUV);
                var uvDy = dpdy(vUV);

                ${generateSampleSrc(maxTextures)}
            `
      }
    };
  }
  return textureBatchBitGpuCache[maxTextures];
}
const textureBatchBitGlCache = {};
function generateSampleGlSrc(maxTextures) {
  const src = [];
  for (let i = 0; i < maxTextures; i++) {
    if (i > 0) {
      src.push("else");
    }
    if (i < maxTextures - 1) {
      src.push(`if(vTextureId < ${i}.5)`);
    }
    src.push("{");
    src.push(`	outColor = texture(uTextures[${i}], vUV);`);
    src.push("}");
  }
  return src.join("\n");
}
function generateTextureBatchBitGl(maxTextures) {
  if (!textureBatchBitGlCache[maxTextures]) {
    textureBatchBitGlCache[maxTextures] = {
      name: "texture-batch-bit",
      vertex: {
        header: `
                in vec2 aTextureIdAndRound;
                out float vTextureId;

            `,
        main: `
                vTextureId = aTextureIdAndRound.y;
            `,
        end: `
                if(aTextureIdAndRound.x == 1.)
                {
                    gl_Position.xy = roundPixels(gl_Position.xy, uResolution);
                }
            `
      },
      fragment: {
        header: `
                in float vTextureId;

                uniform sampler2D uTextures[${maxTextures}];

            `,
        main: `

                ${generateSampleGlSrc(maxTextures)}
            `
      }
    };
  }
  return textureBatchBitGlCache[maxTextures];
}

const roundPixelsBit = {
  name: "round-pixels-bit",
  vertex: {
    header: (
      /* wgsl */
      `
            fn roundPixels(position: vec2<f32>, targetSize: vec2<f32>) -> vec2<f32> 
            {
                return (floor(((position * 0.5 + 0.5) * targetSize) + 0.5) / targetSize) * 2.0 - 1.0;
            }
        `
    )
  }
};
const roundPixelsBitGl = {
  name: "round-pixels-bit",
  vertex: {
    header: (
      /* glsl */
      `   
            vec2 roundPixels(vec2 position, vec2 targetSize)
            {       
                return (floor(((position * 0.5 + 0.5) * targetSize) + 0.5) / targetSize) * 2.0 - 1.0;
            }
        `
    )
  }
};

const batchSamplersUniformGroupHash = {};
function getBatchSamplersUniformGroup(maxTextures) {
  let batchSamplersUniformGroup = batchSamplersUniformGroupHash[maxTextures];
  if (batchSamplersUniformGroup)
    return batchSamplersUniformGroup;
  const sampleValues = new Int32Array(maxTextures);
  for (let i = 0; i < maxTextures; i++) {
    sampleValues[i] = i;
  }
  batchSamplersUniformGroup = batchSamplersUniformGroupHash[maxTextures] = new UniformGroup({
    uTextures: { value: sampleValues, type: `i32`, size: maxTextures }
  }, { isStatic: true });
  return batchSamplersUniformGroup;
}

class DefaultShader extends Shader {
  constructor(maxTextures) {
    const glProgram = compileHighShaderGlProgram({
      name: "batch",
      bits: [
        colorBitGl,
        generateTextureBatchBitGl(maxTextures),
        roundPixelsBitGl
      ]
    });
    const gpuProgram = compileHighShaderGpuProgram({
      name: "batch",
      bits: [
        colorBit,
        generateTextureBatchBit(maxTextures),
        roundPixelsBit
      ]
    });
    super({
      glProgram,
      gpuProgram,
      resources: {
        batchSamplers: getBatchSamplersUniformGroup(maxTextures)
      }
    });
  }
}

let defaultShader = null;
const _DefaultBatcher = class _DefaultBatcher extends Batcher {
  constructor() {
    super(...arguments);
    this.geometry = new BatchGeometry();
    this.shader = defaultShader || (defaultShader = new DefaultShader(this.maxTextures));
    this.name = _DefaultBatcher.extension.name;
    /** The size of one attribute. 1 = 32 bit. x, y, u, v, color, textureIdAndRound -> total = 6 */
    this.vertexSize = 6;
  }
  /**
   * Packs the attributes of a DefaultBatchableMeshElement into the provided views.
   * @param element - The DefaultBatchableMeshElement to pack.
   * @param float32View - The Float32Array view to pack into.
   * @param uint32View - The Uint32Array view to pack into.
   * @param index - The starting index in the views.
   * @param textureId - The texture ID to use.
   */
  packAttributes(element, float32View, uint32View, index, textureId) {
    const textureIdAndRound = textureId << 16 | element.roundPixels & 65535;
    const wt = element.transform;
    const a = wt.a;
    const b = wt.b;
    const c = wt.c;
    const d = wt.d;
    const tx = wt.tx;
    const ty = wt.ty;
    const { positions, uvs } = element;
    const argb = element.color;
    const offset = element.attributeOffset;
    const end = offset + element.attributeSize;
    for (let i = offset; i < end; i++) {
      const i2 = i * 2;
      const x = positions[i2];
      const y = positions[i2 + 1];
      float32View[index++] = a * x + c * y + tx;
      float32View[index++] = d * y + b * x + ty;
      float32View[index++] = uvs[i2];
      float32View[index++] = uvs[i2 + 1];
      uint32View[index++] = argb;
      uint32View[index++] = textureIdAndRound;
    }
  }
  /**
   * Packs the attributes of a DefaultBatchableQuadElement into the provided views.
   * @param element - The DefaultBatchableQuadElement to pack.
   * @param float32View - The Float32Array view to pack into.
   * @param uint32View - The Uint32Array view to pack into.
   * @param index - The starting index in the views.
   * @param textureId - The texture ID to use.
   */
  packQuadAttributes(element, float32View, uint32View, index, textureId) {
    const texture = element.texture;
    const wt = element.transform;
    const a = wt.a;
    const b = wt.b;
    const c = wt.c;
    const d = wt.d;
    const tx = wt.tx;
    const ty = wt.ty;
    const bounds = element.bounds;
    const w0 = bounds.maxX;
    const w1 = bounds.minX;
    const h0 = bounds.maxY;
    const h1 = bounds.minY;
    const uvs = texture.uvs;
    const argb = element.color;
    const textureIdAndRound = textureId << 16 | element.roundPixels & 65535;
    float32View[index + 0] = a * w1 + c * h1 + tx;
    float32View[index + 1] = d * h1 + b * w1 + ty;
    float32View[index + 2] = uvs.x0;
    float32View[index + 3] = uvs.y0;
    uint32View[index + 4] = argb;
    uint32View[index + 5] = textureIdAndRound;
    float32View[index + 6] = a * w0 + c * h1 + tx;
    float32View[index + 7] = d * h1 + b * w0 + ty;
    float32View[index + 8] = uvs.x1;
    float32View[index + 9] = uvs.y1;
    uint32View[index + 10] = argb;
    uint32View[index + 11] = textureIdAndRound;
    float32View[index + 12] = a * w0 + c * h0 + tx;
    float32View[index + 13] = d * h0 + b * w0 + ty;
    float32View[index + 14] = uvs.x2;
    float32View[index + 15] = uvs.y2;
    uint32View[index + 16] = argb;
    uint32View[index + 17] = textureIdAndRound;
    float32View[index + 18] = a * w1 + c * h0 + tx;
    float32View[index + 19] = d * h0 + b * w1 + ty;
    float32View[index + 20] = uvs.x3;
    float32View[index + 21] = uvs.y3;
    uint32View[index + 22] = argb;
    uint32View[index + 23] = textureIdAndRound;
  }
};
/** @ignore */
_DefaultBatcher.extension = {
  type: [
    ExtensionType.Batcher
  ],
  name: "default"
};
let DefaultBatcher = _DefaultBatcher;

function buildUvs(vertices, verticesStride, verticesOffset, uvs, uvsOffset, uvsStride, size, matrix = null) {
  let index = 0;
  verticesOffset *= verticesStride;
  uvsOffset *= uvsStride;
  const a = matrix.a;
  const b = matrix.b;
  const c = matrix.c;
  const d = matrix.d;
  const tx = matrix.tx;
  const ty = matrix.ty;
  while (index < size) {
    const x = vertices[verticesOffset];
    const y = vertices[verticesOffset + 1];
    uvs[uvsOffset] = a * x + c * y + tx;
    uvs[uvsOffset + 1] = b * x + d * y + ty;
    uvsOffset += uvsStride;
    verticesOffset += verticesStride;
    index++;
  }
}
function buildSimpleUvs(uvs, uvsOffset, uvsStride, size) {
  let index = 0;
  uvsOffset *= uvsStride;
  while (index < size) {
    uvs[uvsOffset] = 0;
    uvs[uvsOffset + 1] = 0;
    uvsOffset += uvsStride;
    index++;
  }
}

function transformVertices(vertices, m, offset, stride, size) {
  const a = m.a;
  const b = m.b;
  const c = m.c;
  const d = m.d;
  const tx = m.tx;
  const ty = m.ty;
  offset = offset || 0;
  stride = stride || 2;
  size = size || vertices.length / stride - offset;
  let index = offset * stride;
  for (let i = 0; i < size; i++) {
    const x = vertices[index];
    const y = vertices[index + 1];
    vertices[index] = a * x + c * y + tx;
    vertices[index + 1] = b * x + d * y + ty;
    index += stride;
  }
}

function multiplyHexColors(color1, color2) {
  if (color1 === 16777215 || !color2)
    return color2;
  if (color2 === 16777215 || !color1)
    return color1;
  const r1 = color1 >> 16 & 255;
  const g1 = color1 >> 8 & 255;
  const b1 = color1 & 255;
  const r2 = color2 >> 16 & 255;
  const g2 = color2 >> 8 & 255;
  const b2 = color2 & 255;
  const r = r1 * r2 / 255;
  const g = g1 * g2 / 255;
  const b = b1 * b2 / 255;
  return (r << 16) + (g << 8) + b;
}

const identityMatrix = new Matrix();
class BatchableGraphics {
  constructor() {
    this.packAsQuad = false;
    this.batcherName = "default";
    this.applyTransform = true;
    this.roundPixels = 0;
    this._batcher = null;
    this._batch = null;
  }
  get uvs() {
    return this.geometryData.uvs;
  }
  get positions() {
    return this.geometryData.vertices;
  }
  get indices() {
    return this.geometryData.indices;
  }
  get blendMode() {
    if (this.applyTransform) {
      return this.renderable.groupBlendMode;
    }
    return "normal";
  }
  get color() {
    const rgb = this.baseColor;
    const bgr = rgb >> 16 | rgb & 65280 | (rgb & 255) << 16;
    const renderable = this.renderable;
    if (renderable) {
      return multiplyHexColors(bgr, renderable.groupColor) + (this.alpha * renderable.groupAlpha * 255 << 24);
    }
    return bgr + (this.alpha * 255 << 24);
  }
  get transform() {
    return this.renderable?.groupTransform || identityMatrix;
  }
  copyTo(gpuBuffer) {
    gpuBuffer.indexOffset = this.indexOffset;
    gpuBuffer.indexSize = this.indexSize;
    gpuBuffer.attributeOffset = this.attributeOffset;
    gpuBuffer.attributeSize = this.attributeSize;
    gpuBuffer.baseColor = this.baseColor;
    gpuBuffer.alpha = this.alpha;
    gpuBuffer.texture = this.texture;
    gpuBuffer.geometryData = this.geometryData;
  }
  reset() {
    this.applyTransform = true;
    this.renderable = null;
  }
}

const buildCircle = {
  extension: {
    type: ExtensionType.ShapeBuilder,
    name: "circle"
  },
  build(shape, points) {
    let x;
    let y;
    let dx;
    let dy;
    let rx;
    let ry;
    if (shape.type === "circle") {
      const circle = shape;
      x = circle.x;
      y = circle.y;
      rx = ry = circle.radius;
      dx = dy = 0;
    } else if (shape.type === "ellipse") {
      const ellipse = shape;
      x = ellipse.x;
      y = ellipse.y;
      rx = ellipse.halfWidth;
      ry = ellipse.halfHeight;
      dx = dy = 0;
    } else {
      const roundedRect = shape;
      const halfWidth = roundedRect.width / 2;
      const halfHeight = roundedRect.height / 2;
      x = roundedRect.x + halfWidth;
      y = roundedRect.y + halfHeight;
      rx = ry = Math.max(0, Math.min(roundedRect.radius, Math.min(halfWidth, halfHeight)));
      dx = halfWidth - rx;
      dy = halfHeight - ry;
    }
    if (!(rx >= 0 && ry >= 0 && dx >= 0 && dy >= 0)) {
      return points;
    }
    const n = Math.ceil(2.3 * Math.sqrt(rx + ry));
    const m = n * 8 + (dx ? 4 : 0) + (dy ? 4 : 0);
    if (m === 0) {
      return points;
    }
    if (n === 0) {
      points[0] = points[6] = x + dx;
      points[1] = points[3] = y + dy;
      points[2] = points[4] = x - dx;
      points[5] = points[7] = y - dy;
      return points;
    }
    let j1 = 0;
    let j2 = n * 4 + (dx ? 2 : 0) + 2;
    let j3 = j2;
    let j4 = m;
    let x0 = dx + rx;
    let y0 = dy;
    let x1 = x + x0;
    let x2 = x - x0;
    let y1 = y + y0;
    points[j1++] = x1;
    points[j1++] = y1;
    points[--j2] = y1;
    points[--j2] = x2;
    if (dy) {
      const y22 = y - y0;
      points[j3++] = x2;
      points[j3++] = y22;
      points[--j4] = y22;
      points[--j4] = x1;
    }
    for (let i = 1; i < n; i++) {
      const a = Math.PI / 2 * (i / n);
      const x02 = dx + Math.cos(a) * rx;
      const y02 = dy + Math.sin(a) * ry;
      const x12 = x + x02;
      const x22 = x - x02;
      const y12 = y + y02;
      const y22 = y - y02;
      points[j1++] = x12;
      points[j1++] = y12;
      points[--j2] = y12;
      points[--j2] = x22;
      points[j3++] = x22;
      points[j3++] = y22;
      points[--j4] = y22;
      points[--j4] = x12;
    }
    x0 = dx;
    y0 = dy + ry;
    x1 = x + x0;
    x2 = x - x0;
    y1 = y + y0;
    const y2 = y - y0;
    points[j1++] = x1;
    points[j1++] = y1;
    points[--j4] = y2;
    points[--j4] = x1;
    if (dx) {
      points[j1++] = x2;
      points[j1++] = y1;
      points[--j4] = y2;
      points[--j4] = x2;
    }
    return points;
  },
  triangulate(points, vertices, verticesStride, verticesOffset, indices, indicesOffset) {
    if (points.length === 0) {
      return;
    }
    let centerX = 0;
    let centerY = 0;
    for (let i = 0; i < points.length; i += 2) {
      centerX += points[i];
      centerY += points[i + 1];
    }
    centerX /= points.length / 2;
    centerY /= points.length / 2;
    let count = verticesOffset;
    vertices[count * verticesStride] = centerX;
    vertices[count * verticesStride + 1] = centerY;
    const centerIndex = count++;
    for (let i = 0; i < points.length; i += 2) {
      vertices[count * verticesStride] = points[i];
      vertices[count * verticesStride + 1] = points[i + 1];
      if (i > 0) {
        indices[indicesOffset++] = count;
        indices[indicesOffset++] = centerIndex;
        indices[indicesOffset++] = count - 1;
      }
      count++;
    }
    indices[indicesOffset++] = centerIndex + 1;
    indices[indicesOffset++] = centerIndex;
    indices[indicesOffset++] = count - 1;
  }
};
const buildEllipse = { ...buildCircle, extension: { ...buildCircle.extension, name: "ellipse" } };
const buildRoundedRectangle = { ...buildCircle, extension: { ...buildCircle.extension, name: "roundedRectangle" } };

const closePointEps = 1e-4;
const curveEps = 1e-4;

function getOrientationOfPoints(points) {
  const m = points.length;
  if (m < 6) {
    return 1;
  }
  let area = 0;
  for (let i = 0, x1 = points[m - 2], y1 = points[m - 1]; i < m; i += 2) {
    const x2 = points[i];
    const y2 = points[i + 1];
    area += (x2 - x1) * (y2 + y1);
    x1 = x2;
    y1 = y2;
  }
  if (area < 0) {
    return -1;
  }
  return 1;
}

function square(x, y, nx, ny, innerWeight, outerWeight, clockwise, verts) {
  const ix = x - nx * innerWeight;
  const iy = y - ny * innerWeight;
  const ox = x + nx * outerWeight;
  const oy = y + ny * outerWeight;
  let exx;
  let eyy;
  if (clockwise) {
    exx = ny;
    eyy = -nx;
  } else {
    exx = -ny;
    eyy = nx;
  }
  const eix = ix + exx;
  const eiy = iy + eyy;
  const eox = ox + exx;
  const eoy = oy + eyy;
  verts.push(eix, eiy);
  verts.push(eox, eoy);
  return 2;
}
function round(cx, cy, sx, sy, ex, ey, verts, clockwise) {
  const cx2p0x = sx - cx;
  const cy2p0y = sy - cy;
  let angle0 = Math.atan2(cx2p0x, cy2p0y);
  let angle1 = Math.atan2(ex - cx, ey - cy);
  if (clockwise && angle0 < angle1) {
    angle0 += Math.PI * 2;
  } else if (!clockwise && angle0 > angle1) {
    angle1 += Math.PI * 2;
  }
  let startAngle = angle0;
  const angleDiff = angle1 - angle0;
  const absAngleDiff = Math.abs(angleDiff);
  const radius = Math.sqrt(cx2p0x * cx2p0x + cy2p0y * cy2p0y);
  const segCount = (15 * absAngleDiff * Math.sqrt(radius) / Math.PI >> 0) + 1;
  const angleInc = angleDiff / segCount;
  startAngle += angleInc;
  if (clockwise) {
    verts.push(cx, cy);
    verts.push(sx, sy);
    for (let i = 1, angle = startAngle; i < segCount; i++, angle += angleInc) {
      verts.push(cx, cy);
      verts.push(
        cx + Math.sin(angle) * radius,
        cy + Math.cos(angle) * radius
      );
    }
    verts.push(cx, cy);
    verts.push(ex, ey);
  } else {
    verts.push(sx, sy);
    verts.push(cx, cy);
    for (let i = 1, angle = startAngle; i < segCount; i++, angle += angleInc) {
      verts.push(
        cx + Math.sin(angle) * radius,
        cy + Math.cos(angle) * radius
      );
      verts.push(cx, cy);
    }
    verts.push(ex, ey);
    verts.push(cx, cy);
  }
  return segCount * 2;
}
function buildLine(points, lineStyle, flipAlignment, closed, vertices, _verticesStride, _verticesOffset, indices, _indicesOffset) {
  const eps = closePointEps;
  if (points.length === 0) {
    return;
  }
  const style = lineStyle;
  let alignment = style.alignment;
  if (lineStyle.alignment !== 0.5) {
    let orientation = getOrientationOfPoints(points);
    alignment = (alignment - 0.5) * orientation + 0.5;
  }
  const firstPoint = new Point(points[0], points[1]);
  const lastPoint = new Point(points[points.length - 2], points[points.length - 1]);
  const closedShape = closed;
  const closedPath = Math.abs(firstPoint.x - lastPoint.x) < eps && Math.abs(firstPoint.y - lastPoint.y) < eps;
  if (closedShape) {
    points = points.slice();
    if (closedPath) {
      points.pop();
      points.pop();
      lastPoint.set(points[points.length - 2], points[points.length - 1]);
    }
    const midPointX = (firstPoint.x + lastPoint.x) * 0.5;
    const midPointY = (lastPoint.y + firstPoint.y) * 0.5;
    points.unshift(midPointX, midPointY);
    points.push(midPointX, midPointY);
  }
  const verts = vertices;
  const length = points.length / 2;
  let indexCount = points.length;
  const indexStart = verts.length / 2;
  const width = style.width / 2;
  const widthSquared = width * width;
  const miterLimitSquared = style.miterLimit * style.miterLimit;
  let x0 = points[0];
  let y0 = points[1];
  let x1 = points[2];
  let y1 = points[3];
  let x2 = 0;
  let y2 = 0;
  let perpX = -(y0 - y1);
  let perpY = x0 - x1;
  let perp1x = 0;
  let perp1y = 0;
  let dist = Math.sqrt(perpX * perpX + perpY * perpY);
  perpX /= dist;
  perpY /= dist;
  perpX *= width;
  perpY *= width;
  const ratio = alignment;
  const innerWeight = (1 - ratio) * 2;
  const outerWeight = ratio * 2;
  if (!closedShape) {
    if (style.cap === "round") {
      indexCount += round(
        x0 - perpX * (innerWeight - outerWeight) * 0.5,
        y0 - perpY * (innerWeight - outerWeight) * 0.5,
        x0 - perpX * innerWeight,
        y0 - perpY * innerWeight,
        x0 + perpX * outerWeight,
        y0 + perpY * outerWeight,
        verts,
        true
      ) + 2;
    } else if (style.cap === "square") {
      indexCount += square(x0, y0, perpX, perpY, innerWeight, outerWeight, true, verts);
    }
  }
  verts.push(
    x0 - perpX * innerWeight,
    y0 - perpY * innerWeight
  );
  verts.push(
    x0 + perpX * outerWeight,
    y0 + perpY * outerWeight
  );
  for (let i = 1; i < length - 1; ++i) {
    x0 = points[(i - 1) * 2];
    y0 = points[(i - 1) * 2 + 1];
    x1 = points[i * 2];
    y1 = points[i * 2 + 1];
    x2 = points[(i + 1) * 2];
    y2 = points[(i + 1) * 2 + 1];
    perpX = -(y0 - y1);
    perpY = x0 - x1;
    dist = Math.sqrt(perpX * perpX + perpY * perpY);
    perpX /= dist;
    perpY /= dist;
    perpX *= width;
    perpY *= width;
    perp1x = -(y1 - y2);
    perp1y = x1 - x2;
    dist = Math.sqrt(perp1x * perp1x + perp1y * perp1y);
    perp1x /= dist;
    perp1y /= dist;
    perp1x *= width;
    perp1y *= width;
    const dx0 = x1 - x0;
    const dy0 = y0 - y1;
    const dx1 = x1 - x2;
    const dy1 = y2 - y1;
    const dot = dx0 * dx1 + dy0 * dy1;
    const cross = dy0 * dx1 - dy1 * dx0;
    const clockwise = cross < 0;
    if (Math.abs(cross) < 1e-3 * Math.abs(dot)) {
      verts.push(
        x1 - perpX * innerWeight,
        y1 - perpY * innerWeight
      );
      verts.push(
        x1 + perpX * outerWeight,
        y1 + perpY * outerWeight
      );
      if (dot >= 0) {
        if (style.join === "round") {
          indexCount += round(
            x1,
            y1,
            x1 - perpX * innerWeight,
            y1 - perpY * innerWeight,
            x1 - perp1x * innerWeight,
            y1 - perp1y * innerWeight,
            verts,
            false
          ) + 4;
        } else {
          indexCount += 2;
        }
        verts.push(
          x1 - perp1x * outerWeight,
          y1 - perp1y * outerWeight
        );
        verts.push(
          x1 + perp1x * innerWeight,
          y1 + perp1y * innerWeight
        );
      }
      continue;
    }
    const c1 = (-perpX + x0) * (-perpY + y1) - (-perpX + x1) * (-perpY + y0);
    const c2 = (-perp1x + x2) * (-perp1y + y1) - (-perp1x + x1) * (-perp1y + y2);
    const px = (dx0 * c2 - dx1 * c1) / cross;
    const py = (dy1 * c1 - dy0 * c2) / cross;
    const pDist = (px - x1) * (px - x1) + (py - y1) * (py - y1);
    const imx = x1 + (px - x1) * innerWeight;
    const imy = y1 + (py - y1) * innerWeight;
    const omx = x1 - (px - x1) * outerWeight;
    const omy = y1 - (py - y1) * outerWeight;
    const smallerInsideSegmentSq = Math.min(dx0 * dx0 + dy0 * dy0, dx1 * dx1 + dy1 * dy1);
    const insideWeight = clockwise ? innerWeight : outerWeight;
    const smallerInsideDiagonalSq = smallerInsideSegmentSq + insideWeight * insideWeight * widthSquared;
    const insideMiterOk = pDist <= smallerInsideDiagonalSq;
    if (insideMiterOk) {
      if (style.join === "bevel" || pDist / widthSquared > miterLimitSquared) {
        if (clockwise) {
          verts.push(imx, imy);
          verts.push(x1 + perpX * outerWeight, y1 + perpY * outerWeight);
          verts.push(imx, imy);
          verts.push(x1 + perp1x * outerWeight, y1 + perp1y * outerWeight);
        } else {
          verts.push(x1 - perpX * innerWeight, y1 - perpY * innerWeight);
          verts.push(omx, omy);
          verts.push(x1 - perp1x * innerWeight, y1 - perp1y * innerWeight);
          verts.push(omx, omy);
        }
        indexCount += 2;
      } else if (style.join === "round") {
        if (clockwise) {
          verts.push(imx, imy);
          verts.push(x1 + perpX * outerWeight, y1 + perpY * outerWeight);
          indexCount += round(
            x1,
            y1,
            x1 + perpX * outerWeight,
            y1 + perpY * outerWeight,
            x1 + perp1x * outerWeight,
            y1 + perp1y * outerWeight,
            verts,
            true
          ) + 4;
          verts.push(imx, imy);
          verts.push(x1 + perp1x * outerWeight, y1 + perp1y * outerWeight);
        } else {
          verts.push(x1 - perpX * innerWeight, y1 - perpY * innerWeight);
          verts.push(omx, omy);
          indexCount += round(
            x1,
            y1,
            x1 - perpX * innerWeight,
            y1 - perpY * innerWeight,
            x1 - perp1x * innerWeight,
            y1 - perp1y * innerWeight,
            verts,
            false
          ) + 4;
          verts.push(x1 - perp1x * innerWeight, y1 - perp1y * innerWeight);
          verts.push(omx, omy);
        }
      } else {
        verts.push(imx, imy);
        verts.push(omx, omy);
      }
    } else {
      verts.push(x1 - perpX * innerWeight, y1 - perpY * innerWeight);
      verts.push(x1 + perpX * outerWeight, y1 + perpY * outerWeight);
      if (style.join === "round") {
        if (clockwise) {
          indexCount += round(
            x1,
            y1,
            x1 + perpX * outerWeight,
            y1 + perpY * outerWeight,
            x1 + perp1x * outerWeight,
            y1 + perp1y * outerWeight,
            verts,
            true
          ) + 2;
        } else {
          indexCount += round(
            x1,
            y1,
            x1 - perpX * innerWeight,
            y1 - perpY * innerWeight,
            x1 - perp1x * innerWeight,
            y1 - perp1y * innerWeight,
            verts,
            false
          ) + 2;
        }
      } else if (style.join === "miter" && pDist / widthSquared <= miterLimitSquared) {
        if (clockwise) {
          verts.push(omx, omy);
          verts.push(omx, omy);
        } else {
          verts.push(imx, imy);
          verts.push(imx, imy);
        }
        indexCount += 2;
      }
      verts.push(x1 - perp1x * innerWeight, y1 - perp1y * innerWeight);
      verts.push(x1 + perp1x * outerWeight, y1 + perp1y * outerWeight);
      indexCount += 2;
    }
  }
  x0 = points[(length - 2) * 2];
  y0 = points[(length - 2) * 2 + 1];
  x1 = points[(length - 1) * 2];
  y1 = points[(length - 1) * 2 + 1];
  perpX = -(y0 - y1);
  perpY = x0 - x1;
  dist = Math.sqrt(perpX * perpX + perpY * perpY);
  perpX /= dist;
  perpY /= dist;
  perpX *= width;
  perpY *= width;
  verts.push(x1 - perpX * innerWeight, y1 - perpY * innerWeight);
  verts.push(x1 + perpX * outerWeight, y1 + perpY * outerWeight);
  if (!closedShape) {
    if (style.cap === "round") {
      indexCount += round(
        x1 - perpX * (innerWeight - outerWeight) * 0.5,
        y1 - perpY * (innerWeight - outerWeight) * 0.5,
        x1 - perpX * innerWeight,
        y1 - perpY * innerWeight,
        x1 + perpX * outerWeight,
        y1 + perpY * outerWeight,
        verts,
        false
      ) + 2;
    } else if (style.cap === "square") {
      indexCount += square(x1, y1, perpX, perpY, innerWeight, outerWeight, false, verts);
    }
  }
  const eps2 = curveEps * curveEps;
  for (let i = indexStart; i < indexCount + indexStart - 2; ++i) {
    x0 = verts[i * 2];
    y0 = verts[i * 2 + 1];
    x1 = verts[(i + 1) * 2];
    y1 = verts[(i + 1) * 2 + 1];
    x2 = verts[(i + 2) * 2];
    y2 = verts[(i + 2) * 2 + 1];
    if (Math.abs(x0 * (y1 - y2) + x1 * (y2 - y0) + x2 * (y0 - y1)) < eps2) {
      continue;
    }
    indices.push(i, i + 1, i + 2);
  }
}

function triangulateWithHoles(points, holes, vertices, verticesStride, verticesOffset, indices, indicesOffset) {
  const triangles = earcut(points, holes, 2);
  if (!triangles) {
    return;
  }
  for (let i = 0; i < triangles.length; i += 3) {
    indices[indicesOffset++] = triangles[i] + verticesOffset;
    indices[indicesOffset++] = triangles[i + 1] + verticesOffset;
    indices[indicesOffset++] = triangles[i + 2] + verticesOffset;
  }
  let index = verticesOffset * verticesStride;
  for (let i = 0; i < points.length; i += 2) {
    vertices[index] = points[i];
    vertices[index + 1] = points[i + 1];
    index += verticesStride;
  }
}

const emptyArray = [];
const buildPolygon = {
  extension: {
    type: ExtensionType.ShapeBuilder,
    name: "polygon"
  },
  build(shape, points) {
    for (let i = 0; i < shape.points.length; i++) {
      points[i] = shape.points[i];
    }
    return points;
  },
  triangulate(points, vertices, verticesStride, verticesOffset, indices, indicesOffset) {
    triangulateWithHoles(points, emptyArray, vertices, verticesStride, verticesOffset, indices, indicesOffset);
  }
};

const buildRectangle = {
  extension: {
    type: ExtensionType.ShapeBuilder,
    name: "rectangle"
  },
  build(shape, points) {
    const rectData = shape;
    const x = rectData.x;
    const y = rectData.y;
    const width = rectData.width;
    const height = rectData.height;
    if (!(width >= 0 && height >= 0)) {
      return points;
    }
    points[0] = x;
    points[1] = y;
    points[2] = x + width;
    points[3] = y;
    points[4] = x + width;
    points[5] = y + height;
    points[6] = x;
    points[7] = y + height;
    return points;
  },
  triangulate(points, vertices, verticesStride, verticesOffset, indices, indicesOffset) {
    let count = 0;
    verticesOffset *= verticesStride;
    vertices[verticesOffset + count] = points[0];
    vertices[verticesOffset + count + 1] = points[1];
    count += verticesStride;
    vertices[verticesOffset + count] = points[2];
    vertices[verticesOffset + count + 1] = points[3];
    count += verticesStride;
    vertices[verticesOffset + count] = points[6];
    vertices[verticesOffset + count + 1] = points[7];
    count += verticesStride;
    vertices[verticesOffset + count] = points[4];
    vertices[verticesOffset + count + 1] = points[5];
    count += verticesStride;
    const verticesIndex = verticesOffset / verticesStride;
    indices[indicesOffset++] = verticesIndex;
    indices[indicesOffset++] = verticesIndex + 1;
    indices[indicesOffset++] = verticesIndex + 2;
    indices[indicesOffset++] = verticesIndex + 1;
    indices[indicesOffset++] = verticesIndex + 3;
    indices[indicesOffset++] = verticesIndex + 2;
  }
};

const buildTriangle = {
  extension: {
    type: ExtensionType.ShapeBuilder,
    name: "triangle"
  },
  build(shape, points) {
    points[0] = shape.x;
    points[1] = shape.y;
    points[2] = shape.x2;
    points[3] = shape.y2;
    points[4] = shape.x3;
    points[5] = shape.y3;
    return points;
  },
  triangulate(points, vertices, verticesStride, verticesOffset, indices, indicesOffset) {
    let count = 0;
    verticesOffset *= verticesStride;
    vertices[verticesOffset + count] = points[0];
    vertices[verticesOffset + count + 1] = points[1];
    count += verticesStride;
    vertices[verticesOffset + count] = points[2];
    vertices[verticesOffset + count + 1] = points[3];
    count += verticesStride;
    vertices[verticesOffset + count] = points[4];
    vertices[verticesOffset + count + 1] = points[5];
    const verticesIndex = verticesOffset / verticesStride;
    indices[indicesOffset++] = verticesIndex;
    indices[indicesOffset++] = verticesIndex + 1;
    indices[indicesOffset++] = verticesIndex + 2;
  }
};

const shapeBuilders = {};
extensions.handleByMap(ExtensionType.ShapeBuilder, shapeBuilders);
extensions.add(buildRectangle, buildPolygon, buildTriangle, buildCircle, buildEllipse, buildRoundedRectangle);
const tempRect = new Rectangle();
function buildContextBatches(context, gpuContext) {
  const { geometryData, batches } = gpuContext;
  batches.length = 0;
  geometryData.indices.length = 0;
  geometryData.vertices.length = 0;
  geometryData.uvs.length = 0;
  for (let i = 0; i < context.instructions.length; i++) {
    const instruction = context.instructions[i];
    if (instruction.action === "texture") {
      addTextureToGeometryData(instruction.data, batches, geometryData);
    } else if (instruction.action === "fill" || instruction.action === "stroke") {
      const isStroke = instruction.action === "stroke";
      const shapePath = instruction.data.path.shapePath;
      const style = instruction.data.style;
      const hole = instruction.data.hole;
      if (isStroke && hole) {
        addShapePathToGeometryData(hole.shapePath, style, null, true, batches, geometryData);
      }
      addShapePathToGeometryData(shapePath, style, hole, isStroke, batches, geometryData);
    }
  }
}
function addTextureToGeometryData(data, batches, geometryData) {
  const { vertices, uvs, indices } = geometryData;
  const indexOffset = indices.length;
  const vertOffset = vertices.length / 2;
  const points = [];
  const build = shapeBuilders.rectangle;
  const rect = tempRect;
  const texture = data.image;
  rect.x = data.dx;
  rect.y = data.dy;
  rect.width = data.dw;
  rect.height = data.dh;
  const matrix = data.transform;
  build.build(rect, points);
  if (matrix) {
    transformVertices(points, matrix);
  }
  build.triangulate(points, vertices, 2, vertOffset, indices, indexOffset);
  const textureUvs = texture.uvs;
  uvs.push(
    textureUvs.x0,
    textureUvs.y0,
    textureUvs.x1,
    textureUvs.y1,
    textureUvs.x3,
    textureUvs.y3,
    textureUvs.x2,
    textureUvs.y2
  );
  const graphicsBatch = BigPool.get(BatchableGraphics);
  graphicsBatch.indexOffset = indexOffset;
  graphicsBatch.indexSize = indices.length - indexOffset;
  graphicsBatch.attributeOffset = vertOffset;
  graphicsBatch.attributeSize = vertices.length / 2 - vertOffset;
  graphicsBatch.baseColor = data.style;
  graphicsBatch.alpha = data.alpha;
  graphicsBatch.texture = texture;
  graphicsBatch.geometryData = geometryData;
  batches.push(graphicsBatch);
}
function addShapePathToGeometryData(shapePath, style, hole, isStroke, batches, geometryData) {
  const { vertices, uvs, indices } = geometryData;
  const lastIndex = shapePath.shapePrimitives.length - 1;
  shapePath.shapePrimitives.forEach(({ shape, transform: matrix }, i) => {
    const indexOffset = indices.length;
    const vertOffset = vertices.length / 2;
    const points = [];
    const build = shapeBuilders[shape.type];
    build.build(shape, points);
    if (matrix) {
      transformVertices(points, matrix);
    }
    if (!isStroke) {
      if (hole && lastIndex === i) {
        if (lastIndex !== 0) {
          console.warn("[Pixi Graphics] only the last shape have be cut out");
        }
        const holeIndices = [];
        const otherPoints = points.slice();
        const holeArrays = getHoleArrays(hole.shapePath);
        holeArrays.forEach((holePoints) => {
          holeIndices.push(otherPoints.length / 2);
          otherPoints.push(...holePoints);
        });
        triangulateWithHoles(otherPoints, holeIndices, vertices, 2, vertOffset, indices, indexOffset);
      } else {
        build.triangulate(points, vertices, 2, vertOffset, indices, indexOffset);
      }
    } else {
      const close = shape.closePath ?? true;
      const lineStyle = style;
      buildLine(points, lineStyle, false, close, vertices, 2, vertOffset, indices);
    }
    const uvsOffset = uvs.length / 2;
    const texture = style.texture;
    if (texture !== Texture.WHITE) {
      const textureMatrix = style.matrix;
      if (textureMatrix) {
        if (matrix) {
          textureMatrix.append(matrix.clone().invert());
        }
        buildUvs(vertices, 2, vertOffset, uvs, uvsOffset, 2, vertices.length / 2 - vertOffset, textureMatrix);
      }
    } else {
      buildSimpleUvs(uvs, uvsOffset, 2, vertices.length / 2 - vertOffset);
    }
    const graphicsBatch = BigPool.get(BatchableGraphics);
    graphicsBatch.indexOffset = indexOffset;
    graphicsBatch.indexSize = indices.length - indexOffset;
    graphicsBatch.attributeOffset = vertOffset;
    graphicsBatch.attributeSize = vertices.length / 2 - vertOffset;
    graphicsBatch.baseColor = style.color;
    graphicsBatch.alpha = style.alpha;
    graphicsBatch.texture = texture;
    graphicsBatch.geometryData = geometryData;
    batches.push(graphicsBatch);
  });
}
function getHoleArrays(shape) {
  if (!shape)
    return [];
  const holePrimitives = shape.shapePrimitives;
  const holeArrays = [];
  for (let k = 0; k < holePrimitives.length; k++) {
    const holePrimitive = holePrimitives[k].shape;
    const holePoints = [];
    const holeBuilder = shapeBuilders[holePrimitive.type];
    holeBuilder.build(holePrimitive, holePoints);
    holeArrays.push(holePoints);
  }
  return holeArrays;
}

class GpuGraphicsContext {
  constructor() {
    this.batches = [];
    this.geometryData = {
      vertices: [],
      uvs: [],
      indices: []
    };
  }
}
class GraphicsContextRenderData {
  constructor() {
    this.batcher = new DefaultBatcher();
    this.instructions = new InstructionSet();
  }
  init() {
    this.instructions.reset();
  }
  /**
   * @deprecated since version 8.0.0
   * Use `batcher.geometry` instead.
   * @see {Batcher#geometry}
   */
  get geometry() {
    deprecation(v8_3_4, "GraphicsContextRenderData#geometry is deprecated, please use batcher.geometry instead.");
    return this.batcher.geometry;
  }
}
const _GraphicsContextSystem = class _GraphicsContextSystem {
  constructor() {
    // the root context batches, used to either make a batch or geometry
    // all graphics use this as a base
    this._gpuContextHash = {};
    // used for non-batchable graphics
    this._graphicsDataContextHash = /* @__PURE__ */ Object.create(null);
  }
  /**
   * Runner init called, update the default options
   * @ignore
   */
  init(options) {
    _GraphicsContextSystem.defaultOptions.bezierSmoothness = options?.bezierSmoothness ?? _GraphicsContextSystem.defaultOptions.bezierSmoothness;
  }
  getContextRenderData(context) {
    return this._graphicsDataContextHash[context.uid] || this._initContextRenderData(context);
  }
  // Context management functions
  updateGpuContext(context) {
    let gpuContext = this._gpuContextHash[context.uid] || this._initContext(context);
    if (context.dirty) {
      if (gpuContext) {
        this._cleanGraphicsContextData(context);
      } else {
        gpuContext = this._initContext(context);
      }
      buildContextBatches(context, gpuContext);
      const batchMode = context.batchMode;
      if (context.customShader || batchMode === "no-batch") {
        gpuContext.isBatchable = false;
      } else if (batchMode === "auto") {
        gpuContext.isBatchable = gpuContext.geometryData.vertices.length < 400;
      }
      context.dirty = false;
    }
    return gpuContext;
  }
  getGpuContext(context) {
    return this._gpuContextHash[context.uid] || this._initContext(context);
  }
  _initContextRenderData(context) {
    const graphicsData = BigPool.get(GraphicsContextRenderData);
    const { batches, geometryData } = this._gpuContextHash[context.uid];
    const vertexSize = geometryData.vertices.length;
    const indexSize = geometryData.indices.length;
    for (let i = 0; i < batches.length; i++) {
      batches[i].applyTransform = false;
    }
    const batcher = graphicsData.batcher;
    batcher.ensureAttributeBuffer(vertexSize);
    batcher.ensureIndexBuffer(indexSize);
    batcher.begin();
    for (let i = 0; i < batches.length; i++) {
      const batch = batches[i];
      batcher.add(batch);
    }
    batcher.finish(graphicsData.instructions);
    const geometry = batcher.geometry;
    geometry.indexBuffer.setDataWithSize(batcher.indexBuffer, batcher.indexSize, true);
    geometry.buffers[0].setDataWithSize(batcher.attributeBuffer.float32View, batcher.attributeSize, true);
    const drawBatches = batcher.batches;
    for (let i = 0; i < drawBatches.length; i++) {
      const batch = drawBatches[i];
      batch.bindGroup = getTextureBatchBindGroup(batch.textures.textures, batch.textures.count);
    }
    this._graphicsDataContextHash[context.uid] = graphicsData;
    return graphicsData;
  }
  _initContext(context) {
    const gpuContext = new GpuGraphicsContext();
    gpuContext.context = context;
    this._gpuContextHash[context.uid] = gpuContext;
    context.on("destroy", this.onGraphicsContextDestroy, this);
    return this._gpuContextHash[context.uid];
  }
  onGraphicsContextDestroy(context) {
    this._cleanGraphicsContextData(context);
    context.off("destroy", this.onGraphicsContextDestroy, this);
    this._gpuContextHash[context.uid] = null;
  }
  _cleanGraphicsContextData(context) {
    const gpuContext = this._gpuContextHash[context.uid];
    if (!gpuContext.isBatchable) {
      if (this._graphicsDataContextHash[context.uid]) {
        BigPool.return(this.getContextRenderData(context));
        this._graphicsDataContextHash[context.uid] = null;
      }
    }
    if (gpuContext.batches) {
      gpuContext.batches.forEach((batch) => {
        BigPool.return(batch);
      });
    }
  }
  destroy() {
    for (const i in this._gpuContextHash) {
      if (this._gpuContextHash[i]) {
        this.onGraphicsContextDestroy(this._gpuContextHash[i].context);
      }
    }
  }
};
/** @ignore */
_GraphicsContextSystem.extension = {
  type: [
    ExtensionType.WebGLSystem,
    ExtensionType.WebGPUSystem,
    ExtensionType.CanvasSystem
  ],
  name: "graphicsContext"
};
/** The default options for the GraphicsContextSystem. */
_GraphicsContextSystem.defaultOptions = {
  /**
   * A value from 0 to 1 that controls the smoothness of bezier curves (the higher the smoother)
   * @default 0.5
   */
  bezierSmoothness: 0.5
};
let GraphicsContextSystem = _GraphicsContextSystem;

const RECURSION_LIMIT$1 = 8;
const FLT_EPSILON$1 = 11920929e-14;
const PATH_DISTANCE_EPSILON$1 = 1;
function buildAdaptiveBezier(points, sX, sY, cp1x, cp1y, cp2x, cp2y, eX, eY, smoothness) {
  const scale = 1;
  const smoothing = Math.min(
    0.99,
    // a value of 1.0 actually inverts smoothing, so we cap it at 0.99
    Math.max(0, smoothness ?? GraphicsContextSystem.defaultOptions.bezierSmoothness)
  );
  let distanceTolerance = (PATH_DISTANCE_EPSILON$1 - smoothing) / scale;
  distanceTolerance *= distanceTolerance;
  begin$1(sX, sY, cp1x, cp1y, cp2x, cp2y, eX, eY, points, distanceTolerance);
  return points;
}
function begin$1(sX, sY, cp1x, cp1y, cp2x, cp2y, eX, eY, points, distanceTolerance) {
  recursive$1(sX, sY, cp1x, cp1y, cp2x, cp2y, eX, eY, points, distanceTolerance, 0);
  points.push(eX, eY);
}
function recursive$1(x1, y1, x2, y2, x3, y3, x4, y4, points, distanceTolerance, level) {
  if (level > RECURSION_LIMIT$1) {
    return;
  }
  const x12 = (x1 + x2) / 2;
  const y12 = (y1 + y2) / 2;
  const x23 = (x2 + x3) / 2;
  const y23 = (y2 + y3) / 2;
  const x34 = (x3 + x4) / 2;
  const y34 = (y3 + y4) / 2;
  const x123 = (x12 + x23) / 2;
  const y123 = (y12 + y23) / 2;
  const x234 = (x23 + x34) / 2;
  const y234 = (y23 + y34) / 2;
  const x1234 = (x123 + x234) / 2;
  const y1234 = (y123 + y234) / 2;
  if (level > 0) {
    let dx = x4 - x1;
    let dy = y4 - y1;
    const d2 = Math.abs((x2 - x4) * dy - (y2 - y4) * dx);
    const d3 = Math.abs((x3 - x4) * dy - (y3 - y4) * dx);
    if (d2 > FLT_EPSILON$1 && d3 > FLT_EPSILON$1) {
      if ((d2 + d3) * (d2 + d3) <= distanceTolerance * (dx * dx + dy * dy)) {
        {
          points.push(x1234, y1234);
          return;
        }
      }
    } else if (d2 > FLT_EPSILON$1) {
      if (d2 * d2 <= distanceTolerance * (dx * dx + dy * dy)) {
        {
          points.push(x1234, y1234);
          return;
        }
      }
    } else if (d3 > FLT_EPSILON$1) {
      if (d3 * d3 <= distanceTolerance * (dx * dx + dy * dy)) {
        {
          points.push(x1234, y1234);
          return;
        }
      }
    } else {
      dx = x1234 - (x1 + x4) / 2;
      dy = y1234 - (y1 + y4) / 2;
      if (dx * dx + dy * dy <= distanceTolerance) {
        points.push(x1234, y1234);
        return;
      }
    }
  }
  recursive$1(x1, y1, x12, y12, x123, y123, x1234, y1234, points, distanceTolerance, level + 1);
  recursive$1(x1234, y1234, x234, y234, x34, y34, x4, y4, points, distanceTolerance, level + 1);
}

const RECURSION_LIMIT = 8;
const FLT_EPSILON = 11920929e-14;
const PATH_DISTANCE_EPSILON = 1;
function buildAdaptiveQuadratic(points, sX, sY, cp1x, cp1y, eX, eY, smoothness) {
  const scale = 1;
  const smoothing = Math.min(
    0.99,
    // a value of 1.0 actually inverts smoothing, so we cap it at 0.99
    Math.max(0, smoothness ?? GraphicsContextSystem.defaultOptions.bezierSmoothness)
  );
  let distanceTolerance = (PATH_DISTANCE_EPSILON - smoothing) / scale;
  distanceTolerance *= distanceTolerance;
  begin(sX, sY, cp1x, cp1y, eX, eY, points, distanceTolerance);
  return points;
}
function begin(sX, sY, cp1x, cp1y, eX, eY, points, distanceTolerance) {
  recursive(points, sX, sY, cp1x, cp1y, eX, eY, distanceTolerance, 0);
  points.push(eX, eY);
}
function recursive(points, x1, y1, x2, y2, x3, y3, distanceTolerance, level) {
  if (level > RECURSION_LIMIT) {
    return;
  }
  const x12 = (x1 + x2) / 2;
  const y12 = (y1 + y2) / 2;
  const x23 = (x2 + x3) / 2;
  const y23 = (y2 + y3) / 2;
  const x123 = (x12 + x23) / 2;
  const y123 = (y12 + y23) / 2;
  let dx = x3 - x1;
  let dy = y3 - y1;
  const d = Math.abs((x2 - x3) * dy - (y2 - y3) * dx);
  if (d > FLT_EPSILON) {
    if (d * d <= distanceTolerance * (dx * dx + dy * dy)) {
      {
        points.push(x123, y123);
        return;
      }
    }
  } else {
    dx = x123 - (x1 + x3) / 2;
    dy = y123 - (y1 + y3) / 2;
    if (dx * dx + dy * dy <= distanceTolerance) {
      points.push(x123, y123);
      return;
    }
  }
  recursive(points, x1, y1, x12, y12, x123, y123, distanceTolerance, level + 1);
  recursive(points, x123, y123, x23, y23, x3, y3, distanceTolerance, level + 1);
}

function buildArc(points, x, y, radius, start, end, clockwise, steps) {
  let dist = Math.abs(start - end);
  if (!clockwise && start > end) {
    dist = 2 * Math.PI - dist;
  } else if (clockwise && end > start) {
    dist = 2 * Math.PI - dist;
  }
  steps = steps || Math.max(6, Math.floor(6 * Math.pow(radius, 1 / 3) * (dist / Math.PI)));
  steps = Math.max(steps, 3);
  let f = dist / steps;
  let t = start;
  f *= clockwise ? -1 : 1;
  for (let i = 0; i < steps + 1; i++) {
    const cs = Math.cos(t);
    const sn = Math.sin(t);
    const nx = x + cs * radius;
    const ny = y + sn * radius;
    points.push(nx, ny);
    t += f;
  }
}

function buildArcTo(points, x1, y1, x2, y2, radius) {
  const fromX = points[points.length - 2];
  const fromY = points[points.length - 1];
  const a1 = fromY - y1;
  const b1 = fromX - x1;
  const a2 = y2 - y1;
  const b2 = x2 - x1;
  const mm = Math.abs(a1 * b2 - b1 * a2);
  if (mm < 1e-8 || radius === 0) {
    if (points[points.length - 2] !== x1 || points[points.length - 1] !== y1) {
      points.push(x1, y1);
    }
    return;
  }
  const dd = a1 * a1 + b1 * b1;
  const cc = a2 * a2 + b2 * b2;
  const tt = a1 * a2 + b1 * b2;
  const k1 = radius * Math.sqrt(dd) / mm;
  const k2 = radius * Math.sqrt(cc) / mm;
  const j1 = k1 * tt / dd;
  const j2 = k2 * tt / cc;
  const cx = k1 * b2 + k2 * b1;
  const cy = k1 * a2 + k2 * a1;
  const px = b1 * (k2 + j1);
  const py = a1 * (k2 + j1);
  const qx = b2 * (k1 + j2);
  const qy = a2 * (k1 + j2);
  const startAngle = Math.atan2(py - cy, px - cx);
  const endAngle = Math.atan2(qy - cy, qx - cx);
  buildArc(
    points,
    cx + x1,
    cy + y1,
    radius,
    startAngle,
    endAngle,
    b1 * a2 > b2 * a1
  );
}

const TAU = Math.PI * 2;
const out = {
  centerX: 0,
  centerY: 0,
  ang1: 0,
  ang2: 0
};
const mapToEllipse = ({ x, y }, rx, ry, cosPhi, sinPhi, centerX, centerY, out2) => {
  x *= rx;
  y *= ry;
  const xp = cosPhi * x - sinPhi * y;
  const yp = sinPhi * x + cosPhi * y;
  out2.x = xp + centerX;
  out2.y = yp + centerY;
  return out2;
};
function approxUnitArc(ang1, ang2) {
  const a1 = ang2 === -1.5707963267948966 ? -0.551915024494 : 4 / 3 * Math.tan(ang2 / 4);
  const a = ang2 === 1.5707963267948966 ? 0.551915024494 : a1;
  const x1 = Math.cos(ang1);
  const y1 = Math.sin(ang1);
  const x2 = Math.cos(ang1 + ang2);
  const y2 = Math.sin(ang1 + ang2);
  return [
    {
      x: x1 - y1 * a,
      y: y1 + x1 * a
    },
    {
      x: x2 + y2 * a,
      y: y2 - x2 * a
    },
    {
      x: x2,
      y: y2
    }
  ];
}
const vectorAngle = (ux, uy, vx, vy) => {
  const sign = ux * vy - uy * vx < 0 ? -1 : 1;
  let dot = ux * vx + uy * vy;
  if (dot > 1) {
    dot = 1;
  }
  if (dot < -1) {
    dot = -1;
  }
  return sign * Math.acos(dot);
};
const getArcCenter = (px, py, cx, cy, rx, ry, largeArcFlag, sweepFlag, sinPhi, cosPhi, pxp, pyp, out2) => {
  const rxSq = Math.pow(rx, 2);
  const rySq = Math.pow(ry, 2);
  const pxpSq = Math.pow(pxp, 2);
  const pypSq = Math.pow(pyp, 2);
  let radicant = rxSq * rySq - rxSq * pypSq - rySq * pxpSq;
  if (radicant < 0) {
    radicant = 0;
  }
  radicant /= rxSq * pypSq + rySq * pxpSq;
  radicant = Math.sqrt(radicant) * (largeArcFlag === sweepFlag ? -1 : 1);
  const centerXp = radicant * rx / ry * pyp;
  const centerYp = radicant * -ry / rx * pxp;
  const centerX = cosPhi * centerXp - sinPhi * centerYp + (px + cx) / 2;
  const centerY = sinPhi * centerXp + cosPhi * centerYp + (py + cy) / 2;
  const vx1 = (pxp - centerXp) / rx;
  const vy1 = (pyp - centerYp) / ry;
  const vx2 = (-pxp - centerXp) / rx;
  const vy2 = (-pyp - centerYp) / ry;
  const ang1 = vectorAngle(1, 0, vx1, vy1);
  let ang2 = vectorAngle(vx1, vy1, vx2, vy2);
  if (sweepFlag === 0 && ang2 > 0) {
    ang2 -= TAU;
  }
  if (sweepFlag === 1 && ang2 < 0) {
    ang2 += TAU;
  }
  out2.centerX = centerX;
  out2.centerY = centerY;
  out2.ang1 = ang1;
  out2.ang2 = ang2;
};
function buildArcToSvg(points, px, py, cx, cy, rx, ry, xAxisRotation = 0, largeArcFlag = 0, sweepFlag = 0) {
  if (rx === 0 || ry === 0) {
    return;
  }
  const sinPhi = Math.sin(xAxisRotation * TAU / 360);
  const cosPhi = Math.cos(xAxisRotation * TAU / 360);
  const pxp = cosPhi * (px - cx) / 2 + sinPhi * (py - cy) / 2;
  const pyp = -sinPhi * (px - cx) / 2 + cosPhi * (py - cy) / 2;
  if (pxp === 0 && pyp === 0) {
    return;
  }
  rx = Math.abs(rx);
  ry = Math.abs(ry);
  const lambda = Math.pow(pxp, 2) / Math.pow(rx, 2) + Math.pow(pyp, 2) / Math.pow(ry, 2);
  if (lambda > 1) {
    rx *= Math.sqrt(lambda);
    ry *= Math.sqrt(lambda);
  }
  getArcCenter(
    px,
    py,
    cx,
    cy,
    rx,
    ry,
    largeArcFlag,
    sweepFlag,
    sinPhi,
    cosPhi,
    pxp,
    pyp,
    out
  );
  let { ang1, ang2 } = out;
  const { centerX, centerY } = out;
  let ratio = Math.abs(ang2) / (TAU / 4);
  if (Math.abs(1 - ratio) < 1e-7) {
    ratio = 1;
  }
  const segments = Math.max(Math.ceil(ratio), 1);
  ang2 /= segments;
  let lastX = points[points.length - 2];
  let lastY = points[points.length - 1];
  const outCurvePoint = { x: 0, y: 0 };
  for (let i = 0; i < segments; i++) {
    const curve = approxUnitArc(ang1, ang2);
    const { x: x1, y: y1 } = mapToEllipse(curve[0], rx, ry, cosPhi, sinPhi, centerX, centerY, outCurvePoint);
    const { x: x2, y: y2 } = mapToEllipse(curve[1], rx, ry, cosPhi, sinPhi, centerX, centerY, outCurvePoint);
    const { x, y } = mapToEllipse(curve[2], rx, ry, cosPhi, sinPhi, centerX, centerY, outCurvePoint);
    buildAdaptiveBezier(
      points,
      lastX,
      lastY,
      x1,
      y1,
      x2,
      y2,
      x,
      y
    );
    lastX = x;
    lastY = y;
    ang1 += ang2;
  }
}

function roundedShapeArc(g, points, radius) {
  const vecFrom = (p, pp) => {
    const x = pp.x - p.x;
    const y = pp.y - p.y;
    const len = Math.sqrt(x * x + y * y);
    const nx = x / len;
    const ny = y / len;
    return { len, nx, ny };
  };
  const sharpCorner = (i, p) => {
    if (i === 0) {
      g.moveTo(p.x, p.y);
    } else {
      g.lineTo(p.x, p.y);
    }
  };
  let p1 = points[points.length - 1];
  for (let i = 0; i < points.length; i++) {
    const p2 = points[i % points.length];
    const pRadius = p2.radius ?? radius;
    if (pRadius <= 0) {
      sharpCorner(i, p2);
      p1 = p2;
      continue;
    }
    const p3 = points[(i + 1) % points.length];
    const v1 = vecFrom(p2, p1);
    const v2 = vecFrom(p2, p3);
    if (v1.len < 1e-4 || v2.len < 1e-4) {
      sharpCorner(i, p2);
      p1 = p2;
      continue;
    }
    let angle = Math.asin(v1.nx * v2.ny - v1.ny * v2.nx);
    let radDirection = 1;
    let drawDirection = false;
    if (v1.nx * v2.nx - v1.ny * -v2.ny < 0) {
      if (angle < 0) {
        angle = Math.PI + angle;
      } else {
        angle = Math.PI - angle;
        radDirection = -1;
        drawDirection = true;
      }
    } else if (angle > 0) {
      radDirection = -1;
      drawDirection = true;
    }
    const halfAngle = angle / 2;
    let cRadius;
    let lenOut = Math.abs(
      Math.cos(halfAngle) * pRadius / Math.sin(halfAngle)
    );
    if (lenOut > Math.min(v1.len / 2, v2.len / 2)) {
      lenOut = Math.min(v1.len / 2, v2.len / 2);
      cRadius = Math.abs(lenOut * Math.sin(halfAngle) / Math.cos(halfAngle));
    } else {
      cRadius = pRadius;
    }
    const cX = p2.x + v2.nx * lenOut + -v2.ny * cRadius * radDirection;
    const cY = p2.y + v2.ny * lenOut + v2.nx * cRadius * radDirection;
    const startAngle = Math.atan2(v1.ny, v1.nx) + Math.PI / 2 * radDirection;
    const endAngle = Math.atan2(v2.ny, v2.nx) - Math.PI / 2 * radDirection;
    if (i === 0) {
      g.moveTo(
        cX + Math.cos(startAngle) * cRadius,
        cY + Math.sin(startAngle) * cRadius
      );
    }
    g.arc(cX, cY, cRadius, startAngle, endAngle, drawDirection);
    p1 = p2;
  }
}
function roundedShapeQuadraticCurve(g, points, radius, smoothness) {
  const distance = (p1, p2) => Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
  const pointLerp = (p1, p2, t) => ({
    x: p1.x + (p2.x - p1.x) * t,
    y: p1.y + (p2.y - p1.y) * t
  });
  const numPoints = points.length;
  for (let i = 0; i < numPoints; i++) {
    const thisPoint = points[(i + 1) % numPoints];
    const pRadius = thisPoint.radius ?? radius;
    if (pRadius <= 0) {
      if (i === 0) {
        g.moveTo(thisPoint.x, thisPoint.y);
      } else {
        g.lineTo(thisPoint.x, thisPoint.y);
      }
      continue;
    }
    const lastPoint = points[i];
    const nextPoint = points[(i + 2) % numPoints];
    const lastEdgeLength = distance(lastPoint, thisPoint);
    let start;
    if (lastEdgeLength < 1e-4) {
      start = thisPoint;
    } else {
      const lastOffsetDistance = Math.min(lastEdgeLength / 2, pRadius);
      start = pointLerp(
        thisPoint,
        lastPoint,
        lastOffsetDistance / lastEdgeLength
      );
    }
    const nextEdgeLength = distance(nextPoint, thisPoint);
    let end;
    if (nextEdgeLength < 1e-4) {
      end = thisPoint;
    } else {
      const nextOffsetDistance = Math.min(nextEdgeLength / 2, pRadius);
      end = pointLerp(
        thisPoint,
        nextPoint,
        nextOffsetDistance / nextEdgeLength
      );
    }
    if (i === 0) {
      g.moveTo(start.x, start.y);
    } else {
      g.lineTo(start.x, start.y);
    }
    g.quadraticCurveTo(thisPoint.x, thisPoint.y, end.x, end.y, smoothness);
  }
}

const tempRectangle = new Rectangle();
class ShapePath {
  constructor(graphicsPath2D) {
    /** The list of shape primitives that make up the path. */
    this.shapePrimitives = [];
    this._currentPoly = null;
    this._bounds = new Bounds();
    this._graphicsPath2D = graphicsPath2D;
  }
  /**
   * Sets the starting point for a new sub-path. Any subsequent drawing commands are considered part of this path.
   * @param x - The x-coordinate for the starting point.
   * @param y - The y-coordinate for the starting point.
   * @returns The instance of the current object for chaining.
   */
  moveTo(x, y) {
    this.startPoly(x, y);
    return this;
  }
  /**
   * Connects the current point to a new point with a straight line. This method updates the current path.
   * @param x - The x-coordinate of the new point to connect to.
   * @param y - The y-coordinate of the new point to connect to.
   * @returns The instance of the current object for chaining.
   */
  lineTo(x, y) {
    this._ensurePoly();
    const points = this._currentPoly.points;
    const fromX = points[points.length - 2];
    const fromY = points[points.length - 1];
    if (fromX !== x || fromY !== y) {
      points.push(x, y);
    }
    return this;
  }
  /**
   * Adds an arc to the path. The arc is centered at (x, y)
   *  position with radius `radius` starting at `startAngle` and ending at `endAngle`.
   * @param x - The x-coordinate of the arc's center.
   * @param y - The y-coordinate of the arc's center.
   * @param radius - The radius of the arc.
   * @param startAngle - The starting angle of the arc, in radians.
   * @param endAngle - The ending angle of the arc, in radians.
   * @param counterclockwise - Specifies whether the arc should be drawn in the anticlockwise direction. False by default.
   * @returns The instance of the current object for chaining.
   */
  arc(x, y, radius, startAngle, endAngle, counterclockwise) {
    this._ensurePoly(false);
    const points = this._currentPoly.points;
    buildArc(points, x, y, radius, startAngle, endAngle, counterclockwise);
    return this;
  }
  /**
   * Adds an arc to the path with the arc tangent to the line joining two specified points.
   * The arc radius is specified by `radius`.
   * @param x1 - The x-coordinate of the first point.
   * @param y1 - The y-coordinate of the first point.
   * @param x2 - The x-coordinate of the second point.
   * @param y2 - The y-coordinate of the second point.
   * @param radius - The radius of the arc.
   * @returns The instance of the current object for chaining.
   */
  arcTo(x1, y1, x2, y2, radius) {
    this._ensurePoly();
    const points = this._currentPoly.points;
    buildArcTo(points, x1, y1, x2, y2, radius);
    return this;
  }
  /**
   * Adds an SVG-style arc to the path, allowing for elliptical arcs based on the SVG spec.
   * @param rx - The x-radius of the ellipse.
   * @param ry - The y-radius of the ellipse.
   * @param xAxisRotation - The rotation of the ellipse's x-axis relative
   * to the x-axis of the coordinate system, in degrees.
   * @param largeArcFlag - Determines if the arc should be greater than or less than 180 degrees.
   * @param sweepFlag - Determines if the arc should be swept in a positive angle direction.
   * @param x - The x-coordinate of the arc's end point.
   * @param y - The y-coordinate of the arc's end point.
   * @returns The instance of the current object for chaining.
   */
  arcToSvg(rx, ry, xAxisRotation, largeArcFlag, sweepFlag, x, y) {
    const points = this._currentPoly.points;
    buildArcToSvg(
      points,
      this._currentPoly.lastX,
      this._currentPoly.lastY,
      x,
      y,
      rx,
      ry,
      xAxisRotation,
      largeArcFlag,
      sweepFlag
    );
    return this;
  }
  /**
   * Adds a cubic Bezier curve to the path.
   * It requires three points: the first two are control points and the third one is the end point.
   * The starting point is the last point in the current path.
   * @param cp1x - The x-coordinate of the first control point.
   * @param cp1y - The y-coordinate of the first control point.
   * @param cp2x - The x-coordinate of the second control point.
   * @param cp2y - The y-coordinate of the second control point.
   * @param x - The x-coordinate of the end point.
   * @param y - The y-coordinate of the end point.
   * @param smoothness - Optional parameter to adjust the smoothness of the curve.
   * @returns The instance of the current object for chaining.
   */
  bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y, smoothness) {
    this._ensurePoly();
    const currentPoly = this._currentPoly;
    buildAdaptiveBezier(
      this._currentPoly.points,
      currentPoly.lastX,
      currentPoly.lastY,
      cp1x,
      cp1y,
      cp2x,
      cp2y,
      x,
      y,
      smoothness
    );
    return this;
  }
  /**
   * Adds a quadratic curve to the path. It requires two points: the control point and the end point.
   * The starting point is the last point in the current path.
   * @param cp1x - The x-coordinate of the control point.
   * @param cp1y - The y-coordinate of the control point.
   * @param x - The x-coordinate of the end point.
   * @param y - The y-coordinate of the end point.
   * @param smoothing - Optional parameter to adjust the smoothness of the curve.
   * @returns The instance of the current object for chaining.
   */
  quadraticCurveTo(cp1x, cp1y, x, y, smoothing) {
    this._ensurePoly();
    const currentPoly = this._currentPoly;
    buildAdaptiveQuadratic(
      this._currentPoly.points,
      currentPoly.lastX,
      currentPoly.lastY,
      cp1x,
      cp1y,
      x,
      y,
      smoothing
    );
    return this;
  }
  /**
   * Closes the current path by drawing a straight line back to the start.
   * If the shape is already closed or there are no points in the path, this method does nothing.
   * @returns The instance of the current object for chaining.
   */
  closePath() {
    this.endPoly(true);
    return this;
  }
  /**
   * Adds another path to the current path. This method allows for the combination of multiple paths into one.
   * @param path - The `GraphicsPath` object representing the path to add.
   * @param transform - An optional `Matrix` object to apply a transformation to the path before adding it.
   * @returns The instance of the current object for chaining.
   */
  addPath(path, transform) {
    this.endPoly();
    if (transform && !transform.isIdentity()) {
      path = path.clone(true);
      path.transform(transform);
    }
    for (let i = 0; i < path.instructions.length; i++) {
      const instruction = path.instructions[i];
      this[instruction.action](...instruction.data);
    }
    return this;
  }
  /**
   * Finalizes the drawing of the current path. Optionally, it can close the path.
   * @param closePath - A boolean indicating whether to close the path after finishing. False by default.
   */
  finish(closePath = false) {
    this.endPoly(closePath);
  }
  /**
   * Draws a rectangle shape. This method adds a new rectangle path to the current drawing.
   * @param x - The x-coordinate of the top-left corner of the rectangle.
   * @param y - The y-coordinate of the top-left corner of the rectangle.
   * @param w - The width of the rectangle.
   * @param h - The height of the rectangle.
   * @param transform - An optional `Matrix` object to apply a transformation to the rectangle.
   * @returns The instance of the current object for chaining.
   */
  rect(x, y, w, h, transform) {
    this.drawShape(new Rectangle(x, y, w, h), transform);
    return this;
  }
  /**
   * Draws a circle shape. This method adds a new circle path to the current drawing.
   * @param x - The x-coordinate of the center of the circle.
   * @param y - The y-coordinate of the center of the circle.
   * @param radius - The radius of the circle.
   * @param transform - An optional `Matrix` object to apply a transformation to the circle.
   * @returns The instance of the current object for chaining.
   */
  circle(x, y, radius, transform) {
    this.drawShape(new Circle(x, y, radius), transform);
    return this;
  }
  /**
   * Draws a polygon shape. This method allows for the creation of complex polygons by specifying a sequence of points.
   * @param points - An array of numbers, or or an array of PointData objects eg [{x,y}, {x,y}, {x,y}]
   * representing the x and y coordinates of the polygon's vertices, in sequence.
   * @param close - A boolean indicating whether to close the polygon path. True by default.
   * @param transform - An optional `Matrix` object to apply a transformation to the polygon.
   * @returns The instance of the current object for chaining.
   */
  poly(points, close, transform) {
    const polygon = new Polygon(points);
    polygon.closePath = close;
    this.drawShape(polygon, transform);
    return this;
  }
  /**
   * Draws a regular polygon with a specified number of sides. All sides and angles are equal.
   * @param x - The x-coordinate of the center of the polygon.
   * @param y - The y-coordinate of the center of the polygon.
   * @param radius - The radius of the circumscribed circle of the polygon.
   * @param sides - The number of sides of the polygon. Must be 3 or more.
   * @param rotation - The rotation angle of the polygon, in radians. Zero by default.
   * @param transform - An optional `Matrix` object to apply a transformation to the polygon.
   * @returns The instance of the current object for chaining.
   */
  regularPoly(x, y, radius, sides, rotation = 0, transform) {
    sides = Math.max(sides | 0, 3);
    const startAngle = -1 * Math.PI / 2 + rotation;
    const delta = Math.PI * 2 / sides;
    const polygon = [];
    for (let i = 0; i < sides; i++) {
      const angle = i * delta + startAngle;
      polygon.push(
        x + radius * Math.cos(angle),
        y + radius * Math.sin(angle)
      );
    }
    this.poly(polygon, true, transform);
    return this;
  }
  /**
   * Draws a polygon with rounded corners.
   * Similar to `regularPoly` but with the ability to round the corners of the polygon.
   * @param x - The x-coordinate of the center of the polygon.
   * @param y - The y-coordinate of the center of the polygon.
   * @param radius - The radius of the circumscribed circle of the polygon.
   * @param sides - The number of sides of the polygon. Must be 3 or more.
   * @param corner - The radius of the rounding of the corners.
   * @param rotation - The rotation angle of the polygon, in radians. Zero by default.
   * @param smoothness - Optional parameter to adjust the smoothness of the rounding.
   * @returns The instance of the current object for chaining.
   */
  roundPoly(x, y, radius, sides, corner, rotation = 0, smoothness) {
    sides = Math.max(sides | 0, 3);
    if (corner <= 0) {
      return this.regularPoly(x, y, radius, sides, rotation);
    }
    const sideLength = radius * Math.sin(Math.PI / sides) - 1e-3;
    corner = Math.min(corner, sideLength);
    const startAngle = -1 * Math.PI / 2 + rotation;
    const delta = Math.PI * 2 / sides;
    const internalAngle = (sides - 2) * Math.PI / sides / 2;
    for (let i = 0; i < sides; i++) {
      const angle = i * delta + startAngle;
      const x0 = x + radius * Math.cos(angle);
      const y0 = y + radius * Math.sin(angle);
      const a1 = angle + Math.PI + internalAngle;
      const a2 = angle - Math.PI - internalAngle;
      const x1 = x0 + corner * Math.cos(a1);
      const y1 = y0 + corner * Math.sin(a1);
      const x3 = x0 + corner * Math.cos(a2);
      const y3 = y0 + corner * Math.sin(a2);
      if (i === 0) {
        this.moveTo(x1, y1);
      } else {
        this.lineTo(x1, y1);
      }
      this.quadraticCurveTo(x0, y0, x3, y3, smoothness);
    }
    return this.closePath();
  }
  /**
   * Draws a shape with rounded corners. This function supports custom radius for each corner of the shape.
   * Optionally, corners can be rounded using a quadratic curve instead of an arc, providing a different aesthetic.
   * @param points - An array of `RoundedPoint` representing the corners of the shape to draw.
   * A minimum of 3 points is required.
   * @param radius - The default radius for the corners.
   * This radius is applied to all corners unless overridden in `points`.
   * @param useQuadratic - If set to true, rounded corners are drawn using a quadraticCurve
   *  method instead of an arc method. Defaults to false.
   * @param smoothness - Specifies the smoothness of the curve when `useQuadratic` is true.
   * Higher values make the curve smoother.
   * @returns The instance of the current object for chaining.
   */
  roundShape(points, radius, useQuadratic = false, smoothness) {
    if (points.length < 3) {
      return this;
    }
    if (useQuadratic) {
      roundedShapeQuadraticCurve(this, points, radius, smoothness);
    } else {
      roundedShapeArc(this, points, radius);
    }
    return this.closePath();
  }
  /**
   * Draw Rectangle with fillet corners. This is much like rounded rectangle
   * however it support negative numbers as well for the corner radius.
   * @param x - Upper left corner of rect
   * @param y - Upper right corner of rect
   * @param width - Width of rect
   * @param height - Height of rect
   * @param fillet - accept negative or positive values
   */
  filletRect(x, y, width, height, fillet) {
    if (fillet === 0) {
      return this.rect(x, y, width, height);
    }
    const maxFillet = Math.min(width, height) / 2;
    const inset = Math.min(maxFillet, Math.max(-maxFillet, fillet));
    const right = x + width;
    const bottom = y + height;
    const dir = inset < 0 ? -inset : 0;
    const size = Math.abs(inset);
    return this.moveTo(x, y + size).arcTo(x + dir, y + dir, x + size, y, size).lineTo(right - size, y).arcTo(right - dir, y + dir, right, y + size, size).lineTo(right, bottom - size).arcTo(right - dir, bottom - dir, x + width - size, bottom, size).lineTo(x + size, bottom).arcTo(x + dir, bottom - dir, x, bottom - size, size).closePath();
  }
  /**
   * Draw Rectangle with chamfer corners. These are angled corners.
   * @param x - Upper left corner of rect
   * @param y - Upper right corner of rect
   * @param width - Width of rect
   * @param height - Height of rect
   * @param chamfer - non-zero real number, size of corner cutout
   * @param transform
   */
  chamferRect(x, y, width, height, chamfer, transform) {
    if (chamfer <= 0) {
      return this.rect(x, y, width, height);
    }
    const inset = Math.min(chamfer, Math.min(width, height) / 2);
    const right = x + width;
    const bottom = y + height;
    const points = [
      x + inset,
      y,
      right - inset,
      y,
      right,
      y + inset,
      right,
      bottom - inset,
      right - inset,
      bottom,
      x + inset,
      bottom,
      x,
      bottom - inset,
      x,
      y + inset
    ];
    for (let i = points.length - 1; i >= 2; i -= 2) {
      if (points[i] === points[i - 2] && points[i - 1] === points[i - 3]) {
        points.splice(i - 1, 2);
      }
    }
    return this.poly(points, true, transform);
  }
  /**
   * Draws an ellipse at the specified location and with the given x and y radii.
   * An optional transformation can be applied, allowing for rotation, scaling, and translation.
   * @param x - The x-coordinate of the center of the ellipse.
   * @param y - The y-coordinate of the center of the ellipse.
   * @param radiusX - The horizontal radius of the ellipse.
   * @param radiusY - The vertical radius of the ellipse.
   * @param transform - An optional `Matrix` object to apply a transformation to the ellipse. This can include rotations.
   * @returns The instance of the current object for chaining.
   */
  ellipse(x, y, radiusX, radiusY, transform) {
    this.drawShape(new Ellipse(x, y, radiusX, radiusY), transform);
    return this;
  }
  /**
   * Draws a rectangle with rounded corners.
   * The corner radius can be specified to determine how rounded the corners should be.
   * An optional transformation can be applied, which allows for rotation, scaling, and translation of the rectangle.
   * @param x - The x-coordinate of the top-left corner of the rectangle.
   * @param y - The y-coordinate of the top-left corner of the rectangle.
   * @param w - The width of the rectangle.
   * @param h - The height of the rectangle.
   * @param radius - The radius of the rectangle's corners. If not specified, corners will be sharp.
   * @param transform - An optional `Matrix` object to apply a transformation to the rectangle.
   * @returns The instance of the current object for chaining.
   */
  roundRect(x, y, w, h, radius, transform) {
    this.drawShape(new RoundedRectangle(x, y, w, h, radius), transform);
    return this;
  }
  /**
   * Draws a given shape on the canvas.
   * This is a generic method that can draw any type of shape specified by the `ShapePrimitive` parameter.
   * An optional transformation matrix can be applied to the shape, allowing for complex transformations.
   * @param shape - The shape to draw, defined as a `ShapePrimitive` object.
   * @param matrix - An optional `Matrix` for transforming the shape. This can include rotations,
   * scaling, and translations.
   * @returns The instance of the current object for chaining.
   */
  drawShape(shape, matrix) {
    this.endPoly();
    this.shapePrimitives.push({ shape, transform: matrix });
    return this;
  }
  /**
   * Starts a new polygon path from the specified starting point.
   * This method initializes a new polygon or ends the current one if it exists.
   * @param x - The x-coordinate of the starting point of the new polygon.
   * @param y - The y-coordinate of the starting point of the new polygon.
   * @returns The instance of the current object for chaining.
   */
  startPoly(x, y) {
    let currentPoly = this._currentPoly;
    if (currentPoly) {
      this.endPoly();
    }
    currentPoly = new Polygon();
    currentPoly.points.push(x, y);
    this._currentPoly = currentPoly;
    return this;
  }
  /**
   * Ends the current polygon path. If `closePath` is set to true,
   * the path is closed by connecting the last point to the first one.
   * This method finalizes the current polygon and prepares it for drawing or adding to the shape primitives.
   * @param closePath - A boolean indicating whether to close the polygon by connecting the last point
   *  back to the starting point. False by default.
   * @returns The instance of the current object for chaining.
   */
  endPoly(closePath = false) {
    const shape = this._currentPoly;
    if (shape && shape.points.length > 2) {
      shape.closePath = closePath;
      this.shapePrimitives.push({ shape });
    }
    this._currentPoly = null;
    return this;
  }
  _ensurePoly(start = true) {
    if (this._currentPoly)
      return;
    this._currentPoly = new Polygon();
    if (start) {
      const lastShape = this.shapePrimitives[this.shapePrimitives.length - 1];
      if (lastShape) {
        let lx = lastShape.shape.x;
        let ly = lastShape.shape.y;
        if (lastShape.transform && !lastShape.transform.isIdentity()) {
          const t = lastShape.transform;
          const tempX = lx;
          lx = t.a * lx + t.c * ly + t.tx;
          ly = t.b * tempX + t.d * ly + t.ty;
        }
        this._currentPoly.points.push(lx, ly);
      } else {
        this._currentPoly.points.push(0, 0);
      }
    }
  }
  /** Builds the path. */
  buildPath() {
    const path = this._graphicsPath2D;
    this.shapePrimitives.length = 0;
    this._currentPoly = null;
    for (let i = 0; i < path.instructions.length; i++) {
      const instruction = path.instructions[i];
      this[instruction.action](...instruction.data);
    }
    this.finish();
  }
  /** Gets the bounds of the path. */
  get bounds() {
    const bounds = this._bounds;
    bounds.clear();
    const shapePrimitives = this.shapePrimitives;
    for (let i = 0; i < shapePrimitives.length; i++) {
      const shapePrimitive = shapePrimitives[i];
      const boundsRect = shapePrimitive.shape.getBounds(tempRectangle);
      if (shapePrimitive.transform) {
        bounds.addRect(boundsRect, shapePrimitive.transform);
      } else {
        bounds.addRect(boundsRect);
      }
    }
    return bounds;
  }
}

class GraphicsPath {
  /**
   * Creates a `GraphicsPath` instance optionally from an SVG path string or an array of `PathInstruction`.
   * @param instructions - An SVG path string or an array of `PathInstruction` objects.
   */
  constructor(instructions) {
    this.instructions = [];
    /** unique id for this graphics path */
    this.uid = uid("graphicsPath");
    this._dirty = true;
    if (typeof instructions === "string") {
      SVGToGraphicsPath(instructions, this);
    } else {
      this.instructions = instructions?.slice() ?? [];
    }
  }
  /**
   * Provides access to the internal shape path, ensuring it is up-to-date with the current instructions.
   * @returns The `ShapePath` instance associated with this `GraphicsPath`.
   */
  get shapePath() {
    if (!this._shapePath) {
      this._shapePath = new ShapePath(this);
    }
    if (this._dirty) {
      this._dirty = false;
      this._shapePath.buildPath();
    }
    return this._shapePath;
  }
  /**
   * Adds another `GraphicsPath` to this path, optionally applying a transformation.
   * @param path - The `GraphicsPath` to add.
   * @param transform - An optional transformation to apply to the added path.
   * @returns The instance of the current object for chaining.
   */
  addPath(path, transform) {
    path = path.clone();
    this.instructions.push({ action: "addPath", data: [path, transform] });
    this._dirty = true;
    return this;
  }
  arc(...args) {
    this.instructions.push({ action: "arc", data: args });
    this._dirty = true;
    return this;
  }
  arcTo(...args) {
    this.instructions.push({ action: "arcTo", data: args });
    this._dirty = true;
    return this;
  }
  arcToSvg(...args) {
    this.instructions.push({ action: "arcToSvg", data: args });
    this._dirty = true;
    return this;
  }
  bezierCurveTo(...args) {
    this.instructions.push({ action: "bezierCurveTo", data: args });
    this._dirty = true;
    return this;
  }
  /**
   * Adds a cubic Bezier curve to the path.
   * It requires two points: the second control point and the end point. The first control point is assumed to be
   * The starting point is the last point in the current path.
   * @param cp2x - The x-coordinate of the second control point.
   * @param cp2y - The y-coordinate of the second control point.
   * @param x - The x-coordinate of the end point.
   * @param y - The y-coordinate of the end point.
   * @param smoothness - Optional parameter to adjust the smoothness of the curve.
   * @returns The instance of the current object for chaining.
   */
  bezierCurveToShort(cp2x, cp2y, x, y, smoothness) {
    const last = this.instructions[this.instructions.length - 1];
    const lastPoint = this.getLastPoint(Point.shared);
    let cp1x = 0;
    let cp1y = 0;
    if (!last || last.action !== "bezierCurveTo") {
      cp1x = lastPoint.x;
      cp1y = lastPoint.y;
    } else {
      cp1x = last.data[2];
      cp1y = last.data[3];
      const currentX = lastPoint.x;
      const currentY = lastPoint.y;
      cp1x = currentX + (currentX - cp1x);
      cp1y = currentY + (currentY - cp1y);
    }
    this.instructions.push({ action: "bezierCurveTo", data: [cp1x, cp1y, cp2x, cp2y, x, y, smoothness] });
    this._dirty = true;
    return this;
  }
  /**
   * Closes the current path by drawing a straight line back to the start.
   * If the shape is already closed or there are no points in the path, this method does nothing.
   * @returns The instance of the current object for chaining.
   */
  closePath() {
    this.instructions.push({ action: "closePath", data: [] });
    this._dirty = true;
    return this;
  }
  ellipse(...args) {
    this.instructions.push({ action: "ellipse", data: args });
    this._dirty = true;
    return this;
  }
  lineTo(...args) {
    this.instructions.push({ action: "lineTo", data: args });
    this._dirty = true;
    return this;
  }
  moveTo(...args) {
    this.instructions.push({ action: "moveTo", data: args });
    return this;
  }
  quadraticCurveTo(...args) {
    this.instructions.push({ action: "quadraticCurveTo", data: args });
    this._dirty = true;
    return this;
  }
  /**
   * Adds a quadratic curve to the path. It uses the previous point as the control point.
   * @param x - The x-coordinate of the end point.
   * @param y - The y-coordinate of the end point.
   * @param smoothness - Optional parameter to adjust the smoothness of the curve.
   * @returns The instance of the current object for chaining.
   */
  quadraticCurveToShort(x, y, smoothness) {
    const last = this.instructions[this.instructions.length - 1];
    const lastPoint = this.getLastPoint(Point.shared);
    let cpx1 = 0;
    let cpy1 = 0;
    if (!last || last.action !== "quadraticCurveTo") {
      cpx1 = lastPoint.x;
      cpy1 = lastPoint.y;
    } else {
      cpx1 = last.data[0];
      cpy1 = last.data[1];
      const currentX = lastPoint.x;
      const currentY = lastPoint.y;
      cpx1 = currentX + (currentX - cpx1);
      cpy1 = currentY + (currentY - cpy1);
    }
    this.instructions.push({ action: "quadraticCurveTo", data: [cpx1, cpy1, x, y, smoothness] });
    this._dirty = true;
    return this;
  }
  /**
   * Draws a rectangle shape. This method adds a new rectangle path to the current drawing.
   * @param x - The x-coordinate of the top-left corner of the rectangle.
   * @param y - The y-coordinate of the top-left corner of the rectangle.
   * @param w - The width of the rectangle.
   * @param h - The height of the rectangle.
   * @param transform - An optional `Matrix` object to apply a transformation to the rectangle.
   * @returns The instance of the current object for chaining.
   */
  rect(x, y, w, h, transform) {
    this.instructions.push({ action: "rect", data: [x, y, w, h, transform] });
    this._dirty = true;
    return this;
  }
  /**
   * Draws a circle shape. This method adds a new circle path to the current drawing.
   * @param x - The x-coordinate of the center of the circle.
   * @param y - The y-coordinate of the center of the circle.
   * @param radius - The radius of the circle.
   * @param transform - An optional `Matrix` object to apply a transformation to the circle.
   * @returns The instance of the current object for chaining.
   */
  circle(x, y, radius, transform) {
    this.instructions.push({ action: "circle", data: [x, y, radius, transform] });
    this._dirty = true;
    return this;
  }
  roundRect(...args) {
    this.instructions.push({ action: "roundRect", data: args });
    this._dirty = true;
    return this;
  }
  poly(...args) {
    this.instructions.push({ action: "poly", data: args });
    this._dirty = true;
    return this;
  }
  regularPoly(...args) {
    this.instructions.push({ action: "regularPoly", data: args });
    this._dirty = true;
    return this;
  }
  roundPoly(...args) {
    this.instructions.push({ action: "roundPoly", data: args });
    this._dirty = true;
    return this;
  }
  roundShape(...args) {
    this.instructions.push({ action: "roundShape", data: args });
    this._dirty = true;
    return this;
  }
  filletRect(...args) {
    this.instructions.push({ action: "filletRect", data: args });
    this._dirty = true;
    return this;
  }
  chamferRect(...args) {
    this.instructions.push({ action: "chamferRect", data: args });
    this._dirty = true;
    return this;
  }
  /**
   * Draws a star shape centered at a specified location. This method allows for the creation
   *  of stars with a variable number of points, outer radius, optional inner radius, and rotation.
   * The star is drawn as a closed polygon with alternating outer and inner vertices to create the star's points.
   * An optional transformation can be applied to scale, rotate, or translate the star as needed.
   * @param x - The x-coordinate of the center of the star.
   * @param y - The y-coordinate of the center of the star.
   * @param points - The number of points of the star.
   * @param radius - The outer radius of the star (distance from the center to the outer points).
   * @param innerRadius - Optional. The inner radius of the star
   * (distance from the center to the inner points between the outer points).
   * If not provided, defaults to half of the `radius`.
   * @param rotation - Optional. The rotation of the star in radians, where 0 is aligned with the y-axis.
   * Defaults to 0, meaning one point is directly upward.
   * @param transform - An optional `Matrix` object to apply a transformation to the star.
   * This can include rotations, scaling, and translations.
   * @returns The instance of the current object for chaining further drawing commands.
   */
  // eslint-disable-next-line max-len
  star(x, y, points, radius, innerRadius, rotation, transform) {
    innerRadius = innerRadius || radius / 2;
    const startAngle = -1 * Math.PI / 2 + rotation;
    const len = points * 2;
    const delta = Math.PI * 2 / len;
    const polygon = [];
    for (let i = 0; i < len; i++) {
      const r = i % 2 ? innerRadius : radius;
      const angle = i * delta + startAngle;
      polygon.push(
        x + r * Math.cos(angle),
        y + r * Math.sin(angle)
      );
    }
    this.poly(polygon, true, transform);
    return this;
  }
  /**
   * Creates a copy of the current `GraphicsPath` instance. This method supports both shallow and deep cloning.
   * A shallow clone copies the reference of the instructions array, while a deep clone creates a new array and
   * copies each instruction individually, ensuring that modifications to the instructions of the cloned `GraphicsPath`
   * do not affect the original `GraphicsPath` and vice versa.
   * @param deep - A boolean flag indicating whether the clone should be deep.
   * @returns A new `GraphicsPath` instance that is a clone of the current instance.
   */
  clone(deep = false) {
    const newGraphicsPath2D = new GraphicsPath();
    if (!deep) {
      newGraphicsPath2D.instructions = this.instructions.slice();
    } else {
      for (let i = 0; i < this.instructions.length; i++) {
        const instruction = this.instructions[i];
        newGraphicsPath2D.instructions.push({ action: instruction.action, data: instruction.data.slice() });
      }
    }
    return newGraphicsPath2D;
  }
  clear() {
    this.instructions.length = 0;
    this._dirty = true;
    return this;
  }
  /**
   * Applies a transformation matrix to all drawing instructions within the `GraphicsPath`.
   * This method enables the modification of the path's geometry according to the provided
   * transformation matrix, which can include translations, rotations, scaling, and skewing.
   *
   * Each drawing instruction in the path is updated to reflect the transformation,
   * ensuring the visual representation of the path is consistent with the applied matrix.
   *
   * Note: The transformation is applied directly to the coordinates and control points of the drawing instructions,
   * not to the path as a whole. This means the transformation's effects are baked into the individual instructions,
   * allowing for fine-grained control over the path's appearance.
   * @param matrix - A `Matrix` object representing the transformation to apply.
   * @returns The instance of the current object for chaining further operations.
   */
  transform(matrix) {
    if (matrix.isIdentity())
      return this;
    const a = matrix.a;
    const b = matrix.b;
    const c = matrix.c;
    const d = matrix.d;
    const tx = matrix.tx;
    const ty = matrix.ty;
    let x = 0;
    let y = 0;
    let cpx1 = 0;
    let cpy1 = 0;
    let cpx2 = 0;
    let cpy2 = 0;
    let rx = 0;
    let ry = 0;
    for (let i = 0; i < this.instructions.length; i++) {
      const instruction = this.instructions[i];
      const data = instruction.data;
      switch (instruction.action) {
        case "moveTo":
        case "lineTo":
          x = data[0];
          y = data[1];
          data[0] = a * x + c * y + tx;
          data[1] = b * x + d * y + ty;
          break;
        case "bezierCurveTo":
          cpx1 = data[0];
          cpy1 = data[1];
          cpx2 = data[2];
          cpy2 = data[3];
          x = data[4];
          y = data[5];
          data[0] = a * cpx1 + c * cpy1 + tx;
          data[1] = b * cpx1 + d * cpy1 + ty;
          data[2] = a * cpx2 + c * cpy2 + tx;
          data[3] = b * cpx2 + d * cpy2 + ty;
          data[4] = a * x + c * y + tx;
          data[5] = b * x + d * y + ty;
          break;
        case "quadraticCurveTo":
          cpx1 = data[0];
          cpy1 = data[1];
          x = data[2];
          y = data[3];
          data[0] = a * cpx1 + c * cpy1 + tx;
          data[1] = b * cpx1 + d * cpy1 + ty;
          data[2] = a * x + c * y + tx;
          data[3] = b * x + d * y + ty;
          break;
        case "arcToSvg":
          x = data[5];
          y = data[6];
          rx = data[0];
          ry = data[1];
          data[0] = a * rx + c * ry;
          data[1] = b * rx + d * ry;
          data[5] = a * x + c * y + tx;
          data[6] = b * x + d * y + ty;
          break;
        case "circle":
          data[4] = adjustTransform(data[3], matrix);
          break;
        case "rect":
          data[4] = adjustTransform(data[4], matrix);
          break;
        case "ellipse":
          data[8] = adjustTransform(data[8], matrix);
          break;
        case "roundRect":
          data[5] = adjustTransform(data[5], matrix);
          break;
        case "addPath":
          data[0].transform(matrix);
          break;
        case "poly":
          data[2] = adjustTransform(data[2], matrix);
          break;
        default:
          warn("unknown transform action", instruction.action);
          break;
      }
    }
    this._dirty = true;
    return this;
  }
  get bounds() {
    return this.shapePath.bounds;
  }
  /**
   * Retrieves the last point from the current drawing instructions in the `GraphicsPath`.
   * This method is useful for operations that depend on the path's current endpoint,
   * such as connecting subsequent shapes or paths. It supports various drawing instructions,
   * ensuring the last point's position is accurately determined regardless of the path's complexity.
   *
   * If the last instruction is a `closePath`, the method iterates backward through the instructions
   *  until it finds an actionable instruction that defines a point (e.g., `moveTo`, `lineTo`,
   * `quadraticCurveTo`, etc.). For compound paths added via `addPath`, it recursively retrieves
   * the last point from the nested path.
   * @param out - A `Point` object where the last point's coordinates will be stored.
   * This object is modified directly to contain the result.
   * @returns The `Point` object containing the last point's coordinates.
   */
  getLastPoint(out) {
    let index = this.instructions.length - 1;
    let lastInstruction = this.instructions[index];
    if (!lastInstruction) {
      out.x = 0;
      out.y = 0;
      return out;
    }
    while (lastInstruction.action === "closePath") {
      index--;
      if (index < 0) {
        out.x = 0;
        out.y = 0;
        return out;
      }
      lastInstruction = this.instructions[index];
    }
    switch (lastInstruction.action) {
      case "moveTo":
      case "lineTo":
        out.x = lastInstruction.data[0];
        out.y = lastInstruction.data[1];
        break;
      case "quadraticCurveTo":
        out.x = lastInstruction.data[2];
        out.y = lastInstruction.data[3];
        break;
      case "bezierCurveTo":
        out.x = lastInstruction.data[4];
        out.y = lastInstruction.data[5];
        break;
      case "arc":
      case "arcToSvg":
        out.x = lastInstruction.data[5];
        out.y = lastInstruction.data[6];
        break;
      case "addPath":
        lastInstruction.data[0].getLastPoint(out);
        break;
    }
    return out;
  }
}
function adjustTransform(currentMatrix, transform) {
  if (currentMatrix) {
    return currentMatrix.prepend(transform);
  }
  return transform.clone();
}

function SVGParser(svg, graphicsContext) {
  if (typeof svg === "string") {
    const div = document.createElement("div");
    div.innerHTML = svg.trim();
    svg = div.querySelector("svg");
  }
  const session = {
    context: graphicsContext,
    path: new GraphicsPath()
  };
  renderChildren(svg, session, null, null);
  return graphicsContext;
}
function renderChildren(svg, session, fillStyle, strokeStyle) {
  const children = svg.children;
  const { fillStyle: f1, strokeStyle: s1 } = parseStyle(svg);
  if (f1 && fillStyle) {
    fillStyle = { ...fillStyle, ...f1 };
  } else if (f1) {
    fillStyle = f1;
  }
  if (s1 && strokeStyle) {
    strokeStyle = { ...strokeStyle, ...s1 };
  } else if (s1) {
    strokeStyle = s1;
  }
  session.context.fillStyle = fillStyle;
  session.context.strokeStyle = strokeStyle;
  let x;
  let y;
  let x1;
  let y1;
  let x2;
  let y2;
  let cx;
  let cy;
  let r;
  let rx;
  let ry;
  let points;
  let pointsString;
  let d;
  let graphicsPath;
  let width;
  let height;
  switch (svg.nodeName.toLowerCase()) {
    case "path":
      d = svg.getAttribute("d");
      graphicsPath = new GraphicsPath(d);
      session.context.path(graphicsPath);
      if (fillStyle)
        session.context.fill();
      if (strokeStyle)
        session.context.stroke();
      break;
    case "circle":
      cx = parseFloatAttribute(svg, "cx", 0);
      cy = parseFloatAttribute(svg, "cy", 0);
      r = parseFloatAttribute(svg, "r", 0);
      session.context.ellipse(cx, cy, r, r);
      if (fillStyle)
        session.context.fill();
      if (strokeStyle)
        session.context.stroke();
      break;
    case "rect":
      x = parseFloatAttribute(svg, "x", 0);
      y = parseFloatAttribute(svg, "y", 0);
      width = parseFloatAttribute(svg, "width", 0);
      height = parseFloatAttribute(svg, "height", 0);
      rx = parseFloatAttribute(svg, "rx", 0);
      ry = parseFloatAttribute(svg, "ry", 0);
      if (rx || ry) {
        session.context.roundRect(x, y, width, height, rx || ry);
      } else {
        session.context.rect(x, y, width, height);
      }
      if (fillStyle)
        session.context.fill();
      if (strokeStyle)
        session.context.stroke();
      break;
    case "ellipse":
      cx = parseFloatAttribute(svg, "cx", 0);
      cy = parseFloatAttribute(svg, "cy", 0);
      rx = parseFloatAttribute(svg, "rx", 0);
      ry = parseFloatAttribute(svg, "ry", 0);
      session.context.beginPath();
      session.context.ellipse(cx, cy, rx, ry);
      if (fillStyle)
        session.context.fill();
      if (strokeStyle)
        session.context.stroke();
      break;
    case "line":
      x1 = parseFloatAttribute(svg, "x1", 0);
      y1 = parseFloatAttribute(svg, "y1", 0);
      x2 = parseFloatAttribute(svg, "x2", 0);
      y2 = parseFloatAttribute(svg, "y2", 0);
      session.context.beginPath();
      session.context.moveTo(x1, y1);
      session.context.lineTo(x2, y2);
      if (strokeStyle)
        session.context.stroke();
      break;
    case "polygon":
      pointsString = svg.getAttribute("points");
      points = pointsString.match(/\d+/g).map((n) => parseInt(n, 10));
      session.context.poly(points, true);
      if (fillStyle)
        session.context.fill();
      if (strokeStyle)
        session.context.stroke();
      break;
    case "polyline":
      pointsString = svg.getAttribute("points");
      points = pointsString.match(/\d+/g).map((n) => parseInt(n, 10));
      session.context.poly(points, false);
      if (strokeStyle)
        session.context.stroke();
      break;
    case "g":
    case "svg":
      break;
    default: {
      console.info(`[SVG parser] <${svg.nodeName}> elements unsupported`);
      break;
    }
  }
  for (let i = 0; i < children.length; i++) {
    renderChildren(children[i], session, fillStyle, strokeStyle);
  }
}
function parseFloatAttribute(svg, id, defaultValue) {
  const value = svg.getAttribute(id);
  return value ? Number(value) : defaultValue;
}
function parseStyle(svg) {
  const style = svg.getAttribute("style");
  const strokeStyle = {};
  const fillStyle = {};
  let useFill = false;
  let useStroke = false;
  if (style) {
    const styleParts = style.split(";");
    for (let i = 0; i < styleParts.length; i++) {
      const stylePart = styleParts[i];
      const [key, value] = stylePart.split(":");
      switch (key) {
        case "stroke":
          if (value !== "none") {
            strokeStyle.color = Color.shared.setValue(value).toNumber();
            useStroke = true;
          }
          break;
        case "stroke-width":
          strokeStyle.width = Number(value);
          break;
        case "fill":
          if (value !== "none") {
            useFill = true;
            fillStyle.color = Color.shared.setValue(value).toNumber();
          }
          break;
        case "fill-opacity":
          fillStyle.alpha = Number(value);
          break;
        case "stroke-opacity":
          strokeStyle.alpha = Number(value);
          break;
        case "opacity":
          fillStyle.alpha = Number(value);
          strokeStyle.alpha = Number(value);
          break;
      }
    }
  } else {
    const stroke = svg.getAttribute("stroke");
    if (stroke && stroke !== "none") {
      useStroke = true;
      strokeStyle.color = Color.shared.setValue(stroke).toNumber();
      strokeStyle.width = parseFloatAttribute(svg, "stroke-width", 1);
    }
    const fill = svg.getAttribute("fill");
    if (fill && fill !== "none") {
      useFill = true;
      fillStyle.color = Color.shared.setValue(fill).toNumber();
    }
  }
  return {
    strokeStyle: useStroke ? strokeStyle : null,
    fillStyle: useFill ? fillStyle : null
  };
}

function isColorLike(value) {
  return Color.isColorLike(value);
}
function isFillPattern(value) {
  return value instanceof FillPattern;
}
function isFillGradient(value) {
  return value instanceof FillGradient;
}
function handleColorLike(fill, value, defaultStyle) {
  const temp = Color.shared.setValue(value ?? 0);
  fill.color = temp.toNumber();
  fill.alpha = temp.alpha === 1 ? defaultStyle.alpha : temp.alpha;
  fill.texture = Texture.WHITE;
  return { ...defaultStyle, ...fill };
}
function handleFillPattern(fill, value, defaultStyle) {
  fill.fill = value;
  fill.color = 16777215;
  fill.texture = value.texture;
  fill.matrix = value.transform;
  return { ...defaultStyle, ...fill };
}
function handleFillGradient(fill, value, defaultStyle) {
  value.buildLinearGradient();
  fill.fill = value;
  fill.color = 16777215;
  fill.texture = value.texture;
  fill.matrix = value.transform;
  return { ...defaultStyle, ...fill };
}
function handleFillObject(value, defaultStyle) {
  const style = { ...defaultStyle, ...value };
  if (style.texture) {
    if (style.texture !== Texture.WHITE) {
      const m = style.matrix?.invert() || new Matrix();
      m.translate(style.texture.frame.x, style.texture.frame.y);
      m.scale(1 / style.texture.source.width, 1 / style.texture.source.height);
      style.matrix = m;
    }
    const sourceStyle = style.texture.source.style;
    if (sourceStyle.addressMode === "clamp-to-edge") {
      sourceStyle.addressMode = "repeat";
      sourceStyle.update();
    }
  }
  const color = Color.shared.setValue(style.color);
  style.alpha *= color.alpha;
  style.color = color.toNumber();
  style.matrix = style.matrix ? style.matrix.clone() : null;
  return style;
}
function toFillStyle(value, defaultStyle) {
  if (value === void 0 || value === null) {
    return null;
  }
  const fill = {};
  const objectStyle = value;
  if (isColorLike(value)) {
    return handleColorLike(fill, value, defaultStyle);
  } else if (isFillPattern(value)) {
    return handleFillPattern(fill, value, defaultStyle);
  } else if (isFillGradient(value)) {
    return handleFillGradient(fill, value, defaultStyle);
  } else if (objectStyle.fill && isFillPattern(objectStyle.fill)) {
    return handleFillPattern(objectStyle, objectStyle.fill, defaultStyle);
  } else if (objectStyle.fill && isFillGradient(objectStyle.fill)) {
    return handleFillGradient(objectStyle, objectStyle.fill, defaultStyle);
  }
  return handleFillObject(objectStyle, defaultStyle);
}
function toStrokeStyle(value, defaultStyle) {
  const { width, alignment, miterLimit, cap, join, ...rest } = defaultStyle;
  const fill = toFillStyle(value, rest);
  if (!fill) {
    return null;
  }
  return {
    width,
    alignment,
    miterLimit,
    cap,
    join,
    ...fill
  };
}

const tmpPoint = new Point();
const tempMatrix$1 = new Matrix();
const _GraphicsContext = class _GraphicsContext extends EventEmitter {
  constructor() {
    super(...arguments);
    /** unique id for this graphics context */
    this.uid = uid("graphicsContext");
    this.dirty = true;
    this.batchMode = "auto";
    this.instructions = [];
    this._activePath = new GraphicsPath();
    this._transform = new Matrix();
    this._fillStyle = { ..._GraphicsContext.defaultFillStyle };
    this._strokeStyle = { ..._GraphicsContext.defaultStrokeStyle };
    this._stateStack = [];
    this._tick = 0;
    this._bounds = new Bounds();
    this._boundsDirty = true;
  }
  /**
   * Creates a new GraphicsContext object that is a clone of this instance, copying all properties,
   * including the current drawing state, transformations, styles, and instructions.
   * @returns A new GraphicsContext instance with the same properties and state as this one.
   */
  clone() {
    const clone = new _GraphicsContext();
    clone.batchMode = this.batchMode;
    clone.instructions = this.instructions.slice();
    clone._activePath = this._activePath.clone();
    clone._transform = this._transform.clone();
    clone._fillStyle = { ...this._fillStyle };
    clone._strokeStyle = { ...this._strokeStyle };
    clone._stateStack = this._stateStack.slice();
    clone._bounds = this._bounds.clone();
    clone._boundsDirty = true;
    return clone;
  }
  /**
   * The current fill style of the graphics context. This can be a color, gradient, pattern, or a more complex style defined by a FillStyle object.
   */
  get fillStyle() {
    return this._fillStyle;
  }
  set fillStyle(value) {
    this._fillStyle = toFillStyle(value, _GraphicsContext.defaultFillStyle);
  }
  /**
   * The current stroke style of the graphics context. Similar to fill styles, stroke styles can encompass colors, gradients, patterns, or more detailed configurations via a StrokeStyle object.
   */
  get strokeStyle() {
    return this._strokeStyle;
  }
  set strokeStyle(value) {
    this._strokeStyle = toStrokeStyle(value, _GraphicsContext.defaultStrokeStyle);
  }
  /**
   * Sets the current fill style of the graphics context. The fill style can be a color, gradient,
   * pattern, or a more complex style defined by a FillStyle object.
   * @param style - The fill style to apply. This can be a simple color, a gradient or pattern object,
   *                or a FillStyle or ConvertedFillStyle object.
   * @returns The instance of the current GraphicsContext for method chaining.
   */
  setFillStyle(style) {
    this._fillStyle = toFillStyle(style, _GraphicsContext.defaultFillStyle);
    return this;
  }
  /**
   * Sets the current stroke style of the graphics context. Similar to fill styles, stroke styles can
   * encompass colors, gradients, patterns, or more detailed configurations via a StrokeStyle object.
   * @param style - The stroke style to apply. Can be defined as a color, a gradient or pattern,
   *                or a StrokeStyle or ConvertedStrokeStyle object.
   * @returns The instance of the current GraphicsContext for method chaining.
   */
  setStrokeStyle(style) {
    this._strokeStyle = toFillStyle(style, _GraphicsContext.defaultStrokeStyle);
    return this;
  }
  texture(texture, tint, dx, dy, dw, dh) {
    this.instructions.push({
      action: "texture",
      data: {
        image: texture,
        dx: dx || 0,
        dy: dy || 0,
        dw: dw || texture.frame.width,
        dh: dh || texture.frame.height,
        transform: this._transform.clone(),
        alpha: this._fillStyle.alpha,
        style: tint ? Color.shared.setValue(tint).toNumber() : 16777215
      }
    });
    this.onUpdate();
    return this;
  }
  /**
   * Resets the current path. Any previous path and its commands are discarded and a new path is
   * started. This is typically called before beginning a new shape or series of drawing commands.
   * @returns The instance of the current GraphicsContext for method chaining.
   */
  beginPath() {
    this._activePath = new GraphicsPath();
    return this;
  }
  fill(style, alpha) {
    let path;
    const lastInstruction = this.instructions[this.instructions.length - 1];
    if (this._tick === 0 && lastInstruction && lastInstruction.action === "stroke") {
      path = lastInstruction.data.path;
    } else {
      path = this._activePath.clone();
    }
    if (!path)
      return this;
    if (style != null) {
      if (alpha !== void 0 && typeof style === "number") {
        deprecation(v8_0_0, "GraphicsContext.fill(color, alpha) is deprecated, use GraphicsContext.fill({ color, alpha }) instead");
        style = { color: style, alpha };
      }
      this._fillStyle = toFillStyle(style, _GraphicsContext.defaultFillStyle);
    }
    this.instructions.push({
      action: "fill",
      // TODO copy fill style!
      data: { style: this.fillStyle, path }
    });
    this.onUpdate();
    this._initNextPathLocation();
    this._tick = 0;
    return this;
  }
  _initNextPathLocation() {
    const { x, y } = this._activePath.getLastPoint(Point.shared);
    this._activePath.clear();
    this._activePath.moveTo(x, y);
  }
  /**
   * Strokes the current path with the current stroke style. This method can take an optional
   * FillInput parameter to define the stroke's appearance, including its color, width, and other properties.
   * @param style - (Optional) The stroke style to apply. Can be defined as a simple color or a more complex style object. If omitted, uses the current stroke style.
   * @returns The instance of the current GraphicsContext for method chaining.
   */
  stroke(style) {
    let path;
    const lastInstruction = this.instructions[this.instructions.length - 1];
    if (this._tick === 0 && lastInstruction && lastInstruction.action === "fill") {
      path = lastInstruction.data.path;
    } else {
      path = this._activePath.clone();
    }
    if (!path)
      return this;
    if (style != null) {
      this._strokeStyle = toStrokeStyle(style, _GraphicsContext.defaultStrokeStyle);
    }
    this.instructions.push({
      action: "stroke",
      // TODO copy fill style!
      data: { style: this.strokeStyle, path }
    });
    this.onUpdate();
    this._initNextPathLocation();
    this._tick = 0;
    return this;
  }
  /**
   * Applies a cutout to the last drawn shape. This is used to create holes or complex shapes by
   * subtracting a path from the previously drawn path. If a hole is not completely in a shape, it will
   * fail to cut correctly!
   * @returns The instance of the current GraphicsContext for method chaining.
   */
  cut() {
    for (let i = 0; i < 2; i++) {
      const lastInstruction = this.instructions[this.instructions.length - 1 - i];
      const holePath = this._activePath.clone();
      if (lastInstruction) {
        if (lastInstruction.action === "stroke" || lastInstruction.action === "fill") {
          if (lastInstruction.data.hole) {
            lastInstruction.data.hole.addPath(holePath);
          } else {
            lastInstruction.data.hole = holePath;
            break;
          }
        }
      }
    }
    this._initNextPathLocation();
    return this;
  }
  /**
   * Adds an arc to the current path, which is centered at (x, y) with the specified radius,
   * starting and ending angles, and direction.
   * @param x - The x-coordinate of the arc's center.
   * @param y - The y-coordinate of the arc's center.
   * @param radius - The arc's radius.
   * @param startAngle - The starting angle, in radians.
   * @param endAngle - The ending angle, in radians.
   * @param counterclockwise - (Optional) Specifies whether the arc is drawn counterclockwise (true) or clockwise (false). Defaults to false.
   * @returns The instance of the current GraphicsContext for method chaining.
   */
  arc(x, y, radius, startAngle, endAngle, counterclockwise) {
    this._tick++;
    const t = this._transform;
    this._activePath.arc(
      t.a * x + t.c * y + t.tx,
      t.b * x + t.d * y + t.ty,
      radius,
      startAngle,
      endAngle,
      counterclockwise
    );
    return this;
  }
  /**
   * Adds an arc to the current path with the given control points and radius, connected to the previous point
   * by a straight line if necessary.
   * @param x1 - The x-coordinate of the first control point.
   * @param y1 - The y-coordinate of the first control point.
   * @param x2 - The x-coordinate of the second control point.
   * @param y2 - The y-coordinate of the second control point.
   * @param radius - The arc's radius.
   * @returns The instance of the current GraphicsContext for method chaining.
   */
  arcTo(x1, y1, x2, y2, radius) {
    this._tick++;
    const t = this._transform;
    this._activePath.arcTo(
      t.a * x1 + t.c * y1 + t.tx,
      t.b * x1 + t.d * y1 + t.ty,
      t.a * x2 + t.c * y2 + t.tx,
      t.b * x2 + t.d * y2 + t.ty,
      radius
    );
    return this;
  }
  /**
   * Adds an SVG-style arc to the path, allowing for elliptical arcs based on the SVG spec.
   * @param rx - The x-radius of the ellipse.
   * @param ry - The y-radius of the ellipse.
   * @param xAxisRotation - The rotation of the ellipse's x-axis relative
   * to the x-axis of the coordinate system, in degrees.
   * @param largeArcFlag - Determines if the arc should be greater than or less than 180 degrees.
   * @param sweepFlag - Determines if the arc should be swept in a positive angle direction.
   * @param x - The x-coordinate of the arc's end point.
   * @param y - The y-coordinate of the arc's end point.
   * @returns The instance of the current object for chaining.
   */
  arcToSvg(rx, ry, xAxisRotation, largeArcFlag, sweepFlag, x, y) {
    this._tick++;
    const t = this._transform;
    this._activePath.arcToSvg(
      rx,
      ry,
      xAxisRotation,
      // should we rotate this with transform??
      largeArcFlag,
      sweepFlag,
      t.a * x + t.c * y + t.tx,
      t.b * x + t.d * y + t.ty
    );
    return this;
  }
  /**
   * Adds a cubic Bezier curve to the path.
   * It requires three points: the first two are control points and the third one is the end point.
   * The starting point is the last point in the current path.
   * @param cp1x - The x-coordinate of the first control point.
   * @param cp1y - The y-coordinate of the first control point.
   * @param cp2x - The x-coordinate of the second control point.
   * @param cp2y - The y-coordinate of the second control point.
   * @param x - The x-coordinate of the end point.
   * @param y - The y-coordinate of the end point.
   * @param smoothness - Optional parameter to adjust the smoothness of the curve.
   * @returns The instance of the current object for chaining.
   */
  bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y, smoothness) {
    this._tick++;
    const t = this._transform;
    this._activePath.bezierCurveTo(
      t.a * cp1x + t.c * cp1y + t.tx,
      t.b * cp1x + t.d * cp1y + t.ty,
      t.a * cp2x + t.c * cp2y + t.tx,
      t.b * cp2x + t.d * cp2y + t.ty,
      t.a * x + t.c * y + t.tx,
      t.b * x + t.d * y + t.ty,
      smoothness
    );
    return this;
  }
  /**
   * Closes the current path by drawing a straight line back to the start.
   * If the shape is already closed or there are no points in the path, this method does nothing.
   * @returns The instance of the current object for chaining.
   */
  closePath() {
    this._tick++;
    this._activePath?.closePath();
    return this;
  }
  /**
   * Draws an ellipse at the specified location and with the given x and y radii.
   * An optional transformation can be applied, allowing for rotation, scaling, and translation.
   * @param x - The x-coordinate of the center of the ellipse.
   * @param y - The y-coordinate of the center of the ellipse.
   * @param radiusX - The horizontal radius of the ellipse.
   * @param radiusY - The vertical radius of the ellipse.
   * @returns The instance of the current object for chaining.
   */
  ellipse(x, y, radiusX, radiusY) {
    this._tick++;
    this._activePath.ellipse(x, y, radiusX, radiusY, this._transform.clone());
    return this;
  }
  /**
   * Draws a circle shape. This method adds a new circle path to the current drawing.
   * @param x - The x-coordinate of the center of the circle.
   * @param y - The y-coordinate of the center of the circle.
   * @param radius - The radius of the circle.
   * @returns The instance of the current object for chaining.
   */
  circle(x, y, radius) {
    this._tick++;
    this._activePath.circle(x, y, radius, this._transform.clone());
    return this;
  }
  /**
   * Adds another `GraphicsPath` to this path, optionally applying a transformation.
   * @param path - The `GraphicsPath` to add.
   * @returns The instance of the current object for chaining.
   */
  path(path) {
    this._tick++;
    this._activePath.addPath(path, this._transform.clone());
    return this;
  }
  /**
   * Connects the current point to a new point with a straight line. This method updates the current path.
   * @param x - The x-coordinate of the new point to connect to.
   * @param y - The y-coordinate of the new point to connect to.
   * @returns The instance of the current object for chaining.
   */
  lineTo(x, y) {
    this._tick++;
    const t = this._transform;
    this._activePath.lineTo(
      t.a * x + t.c * y + t.tx,
      t.b * x + t.d * y + t.ty
    );
    return this;
  }
  /**
   * Sets the starting point for a new sub-path. Any subsequent drawing commands are considered part of this path.
   * @param x - The x-coordinate for the starting point.
   * @param y - The y-coordinate for the starting point.
   * @returns The instance of the current object for chaining.
   */
  moveTo(x, y) {
    this._tick++;
    const t = this._transform;
    const instructions = this._activePath.instructions;
    const transformedX = t.a * x + t.c * y + t.tx;
    const transformedY = t.b * x + t.d * y + t.ty;
    if (instructions.length === 1 && instructions[0].action === "moveTo") {
      instructions[0].data[0] = transformedX;
      instructions[0].data[1] = transformedY;
      return this;
    }
    this._activePath.moveTo(
      transformedX,
      transformedY
    );
    return this;
  }
  /**
   * Adds a quadratic curve to the path. It requires two points: the control point and the end point.
   * The starting point is the last point in the current path.
   * @param cpx - The x-coordinate of the control point.
   * @param cpy - The y-coordinate of the control point.
   * @param x - The x-coordinate of the end point.
   * @param y - The y-coordinate of the end point.
   * @param smoothness - Optional parameter to adjust the smoothness of the curve.
   * @returns The instance of the current object for chaining.
   */
  quadraticCurveTo(cpx, cpy, x, y, smoothness) {
    this._tick++;
    const t = this._transform;
    this._activePath.quadraticCurveTo(
      t.a * cpx + t.c * cpy + t.tx,
      t.b * cpx + t.d * cpy + t.ty,
      t.a * x + t.c * y + t.tx,
      t.b * x + t.d * y + t.ty,
      smoothness
    );
    return this;
  }
  /**
   * Draws a rectangle shape. This method adds a new rectangle path to the current drawing.
   * @param x - The x-coordinate of the top-left corner of the rectangle.
   * @param y - The y-coordinate of the top-left corner of the rectangle.
   * @param w - The width of the rectangle.
   * @param h - The height of the rectangle.
   * @returns The instance of the current object for chaining.
   */
  rect(x, y, w, h) {
    this._tick++;
    this._activePath.rect(x, y, w, h, this._transform.clone());
    return this;
  }
  /**
   * Draws a rectangle with rounded corners.
   * The corner radius can be specified to determine how rounded the corners should be.
   * An optional transformation can be applied, which allows for rotation, scaling, and translation of the rectangle.
   * @param x - The x-coordinate of the top-left corner of the rectangle.
   * @param y - The y-coordinate of the top-left corner of the rectangle.
   * @param w - The width of the rectangle.
   * @param h - The height of the rectangle.
   * @param radius - The radius of the rectangle's corners. If not specified, corners will be sharp.
   * @returns The instance of the current object for chaining.
   */
  roundRect(x, y, w, h, radius) {
    this._tick++;
    this._activePath.roundRect(x, y, w, h, radius, this._transform.clone());
    return this;
  }
  /**
   * Draws a polygon shape by specifying a sequence of points. This method allows for the creation of complex polygons,
   * which can be both open and closed. An optional transformation can be applied, enabling the polygon to be scaled,
   * rotated, or translated as needed.
   * @param points - An array of numbers, or an array of PointData objects eg [{x,y}, {x,y}, {x,y}]
   * representing the x and y coordinates, of the polygon's vertices, in sequence.
   * @param close - A boolean indicating whether to close the polygon path. True by default.
   */
  poly(points, close) {
    this._tick++;
    this._activePath.poly(points, close, this._transform.clone());
    return this;
  }
  /**
   * Draws a regular polygon with a specified number of sides. All sides and angles are equal.
   * @param x - The x-coordinate of the center of the polygon.
   * @param y - The y-coordinate of the center of the polygon.
   * @param radius - The radius of the circumscribed circle of the polygon.
   * @param sides - The number of sides of the polygon. Must be 3 or more.
   * @param rotation - The rotation angle of the polygon, in radians. Zero by default.
   * @param transform - An optional `Matrix` object to apply a transformation to the polygon.
   * @returns The instance of the current object for chaining.
   */
  regularPoly(x, y, radius, sides, rotation = 0, transform) {
    this._tick++;
    this._activePath.regularPoly(x, y, radius, sides, rotation, transform);
    return this;
  }
  /**
   * Draws a polygon with rounded corners.
   * Similar to `regularPoly` but with the ability to round the corners of the polygon.
   * @param x - The x-coordinate of the center of the polygon.
   * @param y - The y-coordinate of the center of the polygon.
   * @param radius - The radius of the circumscribed circle of the polygon.
   * @param sides - The number of sides of the polygon. Must be 3 or more.
   * @param corner - The radius of the rounding of the corners.
   * @param rotation - The rotation angle of the polygon, in radians. Zero by default.
   * @returns The instance of the current object for chaining.
   */
  roundPoly(x, y, radius, sides, corner, rotation) {
    this._tick++;
    this._activePath.roundPoly(x, y, radius, sides, corner, rotation);
    return this;
  }
  /**
   * Draws a shape with rounded corners. This function supports custom radius for each corner of the shape.
   * Optionally, corners can be rounded using a quadratic curve instead of an arc, providing a different aesthetic.
   * @param points - An array of `RoundedPoint` representing the corners of the shape to draw.
   * A minimum of 3 points is required.
   * @param radius - The default radius for the corners.
   * This radius is applied to all corners unless overridden in `points`.
   * @param useQuadratic - If set to true, rounded corners are drawn using a quadraticCurve
   *  method instead of an arc method. Defaults to false.
   * @param smoothness - Specifies the smoothness of the curve when `useQuadratic` is true.
   * Higher values make the curve smoother.
   * @returns The instance of the current object for chaining.
   */
  roundShape(points, radius, useQuadratic, smoothness) {
    this._tick++;
    this._activePath.roundShape(points, radius, useQuadratic, smoothness);
    return this;
  }
  /**
   * Draw Rectangle with fillet corners. This is much like rounded rectangle
   * however it support negative numbers as well for the corner radius.
   * @param x - Upper left corner of rect
   * @param y - Upper right corner of rect
   * @param width - Width of rect
   * @param height - Height of rect
   * @param fillet - accept negative or positive values
   */
  filletRect(x, y, width, height, fillet) {
    this._tick++;
    this._activePath.filletRect(x, y, width, height, fillet);
    return this;
  }
  /**
   * Draw Rectangle with chamfer corners. These are angled corners.
   * @param x - Upper left corner of rect
   * @param y - Upper right corner of rect
   * @param width - Width of rect
   * @param height - Height of rect
   * @param chamfer - non-zero real number, size of corner cutout
   * @param transform
   */
  chamferRect(x, y, width, height, chamfer, transform) {
    this._tick++;
    this._activePath.chamferRect(x, y, width, height, chamfer, transform);
    return this;
  }
  /**
   * Draws a star shape centered at a specified location. This method allows for the creation
   *  of stars with a variable number of points, outer radius, optional inner radius, and rotation.
   * The star is drawn as a closed polygon with alternating outer and inner vertices to create the star's points.
   * An optional transformation can be applied to scale, rotate, or translate the star as needed.
   * @param x - The x-coordinate of the center of the star.
   * @param y - The y-coordinate of the center of the star.
   * @param points - The number of points of the star.
   * @param radius - The outer radius of the star (distance from the center to the outer points).
   * @param innerRadius - Optional. The inner radius of the star
   * (distance from the center to the inner points between the outer points).
   * If not provided, defaults to half of the `radius`.
   * @param rotation - Optional. The rotation of the star in radians, where 0 is aligned with the y-axis.
   * Defaults to 0, meaning one point is directly upward.
   * @returns The instance of the current object for chaining further drawing commands.
   */
  star(x, y, points, radius, innerRadius = 0, rotation = 0) {
    this._tick++;
    this._activePath.star(x, y, points, radius, innerRadius, rotation, this._transform.clone());
    return this;
  }
  /**
   * Parses and renders an SVG string into the graphics context. This allows for complex shapes and paths
   * defined in SVG format to be drawn within the graphics context.
   * @param svg - The SVG string to be parsed and rendered.
   */
  svg(svg) {
    this._tick++;
    SVGParser(svg, this);
    return this;
  }
  /**
   * Restores the most recently saved graphics state by popping the top of the graphics state stack.
   * This includes transformations, fill styles, and stroke styles.
   */
  restore() {
    const state = this._stateStack.pop();
    if (state) {
      this._transform = state.transform;
      this._fillStyle = state.fillStyle;
      this._strokeStyle = state.strokeStyle;
    }
    return this;
  }
  /** Saves the current graphics state, including transformations, fill styles, and stroke styles, onto a stack. */
  save() {
    this._stateStack.push({
      transform: this._transform.clone(),
      fillStyle: { ...this._fillStyle },
      strokeStyle: { ...this._strokeStyle }
    });
    return this;
  }
  /**
   * Returns the current transformation matrix of the graphics context.
   * @returns The current transformation matrix.
   */
  getTransform() {
    return this._transform;
  }
  /**
   * Resets the current transformation matrix to the identity matrix, effectively removing any transformations (rotation, scaling, translation) previously applied.
   * @returns The instance of the current GraphicsContext for method chaining.
   */
  resetTransform() {
    this._transform.identity();
    return this;
  }
  /**
   * Applies a rotation transformation to the graphics context around the current origin.
   * @param angle - The angle of rotation in radians.
   * @returns The instance of the current GraphicsContext for method chaining.
   */
  rotate(angle) {
    this._transform.rotate(angle);
    return this;
  }
  /**
   * Applies a scaling transformation to the graphics context, scaling drawings by x horizontally and by y vertically.
   * @param x - The scale factor in the horizontal direction.
   * @param y - (Optional) The scale factor in the vertical direction. If not specified, the x value is used for both directions.
   * @returns The instance of the current GraphicsContext for method chaining.
   */
  scale(x, y = x) {
    this._transform.scale(x, y);
    return this;
  }
  setTransform(a, b, c, d, dx, dy) {
    if (a instanceof Matrix) {
      this._transform.set(a.a, a.b, a.c, a.d, a.tx, a.ty);
      return this;
    }
    this._transform.set(a, b, c, d, dx, dy);
    return this;
  }
  transform(a, b, c, d, dx, dy) {
    if (a instanceof Matrix) {
      this._transform.append(a);
      return this;
    }
    tempMatrix$1.set(a, b, c, d, dx, dy);
    this._transform.append(tempMatrix$1);
    return this;
  }
  /**
   * Applies a translation transformation to the graphics context, moving the origin by the specified amounts.
   * @param x - The amount to translate in the horizontal direction.
   * @param y - (Optional) The amount to translate in the vertical direction. If not specified, the x value is used for both directions.
   * @returns The instance of the current GraphicsContext for method chaining.
   */
  translate(x, y = x) {
    this._transform.translate(x, y);
    return this;
  }
  /**
   * Clears all drawing commands from the graphics context, effectively resetting it. This includes clearing the path,
   * and optionally resetting transformations to the identity matrix.
   * @returns The instance of the current GraphicsContext for method chaining.
   */
  clear() {
    this._activePath.clear();
    this.instructions.length = 0;
    this.resetTransform();
    this.onUpdate();
    return this;
  }
  onUpdate() {
    if (this.dirty)
      return;
    this.emit("update", this, 16);
    this.dirty = true;
    this._boundsDirty = true;
  }
  /** The bounds of the graphic shape. */
  get bounds() {
    if (!this._boundsDirty)
      return this._bounds;
    const bounds = this._bounds;
    bounds.clear();
    for (let i = 0; i < this.instructions.length; i++) {
      const instruction = this.instructions[i];
      const action = instruction.action;
      if (action === "fill") {
        const data = instruction.data;
        bounds.addBounds(data.path.bounds);
      } else if (action === "texture") {
        const data = instruction.data;
        bounds.addFrame(data.dx, data.dy, data.dx + data.dw, data.dy + data.dh, data.transform);
      }
      if (action === "stroke") {
        const data = instruction.data;
        const padding = data.style.width / 2;
        const _bounds = data.path.bounds;
        bounds.addFrame(
          _bounds.minX - padding,
          _bounds.minY - padding,
          _bounds.maxX + padding,
          _bounds.maxY + padding
        );
      }
    }
    return bounds;
  }
  /**
   * Check to see if a point is contained within this geometry.
   * @param point - Point to check if it's contained.
   * @returns {boolean} `true` if the point is contained within geometry.
   */
  containsPoint(point) {
    if (!this.bounds.containsPoint(point.x, point.y))
      return false;
    const instructions = this.instructions;
    let hasHit = false;
    for (let k = 0; k < instructions.length; k++) {
      const instruction = instructions[k];
      const data = instruction.data;
      const path = data.path;
      if (!instruction.action || !path)
        continue;
      const style = data.style;
      const shapes = path.shapePath.shapePrimitives;
      for (let i = 0; i < shapes.length; i++) {
        const shape = shapes[i].shape;
        if (!style || !shape)
          continue;
        const transform = shapes[i].transform;
        const transformedPoint = transform ? transform.applyInverse(point, tmpPoint) : point;
        if (instruction.action === "fill") {
          hasHit = shape.contains(transformedPoint.x, transformedPoint.y);
        } else {
          hasHit = shape.strokeContains(transformedPoint.x, transformedPoint.y, style.width);
        }
        const holes = data.hole;
        if (holes) {
          const holeShapes = holes.shapePath?.shapePrimitives;
          if (holeShapes) {
            for (let j = 0; j < holeShapes.length; j++) {
              if (holeShapes[j].shape.contains(transformedPoint.x, transformedPoint.y)) {
                hasHit = false;
              }
            }
          }
        }
        if (hasHit) {
          return true;
        }
      }
    }
    return hasHit;
  }
  /**
   * Destroys the GraphicsData object.
   * @param options - Options parameter. A boolean will act as if all options
   *  have been set to that value
   * @param {boolean} [options.texture=false] - Should it destroy the current texture of the fill/stroke style?
   * @param {boolean} [options.textureSource=false] - Should it destroy the texture source of the fill/stroke style?
   */
  destroy(options = false) {
    this._stateStack.length = 0;
    this._transform = null;
    this.emit("destroy", this);
    this.removeAllListeners();
    const destroyTexture = typeof options === "boolean" ? options : options?.texture;
    if (destroyTexture) {
      const destroyTextureSource = typeof options === "boolean" ? options : options?.textureSource;
      if (this._fillStyle.texture) {
        this._fillStyle.texture.destroy(destroyTextureSource);
      }
      if (this._strokeStyle.texture) {
        this._strokeStyle.texture.destroy(destroyTextureSource);
      }
    }
    this._fillStyle = null;
    this._strokeStyle = null;
    this.instructions = null;
    this._activePath = null;
    this._bounds = null;
    this._stateStack = null;
    this.customShader = null;
    this._transform = null;
  }
};
/** The default fill style to use when none is provided. */
_GraphicsContext.defaultFillStyle = {
  /** The color to use for the fill. */
  color: 16777215,
  /** The alpha value to use for the fill. */
  alpha: 1,
  /** The texture to use for the fill. */
  texture: Texture.WHITE,
  /** The matrix to apply. */
  matrix: null,
  /** The fill pattern to use. */
  fill: null
};
/** The default stroke style to use when none is provided. */
_GraphicsContext.defaultStrokeStyle = {
  /** The width of the stroke. */
  width: 1,
  /** The color to use for the stroke. */
  color: 16777215,
  /** The alpha value to use for the stroke. */
  alpha: 1,
  /** The alignment of the stroke. */
  alignment: 0.5,
  /** The miter limit to use. */
  miterLimit: 10,
  /** The line cap style to use. */
  cap: "butt",
  /** The line join style to use. */
  join: "miter",
  /** The texture to use for the fill. */
  texture: Texture.WHITE,
  /** The matrix to apply. */
  matrix: null,
  /** The fill pattern to use. */
  fill: null
};
let GraphicsContext = _GraphicsContext;

const valuesToIterateForKeys = [
  "align",
  "breakWords",
  "cssOverrides",
  "fontVariant",
  "fontWeight",
  "leading",
  "letterSpacing",
  "lineHeight",
  "padding",
  "textBaseline",
  "trim",
  "whiteSpace",
  "wordWrap",
  "wordWrapWidth",
  "fontFamily",
  "fontStyle",
  "fontSize"
];
function generateTextStyleKey(style) {
  const key = [];
  let index = 0;
  for (let i = 0; i < valuesToIterateForKeys.length; i++) {
    const prop = `_${valuesToIterateForKeys[i]}`;
    key[index++] = style[prop];
  }
  index = addFillStyleKey(style._fill, key, index);
  index = addStokeStyleKey(style._stroke, key, index);
  index = addDropShadowKey(style.dropShadow, key, index);
  return key.join("-");
}
function addFillStyleKey(fillStyle, key, index) {
  if (!fillStyle)
    return index;
  key[index++] = fillStyle.color;
  key[index++] = fillStyle.alpha;
  key[index++] = fillStyle.fill?.styleKey;
  return index;
}
function addStokeStyleKey(strokeStyle, key, index) {
  if (!strokeStyle)
    return index;
  index = addFillStyleKey(strokeStyle, key, index);
  key[index++] = strokeStyle.width;
  key[index++] = strokeStyle.alignment;
  key[index++] = strokeStyle.cap;
  key[index++] = strokeStyle.join;
  key[index++] = strokeStyle.miterLimit;
  return index;
}
function addDropShadowKey(dropShadow, key, index) {
  if (!dropShadow)
    return index;
  key[index++] = dropShadow.alpha;
  key[index++] = dropShadow.angle;
  key[index++] = dropShadow.blur;
  key[index++] = dropShadow.distance;
  key[index++] = Color.shared.setValue(dropShadow.color).toNumber();
  return index;
}

const _TextStyle = class _TextStyle extends EventEmitter {
  constructor(style = {}) {
    super();
    convertV7Tov8Style(style);
    const fullStyle = { ..._TextStyle.defaultTextStyle, ...style };
    for (const key in fullStyle) {
      const thisKey = key;
      this[thisKey] = fullStyle[key];
    }
    this.update();
  }
  /**
   * Alignment for multiline text, does not affect single line text.
   * @member {'left'|'center'|'right'|'justify'}
   */
  get align() {
    return this._align;
  }
  set align(value) {
    this._align = value;
    this.update();
  }
  /** Indicates if lines can be wrapped within words, it needs wordWrap to be set to true. */
  get breakWords() {
    return this._breakWords;
  }
  set breakWords(value) {
    this._breakWords = value;
    this.update();
  }
  /** Set a drop shadow for the text. */
  get dropShadow() {
    return this._dropShadow;
  }
  set dropShadow(value) {
    if (value !== null && typeof value === "object") {
      this._dropShadow = this._createProxy({ ..._TextStyle.defaultDropShadow, ...value });
    } else {
      this._dropShadow = value ? this._createProxy({ ..._TextStyle.defaultDropShadow }) : null;
    }
    this.update();
  }
  /** The font family, can be a single font name, or a list of names where the first is the preferred font. */
  get fontFamily() {
    return this._fontFamily;
  }
  set fontFamily(value) {
    this._fontFamily = value;
    this.update();
  }
  /** The font size (as a number it converts to px, but as a string, equivalents are '26px','20pt','160%' or '1.6em') */
  get fontSize() {
    return this._fontSize;
  }
  set fontSize(value) {
    if (typeof value === "string") {
      this._fontSize = parseInt(value, 10);
    } else {
      this._fontSize = value;
    }
    this.update();
  }
  /**
   * The font style.
   * @member {'normal'|'italic'|'oblique'}
   */
  get fontStyle() {
    return this._fontStyle;
  }
  set fontStyle(value) {
    this._fontStyle = value;
    this.update();
  }
  /**
   * The font variant.
   * @member {'normal'|'small-caps'}
   */
  get fontVariant() {
    return this._fontVariant;
  }
  set fontVariant(value) {
    this._fontVariant = value;
    this.update();
  }
  /**
   * The font weight.
   * @member {'normal'|'bold'|'bolder'|'lighter'|'100'|'200'|'300'|'400'|'500'|'600'|'700'|'800'|'900'}
   */
  get fontWeight() {
    return this._fontWeight;
  }
  set fontWeight(value) {
    this._fontWeight = value;
    this.update();
  }
  /** The space between lines. */
  get leading() {
    return this._leading;
  }
  set leading(value) {
    this._leading = value;
    this.update();
  }
  /** The amount of spacing between letters, default is 0. */
  get letterSpacing() {
    return this._letterSpacing;
  }
  set letterSpacing(value) {
    this._letterSpacing = value;
    this.update();
  }
  /** The line height, a number that represents the vertical space that a letter uses. */
  get lineHeight() {
    return this._lineHeight;
  }
  set lineHeight(value) {
    this._lineHeight = value;
    this.update();
  }
  /**
   * Occasionally some fonts are cropped. Adding some padding will prevent this from happening
   * by adding padding to all sides of the text.
   */
  get padding() {
    return this._padding;
  }
  set padding(value) {
    this._padding = value;
    this.update();
  }
  /** Trim transparent borders. This is an expensive operation so only use this if you have to! */
  get trim() {
    return this._trim;
  }
  set trim(value) {
    this._trim = value;
    this.update();
  }
  /**
   * The baseline of the text that is rendered.
   * @member {'alphabetic'|'top'|'hanging'|'middle'|'ideographic'|'bottom'}
   */
  get textBaseline() {
    return this._textBaseline;
  }
  set textBaseline(value) {
    this._textBaseline = value;
    this.update();
  }
  /**
   * How newlines and spaces should be handled.
   * Default is 'pre' (preserve, preserve).
   *
   *  value       | New lines     |   Spaces
   *  ---         | ---           |   ---
   * 'normal'     | Collapse      |   Collapse
   * 'pre'        | Preserve      |   Preserve
   * 'pre-line'   | Preserve      |   Collapse
   * @member {'normal'|'pre'|'pre-line'}
   */
  get whiteSpace() {
    return this._whiteSpace;
  }
  set whiteSpace(value) {
    this._whiteSpace = value;
    this.update();
  }
  /** Indicates if word wrap should be used. */
  get wordWrap() {
    return this._wordWrap;
  }
  set wordWrap(value) {
    this._wordWrap = value;
    this.update();
  }
  /** The width at which text will wrap, it needs wordWrap to be set to true. */
  get wordWrapWidth() {
    return this._wordWrapWidth;
  }
  set wordWrapWidth(value) {
    this._wordWrapWidth = value;
    this.update();
  }
  /** A fillstyle that will be used on the text e.g., 'red', '#00FF00'. */
  get fill() {
    return this._originalFill;
  }
  set fill(value) {
    if (value === this._originalFill)
      return;
    this._originalFill = value;
    if (this._isFillStyle(value)) {
      this._originalFill = this._createProxy({ ...GraphicsContext.defaultFillStyle, ...value }, () => {
        this._fill = toFillStyle(
          { ...this._originalFill },
          GraphicsContext.defaultFillStyle
        );
      });
    }
    this._fill = toFillStyle(
      value === 0 ? "black" : value,
      GraphicsContext.defaultFillStyle
    );
    this.update();
  }
  /** A fillstyle that will be used on the text stroke, e.g., 'blue', '#FCFF00'. */
  get stroke() {
    return this._originalStroke;
  }
  set stroke(value) {
    if (value === this._originalStroke)
      return;
    this._originalStroke = value;
    if (this._isFillStyle(value)) {
      this._originalStroke = this._createProxy({ ...GraphicsContext.defaultStrokeStyle, ...value }, () => {
        this._stroke = toStrokeStyle(
          { ...this._originalStroke },
          GraphicsContext.defaultStrokeStyle
        );
      });
    }
    this._stroke = toStrokeStyle(value, GraphicsContext.defaultStrokeStyle);
    this.update();
  }
  _generateKey() {
    this._styleKey = generateTextStyleKey(this);
    return this._styleKey;
  }
  update() {
    this._styleKey = null;
    this.emit("update", this);
  }
  /** Resets all properties to the default values */
  reset() {
    const defaultStyle = _TextStyle.defaultTextStyle;
    for (const key in defaultStyle) {
      this[key] = defaultStyle[key];
    }
  }
  get styleKey() {
    return this._styleKey || this._generateKey();
  }
  /**
   * Creates a new TextStyle object with the same values as this one.
   * @returns New cloned TextStyle object
   */
  clone() {
    return new _TextStyle({
      align: this.align,
      breakWords: this.breakWords,
      dropShadow: this._dropShadow ? { ...this._dropShadow } : null,
      fill: this._fill,
      fontFamily: this.fontFamily,
      fontSize: this.fontSize,
      fontStyle: this.fontStyle,
      fontVariant: this.fontVariant,
      fontWeight: this.fontWeight,
      leading: this.leading,
      letterSpacing: this.letterSpacing,
      lineHeight: this.lineHeight,
      padding: this.padding,
      stroke: this._stroke,
      textBaseline: this.textBaseline,
      whiteSpace: this.whiteSpace,
      wordWrap: this.wordWrap,
      wordWrapWidth: this.wordWrapWidth
    });
  }
  /**
   * Destroys this text style.
   * @param options - Options parameter. A boolean will act as if all options
   *  have been set to that value
   * @param {boolean} [options.texture=false] - Should it destroy the texture of the this style
   * @param {boolean} [options.textureSource=false] - Should it destroy the textureSource of the this style
   */
  destroy(options = false) {
    this.removeAllListeners();
    const destroyTexture = typeof options === "boolean" ? options : options?.texture;
    if (destroyTexture) {
      const destroyTextureSource = typeof options === "boolean" ? options : options?.textureSource;
      if (this._fill?.texture) {
        this._fill.texture.destroy(destroyTextureSource);
      }
      if (this._originalFill?.texture) {
        this._originalFill.texture.destroy(destroyTextureSource);
      }
      if (this._stroke?.texture) {
        this._stroke.texture.destroy(destroyTextureSource);
      }
      if (this._originalStroke?.texture) {
        this._originalStroke.texture.destroy(destroyTextureSource);
      }
    }
    this._fill = null;
    this._stroke = null;
    this.dropShadow = null;
    this._originalStroke = null;
    this._originalFill = null;
  }
  _createProxy(value, cb) {
    return new Proxy(value, {
      set: (target, property, newValue) => {
        target[property] = newValue;
        cb?.(property, newValue);
        this.update();
        return true;
      }
    });
  }
  _isFillStyle(value) {
    return (value ?? null) !== null && !(Color.isColorLike(value) || value instanceof FillGradient || value instanceof FillPattern);
  }
};
/** The default drop shadow settings */
_TextStyle.defaultDropShadow = {
  /** Set alpha for the drop shadow */
  alpha: 1,
  /** Set a angle of the drop shadow */
  angle: Math.PI / 6,
  /** Set a shadow blur radius */
  blur: 0,
  /** A fill style to be used on the  e.g., 'red', '#00FF00' */
  color: "black",
  /** Set a distance of the drop shadow */
  distance: 5
};
/** The default text style settings */
_TextStyle.defaultTextStyle = {
  /**
   * See {@link TextStyle.align}
   * @type {'left'|'center'|'right'|'justify'}
   */
  align: "left",
  /** See {@link TextStyle.breakWords} */
  breakWords: false,
  /** See {@link TextStyle.dropShadow} */
  dropShadow: null,
  /**
   * See {@link TextStyle.fill}
   * @type {string|string[]|number|number[]|CanvasGradient|CanvasPattern}
   */
  fill: "black",
  /**
   * See {@link TextStyle.fontFamily}
   * @type {string|string[]}
   */
  fontFamily: "Arial",
  /**
   * See {@link TextStyle.fontSize}
   * @type {number|string}
   */
  fontSize: 26,
  /**
   * See {@link TextStyle.fontStyle}
   * @type {'normal'|'italic'|'oblique'}
   */
  fontStyle: "normal",
  /**
   * See {@link TextStyle.fontVariant}
   * @type {'normal'|'small-caps'}
   */
  fontVariant: "normal",
  /**
   * See {@link TextStyle.fontWeight}
   * @type {'normal'|'bold'|'bolder'|'lighter'|'100'|'200'|'300'|'400'|'500'|'600'|'700'|'800'|'900'}
   */
  fontWeight: "normal",
  /** See {@link TextStyle.leading} */
  leading: 0,
  /** See {@link TextStyle.letterSpacing} */
  letterSpacing: 0,
  /** See {@link TextStyle.lineHeight} */
  lineHeight: 0,
  /** See {@link TextStyle.padding} */
  padding: 0,
  /**
   * See {@link TextStyle.stroke}
   * @type {string|number}
   */
  stroke: null,
  /**
   * See {@link TextStyle.textBaseline}
   * @type {'alphabetic'|'top'|'hanging'|'middle'|'ideographic'|'bottom'}
   */
  textBaseline: "alphabetic",
  /** See {@link TextStyle.trim} */
  trim: false,
  /**
   * See {@link TextStyle.whiteSpace}
   * @type {'normal'|'pre'|'pre-line'}
   */
  whiteSpace: "pre",
  /** See {@link TextStyle.wordWrap} */
  wordWrap: false,
  /** See {@link TextStyle.wordWrapWidth} */
  wordWrapWidth: 100
};
let TextStyle = _TextStyle;
function convertV7Tov8Style(style) {
  const oldStyle = style;
  if (typeof oldStyle.dropShadow === "boolean" && oldStyle.dropShadow) {
    const defaults = TextStyle.defaultDropShadow;
    style.dropShadow = {
      alpha: oldStyle.dropShadowAlpha ?? defaults.alpha,
      angle: oldStyle.dropShadowAngle ?? defaults.angle,
      blur: oldStyle.dropShadowBlur ?? defaults.blur,
      color: oldStyle.dropShadowColor ?? defaults.color,
      distance: oldStyle.dropShadowDistance ?? defaults.distance
    };
  }
  if (oldStyle.strokeThickness !== void 0) {
    deprecation(v8_0_0, "strokeThickness is now a part of stroke");
    const color = oldStyle.stroke;
    let obj = {};
    if (Color.isColorLike(color)) {
      obj.color = color;
    } else if (color instanceof FillGradient || color instanceof FillPattern) {
      obj.fill = color;
    } else if (Object.hasOwnProperty.call(color, "color") || Object.hasOwnProperty.call(color, "fill")) {
      obj = color;
    } else {
      throw new Error("Invalid stroke value.");
    }
    style.stroke = {
      ...obj,
      width: oldStyle.strokeThickness
    };
  }
  if (Array.isArray(oldStyle.fillGradientStops)) {
    deprecation(v8_0_0, "gradient fill is now a fill pattern: `new FillGradient(...)`");
    let fontSize;
    if (style.fontSize == null) {
      style.fontSize = TextStyle.defaultTextStyle.fontSize;
    } else if (typeof style.fontSize === "string") {
      fontSize = parseInt(style.fontSize, 10);
    } else {
      fontSize = style.fontSize;
    }
    const gradientFill = new FillGradient(0, 0, 0, fontSize * 1.7);
    const fills = oldStyle.fillGradientStops.map((color) => Color.shared.setValue(color).toNumber());
    fills.forEach((number, index) => {
      const ratio = index / (fills.length - 1);
      gradientFill.addColorStop(ratio, number);
    });
    style.fill = {
      fill: gradientFill
    };
  }
}

class CanvasPoolClass {
  constructor(canvasOptions) {
    this._canvasPool = /* @__PURE__ */ Object.create(null);
    this.canvasOptions = canvasOptions || {};
    this.enableFullScreen = false;
  }
  /**
   * Creates texture with params that were specified in pool constructor.
   * @param pixelWidth - Width of texture in pixels.
   * @param pixelHeight - Height of texture in pixels.
   */
  _createCanvasAndContext(pixelWidth, pixelHeight) {
    const canvas = DOMAdapter.get().createCanvas();
    canvas.width = pixelWidth;
    canvas.height = pixelHeight;
    const context = canvas.getContext("2d");
    return { canvas, context };
  }
  /**
   * Gets a Power-of-Two render texture or fullScreen texture
   * @param minWidth - The minimum width of the render texture.
   * @param minHeight - The minimum height of the render texture.
   * @param resolution - The resolution of the render texture.
   * @returns The new render texture.
   */
  getOptimalCanvasAndContext(minWidth, minHeight, resolution = 1) {
    minWidth = Math.ceil(minWidth * resolution - 1e-6);
    minHeight = Math.ceil(minHeight * resolution - 1e-6);
    minWidth = nextPow2(minWidth);
    minHeight = nextPow2(minHeight);
    const key = (minWidth << 17) + (minHeight << 1);
    if (!this._canvasPool[key]) {
      this._canvasPool[key] = [];
    }
    let canvasAndContext = this._canvasPool[key].pop();
    if (!canvasAndContext) {
      canvasAndContext = this._createCanvasAndContext(minWidth, minHeight);
    }
    return canvasAndContext;
  }
  /**
   * Place a render texture back into the pool.
   * @param canvasAndContext
   */
  returnCanvasAndContext(canvasAndContext) {
    const canvas = canvasAndContext.canvas;
    const { width, height } = canvas;
    const key = (width << 17) + (height << 1);
    this._canvasPool[key].push(canvasAndContext);
  }
  clear() {
    this._canvasPool = {};
  }
}
const CanvasPool = new CanvasPoolClass();

const genericFontFamilies = [
  "serif",
  "sans-serif",
  "monospace",
  "cursive",
  "fantasy",
  "system-ui"
];
function fontStringFromTextStyle(style) {
  const fontSizeString = typeof style.fontSize === "number" ? `${style.fontSize}px` : style.fontSize;
  let fontFamilies = style.fontFamily;
  if (!Array.isArray(style.fontFamily)) {
    fontFamilies = style.fontFamily.split(",");
  }
  for (let i = fontFamilies.length - 1; i >= 0; i--) {
    let fontFamily = fontFamilies[i].trim();
    if (!/([\"\'])[^\'\"]+\1/.test(fontFamily) && !genericFontFamilies.includes(fontFamily)) {
      fontFamily = `"${fontFamily}"`;
    }
    fontFamilies[i] = fontFamily;
  }
  return `${style.fontStyle} ${style.fontVariant} ${style.fontWeight} ${fontSizeString} ${fontFamilies.join(",")}`;
}

const contextSettings = {
  // TextMetrics requires getImageData readback for measuring fonts.
  willReadFrequently: true
};
const _CanvasTextMetrics = class _CanvasTextMetrics {
  /**
   * Checking that we can use modern canvas 2D API.
   *
   * Note: This is an unstable API, Chrome < 94 use `textLetterSpacing`, later versions use `letterSpacing`.
   * @see TextMetrics.experimentalLetterSpacing
   * @see https://developer.mozilla.org/en-US/docs/Web/API/ICanvasRenderingContext2D/letterSpacing
   * @see https://developer.chrome.com/origintrials/#/view_trial/3585991203293757441
   */
  static get experimentalLetterSpacingSupported() {
    let result = _CanvasTextMetrics._experimentalLetterSpacingSupported;
    if (result !== void 0) {
      const proto = DOMAdapter.get().getCanvasRenderingContext2D().prototype;
      result = _CanvasTextMetrics._experimentalLetterSpacingSupported = "letterSpacing" in proto || "textLetterSpacing" in proto;
    }
    return result;
  }
  /**
   * @param text - the text that was measured
   * @param style - the style that was measured
   * @param width - the measured width of the text
   * @param height - the measured height of the text
   * @param lines - an array of the lines of text broken by new lines and wrapping if specified in style
   * @param lineWidths - an array of the line widths for each line matched to `lines`
   * @param lineHeight - the measured line height for this style
   * @param maxLineWidth - the maximum line width for all measured lines
   * @param {FontMetrics} fontProperties - the font properties object from TextMetrics.measureFont
   */
  constructor(text, style, width, height, lines, lineWidths, lineHeight, maxLineWidth, fontProperties) {
    this.text = text;
    this.style = style;
    this.width = width;
    this.height = height;
    this.lines = lines;
    this.lineWidths = lineWidths;
    this.lineHeight = lineHeight;
    this.maxLineWidth = maxLineWidth;
    this.fontProperties = fontProperties;
  }
  /**
   * Measures the supplied string of text and returns a Rectangle.
   * @param text - The text to measure.
   * @param style - The text style to use for measuring
   * @param canvas - optional specification of the canvas to use for measuring.
   * @param wordWrap
   * @returns Measured width and height of the text.
   */
  static measureText(text = " ", style, canvas = _CanvasTextMetrics._canvas, wordWrap = style.wordWrap) {
    const textKey = `${text}:${style.styleKey}`;
    if (_CanvasTextMetrics._measurementCache[textKey])
      return _CanvasTextMetrics._measurementCache[textKey];
    const font = fontStringFromTextStyle(style);
    const fontProperties = _CanvasTextMetrics.measureFont(font);
    if (fontProperties.fontSize === 0) {
      fontProperties.fontSize = style.fontSize;
      fontProperties.ascent = style.fontSize;
    }
    const context = _CanvasTextMetrics.__context;
    context.font = font;
    const outputText = wordWrap ? _CanvasTextMetrics._wordWrap(text, style, canvas) : text;
    const lines = outputText.split(/(?:\r\n|\r|\n)/);
    const lineWidths = new Array(lines.length);
    let maxLineWidth = 0;
    for (let i = 0; i < lines.length; i++) {
      const lineWidth = _CanvasTextMetrics._measureText(lines[i], style.letterSpacing, context);
      lineWidths[i] = lineWidth;
      maxLineWidth = Math.max(maxLineWidth, lineWidth);
    }
    const strokeWidth = style._stroke?.width || 0;
    let width = maxLineWidth + strokeWidth;
    if (style.dropShadow) {
      width += style.dropShadow.distance;
    }
    const lineHeight = style.lineHeight || fontProperties.fontSize;
    let height = Math.max(lineHeight, fontProperties.fontSize + strokeWidth) + (lines.length - 1) * (lineHeight + style.leading);
    if (style.dropShadow) {
      height += style.dropShadow.distance;
    }
    const measurements = new _CanvasTextMetrics(
      text,
      style,
      width,
      height,
      lines,
      lineWidths,
      lineHeight + style.leading,
      maxLineWidth,
      fontProperties
    );
    return measurements;
  }
  static _measureText(text, letterSpacing, context) {
    let useExperimentalLetterSpacing = false;
    if (_CanvasTextMetrics.experimentalLetterSpacingSupported) {
      if (_CanvasTextMetrics.experimentalLetterSpacing) {
        context.letterSpacing = `${letterSpacing}px`;
        context.textLetterSpacing = `${letterSpacing}px`;
        useExperimentalLetterSpacing = true;
      } else {
        context.letterSpacing = "0px";
        context.textLetterSpacing = "0px";
      }
    }
    let width = context.measureText(text).width;
    if (width > 0) {
      if (useExperimentalLetterSpacing) {
        width -= letterSpacing;
      } else {
        width += (_CanvasTextMetrics.graphemeSegmenter(text).length - 1) * letterSpacing;
      }
    }
    return width;
  }
  /**
   * Applies newlines to a string to have it optimally fit into the horizontal
   * bounds set by the Text object's wordWrapWidth property.
   * @param text - String to apply word wrapping to
   * @param style - the style to use when wrapping
   * @param canvas - optional specification of the canvas to use for measuring.
   * @returns New string with new lines applied where required
   */
  static _wordWrap(text, style, canvas = _CanvasTextMetrics._canvas) {
    const context = canvas.getContext("2d", contextSettings);
    let width = 0;
    let line = "";
    let lines = "";
    const cache = /* @__PURE__ */ Object.create(null);
    const { letterSpacing, whiteSpace } = style;
    const collapseSpaces = _CanvasTextMetrics._collapseSpaces(whiteSpace);
    const collapseNewlines = _CanvasTextMetrics._collapseNewlines(whiteSpace);
    let canPrependSpaces = !collapseSpaces;
    const wordWrapWidth = style.wordWrapWidth + letterSpacing;
    const tokens = _CanvasTextMetrics._tokenize(text);
    for (let i = 0; i < tokens.length; i++) {
      let token = tokens[i];
      if (_CanvasTextMetrics._isNewline(token)) {
        if (!collapseNewlines) {
          lines += _CanvasTextMetrics._addLine(line);
          canPrependSpaces = !collapseSpaces;
          line = "";
          width = 0;
          continue;
        }
        token = " ";
      }
      if (collapseSpaces) {
        const currIsBreakingSpace = _CanvasTextMetrics.isBreakingSpace(token);
        const lastIsBreakingSpace = _CanvasTextMetrics.isBreakingSpace(line[line.length - 1]);
        if (currIsBreakingSpace && lastIsBreakingSpace) {
          continue;
        }
      }
      const tokenWidth = _CanvasTextMetrics._getFromCache(token, letterSpacing, cache, context);
      if (tokenWidth > wordWrapWidth) {
        if (line !== "") {
          lines += _CanvasTextMetrics._addLine(line);
          line = "";
          width = 0;
        }
        if (_CanvasTextMetrics.canBreakWords(token, style.breakWords)) {
          const characters = _CanvasTextMetrics.wordWrapSplit(token);
          for (let j = 0; j < characters.length; j++) {
            let char = characters[j];
            let lastChar = char;
            let k = 1;
            while (characters[j + k]) {
              const nextChar = characters[j + k];
              if (!_CanvasTextMetrics.canBreakChars(lastChar, nextChar, token, j, style.breakWords)) {
                char += nextChar;
              } else {
                break;
              }
              lastChar = nextChar;
              k++;
            }
            j += k - 1;
            const characterWidth = _CanvasTextMetrics._getFromCache(char, letterSpacing, cache, context);
            if (characterWidth + width > wordWrapWidth) {
              lines += _CanvasTextMetrics._addLine(line);
              canPrependSpaces = false;
              line = "";
              width = 0;
            }
            line += char;
            width += characterWidth;
          }
        } else {
          if (line.length > 0) {
            lines += _CanvasTextMetrics._addLine(line);
            line = "";
            width = 0;
          }
          const isLastToken = i === tokens.length - 1;
          lines += _CanvasTextMetrics._addLine(token, !isLastToken);
          canPrependSpaces = false;
          line = "";
          width = 0;
        }
      } else {
        if (tokenWidth + width > wordWrapWidth) {
          canPrependSpaces = false;
          lines += _CanvasTextMetrics._addLine(line);
          line = "";
          width = 0;
        }
        if (line.length > 0 || !_CanvasTextMetrics.isBreakingSpace(token) || canPrependSpaces) {
          line += token;
          width += tokenWidth;
        }
      }
    }
    lines += _CanvasTextMetrics._addLine(line, false);
    return lines;
  }
  /**
   * Convenience function for logging each line added during the wordWrap method.
   * @param line    - The line of text to add
   * @param newLine - Add new line character to end
   * @returns A formatted line
   */
  static _addLine(line, newLine = true) {
    line = _CanvasTextMetrics._trimRight(line);
    line = newLine ? `${line}
` : line;
    return line;
  }
  /**
   * Gets & sets the widths of calculated characters in a cache object
   * @param key            - The key
   * @param letterSpacing  - The letter spacing
   * @param cache          - The cache
   * @param context        - The canvas context
   * @returns The from cache.
   */
  static _getFromCache(key, letterSpacing, cache, context) {
    let width = cache[key];
    if (typeof width !== "number") {
      width = _CanvasTextMetrics._measureText(key, letterSpacing, context) + letterSpacing;
      cache[key] = width;
    }
    return width;
  }
  /**
   * Determines whether we should collapse breaking spaces.
   * @param whiteSpace - The TextStyle property whiteSpace
   * @returns Should collapse
   */
  static _collapseSpaces(whiteSpace) {
    return whiteSpace === "normal" || whiteSpace === "pre-line";
  }
  /**
   * Determines whether we should collapse newLine chars.
   * @param whiteSpace - The white space
   * @returns should collapse
   */
  static _collapseNewlines(whiteSpace) {
    return whiteSpace === "normal";
  }
  /**
   * Trims breaking whitespaces from string.
   * @param text - The text
   * @returns Trimmed string
   */
  static _trimRight(text) {
    if (typeof text !== "string") {
      return "";
    }
    for (let i = text.length - 1; i >= 0; i--) {
      const char = text[i];
      if (!_CanvasTextMetrics.isBreakingSpace(char)) {
        break;
      }
      text = text.slice(0, -1);
    }
    return text;
  }
  /**
   * Determines if char is a newline.
   * @param char - The character
   * @returns True if newline, False otherwise.
   */
  static _isNewline(char) {
    if (typeof char !== "string") {
      return false;
    }
    return _CanvasTextMetrics._newlines.includes(char.charCodeAt(0));
  }
  /**
   * Determines if char is a breaking whitespace.
   *
   * It allows one to determine whether char should be a breaking whitespace
   * For example certain characters in CJK langs or numbers.
   * It must return a boolean.
   * @param char - The character
   * @param [_nextChar] - The next character
   * @returns True if whitespace, False otherwise.
   */
  static isBreakingSpace(char, _nextChar) {
    if (typeof char !== "string") {
      return false;
    }
    return _CanvasTextMetrics._breakingSpaces.includes(char.charCodeAt(0));
  }
  /**
   * Splits a string into words, breaking-spaces and newLine characters
   * @param text - The text
   * @returns A tokenized array
   */
  static _tokenize(text) {
    const tokens = [];
    let token = "";
    if (typeof text !== "string") {
      return tokens;
    }
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const nextChar = text[i + 1];
      if (_CanvasTextMetrics.isBreakingSpace(char, nextChar) || _CanvasTextMetrics._isNewline(char)) {
        if (token !== "") {
          tokens.push(token);
          token = "";
        }
        tokens.push(char);
        continue;
      }
      token += char;
    }
    if (token !== "") {
      tokens.push(token);
    }
    return tokens;
  }
  /**
   * Overridable helper method used internally by TextMetrics, exposed to allow customizing the class's behavior.
   *
   * It allows one to customise which words should break
   * Examples are if the token is CJK or numbers.
   * It must return a boolean.
   * @param _token - The token
   * @param breakWords - The style attr break words
   * @returns Whether to break word or not
   */
  static canBreakWords(_token, breakWords) {
    return breakWords;
  }
  /**
   * Overridable helper method used internally by TextMetrics, exposed to allow customizing the class's behavior.
   *
   * It allows one to determine whether a pair of characters
   * should be broken by newlines
   * For example certain characters in CJK langs or numbers.
   * It must return a boolean.
   * @param _char - The character
   * @param _nextChar - The next character
   * @param _token - The token/word the characters are from
   * @param _index - The index in the token of the char
   * @param _breakWords - The style attr break words
   * @returns whether to break word or not
   */
  static canBreakChars(_char, _nextChar, _token, _index, _breakWords) {
    return true;
  }
  /**
   * Overridable helper method used internally by TextMetrics, exposed to allow customizing the class's behavior.
   *
   * It is called when a token (usually a word) has to be split into separate pieces
   * in order to determine the point to break a word.
   * It must return an array of characters.
   * @param token - The token to split
   * @returns The characters of the token
   * @see CanvasTextMetrics.graphemeSegmenter
   */
  static wordWrapSplit(token) {
    return _CanvasTextMetrics.graphemeSegmenter(token);
  }
  /**
   * Calculates the ascent, descent and fontSize of a given font-style
   * @param font - String representing the style of the font
   * @returns Font properties object
   */
  static measureFont(font) {
    if (_CanvasTextMetrics._fonts[font]) {
      return _CanvasTextMetrics._fonts[font];
    }
    const context = _CanvasTextMetrics._context;
    context.font = font;
    const metrics = context.measureText(_CanvasTextMetrics.METRICS_STRING + _CanvasTextMetrics.BASELINE_SYMBOL);
    const properties = {
      ascent: metrics.actualBoundingBoxAscent,
      descent: metrics.actualBoundingBoxDescent,
      fontSize: metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent
    };
    _CanvasTextMetrics._fonts[font] = properties;
    return properties;
  }
  /**
   * Clear font metrics in metrics cache.
   * @param {string} [font] - font name. If font name not set then clear cache for all fonts.
   */
  static clearMetrics(font = "") {
    if (font) {
      delete _CanvasTextMetrics._fonts[font];
    } else {
      _CanvasTextMetrics._fonts = {};
    }
  }
  /**
   * Cached canvas element for measuring text
   * TODO: this should be private, but isn't because of backward compat, will fix later.
   * @ignore
   */
  static get _canvas() {
    if (!_CanvasTextMetrics.__canvas) {
      let canvas;
      try {
        const c = new OffscreenCanvas(0, 0);
        const context = c.getContext("2d", contextSettings);
        if (context?.measureText) {
          _CanvasTextMetrics.__canvas = c;
          return c;
        }
        canvas = DOMAdapter.get().createCanvas();
      } catch (ex) {
        canvas = DOMAdapter.get().createCanvas();
      }
      canvas.width = canvas.height = 10;
      _CanvasTextMetrics.__canvas = canvas;
    }
    return _CanvasTextMetrics.__canvas;
  }
  /**
   * TODO: this should be private, but isn't because of backward compat, will fix later.
   * @ignore
   */
  static get _context() {
    if (!_CanvasTextMetrics.__context) {
      _CanvasTextMetrics.__context = _CanvasTextMetrics._canvas.getContext("2d", contextSettings);
    }
    return _CanvasTextMetrics.__context;
  }
};
/**
 * String used for calculate font metrics.
 * These characters are all tall to help calculate the height required for text.
 */
_CanvasTextMetrics.METRICS_STRING = "|\xC9q\xC5";
/** Baseline symbol for calculate font metrics. */
_CanvasTextMetrics.BASELINE_SYMBOL = "M";
/** Baseline multiplier for calculate font metrics. */
_CanvasTextMetrics.BASELINE_MULTIPLIER = 1.4;
/** Height multiplier for setting height of canvas to calculate font metrics. */
_CanvasTextMetrics.HEIGHT_MULTIPLIER = 2;
/**
 * A Unicode "character", or "grapheme cluster", can be composed of multiple Unicode code points,
 * such as letters with diacritical marks (e.g. `'\u0065\u0301'`, letter e with acute)
 * or emojis with modifiers (e.g. `'\uD83E\uDDD1\u200D\uD83D\uDCBB'`, technologist).
 * The new `Intl.Segmenter` API in ES2022 can split the string into grapheme clusters correctly. If it is not available,
 * PixiJS will fallback to use the iterator of String, which can only spilt the string into code points.
 * If you want to get full functionality in environments that don't support `Intl.Segmenter` (such as Firefox),
 * you can use other libraries such as [grapheme-splitter]{@link https://www.npmjs.com/package/grapheme-splitter}
 * or [graphemer]{@link https://www.npmjs.com/package/graphemer} to create a polyfill. Since these libraries can be
 * relatively large in size to handle various Unicode grapheme clusters properly, PixiJS won't use them directly.
 */
_CanvasTextMetrics.graphemeSegmenter = (() => {
  if (typeof Intl?.Segmenter === "function") {
    const segmenter = new Intl.Segmenter();
    return (s) => [...segmenter.segment(s)].map((x) => x.segment);
  }
  return (s) => [...s];
})();
/**
 * New rendering behavior for letter-spacing which uses Chrome's new native API. This will
 * lead to more accurate letter-spacing results because it does not try to manually draw
 * each character. However, this Chrome API is experimental and may not serve all cases yet.
 * @see TextMetrics.experimentalLetterSpacingSupported
 */
_CanvasTextMetrics.experimentalLetterSpacing = false;
/** Cache of {@see TextMetrics.FontMetrics} objects. */
_CanvasTextMetrics._fonts = {};
/** Cache of new line chars. */
_CanvasTextMetrics._newlines = [
  10,
  // line feed
  13
  // carriage return
];
/** Cache of breaking spaces. */
_CanvasTextMetrics._breakingSpaces = [
  9,
  // character tabulation
  32,
  // space
  8192,
  // en quad
  8193,
  // em quad
  8194,
  // en space
  8195,
  // em space
  8196,
  // three-per-em space
  8197,
  // four-per-em space
  8198,
  // six-per-em space
  8200,
  // punctuation space
  8201,
  // thin space
  8202,
  // hair space
  8287,
  // medium mathematical space
  12288
  // ideographic space
];
_CanvasTextMetrics._measurementCache = {};
let CanvasTextMetrics = _CanvasTextMetrics;

function getCanvasFillStyle(fillStyle, context) {
  if (fillStyle.texture === Texture.WHITE && !fillStyle.fill) {
    return Color.shared.setValue(fillStyle.color).setAlpha(fillStyle.alpha ?? 1).toHexa();
  } else if (!fillStyle.fill) {
    const pattern = context.createPattern(fillStyle.texture.source.resource, "repeat");
    const tempMatrix = fillStyle.matrix.copyTo(Matrix.shared);
    tempMatrix.scale(fillStyle.texture.frame.width, fillStyle.texture.frame.height);
    pattern.setTransform(tempMatrix);
    return pattern;
  } else if (fillStyle.fill instanceof FillPattern) {
    const fillPattern = fillStyle.fill;
    const pattern = context.createPattern(fillPattern.texture.source.resource, "repeat");
    const tempMatrix = fillPattern.transform.copyTo(Matrix.shared);
    tempMatrix.scale(
      fillPattern.texture.frame.width,
      fillPattern.texture.frame.height
    );
    pattern.setTransform(tempMatrix);
    return pattern;
  } else if (fillStyle.fill instanceof FillGradient) {
    const fillGradient = fillStyle.fill;
    if (fillGradient.type === "linear") {
      const gradient = context.createLinearGradient(
        fillGradient.x0,
        fillGradient.y0,
        fillGradient.x1,
        fillGradient.y1
      );
      fillGradient.gradientStops.forEach((stop) => {
        gradient.addColorStop(stop.offset, Color.shared.setValue(stop.color).toHex());
      });
      return gradient;
    }
  }
  warn("FillStyle not recognised", fillStyle);
  return "red";
}

function resolveCharacters(chars) {
  if (chars === "") {
    return [];
  }
  if (typeof chars === "string") {
    chars = [chars];
  }
  const result = [];
  for (let i = 0, j = chars.length; i < j; i++) {
    const item = chars[i];
    if (Array.isArray(item)) {
      if (item.length !== 2) {
        throw new Error(`[BitmapFont]: Invalid character range length, expecting 2 got ${item.length}.`);
      }
      if (item[0].length === 0 || item[1].length === 0) {
        throw new Error("[BitmapFont]: Invalid character delimiter.");
      }
      const startCode = item[0].charCodeAt(0);
      const endCode = item[1].charCodeAt(0);
      if (endCode < startCode) {
        throw new Error("[BitmapFont]: Invalid character range.");
      }
      for (let i2 = startCode, j2 = endCode; i2 <= j2; i2++) {
        result.push(String.fromCharCode(i2));
      }
    } else {
      result.push(...Array.from(item));
    }
  }
  if (result.length === 0) {
    throw new Error("[BitmapFont]: Empty set when resolving characters.");
  }
  return result;
}

const _DynamicBitmapFont = class _DynamicBitmapFont extends AbstractBitmapFont {
  /**
   * @param options - The options for the dynamic bitmap font.
   */
  constructor(options) {
    super();
    /**
     * this is a resolution modifier for the font size..
     * texture resolution will also be used to scale texture according to its font size also
     */
    this.resolution = 1;
    /** The pages of the font. */
    this.pages = [];
    this._padding = 0;
    this._measureCache = /* @__PURE__ */ Object.create(null);
    this._currentChars = [];
    this._currentX = 0;
    this._currentY = 0;
    this._currentPageIndex = -1;
    this._skipKerning = false;
    const dynamicOptions = { ..._DynamicBitmapFont.defaultOptions, ...options };
    this._textureSize = dynamicOptions.textureSize;
    this._mipmap = dynamicOptions.mipmap;
    const style = dynamicOptions.style.clone();
    if (dynamicOptions.overrideFill) {
      style._fill.color = 16777215;
      style._fill.alpha = 1;
      style._fill.texture = Texture.WHITE;
      style._fill.fill = null;
    }
    this.applyFillAsTint = dynamicOptions.overrideFill;
    const requestedFontSize = style.fontSize;
    style.fontSize = this.baseMeasurementFontSize;
    const font = fontStringFromTextStyle(style);
    if (dynamicOptions.overrideSize) {
      if (style._stroke) {
        style._stroke.width *= this.baseRenderedFontSize / requestedFontSize;
      }
    } else {
      style.fontSize = this.baseRenderedFontSize = requestedFontSize;
    }
    this._style = style;
    this._skipKerning = dynamicOptions.skipKerning ?? false;
    this.resolution = dynamicOptions.resolution ?? 1;
    this._padding = dynamicOptions.padding ?? 4;
    this.fontMetrics = CanvasTextMetrics.measureFont(font);
    this.lineHeight = style.lineHeight || this.fontMetrics.fontSize || style.fontSize;
  }
  ensureCharacters(chars) {
    const charList = resolveCharacters(chars).filter((char) => !this._currentChars.includes(char)).filter((char, index, self) => self.indexOf(char) === index);
    if (!charList.length)
      return;
    this._currentChars = [...this._currentChars, ...charList];
    let pageData;
    if (this._currentPageIndex === -1) {
      pageData = this._nextPage();
    } else {
      pageData = this.pages[this._currentPageIndex];
    }
    let { canvas, context } = pageData.canvasAndContext;
    let textureSource = pageData.texture.source;
    const style = this._style;
    let currentX = this._currentX;
    let currentY = this._currentY;
    const fontScale = this.baseRenderedFontSize / this.baseMeasurementFontSize;
    const padding = this._padding * fontScale;
    const widthScale = style.fontStyle === "italic" ? 2 : 1;
    let maxCharHeight = 0;
    let skipTexture = false;
    for (let i = 0; i < charList.length; i++) {
      const char = charList[i];
      const metrics = CanvasTextMetrics.measureText(char, style, canvas, false);
      metrics.lineHeight = metrics.height;
      const width = widthScale * metrics.width * fontScale;
      const height = metrics.height * fontScale;
      const paddedWidth = width + padding * 2;
      const paddedHeight = height + padding * 2;
      skipTexture = false;
      if (char !== "\n" && char !== "\r" && char !== "	" && char !== " ") {
        skipTexture = true;
        maxCharHeight = Math.ceil(Math.max(paddedHeight, maxCharHeight));
      }
      if (currentX + paddedWidth > this._textureSize) {
        currentY += maxCharHeight;
        maxCharHeight = paddedHeight;
        currentX = 0;
        if (currentY + maxCharHeight > this._textureSize) {
          textureSource.update();
          const pageData2 = this._nextPage();
          canvas = pageData2.canvasAndContext.canvas;
          context = pageData2.canvasAndContext.context;
          textureSource = pageData2.texture.source;
          currentY = 0;
        }
      }
      const xAdvance = width / fontScale - (style.dropShadow?.distance ?? 0) - (style._stroke?.width ?? 0);
      this.chars[char] = {
        id: char.codePointAt(0),
        xOffset: -this._padding,
        yOffset: -this._padding,
        xAdvance,
        kerning: {}
      };
      if (skipTexture) {
        this._drawGlyph(
          context,
          metrics,
          currentX + padding,
          currentY + padding,
          fontScale,
          style
        );
        const px = textureSource.width * fontScale;
        const py = textureSource.height * fontScale;
        const frame = new Rectangle(
          currentX / px * textureSource.width,
          currentY / py * textureSource.height,
          paddedWidth / px * textureSource.width,
          paddedHeight / py * textureSource.height
        );
        this.chars[char].texture = new Texture({
          source: textureSource,
          frame
        });
        currentX += Math.ceil(paddedWidth);
      }
    }
    textureSource.update();
    this._currentX = currentX;
    this._currentY = currentY;
    this._skipKerning && this._applyKerning(charList, context);
  }
  /**
   * @deprecated since 8.0.0
   * The map of base page textures (i.e., sheets of glyphs).
   */
  get pageTextures() {
    deprecation(v8_0_0, "BitmapFont.pageTextures is deprecated, please use BitmapFont.pages instead.");
    return this.pages;
  }
  _applyKerning(newChars, context) {
    const measureCache = this._measureCache;
    for (let i = 0; i < newChars.length; i++) {
      const first = newChars[i];
      for (let j = 0; j < this._currentChars.length; j++) {
        const second = this._currentChars[j];
        let c1 = measureCache[first];
        if (!c1)
          c1 = measureCache[first] = context.measureText(first).width;
        let c2 = measureCache[second];
        if (!c2)
          c2 = measureCache[second] = context.measureText(second).width;
        let total = context.measureText(first + second).width;
        let amount = total - (c1 + c2);
        if (amount) {
          this.chars[first].kerning[second] = amount;
        }
        total = context.measureText(first + second).width;
        amount = total - (c1 + c2);
        if (amount) {
          this.chars[second].kerning[first] = amount;
        }
      }
    }
  }
  _nextPage() {
    this._currentPageIndex++;
    const textureResolution = this.resolution;
    const canvasAndContext = CanvasPool.getOptimalCanvasAndContext(
      this._textureSize,
      this._textureSize,
      textureResolution
    );
    this._setupContext(canvasAndContext.context, this._style, textureResolution);
    const resolution = textureResolution * (this.baseRenderedFontSize / this.baseMeasurementFontSize);
    const texture = new Texture({
      source: new ImageSource({
        resource: canvasAndContext.canvas,
        resolution,
        alphaMode: "premultiply-alpha-on-upload",
        autoGenerateMipmaps: this._mipmap
      })
    });
    const pageData = {
      canvasAndContext,
      texture
    };
    this.pages[this._currentPageIndex] = pageData;
    return pageData;
  }
  // canvas style!
  _setupContext(context, style, resolution) {
    style.fontSize = this.baseRenderedFontSize;
    context.scale(resolution, resolution);
    context.font = fontStringFromTextStyle(style);
    style.fontSize = this.baseMeasurementFontSize;
    context.textBaseline = style.textBaseline;
    const stroke = style._stroke;
    const strokeThickness = stroke?.width ?? 0;
    if (stroke) {
      context.lineWidth = strokeThickness;
      context.lineJoin = stroke.join;
      context.miterLimit = stroke.miterLimit;
      context.strokeStyle = getCanvasFillStyle(stroke, context);
    }
    if (style._fill) {
      context.fillStyle = getCanvasFillStyle(style._fill, context);
    }
    if (style.dropShadow) {
      const shadowOptions = style.dropShadow;
      const rgb = Color.shared.setValue(shadowOptions.color).toArray();
      const dropShadowBlur = shadowOptions.blur * resolution;
      const dropShadowDistance = shadowOptions.distance * resolution;
      context.shadowColor = `rgba(${rgb[0] * 255},${rgb[1] * 255},${rgb[2] * 255},${shadowOptions.alpha})`;
      context.shadowBlur = dropShadowBlur;
      context.shadowOffsetX = Math.cos(shadowOptions.angle) * dropShadowDistance;
      context.shadowOffsetY = Math.sin(shadowOptions.angle) * dropShadowDistance;
    } else {
      context.shadowColor = "black";
      context.shadowBlur = 0;
      context.shadowOffsetX = 0;
      context.shadowOffsetY = 0;
    }
  }
  _drawGlyph(context, metrics, x, y, fontScale, style) {
    const char = metrics.text;
    const fontProperties = metrics.fontProperties;
    const stroke = style._stroke;
    const strokeThickness = (stroke?.width ?? 0) * fontScale;
    const tx = x + strokeThickness / 2;
    const ty = y - strokeThickness / 2;
    const descent = fontProperties.descent * fontScale;
    const lineHeight = metrics.lineHeight * fontScale;
    if (style.stroke && strokeThickness) {
      context.strokeText(char, tx, ty + lineHeight - descent);
    }
    if (style._fill) {
      context.fillText(char, tx, ty + lineHeight - descent);
    }
  }
  destroy() {
    super.destroy();
    for (let i = 0; i < this.pages.length; i++) {
      const { canvasAndContext, texture } = this.pages[i];
      canvasAndContext.canvas.width = canvasAndContext.canvas.width;
      CanvasPool.returnCanvasAndContext(canvasAndContext);
      texture.destroy(true);
    }
    this.pages = null;
  }
};
_DynamicBitmapFont.defaultOptions = {
  textureSize: 512,
  style: new TextStyle(),
  mipmap: true
};
let DynamicBitmapFont = _DynamicBitmapFont;

function getBitmapTextLayout(chars, style, font, trimEnd) {
  const layoutData = {
    width: 0,
    height: 0,
    offsetY: 0,
    scale: style.fontSize / font.baseMeasurementFontSize,
    lines: [{
      width: 0,
      charPositions: [],
      spaceWidth: 0,
      spacesIndex: [],
      chars: []
    }]
  };
  layoutData.offsetY = font.baseLineOffset;
  let currentLine = layoutData.lines[0];
  let previousChar = null;
  let firstWord = true;
  const currentWord = {
    width: 0,
    start: 0,
    index: 0,
    // use index to not modify the array as we use it a lot!
    positions: [],
    chars: []
  };
  const nextWord = (word) => {
    const start = currentLine.width;
    for (let j = 0; j < currentWord.index; j++) {
      const position = word.positions[j];
      currentLine.chars.push(word.chars[j]);
      currentLine.charPositions.push(position + start);
    }
    currentLine.width += word.width;
    firstWord = false;
    currentWord.width = 0;
    currentWord.index = 0;
    currentWord.chars.length = 0;
  };
  const nextLine = () => {
    let index = currentLine.chars.length - 1;
    if (trimEnd) {
      let lastChar = currentLine.chars[index];
      while (lastChar === " ") {
        currentLine.width -= font.chars[lastChar].xAdvance;
        lastChar = currentLine.chars[--index];
      }
    }
    layoutData.width = Math.max(layoutData.width, currentLine.width);
    currentLine = {
      width: 0,
      charPositions: [],
      chars: [],
      spaceWidth: 0,
      spacesIndex: []
    };
    firstWord = true;
    layoutData.lines.push(currentLine);
    layoutData.height += font.lineHeight;
  };
  const scale = font.baseMeasurementFontSize / style.fontSize;
  const adjustedLetterSpacing = style.letterSpacing * scale;
  const adjustedWordWrapWidth = style.wordWrapWidth * scale;
  for (let i = 0; i < chars.length + 1; i++) {
    let char;
    const isEnd = i === chars.length;
    if (!isEnd) {
      char = chars[i];
    }
    const charData = font.chars[char] || font.chars[" "];
    const isSpace = /(?:\s)/.test(char);
    const isWordBreak = isSpace || char === "\r" || char === "\n" || isEnd;
    if (isWordBreak) {
      const addWordToNextLine = !firstWord && style.wordWrap && currentLine.width + currentWord.width - adjustedLetterSpacing > adjustedWordWrapWidth;
      if (addWordToNextLine) {
        nextLine();
        nextWord(currentWord);
        if (!isEnd) {
          currentLine.charPositions.push(0);
        }
      } else {
        currentWord.start = currentLine.width;
        nextWord(currentWord);
        if (!isEnd) {
          currentLine.charPositions.push(0);
        }
      }
      if (char === "\r" || char === "\n") {
        if (currentLine.width !== 0) {
          nextLine();
        }
      } else if (!isEnd) {
        const spaceWidth = charData.xAdvance + (charData.kerning[previousChar] || 0) + adjustedLetterSpacing;
        currentLine.width += spaceWidth;
        currentLine.spaceWidth = spaceWidth;
        currentLine.spacesIndex.push(currentLine.charPositions.length);
        currentLine.chars.push(char);
      }
    } else {
      const kerning = charData.kerning[previousChar] || 0;
      const nextCharWidth = charData.xAdvance + kerning + adjustedLetterSpacing;
      currentWord.positions[currentWord.index++] = currentWord.width + kerning;
      currentWord.chars.push(char);
      currentWord.width += nextCharWidth;
    }
    previousChar = char;
  }
  nextLine();
  if (style.align === "center") {
    alignCenter(layoutData);
  } else if (style.align === "right") {
    alignRight(layoutData);
  } else if (style.align === "justify") {
    alignJustify(layoutData);
  }
  return layoutData;
}
function alignCenter(measurementData) {
  for (let i = 0; i < measurementData.lines.length; i++) {
    const line = measurementData.lines[i];
    const offset = measurementData.width / 2 - line.width / 2;
    for (let j = 0; j < line.charPositions.length; j++) {
      line.charPositions[j] += offset;
    }
  }
}
function alignRight(measurementData) {
  for (let i = 0; i < measurementData.lines.length; i++) {
    const line = measurementData.lines[i];
    const offset = measurementData.width - line.width;
    for (let j = 0; j < line.charPositions.length; j++) {
      line.charPositions[j] += offset;
    }
  }
}
function alignJustify(measurementData) {
  const width = measurementData.width;
  for (let i = 0; i < measurementData.lines.length; i++) {
    const line = measurementData.lines[i];
    let indy = 0;
    let spaceIndex = line.spacesIndex[indy++];
    let offset = 0;
    const totalSpaces = line.spacesIndex.length;
    const newSpaceWidth = (width - line.width) / totalSpaces;
    const spaceWidth = newSpaceWidth;
    for (let j = 0; j < line.charPositions.length; j++) {
      if (j === spaceIndex) {
        spaceIndex = line.spacesIndex[indy++];
        offset += spaceWidth;
      }
      line.charPositions[j] += offset;
    }
  }
}

let fontCount = 0;
class BitmapFontManagerClass {
  constructor() {
    /**
     * This character set includes all the letters in the alphabet (both lower- and upper- case).
     * @type {string[][]}
     * @example
     * BitmapFont.from('ExampleFont', style, { chars: BitmapFont.ALPHA })
     */
    this.ALPHA = [["a", "z"], ["A", "Z"], " "];
    /**
     * This character set includes all decimal digits (from 0 to 9).
     * @type {string[][]}
     * @example
     * BitmapFont.from('ExampleFont', style, { chars: BitmapFont.NUMERIC })
     */
    this.NUMERIC = [["0", "9"]];
    /**
     * This character set is the union of `BitmapFont.ALPHA` and `BitmapFont.NUMERIC`.
     * @type {string[][]}
     */
    this.ALPHANUMERIC = [["a", "z"], ["A", "Z"], ["0", "9"], " "];
    /**
     * This character set consists of all the ASCII table.
     * @member {string[][]}
     * @see http://www.asciitable.com/
     */
    this.ASCII = [[" ", "~"]];
    /** Default options for installing a new BitmapFont. */
    this.defaultOptions = {
      chars: this.ALPHANUMERIC,
      resolution: 1,
      padding: 4,
      skipKerning: false
    };
  }
  /**
   * Get a font for the specified text and style.
   * @param text - The text to get the font for
   * @param style - The style to use
   */
  getFont(text, style) {
    let fontFamilyKey = `${style.fontFamily}-bitmap`;
    let overrideFill = true;
    if (style._fill.fill && !style._stroke) {
      fontFamilyKey += style._fill.fill.styleKey;
      overrideFill = false;
    } else if (style._stroke || style.dropShadow) {
      let key = style.styleKey;
      key = key.substring(0, key.lastIndexOf("-"));
      fontFamilyKey = `${key}-bitmap`;
      overrideFill = false;
    }
    if (!Cache.has(fontFamilyKey)) {
      const fnt = new DynamicBitmapFont({
        style,
        overrideFill,
        overrideSize: true,
        ...this.defaultOptions
      });
      fontCount++;
      if (fontCount > 50) {
        warn("BitmapText", `You have dynamically created ${fontCount} bitmap fonts, this can be inefficient. Try pre installing your font styles using \`BitmapFont.install({name:"style1", style})\``);
      }
      fnt.once("destroy", () => {
        fontCount--;
        Cache.remove(fontFamilyKey);
      });
      Cache.set(
        fontFamilyKey,
        fnt
      );
    }
    const dynamicFont = Cache.get(fontFamilyKey);
    dynamicFont.ensureCharacters?.(text);
    return dynamicFont;
  }
  /**
   * Get the layout of a text for the specified style.
   * @param text - The text to get the layout for
   * @param style - The style to use
   * @param trimEnd - Whether to ignore whitespaces at the end of each line
   */
  getLayout(text, style, trimEnd = true) {
    const bitmapFont = this.getFont(text, style);
    return getBitmapTextLayout([...text], style, bitmapFont, trimEnd);
  }
  /**
   * Measure the text using the specified style.
   * @param text - The text to measure
   * @param style - The style to use
   * @param trimEnd - Whether to ignore whitespaces at the end of each line
   */
  measureText(text, style, trimEnd = true) {
    return this.getLayout(text, style, trimEnd);
  }
  // eslint-disable-next-line max-len
  install(...args) {
    let options = args[0];
    if (typeof options === "string") {
      options = {
        name: options,
        style: args[1],
        chars: args[2]?.chars,
        resolution: args[2]?.resolution,
        padding: args[2]?.padding,
        skipKerning: args[2]?.skipKerning
      };
      deprecation(v8_0_0, "BitmapFontManager.install(name, style, options) is deprecated, use BitmapFontManager.install({name, style, ...options})");
    }
    const name = options?.name;
    if (!name) {
      throw new Error("[BitmapFontManager] Property `name` is required.");
    }
    options = { ...this.defaultOptions, ...options };
    const textStyle = options.style;
    const style = textStyle instanceof TextStyle ? textStyle : new TextStyle(textStyle);
    const overrideFill = style._fill.fill !== null && style._fill.fill !== void 0;
    const font = new DynamicBitmapFont({
      style,
      overrideFill,
      skipKerning: options.skipKerning,
      padding: options.padding,
      resolution: options.resolution,
      overrideSize: false
    });
    const flatChars = resolveCharacters(options.chars);
    font.ensureCharacters(flatChars.join(""));
    Cache.set(`${name}-bitmap`, font);
    font.once("destroy", () => Cache.remove(`${name}-bitmap`));
    return font;
  }
  /**
   * Uninstalls a bitmap font from the cache.
   * @param {string} name - The name of the bitmap font to uninstall.
   */
  uninstall(name) {
    const cacheKey = `${name}-bitmap`;
    const font = Cache.get(cacheKey);
    if (font) {
      Cache.remove(cacheKey);
      font.destroy();
    }
  }
}
const BitmapFontManager = new BitmapFontManagerClass();

let count = 0;
class TexturePoolClass {
  /**
   * @param textureOptions - options that will be passed to BaseRenderTexture constructor
   * @param {SCALE_MODE} [textureOptions.scaleMode] - See {@link SCALE_MODE} for possible values.
   */
  constructor(textureOptions) {
    this._poolKeyHash = /* @__PURE__ */ Object.create(null);
    this._texturePool = {};
    this.textureOptions = textureOptions || {};
    this.enableFullScreen = false;
  }
  /**
   * Creates texture with params that were specified in pool constructor.
   * @param pixelWidth - Width of texture in pixels.
   * @param pixelHeight - Height of texture in pixels.
   * @param antialias
   */
  createTexture(pixelWidth, pixelHeight, antialias) {
    const textureSource = new TextureSource({
      ...this.textureOptions,
      width: pixelWidth,
      height: pixelHeight,
      resolution: 1,
      antialias,
      autoGarbageCollect: true
    });
    return new Texture({
      source: textureSource,
      label: `texturePool_${count++}`
    });
  }
  /**
   * Gets a Power-of-Two render texture or fullScreen texture
   * @param frameWidth - The minimum width of the render texture.
   * @param frameHeight - The minimum height of the render texture.
   * @param resolution - The resolution of the render texture.
   * @param antialias
   * @returns The new render texture.
   */
  getOptimalTexture(frameWidth, frameHeight, resolution = 1, antialias) {
    let po2Width = Math.ceil(frameWidth * resolution - 1e-6);
    let po2Height = Math.ceil(frameHeight * resolution - 1e-6);
    po2Width = nextPow2(po2Width);
    po2Height = nextPow2(po2Height);
    const key = (po2Width << 17) + (po2Height << 1) + (antialias ? 1 : 0);
    if (!this._texturePool[key]) {
      this._texturePool[key] = [];
    }
    let texture = this._texturePool[key].pop();
    if (!texture) {
      texture = this.createTexture(po2Width, po2Height, antialias);
    }
    texture.source._resolution = resolution;
    texture.source.width = po2Width / resolution;
    texture.source.height = po2Height / resolution;
    texture.source.pixelWidth = po2Width;
    texture.source.pixelHeight = po2Height;
    texture.frame.x = 0;
    texture.frame.y = 0;
    texture.frame.width = frameWidth;
    texture.frame.height = frameHeight;
    texture.updateUvs();
    this._poolKeyHash[texture.uid] = key;
    return texture;
  }
  /**
   * Gets extra texture of the same size as input renderTexture
   * @param texture - The texture to check what size it is.
   * @param antialias - Whether to use antialias.
   * @returns A texture that is a power of two
   */
  getSameSizeTexture(texture, antialias = false) {
    const source = texture.source;
    return this.getOptimalTexture(texture.width, texture.height, source._resolution, antialias);
  }
  /**
   * Place a render texture back into the pool.
   * @param renderTexture - The renderTexture to free
   */
  returnTexture(renderTexture) {
    const key = this._poolKeyHash[renderTexture.uid];
    this._texturePool[key].push(renderTexture);
  }
  /**
   * Clears the pool.
   * @param destroyTextures - Destroy all stored textures.
   */
  clear(destroyTextures) {
    destroyTextures = destroyTextures !== false;
    if (destroyTextures) {
      for (const i in this._texturePool) {
        const textures = this._texturePool[i];
        if (textures) {
          for (let j = 0; j < textures.length; j++) {
            textures[j].destroy(true);
          }
        }
      }
    }
    this._texturePool = {};
  }
}
const TexturePool = new TexturePoolClass();

class FilterPipe {
  constructor(renderer) {
    this._renderer = renderer;
  }
  push(filterEffect, container, instructionSet) {
    const renderPipes = this._renderer.renderPipes;
    renderPipes.batch.break(instructionSet);
    instructionSet.add({
      renderPipeId: "filter",
      canBundle: false,
      action: "pushFilter",
      container,
      filterEffect
    });
  }
  pop(_filterEffect, _container, instructionSet) {
    this._renderer.renderPipes.batch.break(instructionSet);
    instructionSet.add({
      renderPipeId: "filter",
      action: "popFilter",
      canBundle: false
    });
  }
  execute(instruction) {
    if (instruction.action === "pushFilter") {
      this._renderer.filter.push(instruction);
    } else if (instruction.action === "popFilter") {
      this._renderer.filter.pop();
    }
  }
  destroy() {
    this._renderer = null;
  }
}
FilterPipe.extension = {
  type: [
    ExtensionType.WebGLPipes,
    ExtensionType.WebGPUPipes,
    ExtensionType.CanvasPipes
  ],
  name: "filter"
};

const tempMatrix = new Matrix();
function getFastGlobalBounds(target, bounds) {
  bounds.clear();
  _getGlobalBoundsRecursive(target, bounds);
  if (!bounds.isValid) {
    bounds.set(0, 0, 0, 0);
  }
  if (!target.renderGroup) {
    bounds.applyMatrix(target.parentRenderGroup.worldTransform);
  } else {
    bounds.applyMatrix(target.renderGroup.localTransform);
  }
  return bounds;
}
function _getGlobalBoundsRecursive(target, bounds) {
  if (target.localDisplayStatus !== 7 || !target.measurable) {
    return;
  }
  const manageEffects = !!target.effects.length;
  let localBounds = bounds;
  if (target.renderGroup || manageEffects) {
    localBounds = boundsPool.get().clear();
  }
  if (target.boundsArea) {
    bounds.addRect(target.boundsArea, target.worldTransform);
  } else {
    if (target.renderPipeId) {
      const viewBounds = target.bounds;
      localBounds.addFrame(
        viewBounds.minX,
        viewBounds.minY,
        viewBounds.maxX,
        viewBounds.maxY,
        target.groupTransform
      );
    }
    const children = target.children;
    for (let i = 0; i < children.length; i++) {
      _getGlobalBoundsRecursive(children[i], localBounds);
    }
  }
  if (manageEffects) {
    let advanced = false;
    for (let i = 0; i < target.effects.length; i++) {
      if (target.effects[i].addBounds) {
        if (!advanced) {
          advanced = true;
          localBounds.applyMatrix(target.parentRenderGroup.worldTransform);
        }
        target.effects[i].addBounds(localBounds, true);
      }
    }
    if (advanced) {
      localBounds.applyMatrix(target.parentRenderGroup.worldTransform.copyTo(tempMatrix).invert());
      bounds.addBounds(localBounds, target.relativeGroupTransform);
    }
    bounds.addBounds(localBounds);
    boundsPool.return(localBounds);
  } else if (target.renderGroup) {
    bounds.addBounds(localBounds, target.relativeGroupTransform);
    boundsPool.return(localBounds);
  }
}

function getGlobalRenderableBounds(renderables, bounds) {
  bounds.clear();
  const tempMatrix = bounds.matrix;
  for (let i = 0; i < renderables.length; i++) {
    const renderable = renderables[i];
    if (renderable.globalDisplayStatus < 7) {
      continue;
    }
    bounds.matrix = renderable.worldTransform;
    renderable.addBounds(bounds);
  }
  bounds.matrix = tempMatrix;
  return bounds;
}

const quadGeometry = new Geometry({
  attributes: {
    aPosition: {
      buffer: new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]),
      format: "float32x2",
      stride: 2 * 4,
      offset: 0
    }
  },
  indexBuffer: new Uint32Array([0, 1, 2, 0, 2, 3])
});
class FilterSystem {
  constructor(renderer) {
    this._filterStackIndex = 0;
    this._filterStack = [];
    this._filterGlobalUniforms = new UniformGroup({
      uInputSize: { value: new Float32Array(4), type: "vec4<f32>" },
      uInputPixel: { value: new Float32Array(4), type: "vec4<f32>" },
      uInputClamp: { value: new Float32Array(4), type: "vec4<f32>" },
      uOutputFrame: { value: new Float32Array(4), type: "vec4<f32>" },
      uGlobalFrame: { value: new Float32Array(4), type: "vec4<f32>" },
      uOutputTexture: { value: new Float32Array(4), type: "vec4<f32>" }
    });
    this._globalFilterBindGroup = new BindGroup({});
    this.renderer = renderer;
  }
  /**
   * The back texture of the currently active filter. Requires the filter to have `blendRequired` set to true.
   * @readonly
   */
  get activeBackTexture() {
    return this._activeFilterData?.backTexture;
  }
  push(instruction) {
    const renderer = this.renderer;
    const filters = instruction.filterEffect.filters;
    if (!this._filterStack[this._filterStackIndex]) {
      this._filterStack[this._filterStackIndex] = this._getFilterData();
    }
    const filterData = this._filterStack[this._filterStackIndex];
    this._filterStackIndex++;
    if (filters.length === 0) {
      filterData.skip = true;
      return;
    }
    const bounds = filterData.bounds;
    if (instruction.renderables) {
      getGlobalRenderableBounds(instruction.renderables, bounds);
    } else if (instruction.filterEffect.filterArea) {
      bounds.clear();
      bounds.addRect(instruction.filterEffect.filterArea);
      bounds.applyMatrix(instruction.container.worldTransform);
    } else {
      getFastGlobalBounds(instruction.container, bounds);
    }
    const colorTextureSource = renderer.renderTarget.renderTarget.colorTexture.source;
    let resolution = Infinity;
    let padding = 0;
    let antialias = true;
    let blendRequired = false;
    let enabled = false;
    for (let i = 0; i < filters.length; i++) {
      const filter = filters[i];
      resolution = Math.min(resolution, filter.resolution === "inherit" ? colorTextureSource._resolution : filter.resolution);
      padding += filter.padding;
      if (filter.antialias === "off") {
        antialias = false;
      } else if (filter.antialias === "inherit") {
        antialias && (antialias = colorTextureSource.antialias);
      }
      const isCompatible = !!(filter.compatibleRenderers & renderer.type);
      if (!isCompatible) {
        enabled = false;
        break;
      }
      if (filter.blendRequired && !(renderer.backBuffer?.useBackBuffer ?? true)) {
        warn("Blend filter requires backBuffer on WebGL renderer to be enabled. Set `useBackBuffer: true` in the renderer options.");
        enabled = false;
        break;
      }
      enabled = filter.enabled || enabled;
      blendRequired = blendRequired || filter.blendRequired;
    }
    if (!enabled) {
      filterData.skip = true;
      return;
    }
    const viewPort = renderer.renderTarget.rootViewPort;
    bounds.scale(resolution).fitBounds(0, viewPort.width, 0, viewPort.height).ceil().scale(1 / resolution).pad(padding | 0);
    if (!bounds.isPositive) {
      filterData.skip = true;
      return;
    }
    filterData.skip = false;
    filterData.bounds = bounds;
    filterData.blendRequired = blendRequired;
    filterData.container = instruction.container;
    filterData.filterEffect = instruction.filterEffect;
    filterData.previousRenderSurface = renderer.renderTarget.renderSurface;
    filterData.inputTexture = TexturePool.getOptimalTexture(
      bounds.width,
      bounds.height,
      resolution,
      antialias
    );
    renderer.renderTarget.bind(filterData.inputTexture, true);
    renderer.globalUniforms.push({
      offset: bounds
    });
  }
  pop() {
    const renderer = this.renderer;
    this._filterStackIndex--;
    const filterData = this._filterStack[this._filterStackIndex];
    if (filterData.skip) {
      return;
    }
    this._activeFilterData = filterData;
    const inputTexture = filterData.inputTexture;
    const bounds = filterData.bounds;
    let backTexture = Texture.EMPTY;
    renderer.renderTarget.finishRenderPass();
    if (filterData.blendRequired) {
      const previousBounds = this._filterStackIndex > 0 ? this._filterStack[this._filterStackIndex - 1].bounds : null;
      const renderTarget = renderer.renderTarget.getRenderTarget(filterData.previousRenderSurface);
      backTexture = this.getBackTexture(renderTarget, bounds, previousBounds);
    }
    filterData.backTexture = backTexture;
    const filters = filterData.filterEffect.filters;
    this._globalFilterBindGroup.setResource(inputTexture.source.style, 2);
    this._globalFilterBindGroup.setResource(backTexture.source, 3);
    renderer.globalUniforms.pop();
    if (filters.length === 1) {
      filters[0].apply(this, inputTexture, filterData.previousRenderSurface, false);
      TexturePool.returnTexture(inputTexture);
    } else {
      let flip = filterData.inputTexture;
      let flop = TexturePool.getOptimalTexture(
        bounds.width,
        bounds.height,
        flip.source._resolution,
        false
      );
      let i = 0;
      for (i = 0; i < filters.length - 1; ++i) {
        const filter = filters[i];
        filter.apply(this, flip, flop, true);
        const t = flip;
        flip = flop;
        flop = t;
      }
      filters[i].apply(this, flip, filterData.previousRenderSurface, false);
      TexturePool.returnTexture(flip);
      TexturePool.returnTexture(flop);
    }
    if (filterData.blendRequired) {
      TexturePool.returnTexture(backTexture);
    }
  }
  getBackTexture(lastRenderSurface, bounds, previousBounds) {
    const backgroundResolution = lastRenderSurface.colorTexture.source._resolution;
    const backTexture = TexturePool.getOptimalTexture(
      bounds.width,
      bounds.height,
      backgroundResolution,
      false
    );
    let x = bounds.minX;
    let y = bounds.minY;
    if (previousBounds) {
      x -= previousBounds.minX;
      y -= previousBounds.minY;
    }
    x = Math.floor(x * backgroundResolution);
    y = Math.floor(y * backgroundResolution);
    const width = Math.ceil(bounds.width * backgroundResolution);
    const height = Math.ceil(bounds.height * backgroundResolution);
    this.renderer.renderTarget.copyToTexture(
      lastRenderSurface,
      backTexture,
      { x, y },
      { width, height },
      { x: 0, y: 0 }
    );
    return backTexture;
  }
  applyFilter(filter, input, output, clear) {
    const renderer = this.renderer;
    const filterData = this._filterStack[this._filterStackIndex];
    const bounds = filterData.bounds;
    const offset = Point.shared;
    const previousRenderSurface = filterData.previousRenderSurface;
    const isFinalTarget = previousRenderSurface === output;
    let resolution = this.renderer.renderTarget.rootRenderTarget.colorTexture.source._resolution;
    let currentIndex = this._filterStackIndex - 1;
    while (currentIndex > 0 && this._filterStack[currentIndex].skip) {
      --currentIndex;
    }
    if (currentIndex > 0) {
      resolution = this._filterStack[currentIndex].inputTexture.source._resolution;
    }
    const filterUniforms = this._filterGlobalUniforms;
    const uniforms = filterUniforms.uniforms;
    const outputFrame = uniforms.uOutputFrame;
    const inputSize = uniforms.uInputSize;
    const inputPixel = uniforms.uInputPixel;
    const inputClamp = uniforms.uInputClamp;
    const globalFrame = uniforms.uGlobalFrame;
    const outputTexture = uniforms.uOutputTexture;
    if (isFinalTarget) {
      let lastIndex = this._filterStackIndex;
      while (lastIndex > 0) {
        lastIndex--;
        const filterData2 = this._filterStack[this._filterStackIndex - 1];
        if (!filterData2.skip) {
          offset.x = filterData2.bounds.minX;
          offset.y = filterData2.bounds.minY;
          break;
        }
      }
      outputFrame[0] = bounds.minX - offset.x;
      outputFrame[1] = bounds.minY - offset.y;
    } else {
      outputFrame[0] = 0;
      outputFrame[1] = 0;
    }
    outputFrame[2] = input.frame.width;
    outputFrame[3] = input.frame.height;
    inputSize[0] = input.source.width;
    inputSize[1] = input.source.height;
    inputSize[2] = 1 / inputSize[0];
    inputSize[3] = 1 / inputSize[1];
    inputPixel[0] = input.source.pixelWidth;
    inputPixel[1] = input.source.pixelHeight;
    inputPixel[2] = 1 / inputPixel[0];
    inputPixel[3] = 1 / inputPixel[1];
    inputClamp[0] = 0.5 * inputPixel[2];
    inputClamp[1] = 0.5 * inputPixel[3];
    inputClamp[2] = input.frame.width * inputSize[2] - 0.5 * inputPixel[2];
    inputClamp[3] = input.frame.height * inputSize[3] - 0.5 * inputPixel[3];
    const rootTexture = this.renderer.renderTarget.rootRenderTarget.colorTexture;
    globalFrame[0] = offset.x * resolution;
    globalFrame[1] = offset.y * resolution;
    globalFrame[2] = rootTexture.source.width * resolution;
    globalFrame[3] = rootTexture.source.height * resolution;
    const renderTarget = this.renderer.renderTarget.getRenderTarget(output);
    renderer.renderTarget.bind(output, !!clear);
    if (output instanceof Texture) {
      outputTexture[0] = output.frame.width;
      outputTexture[1] = output.frame.height;
    } else {
      outputTexture[0] = renderTarget.width;
      outputTexture[1] = renderTarget.height;
    }
    outputTexture[2] = renderTarget.isRoot ? -1 : 1;
    filterUniforms.update();
    if (renderer.renderPipes.uniformBatch) {
      const batchUniforms = renderer.renderPipes.uniformBatch.getUboResource(filterUniforms);
      this._globalFilterBindGroup.setResource(batchUniforms, 0);
    } else {
      this._globalFilterBindGroup.setResource(filterUniforms, 0);
    }
    this._globalFilterBindGroup.setResource(input.source, 1);
    this._globalFilterBindGroup.setResource(input.source.style, 2);
    filter.groups[0] = this._globalFilterBindGroup;
    renderer.encoder.draw({
      geometry: quadGeometry,
      shader: filter,
      state: filter._state,
      topology: "triangle-list"
    });
    if (renderer.type === RendererType.WEBGL) {
      renderer.renderTarget.finishRenderPass();
    }
  }
  _getFilterData() {
    return {
      skip: false,
      inputTexture: null,
      bounds: new Bounds(),
      container: null,
      filterEffect: null,
      blendRequired: false,
      previousRenderSurface: null
    };
  }
  /**
   * Multiply _input normalized coordinates_ to this matrix to get _sprite texture normalized coordinates_.
   *
   * Use `outputMatrix * vTextureCoord` in the shader.
   * @param outputMatrix - The matrix to output to.
   * @param {Sprite} sprite - The sprite to map to.
   * @returns The mapped matrix.
   */
  calculateSpriteMatrix(outputMatrix, sprite) {
    const data = this._activeFilterData;
    const mappedMatrix = outputMatrix.set(
      data.inputTexture._source.width,
      0,
      0,
      data.inputTexture._source.height,
      data.bounds.minX,
      data.bounds.minY
    );
    const worldTransform = sprite.worldTransform.copyTo(Matrix.shared);
    worldTransform.invert();
    mappedMatrix.prepend(worldTransform);
    mappedMatrix.scale(
      1 / sprite.texture.frame.width,
      1 / sprite.texture.frame.height
    );
    mappedMatrix.translate(sprite.anchor.x, sprite.anchor.y);
    return mappedMatrix;
  }
}
/** @ignore */
FilterSystem.extension = {
  type: [
    ExtensionType.WebGLSystem,
    ExtensionType.WebGPUSystem
  ],
  name: "filter"
};

class Graphics extends ViewContainer {
  /**
   * @param options - Options for the Graphics.
   */
  constructor(options) {
    if (options instanceof GraphicsContext) {
      options = { context: options };
    }
    const { context, roundPixels, ...rest } = options || {};
    super({
      label: "Graphics",
      ...rest
    });
    this.renderPipeId = "graphics";
    if (!context) {
      this._context = this._ownedContext = new GraphicsContext();
    } else {
      this._context = context;
    }
    this._context.on("update", this.onViewUpdate, this);
    this.allowChildren = false;
    this.roundPixels = roundPixels ?? false;
  }
  set context(context) {
    if (context === this._context)
      return;
    this._context.off("update", this.onViewUpdate, this);
    this._context = context;
    this._context.on("update", this.onViewUpdate, this);
    this.onViewUpdate();
  }
  get context() {
    return this._context;
  }
  /**
   * The local bounds of the graphic.
   * @type {rendering.Bounds}
   */
  get bounds() {
    return this._context.bounds;
  }
  /**
   * Adds the bounds of this object to the bounds object.
   * @param bounds - The output bounds object.
   */
  addBounds(bounds) {
    bounds.addBounds(this._context.bounds);
  }
  /**
   * Checks if the object contains the given point.
   * @param point - The point to check
   */
  containsPoint(point) {
    return this._context.containsPoint(point);
  }
  onViewUpdate() {
    this._didViewChangeTick++;
    this._didGraphicsUpdate = true;
    if (this.didViewUpdate)
      return;
    this.didViewUpdate = true;
    const renderGroup = this.renderGroup || this.parentRenderGroup;
    if (renderGroup) {
      renderGroup.onChildViewUpdate(this);
    }
  }
  /**
   * Destroys this graphics renderable and optionally its context.
   * @param options - Options parameter. A boolean will act as if all options
   *
   * If the context was created by this graphics and `destroy(false)` or `destroy()` is called
   * then the context will still be destroyed.
   *
   * If you want to explicitly not destroy this context that this graphics created,
   * then you should pass destroy({ context: false })
   *
   * If the context was passed in as an argument to the constructor then it will not be destroyed
   * @param {boolean} [options.texture=false] - Should destroy the texture of the graphics context
   * @param {boolean} [options.textureSource=false] - Should destroy the texture source of the graphics context
   * @param {boolean} [options.context=false] - Should destroy the context
   */
  destroy(options) {
    if (this._ownedContext && !options) {
      this._ownedContext.destroy(options);
    } else if (options === true || options?.context === true) {
      this._context.destroy(options);
    }
    this._ownedContext = null;
    this._context = null;
    super.destroy(options);
  }
  _callContextMethod(method, args) {
    this.context[method](...args);
    return this;
  }
  // --------------------------------------- GraphicsContext methods ---------------------------------------
  /**
   * Sets the current fill style of the graphics context. The fill style can be a color, gradient,
   * pattern, or a more complex style defined by a FillStyle object.
   * @param {FillInput} args - The fill style to apply. This can be a simple color, a gradient or
   * pattern object, or a FillStyle or ConvertedFillStyle object.
   * @returns The instance of the current GraphicsContext for method chaining.
   */
  setFillStyle(...args) {
    return this._callContextMethod("setFillStyle", args);
  }
  /**
   * Sets the current stroke style of the graphics context. Similar to fill styles, stroke styles can
   * encompass colors, gradients, patterns, or more detailed configurations via a StrokeStyle object.
   * @param {StrokeInput} args - The stroke style to apply. Can be defined as a color, a gradient or pattern,
   * or a StrokeStyle or ConvertedStrokeStyle object.
   * @returns The instance of the current GraphicsContext for method chaining.
   */
  setStrokeStyle(...args) {
    return this._callContextMethod("setStrokeStyle", args);
  }
  fill(...args) {
    return this._callContextMethod("fill", args);
  }
  /**
   * Strokes the current path with the current stroke style. This method can take an optional
   * FillStyle parameter to define the stroke's appearance, including its color, width, and other properties.
   * @param {FillStyle} args - (Optional) The stroke style to apply. Can be defined as a simple color or a more
   * complex style object. If omitted, uses the current stroke style.
   * @returns The instance of the current GraphicsContext for method chaining.
   */
  stroke(...args) {
    return this._callContextMethod("stroke", args);
  }
  texture(...args) {
    return this._callContextMethod("texture", args);
  }
  /**
   * Resets the current path. Any previous path and its commands are discarded and a new path is
   * started. This is typically called before beginning a new shape or series of drawing commands.
   * @returns The instance of the current GraphicsContext for method chaining.
   */
  beginPath() {
    return this._callContextMethod("beginPath", []);
  }
  /**
   * Applies a cutout to the last drawn shape. This is used to create holes or complex shapes by
   * subtracting a path from the previously drawn path. If a hole is not completely in a shape, it will
   * fail to cut correctly!
   */
  cut() {
    return this._callContextMethod("cut", []);
  }
  arc(...args) {
    return this._callContextMethod("arc", args);
  }
  arcTo(...args) {
    return this._callContextMethod("arcTo", args);
  }
  arcToSvg(...args) {
    return this._callContextMethod("arcToSvg", args);
  }
  bezierCurveTo(...args) {
    return this._callContextMethod("bezierCurveTo", args);
  }
  /**
   * Closes the current path by drawing a straight line back to the start.
   * If the shape is already closed or there are no points in the path, this method does nothing.
   * @returns The instance of the current object for chaining.
   */
  closePath() {
    return this._callContextMethod("closePath", []);
  }
  ellipse(...args) {
    return this._callContextMethod("ellipse", args);
  }
  circle(...args) {
    return this._callContextMethod("circle", args);
  }
  path(...args) {
    return this._callContextMethod("path", args);
  }
  lineTo(...args) {
    return this._callContextMethod("lineTo", args);
  }
  moveTo(...args) {
    return this._callContextMethod("moveTo", args);
  }
  quadraticCurveTo(...args) {
    return this._callContextMethod("quadraticCurveTo", args);
  }
  rect(...args) {
    return this._callContextMethod("rect", args);
  }
  roundRect(...args) {
    return this._callContextMethod("roundRect", args);
  }
  poly(...args) {
    return this._callContextMethod("poly", args);
  }
  regularPoly(...args) {
    return this._callContextMethod("regularPoly", args);
  }
  roundPoly(...args) {
    return this._callContextMethod("roundPoly", args);
  }
  roundShape(...args) {
    return this._callContextMethod("roundShape", args);
  }
  filletRect(...args) {
    return this._callContextMethod("filletRect", args);
  }
  chamferRect(...args) {
    return this._callContextMethod("chamferRect", args);
  }
  star(...args) {
    return this._callContextMethod("star", args);
  }
  svg(...args) {
    return this._callContextMethod("svg", args);
  }
  restore(...args) {
    return this._callContextMethod("restore", args);
  }
  /** Saves the current graphics state, including transformations, fill styles, and stroke styles, onto a stack. */
  save() {
    return this._callContextMethod("save", []);
  }
  /**
   * Returns the current transformation matrix of the graphics context.
   * @returns The current transformation matrix.
   */
  getTransform() {
    return this.context.getTransform();
  }
  /**
   * Resets the current transformation matrix to the identity matrix, effectively removing
   * any transformations (rotation, scaling, translation) previously applied.
   * @returns The instance of the current GraphicsContext for method chaining.
   */
  resetTransform() {
    return this._callContextMethod("resetTransform", []);
  }
  rotateTransform(...args) {
    return this._callContextMethod("rotate", args);
  }
  scaleTransform(...args) {
    return this._callContextMethod("scale", args);
  }
  setTransform(...args) {
    return this._callContextMethod("setTransform", args);
  }
  transform(...args) {
    return this._callContextMethod("transform", args);
  }
  translateTransform(...args) {
    return this._callContextMethod("translate", args);
  }
  /**
   * Clears all drawing commands from the graphics context, effectively resetting it. This includes clearing the path,
   * and optionally resetting transformations to the identity matrix.
   * @returns The instance of the current GraphicsContext for method chaining.
   */
  clear() {
    return this._callContextMethod("clear", []);
  }
  /**
   * The fill style to use.
   * @type {ConvertedFillStyle}
   */
  get fillStyle() {
    return this._context.fillStyle;
  }
  set fillStyle(value) {
    this._context.fillStyle = value;
  }
  /**
   * The stroke style to use.
   * @type {ConvertedStrokeStyle}
   */
  get strokeStyle() {
    return this._context.strokeStyle;
  }
  set strokeStyle(value) {
    this._context.strokeStyle = value;
  }
  /**
   * Creates a new Graphics object.
   * Note that only the context of the object is cloned, not its transform (position,scale,etc)
   * @param deep - Whether to create a deep clone of the graphics object. If false, the context
   * will be shared between the two objects (default false). If true, the context will be
   * cloned (recommended if you need to modify the context in any way).
   * @returns - A clone of the graphics object
   */
  clone(deep = false) {
    if (deep) {
      return new Graphics(this._context.clone());
    }
    this._ownedContext = null;
    const clone = new Graphics(this._context);
    return clone;
  }
  // -------- v7 deprecations ---------
  /**
   * @param width
   * @param color
   * @param alpha
   * @deprecated since 8.0.0 Use {@link Graphics#setStrokeStyle} instead
   */
  lineStyle(width, color, alpha) {
    deprecation(v8_0_0, "Graphics#lineStyle is no longer needed. Use Graphics#setStrokeStyle to set the stroke style.");
    const strokeStyle = {};
    width && (strokeStyle.width = width);
    color && (strokeStyle.color = color);
    alpha && (strokeStyle.alpha = alpha);
    this.context.strokeStyle = strokeStyle;
    return this;
  }
  /**
   * @param color
   * @param alpha
   * @deprecated since 8.0.0 Use {@link Graphics#fill} instead
   */
  beginFill(color, alpha) {
    deprecation(v8_0_0, "Graphics#beginFill is no longer needed. Use Graphics#fill to fill the shape with the desired style.");
    const fillStyle = {};
    color && (fillStyle.color = color);
    alpha && (fillStyle.alpha = alpha);
    this.context.fillStyle = fillStyle;
    return this;
  }
  /**
   * @deprecated since 8.0.0 Use {@link Graphics#fill} instead
   */
  endFill() {
    deprecation(v8_0_0, "Graphics#endFill is no longer needed. Use Graphics#fill to fill the shape with the desired style.");
    this.context.fill();
    const strokeStyle = this.context.strokeStyle;
    if (strokeStyle.width !== GraphicsContext.defaultStrokeStyle.width || strokeStyle.color !== GraphicsContext.defaultStrokeStyle.color || strokeStyle.alpha !== GraphicsContext.defaultStrokeStyle.alpha) {
      this.context.stroke();
    }
    return this;
  }
  /**
   * @param {...any} args
   * @deprecated since 8.0.0 Use {@link Graphics#circle} instead
   */
  drawCircle(...args) {
    deprecation(v8_0_0, "Graphics#drawCircle has been renamed to Graphics#circle");
    return this._callContextMethod("circle", args);
  }
  /**
   * @param {...any} args
   * @deprecated since 8.0.0 Use {@link Graphics#ellipse} instead
   */
  drawEllipse(...args) {
    deprecation(v8_0_0, "Graphics#drawEllipse has been renamed to Graphics#ellipse");
    return this._callContextMethod("ellipse", args);
  }
  /**
   * @param {...any} args
   * @deprecated since 8.0.0 Use {@link Graphics#poly} instead
   */
  drawPolygon(...args) {
    deprecation(v8_0_0, "Graphics#drawPolygon has been renamed to Graphics#poly");
    return this._callContextMethod("poly", args);
  }
  /**
   * @param {...any} args
   * @deprecated since 8.0.0 Use {@link Graphics#rect} instead
   */
  drawRect(...args) {
    deprecation(v8_0_0, "Graphics#drawRect has been renamed to Graphics#rect");
    return this._callContextMethod("rect", args);
  }
  /**
   * @param {...any} args
   * @deprecated since 8.0.0 Use {@link Graphics#roundRect} instead
   */
  drawRoundedRect(...args) {
    deprecation(v8_0_0, "Graphics#drawRoundedRect has been renamed to Graphics#roundRect");
    return this._callContextMethod("roundRect", args);
  }
  /**
   * @param {...any} args
   * @deprecated since 8.0.0 Use {@link Graphics#star} instead
   */
  drawStar(...args) {
    deprecation(v8_0_0, "Graphics#drawStar has been renamed to Graphics#star");
    return this._callContextMethod("star", args);
  }
}

const _MeshGeometry = class _MeshGeometry extends Geometry {
  constructor(...args) {
    let options = args[0] ?? {};
    if (options instanceof Float32Array) {
      deprecation(v8_0_0, "use new MeshGeometry({ positions, uvs, indices }) instead");
      options = {
        positions: options,
        uvs: args[1],
        indices: args[2]
      };
    }
    options = { ..._MeshGeometry.defaultOptions, ...options };
    const positions = options.positions || new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]);
    const uvs = options.uvs || new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]);
    const indices = options.indices || new Uint32Array([0, 1, 2, 0, 2, 3]);
    const shrinkToFit = options.shrinkBuffersToFit;
    const positionBuffer = new Buffer({
      data: positions,
      label: "attribute-mesh-positions",
      shrinkToFit,
      usage: BufferUsage.VERTEX | BufferUsage.COPY_DST
    });
    const uvBuffer = new Buffer({
      data: uvs,
      label: "attribute-mesh-uvs",
      shrinkToFit,
      usage: BufferUsage.VERTEX | BufferUsage.COPY_DST
    });
    const indexBuffer = new Buffer({
      data: indices,
      label: "index-mesh-buffer",
      shrinkToFit,
      usage: BufferUsage.INDEX | BufferUsage.COPY_DST
    });
    super({
      attributes: {
        aPosition: {
          buffer: positionBuffer,
          format: "float32x2",
          stride: 2 * 4,
          offset: 0
        },
        aUV: {
          buffer: uvBuffer,
          format: "float32x2",
          stride: 2 * 4,
          offset: 0
        }
      },
      indexBuffer,
      topology: options.topology
    });
    this.batchMode = "auto";
  }
  /** The positions of the mesh. */
  get positions() {
    return this.attributes.aPosition.buffer.data;
  }
  set positions(value) {
    this.attributes.aPosition.buffer.data = value;
  }
  /** The UVs of the mesh. */
  get uvs() {
    return this.attributes.aUV.buffer.data;
  }
  set uvs(value) {
    this.attributes.aUV.buffer.data = value;
  }
  /** The indices of the mesh. */
  get indices() {
    return this.indexBuffer.data;
  }
  set indices(value) {
    this.indexBuffer.data = value;
  }
};
_MeshGeometry.defaultOptions = {
  topology: "triangle-list",
  shrinkBuffersToFit: false
};
let MeshGeometry = _MeshGeometry;

function textStyleToCSS(style) {
  const stroke = style._stroke;
  const fill = style._fill;
  const cssStyleString = [
    `color: ${Color.shared.setValue(fill.color).toHex()}`,
    `font-size: ${style.fontSize}px`,
    `font-family: ${style.fontFamily}`,
    `font-weight: ${style.fontWeight}`,
    `font-style: ${style.fontStyle}`,
    `font-variant: ${style.fontVariant}`,
    `letter-spacing: ${style.letterSpacing}px`,
    `text-align: ${style.align}`,
    `padding: ${style.padding}px`,
    `white-space: ${style.whiteSpace === "pre" && style.wordWrap ? "pre-wrap" : style.whiteSpace}`,
    ...style.lineHeight ? [`line-height: ${style.lineHeight}px`] : [],
    ...style.wordWrap ? [
      `word-wrap: ${style.breakWords ? "break-all" : "break-word"}`,
      `max-width: ${style.wordWrapWidth}px`
    ] : [],
    ...stroke ? [strokeToCSS(stroke)] : [],
    ...style.dropShadow ? [dropShadowToCSS(style.dropShadow)] : [],
    ...style.cssOverrides
  ].join(";");
  const cssStyles = [`div { ${cssStyleString} }`];
  tagStyleToCSS(style.tagStyles, cssStyles);
  return cssStyles.join(" ");
}
function dropShadowToCSS(dropShadowStyle) {
  const color = Color.shared.setValue(dropShadowStyle.color).setAlpha(dropShadowStyle.alpha).toHexa();
  const x = Math.round(Math.cos(dropShadowStyle.angle) * dropShadowStyle.distance);
  const y = Math.round(Math.sin(dropShadowStyle.angle) * dropShadowStyle.distance);
  const position = `${x}px ${y}px`;
  if (dropShadowStyle.blur > 0) {
    return `text-shadow: ${position} ${dropShadowStyle.blur}px ${color}`;
  }
  return `text-shadow: ${position} ${color}`;
}
function strokeToCSS(stroke) {
  return [
    `-webkit-text-stroke-width: ${stroke.width}px`,
    `-webkit-text-stroke-color: ${Color.shared.setValue(stroke.color).toHex()}`,
    `text-stroke-width: ${stroke.width}px`,
    `text-stroke-color: ${Color.shared.setValue(stroke.color).toHex()}`,
    "paint-order: stroke"
  ].join(";");
}
const templates = {
  fontSize: `font-size: {{VALUE}}px`,
  fontFamily: `font-family: {{VALUE}}`,
  fontWeight: `font-weight: {{VALUE}}`,
  fontStyle: `font-style: {{VALUE}}`,
  fontVariant: `font-variant: {{VALUE}}`,
  letterSpacing: `letter-spacing: {{VALUE}}px`,
  align: `text-align: {{VALUE}}`,
  padding: `padding: {{VALUE}}px`,
  whiteSpace: `white-space: {{VALUE}}`,
  lineHeight: `line-height: {{VALUE}}px`,
  wordWrapWidth: `max-width: {{VALUE}}px`
};
const transform = {
  fill: (value) => `color: ${Color.shared.setValue(value).toHex()}`,
  breakWords: (value) => `word-wrap: ${value ? "break-all" : "break-word"}`,
  stroke: strokeToCSS,
  dropShadow: dropShadowToCSS
};
function tagStyleToCSS(tagStyles, out) {
  for (const i in tagStyles) {
    const tagStyle = tagStyles[i];
    const cssTagStyle = [];
    for (const j in tagStyle) {
      if (transform[j]) {
        cssTagStyle.push(transform[j](tagStyle[j]));
      } else if (templates[j]) {
        cssTagStyle.push(templates[j].replace("{{VALUE}}", tagStyle[j]));
      }
    }
    out.push(`${i} { ${cssTagStyle.join(";")} }`);
  }
}

class HTMLTextStyle extends TextStyle {
  constructor(options = {}) {
    super(options);
    this._cssOverrides = [];
    this.cssOverrides ?? (this.cssOverrides = options.cssOverrides);
    this.tagStyles = options.tagStyles ?? {};
  }
  /** List of style overrides that will be applied to the HTML text. */
  set cssOverrides(value) {
    this._cssOverrides = value instanceof Array ? value : [value];
    this.update();
  }
  get cssOverrides() {
    return this._cssOverrides;
  }
  _generateKey() {
    this._styleKey = generateTextStyleKey(this) + this._cssOverrides.join("-");
    return this._styleKey;
  }
  update() {
    this._cssStyle = null;
    super.update();
  }
  /**
   * Creates a new HTMLTextStyle object with the same values as this one.
   * @returns New cloned HTMLTextStyle object
   */
  clone() {
    return new HTMLTextStyle({
      align: this.align,
      breakWords: this.breakWords,
      dropShadow: this.dropShadow ? { ...this.dropShadow } : null,
      fill: this._fill,
      fontFamily: this.fontFamily,
      fontSize: this.fontSize,
      fontStyle: this.fontStyle,
      fontVariant: this.fontVariant,
      fontWeight: this.fontWeight,
      letterSpacing: this.letterSpacing,
      lineHeight: this.lineHeight,
      padding: this.padding,
      stroke: this._stroke,
      whiteSpace: this.whiteSpace,
      wordWrap: this.wordWrap,
      wordWrapWidth: this.wordWrapWidth,
      cssOverrides: this.cssOverrides
    });
  }
  get cssStyle() {
    if (!this._cssStyle) {
      this._cssStyle = textStyleToCSS(this);
    }
    return this._cssStyle;
  }
  /**
   * Add a style override, this can be any CSS property
   * it will override any built-in style. This is the
   * property and the value as a string (e.g., `color: red`).
   * This will override any other internal style.
   * @param {string} value - CSS style(s) to add.
   * @example
   * style.addOverride('background-color: red');
   */
  addOverride(...value) {
    const toAdd = value.filter((v) => !this.cssOverrides.includes(v));
    if (toAdd.length > 0) {
      this.cssOverrides.push(...toAdd);
      this.update();
    }
  }
  /**
   * Remove any overrides that match the value.
   * @param {string} value - CSS style to remove.
   * @example
   * style.removeOverride('background-color: red');
   */
  removeOverride(...value) {
    const toRemove = value.filter((v) => this.cssOverrides.includes(v));
    if (toRemove.length > 0) {
      this.cssOverrides = this.cssOverrides.filter((v) => !toRemove.includes(v));
      this.update();
    }
  }
  set fill(value) {
    if (typeof value !== "string" && typeof value !== "number") {
      warn("[HTMLTextStyle] only color fill is not supported by HTMLText");
    }
    super.fill = value;
  }
  set stroke(value) {
    if (value && typeof value !== "string" && typeof value !== "number") {
      warn("[HTMLTextStyle] only color stroke is not supported by HTMLText");
    }
    super.stroke = value;
  }
}

const nssvg = "http://www.w3.org/2000/svg";
const nsxhtml = "http://www.w3.org/1999/xhtml";
class HTMLTextRenderData {
  constructor() {
    this.svgRoot = document.createElementNS(nssvg, "svg");
    this.foreignObject = document.createElementNS(nssvg, "foreignObject");
    this.domElement = document.createElementNS(nsxhtml, "div");
    this.styleElement = document.createElementNS(nsxhtml, "style");
    this.image = new Image();
    const { foreignObject, svgRoot, styleElement, domElement } = this;
    foreignObject.setAttribute("width", "10000");
    foreignObject.setAttribute("height", "10000");
    foreignObject.style.overflow = "hidden";
    svgRoot.appendChild(foreignObject);
    foreignObject.appendChild(styleElement);
    foreignObject.appendChild(domElement);
  }
}

let tempHTMLTextRenderData;
function measureHtmlText(text, style, fontStyleCSS, htmlTextRenderData) {
  htmlTextRenderData = htmlTextRenderData || tempHTMLTextRenderData || (tempHTMLTextRenderData = new HTMLTextRenderData());
  const { domElement, styleElement, svgRoot } = htmlTextRenderData;
  domElement.innerHTML = `<style>${style.cssStyle};</style><div style='padding:0'>${text}</div>`;
  domElement.setAttribute("style", "transform-origin: top left; display: inline-block");
  if (fontStyleCSS) {
    styleElement.textContent = fontStyleCSS;
  }
  document.body.appendChild(svgRoot);
  const contentBounds = domElement.getBoundingClientRect();
  svgRoot.remove();
  const descenderPadding = CanvasTextMetrics.measureFont(style.fontStyle).descent;
  const doublePadding = style.padding * 2;
  return {
    width: contentBounds.width - doublePadding,
    height: contentBounds.height + descenderPadding - doublePadding
  };
}

const localUniformBit = {
  name: "local-uniform-bit",
  vertex: {
    header: (
      /* wgsl */
      `

            struct LocalUniforms {
                uTransformMatrix:mat3x3<f32>,
                uColor:vec4<f32>,
                uRound:f32,
            }

            @group(1) @binding(0) var<uniform> localUniforms : LocalUniforms;
        `
    ),
    main: (
      /* wgsl */
      `
            vColor *= localUniforms.uColor;
            modelMatrix *= localUniforms.uTransformMatrix;
        `
    ),
    end: (
      /* wgsl */
      `
            if(localUniforms.uRound == 1)
            {
                vPosition = vec4(roundPixels(vPosition.xy, globalUniforms.uResolution), vPosition.zw);
            }
        `
    )
  }
};
({
  ...localUniformBit,
  vertex: {
    ...localUniformBit.vertex,
    // replace the group!
    header: localUniformBit.vertex.header.replace("group(1)", "group(2)")
  }
});
const localUniformBitGl = {
  name: "local-uniform-bit",
  vertex: {
    header: (
      /* glsl */
      `

            uniform mat3 uTransformMatrix;
            uniform vec4 uColor;
            uniform float uRound;
        `
    ),
    main: (
      /* glsl */
      `
            vColor *= uColor;
            modelMatrix = uTransformMatrix;
        `
    ),
    end: (
      /* glsl */
      `
            if(uRound == 1.)
            {
                gl_Position.xy = roundPixels(gl_Position.xy, uResolution);
            }
        `
    )
  }
};

class BatchableSprite {
  constructor() {
    this.batcherName = "default";
    // batch specific..
    this.attributeSize = 4;
    this.indexSize = 6;
    this.packAsQuad = true;
    this.roundPixels = 0;
    this._attributeStart = 0;
    // location in the buffer
    this._batcher = null;
    this._batch = null;
  }
  get blendMode() {
    return this.renderable.groupBlendMode;
  }
  get color() {
    return this.renderable.groupColorAlpha;
  }
  reset() {
    this.renderable = null;
    this.texture = null;
    this._batcher = null;
    this._batch = null;
    this.bounds = null;
  }
}

function color32BitToUniform(abgr, out, offset) {
  const alpha = (abgr >> 24 & 255) / 255;
  out[offset++] = (abgr & 255) / 255 * alpha;
  out[offset++] = (abgr >> 8 & 255) / 255 * alpha;
  out[offset++] = (abgr >> 16 & 255) / 255 * alpha;
  out[offset++] = alpha;
}

class GraphicsPipe {
  constructor(renderer, adaptor) {
    this.state = State.for2d();
    // batchable graphics list, used to render batches
    this._graphicsBatchesHash = /* @__PURE__ */ Object.create(null);
    this._destroyRenderableBound = this.destroyRenderable.bind(this);
    this.renderer = renderer;
    this._adaptor = adaptor;
    this._adaptor.init();
  }
  validateRenderable(graphics) {
    const context = graphics.context;
    const wasBatched = !!this._graphicsBatchesHash[graphics.uid];
    const gpuContext = this.renderer.graphicsContext.updateGpuContext(context);
    if (gpuContext.isBatchable || wasBatched !== gpuContext.isBatchable) {
      return true;
    }
    return false;
  }
  addRenderable(graphics, instructionSet) {
    const gpuContext = this.renderer.graphicsContext.updateGpuContext(graphics.context);
    if (graphics._didGraphicsUpdate) {
      graphics._didGraphicsUpdate = false;
      this._rebuild(graphics);
    }
    if (gpuContext.isBatchable) {
      this._addToBatcher(graphics, instructionSet);
    } else {
      this.renderer.renderPipes.batch.break(instructionSet);
      instructionSet.add(graphics);
    }
  }
  updateRenderable(graphics) {
    const batches = this._graphicsBatchesHash[graphics.uid];
    if (batches) {
      for (let i = 0; i < batches.length; i++) {
        const batch = batches[i];
        batch._batcher.updateElement(batch);
      }
    }
  }
  destroyRenderable(graphics) {
    if (this._graphicsBatchesHash[graphics.uid]) {
      this._removeBatchForRenderable(graphics.uid);
    }
    graphics.off("destroyed", this._destroyRenderableBound);
  }
  execute(graphics) {
    if (!graphics.isRenderable)
      return;
    const renderer = this.renderer;
    const context = graphics.context;
    const contextSystem = renderer.graphicsContext;
    if (!contextSystem.getGpuContext(context).batches.length) {
      return;
    }
    const shader = context.customShader || this._adaptor.shader;
    this.state.blendMode = graphics.groupBlendMode;
    const localUniforms = shader.resources.localUniforms.uniforms;
    localUniforms.uTransformMatrix = graphics.groupTransform;
    localUniforms.uRound = renderer._roundPixels | graphics._roundPixels;
    color32BitToUniform(
      graphics.groupColorAlpha,
      localUniforms.uColor,
      0
    );
    this._adaptor.execute(this, graphics);
  }
  _rebuild(graphics) {
    const wasBatched = !!this._graphicsBatchesHash[graphics.uid];
    const gpuContext = this.renderer.graphicsContext.updateGpuContext(graphics.context);
    if (wasBatched) {
      this._removeBatchForRenderable(graphics.uid);
    }
    if (gpuContext.isBatchable) {
      this._initBatchesForRenderable(graphics);
    }
    graphics.batched = gpuContext.isBatchable;
  }
  _addToBatcher(graphics, instructionSet) {
    const batchPipe = this.renderer.renderPipes.batch;
    const batches = this._getBatchesForRenderable(graphics);
    for (let i = 0; i < batches.length; i++) {
      const batch = batches[i];
      batchPipe.addToBatch(batch, instructionSet);
    }
  }
  _getBatchesForRenderable(graphics) {
    return this._graphicsBatchesHash[graphics.uid] || this._initBatchesForRenderable(graphics);
  }
  _initBatchesForRenderable(graphics) {
    const context = graphics.context;
    const gpuContext = this.renderer.graphicsContext.getGpuContext(context);
    const roundPixels = this.renderer._roundPixels | graphics._roundPixels;
    const batches = gpuContext.batches.map((batch) => {
      const batchClone = BigPool.get(BatchableGraphics);
      batch.copyTo(batchClone);
      batchClone.renderable = graphics;
      batchClone.roundPixels = roundPixels;
      return batchClone;
    });
    if (this._graphicsBatchesHash[graphics.uid] === void 0) {
      graphics.on("destroyed", this._destroyRenderableBound);
    }
    this._graphicsBatchesHash[graphics.uid] = batches;
    return batches;
  }
  _removeBatchForRenderable(graphicsUid) {
    this._graphicsBatchesHash[graphicsUid].forEach((batch) => {
      BigPool.return(batch);
    });
    this._graphicsBatchesHash[graphicsUid] = null;
  }
  destroy() {
    this.renderer = null;
    this._adaptor.destroy();
    this._adaptor = null;
    this.state = null;
    for (const i in this._graphicsBatchesHash) {
      this._removeBatchForRenderable(i);
    }
    this._graphicsBatchesHash = null;
  }
}
/** @ignore */
GraphicsPipe.extension = {
  type: [
    ExtensionType.WebGLPipes,
    ExtensionType.WebGPUPipes,
    ExtensionType.CanvasPipes
  ],
  name: "graphics"
};

const _PlaneGeometry = class _PlaneGeometry extends MeshGeometry {
  constructor(...args) {
    super({});
    let options = args[0] ?? {};
    if (typeof options === "number") {
      deprecation(v8_0_0, "PlaneGeometry constructor changed please use { width, height, verticesX, verticesY } instead");
      options = {
        width: options,
        height: args[1],
        verticesX: args[2],
        verticesY: args[3]
      };
    }
    this.build(options);
  }
  /**
   * Refreshes plane coordinates
   * @param options - Options to be applied to plane geometry
   */
  build(options) {
    options = { ..._PlaneGeometry.defaultOptions, ...options };
    this.verticesX = this.verticesX ?? options.verticesX;
    this.verticesY = this.verticesY ?? options.verticesY;
    this.width = this.width ?? options.width;
    this.height = this.height ?? options.height;
    const total = this.verticesX * this.verticesY;
    const verts = [];
    const uvs = [];
    const indices = [];
    const verticesX = this.verticesX - 1;
    const verticesY = this.verticesY - 1;
    const sizeX = this.width / verticesX;
    const sizeY = this.height / verticesY;
    for (let i = 0; i < total; i++) {
      const x = i % this.verticesX;
      const y = i / this.verticesX | 0;
      verts.push(x * sizeX, y * sizeY);
      uvs.push(x / verticesX, y / verticesY);
    }
    const totalSub = verticesX * verticesY;
    for (let i = 0; i < totalSub; i++) {
      const xpos = i % verticesX;
      const ypos = i / verticesX | 0;
      const value = ypos * this.verticesX + xpos;
      const value2 = ypos * this.verticesX + xpos + 1;
      const value3 = (ypos + 1) * this.verticesX + xpos;
      const value4 = (ypos + 1) * this.verticesX + xpos + 1;
      indices.push(
        value,
        value2,
        value3,
        value2,
        value4,
        value3
      );
    }
    this.buffers[0].data = new Float32Array(verts);
    this.buffers[1].data = new Float32Array(uvs);
    this.indexBuffer.data = new Uint32Array(indices);
    this.buffers[0].update();
    this.buffers[1].update();
    this.indexBuffer.update();
  }
};
_PlaneGeometry.defaultOptions = {
  width: 100,
  height: 100,
  verticesX: 10,
  verticesY: 10
};
let PlaneGeometry = _PlaneGeometry;

class BatchableMesh {
  constructor() {
    this.batcherName = "default";
    this.packAsQuad = false;
    this.indexOffset = 0;
    this.attributeOffset = 0;
    this.roundPixels = 0;
    this._batcher = null;
    this._batch = null;
    this._uvUpdateId = -1;
    this._textureMatrixUpdateId = -1;
  }
  get blendMode() {
    return this.renderable.groupBlendMode;
  }
  reset() {
    this.renderable = null;
    this.texture = null;
    this._batcher = null;
    this._batch = null;
    this.geometry = null;
    this._uvUpdateId = -1;
    this._textureMatrixUpdateId = -1;
  }
  get uvs() {
    const geometry = this.geometry;
    const uvBuffer = geometry.getBuffer("aUV");
    const uvs = uvBuffer.data;
    let transformedUvs = uvs;
    const textureMatrix = this.texture.textureMatrix;
    if (!textureMatrix.isSimple) {
      transformedUvs = this._transformedUvs;
      if (this._textureMatrixUpdateId !== textureMatrix._updateID || this._uvUpdateId !== uvBuffer._updateID) {
        if (!transformedUvs || transformedUvs.length < uvs.length) {
          transformedUvs = this._transformedUvs = new Float32Array(uvs.length);
        }
        this._textureMatrixUpdateId = textureMatrix._updateID;
        this._uvUpdateId = uvBuffer._updateID;
        textureMatrix.multiplyUvs(uvs, transformedUvs);
      }
    }
    return transformedUvs;
  }
  get positions() {
    return this.geometry.positions;
  }
  get indices() {
    return this.geometry.indices;
  }
  get color() {
    return this.renderable.groupColorAlpha;
  }
  get groupTransform() {
    return this.renderable.groupTransform;
  }
  get attributeSize() {
    return this.geometry.positions.length / 2;
  }
  get indexSize() {
    return this.geometry.indices.length;
  }
}

class MeshPipe {
  constructor(renderer, adaptor) {
    this.localUniforms = new UniformGroup({
      uTransformMatrix: { value: new Matrix(), type: "mat3x3<f32>" },
      uColor: { value: new Float32Array([1, 1, 1, 1]), type: "vec4<f32>" },
      uRound: { value: 0, type: "f32" }
    });
    this.localUniformsBindGroup = new BindGroup({
      0: this.localUniforms
    });
    this._meshDataHash = /* @__PURE__ */ Object.create(null);
    this._gpuBatchableMeshHash = /* @__PURE__ */ Object.create(null);
    this._destroyRenderableBound = this.destroyRenderable.bind(this);
    this.renderer = renderer;
    this._adaptor = adaptor;
    this._adaptor.init();
  }
  validateRenderable(mesh) {
    const meshData = this._getMeshData(mesh);
    const wasBatched = meshData.batched;
    const isBatched = mesh.batched;
    meshData.batched = isBatched;
    if (wasBatched !== isBatched) {
      return true;
    } else if (isBatched) {
      const geometry = mesh._geometry;
      if (geometry.indices.length !== meshData.indexSize || geometry.positions.length !== meshData.vertexSize) {
        meshData.indexSize = geometry.indices.length;
        meshData.vertexSize = geometry.positions.length;
        return true;
      }
      const batchableMesh = this._getBatchableMesh(mesh);
      const texture = mesh.texture;
      if (batchableMesh.texture._source !== texture._source) {
        if (batchableMesh.texture._source !== texture._source) {
          return !batchableMesh._batcher.checkAndUpdateTexture(batchableMesh, texture);
        }
      }
    }
    return false;
  }
  addRenderable(mesh, instructionSet) {
    const batcher = this.renderer.renderPipes.batch;
    const { batched } = this._getMeshData(mesh);
    if (batched) {
      const gpuBatchableMesh = this._getBatchableMesh(mesh);
      gpuBatchableMesh.texture = mesh._texture;
      gpuBatchableMesh.geometry = mesh._geometry;
      batcher.addToBatch(gpuBatchableMesh, instructionSet);
    } else {
      batcher.break(instructionSet);
      instructionSet.add(mesh);
    }
  }
  updateRenderable(mesh) {
    if (mesh.batched) {
      const gpuBatchableMesh = this._gpuBatchableMeshHash[mesh.uid];
      gpuBatchableMesh.texture = mesh._texture;
      gpuBatchableMesh.geometry = mesh._geometry;
      gpuBatchableMesh._batcher.updateElement(gpuBatchableMesh);
    }
  }
  destroyRenderable(mesh) {
    this._meshDataHash[mesh.uid] = null;
    const gpuMesh = this._gpuBatchableMeshHash[mesh.uid];
    if (gpuMesh) {
      BigPool.return(gpuMesh);
      this._gpuBatchableMeshHash[mesh.uid] = null;
    }
    mesh.off("destroyed", this._destroyRenderableBound);
  }
  execute(mesh) {
    if (!mesh.isRenderable)
      return;
    mesh.state.blendMode = getAdjustedBlendModeBlend(mesh.groupBlendMode, mesh.texture._source);
    const localUniforms = this.localUniforms;
    localUniforms.uniforms.uTransformMatrix = mesh.groupTransform;
    localUniforms.uniforms.uRound = this.renderer._roundPixels | mesh._roundPixels;
    localUniforms.update();
    color32BitToUniform(
      mesh.groupColorAlpha,
      localUniforms.uniforms.uColor,
      0
    );
    this._adaptor.execute(this, mesh);
  }
  _getMeshData(mesh) {
    return this._meshDataHash[mesh.uid] || this._initMeshData(mesh);
  }
  _initMeshData(mesh) {
    this._meshDataHash[mesh.uid] = {
      batched: mesh.batched,
      indexSize: mesh._geometry.indices?.length,
      vertexSize: mesh._geometry.positions?.length
    };
    mesh.on("destroyed", this._destroyRenderableBound);
    return this._meshDataHash[mesh.uid];
  }
  _getBatchableMesh(mesh) {
    return this._gpuBatchableMeshHash[mesh.uid] || this._initBatchableMesh(mesh);
  }
  _initBatchableMesh(mesh) {
    const gpuMesh = BigPool.get(BatchableMesh);
    gpuMesh.renderable = mesh;
    gpuMesh.texture = mesh._texture;
    gpuMesh.transform = mesh.groupTransform;
    gpuMesh.roundPixels = this.renderer._roundPixels | mesh._roundPixels;
    this._gpuBatchableMeshHash[mesh.uid] = gpuMesh;
    return gpuMesh;
  }
  destroy() {
    for (const i in this._gpuBatchableMeshHash) {
      if (this._gpuBatchableMeshHash[i]) {
        BigPool.return(this._gpuBatchableMeshHash[i]);
      }
    }
    this._gpuBatchableMeshHash = null;
    this._meshDataHash = null;
    this.localUniforms = null;
    this.localUniformsBindGroup = null;
    this._adaptor.destroy();
    this._adaptor = null;
    this.renderer = null;
  }
}
/** @ignore */
MeshPipe.extension = {
  type: [
    ExtensionType.WebGLPipes,
    ExtensionType.WebGPUPipes,
    ExtensionType.CanvasPipes
  ],
  name: "mesh"
};

const _NineSliceGeometry = class _NineSliceGeometry extends PlaneGeometry {
  constructor(options = {}) {
    options = { ..._NineSliceGeometry.defaultOptions, ...options };
    super({
      width: options.width,
      height: options.height,
      verticesX: 4,
      verticesY: 4
    });
    this.update(options);
  }
  /**
   * Updates the NineSliceGeometry with the options.
   * @param options - The options of the NineSliceGeometry.
   */
  update(options) {
    this.width = options.width ?? this.width;
    this.height = options.height ?? this.height;
    this._originalWidth = options.originalWidth ?? this._originalWidth;
    this._originalHeight = options.originalHeight ?? this._originalHeight;
    this._leftWidth = options.leftWidth ?? this._leftWidth;
    this._rightWidth = options.rightWidth ?? this._rightWidth;
    this._topHeight = options.topHeight ?? this._topHeight;
    this._bottomHeight = options.bottomHeight ?? this._bottomHeight;
    this.updateUvs();
    this.updatePositions();
  }
  /** Updates the positions of the vertices. */
  updatePositions() {
    const positions = this.positions;
    const w = this._leftWidth + this._rightWidth;
    const scaleW = this.width > w ? 1 : this.width / w;
    const h = this._topHeight + this._bottomHeight;
    const scaleH = this.height > h ? 1 : this.height / h;
    const scale = Math.min(scaleW, scaleH);
    positions[9] = positions[11] = positions[13] = positions[15] = this._topHeight * scale;
    positions[17] = positions[19] = positions[21] = positions[23] = this.height - this._bottomHeight * scale;
    positions[25] = positions[27] = positions[29] = positions[31] = this.height;
    positions[2] = positions[10] = positions[18] = positions[26] = this._leftWidth * scale;
    positions[4] = positions[12] = positions[20] = positions[28] = this.width - this._rightWidth * scale;
    positions[6] = positions[14] = positions[22] = positions[30] = this.width;
    this.getBuffer("aPosition").update();
  }
  /** Updates the UVs of the vertices. */
  updateUvs() {
    const uvs = this.uvs;
    uvs[0] = uvs[8] = uvs[16] = uvs[24] = 0;
    uvs[1] = uvs[3] = uvs[5] = uvs[7] = 0;
    uvs[6] = uvs[14] = uvs[22] = uvs[30] = 1;
    uvs[25] = uvs[27] = uvs[29] = uvs[31] = 1;
    const _uvw = 1 / this._originalWidth;
    const _uvh = 1 / this._originalHeight;
    uvs[2] = uvs[10] = uvs[18] = uvs[26] = _uvw * this._leftWidth;
    uvs[9] = uvs[11] = uvs[13] = uvs[15] = _uvh * this._topHeight;
    uvs[4] = uvs[12] = uvs[20] = uvs[28] = 1 - _uvw * this._rightWidth;
    uvs[17] = uvs[19] = uvs[21] = uvs[23] = 1 - _uvh * this._bottomHeight;
    this.getBuffer("aUV").update();
  }
};
/** The default options for the NineSliceGeometry. */
_NineSliceGeometry.defaultOptions = {
  /** The width of the NineSlicePlane, setting this will actually modify the vertices and UV's of this plane. */
  width: 100,
  /** The height of the NineSlicePlane, setting this will actually modify the vertices and UV's of this plane. */
  height: 100,
  /** The width of the left column. */
  leftWidth: 10,
  /** The height of the top row. */
  topHeight: 10,
  /** The width of the right column. */
  rightWidth: 10,
  /** The height of the bottom row. */
  bottomHeight: 10,
  /** The original width of the texture */
  originalWidth: 100,
  /** The original height of the texture */
  originalHeight: 100
};
let NineSliceGeometry = _NineSliceGeometry;

class NineSliceSpritePipe {
  constructor(renderer) {
    this._gpuSpriteHash = /* @__PURE__ */ Object.create(null);
    this._destroyRenderableBound = this.destroyRenderable.bind(this);
    this._renderer = renderer;
  }
  addRenderable(sprite, instructionSet) {
    const gpuSprite = this._getGpuSprite(sprite);
    if (sprite._didSpriteUpdate)
      this._updateBatchableSprite(sprite, gpuSprite);
    this._renderer.renderPipes.batch.addToBatch(gpuSprite, instructionSet);
  }
  updateRenderable(sprite) {
    const gpuSprite = this._gpuSpriteHash[sprite.uid];
    if (sprite._didSpriteUpdate)
      this._updateBatchableSprite(sprite, gpuSprite);
    gpuSprite._batcher.updateElement(gpuSprite);
  }
  validateRenderable(sprite) {
    const texture = sprite._texture;
    const gpuSprite = this._getGpuSprite(sprite);
    if (gpuSprite.texture._source !== texture._source) {
      return !gpuSprite._batcher.checkAndUpdateTexture(gpuSprite, texture);
    }
    return false;
  }
  destroyRenderable(sprite) {
    const batchableMesh = this._gpuSpriteHash[sprite.uid];
    BigPool.return(batchableMesh.geometry);
    BigPool.return(batchableMesh);
    this._gpuSpriteHash[sprite.uid] = null;
    sprite.off("destroyed", this._destroyRenderableBound);
  }
  _updateBatchableSprite(sprite, batchableSprite) {
    sprite._didSpriteUpdate = false;
    batchableSprite.geometry.update(sprite);
    batchableSprite.texture = sprite._texture;
  }
  _getGpuSprite(sprite) {
    return this._gpuSpriteHash[sprite.uid] || this._initGPUSprite(sprite);
  }
  _initGPUSprite(sprite) {
    const batchableMesh = BigPool.get(BatchableMesh);
    batchableMesh.geometry = BigPool.get(NineSliceGeometry);
    batchableMesh.renderable = sprite;
    batchableMesh.transform = sprite.groupTransform;
    batchableMesh.texture = sprite._texture;
    batchableMesh.roundPixels = this._renderer._roundPixels | sprite._roundPixels;
    sprite._didSpriteUpdate = true;
    this._gpuSpriteHash[sprite.uid] = batchableMesh;
    sprite.on("destroyed", this._destroyRenderableBound);
    return batchableMesh;
  }
  destroy() {
    for (const i in this._gpuSpriteHash) {
      const batchableMesh = this._gpuSpriteHash[i];
      batchableMesh.geometry.destroy();
    }
    this._gpuSpriteHash = null;
    this._renderer = null;
  }
}
/** @ignore */
NineSliceSpritePipe.extension = {
  type: [
    ExtensionType.WebGLPipes,
    ExtensionType.WebGPUPipes,
    ExtensionType.CanvasPipes
  ],
  name: "nineSliceSprite"
};

const tilingBit = {
  name: "tiling-bit",
  vertex: {
    header: (
      /* wgsl */
      `
            struct TilingUniforms {
                uMapCoord:mat3x3<f32>,
                uClampFrame:vec4<f32>,
                uClampOffset:vec2<f32>,
                uTextureTransform:mat3x3<f32>,
                uSizeAnchor:vec4<f32>
            };

            @group(2) @binding(0) var<uniform> tilingUniforms: TilingUniforms;
            @group(2) @binding(1) var uTexture: texture_2d<f32>;
            @group(2) @binding(2) var uSampler: sampler;
        `
    ),
    main: (
      /* wgsl */
      `
            uv = (tilingUniforms.uTextureTransform * vec3(uv, 1.0)).xy;

            position = (position - tilingUniforms.uSizeAnchor.zw) * tilingUniforms.uSizeAnchor.xy;
        `
    )
  },
  fragment: {
    header: (
      /* wgsl */
      `
            struct TilingUniforms {
                uMapCoord:mat3x3<f32>,
                uClampFrame:vec4<f32>,
                uClampOffset:vec2<f32>,
                uTextureTransform:mat3x3<f32>,
                uSizeAnchor:vec4<f32>
            };

            @group(2) @binding(0) var<uniform> tilingUniforms: TilingUniforms;
            @group(2) @binding(1) var uTexture: texture_2d<f32>;
            @group(2) @binding(2) var uSampler: sampler;
        `
    ),
    main: (
      /* wgsl */
      `

            var coord = vUV + ceil(tilingUniforms.uClampOffset - vUV);
            coord = (tilingUniforms.uMapCoord * vec3(coord, 1.0)).xy;
            var unclamped = coord;
            coord = clamp(coord, tilingUniforms.uClampFrame.xy, tilingUniforms.uClampFrame.zw);

            var bias = 0.;

            if(unclamped.x == coord.x && unclamped.y == coord.y)
            {
                bias = -32.;
            } 

            outColor = textureSampleBias(uTexture, uSampler, coord, bias);
        `
    )
  }
};
const tilingBitGl = {
  name: "tiling-bit",
  vertex: {
    header: (
      /* glsl */
      `
            uniform mat3 uTextureTransform;
            uniform vec4 uSizeAnchor;
        
        `
    ),
    main: (
      /* glsl */
      `
            uv = (uTextureTransform * vec3(aUV, 1.0)).xy;

            position = (position - uSizeAnchor.zw) * uSizeAnchor.xy;
        `
    )
  },
  fragment: {
    header: (
      /* glsl */
      `
            uniform sampler2D uTexture;
            uniform mat3 uMapCoord;
            uniform vec4 uClampFrame;
            uniform vec2 uClampOffset;
        `
    ),
    main: (
      /* glsl */
      `

        vec2 coord = vUV + ceil(uClampOffset - vUV);
        coord = (uMapCoord * vec3(coord, 1.0)).xy;
        vec2 unclamped = coord;
        coord = clamp(coord, uClampFrame.xy, uClampFrame.zw);
        
        outColor = texture(uTexture, coord, unclamped == coord ? 0.0 : -32.0);// lod-bias very negative to force lod 0
    
        `
    )
  }
};

let gpuProgram$1;
let glProgram$1;
class TilingSpriteShader extends Shader {
  constructor() {
    gpuProgram$1 ?? (gpuProgram$1 = compileHighShaderGpuProgram({
      name: "tiling-sprite-shader",
      bits: [
        localUniformBit,
        tilingBit,
        roundPixelsBit
      ]
    }));
    glProgram$1 ?? (glProgram$1 = compileHighShaderGlProgram({
      name: "tiling-sprite-shader",
      bits: [
        localUniformBitGl,
        tilingBitGl,
        roundPixelsBitGl
      ]
    }));
    const tilingUniforms = new UniformGroup({
      uMapCoord: { value: new Matrix(), type: "mat3x3<f32>" },
      uClampFrame: { value: new Float32Array([0, 0, 1, 1]), type: "vec4<f32>" },
      uClampOffset: { value: new Float32Array([0, 0]), type: "vec2<f32>" },
      uTextureTransform: { value: new Matrix(), type: "mat3x3<f32>" },
      uSizeAnchor: { value: new Float32Array([100, 100, 0.5, 0.5]), type: "vec4<f32>" }
    });
    super({
      glProgram: glProgram$1,
      gpuProgram: gpuProgram$1,
      resources: {
        localUniforms: new UniformGroup({
          uTransformMatrix: { value: new Matrix(), type: "mat3x3<f32>" },
          uColor: { value: new Float32Array([1, 1, 1, 1]), type: "vec4<f32>" },
          uRound: { value: 0, type: "f32" }
        }),
        tilingUniforms,
        uTexture: Texture.EMPTY.source,
        uSampler: Texture.EMPTY.source.style
      }
    });
  }
  updateUniforms(width, height, matrix, anchorX, anchorY, texture) {
    const tilingUniforms = this.resources.tilingUniforms;
    const textureWidth = texture.width;
    const textureHeight = texture.height;
    const textureMatrix = texture.textureMatrix;
    const uTextureTransform = tilingUniforms.uniforms.uTextureTransform;
    uTextureTransform.set(
      matrix.a * textureWidth / width,
      matrix.b * textureWidth / height,
      matrix.c * textureHeight / width,
      matrix.d * textureHeight / height,
      matrix.tx / width,
      matrix.ty / height
    );
    uTextureTransform.invert();
    tilingUniforms.uniforms.uMapCoord = textureMatrix.mapCoord;
    tilingUniforms.uniforms.uClampFrame = textureMatrix.uClampFrame;
    tilingUniforms.uniforms.uClampOffset = textureMatrix.uClampOffset;
    tilingUniforms.uniforms.uTextureTransform = uTextureTransform;
    tilingUniforms.uniforms.uSizeAnchor[0] = width;
    tilingUniforms.uniforms.uSizeAnchor[1] = height;
    tilingUniforms.uniforms.uSizeAnchor[2] = anchorX;
    tilingUniforms.uniforms.uSizeAnchor[3] = anchorY;
    if (texture) {
      this.resources.uTexture = texture.source;
      this.resources.uSampler = texture.source.style;
    }
  }
}

class QuadGeometry extends MeshGeometry {
  constructor() {
    super({
      positions: new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]),
      uvs: new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]),
      indices: new Uint32Array([0, 1, 2, 0, 2, 3])
    });
  }
}

function setPositions(tilingSprite, positions) {
  const anchorX = tilingSprite.anchor.x;
  const anchorY = tilingSprite.anchor.y;
  positions[0] = -anchorX * tilingSprite.width;
  positions[1] = -anchorY * tilingSprite.height;
  positions[2] = (1 - anchorX) * tilingSprite.width;
  positions[3] = -anchorY * tilingSprite.height;
  positions[4] = (1 - anchorX) * tilingSprite.width;
  positions[5] = (1 - anchorY) * tilingSprite.height;
  positions[6] = -anchorX * tilingSprite.width;
  positions[7] = (1 - anchorY) * tilingSprite.height;
}

function applyMatrix(array, stride, offset, matrix) {
  let index = 0;
  const size = array.length / (stride);
  const a = matrix.a;
  const b = matrix.b;
  const c = matrix.c;
  const d = matrix.d;
  const tx = matrix.tx;
  const ty = matrix.ty;
  offset *= stride;
  while (index < size) {
    const x = array[offset];
    const y = array[offset + 1];
    array[offset] = a * x + c * y + tx;
    array[offset + 1] = b * x + d * y + ty;
    offset += stride;
    index++;
  }
}

function setUvs(tilingSprite, uvs) {
  const texture = tilingSprite.texture;
  const width = texture.frame.width;
  const height = texture.frame.height;
  let anchorX = 0;
  let anchorY = 0;
  if (tilingSprite._applyAnchorToTexture) {
    anchorX = tilingSprite.anchor.x;
    anchorY = tilingSprite.anchor.y;
  }
  uvs[0] = uvs[6] = -anchorX;
  uvs[2] = uvs[4] = 1 - anchorX;
  uvs[1] = uvs[3] = -anchorY;
  uvs[5] = uvs[7] = 1 - anchorY;
  const textureMatrix = Matrix.shared;
  textureMatrix.copyFrom(tilingSprite._tileTransform.matrix);
  textureMatrix.tx /= tilingSprite.width;
  textureMatrix.ty /= tilingSprite.height;
  textureMatrix.invert();
  textureMatrix.scale(tilingSprite.width / width, tilingSprite.height / height);
  applyMatrix(uvs, 2, 0, textureMatrix);
}

const sharedQuad = new QuadGeometry();
class TilingSpritePipe {
  constructor(renderer) {
    this._state = State.default2d;
    this._tilingSpriteDataHash = /* @__PURE__ */ Object.create(null);
    this._destroyRenderableBound = this.destroyRenderable.bind(this);
    this._renderer = renderer;
  }
  validateRenderable(renderable) {
    const tilingSpriteData = this._getTilingSpriteData(renderable);
    const couldBatch = tilingSpriteData.canBatch;
    this._updateCanBatch(renderable);
    const canBatch = tilingSpriteData.canBatch;
    if (canBatch && canBatch === couldBatch) {
      const { batchableMesh } = tilingSpriteData;
      if (batchableMesh && batchableMesh.texture._source !== renderable.texture._source) {
        return !batchableMesh._batcher.checkAndUpdateTexture(batchableMesh, renderable.texture);
      }
    }
    return couldBatch !== canBatch;
  }
  addRenderable(tilingSprite, instructionSet) {
    const batcher = this._renderer.renderPipes.batch;
    this._updateCanBatch(tilingSprite);
    const tilingSpriteData = this._getTilingSpriteData(tilingSprite);
    const { geometry, canBatch } = tilingSpriteData;
    if (canBatch) {
      tilingSpriteData.batchableMesh || (tilingSpriteData.batchableMesh = new BatchableMesh());
      const batchableMesh = tilingSpriteData.batchableMesh;
      if (tilingSprite._didTilingSpriteUpdate) {
        tilingSprite._didTilingSpriteUpdate = false;
        this._updateBatchableMesh(tilingSprite);
        batchableMesh.geometry = geometry;
        batchableMesh.renderable = tilingSprite;
        batchableMesh.transform = tilingSprite.groupTransform;
        batchableMesh.texture = tilingSprite._texture;
      }
      batchableMesh.roundPixels = this._renderer._roundPixels | tilingSprite._roundPixels;
      batcher.addToBatch(batchableMesh, instructionSet);
    } else {
      batcher.break(instructionSet);
      tilingSpriteData.shader || (tilingSpriteData.shader = new TilingSpriteShader());
      this.updateRenderable(tilingSprite);
      instructionSet.add(tilingSprite);
    }
  }
  execute(tilingSprite) {
    const { shader } = this._tilingSpriteDataHash[tilingSprite.uid];
    shader.groups[0] = this._renderer.globalUniforms.bindGroup;
    const localUniforms = shader.resources.localUniforms.uniforms;
    localUniforms.uTransformMatrix = tilingSprite.groupTransform;
    localUniforms.uRound = this._renderer._roundPixels | tilingSprite._roundPixels;
    color32BitToUniform(
      tilingSprite.groupColorAlpha,
      localUniforms.uColor,
      0
    );
    this._state.blendMode = getAdjustedBlendModeBlend(tilingSprite.groupBlendMode, tilingSprite.texture._source);
    this._renderer.encoder.draw({
      geometry: sharedQuad,
      shader,
      state: this._state
    });
  }
  updateRenderable(tilingSprite) {
    const tilingSpriteData = this._getTilingSpriteData(tilingSprite);
    const { canBatch } = tilingSpriteData;
    if (canBatch) {
      const { batchableMesh } = tilingSpriteData;
      if (tilingSprite._didTilingSpriteUpdate)
        this._updateBatchableMesh(tilingSprite);
      batchableMesh._batcher.updateElement(batchableMesh);
    } else if (tilingSprite._didTilingSpriteUpdate) {
      const { shader } = tilingSpriteData;
      shader.updateUniforms(
        tilingSprite.width,
        tilingSprite.height,
        tilingSprite._tileTransform.matrix,
        tilingSprite.anchor.x,
        tilingSprite.anchor.y,
        tilingSprite.texture
      );
    }
    tilingSprite._didTilingSpriteUpdate = false;
  }
  destroyRenderable(tilingSprite) {
    const tilingSpriteData = this._getTilingSpriteData(tilingSprite);
    tilingSpriteData.batchableMesh = null;
    tilingSpriteData.shader?.destroy();
    this._tilingSpriteDataHash[tilingSprite.uid] = null;
    tilingSprite.off("destroyed", this._destroyRenderableBound);
  }
  _getTilingSpriteData(renderable) {
    return this._tilingSpriteDataHash[renderable.uid] || this._initTilingSpriteData(renderable);
  }
  _initTilingSpriteData(tilingSprite) {
    const geometry = new MeshGeometry({
      indices: sharedQuad.indices,
      positions: sharedQuad.positions.slice(),
      uvs: sharedQuad.uvs.slice()
    });
    this._tilingSpriteDataHash[tilingSprite.uid] = {
      canBatch: true,
      renderable: tilingSprite,
      geometry
    };
    tilingSprite.on("destroyed", this._destroyRenderableBound);
    return this._tilingSpriteDataHash[tilingSprite.uid];
  }
  _updateBatchableMesh(tilingSprite) {
    const renderableData = this._getTilingSpriteData(tilingSprite);
    const { geometry } = renderableData;
    const style = tilingSprite.texture.source.style;
    if (style.addressMode !== "repeat") {
      style.addressMode = "repeat";
      style.update();
    }
    setUvs(tilingSprite, geometry.uvs);
    setPositions(tilingSprite, geometry.positions);
  }
  destroy() {
    for (const i in this._tilingSpriteDataHash) {
      this.destroyRenderable(this._tilingSpriteDataHash[i].renderable);
    }
    this._tilingSpriteDataHash = null;
    this._renderer = null;
  }
  _updateCanBatch(tilingSprite) {
    const renderableData = this._getTilingSpriteData(tilingSprite);
    const texture = tilingSprite.texture;
    let _nonPowOf2wrapping = true;
    if (this._renderer.type === RendererType.WEBGL) {
      _nonPowOf2wrapping = this._renderer.context.supports.nonPowOf2wrapping;
    }
    renderableData.canBatch = texture.textureMatrix.isSimple && (_nonPowOf2wrapping || texture.source.isPowerOfTwo);
    return renderableData.canBatch;
  }
}
/** @ignore */
TilingSpritePipe.extension = {
  type: [
    ExtensionType.WebGLPipes,
    ExtensionType.WebGPUPipes,
    ExtensionType.CanvasPipes
  ],
  name: "tilingSprite"
};

const localUniformMSDFBit = {
  name: "local-uniform-msdf-bit",
  vertex: {
    header: (
      /* wgsl */
      `
            struct LocalUniforms {
                uColor:vec4<f32>,
                uTransformMatrix:mat3x3<f32>,
                uDistance: f32,
                uRound:f32,
            }

            @group(2) @binding(0) var<uniform> localUniforms : LocalUniforms;
        `
    ),
    main: (
      /* wgsl */
      `
            vColor *= localUniforms.uColor;
            modelMatrix *= localUniforms.uTransformMatrix;
        `
    ),
    end: (
      /* wgsl */
      `
            if(localUniforms.uRound == 1)
            {
                vPosition = vec4(roundPixels(vPosition.xy, globalUniforms.uResolution), vPosition.zw);
            }
        `
    )
  },
  fragment: {
    header: (
      /* wgsl */
      `
            struct LocalUniforms {
                uColor:vec4<f32>,
                uTransformMatrix:mat3x3<f32>,
                uDistance: f32
            }

            @group(2) @binding(0) var<uniform> localUniforms : LocalUniforms;
         `
    ),
    main: (
      /* wgsl */
      ` 
            outColor = vec4<f32>(calculateMSDFAlpha(outColor, localUniforms.uColor, localUniforms.uDistance));
        `
    )
  }
};
const localUniformMSDFBitGl = {
  name: "local-uniform-msdf-bit",
  vertex: {
    header: (
      /* glsl */
      `
            uniform mat3 uTransformMatrix;
            uniform vec4 uColor;
            uniform float uRound;
        `
    ),
    main: (
      /* glsl */
      `
            vColor *= uColor;
            modelMatrix *= uTransformMatrix;
        `
    ),
    end: (
      /* glsl */
      `
            if(uRound == 1.)
            {
                gl_Position.xy = roundPixels(gl_Position.xy, uResolution);
            }
        `
    )
  },
  fragment: {
    header: (
      /* glsl */
      `
            uniform float uDistance;
         `
    ),
    main: (
      /* glsl */
      ` 
            outColor = vec4(calculateMSDFAlpha(outColor, vColor, uDistance));
        `
    )
  }
};

const mSDFBit = {
  name: "msdf-bit",
  fragment: {
    header: (
      /* wgsl */
      `
            fn calculateMSDFAlpha(msdfColor:vec4<f32>, shapeColor:vec4<f32>, distance:f32) -> f32 {
                
                // MSDF
                var median = msdfColor.r + msdfColor.g + msdfColor.b -
                    min(msdfColor.r, min(msdfColor.g, msdfColor.b)) -
                    max(msdfColor.r, max(msdfColor.g, msdfColor.b));
            
                // SDF
                median = min(median, msdfColor.a);

                var screenPxDistance = distance * (median - 0.5);
                var alpha = clamp(screenPxDistance + 0.5, 0.0, 1.0);
                if (median < 0.01) {
                    alpha = 0.0;
                } else if (median > 0.99) {
                    alpha = 1.0;
                }

                // Gamma correction for coverage-like alpha
                var luma: f32 = dot(shapeColor.rgb, vec3<f32>(0.299, 0.587, 0.114));
                var gamma: f32 = mix(1.0, 1.0 / 2.2, luma);
                var coverage: f32 = pow(shapeColor.a * alpha, gamma);

                return coverage;
             
            }
        `
    )
  }
};
const mSDFBitGl = {
  name: "msdf-bit",
  fragment: {
    header: (
      /* glsl */
      `
            float calculateMSDFAlpha(vec4 msdfColor, vec4 shapeColor, float distance) {
                
                // MSDF
                float median = msdfColor.r + msdfColor.g + msdfColor.b -
                                min(msdfColor.r, min(msdfColor.g, msdfColor.b)) -
                                max(msdfColor.r, max(msdfColor.g, msdfColor.b));
               
                // SDF
                median = min(median, msdfColor.a);
            
                float screenPxDistance = distance * (median - 0.5);
                float alpha = clamp(screenPxDistance + 0.5, 0.0, 1.0);
           
                if (median < 0.01) {
                    alpha = 0.0;
                } else if (median > 0.99) {
                    alpha = 1.0;
                }

                // Gamma correction for coverage-like alpha
                float luma = dot(shapeColor.rgb, vec3(0.299, 0.587, 0.114));
                float gamma = mix(1.0, 1.0 / 2.2, luma);
                float coverage = pow(shapeColor.a * alpha, gamma);  
              
                return coverage;
            }
        `
    )
  }
};

let gpuProgram;
let glProgram;
class SdfShader extends Shader {
  constructor() {
    const uniforms = new UniformGroup({
      uColor: { value: new Float32Array([1, 1, 1, 1]), type: "vec4<f32>" },
      uTransformMatrix: { value: new Matrix(), type: "mat3x3<f32>" },
      uDistance: { value: 4, type: "f32" },
      uRound: { value: 0, type: "f32" }
    });
    const maxTextures = getMaxTexturesPerBatch();
    gpuProgram ?? (gpuProgram = compileHighShaderGpuProgram({
      name: "sdf-shader",
      bits: [
        colorBit,
        generateTextureBatchBit(maxTextures),
        localUniformMSDFBit,
        mSDFBit,
        roundPixelsBit
      ]
    }));
    glProgram ?? (glProgram = compileHighShaderGlProgram({
      name: "sdf-shader",
      bits: [
        colorBitGl,
        generateTextureBatchBitGl(maxTextures),
        localUniformMSDFBitGl,
        mSDFBitGl,
        roundPixelsBitGl
      ]
    }));
    super({
      glProgram,
      gpuProgram,
      resources: {
        localUniforms: uniforms,
        batchSamplers: getBatchSamplersUniformGroup(maxTextures)
      }
    });
  }
}

class BitmapTextPipe {
  constructor(renderer) {
    this._gpuBitmapText = {};
    this._destroyRenderableBound = this.destroyRenderable.bind(this);
    this._renderer = renderer;
  }
  validateRenderable(bitmapText) {
    const graphicsRenderable = this._getGpuBitmapText(bitmapText);
    if (bitmapText._didTextUpdate) {
      bitmapText._didTextUpdate = false;
      this._updateContext(bitmapText, graphicsRenderable);
    }
    return this._renderer.renderPipes.graphics.validateRenderable(graphicsRenderable);
  }
  addRenderable(bitmapText, instructionSet) {
    const graphicsRenderable = this._getGpuBitmapText(bitmapText);
    syncWithProxy(bitmapText, graphicsRenderable);
    if (bitmapText._didTextUpdate) {
      bitmapText._didTextUpdate = false;
      this._updateContext(bitmapText, graphicsRenderable);
    }
    this._renderer.renderPipes.graphics.addRenderable(graphicsRenderable, instructionSet);
    if (graphicsRenderable.context.customShader) {
      this._updateDistanceField(bitmapText);
    }
  }
  destroyRenderable(bitmapText) {
    bitmapText.off("destroyed", this._destroyRenderableBound);
    this._destroyRenderableByUid(bitmapText.uid);
  }
  _destroyRenderableByUid(renderableUid) {
    const context = this._gpuBitmapText[renderableUid].context;
    if (context.customShader) {
      BigPool.return(context.customShader);
      context.customShader = null;
    }
    BigPool.return(this._gpuBitmapText[renderableUid]);
    this._gpuBitmapText[renderableUid] = null;
  }
  updateRenderable(bitmapText) {
    const graphicsRenderable = this._getGpuBitmapText(bitmapText);
    syncWithProxy(bitmapText, graphicsRenderable);
    this._renderer.renderPipes.graphics.updateRenderable(graphicsRenderable);
    if (graphicsRenderable.context.customShader) {
      this._updateDistanceField(bitmapText);
    }
  }
  _updateContext(bitmapText, proxyGraphics) {
    const { context } = proxyGraphics;
    const bitmapFont = BitmapFontManager.getFont(bitmapText.text, bitmapText._style);
    context.clear();
    if (bitmapFont.distanceField.type !== "none") {
      if (!context.customShader) {
        context.customShader = BigPool.get(SdfShader);
      }
    }
    const chars = Array.from(bitmapText.text);
    const style = bitmapText._style;
    let currentY = bitmapFont.baseLineOffset;
    const bitmapTextLayout = getBitmapTextLayout(chars, style, bitmapFont, true);
    let index = 0;
    const padding = style.padding;
    const scale = bitmapTextLayout.scale;
    let tx = bitmapTextLayout.width;
    let ty = bitmapTextLayout.height + bitmapTextLayout.offsetY;
    if (style._stroke) {
      tx += style._stroke.width / scale;
      ty += style._stroke.width / scale;
    }
    context.translate(-bitmapText._anchor._x * tx - padding, -bitmapText._anchor._y * ty - padding).scale(scale, scale);
    const tint = bitmapFont.applyFillAsTint ? style._fill.color : 16777215;
    for (let i = 0; i < bitmapTextLayout.lines.length; i++) {
      const line = bitmapTextLayout.lines[i];
      for (let j = 0; j < line.charPositions.length; j++) {
        const char = chars[index++];
        const charData = bitmapFont.chars[char];
        if (charData?.texture) {
          context.texture(
            charData.texture,
            tint ? tint : "black",
            Math.round(line.charPositions[j] + charData.xOffset),
            Math.round(currentY + charData.yOffset)
          );
        }
      }
      currentY += bitmapFont.lineHeight;
    }
  }
  _getGpuBitmapText(bitmapText) {
    return this._gpuBitmapText[bitmapText.uid] || this.initGpuText(bitmapText);
  }
  initGpuText(bitmapText) {
    const proxyRenderable = BigPool.get(Graphics);
    this._gpuBitmapText[bitmapText.uid] = proxyRenderable;
    this._updateContext(bitmapText, proxyRenderable);
    bitmapText.on("destroyed", this._destroyRenderableBound);
    return this._gpuBitmapText[bitmapText.uid];
  }
  _updateDistanceField(bitmapText) {
    const context = this._getGpuBitmapText(bitmapText).context;
    const fontFamily = bitmapText._style.fontFamily;
    const dynamicFont = Cache.get(`${fontFamily}-bitmap`);
    const { a, b, c, d } = bitmapText.groupTransform;
    const dx = Math.sqrt(a * a + b * b);
    const dy = Math.sqrt(c * c + d * d);
    const worldScale = (Math.abs(dx) + Math.abs(dy)) / 2;
    const fontScale = dynamicFont.baseRenderedFontSize / bitmapText._style.fontSize;
    const distance = worldScale * dynamicFont.distanceField.range * (1 / fontScale);
    context.customShader.resources.localUniforms.uniforms.uDistance = distance;
  }
  destroy() {
    for (const uid in this._gpuBitmapText) {
      this._destroyRenderableByUid(uid);
    }
    this._gpuBitmapText = null;
    this._renderer = null;
  }
}
/** @ignore */
BitmapTextPipe.extension = {
  type: [
    ExtensionType.WebGLPipes,
    ExtensionType.WebGPUPipes,
    ExtensionType.CanvasPipes
  ],
  name: "bitmapText"
};
function syncWithProxy(container, proxy) {
  proxy.groupTransform = container.groupTransform;
  proxy.groupColorAlpha = container.groupColorAlpha;
  proxy.groupColor = container.groupColor;
  proxy.groupBlendMode = container.groupBlendMode;
  proxy.globalDisplayStatus = container.globalDisplayStatus;
  proxy.groupTransform = container.groupTransform;
  proxy.localDisplayStatus = container.localDisplayStatus;
  proxy.groupAlpha = container.groupAlpha;
  proxy._roundPixels = container._roundPixels;
}

class HTMLTextPipe {
  constructor(renderer) {
    this._gpuText = /* @__PURE__ */ Object.create(null);
    this._destroyRenderableBound = this.destroyRenderable.bind(this);
    this._renderer = renderer;
    this._renderer.runners.resolutionChange.add(this);
  }
  resolutionChange() {
    for (const i in this._gpuText) {
      const gpuText = this._gpuText[i];
      if (!gpuText)
        continue;
      const text = gpuText.batchableSprite.renderable;
      if (text._autoResolution) {
        text._resolution = this._renderer.resolution;
        text.onViewUpdate();
      }
    }
  }
  validateRenderable(htmlText) {
    const gpuText = this._getGpuText(htmlText);
    const newKey = htmlText._getKey();
    if (gpuText.textureNeedsUploading) {
      gpuText.textureNeedsUploading = false;
      return true;
    }
    if (gpuText.currentKey !== newKey) {
      return true;
    }
    return false;
  }
  addRenderable(htmlText, instructionSet) {
    const gpuText = this._getGpuText(htmlText);
    const batchableSprite = gpuText.batchableSprite;
    if (htmlText._didTextUpdate) {
      this._updateText(htmlText);
    }
    this._renderer.renderPipes.batch.addToBatch(batchableSprite, instructionSet);
  }
  updateRenderable(htmlText) {
    const gpuText = this._getGpuText(htmlText);
    const batchableSprite = gpuText.batchableSprite;
    if (htmlText._didTextUpdate) {
      this._updateText(htmlText);
    }
    batchableSprite._batcher.updateElement(batchableSprite);
  }
  destroyRenderable(htmlText) {
    htmlText.off("destroyed", this._destroyRenderableBound);
    this._destroyRenderableById(htmlText.uid);
  }
  _destroyRenderableById(htmlTextUid) {
    const gpuText = this._gpuText[htmlTextUid];
    this._renderer.htmlText.decreaseReferenceCount(gpuText.currentKey);
    BigPool.return(gpuText.batchableSprite);
    this._gpuText[htmlTextUid] = null;
  }
  _updateText(htmlText) {
    const newKey = htmlText._getKey();
    const gpuText = this._getGpuText(htmlText);
    const batchableSprite = gpuText.batchableSprite;
    if (gpuText.currentKey !== newKey) {
      this._updateGpuText(htmlText).catch((e) => {
        console.error(e);
      });
    }
    htmlText._didTextUpdate = false;
    const padding = htmlText._style.padding;
    updateQuadBounds(batchableSprite.bounds, htmlText._anchor, batchableSprite.texture, padding);
  }
  async _updateGpuText(htmlText) {
    htmlText._didTextUpdate = false;
    const gpuText = this._getGpuText(htmlText);
    if (gpuText.generatingTexture)
      return;
    const newKey = htmlText._getKey();
    this._renderer.htmlText.decreaseReferenceCount(gpuText.currentKey);
    gpuText.generatingTexture = true;
    gpuText.currentKey = newKey;
    const resolution = htmlText.resolution ?? this._renderer.resolution;
    const texture = await this._renderer.htmlText.getManagedTexture(
      htmlText.text,
      resolution,
      htmlText._style,
      htmlText._getKey()
    );
    const batchableSprite = gpuText.batchableSprite;
    batchableSprite.texture = gpuText.texture = texture;
    gpuText.generatingTexture = false;
    gpuText.textureNeedsUploading = true;
    htmlText.onViewUpdate();
    const padding = htmlText._style.padding;
    updateQuadBounds(batchableSprite.bounds, htmlText._anchor, batchableSprite.texture, padding);
  }
  _getGpuText(htmlText) {
    return this._gpuText[htmlText.uid] || this.initGpuText(htmlText);
  }
  initGpuText(htmlText) {
    const gpuTextData = {
      texture: Texture.EMPTY,
      currentKey: "--",
      batchableSprite: BigPool.get(BatchableSprite),
      textureNeedsUploading: false,
      generatingTexture: false
    };
    const batchableSprite = gpuTextData.batchableSprite;
    batchableSprite.renderable = htmlText;
    batchableSprite.transform = htmlText.groupTransform;
    batchableSprite.texture = Texture.EMPTY;
    batchableSprite.bounds = { minX: 0, maxX: 1, minY: 0, maxY: 0 };
    batchableSprite.roundPixels = this._renderer._roundPixels | htmlText._roundPixels;
    htmlText._resolution = htmlText._autoResolution ? this._renderer.resolution : htmlText.resolution;
    this._gpuText[htmlText.uid] = gpuTextData;
    htmlText.on("destroyed", this._destroyRenderableBound);
    return gpuTextData;
  }
  destroy() {
    for (const i in this._gpuText) {
      this._destroyRenderableById(i);
    }
    this._gpuText = null;
    this._renderer = null;
  }
}
/** @ignore */
HTMLTextPipe.extension = {
  type: [
    ExtensionType.WebGLPipes,
    ExtensionType.WebGPUPipes,
    ExtensionType.CanvasPipes
  ],
  name: "htmlText"
};

function isSafari() {
  const { userAgent } = DOMAdapter.get().getNavigator();
  return /^((?!chrome|android).)*safari/i.test(userAgent);
}

const tempBounds = new Bounds();
function getPo2TextureFromSource(image, width, height, resolution) {
  const bounds = tempBounds;
  bounds.minX = 0;
  bounds.minY = 0;
  bounds.maxX = image.width / resolution | 0;
  bounds.maxY = image.height / resolution | 0;
  const texture = TexturePool.getOptimalTexture(
    bounds.width,
    bounds.height,
    resolution,
    false
  );
  texture.source.uploadMethodId = "image";
  texture.source.resource = image;
  texture.source.alphaMode = "premultiply-alpha-on-upload";
  texture.frame.width = width / resolution;
  texture.frame.height = height / resolution;
  texture.source.emit("update", texture.source);
  texture.updateUvs();
  return texture;
}

function extractFontFamilies(text, style) {
  const fontFamily = style.fontFamily;
  const fontFamilies = [];
  const dedupe = {};
  const regex = /font-family:([^;"\s]+)/g;
  const matches = text.match(regex);
  function addFontFamily(fontFamily2) {
    if (!dedupe[fontFamily2]) {
      fontFamilies.push(fontFamily2);
      dedupe[fontFamily2] = true;
    }
  }
  if (Array.isArray(fontFamily)) {
    for (let i = 0; i < fontFamily.length; i++) {
      addFontFamily(fontFamily[i]);
    }
  } else {
    addFontFamily(fontFamily);
  }
  if (matches) {
    matches.forEach((match) => {
      const fontFamily2 = match.split(":")[1].trim();
      addFontFamily(fontFamily2);
    });
  }
  for (const i in style.tagStyles) {
    const fontFamily2 = style.tagStyles[i].fontFamily;
    addFontFamily(fontFamily2);
  }
  return fontFamilies;
}

async function loadFontAsBase64(url) {
  const response = await DOMAdapter.get().fetch(url);
  const blob = await response.blob();
  const reader = new FileReader();
  const dataSrc = await new Promise((resolve, reject) => {
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
  return dataSrc;
}

async function loadFontCSS(style, url) {
  const dataSrc = await loadFontAsBase64(url);
  return `@font-face {
        font-family: "${style.fontFamily}";
        src: url('${dataSrc}');
        font-weight: ${style.fontWeight};
        font-style: ${style.fontStyle};
    }`;
}

const FontStylePromiseCache = /* @__PURE__ */ new Map();
async function getFontCss(fontFamilies, style, defaultOptions) {
  const fontPromises = fontFamilies.filter((fontFamily) => Cache.has(`${fontFamily}-and-url`)).map((fontFamily, i) => {
    if (!FontStylePromiseCache.has(fontFamily)) {
      const { url } = Cache.get(`${fontFamily}-and-url`);
      if (i === 0) {
        FontStylePromiseCache.set(fontFamily, loadFontCSS({
          fontWeight: style.fontWeight,
          fontStyle: style.fontStyle,
          fontFamily
        }, url));
      } else {
        FontStylePromiseCache.set(fontFamily, loadFontCSS({
          fontWeight: defaultOptions.fontWeight,
          fontStyle: defaultOptions.fontStyle,
          fontFamily
        }, url));
      }
    }
    return FontStylePromiseCache.get(fontFamily);
  });
  return (await Promise.all(fontPromises)).join("\n");
}

function getSVGUrl(text, style, resolution, fontCSS, htmlTextData) {
  const { domElement, styleElement, svgRoot } = htmlTextData;
  domElement.innerHTML = `<style>${style.cssStyle}</style><div style='padding:0;'>${text}</div>`;
  domElement.setAttribute("style", `transform: scale(${resolution});transform-origin: top left; display: inline-block`);
  styleElement.textContent = fontCSS;
  const { width, height } = htmlTextData.image;
  svgRoot.setAttribute("width", width.toString());
  svgRoot.setAttribute("height", height.toString());
  return new XMLSerializer().serializeToString(svgRoot);
}

function getTemporaryCanvasFromImage(image, resolution) {
  const canvasAndContext = CanvasPool.getOptimalCanvasAndContext(
    image.width,
    image.height,
    resolution
  );
  const { context } = canvasAndContext;
  context.clearRect(0, 0, image.width, image.height);
  context.drawImage(image, 0, 0);
  CanvasPool.returnCanvasAndContext(canvasAndContext);
  return canvasAndContext.canvas;
}

function loadSVGImage(image, url, delay) {
  return new Promise(async (resolve) => {
    if (delay) {
      await new Promise((resolve2) => setTimeout(resolve2, 100));
    }
    image.onload = () => {
      resolve();
    };
    image.src = `data:image/svg+xml;charset=utf8,${encodeURIComponent(url)}`;
    image.crossOrigin = "anonymous";
  });
}

class HTMLTextSystem {
  constructor(renderer) {
    this._activeTextures = {};
    this._renderer = renderer;
    this._createCanvas = renderer.type === RendererType.WEBGPU;
  }
  getTexture(options) {
    return this._buildTexturePromise(
      options.text,
      options.resolution,
      options.style
    );
  }
  getManagedTexture(text, resolution, style, textKey) {
    if (this._activeTextures[textKey]) {
      this._increaseReferenceCount(textKey);
      return this._activeTextures[textKey].promise;
    }
    const promise = this._buildTexturePromise(text, resolution, style).then((texture) => {
      this._activeTextures[textKey].texture = texture;
      return texture;
    });
    this._activeTextures[textKey] = {
      texture: null,
      promise,
      usageCount: 1
    };
    return promise;
  }
  async _buildTexturePromise(text, resolution, style) {
    const htmlTextData = BigPool.get(HTMLTextRenderData);
    const fontFamilies = extractFontFamilies(text, style);
    const fontCSS = await getFontCss(
      fontFamilies,
      style,
      HTMLTextStyle.defaultTextStyle
    );
    const measured = measureHtmlText(text, style, fontCSS, htmlTextData);
    const width = Math.ceil(Math.ceil(Math.max(1, measured.width) + style.padding * 2) * resolution);
    const height = Math.ceil(Math.ceil(Math.max(1, measured.height) + style.padding * 2) * resolution);
    const image = htmlTextData.image;
    const uvSafeOffset = 2;
    image.width = (width | 0) + uvSafeOffset;
    image.height = (height | 0) + uvSafeOffset;
    const svgURL = getSVGUrl(text, style, resolution, fontCSS, htmlTextData);
    await loadSVGImage(image, svgURL, isSafari() && fontFamilies.length > 0);
    let resource = image;
    if (this._createCanvas) {
      resource = getTemporaryCanvasFromImage(image, resolution);
    }
    const texture = getPo2TextureFromSource(
      resource,
      image.width - uvSafeOffset,
      image.height - uvSafeOffset,
      resolution
    );
    if (this._createCanvas) {
      this._renderer.texture.initSource(texture.source);
    }
    BigPool.return(htmlTextData);
    return texture;
  }
  _increaseReferenceCount(textKey) {
    this._activeTextures[textKey].usageCount++;
  }
  decreaseReferenceCount(textKey) {
    const activeTexture = this._activeTextures[textKey];
    if (!activeTexture)
      return;
    activeTexture.usageCount--;
    if (activeTexture.usageCount === 0) {
      if (activeTexture.texture) {
        this._cleanUp(activeTexture);
      } else {
        activeTexture.promise.then((texture) => {
          activeTexture.texture = texture;
          this._cleanUp(activeTexture);
        }).catch(() => {
          warn("HTMLTextSystem: Failed to clean texture");
        });
      }
      this._activeTextures[textKey] = null;
    }
  }
  _cleanUp(activeTexture) {
    TexturePool.returnTexture(activeTexture.texture);
    activeTexture.texture.source.resource = null;
    activeTexture.texture.source.uploadMethodId = "unknown";
  }
  getReferenceCount(textKey) {
    return this._activeTextures[textKey].usageCount;
  }
  destroy() {
    this._activeTextures = null;
  }
}
/** @ignore */
HTMLTextSystem.extension = {
  type: [
    ExtensionType.WebGLSystem,
    ExtensionType.WebGPUSystem,
    ExtensionType.CanvasSystem
  ],
  name: "htmlText"
};
HTMLTextSystem.defaultFontOptions = {
  fontFamily: "Arial",
  fontStyle: "normal",
  fontWeight: "normal"
};

class CanvasTextPipe {
  constructor(renderer) {
    this._gpuText = /* @__PURE__ */ Object.create(null);
    this._destroyRenderableBound = this.destroyRenderable.bind(this);
    this._renderer = renderer;
    this._renderer.runners.resolutionChange.add(this);
  }
  resolutionChange() {
    for (const i in this._gpuText) {
      const gpuText = this._gpuText[i];
      if (!gpuText)
        continue;
      const text = gpuText.batchableSprite.renderable;
      if (text._autoResolution) {
        text._resolution = this._renderer.resolution;
        text.onViewUpdate();
      }
    }
  }
  validateRenderable(text) {
    const gpuText = this._getGpuText(text);
    const newKey = text._getKey();
    if (gpuText.currentKey !== newKey) {
      const { width, height } = this._renderer.canvasText.getTextureSize(
        text.text,
        text.resolution,
        text._style
      );
      if (
        // is only being used by this text:
        this._renderer.canvasText.getReferenceCount(gpuText.currentKey) === 1 && width === gpuText.texture._source.width && height === gpuText.texture._source.height
      ) {
        return false;
      }
      return true;
    }
    return false;
  }
  addRenderable(text, instructionSet) {
    const gpuText = this._getGpuText(text);
    const batchableSprite = gpuText.batchableSprite;
    if (text._didTextUpdate) {
      this._updateText(text);
    }
    this._renderer.renderPipes.batch.addToBatch(batchableSprite, instructionSet);
  }
  updateRenderable(text) {
    const gpuText = this._getGpuText(text);
    const batchableSprite = gpuText.batchableSprite;
    if (text._didTextUpdate) {
      this._updateText(text);
    }
    batchableSprite._batcher.updateElement(batchableSprite);
  }
  destroyRenderable(text) {
    text.off("destroyed", this._destroyRenderableBound);
    this._destroyRenderableById(text.uid);
  }
  _destroyRenderableById(textUid) {
    const gpuText = this._gpuText[textUid];
    this._renderer.canvasText.decreaseReferenceCount(gpuText.currentKey);
    BigPool.return(gpuText.batchableSprite);
    this._gpuText[textUid] = null;
  }
  _updateText(text) {
    const newKey = text._getKey();
    const gpuText = this._getGpuText(text);
    const batchableSprite = gpuText.batchableSprite;
    if (gpuText.currentKey !== newKey) {
      this._updateGpuText(text);
    }
    text._didTextUpdate = false;
    const padding = text._style.padding;
    updateQuadBounds(batchableSprite.bounds, text._anchor, batchableSprite.texture, padding);
  }
  _updateGpuText(text) {
    const gpuText = this._getGpuText(text);
    const batchableSprite = gpuText.batchableSprite;
    if (gpuText.texture) {
      this._renderer.canvasText.decreaseReferenceCount(gpuText.currentKey);
    }
    gpuText.texture = batchableSprite.texture = this._renderer.canvasText.getManagedTexture(text);
    gpuText.currentKey = text._getKey();
    batchableSprite.texture = gpuText.texture;
  }
  _getGpuText(text) {
    return this._gpuText[text.uid] || this.initGpuText(text);
  }
  initGpuText(text) {
    const gpuTextData = {
      texture: null,
      currentKey: "--",
      batchableSprite: BigPool.get(BatchableSprite)
    };
    gpuTextData.batchableSprite.renderable = text;
    gpuTextData.batchableSprite.transform = text.groupTransform;
    gpuTextData.batchableSprite.bounds = { minX: 0, maxX: 1, minY: 0, maxY: 0 };
    gpuTextData.batchableSprite.roundPixels = this._renderer._roundPixels | text._roundPixels;
    this._gpuText[text.uid] = gpuTextData;
    text._resolution = text._autoResolution ? this._renderer.resolution : text.resolution;
    this._updateText(text);
    text.on("destroyed", this._destroyRenderableBound);
    return gpuTextData;
  }
  destroy() {
    for (const i in this._gpuText) {
      this._destroyRenderableById(i);
    }
    this._gpuText = null;
    this._renderer = null;
  }
}
/** @ignore */
CanvasTextPipe.extension = {
  type: [
    ExtensionType.WebGLPipes,
    ExtensionType.WebGPUPipes,
    ExtensionType.CanvasPipes
  ],
  name: "text"
};

function checkRow(data, width, y) {
  for (let x = 0, index = 4 * y * width; x < width; ++x, index += 4) {
    if (data[index + 3] !== 0)
      return false;
  }
  return true;
}
function checkColumn(data, width, x, top, bottom) {
  const stride = 4 * width;
  for (let y = top, index = top * stride + 4 * x; y <= bottom; ++y, index += stride) {
    if (data[index + 3] !== 0)
      return false;
  }
  return true;
}
function getCanvasBoundingBox(canvas, resolution = 1) {
  const { width, height } = canvas;
  const context = canvas.getContext("2d", {
    willReadFrequently: true
  });
  if (context === null) {
    throw new TypeError("Failed to get canvas 2D context");
  }
  const imageData = context.getImageData(0, 0, width, height);
  const data = imageData.data;
  let left = 0;
  let top = 0;
  let right = width - 1;
  let bottom = height - 1;
  while (top < height && checkRow(data, width, top))
    ++top;
  if (top === height)
    return Rectangle.EMPTY;
  while (checkRow(data, width, bottom))
    --bottom;
  while (checkColumn(data, width, left, top, bottom))
    ++left;
  while (checkColumn(data, width, right, top, bottom))
    --right;
  ++right;
  ++bottom;
  return new Rectangle(left / resolution, top / resolution, (right - left) / resolution, (bottom - top) / resolution);
}

class CanvasTextSystem {
  constructor(_renderer) {
    this._activeTextures = {};
    this._renderer = _renderer;
  }
  getTextureSize(text, resolution, style) {
    const measured = CanvasTextMetrics.measureText(text || " ", style);
    let width = Math.ceil(Math.ceil(Math.max(1, measured.width) + style.padding * 2) * resolution);
    let height = Math.ceil(Math.ceil(Math.max(1, measured.height) + style.padding * 2) * resolution);
    width = Math.ceil(width - 1e-6);
    height = Math.ceil(height - 1e-6);
    width = nextPow2(width);
    height = nextPow2(height);
    return { width, height };
  }
  getTexture(options, resolution, style, _textKey) {
    if (typeof options === "string") {
      deprecation("8.0.0", "CanvasTextSystem.getTexture: Use object TextOptions instead of separate arguments");
      options = {
        text: options,
        style,
        resolution
      };
    }
    if (!(options.style instanceof TextStyle)) {
      options.style = new TextStyle(options.style);
    }
    const { texture, canvasAndContext } = this.createTextureAndCanvas(
      options
    );
    this._renderer.texture.initSource(texture._source);
    CanvasPool.returnCanvasAndContext(canvasAndContext);
    return texture;
  }
  createTextureAndCanvas(options) {
    const { text, style } = options;
    const resolution = options.resolution ?? this._renderer.resolution;
    const measured = CanvasTextMetrics.measureText(text || " ", style);
    const width = Math.ceil(Math.ceil(Math.max(1, measured.width) + style.padding * 2) * resolution);
    const height = Math.ceil(Math.ceil(Math.max(1, measured.height) + style.padding * 2) * resolution);
    const canvasAndContext = CanvasPool.getOptimalCanvasAndContext(width, height);
    const { canvas } = canvasAndContext;
    this.renderTextToCanvas(text, style, resolution, canvasAndContext);
    const texture = getPo2TextureFromSource(canvas, width, height, resolution);
    if (style.trim) {
      const trimmed = getCanvasBoundingBox(canvas, resolution);
      texture.frame.copyFrom(trimmed);
      texture.updateUvs();
    }
    return { texture, canvasAndContext };
  }
  getManagedTexture(text) {
    text._resolution = text._autoResolution ? this._renderer.resolution : text.resolution;
    const textKey = text._getKey();
    if (this._activeTextures[textKey]) {
      this._increaseReferenceCount(textKey);
      return this._activeTextures[textKey].texture;
    }
    const { texture, canvasAndContext } = this.createTextureAndCanvas(text);
    this._activeTextures[textKey] = {
      canvasAndContext,
      texture,
      usageCount: 1
    };
    return texture;
  }
  _increaseReferenceCount(textKey) {
    this._activeTextures[textKey].usageCount++;
  }
  decreaseReferenceCount(textKey) {
    const activeTexture = this._activeTextures[textKey];
    activeTexture.usageCount--;
    if (activeTexture.usageCount === 0) {
      CanvasPool.returnCanvasAndContext(activeTexture.canvasAndContext);
      TexturePool.returnTexture(activeTexture.texture);
      const source = activeTexture.texture.source;
      source.resource = null;
      source.uploadMethodId = "unknown";
      source.alphaMode = "no-premultiply-alpha";
      this._activeTextures[textKey] = null;
    }
  }
  getReferenceCount(textKey) {
    return this._activeTextures[textKey].usageCount;
  }
  /**
   * Renders text to its canvas, and updates its texture.
   *
   * By default this is used internally to ensure the texture is correct before rendering,
   * but it can be used called externally, for example from this class to 'pre-generate' the texture from a piece of text,
   * and then shared across multiple Sprites.
   * @param text
   * @param style
   * @param resolution
   * @param canvasAndContext
   */
  renderTextToCanvas(text, style, resolution, canvasAndContext) {
    const { canvas, context } = canvasAndContext;
    const font = fontStringFromTextStyle(style);
    const measured = CanvasTextMetrics.measureText(text || " ", style);
    const lines = measured.lines;
    const lineHeight = measured.lineHeight;
    const lineWidths = measured.lineWidths;
    const maxLineWidth = measured.maxLineWidth;
    const fontProperties = measured.fontProperties;
    const height = canvas.height;
    context.resetTransform();
    context.scale(resolution, resolution);
    const padding = style.padding * 2;
    context.clearRect(0, 0, measured.width + 4 + padding, measured.height + 4 + padding);
    if (style._stroke?.width) {
      const strokeStyle = style._stroke;
      context.lineWidth = strokeStyle.width;
      context.miterLimit = strokeStyle.miterLimit;
      context.lineJoin = strokeStyle.join;
      context.lineCap = strokeStyle.cap;
    }
    context.font = font;
    let linePositionX;
    let linePositionY;
    const passesCount = style.dropShadow ? 2 : 1;
    for (let i = 0; i < passesCount; ++i) {
      const isShadowPass = style.dropShadow && i === 0;
      const dsOffsetText = isShadowPass ? Math.ceil(Math.max(1, height) + style.padding * 2) : 0;
      const dsOffsetShadow = dsOffsetText * resolution;
      if (isShadowPass) {
        context.fillStyle = "black";
        context.strokeStyle = "black";
        const shadowOptions = style.dropShadow;
        const dropShadowColor = shadowOptions.color;
        const dropShadowAlpha = shadowOptions.alpha;
        context.shadowColor = Color.shared.setValue(dropShadowColor).setAlpha(dropShadowAlpha).toRgbaString();
        const dropShadowBlur = shadowOptions.blur * resolution;
        const dropShadowDistance = shadowOptions.distance * resolution;
        context.shadowBlur = dropShadowBlur;
        context.shadowOffsetX = Math.cos(shadowOptions.angle) * dropShadowDistance;
        context.shadowOffsetY = Math.sin(shadowOptions.angle) * dropShadowDistance + dsOffsetShadow;
      } else {
        context.globalAlpha = style._fill?.alpha ?? 1;
        context.fillStyle = style._fill ? getCanvasFillStyle(style._fill, context) : null;
        if (style._stroke?.width) {
          context.strokeStyle = getCanvasFillStyle(style._stroke, context);
        }
        context.shadowColor = "black";
      }
      let linePositionYShift = (lineHeight - fontProperties.fontSize) / 2;
      if (lineHeight - fontProperties.fontSize < 0) {
        linePositionYShift = 0;
      }
      const strokeWidth = style._stroke?.width ?? 0;
      for (let i2 = 0; i2 < lines.length; i2++) {
        linePositionX = strokeWidth / 2;
        linePositionY = strokeWidth / 2 + i2 * lineHeight + fontProperties.ascent + linePositionYShift;
        if (style.align === "right") {
          linePositionX += maxLineWidth - lineWidths[i2];
        } else if (style.align === "center") {
          linePositionX += (maxLineWidth - lineWidths[i2]) / 2;
        }
        if (style._stroke?.width) {
          this._drawLetterSpacing(
            lines[i2],
            style,
            canvasAndContext,
            linePositionX + style.padding,
            linePositionY + style.padding - dsOffsetText,
            true
          );
        }
        if (style._fill !== void 0) {
          this._drawLetterSpacing(
            lines[i2],
            style,
            canvasAndContext,
            linePositionX + style.padding,
            linePositionY + style.padding - dsOffsetText
          );
        }
      }
    }
  }
  /**
   * Render the text with letter-spacing.
   * @param text - The text to draw
   * @param style
   * @param canvasAndContext
   * @param x - Horizontal position to draw the text
   * @param y - Vertical position to draw the text
   * @param isStroke - Is this drawing for the outside stroke of the
   *  text? If not, it's for the inside fill
   */
  _drawLetterSpacing(text, style, canvasAndContext, x, y, isStroke = false) {
    const { context } = canvasAndContext;
    const letterSpacing = style.letterSpacing;
    let useExperimentalLetterSpacing = false;
    if (CanvasTextMetrics.experimentalLetterSpacingSupported) {
      if (CanvasTextMetrics.experimentalLetterSpacing) {
        context.letterSpacing = `${letterSpacing}px`;
        context.textLetterSpacing = `${letterSpacing}px`;
        useExperimentalLetterSpacing = true;
      } else {
        context.letterSpacing = "0px";
        context.textLetterSpacing = "0px";
      }
    }
    if (letterSpacing === 0 || useExperimentalLetterSpacing) {
      if (isStroke) {
        context.strokeText(text, x, y);
      } else {
        context.fillText(text, x, y);
      }
      return;
    }
    let currentPosition = x;
    const stringArray = CanvasTextMetrics.graphemeSegmenter(text);
    let previousWidth = context.measureText(text).width;
    let currentWidth = 0;
    for (let i = 0; i < stringArray.length; ++i) {
      const currentChar = stringArray[i];
      if (isStroke) {
        context.strokeText(currentChar, currentPosition, y);
      } else {
        context.fillText(currentChar, currentPosition, y);
      }
      let textStr = "";
      for (let j = i + 1; j < stringArray.length; ++j) {
        textStr += stringArray[j];
      }
      currentWidth = context.measureText(textStr).width;
      currentPosition += previousWidth - currentWidth + letterSpacing;
      previousWidth = currentWidth;
    }
  }
  destroy() {
    this._activeTextures = null;
  }
}
/** @ignore */
CanvasTextSystem.extension = {
  type: [
    ExtensionType.WebGLSystem,
    ExtensionType.WebGPUSystem,
    ExtensionType.CanvasSystem
  ],
  name: "canvasText"
};

extensions.add(ResizePlugin);
extensions.add(TickerPlugin);

extensions.add(GraphicsPipe);
extensions.add(GraphicsContextSystem);

extensions.add(MeshPipe);

extensions.add(CanvasTextSystem);
extensions.add(CanvasTextPipe);

extensions.add(BitmapTextPipe);

extensions.add(HTMLTextSystem);
extensions.add(HTMLTextPipe);

extensions.add(TilingSpritePipe);

extensions.add(NineSliceSpritePipe);

extensions.add(FilterSystem);
extensions.add(FilterPipe);
//# sourceMappingURL=webworkerAll-DGN4uUlC.js.map
