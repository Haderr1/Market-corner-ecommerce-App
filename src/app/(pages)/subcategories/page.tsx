import { SubcategoryI } from "@/interfaces";
import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag } from "lucide-react";

export default async function AllSubCategories() {
	const response = await fetch(`${process.env.API_URL}/subcategories`);
	const { data: all }: { data: SubcategoryI[] } = await response.json();

	return (
		<section className="px-4 py-10 md:py-14">
			<div className="mx-auto max-w-6xl">
				<div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
					<div>
						<h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
							Shop by SubCategory
						</h2>
						<p className="mt-2 text-sm text-muted-foreground">
							Curated collections to match your style.
						</p>
					</div>

					<Badge variant="secondary" className="w-fit rounded-full px-3 py-1">
						{all.length} Subcategories
					</Badge>
				</div>

				<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{all.map((sub) => (
						<Link
							key={sub._id}
							href={`/products`}
							className="group block focus:outline-none"
						>
							<Card
								className="
                  relative h-full overflow-hidden rounded-2xl
                  border border-border/60 bg-background/70 backdrop-blur
                  transition-all duration-300
                  hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl
                  focus-visible:ring-2 focus-visible:ring-primary/40
                "
							>
								<div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
									<div className="absolute inset-0 bg-gradient-to-br from-primary/25 via-transparent to-primary/10" />
								</div>

								<div className="pointer-events-none absolute -top-24 -right-24 h-52 w-52 rounded-full bg-primary/15 blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

								<CardHeader className="relative space-y-4 p-5">
									<div className="flex items-start justify-between gap-3">
										<Badge
											variant="secondary"
											className="
                        text-xs bg-muted/60
                        
                      "
										>
											{sub.slug}
										</Badge>
									</div>

									<div className="space-y-1">
										<CardTitle className="line-clamp-1 text-base font-semibold tracking-tight">
											{sub.name}
										</CardTitle>
										<p className="text-sm text-muted-foreground line-clamp-2">
											Explore products inside{" "}
											<span className="text-foreground/80">{sub.name}</span>.
										</p>
									</div>

									<div className="flex items-center justify-between pt-1">
										<span className="text-xs text-muted-foreground">
											Tap to view
										</span>

										<span
											className="
                        text-sm font-medium text-foreground/80
                        transition group-hover:translate-x-0.5 group-hover:text-foreground
                      "
										>
											Browse →
										</span>
									</div>

									<div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />
								</CardHeader>
							</Card>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
}
