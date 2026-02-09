"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AddressI } from "@/interfaces";
import DeleteAddress from "@/components/DeleteAddress/DeleteAddress";
import AddAddress from "@/components/AddAddress/AddAddress";
import { FetchAddressesAction } from "./_action/FetchAddress_action";
export default function Address() {
	const [addresses, setAddresses] = useState<AddressI[]>([]);
	const [loading, setLoading] = useState(true);
	async function fetchAddresses() {
		setLoading(true);
		const data = await FetchAddressesAction();
		if (data.data) {
			setAddresses(data.data);
		}
		console.log(data.data);
		setLoading(false);
	}

	useEffect(() => {
		fetchAddresses();
	}, []);

	// دالة يناديها AddAddress بعد النجاح
	const handleAddressAdded = () => {
		fetchAddresses();
	};
	if (loading) {
		return <div className="py-10 text-center">Loading addresses...</div>;
	}

	return (
		<section className="px-4 py-10 md:py-14">
			{/* Header */}
			<div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
				<div>
					<h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
						My Address
					</h1>
					<p className="mt-2 text-sm text-muted-foreground">
						Manage your delivery addresses and set a default one.
					</p>
				</div>

				<AddAddress onSuccess={handleAddressAdded} />
			</div>

			{/* Saved Addresses */}
			<div className="lg:col-span-3 space-y-4">   
				<Card className="border-border/60 bg-background/70">
					<CardHeader className="pb-3">
						<div className="flex items-center justify-between gap-3">
							<CardTitle className="text-base">Saved Addresses</CardTitle>
							<Badge variant="secondary" className="rounded-full">
								{addresses.length} saved
							</Badge>
						</div>
					</CardHeader>

					<CardContent className="space-y-4">
						{addresses.map((address) => (
							<div
								key={address._id}
								className="relative rounded-2xl border border-border/60 bg-muted/20 p-4 transition hover:border-primary/30 hover:bg-muted/30 "
							>
								<div className="flex items-center justify-between gap-3">
									<div className="min-w-0">
										<div className="flex flex-wrap items-center gap-2">
											<Badge className="rounded-full" variant="secondary">
												{address.city}
											</Badge>
										</div>

										<h3 className="mt-2 font-semibold truncate">
											{address.name}
											<span className="text-sm font-normal text-muted-foreground">
												• {address.phone}
											</span>
										</h3>

										<p className="mt-1 text-sm text-muted-foreground">
											{address.details}
										</p>
									</div>

									{/* Actions */}
									<div className="flex shrink-0 flex-col gap-2 sm:flex-row">
										<DeleteAddress
											onSuccess={handleAddressAdded}
											addressId={address._id}
										/>
									</div>
								</div>
							</div>
						))}
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
