<script setup lang="ts">
import {Button, ButtonVariants} from "@/components/ui/button";
import {cn} from "@/lib/utils.ts";
import type {HTMLAttributes} from "vue";
import { MessageSquareText } from "lucide-vue-next";

const props = defineProps<{
  class?: HTMLAttributes['class'],
}>()
</script>

<template>
  <Button
      variant="ghost"
      size="icon"
      :class="cn('h-7 w-7', props.class)"
  >
    <MessageSquareText/>
    <span class="sr-only">Toggle Notify</span>
  </Button>
</template>

<style scoped>

</style>