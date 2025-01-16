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
<!--        <div class="relative hidden flex-col items-start gap-8 md:flex">-->
<!--          <form class="grid w-full items-start gap-6">-->
<!--            <fieldset class="grid gap-6 rounded-lg border p-4">-->
<!--              <legend class="-ml-1 px-1 text-sm font-medium">-->
<!--                Settings-->
<!--              </legend>-->
<!--              <div class="grid gap-3">-->
<!--                <Label for="model">Model</Label>-->
<!--                <Select>-->
<!--                  <SelectTrigger-->
<!--                      id="model"-->
<!--                      class="items-start [&_[data-description]]:hidden"-->
<!--                  >-->
<!--                    <SelectValue placeholder="Select a model" />-->
<!--                  </SelectTrigger>-->
<!--                  <SelectContent>-->
<!--                    <SelectItem value="genesis">-->
<!--                      <div class="flex items-start gap-3 text-muted-foreground">-->
<!--                        <Rabbit class="size-6" />-->
<!--                        <div class="grid gap-0.5">-->
<!--                          <p>-->
<!--                            Neural-->
<!--                            <span class="font-medium text-foreground">-->
<!--                              Genesis-->
<!--                            </span>-->
<!--                          </p>-->
<!--                          <p class="text-xs" data-description>-->
<!--                            Our fastest model for general use cases.-->
<!--                          </p>-->
<!--                        </div>-->
<!--                      </div>-->
<!--                    </SelectItem>-->
<!--                    <SelectItem value="explorer">-->
<!--                      <div class="flex items-start gap-3 text-muted-foreground">-->
<!--                        <Bird class="size-6" />-->
<!--                        <div class="grid gap-0.5">-->
<!--                          <p>-->
<!--                            Neural-->
<!--                            <span class="font-medium text-foreground">-->
<!--                              Explorer-->
<!--                            </span>-->
<!--                          </p>-->
<!--                          <p class="text-xs" data-description>-->
<!--                            Performance and speed for efficiency.-->
<!--                          </p>-->
<!--                        </div>-->
<!--                      </div>-->
<!--                    </SelectItem>-->
<!--                    <SelectItem value="quantum">-->
<!--                      <div class="flex items-start gap-3 text-muted-foreground">-->
<!--                        <Turtle class="size-6" />-->
<!--                        <div class="grid gap-0.5">-->
<!--                          <p>-->
<!--                            Neural-->
<!--                            <span class="font-medium text-foreground">-->
<!--                              Quantum-->
<!--                            </span>-->
<!--                          </p>-->
<!--                          <p class="text-xs" data-description>-->
<!--                            The most powerful model for complex computations.-->
<!--                          </p>-->
<!--                        </div>-->
<!--                      </div>-->
<!--                    </SelectItem>-->
<!--                  </SelectContent>-->
<!--                </Select>-->
<!--              </div>-->
<!--              <div class="grid gap-3">-->
<!--                <Label for="temperature">Temperature</Label>-->
<!--                <Input id="temperature" type="number" placeholder="0.4" />-->
<!--              </div>-->
<!--              <div class="grid grid-cols-2 gap-4">-->
<!--                <div class="grid gap-3">-->
<!--                  <Label for="top-p">Top P</Label>-->
<!--                  <Input id="top-p" type="number" placeholder="0.7" />-->
<!--                </div>-->
<!--                <div class="grid gap-3">-->
<!--                  <Label for="top-k">Top K</Label>-->
<!--                  <Input id="top-k" type="number" placeholder="0.0" />-->
<!--                </div>-->
<!--              </div>-->
<!--            </fieldset>-->
<!--            <fieldset class="grid gap-6 rounded-lg border p-4">-->
<!--              <legend class="-ml-1 px-1 text-sm font-medium">-->
<!--                Messages-->
<!--              </legend>-->
<!--              <div class="grid gap-3">-->
<!--                <Label for="role">Role</Label>-->
<!--                <Select default-value="system">-->
<!--                  <SelectTrigger>-->
<!--                    <SelectValue placeholder="Select a role" />-->
<!--                  </SelectTrigger>-->
<!--                  <SelectContent>-->
<!--                    <SelectItem value="system">-->
<!--                      System-->
<!--                    </SelectItem>-->
<!--                    <SelectItem value="user">-->
<!--                      User-->
<!--                    </SelectItem>-->
<!--                    <SelectItem value="assistant">-->
<!--                      Assistant-->
<!--                    </SelectItem>-->
<!--                  </SelectContent>-->
<!--                </Select>-->
<!--              </div>-->
<!--              <div class="grid gap-3">-->
<!--                <Label for="content">Content</Label>-->
<!--                <Textarea-->
<!--                    id="content"-->
<!--                    placeholder="You are a..."-->
<!--                    class="min-h-[9.5rem]"-->
<!--                />-->
<!--              </div>-->
<!--            </fieldset>-->
<!--          </form>-->
<!--        </div>-->
<!--        <div class="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">-->
<!--          <Badge variant="outline" class="absolute right-3 top-3">-->
<!--            Output-->
<!--          </Badge>-->
<!--          <div class="flex-1" />-->
<!--          <form class="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring">-->
<!--            <Label for="message" class="sr-only">-->
<!--              Message-->
<!--            </Label>-->
<!--            <Textarea-->
<!--                id="message"-->
<!--                placeholder="Type your message here..."-->
<!--                class="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"-->
<!--            />-->
<!--            <div class="flex items-center p-3 pt-0">-->
<!--              <TooltipProvider>-->
<!--                <Tooltip>-->
<!--                  <TooltipTrigger as-child>-->
<!--                    <Button variant="ghost" size="icon">-->
<!--                      <Paperclip class="size-4" />-->
<!--                      <span class="sr-only">Attach file</span>-->
<!--                    </Button>-->
<!--                  </TooltipTrigger>-->
<!--                  <TooltipContent side="top">-->
<!--                    Attach File-->
<!--                  </TooltipContent>-->
<!--                </Tooltip>-->
<!--              </TooltipProvider>-->
<!--              <TooltipProvider>-->
<!--                <Tooltip>-->
<!--                  <TooltipTrigger as-child>-->
<!--                    <Button variant="ghost" size="icon">-->
<!--                      <Mic class="size-4" />-->
<!--                      <span class="sr-only">Use Microphone</span>-->
<!--                    </Button>-->
<!--                  </TooltipTrigger>-->
<!--                  <TooltipContent side="top">-->
<!--                    Use Microphone-->
<!--                  </TooltipContent>-->
<!--                </Tooltip>-->
<!--              </TooltipProvider>-->
<!--              <Button type="submit" size="sm" class="ml-auto gap-1.5">-->
<!--                Send Message-->
<!--                <CornerDownLeft class="size-3.5" />-->
<!--              </Button>-->
<!--            </div>-->
<!--          </form>-->
<!--        </div>-->
      </main>
    </div>
  </div>
</template>