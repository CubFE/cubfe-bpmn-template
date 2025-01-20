<script setup lang="ts">
import {ref, defineProps, watch, toRaw} from 'vue';
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
import {useI18n} from "vue-i18n";

const { t } = useI18n()

const props = defineProps({
  businessObject: Object,
  type: String,
  idEditDisabled: {
    type: Boolean,
    default: true
  },
  bpmnElement: Object
})
const elementBaseInfo = ref({})
const currentBpmnElement = ref(null)
const updateBaseInfo = (key: string) => {
  const attrObj = Object.create(null);
  attrObj[key] = elementBaseInfo.value[key];
  if (key === "id") {
    window.bpmnInstances.modeling.updateProperties(toRaw(currentBpmnElement).value, {
      id: elementBaseInfo.value[key],
      di: { id: `${elementBaseInfo.value[key]}_di` }
    });
  } else {
    window.bpmnInstances.modeling.updateProperties(toRaw(currentBpmnElement.value), attrObj);
  }
}
const handleChangeExecutable = (val) => {
  elementBaseInfo.value.isExecutable  = val
  updateBaseInfo("isExecutable")
}
watch(() => props.bpmnElement, (newVal) => {
  if (newVal) {
    currentBpmnElement.value = newVal;
    elementBaseInfo.value = JSON.parse(JSON.stringify(newVal?.businessObject));
  }
}, { immediate: true });
</script>

<template>
  <form class="w-full" @submit.native.prevent>
    <FormField v-slot="{ componentField }" name="id">
      <FormItem>
        <div  class="flex items-center gap-2">
          <FormLabel class="w-24">{{t("model-designer.panel.base.id")}}</FormLabel>
          <FormControl>
            <Input type="text" :placeholder="t('model-designer.panel.base.id-placeholder')" v-model="elementBaseInfo.id"
                   :disabled="idEditDisabled || elementBaseInfo.$type === 'bpmn:Process'"
                   @change="updateBaseInfo('id')"
            />
          </FormControl>
        </div>
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="name">
      <FormItem>
        <div  class="flex items-center gap-2 mt-2">
          <FormLabel class="w-24">{{t("model-designer.panel.base.name")}}</FormLabel>
          <FormControl>
            <Input type="text" :placeholder="t('model-designer.panel.base.name-placeholder')" v-model="elementBaseInfo.name" @change="updateBaseInfo('name')"/>
          </FormControl>
        </div>
      </FormItem>
    </FormField>


    <!--流程的基础属性-->
    <template v-if="elementBaseInfo.$type === 'bpmn:Process'">
      <FormField v-slot="{ componentField }" name="versionTag">
        <FormItem>
          <div  class="flex items-center gap-2 mt-2">
            <FormLabel class="w-24">{{t("model-designer.panel.base.version")}}</FormLabel>
            <FormControl>
              <Input type="text" :placeholder="t('model-designer.panel.base.version-placeholder')" v-model="elementBaseInfo.versionTag" @change="updateBaseInfo('versionTag')"/>
            </FormControl>
          </div>
        </FormItem>
      </FormField>
      <FormField v-slot="{ value, handleChange }" name="isExecutable">
        <FormItem class="flex flex-row items-center justify-between rounded-lg border p-4 mt-4">
          <div class="space-y-0.5">
            <FormLabel class="text-base">
              {{t("model-designer.panel.base.executable")}}
            </FormLabel>
            <FormDescription>
              {{t("model-designer.panel.base.executable-desc")}}
            </FormDescription>
          </div>
          <FormControl>
            <Switch
                v-model="elementBaseInfo.isExecutable"
                @update:checked="handleChangeExecutable"
            />
          </FormControl>
        </FormItem>
<!--        <FormItem>-->
<!--          <div  class="flex items-center gap-2 mt-2">-->
<!--            <FormLabel class="w-24">Executable</FormLabel>-->
<!--            <FormControl>-->
<!--              <Switch :checked="value"  @update:checked="handleChange"/>-->
<!--            </FormControl>-->
<!--          </div>-->
<!--        </FormItem>-->
      </FormField>
    </template>
  </form>
</template>