<script setup lang="ts">
import {ref, defineProps, type HTMLAttributes, onMounted} from 'vue'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {cn} from "@/lib/utils.ts";
import { type ButtonVariants, buttonVariants } from '@/components/ui/button/index.ts'
import type {PrimitiveProps} from "radix-vue";
import {Tree} from "@/components/ui/tree";
import {deptTreeSelect, listUser} from "@/api/index";;
import {ScrollArea} from "@/components/ui/scroll-area";
import {Avatar} from "@/components/ui/avatar";
import { useToast } from '@/components/ui/toast/use-toast'
import { dialogState } from '@/composables/dialog.ts'

const { toast } = useToast()
const [isOpen, closeDialog] = dialogState();

interface Props extends PrimitiveProps {
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  class?: HTMLAttributes['class']
}
const props = withDefaults(defineProps<Props>(), {
  as: 'SelectUserDialog',
})

const emit = defineEmits(['handleConfirmUserEvent'])
const deptTreeData = ref<any[]>([]);
const deptOptions = ref<any[]>([]);
const deptTempOptions = ref<any[]>([]);
const expandeds = ref([])
const filterUserList = ref([])
const filterUserTotal = ref(0)
const filterUserParams = ref({
  pageNum: 1,
  pageSize: 10,
})
const selectedUsers = ref([])
// 获取部门选项
const getDeptOptions = () => {
  return new Promise((resolve, reject) => {
    if (!deptOptions.value || deptOptions.value.length <= 0) {
      deptTreeSelect().then(response => {
        deptTempOptions.value = response.data.data;
        deptOptions.value = response.data.data;
        resolve()
      })
    } else {
      reject()
    }
  });
};
const getDeptTreeData = () =>{
  function refactorTree(data) {
    return data.map(node => {
      expandeds.value.push(node.id)
      let treeData = { id: node.id, label: node.label, parentId: node.parentId, weight: node.weight };
      if (node.children && node.children.length > 0) {
        treeData.children = refactorTree(node.children);
      }
      return treeData;
    });
  }
  return new Promise((resolve, reject) => {
    if (!deptTreeData.value || deptTreeData.value.length <= 0) {
      getDeptOptions().then(() => {
        deptTreeData.value = refactorTree(deptOptions.value);
        resolve()
      }).catch(() => {
        reject()
      })
    } else {
      resolve()
    }
  })
}
const getUserData = () => {
  listUser(filterUserParams.value).then(response => {
    if (response.data.code == 200) {
      filterUserList.value = response.data.rows;
      filterUserTotal.value = response.data.total;
    } else {
      filterUserList.value = []
      filterUserTotal.value = 0;
    }
  })
}
const selectedDeptChange = (val) => {
  filterUserParams.value.deptId = val
  getUserData()
}
const handleClickUserItem = (val) => {
  const index = selectedUsers.value.findIndex(it=>it.userId == val.userId)
  if(index<0) {
    //add item
    selectedUsers.value.push(val)
  } else {
    // remove item
    selectedUsers.value = selectedUsers.value.filter(it=>it.userId !== val.userId)
  }
}
const handleConfirm = () => {
  if(selectedUsers.value.length > 0) {
    emit("handleConfirmUserEvent", selectedUsers.value)
    closeDialog(()=>{
      // 重置内容
      selectedUsers.value = []
    })
  } else {
    toast({
      description: 'Place Select User.',
      variant: 'error',
    });
  }
}
onMounted(()=> {
  getDeptTreeData()
})
</script>

<template>
  <Dialog v-model:open="isOpen">
    <DialogTrigger as-child>
      <Button :variant="variant" :size="size"
              :class="cn(buttonVariants({ variant, size }), props.class)">
        <slot name="icon"></slot>
        <slot></slot>
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[800px] grid-rows-[auto_minmax(0,1fr)_auto] p-0 max-h-[90dvh]">
      <DialogHeader class="p-6 pb-0">
        <DialogTitle>Select User</DialogTitle>
        <DialogDescription>
          Filter users through the left department tree
        </DialogDescription>
      </DialogHeader>
      <div class="grid grid-cols-3 gap-4 py-4 overflow-y-auto px-6">
        <ScrollArea class="flex flex-col justify-between border rounded-lg">
          <div class="p-4">
            <Tree :items="deptTreeData" :default-expanded="expandeds" class="w-full" :get-key="'depts'" @update:modelValue="selectedDeptChange"></Tree>
          </div>
        </ScrollArea>
        <ScrollArea class="flex flex-col justify-between border rounded-lg col-span-2">
          <div class="p-4" v-if="filterUserList && filterUserList.length>0">
            <div class="grid grid-cols-2 gap-4">
              <div class="flex items-center rounded-lg border p-2 gap-2 cursor-pointer"
                   v-for="user in filterUserList"
                   :class="selectedUsers.findIndex(it=>it.userId===user.userId)>=0?'border-primary shadow border-2':''"
                   @click="handleClickUserItem(user)"
              >
                <Avatar>
                  <img v-if="user.avatar" :src="user.avatar" alt="user_avatar"/>
                  <img v-else src="https://www.shadcn-vue.com/avatars/01.png" alt="user_avatar"/>
                </Avatar>
                <div>
                  <h4>{{user.nickName}}</h4>
                  <span class="text-xs text-gray-400">{{user.email}}</span>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
      <DialogFooter class="p-6 pt-0">
        <Button type="submit" @click="handleConfirm">
          Confirm
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>