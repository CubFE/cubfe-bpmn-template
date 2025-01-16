<script setup lang="ts">

import {Book, Bot, Code2, LifeBuoy, Settings2, LayoutDashboard, Workflow, PencilRuler} from "lucide-vue-next";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {Button} from "@/components/ui/button";
import {useRoute, useRouter} from "vue-router";
const route = useRoute();
const router = useRouter()
const redirect = (path: string) => {
  router.push(path);
}
</script>

<template>
  <aside class="inset-y fixed justify-center items-center  left-0 z-20 w-[72px] flex h-full flex-col border-r">
    <div class="border-b w-full flex items-center justify-center h-[64px]">
      <img src="/images/logos/small-logo.png" class="h-8" alt="bmsoft">
    </div>
    <nav class="grid gap-4 p-2 py-4">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger as-child>
            <Button
                variant="ghost"
                size="icon"
                class="rounded-lg"
                :class="route.name==='dashboard'?'bg-muted':''"
                aria-label="Dashboard"
                @click="redirect('/admin/dashboard')"
            >
              <LayoutDashboard class="size-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" :side-offset="5">
            Dashboard {{}}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger as-child>
            <Button
                variant="ghost"
                size="icon"
                class="rounded-lg"
                :class="route.name==='model'?'bg-muted':''"
                aria-label="Workflow"
                @click="redirect('/admin/model')"
            >
              <Workflow class="size-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" :side-offset="5">
            Workflow
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger as-child>
            <Button
                variant="ghost"
                size="icon"
                class="rounded-lg"
                :class="route.name==='designer'?'bg-muted':''"
                aria-label="API"
                @click="redirect('/admin/designer')"
            >
              <PencilRuler class="size-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" :side-offset="5">
            Workflow Designer
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger as-child>
            <Button
                variant="ghost"
                size="icon"
                class="rounded-lg"
                aria-label="Documentation"
            >
              <Book class="size-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" :side-offset="5">
            Documentation
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger as-child>
            <Button
                variant="ghost"
                size="icon"
                class="rounded-lg"
                aria-label="Settings"
            >
              <Settings2 class="size-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" :side-offset="5">
            Settings
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </nav>
    <nav class="mt-auto grid gap-4 p-2 py-4">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger as-child>
            <Button
                variant="ghost"
                size="icon"
                class="mt-auto rounded-lg"
                aria-label="Help"
            >
              <Bot class="size-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" :side-offset="5">
            FLow AI
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger as-child>
            <Button
                variant="ghost"
                size="icon"
                class="mt-auto rounded-lg"
                aria-label="Help"
            >
              <LifeBuoy class="size-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" :side-offset="5">
            Help
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </nav>
  </aside>
</template>

<style scoped>

</style>