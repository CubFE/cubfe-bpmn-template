<script setup lang="ts">

import {Separator} from "@/components/ui/separator";
import {Button} from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {ArrowLeftFromLine, ArrowRightFromLine, CodeXml, FileJson, Image, X} from "lucide-vue-next";
import Designer from "@/components/bpmn/flow-designer/Designer.vue";
import {nextTick, ref, watch} from "vue";
import CustomContentPadProvider from '@/components/bpmn/context-pad';
import PropertiesPanel from "@/components/bpmn/flow-designer/PropertiesPanel.vue";
import {useI18n} from "vue-i18n";
import CodeViewer from "@/components/ui/code/Viewer.vue";
import CodeEditor from "@/components/ui/code/Editor.vue";
import {Input} from "@/components/ui/input";
import router from "@/router";

const {t} = useI18n()

const emit = defineEmits(['save'])
const props = defineProps({
  bpmnXml: {
    type: String,
    required: true
  },
  designerForm: {
    type: Object,
    required: true
  }
})
const xmlString = ref('')
const controlForm = ref({
  processId: props.designerForm.processKey || '',
  processName: props.designerForm.processName || '',
  simulation: true,
  labelEditing: true,
  labelVisible: true,
  prefix: 'flowable',
  headerButtonSize: 'small',
  additionalModel: []
})
// bpmn modeler
const modeler = ref(null)
// selected element node
const element = ref(null)

watch(()=>props.bpmnXml, (newVal, oldVal) => {
  xmlString.value = newVal
  nextTick(()=>{
    processDesigner.value.createNewDiagram(newVal);
  })
},{immediate: true})
watch(()=> props.designerForm, (newVal) => {
  controlForm.value.processId = newVal.form.processKey || ''
  controlForm.value.processName = newVal.form.processName || ''
}, {immediate: true})
const elementClick = (element) => {
  element.value = element
  // console.log(element.type)
  isShowPanel.value = !!element;
}
const initModeler = (m) => {
    modeler.value = m;
}
const handlerEvent = (eventName, element) => {

}
const onSaveProcess = () => {
  return new Promise((resolve, reject) => {
    if (modeler.value == null) {
      reject();
    }
    modeler.value && modeler.value.saveXML({ format: true }).then(({ xml }) => {
      emit('save', xml);
      resolve(xml);
    });
  })
}
const onClose = () => {
  router.push({path: '/admin/model'})
}
const isShowPanel = ref(false)
const tooglePanelShow = () => {
  isShowPanel.value = !isShowPanel.value
}
const processDesigner = ref(null)
const previewContent = ref("")
const previewType = ref("xml")
const previewModalVisible = ref(false)
const preview = () => {
  modeler.value.saveXML({ format: true }).then(({ xml }) => {
    previewContent.value = xml;
    previewType.value = "xml";
    previewModalVisible.value = true;
  });
}
const importFileRef = ref(null)
const importFile = () => {
  importFileRef.value.click()
}
const fileChange = () => {
  const file = importFileRef.value.files[0];
  const reader = new FileReader();
  reader.readAsText(file);
  reader.onload = function() {
    let xmlStr = this.result;
    processDesigner.value.createNewDiagram(xmlStr);
  };
}
// 根据所需类型进行转码并返回下载地址
const setEncoded = (type, filename = "diagram", data) =>{
  const encodedData = encodeURIComponent(data);
  return {
    filename: `${filename}.${type}`,
    href: `data:application/${type === "svg" ? "text/xml" : "bpmn20-xml"};charset=UTF-8,${encodedData}`,
    data: data
  }
}
const downloadProcess = async(type, name) => {
  try {
    if (type === "xml" || type === "bpmn") {
      const { err, xml } = await modeler.value.saveXML();
      if (err) {
        console.error(`[Process Designer Warn ]: ${err.message || err}`);
      }
      let { href, filename } = setEncoded(type.toUpperCase(), name, xml);
      downloadFunc(href, filename);
    } else {
      const { err, svg } = await modeler.value.saveSVG();
      if (err) {
        return console.error(err);
      }
      let { href, filename } = setEncoded("SVG", name, svg);
      downloadFunc(href, filename);
    }
  } catch (e) {
    console.error(`[Process Designer Warn ]: ${e.message || e}`);
  }
  function downloadFunc(href, filename) {
    if (href && filename) {
      let a = document.createElement("a");
      a.download = filename; //指定下载的文件名
      a.href = href; //  URL对象
      a.click(); // 模拟点击
      URL.revokeObjectURL(a.href); // 释放URL 对象
    }
  }
}
const downloadProcessAsXml = () => {
  downloadProcess("xml");
}
const downloadProcessAsBpmn = () => {
  downloadProcess("bpmn");
}
const downloadProcessAsSvg = () => {
  downloadProcess("svg");
}
const simulationStatus = ref(false)
const simulate = () => {
  simulationStatus.value = !simulationStatus.value
  processDesigner.value && processDesigner.value.startSimulate();
}
</script>

<template>
  <div class="h-full flex-col md:flex">
    <div class="flex flex-col items-start justify-between space-y-2 px-8 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
      <h2 class="text-lg font-semibold mr-auto">
        <span v-if="controlForm.processId">{{controlForm.processName}}-</span>{{t("model-designer.title")}}
      </h2>
      <div class="flex space-x-2 items-center sm:justify-end">
        <Button variant="secondary" @click="preview">{{t("model-designer.tools.preview-xml")}}</Button>
        <Button variant="secondary" @click="importFile">{{t("model-designer.tools.import")}}</Button>
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="secondary">
              {{t("model-designer.tools.download")}}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem @click="downloadProcessAsBpmn">
              <FileJson class="mr-2 h-4 w-4" />
              <span>{{t("model-designer.tools.download-bpmn")}}</span>
            </DropdownMenuItem>
            <DropdownMenuItem @click="downloadProcessAsXml">
              <CodeXml class="mr-2 h-4 w-4" />
              <span>{{t("model-designer.tools.download-xml")}}</span>
            </DropdownMenuItem>
            <DropdownMenuItem @click="downloadProcessAsSvg">
              <Image class="mr-2 h-4 w-4" />
              <span>{{t("model-designer.tools.download-svg")}}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="secondary" @click="simulate">{{simulationStatus?t("model-designer.tools.simulate-stop"):t("model-designer.tools.simulate")}}</Button>
        <Button v-if="controlForm.processId" variant="secondary" @click="onSaveProcess">{{t("model-designer.tools.save")}}</Button>
        <Button v-if="controlForm.processId" variant="destructive" size="icon" class="rounded-full" @click="onClose"><X/></Button>
        <input ref="importFileRef" type="file" class="hidden" @change="fileChange">
        <Dialog :open="previewModalVisible" @update:open="previewModalVisible = false">
          <DialogContent class="sm:max-w-[600px] grid-rows-[auto_minmax(0,1fr)_auto] p-0 max-h-[90dvh]">
            <DialogHeader class="p-6 pb-0">
              <DialogTitle>{{t('model-designer.tools.preview-xml')}}</DialogTitle>
              <DialogDescription>
                {{t('model-designer.tools.preview-xml-desc')}}
              </DialogDescription>
            </DialogHeader>
            <div class="grid gap-4 py-4 px-6">
              <code-editor :lang="previewType" v-model="previewContent" ></code-editor>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
    <Separator />
    <div class="flex-1">
      <div class="h-full px-8 py-6">
        <div class="grid h-full items-stretch gap-6" :class="isShowPanel && !simulationStatus?'md:grid-cols-[minmax(0,1fr)_420px]':'md:grid-cols-[minmax(0,1fr)_60px]'">
          <div class="flex-col relative w-full">
            <Designer v-model="xmlString"
                      v-bind="controlForm"
                      keyboard
                      ref="processDesigner"
                      :events="[
                            'element.click',
                            'connection.added',
                            'connection.removed',
                            'connection.changed'
                          ]"
                      @element-click="elementClick"
                      @init-finished="initModeler"
                      @event="handlerEvent"
                      @save="onSaveProcess"
            />
          </div>
          <div class="flex-col space-y-4 sm:flex border rounded-lg h-full" v-show="isShowPanel && !simulationStatus">
            <div class="grid gap-0">
              <header class="flex shrink-0 items-center gap-2 p-4  border-b dark:border-gray-800">
                <!--      <header class="flex h-16 shrink-0 items-center gap-2">-->
                <div class="flex items-center justify-between w-full dark:text-white">
                  {{t("model-designer.panel.title")}}
                  <ArrowRightFromLine @click="tooglePanelShow"></ArrowRightFromLine>
                </div>
              </header>
              <PropertiesPanel :bpmn-modeler="modeler" :prefix="controlForm.prefix"/>
            </div>
          </div>
          <div class="flex-col space-y-4 sm:flex border rounded-lg p-4 justify-center dark:text-white" v-show="!isShowPanel">
            <ArrowLeftFromLine @click="tooglePanelShow"></ArrowLeftFromLine>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>