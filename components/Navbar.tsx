import Link from 'next/link';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { cart } = useCart();
  const itemCount = cart.reduce((sum: number, item) => sum + item.quantity, 0);

  return (
    <nav className="w-full flex justify-between items-center py-4 px-8 bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <Link href="/" className="group">
        <span className="text-2xl font-display font-bold tracking-tight bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent group-hover:from-primary-700 group-hover:to-secondary-700 transition-all duration-300">
          Infinite Wall Art
        </span>
      </Link>
      
      <div className="flex items-center gap-8">
        <div className="hidden md:flex gap-6 text-base font-medium">
          <Link href="/products" className="text-gray-700 hover:text-primary-600 transition-colors duration-200 relative group">
            Shop
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link href="/blog" className="text-gray-700 hover:text-primary-600 transition-colors duration-200 relative group">
            Blog
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link href="/account" className="text-gray-700 hover:text-primary-600 transition-colors duration-200 relative group">
            Account
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link href="/admin" className="text-gray-700 hover:text-primary-600 transition-colors duration-200 relative group">
            Admin
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-300"></span>
          </Link>
        </div>
        
        <Link href="/cart" className="relative group">
          <div className="flex items-center gap-2 bg-primary-50 hover:bg-primary-100 px-4 py-2 rounded-full transition-all duration-200 group-hover:shadow-md">
            <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h12M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6" />
            </svg>
            {itemCount > 0 && (
              <span className="bg-secondary-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                {itemCount}
              </span>
            )}
          </div>
        </Link>
      </div>
    </nav>
  );
}
