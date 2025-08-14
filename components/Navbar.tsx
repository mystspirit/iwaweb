import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="w-full flex justify-between items-center py-4 px-8 border-b bg-white/80 backdrop-blur sticky top-0 z-50">
      <Link href="/">
        <span className="text-2xl font-bold tracking-tight">Infinite Wall Art</span>
      </Link>
      <div className="flex gap-6 text-base font-medium">
        <Link href="/products" className="hover:text-gray-700">Shop</Link>
        <Link href="/blog" className="hover:text-gray-700">Blog</Link>
        <Link href="/account" className="hover:text-gray-700">Account</Link>
        <Link href="/admin" className="hover:text-gray-700">Admin</Link>
      </div>
    </nav>
  );
}
