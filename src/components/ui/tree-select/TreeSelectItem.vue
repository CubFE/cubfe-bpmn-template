<script setup lang="ts">
import { ref, defineProps, defineEmits, PropType } from 'vue';
import { Checkbox } from '@/components/ui/checkbox';


// TreeNode 类型定义
interface TreeNodeType {
  id: string;
  value: string;
  label: string;
  children?: TreeNodeType[];
}
// Props 类型定义
const props = defineProps({
  modelValue: {
    type: Array as PropType<TreeNodeType[]>,
    required: true,
  },
  node: {
    type: Object as PropType<TreeNodeType>,
    required: true,
  },
});

// 父组件传递的选中节点列表
const selectedNodes = ref<string[]>([]);

// 事件定义
const emit = defineEmits(['update:modelValue']);
const innerValue = ref<string[]>(props.modelValue);
const handleCheckboxChange = (checked, id) => {
  if(checked) {
    !innerValue.value.includes(id) && innerValue.value.push(id)
  } else {
    innerValue.value = innerValue.value.filter((item) => item !== id);
  }
  emit('update:modelValue', innerValue.value);
}
</script>
<template>
  <div class="tree-node">
    <!-- 渲染每个节点的复选框 -->
    <div class="flex items-center">
      <Checkbox
          :id="`tree-node-${node.id}`"
          :value="node.id"
          :checked="innerValue.includes(node.id)"
          @update:checked="handleCheckboxChange($event, node.id)"
      >
      </Checkbox>
      <label
          :for="`tree-node-${node.id}`"
          class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {{ node.label }}
      </label>
    </div>

    <!-- 如果节点有子节点，递归渲染子节点 -->
    <div v-if="node.children && node.children.length > 0" class="ml-4">
      <TreeSelectItem
          v-for="child in node.children"
          :key="child.id"
          :node="child"
          v-model="innerValue"
          @update:modelValue="handleCheckboxChange($event, child.id)"
      />
    </div>
  </div>
</template>