<script setup lang="ts">
import {ref, defineProps, onMounted, watch} from "vue"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import BasePanel from "./components/panel/base/ElementBaseInfo.vue"
import FormPanel from "./components/panel/form/ElementForm.vue"
import { ScrollArea } from '@/components/ui/scroll-area'
import FlowCondition from "@/components/bpmn/flow-designer/components/panel/condition/FlowCondition.vue";
import ElementTask from "@/components/bpmn/flow-designer/components/panel/task/ElementTask.vue";
import {useI18n} from "vue-i18n";

const { t } = useI18n()

const props = defineProps({
  bpmnModeler: {
    type: Object,
    required: true,
  },
  prefix: {
    type: String,
    required: true,
    default: 'flowable'
  },
  idEditDisabled: {
    type: Boolean,
    default: false
  }
})
const defaultValue = ['base']
const timer = ref(null)

const currentBpmnElement = ref(null)
const elementId = ref("")
const elementType = ref("")
const elementBusinessObject = ref({}) // 元素 businessObject 镜像，提供给需要做判断的组件使用
const conditionFormVisible = ref(false) // 流转条件设置
const formVisible = ref(false) //表单配置

const initModels = () => {
  // init modeler
  if (!props.bpmnModeler) {
    timer.value = setTimeout(() => initModels(), 10);
    return;
  }
  if (timer.value) clearTimeout(timer.value);
  window.bpmnInstances = {
    modeler: props.bpmnModeler,
    modeling: props.bpmnModeler.get("modeling"),
    moddle: props.bpmnModeler.get("moddle"),
    eventBus: props.bpmnModeler.get("eventBus"),
    bpmnFactory: props.bpmnModeler.get("bpmnFactory"),
    elementFactory: props.bpmnModeler.get("elementFactory"),
    elementRegistry: props.bpmnModeler.get("elementRegistry"),
    replace: props.bpmnModeler.get("replace"),
    selection: props.bpmnModeler.get("selection")
  };
  getActiveElement();
}

const getActiveElement = () => {
  // init First bpmn:Process
  initFormOnChanged(null);
  props.bpmnModeler.on("import.done", e => {
    initFormOnChanged(null);
  });
  // 监听选择事件，修改当前激活的元素以及表单
  props.bpmnModeler.on("selection.changed", ({ newSelection }) => {
    initFormOnChanged(newSelection[0] || null);
  });
  props.bpmnModeler.on("element.changed", ({ element }) => {
    // 保证 修改 "默认流转路径" 类似需要修改多个元素的事件发生的时候，更新表单的元素与原选中元素不一致。
    if (element && element.id === elementId.value) {
      initFormOnChanged(element);
    }
  });
}
const initFormOnChanged = (element) => {
  let activatedElement = element;
  if (!activatedElement) {
    activatedElement =
        window.bpmnInstances.elementRegistry.find(el => el.type === "bpmn:Process") ??
        window.bpmnInstances.elementRegistry.find(el => el.type === "bpmn:Collaboration");
  }
  if (!activatedElement) return;
  // console.log(`
  //             ----------
  //     select element changed:
  //               id:  ${activatedElement.id}
  //             type:  ${activatedElement.businessObject.$type}
  //             ----------
  //             `);
  // console.log("businessObject: ", activatedElement.businessObject);
  window.bpmnInstances.bpmnElement = activatedElement;
  currentBpmnElement.value = activatedElement;
  elementId.value = activatedElement.id;
  elementType.value = activatedElement.type.split(":")[1] || "";
  elementBusinessObject.value = JSON.parse(JSON.stringify(activatedElement.businessObject));
  conditionFormVisible.value = (
      elementType.value === "SequenceFlow" &&
      activatedElement.source &&
      activatedElement.source.type.indexOf("StartEvent") === -1
  );
  formVisible.value = elementType.value === "UserTask" || elementType.value === "StartEvent";
}
initModels()
</script>

<template>
  <ScrollArea class="w-full" style="height: calc(100vh - 252px)">
    <Accordion type="multiple" class="w-full" collapsible :default-value="defaultValue">
      <AccordionItem name="base" value="base">
        <AccordionTrigger class="px-4 hover:no-underline text-sm dark:text-white">{{t("model-designer.panel.base.title")}}</AccordionTrigger>
        <AccordionContent class="p-4 border-t">
          <base-panel :business-object="elementBusinessObject" :id-edit-disabled="idEditDisabled" :type="elementType" :bpmn-element="currentBpmnElement"></base-panel>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem name="form" value="form" v-if="formVisible">
        <AccordionTrigger class="px-4 hover:no-underline text-sm dark:text-white">{{t("model-designer.panel.form.title")}}</AccordionTrigger>
        <AccordionContent class="p-4 border-t">
          <form-panel :bpmn-element="currentBpmnElement"></form-panel>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem name="condition" value="condition" v-if="conditionFormVisible">
        <AccordionTrigger class="px-4 hover:no-underline text-sm dark:text-white">{{t("model-designer.panel.condition.title")}}</AccordionTrigger>
        <AccordionContent class="p-4 border-t">
          <flow-condition :bpmn-element="currentBpmnElement"></flow-condition>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem name="message" value="task" v-if="elementType.indexOf('Task') !== -1">
        <AccordionTrigger class="px-4 hover:no-underline text-sm dark:text-white">{{t("model-designer.panel.task.title")}}</AccordionTrigger>
        <AccordionContent class="p-4 border-t">
          <element-task :id="elementId" :type="elementType" :bpmn-element="currentBpmnElement"></element-task>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem name="message" value="message" v-if="elementType === 'Process'">
        <AccordionTrigger class="px-4 hover:no-underline text-sm dark:text-white">Message</AccordionTrigger>
        <AccordionContent class="p-4 border-t">
          <form-panel :business-object="elementBusinessObject" :id-edit-disabled="idEditDisabled" :type="elementType" :bpmn-element="currentBpmnElement"></form-panel>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </ScrollArea>
</template>

<style scoped>

</style>