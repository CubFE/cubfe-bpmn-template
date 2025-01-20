<script setup lang="ts">
import {ref, onMounted, computed, watch} from 'vue'
import {Box, Expand} from 'lucide-vue-next';
import { Button } from '@/components/ui/button'
// 引入所需的 CodeMirror 模块
import { basicSetup } from 'codemirror'
import { EditorView } from '@codemirror/view'
import { Compartment, EditorState, StateField, StateEffect } from '@codemirror/state'
import { xml } from '@codemirror/lang-xml'
import { json } from '@codemirror/lang-json'
import { javascript } from '@codemirror/lang-javascript'
import { java } from '@codemirror/lang-java'
import { oneDark } from '@codemirror/theme-one-dark'
import {dracula} from 'thememirror';
import {Copy} from 'lucide-vue-next'
import {Popover, PopoverTrigger, PopoverContent} from "@/components/ui/popover";

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  lang: {
    type: String,
    default: "javascript"
  }
})
const emit = defineEmits(['update:modelValue', 'change'])
// 初始化编辑器内容
const contentStr = ref<string>(props.modelValue)
const editorView = ref<EditorView>(null);
const viewRef = ref<Element>()
const langConfigMap = {
  javascript: [javascript()],
  json: [json()],
  xml: [xml()],
  java: [java()],
}

let currentLangExtension: any = langConfigMap[props.lang];  // 初始语言扩展
const init = () => {
  if (editorView.value) return  // 确保只初始化一次
  // 创建 CodeMirror 编辑器状态
  const state = EditorState.create({
    doc: contentStr.value,  // 设置文档内容
    extensions: [
      basicSetup,  // 使用 CodeMirror 的基础设置
      currentLangExtension,  // 使用当前语言
      EditorView.lineWrapping,
      EditorState.tabSize.of(8),  // 设置 tab 缩进大小
      dracula,
      // 注册一个更新监听器，捕捉编辑器内容变化
      EditorView.updateListener.of(v => {
        contentStr.value = v.state.doc.toString()  // 更新内容
        emit("update:modelValue", contentStr.value)
        emit("change")
      }),
    ],
  })

  // 创建并渲染编辑器视图
  editorView.value = new EditorView({
    state,
    parent: viewRef.value,  // 将编辑器附加到 DOM 元素
  })
}

// 切换语言的方法
const changeLanguage = (lang: string) => {
  if (!editorView) return;  // 确保编辑器已初始化

  const newLangExtension = langConfigMap[lang];

  // 如果语言没有变化，则不做任何操作
  if (newLangExtension === currentLangExtension) return;

  // 保留现有的扩展（包括样式相关的扩展），并更新语言扩展
  const extensions = [
    ...editorView.state.facet(EditorState.extension),  // 保留当前状态的所有扩展（包括样式）
    newLangExtension,  // 添加新的语言扩展
  ];
  // 创建一个新的 EditorState
  const newState = EditorState.create({
    doc: contentStr.value,  // 保持文档内容
    extensions: extensions
    // extensions: [
    //   basicSetup,  // 基本设置
    //   newLangExtension,  // 新语言扩展
    //   EditorView.lineWrapping,  // 保留行换行
    //   EditorState.tabSize.of(8),  // 保持 tab 缩进大小
    //   oneDark,  // 保留当前主题
    //   // 注册一个更新监听器，捕捉编辑器内容变化
    //   EditorView.updateListener.of(v => {
    //     contentStr.value = v.state.doc.toString()  // 更新内容
    //     emit("update:modelValue", contentStr.value)
    //   }),
    // ],
  });

  // 更新编辑器视图的状态
  editorView.value.setState(newState);

  // 更新当前语言扩展
  currentLangExtension = newLangExtension;
};
watch(()=>props.modelValue, (newVal) => {
  // contentStr.value = newVal;
})
watch(()=>props.lang, (newVal)=> {
  changeLanguage(newVal)
})
// 在组件挂载时初始化编辑器
onMounted(() => {
  init()
})
</script>

<template>
  <div ref="viewRef" class="w-full min-h-48 rounded-lg overflow-scroll border relative bg-code">
  </div>
</template>

<style scoped>

</style>