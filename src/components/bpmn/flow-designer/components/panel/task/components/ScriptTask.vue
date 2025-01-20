<script setup lang="ts">
import {defineProps, nextTick, ref, toRaw, watch} from 'vue';
import {FormControl, FormField, FormItem, FormLabel,} from '@/components/ui/form'
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import CodeEditor from "@/components/ui/code/Editor.vue"
import {Textarea} from "@/components/ui/textarea";

const props = defineProps({
  bpmnElement: Object
})
const currentBpmnElement = ref(null)

const langTypeOptions = ref([
  {label: "JavaScript", value: "javascript"},
  {label: "groovy", value: "groovy"},
])
const scriptTypeOptions = [
  { label: 'Inline', value:'inline' },
  { label: 'External', value:'external' },
]
const defaultTaskForm = ref({
  scriptFormat: "",
  scriptType: "",
  script: "",
  resource: "",
  resultVariable: ""
})
const scriptTaskForm = ref({})
watch(()=>props.bpmnElement, (newVal)=>{
  if(newVal) {
    nextTick(()=> {
      currentBpmnElement.value = newVal
      for (let key in defaultTaskForm.value) {
        scriptTaskForm.value[key] = newVal.businessObject[key] || defaultTaskForm.value[key]
      }
      scriptTaskForm.value.scriptType = scriptTaskForm.value.script ? "inline" : "external"
    })
  }
},{immediate:false})

const updateElementTask = () => {
  let taskAttr = Object.create(null);
  taskAttr.scriptFormat = scriptTaskForm.value.scriptFormat || null;
  taskAttr.resultVariable = scriptTaskForm.value.resultVariable || null;
  if (scriptTaskForm.value.scriptType === "inline") {
    taskAttr.script = scriptTaskForm.value.script || null;
    taskAttr.resource = null;
  } else {
    taskAttr.resource = scriptTaskForm.value.resource || null;
    taskAttr.script = null;
  }
  window.bpmnInstances.modeling.updateProperties(toRaw(currentBpmnElement.value), taskAttr);
}
</script>

<template>
  <div>
    <FormField v-slot="{ componentField }" name="scriptFormat">
      <FormItem>
        <div  class="flex items-center gap-2 mt-2">
          <FormLabel class="w-24">Language</FormLabel>
          <FormControl >
            <Select v-bind="componentField" v-model="scriptTaskForm.scriptFormat" @update:modelValue="updateElementTask">
              <SelectTrigger>
                <SelectValue placeholder="Select script language" />
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
    <FormField v-slot="{ componentField }" name="scriptType">
      <FormItem>
        <div  class="flex items-center gap-2 mt-2">
          <FormLabel class="w-24">Script Type</FormLabel>
          <FormControl >
            <Select v-bind="componentField" v-model="scriptTaskForm.scriptType" @update:modelValue="updateElementTask">
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select Script Type" />
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
    <FormField v-slot="{ componentField }" name="script"  v-if="scriptTaskForm.scriptType === 'inline'" key="body">
      <FormItem>
        <div  class="flex items-center gap-2 mt-2">
          <FormControl >
            <code-editor :lang="scriptTaskForm.scriptFormat" v-model="scriptTaskForm.script" @change="updateElementTask"></code-editor>
          </FormControl>
        </div>
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="resource"  v-if="scriptTaskForm.scriptType === 'external'" key="resource">
      <FormItem>
        <div  class="flex items-center gap-2 mt-2">
          <FormLabel class="w-24">Resource</FormLabel>
          <FormControl >
            <Textarea type="text" placeholder="Place enter script resource" v-model="scriptTaskForm.resource" @change="updateElementTask"/>
          </FormControl>
        </div>
      </FormItem>
    </FormField>
  </div>
</template>