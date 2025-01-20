<script setup lang="ts">
import { cn } from '@/lib/utils'
import { ToastViewport, type ToastViewportProps } from 'radix-vue'
import { computed, type HTMLAttributes } from 'vue'
const props = defineProps<ToastViewportProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

// 根据 position 动态生成类名
const positionClass = computed(() => {
  switch (props.position) {
    case 'left-top':
      return 'top-0 left-0';
    case 'left-bottom':
      return 'bottom-0 left-0';
    case 'right-top':
      return 'top-0 right-0';
    case 'right-bottom':
      return 'bottom-0 right-0';
    case 'center-top':
      return 'top-0 left-1/2 transform -translate-x-1/2';
    case 'center-bottom':
      return 'bottom-0 left-1/2 transform -translate-x-1/2';
    default:
      return 'top-0 right-0'; // 默认右上角
  }
});
</script>

<template>
  <ToastViewport v-bind="delegatedProps"
       :class="cn(
        'fixed z-[105] flex max-h-screen w-full flex-col-reverse p-4 sm:flex-col md:max-w-[420px]',
        positionClass,
        props.class
      )"
 />
</template>
