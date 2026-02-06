import React, { useState } from "react";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import { AddressResponseI } from "@/interfaces/Adress";
import toast from "react-hot-toast";

export default function DeleteAddress({ onSuccess, addressId }: { onSuccess: () => void; addressId: string }) {


	const [deleteLoading, setDeleteLoading] = useState(false);

  async function handleDeleteAddress() {
    setDeleteLoading(true);
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/addresses/${addressId}`,
      {
        method: "DELETE",
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
        setDeleteLoading(false);
      }
    }
  return (
    <>
      <Button className="flex gap-2" variant="destructive" size="sm" onClick={handleDeleteAddress} disabled={deleteLoading}>
        {deleteLoading ? "Deleting..." : <> <Trash size={16} /> Delete</>}
      </Button>
    </>
  );
}
