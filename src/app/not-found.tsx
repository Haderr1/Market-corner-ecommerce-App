import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-6xl font-bold text-muted-foreground">404</h1>

      <p className="text-lg text-foreground">Page not found</p>

      <p className="text-sm text-muted-foreground">
        The page you’re looking for doesn’t exist or has been moved.
      </p>

      <Link
        href="/"
        className="mt-4 rounded-md border px-4 py-2 text-sm transition hover:bg-muted"
      >
        Back to home
      </Link>
    </div>
  );
}
