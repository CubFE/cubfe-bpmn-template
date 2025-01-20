<script setup lang="ts">
import { Moon, Sun } from "lucide-vue-next";
import {Button, ButtonVariants} from "@/components/ui/button";
import { useColorMode } from "@vueuse/core";
import {cn} from "@/lib/utils.ts";
import type {HTMLAttributes} from "vue";

const props = defineProps<{
  class?: HTMLAttributes['class'],
}>()
const mode = useColorMode();
// mode.value = 'auto'
const toggleThemeMode = () => {
  if (mode.value === "dark") {
    mode.value = "light"
  } else {
    mode.value = "dark"
  }
}
</script>

<template>
  <Button
      variant="ghost"
      :class="cn('h-7 w-7', props.class)"
      @click="toggleThemeMode"
  >
    <Moon v-if="mode === 'dark'"/>
    <Sun v-if="mode === 'light'"/>
    <span class="sr-only">Toggle Theme Mode</span>
  </Button>
</template>

<style scoped>

</style>