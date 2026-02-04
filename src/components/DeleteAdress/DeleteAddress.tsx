import React from "react";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";

export default function DeleteAddress() {
	return (
		<>
			<Button className="flex gap-2" variant="destructive" size="sm">
				<Trash />
			</Button>
		</>
	);
}
