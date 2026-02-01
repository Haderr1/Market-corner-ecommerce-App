import { CartProductI } from "./CartProduct";

export interface CartDataI {
  _id: string;
  cartOwner: string;
  products: CartProductI[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  totalCartPrice: number;
}
