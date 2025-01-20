<script setup lang="ts">
import {ref} from "vue";
import {Button, ButtonVariants} from "@/components/ui/button";
import { Maximize, Minimize } from "lucide-vue-next";
import {cn} from "@/lib/utils.ts";
import type {HTMLAttributes} from "vue";
import { api as fullscreen } from 'vue-fullscreen'
const props = defineProps<{
  class?: HTMLAttributes['class'],
}>()
const isFullscreen = ref(false)
async function toggle () {
  await fullscreen.toggle(document.querySelector('body'), {
    //   teleport: state.teleport,
    callback: (value) => {
      isFullscreen.value = value
    },
  })
}
</script>

<template>
  <Button
      variant="ghost"
      size="icon"
      :class="cn('h-7 w-7', props.class)"
      @click="toggle"
  >
    <Minimize v-if="isFullscreen"/>
    <Maximize v-else />
    <span class="sr-only">Toggle Screen</span>
  </Button>
</template>

<style scoped>

</style>