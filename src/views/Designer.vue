<script setup lang="ts">
import {onMounted, ref, shallowRef, defineEmits} from "vue"
import FlowDesigner from "@/components/bpmn/flow-designer/Index.vue"
import {useToast} from "@/components/ui/toast";
import { useConfirm} from "@/components/ui/confirm";
import {useI18n} from "vue-i18n";
import { useLoading } from "@/hooks/useLoading.ts";
import {useRoute} from "vue-router";

const route = useRoute()

const {t} = useI18n()
const confirm = useConfirm()
const { toast } = useToast()
const { showLoading, hideLoading } = useLoading();
const bpmnXml = ref("")
const designerData = ref({
  loading: false,
  bpmnXml: '',
  modelId: undefined,
  title: "",
  form: {
    processName: null,
    processKey: null
  }
})

const save = (xml) => {
  let dataBody = {
    modelId: designerData.value.modelId,
    bpmnXml: xml
  }
  confirm({
    title: t('app.tips'),
    message: t('model-designer.tools.save-tips'),//"Automatic alignment may cause graphic deformation. Do you want to continue?",
    confirmButtonText: t('btn.confirm'),
    cancelButtonText: t('btn.cancel'),
  }).then((result: any)=>{
    if(result) {
      // confirmSave(dataBody, true)
    }
  })
}
</script>

<template>
  <div class="h-full flex-col md:flex">
    <FlowDesigner :bpmn-xml="bpmnXml" :designer-form="designerData" @save="save"/>
  </div>
</template>
<style>
.djs-palette {
  display: none !important;
}
</style>