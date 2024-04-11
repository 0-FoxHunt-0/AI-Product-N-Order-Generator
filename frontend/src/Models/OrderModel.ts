import ProductModel from "./ProductModel";

class OrderModel {
  public SKU: string;
  public imageUrl?: string;
  public createdAt: string;
  public updatedAt: string;
  public product?: ProductModel;
}

export default OrderModel;
