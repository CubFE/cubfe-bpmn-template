<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { basicSetup } from 'codemirror'
import { EditorView } from '@codemirror/view'
import { EditorState } from '@codemirror/state'
import { xml } from '@codemirror/lang-xml'
import { json } from '@codemirror/lang-json'
import { javascript } from '@codemirror/lang-javascript'
import { java } from '@codemirror/lang-java'
import { dracula } from 'thememirror'

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  lang: {
    type: String,
    default: 'javascript',
  },
})

const viewRef = ref<Element>()
const editorView = ref<EditorView | null>(null)

const langConfigMap = {
  javascript: [javascript()],
  json: [json()],
  xml: [xml()],
  java: [java()],
}

let currentLangExtension = langConfigMap[props.lang] // 初始语言扩展

// 初始化只读模式的 CodeMirror 编辑器
const init = () => {
  if (editorView.value) return // 确保只初始化一次

  const state = EditorState.create({
    doc: props.modelValue, // 设置文档内容
    extensions: [
      basicSetup, // 基础设置
      currentLangExtension, // 当前语言扩展
      EditorView.lineWrapping, // 自动换行
      EditorState.readOnly.of(true), // 设置为只读
      dracula, // Dracula 主题
    ],
  })

  editorView.value = new EditorView({
    state,
    parent: viewRef.value!, // 绑定到 DOM 元素
  })
}

// 监听语言变化并更新语言扩展
const changeLanguage = (lang: string) => {
  if (!editorView.value) return

  const newLangExtension = langConfigMap[lang]
  if (newLangExtension === currentLangExtension) return // 如果语言未变化，直接返回

  const newState = EditorState.create({
    doc: props.modelValue,
    extensions: [
      basicSetup,
      newLangExtension,
      EditorView.lineWrapping,
      EditorState.readOnly.of(true),
      dracula,
    ],
  })

  editorView.value.setState(newState)
  currentLangExtension = newLangExtension
}

// 监听属性变化
watch(() => props.lang, (newLang) => {
  changeLanguage(newLang)
})

watch(() => props.modelValue, (newValue) => {
  if (editorView.value && editorView.value.state.doc.toString() !== newValue) {
    editorView.value.dispatch({
      changes: { from: 0, to: editorView.value.state.doc.length, insert: newValue },
    })
  }
})

// 在组件挂载时初始化编辑器
onMounted(() => {
  init()
})
</script>

<template>
  <div ref="viewRef" class="w-full min-h-48 rounded-lg overflow-hidden border relative bg-code"></div>
</template>