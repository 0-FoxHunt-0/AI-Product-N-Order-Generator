<template>
  <el-table
    ref="multipleTableRef"
    :data="orders"
    @selection-change="handleSelectionChange"
    max-height="470"
    style="width: 100% !important"
    class="pt-4"
    table-layout="auto"
  >
    <el-table-column fixed="left" type="selection" width="55" />
    <el-table-column fixed="left" label="Name" width="250">
      <template #default="scope">
        <div class="!flex justify-between">
          <el-avatar
            v-if="scope.row.imgUrl?.length > 0"
            shape="square"
            :size="50"
            fit="cover"
          >
            <!-- <img src="@/assets/images/empty.jpg" alt="Product image" /> -->
            <img v-bind:src="scope.row.imgUrl" alt="Product image" />

            <!-- <span>{{ scope.row.imageUrl }}</span> -->
          </el-avatar>
          <el-avatar
            v-else
            shape="square"
            :size="50"
            fit="cover"
            class="inline-block"
          >
            <!-- <img v-bind:src="scope.row.imgUrl" alt="Product image" /> -->
            <img src="@/assets/images/empty.jpg" alt="Product image" />
          </el-avatar>
          <div>
            <p>
              {{ scope.row.order.SKU }}
            </p>
          </div>
        </div>
      </template>
    </el-table-column>
    <el-table-column width="500"></el-table-column>
    <template #header>
      <el-input v-model="search" size="small" placeholder="Type to search" />
    </template>
    <el-table-column fixed="right" align="right" width="200">
      <template #default="scope">
        <el-button text @click="table = true">Open Products Table</el-button>
        <el-drawer
          v-model="table"
          title="I have a nested table inside!"
          direction="rtl"
          size="50%"
        >
          <el-table :data="gridData">
            <el-table-column property="date" label="Date" width="150" />
            <el-table-column property="name" label="Name" width="200" />
            <el-table-column property="address" label="Address" />
          </el-table>
        </el-drawer>
        <el-button size="small" @click="handleEdit(scope.$index)"
          >Edit</el-button
        >
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index)"
          >Delete</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <el-footer>
    <span>I am a footer</span>
  </el-footer>
</template>

<script lang="ts" setup>
import { ElTable } from "element-plus";
import { ref } from "vue";
import ProductModel from "../../Models/ProductModel";
import orderService from "../../Services/OrderService";

// Data
const orders = ref();
async function load() {
  orders.value = await orderService.getAllOrders();
  console.log(orders.value);
  // const productsModule = getModule(ProductModule);
  // products.value = productsModule.getAllProducts;
}

load();

const table = ref(false);
const gridData = ref();
async function loadProducts(orderSKU: string) {
  orders.value = await orderService.getAllProductsForOrder(orderSKU);
  console.log(orders.value);
  // const productsModule = getModule(ProductModule);
  // products.value = productsModule.getAllProducts;
}

// Table Actions
const multipleTableRef = ref<InstanceType<typeof ElTable>>();
const multipleSelection = ref<ProductModel[]>([]);
const toggleSelection = (rows?: ProductModel[]) => {
  if (rows) {
    rows.forEach((row) => {
      // TODO: improvement typing when refactor table
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      multipleTableRef.value!.toggleRowSelection(row, false);
    });
  } else {
    multipleTableRef.value!.clearSelection();
  }
};

const handleSelectionChange = (val: ProductModel[]) => {
  multipleSelection.value = val;
};

const handleDelete = (product: ProductModel) => {
  console.log(product);
};

const handleEdit = (product: ProductModel) => {
  console.log(product);
};

const search = ref("");
// const filterTableData = computed(() =>
//   products.filter(
//     (data) =>
//       !search.value ||
//       data.SKU.toLowerCase().includes(search.value.toLowerCase())
//   )
// );

// const products: ProductModel[] = productService.getAllProducts();
</script>
