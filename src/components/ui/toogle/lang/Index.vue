<script setup lang="ts">
import {computed, ref} from "vue";
import {Button, ButtonVariants} from "@/components/ui/button";
import {cn} from "@/lib/utils.ts";
import type {HTMLAttributes} from "vue";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {useI18n} from "vue-i18n";
import {useSysStore} from "@/store/sys.ts";
const {t} = useI18n();
const sysStore = useSysStore()
const props = defineProps<{
  class?: HTMLAttributes['class'],
}>()

const current = computed(()=>sysStore.language || 'en')
const setLanguage = (language: string) => {
  sysStore.setLanguage(language)
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button
          variant="ghost"
          size="icon"
          :class="cn('h-7 w-7', props.class)"
      >
        <img v-if="current=='en'" src="/images/languages/united-states-of-america.svg" alt="english" :class="cn('h-6 w-6')" />
        <img v-if="current=='zh-CN'" src="/images/languages/china.svg" alt="中文" :class="cn('h-6 w-6')" />
        <span class="sr-only">Toggle AI</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-32">
      <DropdownMenuGroup>
        <DropdownMenuItem @click="setLanguage('en')">
          <img src="/images/languages/united-states-of-america.svg" alt="english" class="mr-2 h-4 w-4" />
          <span>{{t("languages.english")}}</span>
        </DropdownMenuItem>
        <DropdownMenuItem @click="setLanguage('zh-CN')">
          <img src="/images/languages/china.svg" alt="chines" class="mr-2 h-4 w-4" />
          <span>{{t("languages.chinese")}}</span>
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<style scoped>

</style>