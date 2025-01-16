<script setup lang="ts">
import {ref, defineProps, defineEmits, type HTMLAttributes, watch} from 'vue'
import {Primitive, type TreeRootProps, TreeItem, TreeRoot } from 'radix-vue'
import { ChevronDown, ChevronRight, Check } from "lucide-vue-next";
import { cn } from '@/lib/utils'
interface Props extends TreeRootProps {
  class?: HTMLAttributes['class']
  itemClass?: HTMLAttributes['class']
  options?: any
  checkEnabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  as: 'tree',
  checkEnabled: false, // enabled checkbox
  options: {
    nodeKey: 'id',
    nodeLabel: 'label',
  }
})
const emit = defineEmits(['update:modelValue'])
const innerValue = ref(props.multiple?[]:"")
watch(()=>props.modelValue, (newVal, oldVal) => {
  innerValue.value = newVal
},{immediate:true})
const handleTreeNode = (nodeKey: string) => {
  if(props.multiple) {
    if (innerValue.value.includes(nodeKey)) {
      innerValue.value.splice(innerValue.value.indexOf(nodeKey), 1)
    } else{
      innerValue.value.push(nodeKey)
    }
  } else {
    innerValue.value = nodeKey
  }
  emit("update:modelValue", innerValue.value)
}
</script>

<template>
  <TreeRoot
      v-slot="{ flattenItems }"
      :class="cn(props.class)"
      :items="items"
      :get-key="(item) => item[options.nodeKey]"
      :multiple="multiple"
      :default-expanded="defaultExpanded"
      propagate-select
  >
    <TreeItem
        v-for="item in flattenItems"
        v-slot="{ isExpanded }"
        :key="item._id"
        :style="{ 'padding-left': `${item.level - 0.5}rem` }"
        v-bind="item.bind"
        class="flex items-center py-1 px-2 my-0.5 rounded outline-none"
    >
      <template v-if="item.hasChildren">
        <ChevronRight v-if="!isExpanded" class="h-4 w-4"/>
        <ChevronDown v-else class="h-4 w-4"/>
      </template>
      <div class="pl-2 flex items-center justify-between w-full cursor-pointer" v-if="checkEnabled"
           :class="innerValue.includes(item.value[options.nodeKey])?'text-primary':''"
           @click.stop.prevent="handleTreeNode(item.value[options.nodeKey])">
        {{ item.value[options.nodeLabel] }}
        <Check v-if="innerValue.includes(item.value[options.nodeKey])" class="w-4 h-4"/>
      </div>
      <div v-else class="pl-2 flex items-center justify-between w-full cursor-pointer"
           :class="multiple?(innerValue.includes(item.value[options.nodeKey])?'text-primary':''):(innerValue==item.value[options.nodeKey]?'text-primary':'')"
           @click.stop.prevent="handleTreeNode(item.value[options.nodeKey])">
        {{ item.value[options.nodeLabel] }}
      </div>
    </TreeItem>
  </TreeRoot>
</template>