<template>
  <el-table
    ref="multipleTableRef"
    :data="products"
    style="width: 100%"
    @selection-change="handleSelectionChange"
    max-height="500"
  >
    <el-table-column type="selection" width="55" />
    <el-table-column label="Name" width="250">
      <template #default="scope">
        <el-avatar
          loading="lazy"
          shape="square"
          :size="100"
          fit="cover"
          :src="scope.row?.imgUrl || '../../images/no-content.jpg'"
          class="inline-block"
        />
        <div>
          <p>
            {{ scope.row.name }}
          </p>
          <p>
            {{ scope.row.SKU }}
          </p>
        </div></template
      >
    </el-table-column>
    <el-table-column property="count" label="Count" width="120" />
    <el-table-column property="price" label="Price" width="120" />
    <el-table-column
      property="providerPrice"
      label="Supplier Price"
      width="120"
    />
    <el-table-column property="brand" label="Brand" width="120" />
    <el-table-column property="notes" label="Notes" width="120" />
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
    <el-table-column align="right" width="250">
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
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import ProductModel from "../../Models/ProductModel";
import { ElTable } from "element-plus";
import image from "../../assets/images/no-content.jpg";
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
      data.name.toLowerCase().includes(search.value.toLowerCase())
  )
);

const products = [
  {
    SKU: "f7d56da9-d079-44cc-85bd-48fe1ef560eb",
    name: "test",
    count: 2,
    price: 100,
    providerPrice: 80,
    brand: "testBrand2",
    imageUrl: "",
    notes: "A good product for an excellent price",
    deleted: false,
    createdAt: "2024-04-09T15:47:53.237Z",
    updatedAt: "2024-04-10T15:56:53.698Z",
    tags: [
      {
        SKU: "8200d27b-b780-4084-acc8-26ab5743f8fb",
        color: "#4E4BA4",
        message: "This is a tag",
        productSKU: "f7d56da9-d079-44cc-85bd-48fe1ef560eb",
        createdAt: "2024-04-10T16:09:03.025Z",
        updatedAt: "2024-04-10T16:09:03.025Z",
      },
      {
        SKU: "59093791-1e76-45ac-bd5d-4e87093004e9",
        color: "#4E4BA4",
        message: "This is a tag",
        productSKU: "f7d56da9-d079-44cc-85bd-48fe1ef560eb",
        createdAt: "2024-04-10T16:09:03.911Z",
        updatedAt: "2024-04-10T16:09:03.911Z",
      },
      {
        SKU: "0857a40b-7918-4f4d-8c4a-96c344494ac4",
        color: "#4E4BA4",
        message: "This is a tag",
        productSKU: "f7d56da9-d079-44cc-85bd-48fe1ef560eb",
        createdAt: "2024-04-10T16:09:04.414Z",
        updatedAt: "2024-04-10T16:09:04.414Z",
      },
      {
        SKU: "1b4cddfc-087d-4df2-b59c-4c71793779c5",
        color: "#4E4BA4",
        message: "This is a tag",
        productSKU: "f7d56da9-d079-44cc-85bd-48fe1ef560eb",
        createdAt: "2024-04-10T16:09:05.064Z",
        updatedAt: "2024-04-10T16:09:05.064Z",
      },
      {
        SKU: "732f9691-d346-4d39-8562-4e6d5a13440a",
        color: "#4E4BA4",
        message: "This is a tag",
        productSKU: "f7d56da9-d079-44cc-85bd-48fe1ef560eb",
        createdAt: "2024-04-10T16:09:05.519Z",
        updatedAt: "2024-04-10T16:09:05.519Z",
      },
    ],
  },
  {
    SKU: "b678723d-49da-4544-90b4-1f8b50388d84",
    name: "test2",
    count: 2,
    price: 100,
    providerPrice: 80,
    brand: "testBrand2",
    imageUrl: null,
    notes: "A good product for an excellent price",
    deleted: false,
    createdAt: "2024-04-10T16:07:57.891Z",
    updatedAt: "2024-04-10T16:07:57.891Z",
    tags: [],
  },
];
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>

<!-- @click.prevent="deleteRow(scope.$index)" -->
