<template>
  <div class="grid grid-cols-10 h-screen !overflow-hidden">
    <div class="navbar col-span-2 min-w-max pt-4 pl-2">
      <NavBar />
    </div>
    <div id="mainContent" class="col-span-8 p-4">
      <!-- Main content goes here -->
      <router-view />
    </div>
  </div>
</template>

<style scoped>
.navbar {
  background-color: #f7f9fb;
}
</style>

<script setup>
import NavBar from "./components/NavBar.vue";
</script>
