<script setup lang="ts">
import {
  Sidebar, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton,SidebarContent,SidebarFooter
} from "@/components/ui/sidebar"
import NavMain from "./NavMain"
import NavUser from "./NavUser"
import { useColorMode } from "@vueuse/core";
const mode = useColorMode()
import {ref} from "vue";


import {useMenu} from "@/composables/useMenu";
const menu = useMenu();
</script>

<template>
  <!--variant="inset" collapsible="icon" -->
  <Sidebar variant="inset" class="dark:border-none">
    <SidebarHeader class="!p-4">
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" as-child>
              <a href="/" class="flex items-center w-full">
                <img src="images/logos/small-logo.png" class="h-8" alt="bmsoft">
                <img v-show="mode === 'dark'" src="images/logos/logo-white@2x.png" class="h-8" alt="bmsoft">
                <img v-show="mode === 'light'" src="images/logos/logo-black@2x.png" class="h-8" alt="bmsoft">
              </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
    <SidebarContent>
      <NavMain :data="menu.workspaceMenu" />
<!--      <NavProjects projects={data.projects} />-->
<!--      <NavSecondary items={data.navSecondary} class="mt-auto" />-->
    </SidebarContent>
  </Sidebar>
</template>

<style scoped>

</style>