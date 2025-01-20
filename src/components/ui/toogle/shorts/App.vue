<script setup lang="ts">
import {Button} from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {cn} from "@/lib/utils.ts";
import type {HTMLAttributes} from "vue";
import { Box } from "lucide-vue-next";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

const props = defineProps<{
  class?: HTMLAttributes['class'],
}>()
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
          variant="ghost"
          size="icon"
          :class="cn('h-7 w-7', props.class)"
      >
        <Box/>
        <span class="sr-only">Toggle Notify</span>
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-[430px]">
      <div class="grid gap-4">
        <div class="space-y-2">
          <h4 class="font-medium leading-none">
            Quick Applications
          </h4>
          <p class="text-sm text-justify text-muted-foreground">
            Click on the quick application option below to enter the corresponding  page for process application.
          </p>
        </div>
        <Tabs default-value="account" class="w-[400px]">
          <TabsList class="grid w-full grid-cols-3">
            <TabsTrigger value="project">
              PROJECT
            </TabsTrigger>
            <TabsTrigger value="purchase">
              PURCHASE
            </TabsTrigger>
            <TabsTrigger value="finance">
              FINANCE
            </TabsTrigger>
<!--            <TabsTrigger value="human">-->
<!--              HUMAN-->
<!--            </TabsTrigger>-->
          </TabsList>
        </Tabs>
        <div class="grid grid-cols-3 gap-4 text-xs">
          <div class="flex flex-col items-center justify-between text-center cursor-pointer rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground hover:border-primary">
            <img src="/images/avatars/avatar.svg" class="w-6 h-6 mb-2"  alt=""/>
            Pre Sales Application
          </div>
          <div class="flex flex-col items-center justify-between text-center cursor-pointer rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground hover:border-primary">
            <img src="/images/avatars/avatar.svg" class="w-6 h-6 mb-2"  alt=""/>
            Pre Sales Application
          </div>
          <div class="flex flex-col items-center justify-between text-center cursor-pointer rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground hover:border-primary">
            <img src="/images/avatars/avatar.svg" class="w-6 h-6 mb-2"  alt=""/>
            Pre Sales Application
          </div>
          <div class="flex flex-col items-center justify-between text-center cursor-pointer rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground hover:border-primary">
            <img src="/images/avatars/avatar.svg" class="w-6 h-6 mb-2"  alt=""/>
            Pre Sales Application
          </div>
          <div class="flex flex-col items-center justify-between text-center cursor-pointer rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground hover:border-primary">
            <img src="/images/avatars/avatar.svg" class="w-6 h-6 mb-2"  alt=""/>
            Pre Sales Application
          </div>
          <div class="flex flex-col items-center justify-between text-center cursor-pointer rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground hover:border-primary">
            <img src="/images/avatars/avatar.svg" class="w-6 h-6 mb-2"  alt=""/>
            Pre Sales Application
          </div>
        </div>
      </div>
    </PopoverContent>
  </Popover>
</template>

<style scoped>

</style>