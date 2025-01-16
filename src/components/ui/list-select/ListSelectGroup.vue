<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { Primitive, type PrimitiveProps } from 'radix-vue'

interface Props extends PrimitiveProps {
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  as: 'listSelectGroup',
})
</script>

<template>
  <div
      :as="as"
      :as-child="asChild"
      :class="cn('px-0', props.class)"
  >
    <slot />
  </div>
</template>
