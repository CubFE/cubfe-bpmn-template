<script setup lang="ts">
import {ref, reactive, onMounted, watch, nextTick, toRaw} from 'vue';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { listUser, deptTreeSelect } from "@/api/index";
import { listRole } from "@/api/index";
import { Switch } from '@/components/ui/switch'
import {UserPlus} from "lucide-vue-next";
import {FormControl, FormDescription, FormField, FormItem, FormLabel} from "@/components/ui/form";
import {Avatar, AvatarImage, AvatarFallback} from "@/components/ui/avatar";
import {MultiSelect} from "@/components/ui/multi-select";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Tree} from "@/components/ui/tree";
import SelectUserDialog from "@/components/system/dialog/SelectUserDialog.vue";

const props = defineProps({
  bpmnElement: Object
})

const currentBpmnElement = ref(null)
// 组件的响应式状态
const dataType = ref<string>('USERS'); // 审批人类型
const selectedUser = reactive<{ ids: string[]; text: string[] }>({ ids: [], text: [] });
const deptTempOptions = ref<any[]>([]);
const deptOptions = ref<any[]>([]);
const deptTreeData = ref<any[]>([]);
const roleOptions = ref<any[]>([]);
const roleIds = ref<string[]>([]);
const deptIds = ref<string[]>([]);
const showMultiFlog = ref<boolean>(false);
const isSequential = ref<boolean>(false);
const multiLoopType = ref<string>('Null');

const userTaskForm = ref({
  dataType: '',
  assignee: '',
  candidateUsers: '',
  candidateGroups: '',
  text: '',
  // dueDate: '',
  // followUpDate: '',
  // priority: ''
})

watch(()=>props.bpmnElement, (newVal, oldVal) => {
  if(newVal){
    nextTick(()=>{
      currentBpmnElement.value = newVal;
      const bpmnElementObj = newVal.businessObject;
      if (!bpmnElementObj) {
        return;
      }
      clearOptionsData()
      dataType.value = bpmnElementObj['dataType'];
      if (dataType.value === 'USERS') {
        let userIdData = bpmnElementObj['candidateUsers'] || bpmnElementObj['assignee'];
        let userText = bpmnElementObj['text'] || [];
        if (userIdData && userIdData.toString().length > 0 && userText && userText.length > 0) {
          selectedUser.ids = userIdData?.toString().split(',');
          selectedUser.text = userText?.split(',');
        }
        if (selectedUser.ids.length > 1) {
          showMultiFlog.value = true;
        }
      } else if (dataType.value === 'ROLES') {
        getRoleOptions();
        let roleIdData = bpmnElementObj['candidateGroups'] || [];
        if (roleIdData && roleIdData.length > 0) {
          roleIds.value = roleIdData.split(',')
        }
        showMultiFlog.value = true;
      } else if (dataType.value === 'DEPTS') {
        getDeptTreeData();
        let deptIdData = bpmnElementObj['candidateGroups'] || [];
        if (deptIdData && deptIdData.length > 0) {
          deptIds.value = deptIdData.split(',');
        }
        showMultiFlog.value = true;
      }
      getElementLoop(bpmnElementObj);
    })
  }
}, {immediate: true})
const getElementLoop = (businessObject) => {
  if (!businessObject.loopCharacteristics) {
    multiLoopType.value = "Null";
    return;
  }
  isSequential.value = businessObject.loopCharacteristics.isSequential;
  if (businessObject.loopCharacteristics.completionCondition) {
    if (businessObject.loopCharacteristics.completionCondition.body === "${nrOfCompletedInstances >= nrOfInstances}") {
      multiLoopType.value = "SequentialMultiInstance";
    } else {
      multiLoopType.value = "ParallelMultiInstance";

    }
  }
}
const changeMultiLoopType = () => {
  // 取消多实例配置
  if (multiLoopType.value === "Null") {
    window.bpmnInstances.modeling.updateProperties(toRaw(currentBpmnElement.value), { loopCharacteristics: null, assignee: null });
    return;
  }
  const multiLoopInstance = window.bpmnInstances.moddle.create("bpmn:MultiInstanceLoopCharacteristics", { isSequential: isSequential.value });
  // 更新多实例配置
  window.bpmnInstances.modeling.updateProperties(toRaw(currentBpmnElement.value), {
    loopCharacteristics: multiLoopInstance,
    assignee: '${assignee}'
  });
  // 完成条件
  let completionCondition = null;
  // 会签
  if (multiLoopType.value === "SequentialMultiInstance") {
    completionCondition = window.bpmnInstances.moddle.create("bpmn:FormalExpression", { body: "${nrOfCompletedInstances >= nrOfInstances}" });
  }
  // 或签
  if (multiLoopType.value === "ParallelMultiInstance") {
    completionCondition = window.bpmnInstances.moddle.create("bpmn:FormalExpression", { body: "${nrOfCompletedInstances > 0}" });
  }
  // 更新模块属性信息
  window.bpmnInstances.modeling.updateModdleProperties(toRaw(currentBpmnElement.value), multiLoopInstance, {
    collection: '${multiInstanceHandler.getUserIds(execution)}',
    elementVariable: 'assignee',
    completionCondition
  })
}
// 清空数据
const clearOptionsData = () => {
  selectedUser.ids = [];
  selectedUser.text = [];
  roleIds.value = [];
  deptIds.value = [];
};

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

// 获取角色选项
const getRoleOptions = () => {
  listRole().then(response => {
    // roleOptions.value = response.data.rows;
    response.data.rows.forEach((role) => {
      roleOptions.value.push({
        label: role.roleName,
        value: `ROLE${role.roleId}`,
      })
    })
  });
};

const getDeptTreeData = () =>{
  function refactorTree(data) {
    return data.map(node => {
      let treeData = { id: `DEPT${node.id}`, label: node.label, parentId: node.parentId, weight: node.weight };
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

const changeDataType = (val) => {
  if (val === 'ROLES' || val === 'DEPTS' || (val === 'USERS' && selectedUser.ids.length > 1)) {
    showMultiFlog.value = true;
  } else {
    showMultiFlog.value = false;
  }
  multiLoopType.value = 'Null';
  changeMultiLoopType();
  // 清空 userTaskForm 所有属性值
  Object.keys(userTaskForm.value).forEach(key => userTaskForm.value[key] = null);
  userTaskForm.value.dataType = val;
  if (val === 'USERS') {
    if (selectedUser && selectedUser.ids && selectedUser.ids.length > 0) {
      if (selectedUser.ids.length === 1) {
        userTaskForm.value.assignee = selectedUser.ids[0];
      } else {
        userTaskForm.value.candidateUsers = selectedUser.ids.join()
      }
      userTaskForm.value.text = selectedUser.text?.join() || null
    }
  } else if (val === 'ROLES') {
    getRoleOptions();
    if (roleIds.value && roleIds.value.length > 0) {
      userTaskForm.candidateGroups = roleIds.value.join() || null;
      let textArr = roleOptions.value.filter(k => roleIds.value.indexOf(`ROLE${k.roleId}`) >= 0);
      userTaskForm.text = textArr?.map(k => k.roleName).join() || null;
    }
  } else if (val === 'DEPTS') {
    getDeptTreeData();
    if (deptIds.value && deptIds.value.length > 0) {
      userTaskForm.candidateGroups = deptIds.value.join() || null;
      let textArr = []
      let treeStarkData = JSON.parse(JSON.stringify(deptTreeData));
      deptIds.value.forEach(id => {
        let stark = []
        stark = stark.concat(treeStarkData);
        while(stark.length) {
          let temp = stark.shift();
          if(temp.children) {
            stark = temp.children.concat(stark);
          }
          if(id === temp.id) {
            textArr.push(temp);
          }
        }
      })
      userTaskForm.text = textArr?.map(k => k.label).join() || null;
    }
  } else if (val === 'INITIATOR') {
    userTaskForm.value.assignee = "${initiator}";
    userTaskForm.value.text = "流程发起人";
  }
  updateElementTask();
}
const updateElementTask = () => {
  const taskAttr = Object.create(null);
  for (let key in userTaskForm.value) {
    taskAttr[key] = userTaskForm.value[key];
  }
  window.bpmnInstances.modeling.updateProperties(toRaw(currentBpmnElement.value), taskAttr);
}
const handleTaskUserComplete = (val) => {
  userTaskForm.value.dataType = 'USERS';
  selectedUser.text = val.map(k => k.nickName) || [];
  if (val.length === 1) {
    let data = val[0];
    userTaskForm.value.assignee = data.userId;
    userTaskForm.value.text = data.nickName;
    userTaskForm.value.candidateUsers = null;
    showMultiFlog.value = false;
    multiLoopType.value = 'Null';
    changeMultiLoopType();
  } else {
    userTaskForm.value.candidateUsers = val.map(k => k.userId).join() || null;
    userTaskForm.value.text = val.map(k => k.nickName).join() || null;
    userTaskForm.value.assignee = null;
    showMultiFlog.value = true;
  }
  updateElementTask()
}
const changeSelectRoles = (val) => {
  let groups = null;
  let text = null;
  if (val && val.length > 0) {
    userTaskForm.value.dataType = 'ROLES';
    groups = val.join() || null;
    let textArr = roleOptions.value.filter(k => val.indexOf(`ROLE${k.roleId}`) >= 0);
    text = textArr?.map(k => k.roleName).join() || null;
  } else {
    userTaskForm.value.dataType = null;
    multiLoopType.value = 'Null';
  }
  userTaskForm.value.candidateGroups = groups;
  userTaskForm.value.text = text;
  updateElementTask();
  changeMultiLoopType();
}
const checkedDeptChange = () => {
  let groups = null;
  let text = null;
  if (deptIds.value && deptIds.value.length > 0) {
    userTaskForm.value.dataType = 'DEPTS';
    groups = deptIds.value.join() || null;
    let textArr = []
    let treeStarkData = JSON.parse(JSON.stringify(deptTreeData.value));
    deptIds.value.forEach(id => {
      let stark = []
      stark = stark.concat(treeStarkData);
      while(stark.length) {
        let temp = stark.shift();
        if(temp.children) {
          stark = temp.children.concat(stark);
        }
        if(id === temp.id) {
          textArr.push(temp);
        }
      }
    })
    text = textArr?.map(k => k.label).join() || null;
  } else {
    userTaskForm.value.dataType = null;
    multiLoopType.value = 'Null';
  }
  userTaskForm.value.candidateGroups = groups;
  userTaskForm.value.text = text;
  updateElementTask();
  changeMultiLoopType();
}
// 在组件创建时调用
onMounted(() => {
});
</script>
<template>
  <div>
    <FormField v-slot="{ value, handleChange }" name="isExecutable">
      <FormItem>
        <FormLabel class="w-24"><div class="my-4">Set Approver</div></FormLabel>
        <FormControl>
          <RadioGroup v-model="dataType" class="grid grid-cols-2 gap-4" @update:modelValue="changeDataType">
            <div class="flex items-center space-x-2">
              <RadioGroupItem id="data-type-r1" value="USERS" />
              <Label for="data-type-r1" class="cursor-pointer">Specify user</Label>
            </div>
            <div class="flex items-center space-x-2">
              <RadioGroupItem id="data-type-r2" value="ROLES" />
              <Label for="data-type-r2" class="cursor-pointer">Specify role</Label>
            </div>
            <div class="flex items-center space-x-2">
              <RadioGroupItem id="data-type-r3" value="DEPTS" />
              <Label for="data-type-r3" class="cursor-pointer">Specify department</Label>
            </div>
            <div class="flex items-center space-x-2">
              <RadioGroupItem id="data-type-r4" value="INITIATOR" />
              <Label for="data-type-r4" class="cursor-pointer">Initiator</Label>
            </div>
          </RadioGroup>
        </FormControl>
      </FormItem>
    </FormField>
    <FormField v-slot="{ value, handleChange }" v-if="dataType === 'USERS'" name="users">
      <FormItem >
        <FormControl>
          <div class="py-8 px-4 border mt-4 overflow-x-scroll rounded-lg ">
            <div class="flex flex-row items-center justify-between relative p-4">
              <div v-for="(item,index) in selectedUser.text" class="absolute hover:scale-110 hover:!z-50" :class="index==7?'mr-4':''"
                    :style="{ left: `${(index) * 50}px`, zIndex: (index) }">
                <Avatar size="base" class="shadow-lg bg-blue-100">
                  <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
                  <AvatarFallback class="text-xs">{{item}}</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
          <div>
            <SelectUserDialog variant="outline" size="lg" class="w-full" @handle-confirm-user-event="handleTaskUserComplete">
              <template #icon>
                <UserPlus class="h-4 w-4"/>
              </template>Add user to the selection list
            </SelectUserDialog>
          </div>
        </FormControl>
      </FormItem>
    </FormField>
    <FormField v-slot="{ value, handleChange }" v-if="dataType === 'ROLES'" name="roles">
      <FormItem>
        <FormControl>
          <div class="mt-4">
            <MultiSelect
                placeholder="Select"
                :options="roleOptions"
                :collapse-tags="true"
                :show-tags-limit="3"
                v-model="roleIds"
                @update:modelValue="changeSelectRoles"
            />
          </div>
        </FormControl>
      </FormItem>
    </FormField>

    <FormField v-slot="{ value, handleChange }" v-if="dataType === 'DEPTS'" name="depts">
      <FormItem>
        <FormControl>
          <ScrollArea class="h-72 w-full rounded-lg border mt-4">
            <div class="p-4">
              <Tree :items="deptTreeData" v-model="deptIds" multiple check-enabled class="w-full" :get-key="'depts'" @update:modelValue="checkedDeptChange"></Tree>
          </div>
          </ScrollArea>
        </FormControl>
      </FormItem>
    </FormField>
    <FormField v-slot="{ value, handleChange }" v-if="showMultiFlog" name="isExecutable">
      <FormItem>
        <FormLabel class="w-24"><div class="my-4">Multi Instance</div></FormLabel>
          <FormControl>
            <RadioGroup default-value="Null" v-model="multiLoopType" class="grid grid-cols-2 gap-4">
              <div class="flex items-center space-x-2">
                <RadioGroupItem id="multi-instance-r1" value="Null" />
                <Label for="multi-instance-r1" class="cursor-pointer">None</Label>
              </div>
              <div class="flex items-center space-x-2">
                <RadioGroupItem id="multi-instance-r2" value="SequentialMultiInstance" />
                <Label for="multi-instance-r2" class="cursor-pointer">Sequential(Consensus)</Label>
              </div>
              <div class="flex items-center space-x-2">
                <RadioGroupItem id="multi-instance-r3" value="ParallelMultiInstance" />
                <Label for="multi-instance-r3" class="cursor-pointer">Parallel(Any-One)</Label>
              </div>
            </RadioGroup>
          </FormControl>
      </FormItem>
    </FormField>
    <FormField v-slot="{ value, handleChange }" name="isExecutable" v-if="multiLoopType !== 'Null'">
      <FormItem class="flex flex-row items-center justify-between rounded-lg border p-4 mt-4">
        <div class="space-y-0.5">
          <FormLabel class="text-base">
            Is it Node from
          </FormLabel>
          <FormDescription>
            Once enabled, instances must be approved sequentially in turn.
          </FormDescription>
        </div>
        <FormControl>
          <Switch
              v-model="localScope"
              @update:checked="updateElementFormScope"
          />
        </FormControl>
      </FormItem>
    </FormField>
  </div>
</template>