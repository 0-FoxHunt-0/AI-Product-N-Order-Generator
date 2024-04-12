<template>
  <div class="orders">
    <p class="header py-1">All Products</p>
    <p class="sub-header py-1">
      Create new products and manage your active items
    </p>

    <OrderTable />
  </div>
</template>

<script setup>
import OrderTable from "@/components/Orders/OrderTable.vue";
</script>
