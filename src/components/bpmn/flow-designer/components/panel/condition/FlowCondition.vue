<script setup lang="ts">
import {ref, defineProps, toRaw, watch, nextTick} from "vue";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form";
import CodeEditor from "@/components/ui/code/Editor.vue"
import {Textarea} from "@/components/ui/textarea";
import {useI18n} from "vue-i18n";

const { t } = useI18n()
const props = defineProps({
  bpmnElement: Object
})
const currentBpmnElement = ref(null)
const bpmnElementSource = ref(null)
const bpmnElementSourceRef = ref(null)
watch(() => props.bpmnElement, (newVal) => {
  if (newVal) {
    nextTick(()=>{
      currentBpmnElement.value = newVal;
      bpmnElementSource.value = newVal.source;
      bpmnElementSourceRef.value = newVal.businessObject.sourceRef;
      if (bpmnElementSourceRef.value && bpmnElementSourceRef.value.default && bpmnElementSourceRef.value.default.id === currentBpmnElement.value.id) {
        // 默认
        flowConditionForm.value = { type: "default" };
      } else if (!currentBpmnElement.value.businessObject.conditionExpression) {
        // 普通
        flowConditionForm.value = { type: "normal" };
      } else {
        // 带条件
        const conditionExpression = currentBpmnElement.value.businessObject.conditionExpression;
        flowConditionForm.value = { ...conditionExpression, type: "condition" };
        // resource 可直接标识 是否是外部资源脚本
        if (flowConditionForm.value.resource) {
          flowConditionForm.value.conditionType = "script"
          flowConditionForm.value.scriptType = "externalScript"
          return;
        }
        if (conditionExpression.language) {
          flowConditionForm.value.conditionType = "script"
          flowConditionForm.value.scriptType = "inlineScript"
          return;
        }
        flowConditionForm.value.conditionType = "expression"
      }
    })
  }
}, { immediate: true });
const flowConditionForm = ref({
  type:"",
  conditionType: "",
  body: "",
  language: "",
  scriptType: "",
  resource: ""
})
const typeOptions = ref([
  {label: t("model-designer.panel.condition.path-type-normal"), value: "normal"},
  {label: t("model-designer.panel.condition.path-type-default"), value: "default"},
  {label: t("model-designer.panel.condition.path-type-condition"), value: "condition"},
])
const conditionTypeOptions = ref([
  {label: t("model-designer.panel.condition.condition-type-expression"), value: "expression"},
  {label: t("model-designer.panel.condition.condition-type-script"), value: "script"},
])
const langTypeOptions = ref([
  {label: t("model-designer.panel.condition.lang-type-javascript"), value: "javascript"},
  {label: t("model-designer.panel.condition.lang-type-groovy"), value: "groovy"},
])
const scriptTypeOptions = ref([
  {label: t("model-designer.panel.condition.script-type-inline"), value: "inlineScript"},
  {label: t("model-designer.panel.condition.script-type-external"), value: "externalScript"},
  // {label: "InlineScript", value: "inlineScript"},
  // {label: "ExternalScript", value: "externalScript"},
])
const updateFlowType = (flowType) => {
  // 正常条件类
  if (flowType === "condition") {
    const flowConditionRef = window.bpmnInstances.moddle.create("bpmn:FormalExpression");
    window.bpmnInstances.modeling.updateProperties(toRaw(currentBpmnElement.value), {
      conditionExpression: flowConditionRef
    });
    return;
  }
  // 默认路径
  if (flowType === "default") {
    window.bpmnInstances.modeling.updateProperties(toRaw(currentBpmnElement.value), {
      conditionExpression: null
    });
    window.bpmnInstances.modeling.updateProperties(toRaw(bpmnElementSource.value), {
      default: currentBpmnElement.value
    });
    return;
  }
  // 正常路径，如果来源节点的默认路径是当前连线时，清除父元素的默认路径配置
  if (bpmnElementSourceRef.value.default && bpmnElementSourceRef.value.default.id === currentBpmnElement.value.id) {
    window.bpmnInstances.modeling.updateProperties(toRaw(bpmnElementSource.value), {
      default: null
    });
  }
  window.bpmnInstances.modeling.updateProperties(toRaw(currentBpmnElement.value), {
    conditionExpression: null
  });
}

const updateFlowCondition = () => {
  let { conditionType, scriptType, body, resource, language } = flowConditionForm.value;
  let condition;
  if (conditionType === "expression") {
    console.log(1)
    condition = window.bpmnInstances.moddle.create("bpmn:FormalExpression", { body });
  } else {
    if (scriptType === "inlineScript") {
      console.log(2, body)
      condition = window.bpmnInstances.moddle.create("bpmn:FormalExpression", { body, language });
      flowConditionForm.value.resource = ""
    } else {
      console.log(3)
      flowConditionForm.value.body = ""
      condition = window.bpmnInstances.moddle.create("bpmn:FormalExpression", { resource, language });
    }
  }
  window.bpmnInstances.modeling.updateProperties(toRaw(currentBpmnElement.value), { conditionExpression: condition });
}

</script>

<template>
  <form class="w-full" @submit.native.prevent>
    <FormField v-slot="{ componentField }" name="type">
      <FormItem>
        <div  class="flex items-center gap-2">
          <FormLabel class="w-24">{{t("model-designer.panel.condition.path-type")}}</FormLabel>
          <FormControl >
            <Select v-bind="componentField" v-model="flowConditionForm.type" @update:modelValue="updateFlowType">
              <SelectTrigger>
                <SelectValue :placeholder='t("app.select-placeholder")' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem v-for="item in typeOptions" :value="item.value">
                    {{item.label}}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormControl>
        </div>
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="conditionType" v-if="flowConditionForm.type=='condition'">
      <FormItem>
        <div  class="flex items-center gap-2 mt-2">
          <FormLabel class="w-24">{{t("model-designer.panel.condition.condition-type")}}</FormLabel>
          <FormControl >
            <Select v-bind="componentField" v-model="flowConditionForm.conditionType" @update:modelValue="updateFlowType">
              <SelectTrigger>
                <SelectValue :placeholder='t("app.select-placeholder")' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem v-for="item in conditionTypeOptions" :value="item.value">
                    {{item.label}}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormControl>
        </div>
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="expression" v-if="flowConditionForm.conditionType && flowConditionForm.conditionType=='expression'">
      <FormItem>
        <div  class="flex items-center gap-2 mt-2">
          <FormLabel class="w-24">{{t("model-designer.panel.condition.condition-type-expression")}}</FormLabel>
          <FormControl >
            <Textarea type="text" :placeholder="t('app.input-placeholder')" v-model="flowConditionForm.body" @change="updateFlowCondition"/>
          </FormControl>
        </div>
      </FormItem>
    </FormField>
    <template v-if="flowConditionForm.conditionType && flowConditionForm.conditionType === 'script'">
      <FormField v-slot="{ componentField }" name="conditionType" v-if="flowConditionForm.type=='condition'">
        <FormItem>
          <div  class="flex items-center gap-2 mt-2">
            <FormLabel class="w-24">{{t("model-designer.panel.condition.script-type")}}</FormLabel>
            <FormControl >
              <Select v-bind="componentField" v-model="flowConditionForm.scriptType" @update:modelValue="updateFlowCondition">
                <FormControl>
                  <SelectTrigger>
                    <SelectValue :placeholder="t('app.select-placeholder')" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem v-for="item in scriptTypeOptions" :value="item.value">
                      {{item.label}}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormControl>
          </div>
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="conditionType" v-if="flowConditionForm.type=='condition'">
        <FormItem>
          <div  class="flex items-center gap-2 mt-2">
            <FormLabel class="w-24">{{t("app.language")}}</FormLabel>
            <FormControl >
              <Select v-bind="componentField" v-model="flowConditionForm.language" @update:modelValue="updateFlowCondition">
                <SelectTrigger>
                  <SelectValue :placeholder="t('app.select-placeholder')" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem v-for="item in langTypeOptions" :value="item.value">
                      {{item.label}}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormControl>
          </div>
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="body"  v-if="flowConditionForm.scriptType === 'inlineScript' && flowConditionForm.language" key="body">
        <FormItem>
          <div  class="flex items-center gap-2 mt-2">
            <FormControl >
              <code-editor :lang="flowConditionForm.language" v-model="flowConditionForm.body" @change="updateFlowCondition"></code-editor>
            </FormControl>
          </div>
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="resource"  v-if="flowConditionForm.scriptType === 'externalScript'" key="resource">
        <FormItem>
          <div  class="flex items-center gap-2 mt-2">
            <FormLabel class="w-24">{{t('model-designer.panel.condition.resource')}}</FormLabel>
            <FormControl >
              <Textarea type="text" :placeholder="t('app.input-placeholder')" v-model="flowConditionForm.resource" @change="updateFlowCondition"/>
            </FormControl>
          </div>
        </FormItem>
      </FormField>
    </template>
  </form>
</template>

<style scoped>

</style>