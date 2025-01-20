<script setup lang="ts">
import {RefreshCcw, ZoomIn, ZoomOut} from "lucide-vue-next";
import {Button} from "@/components/ui/button";
import {defineProps, ref} from "vue";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {useI18n} from "vue-i18n";
const { t } = useI18n()
const props = defineProps({
  bpmnModeler: {
    required: true,
  }
})
const defaultZoom = ref(1)
const processZoomIn = (zoomStep = 0.1) => {
  let newZoom = Math.floor(defaultZoom.value * 100 + zoomStep * 100) / 100;
  if (newZoom > 4) {
    throw new Error("[Process Designer Warn ]: The zoom ratio cannot be greater than 4");
  }
  defaultZoom.value = newZoom;
  props.bpmnModeler.get("canvas").zoom(defaultZoom.value);
}
const processZoomOut = (zoomStep = 0.1) => {
  let newZoom = Math.floor(defaultZoom.value * 100 - zoomStep * 100) / 100;
  console.log(newZoom);
  if (newZoom < 0.2) {
    throw new Error("[Process Designer Warn ]: The zoom ratio cannot be less than 0.2");
  }
  defaultZoom.value = newZoom;
  props.bpmnModeler.get("canvas").zoom(defaultZoom.value);
}
const processZoomTo = (newZoom = 1) => {
  if (newZoom < 0.2) {
    throw new Error("[Process Designer Warn ]: The zoom ratio cannot be less than 0.2");
  }
  if (newZoom > 4) {
    throw new Error("[Process Designer Warn ]: The zoom ratio cannot be greater than 4");
  }
  defaultZoom.value = newZoom;
  props.bpmnModeler.get("canvas").zoom(newZoom);
}
const processReZoom = () =>{
  defaultZoom.value = 1;
  props.bpmnModeler.get("canvas").zoom("fit-viewport", "auto");
}
</script>

<template>
    <div class="rounded-lg flex items-center mx-auto gap-2 p-2 shadow-lg bg-background scale-75">
      <Button variant="secondary" size="sm" :disabled="defaultZoom < 0.2" @click="processZoomOut()">
        <span class="sr-only">ZoomOut</span>
        <ZoomOut class="h-4 w-4" />
      </Button>
      <span class="dark:text-white">{{Math.floor(defaultZoom * 10 * 10) + '%'}}</span>
<!--      <Input :value="" class="w-16 text-center h-8 dark:text-white" disabled/>-->
      <Button variant="secondary" size="sm" :disabled="defaultZoom > 4" @click="processZoomIn()">
        <span class="sr-only">ZoomIn</span>
        <ZoomIn class="h-4 w-4" />
      </Button>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger as-child>
            <Button variant="secondary" size="sm" @click="processReZoom()">
              <span class="sr-only">Center</span>
              <RefreshCcw class="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{{t("model-designer.canvas.zoom-reset")}}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

    </div>
</template>

<style scoped>

</style>