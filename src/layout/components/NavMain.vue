<script setup lang="ts">
import {SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarMenuSub, SidebarMenuSubItem, SidebarMenuSubButton} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { ChevronRight } from 'lucide-vue-next'
import { useRouter} from "vue-router";
import {useI18n} from "vue-i18n";
const {t} = useI18n();
const router = useRouter()
const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  }
})
const routerGo = (url: string) => {
  router.push(url)
}
</script>

<template>
  <SidebarMenu class="pl-4">
    <Collapsible
        v-for="item in data"
        :key="item.title"
        as-child
        :default-open="item.isActive"
        class="group/collapsible"
    >
      <SidebarMenuItem v-if="item.type=='M' || item.type=='CM'">
        <CollapsibleTrigger as-child>
          <SidebarMenuButton :tooltip="t(item.title)"  class="pl-4 pr-4 py-2 dark:text-white hover:rounded-lg hover:bg-blue-100 dark:hover:bg-background  my-1">
            <component :is="item.icon"/>
            <span>{{ t(item.title) }}</span>
            <ChevronRight class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <NavMain :data="item.children" />
        </CollapsibleContent>
      </SidebarMenuItem>
      <SidebarMenuItem v-else-if="item.type=='C'">
        <SidebarMenuButton :tooltip="t(item.title)" class="pl-4 py-2 dark:text-white hover:rounded-lg hover:bg-blue-100 dark:hover:bg-background my-1" @click="routerGo(item.url)">
          <component :is="item.icon"/>
<!--          <router-link :to="item.url" class="router-link">-->
            <span>{{ t(item.title) }}</span>
<!--          </router-link>-->
        </SidebarMenuButton>
      </SidebarMenuItem>
    </Collapsible>
  </SidebarMenu>
</template>

<style scoped>

</style>