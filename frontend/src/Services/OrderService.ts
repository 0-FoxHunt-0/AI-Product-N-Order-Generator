import OrderModel from "@/Models/OrderModel";
import ProductModel from "@/Models/ProductModel";
import axios from "axios";

const API_URL = "http://localhost:3333/";

class OrderService {
  async getAllOrders(): Promise<OrderModel[]> {
    const response = await axios.get(`${API_URL}/orders`);
    return response.data;
  }

  async addOrder(productSKUs: string[]): Promise<OrderModel> {
    const response = await axios.post(`${API_URL}/orders/add`, productSKUs);
    return response.data;
  }

  async deleteOrder(sku: string): Promise<void> {
    await axios.delete(`${API_URL}/orders/delete/${sku}`);
  }
}

const orderService = new OrderService();

export default orderService;
