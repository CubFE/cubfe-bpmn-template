<script setup lang="ts">
import { ref } from 'vue'
import {
  AlignCenterHorizontal,
  AlignCenterVertical,
  AlignEndHorizontal, AlignEndVertical,
  AlignStartHorizontal,
  AlignStartVertical,
  CornerUpLeft,
  CornerUpRight, RefreshCcw,
  RotateCcw,
  AlignHorizontalJustifyStart,
  AlignVerticalJustifyStart,
} from "lucide-vue-next";
import { layoutProcess } from 'bpmn-auto-layout';
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {defineProps, watch} from "vue";
import { useToast } from '@/components/ui/toast/use-toast.ts'
import { useConfirm} from "@/components/ui/confirm";
import {useI18n} from "vue-i18n";

const confirm = useConfirm();
const { toast } = useToast()
const { t } = useI18n()

const props = defineProps({
  bpmnModeler: {
    required: true,
  },
  recoverable: {
    required: true,
    default: false,
  },
  revocable: {
    required: true,
    default: false,
  }
})
const dRecoverable = ref(false);
const dRevocable = ref(false);
watch(()=>props.recoverable, (newVal) => {
  dRecoverable.value = newVal
})
watch(()=>props.revocable, (newVal) => {
  dRevocable.value = newVal
})


const elementsAlign = (align) => {
  const Align = props.bpmnModeler.get("alignElements");
  const Selection = props.bpmnModeler.get("selection");
  const SelectedElements = Selection.get();
  if (!SelectedElements || SelectedElements.length <= 1) {
    toast({
      title: t('app.tips'),
      description: t('model-designer.canvas.align-tips') //'Hold down the Ctrl key to select multiple elements for alignment.',
    })
    return;
  }
  confirm({
    title: t('app.tips'),
    message: t('model-designer.canvas.layout-tips'),//"Automatic alignment may cause graphic deformation. Do you want to continue?",
    confirmButtonText: t('btn.continue'),
    cancelButtonText: t('btn.cancel'),
  }).then((result)=>{
    if(result) {
      Align.trigger(SelectedElements, align)
    }
  })
}

const processRedo = () => {
      props.bpmnModeler.get("commandStack").redo();
}
const processUndo = () => {
      props.bpmnModeler.get("commandStack").undo();
}
const emit = defineEmits(['reset'])
const processRestart = () => {
  dRecoverable.value = false;
  dRevocable.value = false;
  emit("reset")
}

// 应用纵向布局
const applyLayout = async (direction: string = 'vertical') => {
  try {
    // 获取当前 BPMN 模型器的 XML
    const { xml } = await props.bpmnModeler.saveXML({ format: true });
    // 应用布局处理，设置布局方向
    const diagramWithLayoutXML = await layoutProcess(xml, { direction });
    // 重新加载布局后的 XML
    await props.bpmnModeler.importXML(diagramWithLayoutXML);
    props.bpmnModeler.get("canvas").zoom("fit-viewport", "auto");
  } catch (err) {
    console.error('纵向布局失败:', err);
  }
}
</script>

<template>
  <div class="rounded-lg flex items-center gap-1 p-2 absolute right-2 top-0 shadow-lg bg-background scale-75 origin-right">
<!--    <TooltipProvider>-->
<!--      <Tooltip>-->
<!--        <TooltipTrigger as-child>-->
<!--          <Button variant="secondary" size="sm" @click="applyLayout('vertical')">-->
<!--            <span class="sr-only">Left Align</span>-->
<!--            <AlignVerticalJustifyStart class="h-4 w-4" />-->
<!--          </Button>-->
<!--        </TooltipTrigger>-->
<!--        <TooltipContent>-->
<!--          <p>{{t("model-designer.canvas.v-layout")}}</p>-->
<!--        </TooltipContent>-->
<!--      </Tooltip>-->
<!--    </TooltipProvider>-->

<!--    <TooltipProvider>-->
<!--      <Tooltip>-->
<!--        <TooltipTrigger as-child>-->
<!--          <Button variant="secondary" size="sm" @click="applyLayout('horizontal')">-->
<!--            <span class="sr-only">Left Align</span>-->
<!--            <AlignHorizontalJustifyStart class="h-4 w-4" />-->
<!--          </Button>-->
<!--        </TooltipTrigger>-->
<!--        <TooltipContent>-->
<!--          <p>{{t("model-designer.canvas.v-layout")}}</p>-->
<!--        </TooltipContent>-->
<!--      </Tooltip>-->
<!--    </TooltipProvider>-->
<!--    <Separator orientation="vertical" class="h-6 mx-2"/>-->
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger as-child>
          <Button variant="secondary" size="sm" @click="elementsAlign('left')">
            <span class="sr-only">Left Align</span>
            <AlignStartVertical class="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{{t("model-designer.canvas.align-left")}}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger as-child>
          <Button variant="secondary" size="sm" @click="elementsAlign('right')">
            <span class="sr-only">Right Align</span>
            <AlignEndVertical class="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{{t("model-designer.canvas.align-right")}}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger as-child>
          <Button variant="secondary" size="sm" @click="elementsAlign('top')">
            <span class="sr-only">Top Align</span>
            <AlignStartHorizontal class="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{{t("model-designer.canvas.align-top")}}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger as-child>
          <Button variant="secondary" size="sm" @click="elementsAlign('bottom')">
            <span class="sr-only">Bottom Align</span>
            <AlignEndHorizontal class="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{{t("model-designer.canvas.align-bottom")}}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger as-child>
          <Button variant="secondary" size="sm" @click="elementsAlign('center')">
            <span class="sr-only">Horizontal-align-center</span>
            <AlignCenterVertical class="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{{t("model-designer.canvas.align-center-h")}}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger as-child>
          <Button variant="secondary" size="sm" @click="elementsAlign('middle')">
            <span class="sr-only">Vertical Align Center</span>
            <AlignCenterHorizontal class="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{{t("model-designer.canvas.align-center-v")}}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
    <Separator orientation="vertical" class="h-6 mx-2"/>

    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger as-child>
          <Button variant="secondary" size="sm" :disabled="!revocable" @click="processUndo">
            <span class="sr-only">Undo</span>
            <CornerUpLeft class="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{{t("model-designer.canvas.undo")}}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger as-child>
          <Button variant="secondary" size="sm" :disabled="!recoverable" @click="processRedo">
            <span class="sr-only">Redo</span>
            <CornerUpRight class="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{{t("model-designer.canvas.redo")}}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger as-child>
          <Button variant="secondary" size="sm" @click="processRestart">
            <span class="sr-only">Reset</span>
            <RotateCcw class="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{{t("model-designer.canvas.reset")}}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </div>
</template>

<style scoped>

</style>