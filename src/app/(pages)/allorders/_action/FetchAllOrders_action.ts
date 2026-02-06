'use server'

import { ordersI } from "@/interfaces/orders";

export async function FetchAllOrdersAction(cartOwner: string) {

      const response = await fetch(
          "https://ecommerce.routemisr.com/api/v1/orders/user/" + cartOwner,
        );
    
        const data: ordersI[] = await response.json();
        return data;
}