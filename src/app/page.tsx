import { Button } from "@/components/ui/button";
import Image from "next/image";
import hero1 from "../../public/images/hero1.png";
import Link from "next/link";
import { BrandI, CategoryI, ProductI } from "@/interfaces";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export default async function Home() {
	const base = process.env.API_URL;

	const [brandsRes, categoriesRes, productsRes] = await Promise.all([
		fetch(`${base}/brands?limit=4`, { cache: "no-store" }),
		fetch(`${base}/categories?limit=8`, { cache: "no-store" }),
		fetch(`${base}/products?limit=8`, { cache: "no-store" }),
	]);

	if (!brandsRes.ok || !categoriesRes.ok || !productsRes.ok) {
		throw new Error("Failed to load home data");
	}

	const { data: brands }: { data: BrandI[] } = await brandsRes.json();
	const { data: categories }: { data: CategoryI[] } =
		await categoriesRes.json();
	const { data: products }: { data: ProductI[] } = await productsRes.json();
	return (
		<>
			<section
				className="
        relative overflow-hidden
        h-[80vh] min-h-screen
        -mx-24 -my-8
      "
			>
				<Image
					src={hero1}
					alt="MarketCorner Hero"
					fill
					priority
					className="object-cover"
				/>

				<div className="absolute inset-0 bg-white/60" />

				<div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-4 md:px-6 lg:px-8">
					<h1 className="text-4xl md:text-5xl font-semibold text-foreground mb-4">
						Discover Your Style
					</h1>

					<p className="text-muted-foreground max-w-xl mb-6">
						Shop the latest products with the best prices and premium quality
					</p>

					<Button size="lg">
						<Link href="/products">Shop Now</Link>
					</Button>
				</div>
			</section>
			{/* BRANDS */}
			<section className="px-4 py-20 md:py-14">
				<div className="mx-auto max-w-6xl flex flex-col justify-center items-center gap-16">
					<div>
						<div className="mb-6 flex items-end justify-between gap-4">
							<div>
								<h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
									Shop by Brand
								</h2>
								<p className="text-sm text-muted-foreground mt-2 uppercase">
									Curated collections to match your style.
								</p>
							</div>
							<Badge variant="secondary" className="hidden sm:inline-flex">
								{brands?.length} Brands
							</Badge>
						</div>
						<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
							{brands?.map((brand) => (
								<Card
									key={brand._id}
									className="group relative overflow-hidden border-muted/60 bg-background/60 transition duration-500 hover:-translate-y-1 hover:shadow-lg hover:scale-105"
								>
									<div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-primary/40 opacity-70 transition group-hover:opacity-90" />
									<Image
										src={brand.image}
										width={600}
										height={600}
										alt={`${brand.name} cover`}
										className="h-48 w-full object-cover"
									/>
									<CardHeader>
										<Badge variant="secondary" className="w-fit">
											{brand.slug}
										</Badge>
										<CardTitle>{brand.name}</CardTitle>

										{/* Optional: link */}
										<Button
											asChild
											variant="ghost"
											className="px-0 justify-start"
										>
											<Link href={`/brands/${brand._id}`}>View</Link>
										</Button>
									</CardHeader>
								</Card>
							))}
						</div>
					</div>
					<Button size="lg" className="w-56">
						<Link href="/brands">View More</Link>
					</Button>
				</div>
			</section>
			{/* CATEGORIES */}
			<section className="px-4 pb-20 md:pb-14">
				<div className="mx-auto max-w-6xl flex flex-col justify-center items-center gap-16">
					<div className="w-full">
						<div className="mb-6 flex items-end justify-between gap-4">
							<div>
								<h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
									Shop by Category
								</h2>
								<p className="text-sm text-muted-foreground mt-2 uppercase">
									Find what you need faster.
								</p>
							</div>
							<Badge variant="secondary" className="hidden sm:inline-flex">
								{categories.length} Categories
							</Badge>
						</div>

						<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
							{categories.map((c) => (
								<Link
									key={c._id}
									href={`/categories/${c._id}`}
									className="group rounded-2xl border border-border/60 bg-background/60 p-4 transition hover:-translate-y-0.5 hover:shadow"
								>
									<div className="text-sm font-semibold">{c.name}</div>
									<div className="mt-1 text-xs text-muted-foreground">
										{c.slug}
									</div>
								</Link>
							))}
						</div>
					</div>
					<Button size="lg" className="w-56">
						<Link href="/categories">View More</Link>
					</Button>
				</div>
			</section>
		</>
	);
}
