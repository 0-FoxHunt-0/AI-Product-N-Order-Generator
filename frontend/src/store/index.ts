import { createStore } from "vuex";
import OrderModule from "./Modules/OrdersModule";
import ProductModel from "@/Models/ProductModel";
// import productsModule from "./Modules/ProductsModule";
import ordersModule from "./Modules/OrdersModule";
import TagModel from "@/Models/TagModel";

interface ProductState {
  products: ProductModel[];
}
const ProductModule = {
  state: () => {
    return {
      products: [] as ProductModel[],
    };
  },

  getters: {
    getAllProducts(state: ProductState) {
      return state.products;
    },
  },

  mutations: {
    setProducts(state: ProductState, products: ProductModel[]) {
      state.products = products;
    },

    addProduct(state: ProductState, product: ProductModel) {
      state.products.push(product);
    },

    updateProduct(state: ProductState, updatedProduct: ProductModel) {
      const index = state.products.findIndex(
        (p) => p.SKU === updatedProduct.SKU
      );
      if (index !== -1) {
        state.products.splice(index, 1, updatedProduct);
      }
    },

    deleteProduct(state: ProductState, productId: string) {
      state.products = state.products.filter((p) => p.SKU !== productId);
    },

    deleteTag(state: ProductState, tag: TagModel) {
      const product = state.products.find((p) => p.SKU === tag.productSKU);

      if (product) {
        // Remove the tag from the product's tags array
        product.tags = product.tags.filter((t) => t.SKU !== tag.SKU);
      }
    },
  },

  // actions: {
  //   async fetchProducts({ commit }) {
  //     const products = await productService.getAllProducts();
  //     commit("setProducts", products);
  //   },

  //   async getAllProducts({ state, dispatch }) {
  //     if (state.products.length === 0) await dispatch("fetchProducts");
  //   },

  //   async addProduct({ commit }, product: ProductModel) {
  //     const addedProduct = await productService.addProduct(product);
  //     commit("addProduct", addedProduct);
  //   },

  //   async updateProduct({ commit }, product: ProductModel) {
  //     const updatedProduct = await productService.updateProduct(product);
  //     commit("updateProduct", updatedProduct);
  //   },

  //   async deleteProduct({ commit }, productSKU: string) {
  //     await productService.deleteProduct(productSKU);
  //     commit("deleteProduct", productSKU);
  //   },

  //   async deleteTag({ commit }, tag: TagModel) {
  //     await tagService.deleteTag(tag.SKU);
  //     commit("deleteTag", tag);
  //   },
  // },
};

const store = createStore({
  modules: {
    ProductModule,
    ordersModule,
  },
});

export default store;
