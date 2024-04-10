<template>
  <nav class="w-max flex justify-center">
    <el-row class="tac">
      <el-col :span="12">
        <h5 class="mb-4 p-4 w-max flex justify-center">
          <img src="../assets/images/logo.png" alt="3D Sellers company logo" />
          <span class="self-center px-4"> Listing & Products </span>
        </h5>
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo w-max rounded-2xl m-9 py-3 px-2"
          @open="handleOpen"
          @close="handleClose"
          router="true"
        >
          <el-sub-menu index="1" class="w-max">
            <template #title>
              <el-icon>
                <List />
              </el-icon>
              <span>Listings Manager</span>
            </template>
            <el-menu-item index="/"
              ><el-icon><ShoppingTrolley /></el-icon> All Product
              Listings</el-menu-item
            >
            <el-menu-item index="orders"
              ><el-icon> <Collection /> </el-icon> Orders</el-menu-item
            >
            <el-menu-item index="settings"
              ><el-icon><Tools /></el-icon> Settings</el-menu-item
            >
          </el-sub-menu>
        </el-menu>
      </el-col>
    </el-row>
  </nav>
</template>

<script lang="ts" setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from "@element-plus/icons-vue";
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>
