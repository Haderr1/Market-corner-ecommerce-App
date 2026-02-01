import React, { useRef } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
export default function CheckOut({ cartId }: { cartId: string }) {
  const cityInput = useRef<HTMLInputElement | null>(null);
  const detailsInput = useRef<HTMLInputElement | null>(null);
  const phoneInput = useRef<HTMLInputElement | null>(null);

  async function checkOutSession() {
    /*    cartId: string,
    detailsId: string,
    phone: string,
    city: string, */
    const shippingAddress = {
      detailsId: detailsInput.current?.value,
      phone: phoneInput.current?.value,
      city: cityInput.current?.value,
    };

    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
      {
        method: "POST",
        body: JSON.stringify({ shippingAddress }),
        headers: {
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NzdhOGYxODI0ZDMzNjJjNDUyYWQyYSIsIm5hbWUiOiJIYWRlciBGYXJhZyIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzY5NDQ5ODIxLCJleHAiOjE3NzcyMjU4MjF9.51CjXx1gdrmBPQh1haOuP5_TAyzobWdjModDlGs6OY4",
          "content-type": "application/json",
        },
      },
    );
    const data = await response.json();
    console.log(data);
    if (data.status == "success") {
      window.location.href = data.session.url;
    }
  }

  //use state makes alot of rerenders so we will handle the form submission differently
  //which is to use uncontrolled components and refs or just access the form elements directly on submit --use ref--
  //لاني اصلا مش عايزه اعرف هو كتب اي الا لمل يدوس تشيك اوت مش مع كل حرف

  return (
    <>
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button className="w-full h-11 text-base">
              Proceed to Checkout
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-sm">
            <DialogHeader>
              <DialogTitle>Adress Details</DialogTitle>
              <DialogDescription>
                Make Sure You Entered The Correct Details.
              </DialogDescription>
            </DialogHeader>
            <div>
              <Label className="mb-2">City</Label>
              <Input ref={cityInput} id="city" name="city" />
            </div>
            <div>
              <Label className="mb-2">Details</Label>
              <Input ref={detailsInput} id="details" name="details" />
            </div>
            <div>
              <Label className="mb-2">Phone</Label>
              <Input ref={phoneInput} id="phone" name="phone" />
            </div>

            <DialogFooter>
              {/* <DialogClose asChild>
                <Button>Cancel</Button>
              </DialogClose> */}
              <Button type="submit" onClick={() => checkOutSession()}>
                Visa
              </Button>
              <Button variant="outline" type="submit">
                Cash
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </>
  );
}
