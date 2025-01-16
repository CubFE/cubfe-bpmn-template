<script setup lang="ts">
import { Badge } from '@/components/ui/badge'

import { Button } from '@/components/ui/button'
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Bird, Book, Bot, Code2, CornerDownLeft, LifeBuoy, Mic, Paperclip, Rabbit, Settings, Settings2, Share, SquareTerminal, SquareUser, Triangle, Turtle } from 'lucide-vue-next'
import Breadcrumb from "@/layout/components/Breadcrumb.vue";
import UserAccount from "@/components/ui/toogle/account/User.vue";
import {SidebarTrigger} from "@/components/ui/sidebar";
import ToogleAI from "@/components/ui/toogle/ai/Index.vue";
import ToogleNotify from "@/components/ui/toogle/message/ToogleNotify.vue";
import ToogleShorts from "@/components/ui/toogle/shorts/App.vue";
import ToogleLang from "@/components/ui/toogle/lang/Index.vue";
import {Separator} from "@/components/ui/separator";
import ToogleChat from "@/components/ui/toogle/message/ToogleChat.vue";
import ToogleFullScreen from "@/components/ui/toogle/fullscreen/Index.vue";
import ToogleThemeMode from "@/components/ui/toogle/theme/ToogleThemeMode.vue";
import MiniSidebar from "@/layout/components/MiniSidebar.vue";
</script>

<template>
  <div class="grid h-screen w-full pl-[72px]">
    <MiniSidebar />
    <div class="flex flex-col">
      <header class="flex shrink-0 items-center gap-2 border-b px-4 dark:border-gray-800 h-[64px]">
        <div class="flex items-center justify-between w-full">
          <div class="flex items-center gap-2">
            <breadcrumb/>
          </div>
          <div class="flex items-center gap-x-4">
            <ToogleShorts class="!w-10 !h-10 dark:text-white rounded-full" />
            <ToogleChat class="!w-10 !h-10 dark:text-white rounded-full" />
            <ToogleNotify class="!w-10 !h-10 dark:text-white rounded-full" />
            <ToogleFullScreen class="!w-10 !h-10 dark:text-white rounded-full" />
            <ToogleThemeMode class="!w-10 !h-10 dark:text-white rounded-full" />
            <ToogleLang class="!w-10 !h-10 dark:text-white rounded-full" />
            <UserAccount class="ml-4 cursor-pointer"/>
          </div>
        </div>
      </header>
      <main class="flex-1 w-full gap-4 overflow-auto">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>