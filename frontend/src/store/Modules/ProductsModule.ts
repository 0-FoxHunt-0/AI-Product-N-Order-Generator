import ProductModel from "@/Models/ProductModel";
import TagModel from "@/Models/TagModel";
import productService from "@/Services/ProductService";
import tagService from "@/Services/TagService";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import store from "..";

@Module({ name: "ProductModule", dynamic: true, store })
export default class ProductModule extends VuexModule {
  products: ProductModel[] = [];

  get returnProducts(): ProductModel[] {
    return this.products;
  }

  get totalProductsCount(): number {
    return this.products.length;
  }

  get getDeletedProducts(): ProductModel[] {
    return this.products.filter((product) => product.deleted);
  }

  @Mutation
  SET_PRODUCTS(products: ProductModel[]) {
    this.products = products;
  }

  @Mutation
  ADD_PRODUCT(product: ProductModel) {
    this.products.push(product);
  }

  @Mutation
  UPDATE_PRODUCT(updatedProduct: ProductModel) {
    const index = this.products.findIndex((p) => p.SKU === updatedProduct.SKU);
    if (index !== -1) {
      this.products.splice(index, 1, updatedProduct);
    }
  }

  @Mutation
  DELETE_PRODUCT(productId: string) {
    this.products = this.products.filter((p) => p.SKU !== productId);
  }

  @Mutation
  DELETE_TAG(tag: TagModel) {
    const product = this.products.find((p) => p.SKU === tag.productSKU);

    if (product) {
      product.tags = product.tags.filter((t) => t.SKU !== tag.SKU);
    }
  }

  @Action
  async fetchProducts() {
    const products: ProductModel[] = await productService.getAllProducts();
    this.SET_PRODUCTS(products);
  }

  @Action
  async getAllProducts() {
    if (this.products.length === 0) await this.fetchProducts();
    this.returnProducts;
    // return this.products;
  }

  @Action
  async addProduct(product: ProductModel) {
    const addedProduct = await productService.addProduct(product);
    this.ADD_PRODUCT(addedProduct);
  }

  @Action
  async updateProduct(product: ProductModel) {
    const updatedProduct = await productService.updateProduct(product);
    this.UPDATE_PRODUCT(updatedProduct);
  }

  @Action
  async deleteProduct(productSKU: string) {
    await productService.deleteProduct(productSKU);
    this.DELETE_PRODUCT(productSKU);
  }

  @Action
  async deleteTag(tag: TagModel) {
    await tagService.deleteTag(tag.SKU);
    this.DELETE_TAG(tag);
  }
}
