<template>
  <div class="flex h-screen">
    <div class="navbar w-8 min-w-max pt-4 pl-2">
      <NavBar />
    </div>
    <div id="mainContent" class="p-4">
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
