import { CartProduct } from "./CartProductItem";

export interface CartProductI {
  count: number;
  _id: string;
  product: CartProduct;
  price: number;

}
