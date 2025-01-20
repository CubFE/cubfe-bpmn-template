<script setup lang="ts">
import {ref, defineProps, watch, toRaw, nextTick} from 'vue';
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
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import CodeEditor from "@/components/ui/code/Editor.vue"
import {Textarea} from "@/components/ui/textarea";

const props = defineProps({
  bpmnElement: Object
})
const currentBpmnElement = ref(null)
const executeTypeOptions = [
  { label: 'Java Class', value:'class' },
  { label: 'Expression', value:'expression' },
  { label: 'Delegate', value:'delegateExpression' },
]
const defaultTaskForm = ref({
  executeType: "",
  class: "",
  expression: "",
  delegateExpression: ""
})
const serviceTaskForm = ref({})
watch(()=>props.bpmnElement, (newVal)=>{
  if(newVal) {
    nextTick(()=> {
      currentBpmnElement.value = newVal
      for (let key in defaultTaskForm.value) {
        let value = newVal.businessObject[key] || defaultTaskForm.value[key]
        if (value) serviceTaskForm.value.executeType = key
        serviceTaskForm.value[key] = value
      }
    })
  }
},{immediate:false})

const updateElementTask = () => {
  let taskAttr = Object.create(null);
  const type = serviceTaskForm.value.executeType;
  for (let key in serviceTaskForm.value) {
    if (key !== 'executeType' && key !== type) taskAttr[key] = null;
  }
  taskAttr[type] = serviceTaskForm.value[type] || "";
  window.bpmnInstances.modeling.updateProperties(toRaw(currentBpmnElement.value), taskAttr);
}
</script>

<template>
  <div>
    <FormField v-slot="{ componentField }" name="Form">
      <FormItem>
        <div  class="flex items-center gap-2">
          <FormLabel class="w-24">Execute Type</FormLabel>
          <FormControl >
            <Select v-bind="componentField" v-model="serviceTaskForm.executeType">
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select from" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectGroup>
                  <SelectItem v-for="item in executeTypeOptions" :value="item.value">
                    {{item.label}}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormControl>
        </div>
      </FormItem>
    </FormField>
    <FormField v-slot="{ value, handleChange }" name="isExecutable" v-if="serviceTaskForm.executeType == 'class'">
      <FormItem class="rounded-lg border mt-4">
        <FormControl>
          <code-editor :lang="'java'" v-model="serviceTaskForm.class" @change="updateElementTask"></code-editor>
        </FormControl>
      </FormItem>
    </FormField>
    <FormField v-slot="{ value, handleChange }" name="isExecutable" v-if="serviceTaskForm.executeType == 'expression'">
      <FormItem class="rounded-lg border mt-4">
        <FormControl>
          <code-editor :lang="'java'" v-model="serviceTaskForm.expression" @change="updateElementTask"></code-editor>
        </FormControl>
      </FormItem>
    </FormField>
    <FormField v-slot="{ value, handleChange }" name="isExecutable" v-if="serviceTaskForm.executeType == 'delegateExpression'">
      <FormItem class="rounded-lg border mt-4">
        <FormControl>
          <code-editor :lang="'java'" v-model="serviceTaskForm.delegateExpression" @change="updateElementTask"></code-editor>
        </FormControl>
      </FormItem>
    </FormField>
  </div>
</template>

<style scoped>

</style>