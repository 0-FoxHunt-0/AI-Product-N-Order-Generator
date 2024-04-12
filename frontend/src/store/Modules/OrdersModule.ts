import OrderModel from "@/Models/OrderModel";
import orderService from "@/Services/OrderService";
import { GetterTree, MutationTree, ActionTree, Module } from "vuex";

// Define the RootState interface
interface RootState {
  orders: OrderModel[];
}

const state: RootState = {
  orders: [],
};

const getters: GetterTree<RootState, RootState> = {
  totalOrderCount(state): number {
    return state.orders.length;
  },
};

const mutations: MutationTree<RootState> = {
  setOrders(state, orders: OrderModel[]) {
    state.orders = orders;
  },

  addOrder(state, order: OrderModel) {
    state.orders.push(order);
  },

  deleteOrder(state, orderSKU: string) {
    state.orders = state.orders.filter((order) => order.SKU !== orderSKU);
  },
};

const actions: ActionTree<RootState, RootState> = {
  async fetchOrders({ commit }) {
    const orders = await orderService.getAllOrders();
    commit("setOrders", orders);
  },

  async getAllOrders({ state, dispatch }) {
    if (state.orders.length === 0) await dispatch("fetchOrders");
  },

  async addOrder({ commit }, productSKUs: string[]) {
    const addedOrder = await orderService.addOrder(productSKUs);
    commit("addOrder", addedOrder);
  },

  async deleteOrder({ commit }, orderSKU: string) {
    await orderService.deleteOrder(orderSKU);
    commit("deleteOrder", orderSKU);
  },
};

const ordersModule: Module<RootState, RootState> = {
  state,
  mutations,
  actions,
  getters,
};

export default ordersModule;
