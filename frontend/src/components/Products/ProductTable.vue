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
    <el-table-column prop="brand" label="Brand" width="150" />
    <el-table-column prop="notes" label="Notes" width="200" />
    <el-table-column
      prop="tags"
      label="Tags"
      width="150"
      filter-placement="bottom-end"
    >
      <template #default="scope">
        <div class="flex gap-2">
          <el-tag
            v-for="tag in scope.row.tags"
            :key="tag.SKU"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)"
          >
            {{ tag.message }}
          </el-tag>
          <el-input
            v-if="inputVisible"
            ref="InputRef"
            v-model="inputValue"
            class="w-20"
            size="small"
            @keyup.enter="handleInputConfirm"
            @blur="handleInputConfirm"
          />
          <el-button
            v-else
            class="button-new-tag"
            size="small"
            @click="showInput"
          >
            + New Tag
          </el-button>
        </div>
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
    <span>Count display</span>
  </el-footer>
</template>

<script lang="ts" setup>
import { ElInput, ElTable } from "element-plus";
import { computed, nextTick, ref } from "vue";
import ProductModel from "../../Models/ProductModel";
import productService from "../../Services/ProductService";

// Data
const products = ref();
async function load() {
  products.value = await productService.getAllProducts();

  // const productsModule = getModule(ProductModule);
  // products.value = productsModule.getAllProducts;
}

load();

// Tags
const inputValue = ref("");
const dynamicTags = ref(["Tag 1", "Tag 2", "Tag 3"]);
const inputVisible = ref(false);
const InputRef = ref<InstanceType<typeof ElInput>>();

const handleClose = (tag: string) => {
  dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1);
};

const showInput = () => {
  inputVisible.value = true;
  nextTick(() => {
    InputRef.value!.input!.focus();
  });
};

const handleInputConfirm = () => {
  if (inputValue.value) {
    dynamicTags.value.push(inputValue.value);
  }
  inputVisible.value = false;
  inputValue.value = "";
};

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
//   products.value.filter(
//     (data): any =>
//       !search.value ||
//       data.SKU.toLowerCase().includes(search.value.toLowerCase())
//   )
// );

// const products: ProductModel[] = productService.getAllProducts();
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>

<!-- @click.prevent="deleteRow(scope.$index)" -->
