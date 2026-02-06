"use client";
import React, { useRef, useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { AddressResponseI } from "@/interfaces";
import toast from "react-hot-toast";

export default function AddAddress({ onSuccess }: { onSuccess: () => void }) {
  const [open, setOpen] = useState(false);
  const [addressLoading, setAddressLoading] = useState<boolean>(false);
  const nameInput = useRef<HTMLInputElement>(null);
  const detailsInput = useRef<HTMLInputElement>(null);
  const cityInput = useRef<HTMLInputElement>(null);
  const phoneInput = useRef<HTMLInputElement>(null);

  async function handleAddAddress() {
    setAddressLoading(true);
    const newAddress = {
      name: nameInput.current?.value,
      details: detailsInput.current?.value,
      city: cityInput.current?.value,
      phone: phoneInput.current?.value,
    };

    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/addresses",
      {
        method: "POST",
        body: JSON.stringify(newAddress),
        headers: {
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NzdhOGYxODI0ZDMzNjJjNDUyYWQyYSIsIm5hbWUiOiJIYWRlciBGYXJhZyIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzY5NDQ5ODIxLCJleHAiOjE3NzcyMjU4MjF9.51CjXx1gdrmBPQh1haOuP5_TAyzobWdjModDlGs6OY4",
          "content-type": "application/json",
        },
      },
    );
    const data: AddressResponseI = await response.json();
    console.log(data);
    if (data.status === "success") {
      toast.success(data.message);
      onSuccess(); //  الدالة لتحديث القائمة في المكون الأب}
      setAddressLoading(false);
      setOpen(false);
    }
  }
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <form>
          <DialogTrigger asChild>
            <Button className="w-fit">+ Add Address</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-sm">
            <DialogHeader>
              <DialogTitle>Add New Address</DialogTitle>
              <DialogDescription>
                Fill the form below to add a new address to your address book.
              </DialogDescription>
            </DialogHeader>
            <Label>name</Label>
            <Input id="name" name="name" ref={nameInput} />

            <Label>details</Label>
            <Input id="details" name="details" ref={detailsInput} />
            <Label>city</Label>
            <Input id="city" name="city" ref={cityInput} />
            <Label>phone</Label>
            <Input id="phone" name="phone" ref={phoneInput} />
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleAddAddress}
                disabled={addressLoading}
              >
                {addressLoading ? "Saving..." : "Save Address"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </>
  );
}
