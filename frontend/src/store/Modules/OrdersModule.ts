import OrderModel from "@/Models/OrderModel";
import orderService from "@/Services/OrderService";
import { GetterTree, MutationTree, ActionTree } from "vuex";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import store from "..";

@Module({ name: "ProductModule", dynamic: true, store })
export default class OrderModule extends VuexModule {
  orders: OrderModel[] = [];

  get totalOrderCount(): number {
    return this.orders.length;
  }

  @Mutation
  GET_ORDERS(orders: OrderModel[]) {
    this.orders = orders;
  }

  @Mutation
  ADD_ORDER(order: OrderModel) {
    this.orders.push(order);
  }

  @Mutation
  DELETE_ORDER(orderSKU: string) {
    this.orders = this.orders.filter((order) => order.SKU !== orderSKU);
  }

  @Mutation
  SET_ORDERS(orders: OrderModel[]) {
    this.orders = orders;
  }

  @Action
  async fetchOrders() {
    const orders = await orderService.getAllOrders();
    this.SET_ORDERS(orders);
  }

  @Action
  async getAllOrders() {
    if (this.orders.length === 0) this.fetchOrders();
  }

  @Action
  async addOrder(productSKUs: string[]) {
    const addedOrder = await orderService.addOrder(productSKUs);
    this.ADD_ORDER(addedOrder);
  }

  @Action
  async deleteOrder(orderSKU: string) {
    await orderService.deleteOrder(orderSKU);
    this.DELETE_ORDER(orderSKU);
  }
}
