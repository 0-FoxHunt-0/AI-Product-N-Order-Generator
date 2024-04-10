<template>
  <div class="products">
    <p class="header">All Products</p>
    <p class="sub-header">Create new products and manage your active items</p>
    <ProductTable />
    <span>I am alive!</span>
  </div>
</template>

<script lang="ts">
import ProductTable from "../components/ProductTable.vue";

export default {
  name: "ProductsView",
  components: {
    ProductTable,
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
</style>
