import ProductModel from "@/Models/ProductModel";
import axios from "axios";
import ProductModule from "@/store/Modules/ProductsModule";
import { computed } from "vue";
import { getModule } from "vuex-module-decorators";
import TagModel from "@/Models/TagModel";

const API_URL = "http://localhost:3333";
// const productModule = getModule(ProductModule);

class ProductService {
  async getAllProducts(): Promise<ProductModel[]> {
    const response = await axios.get(`${API_URL}/products`);
    return await response.data;
  }

  async addProduct(product: ProductModel): Promise<ProductModel> {
    const response = await axios.post(
      `${API_URL}/products/add-product`,
      product
    );
    return response.data;
  }

  async updateProduct(product: ProductModel): Promise<ProductModel> {
    const response = await axios.put(
      `${API_URL}/products/update/${product.SKU}`,
      product
    );
    return response.data;
  }

  async restoreProduct(sku: string): Promise<ProductModel> {
    const response = await axios.patch(`${API_URL}/products/restore/${sku}`);
    return response.data;
  }

  async deleteProduct(sku: string): Promise<void> {
    await axios.delete(`${API_URL}/products/${sku}`);
  }

  async addTagToProduct(sku: string, tag: TagModel): Promise<TagModel> {
    const response = await axios.post(`${API_URL}/tags/add/${sku}`, tag);
    return await response.data;
  }
}

const productService = new ProductService();

export default productService;
