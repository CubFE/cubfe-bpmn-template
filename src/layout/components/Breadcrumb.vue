<template>
  <nav class="flex" aria-label="Breadcrumb">
    <ol role="list" class="flex items-center space-x-1">
      <!-- <li>
        <div>
          <a href="#" class="text-gray-400 hover:text-gray-500">
            <HomeIcon class="h-5 w-5 flex-shrink-0" aria-hidden="true" />
            <span class="sr-only">Home</span>
          </a>
        </div>
      </li> -->
      <li v-for="(crumb,index) in breadcrumbs" :key="index">
        <div class="flex items-center">
          <ChevronRight v-if="index>0" class="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
          <!-- <svg v-if="index>0"  class="h-5 w-5 flex-shrink-0 text-gray-300" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
          </svg> -->
          <router-link v-if="index !== breadcrumbs.length - 1" :to="crumb.path" class="flex text-sm font-normal text-gray-500 hover:text-gray-700" :class="[index>0?'ml-1':'']">
            <component :is="crumb.meta.icon" class="mr-1 h-5 w-5 flex-shrink-0" aria-hidden="true" v-if="index==0"/>
            {{ t(crumb.meta.pageTitle)==crumb.meta.pageTitle?crumb.meta.pageTitle:t(crumb.meta.pageTitle) }}
          </router-link>
          <span v-else class="text-gray-500 ml-1 text-sm font-bold	">{{ t(crumb.meta.pageTitle)==crumb.meta.pageTitle?crumb.meta.pageTitle:t(crumb.meta.pageTitle) }}</span>
        </div>
      </li>
    </ol>
  </nav>
</template>

<script>
import { ref, defineComponent, watch } from 'vue'
import { ChevronRight, Home } from 'lucide-vue-next'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: "Breadcrumbs",
  components: { ChevronRight, Home },
  setup() {
    const { t } = useI18n()
    const route = useRoute()
    const router = useRouter()
    const breadcrumbs = ref([])
    const updateBreadcrumbs = () => {
      breadcrumbs.value = route.matched.map((match) => {
        return {
          name: match.name,
          path: match.path,
          meta: match.meta
        }
      })
    }

    watch(route, updateBreadcrumbs, { immediate: true })
    return {
      t,
      breadcrumbs,
    }
  },
})
</script>