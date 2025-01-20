<script setup lang="ts">
import {defineEmits, onMounted, ref, shallowRef, watch} from "vue"

import BpmnModeler from "bpmn-js/lib/Modeler"
import gridModule from 'diagram-js-grid-bg';
import tokenSimulation from "bpmn-js-token-simulation";
import "bpmn-js-token-simulation/assets/css/bpmn-js-token-simulation.css"

import 'bpmn-js/dist/assets/bpmn-js.css';
import '@/assets/scss/flow.css';
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';
import 'diagram-js-minimap/assets/diagram-js-minimap.css'
import {DefaultEmptyXML} from "@/composables/flowable.ts"
import CustomModdle from '@/components/bpmn/moddle/CustomModdle.ts'
import customTranslate from "@/core/bpmn/translate/customTranslate.ts";
import translationsCN from "@/core/bpmn/translate/zh.ts";
import {customRenderer, customDragging, taskElementFactory} from '@/core/bpmn/style';
import flowableModdleExtension from '@/core/bpmn/extension-moddle/flowable';
import flowableModdleDescriptor from '@/core/bpmn/descriptor/flowableDescriptor.json';
import CustomPaletteModule from '@/core/bpmn/palette';

import ViewerZoom from "@/components/bpmn/flow-designer/components/ViewerZoom.vue";
import ViewerLayout from "@/components/bpmn/flow-designer/components/ViewerLayout.vue";
import ProcessPalette from "@/components/bpmn/flow-designer/components/ProcessPalette.vue";
import {useI18n} from "vue-i18n";

const { t } = useI18n()

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  processId: String,
  processName: String,
  translations: Object,
  additionalModel: [Object, Array],
  moddleExtension: Object,
  onlyCustomizeAddi: {
    type: Boolean,
    default: false
  },
  onlyCustomizeModdle: {
    type: Boolean,
    default: false
  },
  simulation: {
    type: Boolean,
    default: true
  },
  keyboard: {
    type: Boolean,
    default: true
  },
  prefix: {
    type: String,
    default: "flowable"
  },
  events: {
    type: Array,
    default: () => ["element.click"]
  },
  headerButtonSize: {
    type: String,
    default: "small",
    validator: value => ["default", "medium", "small", "mini"].indexOf(value) !== -1
  },
  headerButtonType: {
    type: String,
    default: "primary",
    validator: value => ["default", "primary", "success", "warning", "danger", "info"].indexOf(value) !== -1
  }
})
const diagramRef = ref<HTMLDivElement>()
const bpmnModeler = shallowRef<BpmnModeler>()
const keyboard = ref(false)
const onlyCustomizeAddi = ref(false)
const additionalModel = ref(null)
const simulation = ref(false)
const prefix = ref("flowable")

watch(()=>props.additionalModel, (newVal) => {
  additionalModel.value = newVal
},{immediate:true})
watch(()=>props.simulation, (newVal) => {
  simulation.value = newVal
},{immediate:true})


const recoverable = ref(false)
const revocable = ref(false)
const emit = defineEmits([
  'element.click',
  'connection.added',
  'connection.removed',
  'connection.changed',
  'destroy',
  'save',
  'init-finished',
  'commandStack-changed',
  'input',
  'change',
])

const additionalModules = () => {
  const Modules = [];
  if (onlyCustomizeAddi.value) {
    if (Object.prototype.toString.call(additionalModel.value) === "[object Array]") {
      return additionalModel.value || [];
    }
    return [additionalModel.value];
  }
  if (Object.prototype.toString.call(additionalModel.value) === "[object Array]") {
    Modules.push(...additionalModel.value);
  } else {
    additionalModel.value && Modules.push(additionalModel.value);
  }
  const TranslateModule = {
    translate: ["value", customTranslate(props.translations || translationsCN)]
  };
  Modules.push(TranslateModule);
  if (simulation.value) {
    Modules.push(tokenSimulation);
  }
  // if (this.prefix === "bpmn") {
  //   Modules.push(bpmnModdleExtension);
  // }
  if (prefix.value === "flowable") {
    Modules.push(flowableModdleExtension);
  }
  Modules.push(CustomModdle)
  Modules.push(CustomPaletteModule)
  Modules.push(taskElementFactory)
  Modules.push(customRenderer)
  Modules.push(gridModule)
  return Modules;
}
const moddleExtensions = () => {
  const Extensions = {};
  if (prefix.value === "flowable") {
    Extensions.flowable = flowableModdleDescriptor;
  }

  return Extensions;
}
const initBpmnModeler = () => {
  if (bpmnModeler.value) return;
  bpmnModeler.value = new BpmnModeler({
    container: diagramRef.value,
    keyboard: keyboard.value ? { bindTo: document } : null,
    additionalModules: additionalModules(),
    moddleExtensions: moddleExtensions(),
    gridLine: {
      smallGridSpacing: 20,
      gridSpacing: 80,
      gridLineStroke: .5,
      gridLineOpacity: 0.5,
      gridLineColor: 'rgba(209,209,209,0.3)'
    }
  });
  emit("init-finished", bpmnModeler.value)
  initModelListeners();
}
const updateAllElementSize = () => {
  const elementRegistry = bpmnModeler.value.get('elementRegistry');
  elementRegistry.forEach((element) => {
    if (element.type.includes('Task') || (element.type == 'bpmn:SubProcess' && element.collapsed)) {
      updateElementSize(element);
    }
  })
}
const updateElementSize = (element) => {
  const businessObject = element.businessObject || {};
  const textContent = businessObject.name || ''; // 获取节点文本

  function getTextWidth(text, font = '12px Arial') {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.font = font;
    return context.measureText(text).width;
  }
  function countLettersAndDigits(text) {
    const letters = text.match(/[a-zA-Z]/g); // 匹配所有英文字母
    const digits = text.match(/\d/g);        // 匹配所有数字
    const letterCount = letters ? letters.length : 0;
    const digitCount = digits ? digits.length : 0;
    return letterCount + digitCount;
  }
  let calculatedWidth = getTextWidth(textContent) + 20 + 36 + 20;
  const countLettersAndDigit = countLettersAndDigits(textContent)
  if (countLettersAndDigit>0) {
    calculatedWidth += countLettersAndDigit * 0.5
  }
  if(calculatedWidth == 0 || calculatedWidth==element.width) {
    return
  }
  const modeling = bpmnModeler.value?.get('modeling');
  modeling.resizeShape(element, {x: element.x, y: element.y, width: calculatedWidth, height: 40 });
}
const initModelListeners = () => {
  const EventBus = bpmnModeler.value.get("eventBus");
  props.events.forEach(event => {
    EventBus.on(event, function(eventObj) {
      let eventName = event.replace(/\./g, "-");
      let element = eventObj ? eventObj.element : null;
      emit(eventName, element, eventObj);
    });
    const elementRegistry = bpmnModeler.value.get('elementRegistry');
    EventBus.on('shape.changed', (event) => {
      const { element } = event;
      if (element.type === 'bpmn:SubProcess' && !element.collapsed) {
        const gfx = elementRegistry.getGraphics(element.id);
        const rect = gfx.querySelector('rect:nth-of-type(1)'); // 获取矩形图形
        const rect1 = gfx.querySelector('.djs-outline'); // 获取矩形图形
        if (rect) {
          rect.setAttribute('style', '' +
              'stroke: rgb(170, 171, 176) !important;' +
              'fill: #fff;'); // 修改背景色
        }
        if (rect1) {
          rect1.setAttribute('rx',"10")
          rect1.setAttribute('ry',"10")
        }
      }
      if (element.type === 'bpmn:Participant') {
        const gfx = elementRegistry.getGraphics(element.id);
        const rects = gfx.querySelectorAll('rect');
        if (rects.length > 0) {
          rects.forEach((rect,index) => {
            rect.setAttribute('style', '' +
                'stroke: rgb(170, 171, 176) !important;' +
                'fill: #fff;'); // 修改背景色
          })
        }
        const paths = gfx.querySelectorAll('path');
        if (paths.length > 0) {
          paths.forEach(path => {
            path.setAttribute('style', 'stroke: rgb(170, 171, 176) !important;');
          })
        }
      }
      if (element.type.includes('Task') || (element.type == 'bpmn:SubProcess' && element.collapsed)) {
        updateElementSize(element);
      }
    });
    // 监听双击事件
    EventBus.on('element.dblclick', (event) => {
      const element = event.element;
      const gfx = elementRegistry.getGraphics(element.id);
      const textElement = gfx.querySelector('text');
      if (textElement) {
        textElement.style.display = 'none'; // 隐藏标题
      }
    });
    // 监听修改事件
    EventBus.on('commandStack.changed', () => {
      elementRegistry.forEach((element) => {
        const gfx = elementRegistry.getGraphics(element.id);
        const textElement = gfx.querySelector('text');
        if (textElement) {
          textElement.style.display = 'block'; // 显示标题
        }
      });
    });
    EventBus.on('import.done', (event)=> {
      updateAllElementSize()
    })
  });
  // 监听图形改变返回xml
  EventBus.on("commandStack.changed", async event => {
    try {
      recoverable.value = bpmnModeler.value.get("commandStack").canRedo();
      revocable.value = bpmnModeler.value.get("commandStack").canUndo();
      let { xml } = await bpmnModeler.value.saveXML({ format: true });
      emit("commandStack-changed", event)
      emit("update:modelValue", xml)
      emit("change", xml)
      // this.$emit("commandStack-changed", event);
      // this.$emit('update:modelValue', xml);
      // this.$emit("change", xml);
    } catch (e) {
      console.error(`[Process Designer Warn]: ${e.message || e}`);
    }
  });
}
/* 创建新的流程图 */
const createNewDiagram = async (xml) => {
  let newId = props.processId || `Process_${new Date().getTime()}`;
  let newName = props.processName ||  `${t("model-designer.default-name")}_${new Date().getTime()}`;
  let xmlString = xml || DefaultEmptyXML(newId, newName, prefix.value);
  try {
    let { warnings } = await bpmnModeler.value.importXML(xmlString);
    if (warnings && warnings.length) {
      warnings.forEach(warn => console.warn(warn));
    }
  } catch (e) {
    console.error(`[Process Designer Warn]: ${e?.message || e}`);
  }
}
const reset = () => {
  createNewDiagram(null).then(() => bpmnModeler.value.get("canvas").zoom(1, "auto"));
}

const simulationStatus = ref(false)

const startSimulate = () => {
  if(props.simulation) {
    simulationStatus.value = !simulationStatus.value;
    bpmnModeler.value.get("toggleMode").toggleMode()
  }
}

defineExpose({
  startSimulate,
  createNewDiagram
})
onMounted(()=>{
  initBpmnModeler()
  createNewDiagram(null);
})
</script>

<template>
    <div class="flex-col h-full relative w-full">
      <div ref="diagramRef" class="h-full space-y-4 rounded-lg overflow-hidden border" id="diagramRef"></div>
      <div class="absolute left-4 top-1/2 transform -translate-y-1/2 my-auto" :class="simulationStatus?'hidden':''">
        <ProcessPalette :bpmn-modeler="bpmnModeler"/>
      </div>
      <ViewerLayout :bpmn-modeler="bpmnModeler" :recoverable="recoverable" :revocable="revocable" @reset="reset"  :class="simulationStatus?'hidden':''"/>
      <div class="absolute w-full bottom-2 flex justify-center">
        <ViewerZoom  :bpmn-modeler="bpmnModeler"  :class="simulationStatus?'hidden':''"/>
      </div>
    </div>
</template>
<style>
.djs-palette {
  display: none !important;
}
</style>