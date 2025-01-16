<script setup lang="ts">
import {Button, ButtonVariants} from "@/components/ui/button";
import {cn} from "@/lib/utils.ts";
import type {HTMLAttributes} from "vue";
import { Bot } from "lucide-vue-next";

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
    <Bot/>
    <span class="sr-only">Toggle AI</span>
  </Button>
</template>

<style scoped>

</style>