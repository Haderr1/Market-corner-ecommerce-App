import { BrandI } from "./brand";
import { CategoryI } from "./category";
import { SubcategoryI } from "./subcategory";

export interface CartProduct {
  _id: string;
  id: string;
  title: string;
  quantity: number;
  imageCover: string;
  ratingsAverage: number;
  category: CategoryI;
  brand: BrandI;
  subcategory: SubcategoryI[];
}
