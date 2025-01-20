<script setup lang="ts">
import { onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter()
onBeforeMount(() => {
  const { path } = route.params
  const query = route.query
  router.replace({ path: "/"+ path, query });
})

</script>

<template>

</template>

<style scoped>

</style>