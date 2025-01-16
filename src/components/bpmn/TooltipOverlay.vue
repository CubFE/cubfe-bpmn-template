<script setup lang="ts">
import {PropType, defineProps, ref, watch, nextTick} from 'vue'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {Info} from "lucide-vue-next";
import {Button} from "@/components/ui/button";

const props = defineProps({
  text: {
    type: String as PropType<string>,
    required: true,
  },
})
const tooltipContent = ref("")
watch(()=>props.text, (newVal)=> {
  console.log(newVal,'input')
  tooltipContent.value = newVal
},{immediate:true})
</script>

<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger as-child>
        <button variant="ghost" size="icon" class="rounded-full"><Info class="w-4 h-4"/></button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{{tooltipContent}}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>

<style scoped>

</style>