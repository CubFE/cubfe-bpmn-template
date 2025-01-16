<script setup lang="ts">
import {ref,defineProps, watch} from "vue";

const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
});
const show = ref(false)
watch(()=>props.visible, (val)=> {
  debugger
  show.value = val
})
</script>

<template>
  <div
      v-if="show"
      class="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50"
  >
    <div class="animate-spin rounded-full border-4 border-t-transparent border-white w-8 h-8"></div>
  </div>
</template>