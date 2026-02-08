import React, { useState } from "react";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import { AddressResponseI } from "@/interfaces/Address";
import toast from "react-hot-toast";
import { DeleteAddressAction } from "@/app/(pages)/Address/_action/DeleteAddress_action";

export default function DeleteAddress({
  onSuccess,
  addressId,
}: {
  onSuccess: () => void;
  addressId: string;
}) {
  const [deleteLoading, setDeleteLoading] = useState(false);

  async function handleDeleteAddress() {
    setDeleteLoading(true);
    const data = await DeleteAddressAction(addressId);
    console.log(data);
    if (data.status === "success") {
      toast.success(data.message);
      onSuccess(); //  الدالة لتحديث القائمة في المكون الأب}
      setDeleteLoading(false);
    }
  }
  return (
    <>
      <Button
        className="flex gap-2"
        variant="destructive"
        size="sm"
        onClick={handleDeleteAddress}
        disabled={deleteLoading}
      >
        {deleteLoading ? (
          "Deleting..."
        ) : (
          <>
            {" "}
            <Trash size={16} /> Delete
          </>
        )}
      </Button>
    </>
  );
}
