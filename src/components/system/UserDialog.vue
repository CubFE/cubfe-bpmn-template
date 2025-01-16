<script setup lang="ts">

</script>

<template>
  <!-- 候选用户弹窗 -->
  <Dialog v-model:visible="userOpen" width="60%" title="候选用户">
    <div class="space-y-4 flex">
      <!-- 部门选择 -->
      <div class="w-1/3">
        <Card>
          <Input v-model="deptName" placeholder="请输入部门名称" clearable size="small" prefix="search" class="mb-4" />
          <Tree
              :data="deptOptions"
              :props="deptProps"
              :filter-node-method="filterNode"
              default-expand-all
              @node-click="handleNodeClick"
          />
        </Card>
      </div>

      <!-- 用户选择 -->
      <div class="w-2/3">
        <Table :data="userTableList" class="w-full">
          <TableColumn type="selection" width="50" />
          <TableColumn label="用户名" prop="nickName" />
          <TableColumn label="部门" prop="dept.deptName" />
        </Table>
        <Pagination :total="userTotal" :current-page="queryParams.pageNum" :page-size="queryParams.pageSize" @change="getUserList" />
      </div>
    </div>
    <template #footer>
      <Button variant="primary" @click="handleTaskUserComplete">确定</Button>
      <Button @click="userOpen = false">取消</Button>
    </template>
  </Dialog>
</template>

<style scoped>

</style>