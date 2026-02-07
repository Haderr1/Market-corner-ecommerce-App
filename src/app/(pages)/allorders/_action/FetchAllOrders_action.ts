'use server'

import { ordersI } from "@/interfaces/orders";

export async function FetchAllOrdersAction(cartOwner: string) {

      const response = await fetch(
          `${process.env.API_URL}/orders/user/${cartOwner}`,
        );
    
        const data: ordersI[] = await response.json();
        return data;
}