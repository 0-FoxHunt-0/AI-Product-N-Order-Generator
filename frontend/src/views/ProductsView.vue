<template>
  <div class="products">
    <p class="header py-1">All Products</p>
    <p class="sub-header py-1">
      Create new products and manage your active items
    </p>

    <div class="py-2">
      <el-button
        class="!mx-0 !bg-buttons-secondary active:bg-white active:shadow-md !border-0"
        >All Products</el-button
      >
      <el-button
        class="!mx-0 !bg-buttons-secondary active:bg-white active:shadow-md !border-0"
        >Deleted Products</el-button
      >
    </div>

    <div class="actions mt-3">
      <el-dropdown @command="handleCommand" class="!pr-3">
        <el-button class="!outline-0 !text-text-secondary !border-0 !shadow-md">
          <el-icon><Filter /></el-icon> Filter<el-icon class="el-icon--right"
            ><arrow-down
          /></el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="a">Action 1</el-dropdown-item>
            <el-dropdown-item command="b">Action 2</el-dropdown-item>
            <el-dropdown-item command="c">Action 3</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <el-dropdown @command="handleCommand" class="!pr-3">
        <el-button class="!outline-0 !text-text-secondary !border-0 !shadow-md">
          <el-icon><Filter /></el-icon> Bulk Actions<el-icon
            class="el-icon--right"
            ><arrow-down
          /></el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="a">Action 1</el-dropdown-item>
            <el-dropdown-item command="b">Action 2</el-dropdown-item>
            <el-dropdown-item command="c">Action 3</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <el-button
        class="!bg-blue-main !text-white !shadow-md hover:!bg-blue-secondary !border-0 active:!text-slate-300"
        >Generate Products With AI</el-button
      >
    </div>

    <ProductTable />
  </div>
</template>

<script lang="ts">
import ProductTable from "../components/Products/ProductTable.vue";

import { ElMessage } from "element-plus";

const handleCommand = (command: string | number | object) => {
  ElMessage(`click on item ${command}`);
};

export default {
  name: "ProductsView",
  components: {
    ProductTable,
  },
  methods: {
    handleCommand,
  },
};
</script>

<style scoped>
.header {
  color: #2d72e8;
  size: 16px;
}

.sub-header {
  color: #254582;
  size: 14px;
}

.example-showcase .el-dropdown-link {
  cursor: pointer;
  background-color: azure;
  /* color: var(--el-color-primary); */
  display: flex;
  align-items: center;
}
</style>
