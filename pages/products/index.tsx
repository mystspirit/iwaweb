import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '../../context/CartContext';

const products = [
  {
    id: '1',
    title: 'Sunset Vista',
    imageUrl: '/placeholder1.jpg',
    type: 'canvas',
    size: '24x16',
    price: 99,
    description: 'A breathtaking sunset over rolling hills',
    colors: ['orange', 'purple', 'pink']
  },
  {
    id: '2',
    title: 'Mountain Peaks',
    imageUrl: '/placeholder2.jpg',
    type: 'framed',
    size: '36x24',
    price: 149,
    description: 'Majestic mountain range in morning light',
    colors: ['blue', 'white', 'gray']
  },
  {
    id: '3',
    title: 'Ocean Breeze',
    imageUrl: '/placeholder3.jpg',
    type: 'canvas',
    size: '16x12',
    price: 79,
    description: 'Calming ocean waves on a peaceful shore',
    colors: ['blue', 'teal', 'white']
  },
  {
    id: '4',
    title: 'Forest Path',
    imageUrl: '/placeholder4.jpg',
    type: 'canvas',
    size: '36x24',
    price: 129,
    description: 'Mysterious forest path leading to unknown adventures',
    colors: ['green', 'brown', 'yellow']
  },
  {
    id: '5',
    title: 'City Lights',
    imageUrl: '/placeholder5.jpg',
    type: 'framed',
    size: '24x16',
    price: 109,
    description: 'Vibrant city skyline at night with colorful lights',
    colors: ['blue', 'yellow', 'red']
  },
  {
    id: '6',
    title: 'Desert Dunes',
    imageUrl: '/placeholder6.jpg',
    type: 'canvas',
    size: '16x12',
    price: 89,
    description: 'Golden sand dunes under a bright blue sky',
    colors: ['yellow', 'orange', 'blue']
  },
];

const filters = [
  { name: 'All', value: 'all' },
  { name: 'Canvas', value: 'canvas' },
  { name: 'Framed', value: 'framed' },
  { name: 'Best Sellers', value: 'best' },
];

export default function Products() {
  const { addToCart } = useCart();
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredProducts = products.filter(product => 
    activeFilter === 'all' || product.type === activeFilter
  );

  return (
    <>
      <Head>
        <title>Shop Premium Wall Art | Infinite Wall Art</title>
        <meta name="description" content="Discover our curated collection of premium canvas and framed wall art prints. Transform your space with stunning artwork in multiple sizes." />
      </Head>
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Premium Wall Art Collection
          </h1>
          <p className="text-xl text-purple-100 mb-10 max-w-3xl mx-auto">
            Curated artwork that transforms your space. Each piece is carefully selected and printed with museum-quality materials.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span>Free Shipping $100+</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white">
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
              <span>30-Day Returns</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white">
              <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
              <span>Premium Quality</span>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-16">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeFilter === filter.value
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filter.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div 
              key={product.id} 
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-purple-100 transform hover:-translate-y-2 transition duration-300 hover:shadow-xl"
            >
              {/* Product Image */}
              <div className="relative h-64 overflow-hidden">
                <Image 
                  src={product.imageUrl} 
                  alt={product.title} 
                  className="w-full h-full object-cover transition duration-500 hover:scale-110"
                  fill
                  style={{ objectFit: 'cover' }}
                />
                
                {/* Type Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${
                    product.type === 'canvas' 
                      ? 'bg-indigo-500' 
                      : 'bg-pink-500'
                  }`}>
                    {product.type.charAt(0).toUpperCase() + product.type.slice(1)}
                  </span>
                </div>
                
                {/* Size Badge */}
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full text-xs font-bold text-gray-800">
                    {product.size}
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-900">{product.title}</h3>
                  <span className="text-xl font-bold text-indigo-600">${product.price}</span>
                </div>
                
                <p className="text-gray-600 mb-5">{product.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-5">
                  {product.colors.map((color, i) => (
                    <div key={i} className="w-5 h-5 rounded-full border border-gray-300" style={{ backgroundColor: color }} title={color}></div>
                  ))}
                </div>
                
                <button 
                  onClick={() => addToCart({...product, quantity: 1})}
                  className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold rounded-lg hover:from-indigo-600 hover:to-purple-600 transition duration-300"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🎨</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your filters to see more results.</p>
          </div>
        )}
        
        {/* CTA Section */}
        <section className="mt-24 py-16 bg-gradient-to-r from-indigo-600 to-purple-700 rounded-2xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Can&apos;t Find What You&apos;re Looking For?</h2>
          <p className="text-xl text-purple-100 mb-10 max-w-2xl mx-auto">
            Our collection is constantly growing. Check back soon for new arrivals!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/" className="px-8 py-4 bg-white text-indigo-700 font-bold rounded-lg hover:bg-gray-100 transition duration-300 shadow-lg">
              Go Home
            </Link>
            <Link href="/blog" className="px-8 py-4 bg-white/20 text-white font-bold rounded-lg hover:bg-white/30 transition duration-300 border border-white/30 shadow-lg">
              Get Inspired
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
