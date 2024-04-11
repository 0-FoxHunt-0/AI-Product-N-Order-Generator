import ProductModel from "@/Models/ProductModel";
import axios from "axios";

const API_URL = "http://localhost:3333/";

class ProductService {
  async getAllProducts(): Promise<ProductModel[]> {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
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
}

const productService = new ProductService();

export default productService;
