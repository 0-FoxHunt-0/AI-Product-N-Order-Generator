<template>
  <el-table
    ref="multipleTableRef"
    :data="products"
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
              {{ scope.row.name }}
            </p>
            <p>
              {{ scope.row.SKU }}
            </p>
            <!-- <p>
              {{ scope.row.imageUrl }}
            </p> -->
          </div>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="count" label="Count" width="100" />
    <el-table-column prop="price" label="Price" width="100" />
    <el-table-column prop="providerPrice" label="Supplier Price" width="120" />
    <el-table-column prop="brand" label="Brand" width="100" />
    <el-table-column prop="notes" label="Notes" width="100" />
    <el-table-column
      prop="tags"
      label="Tags"
      width="100"
      filter-placement="bottom-end"
    >
      <template #default="scope">
        <el-tag v-for="tag in scope.row.tags" :key="tag.SKU">{{
          tag.message
        }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column fixed="right" align="right" width="200">
      <template #header>
        <el-input v-model="search" size="small" placeholder="Type to search" />
      </template>
      <template #default="scope">
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
import { ref, computed } from "vue";
import ProductModel from "../../Models/ProductModel";
import { ElTable } from "element-plus";
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
const filterTableData = computed(() =>
  products.filter(
    (data) =>
      !search.value ||
      data.SKU.toLowerCase().includes(search.value.toLowerCase())
  )
);

const products: ProductModel[] = [
  {
    SKU: "cluuwq4g00006ohrhsgilmngw",
    name: "test3",
    count: 2,
    price: 100,
    providerPrice: 80,
    brand: "testBrand2",
    imageUrl:
      "https://www.nichemarket.co.za/wp-content/uploads/2017/08/google-amp-fast-speed-travel-ss-1920.jpg",
    notes: "A good product for an excellent price",
    deleted: false,
    createdAt: "2024-04-11T07:17:47.905Z",
    updatedAt: "2024-04-11T07:17:47.905Z",
    tags: [
      {
        SKU: "cluuwuck5000hohrh3bu29dma",
        color: "#4E4BA4",
        message: "This is a tag",
        productSKU: "cluuwq4g00006ohrhsgilmngw",
        createdAt: "2024-04-11T07:21:05.045Z",
        updatedAt: "2024-04-11T07:21:05.045Z",
      },
      {
        SKU: "cluuwud8i000johrh28oijpg5",
        color: "#4E4BA4",
        message: "This is a tag",
        productSKU: "cluuwq4g00006ohrhsgilmngw",
        createdAt: "2024-04-11T07:21:05.923Z",
        updatedAt: "2024-04-11T07:21:05.923Z",
      },
      {
        SKU: "cluv5qoqo00013wn5ttv4dxab",
        color: "#4E4BA4",
        message: "This is a looooooong tag",
        productSKU: "cluuwq2c00005ohrhsayzbupm",
        createdAt: "2024-04-11T11:30:10.704Z",
        updatedAt: "2024-04-11T11:30:10.704Z",
      },
    ],
  },
  {
    SKU: "cluuwq6fa0007ohrhsz7evzko",
    name: "test4",
    count: 2,
    price: 100,
    providerPrice: 80,
    brand: "testBrand2",
    imageUrl: "",
    notes: "A good product for an excellent price",
    deleted: false,
    createdAt: "2024-04-11T07:17:50.470Z",
    updatedAt: "2024-04-11T07:17:50.470Z",
    tags: [
      {
        SKU: "cluuwqeqr0009ohrhd0a9ysdv",
        color: "#4E4BA4",
        message: "This is a tag",
        productSKU: "cluuwq6fa0007ohrhsz7evzko",
        createdAt: "2024-04-11T07:18:01.250Z",
        updatedAt: "2024-04-11T07:18:01.250Z",
      },
      {
        SKU: "cluuwqh7k000bohrhls3zrui9",
        color: "#4E4BA4",
        message: "This is a tag 2",
        productSKU: "cluuwq6fa0007ohrhsz7evzko",
        createdAt: "2024-04-11T07:18:04.448Z",
        updatedAt: "2024-04-11T07:18:04.448Z",
      },
      {
        SKU: "cluuwtccs000dohrhdnq5vza7",
        color: "#4E4BA4",
        message: "This is a tag 2",
        productSKU: "cluuwq6fa0007ohrhsz7evzko",
        createdAt: "2024-04-11T07:20:18.125Z",
        updatedAt: "2024-04-11T07:20:18.125Z",
      },
      {
        SKU: "cluuwthjo000fohrh17u8y2y7",
        color: "#4E4BA4",
        message: "This is a tag",
        productSKU: "cluuwq6fa0007ohrhsz7evzko",
        createdAt: "2024-04-11T07:20:24.853Z",
        updatedAt: "2024-04-11T07:20:24.853Z",
      },
    ],
  },
  {
    SKU: "cluuwplnj0000ohrhktn37h6h",
    name: "test",
    count: 2,
    price: 100,
    providerPrice: 80,
    brand: "testBrand",
    imageUrl: "",
    notes: "A good product for an excellent price",
    deleted: false,
    createdAt: "2024-04-11T07:17:23.550Z",
    updatedAt: "2024-04-11T07:17:23.550Z",
    tags: [],
  },
  {
    SKU: "cluuwpos10001ohrh5ts56mnk",
    name: "test2",
    count: 2,
    price: 100,
    providerPrice: 80,
    brand: "testBrand",
    imageUrl: "",
    notes: "A good product for an excellent price",
    deleted: false,
    createdAt: "2024-04-11T07:17:27.601Z",
    updatedAt: "2024-04-11T07:17:27.601Z",
    tags: [],
  },
  {
    SKU: "cluuwpr3n0002ohrhb005s2ga",
    name: "test3",
    count: 2,
    price: 100,
    providerPrice: 80,
    brand: "testBrand",
    imageUrl: "",
    notes: "A good product for an excellent price",
    deleted: false,
    createdAt: "2024-04-11T07:17:30.612Z",
    updatedAt: "2024-04-11T07:17:30.612Z",
    tags: [],
  },
  {
    SKU: "cluuwpvxv0003ohrhjherkyqs",
    name: "test4",
    count: 2,
    price: 100,
    providerPrice: 80,
    brand: "testBrand",
    imageUrl: "",
    notes: "A good product for an excellent price",
    deleted: false,
    createdAt: "2024-04-11T07:17:36.883Z",
    updatedAt: "2024-04-11T07:17:36.883Z",
    tags: [],
  },
  {
    SKU: "cluuwq0g40004ohrh8nqtye94",
    name: "test",
    count: 2,
    price: 100,
    providerPrice: 80,
    brand: "testBrand2",
    imageUrl: "",
    notes: "A good product for an excellent price",
    deleted: false,
    createdAt: "2024-04-11T07:17:42.722Z",
    updatedAt: "2024-04-11T07:17:42.722Z",
    tags: [],
  },
  {
    SKU: "cluuwq2c00005ohrhsayzbupm",
    name: "test2",
    count: 2,
    price: 100,
    providerPrice: 80,
    brand: "testBrand2",
    imageUrl: "",
    notes: "A good product for an excellent price",
    deleted: false,
    createdAt: "2024-04-11T07:17:45.168Z",
    updatedAt: "2024-04-11T07:17:45.168Z",
    tags: [
      {
        SKU: "cluuwwupf000lohrhhweqkpuu",
        color: "#4E4BA4",
        message: "This is a tag",
        productSKU: "cluuwq2c00005ohrhsayzbupm",
        createdAt: "2024-04-11T07:23:01.875Z",
        updatedAt: "2024-04-11T07:23:01.875Z",
      },
      {
        SKU: "cluuwx0o7000nohrhqdvfrm7p",
        color: "#4E4BA4",
        message: "This is a tag 2",
        productSKU: "cluuwq2c00005ohrhsayzbupm",
        createdAt: "2024-04-11T07:23:09.607Z",
        updatedAt: "2024-04-11T07:23:09.607Z",
      },
    ],
  },
];
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>

<!-- @click.prevent="deleteRow(scope.$index)" -->
