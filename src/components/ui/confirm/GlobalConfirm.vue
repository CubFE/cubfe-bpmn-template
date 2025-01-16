<script setup lang="ts">
import { ref } from 'vue';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

// 控制弹窗显示和内容
const isVisible = ref(false);
const dialogTitle = ref('');
const dialogMessage = ref('');
const cancelText = ref('Cancel');
const confirmText = ref('Confirm');

// 用于解析 Promise
let resolvePromise: (value: boolean) => void;

// 内部方法：展示对话框
function openDialog({
                      title,
                      message,
                      cancelButtonText = 'Cancel',
                      confirmButtonText = 'Confirm',
                    }: {
  title: string;
  message: string;
  cancelButtonText?: string;
  confirmButtonText?: string;
}): Promise<boolean> {
  dialogTitle.value = title;
  dialogMessage.value = message;
  cancelText.value = cancelButtonText;
  confirmText.value = confirmButtonText;
  isVisible.value = true;

  return new Promise((resolve) => {
    resolvePromise = resolve;
  });
}

// 内部方法：处理按钮点击
function handleConfirm() {
  isVisible.value = false;
  resolvePromise(true);
}

function handleCancel() {
  isVisible.value = false;
  resolvePromise(false);
}

// 导出用于挂载的全局方法
defineExpose({
  openDialog,
});
</script>

<template>
  <AlertDialog v-model:open="isVisible">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{{ dialogTitle }}</AlertDialogTitle>
        <AlertDialogDescription>
          {{ dialogMessage }}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel @click="handleCancel">
          {{ cancelText }}
        </AlertDialogCancel>
        <AlertDialogAction @click="handleConfirm">
          {{ confirmText }}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>