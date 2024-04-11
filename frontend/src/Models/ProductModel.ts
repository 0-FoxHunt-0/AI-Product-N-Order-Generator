import TagModel from "./TagModel";

class ProductModel {
  public SKU: string;
  public name: string;
  public count: number;
  public price: number;
  public providerPrice: number;
  public brand: string;
  public imageUrl?: string;
  public notes?: string;
  public deleted: boolean;
  public createdAt: string;
  public updatedAt: string;
  public tags?: TagModel[];
}

export default ProductModel;
