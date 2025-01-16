<script setup lang="ts">
import {defineProps, nextTick, ref, watch} from "vue";
import UserTaskPanel from "./components/UserTask.vue";
import ServiceTaskPanel from "./components/ServiceTask.vue";
import ScriptTaskPanel from "./components/ScriptTask.vue";
import ReceiveTaskPanel from "./components/ReceiveTask.vue";

const props = defineProps({
  id: String,
  type: String,
  bpmnElement: Object
})
const currentBpmnElement = ref(null)
const taskConfigForm = ref({
  asyncAfter: false,
  asyncBefore: false,
  exclusive: false
})
const witchTaskComponent = ref("")
const installedComponent = ref({
  UserTask: UserTaskPanel, // User Task
  ServiceTask: ServiceTaskPanel, // Service Task
  ScriptTask: ScriptTaskPanel, // Script Task
  ReceiveTask: ReceiveTaskPanel // Receive Message Task
})

watch(()=>props.bpmnElement, (newVal) => {
  if (newVal) {
    nextTick(() => {
      currentBpmnElement.value = window.bpmnInstances.bpmnElement;
      taskConfigForm.value.asyncBefore = currentBpmnElement.value?.businessObject?.asyncBefore;
      taskConfigForm.value.asyncAfter = currentBpmnElement.value?.businessObject?.asyncAfter;
      taskConfigForm.value.exclusive = currentBpmnElement.value?.businessObject?.exclusive;
    })
  }
}, {immediate: true})

watch(()=>props.type, (newVal) => {
  if (newVal) {
      witchTaskComponent.value = installedComponent.value[newVal];
  }
})

</script>

<template>
  <form class="w-full" @submit.native.prevent>
    <user-task-panel v-if="type=='UserTask'" v-bind="$props" :bpmn-element="currentBpmnElement"/>
    <service-task-panel v-if="type=='ServiceTask'" v-bind="$props" :bpmn-element="currentBpmnElement"/>
    <script-task-panel v-if="type=='ScriptTask'" v-bind="$props" :bpmn-element="currentBpmnElement"/>
  </form>
</template>

<style scoped>

</style>