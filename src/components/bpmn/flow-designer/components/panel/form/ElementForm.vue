<script setup lang="ts">
import {ref, defineProps, watch, toRaw} from 'vue';
import { listForm }  from "@/api/index";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Switch } from '@/components/ui/switch'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {useI18n} from "vue-i18n";

const { t } = useI18n()

const props = defineProps({
  businessObject: Object,
  bpmnElement: Object
})

const currentBpmnElement = ref(null)
const formKey = ref("")
const localScope = ref(null)
const elExtensionElements = ref(null)
const otherExtensions = ref(null)
const prefix = ref("prefix")
watch(() => props.bpmnElement, (newVal) => {
  if (newVal) {
    currentBpmnElement.value = newVal;
    // elementBaseInfo.value = JSON.parse(JSON.stringify(newVal?.businessObject));
    formKey.value = newVal.businessObject.formKey;
    localScope.value = newVal.businessObject.localScope;
    // 获取元素扩展属性 或者 创建扩展属性
    elExtensionElements.value =
        newVal.businessObject.get("extensionElements") || window.bpmnInstances.moddle.create("bpmn:ExtensionElements", { values: [] });
    otherExtensions.value = elExtensionElements.value?.values.filter(ex => ex.$type !== `${prefix.value}:FormData`);
  }
}, { immediate: true });

const formOptions = ref([])
const getFormList = () => {
  listForm().then(response => {
    if(response.data.code == 200) {
      formOptions.value = response.data.rows
    }
  })
}
getFormList()


const updateElementFormKey = () => {
  window.bpmnInstances.modeling.updateProperties(toRaw(currentBpmnElement.value), { formKey: formKey.value });
}
const updateElementFormScope = (val) => {
  localScope.value = val
  window.bpmnInstances.modeling.updateProperties(toRaw(currentBpmnElement.value), { localScope: val });
}
</script>

<template>
  <form class="w-full" @submit.native.prevent>
    <FormField v-slot="{ componentField }" name="Form">
      <FormItem>
        <div  class="flex items-center gap-2">
<!--          <FormLabel class="w-24">Form</FormLabel>-->
          <FormControl >
            <Select v-bind="componentField" v-model="formKey" @update:modelValue="updateElementFormKey">
              <FormControl>
                <SelectTrigger>
                  <SelectValue :placeholder="t('model-designer.panel.form.select-placeholder')" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectGroup>
                  <SelectItem v-for="item in formOptions" :value="`key_${item.formId}`">
                    {{item.formName}}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormControl>
        </div>
      </FormItem>
    </FormField>
    <FormField v-slot="{ value, handleChange }" name="isExecutable">
      <FormItem class="flex flex-row items-center justify-between rounded-lg border p-4 mt-4">
        <div class="space-y-0.5">
          <FormLabel class="text-base">
            {{t('model-designer.panel.form.node-form')}}
          </FormLabel>
          <FormDescription>
            {{t('model-designer.panel.form.node-form-desc')}}
          </FormDescription>
        </div>
        <FormControl>
          <Switch
              v-model="localScope"
              @update:checked="updateElementFormScope"
          />
        </FormControl>
      </FormItem>
    </FormField>
  </form>
</template>

<style scoped>

</style>