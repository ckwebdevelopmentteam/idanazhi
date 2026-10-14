import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h2 className="text-3xl font-serif mb-4 text-ink">Page Not Found</h2>
      <p className="text-muted mb-6">Could not find requested resource</p>
      <Link
        href="/"
        className="px-6 py-2.5 bg-ink text-paper text-sm uppercase tracking-wider hover:bg-forest transition-colors"
      >
        Return Home
      </Link>
    </div>
  );
}
