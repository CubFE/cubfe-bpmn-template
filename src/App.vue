<template>
  <div class="bg-primary-foreground">
    <router-view />
    <Toaster />
  </div>
</template>
<script setup lang="ts">
import Toaster from '@/components/ui/toast/Toaster.vue'
</script>