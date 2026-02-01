import { CartDataI } from "./CartData";

export interface CartResponseI {
  status: string;
  numOfCartItems: number;
  cartId: string;
  data: CartDataI;
}
