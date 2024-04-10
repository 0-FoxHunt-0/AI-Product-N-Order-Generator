<script>
import NavBar from "./components/NavBar.vue";

export default {
  name: "App",
  components: {
    NavBar,
  },
};
</script>

<template>
  <div class="flex h-screen">
    <div class="w-10 min-w-max bg-gray-200 p-4">
      <NavBar></NavBar>
    </div>
    <div id="mainContent" class="p-4">
      <!-- Main content goes here -->
      <router-view />
    </div>
  </div>
</template>

<style></style>
