import Head from 'next/head';
import Image from 'next/image';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import { useCart } from '../../context/CartContext';
import { useState } from 'react';
import {
  FacebookShareButton,
  TwitterShareButton,
  PinterestShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  PinterestIcon,
  EmailIcon
} from 'react-share';

// Placeholder product data
const product = {
  id: '1',
  title: 'Sunset Vista',
  imageUrl: '/placeholder1.jpg',
  type: 'canvas',
  price: 99,
  sizes: [
    { label: '16 x 12 in', value: '16x12', price: 79 },
    { label: '24 x 16 in', value: '24x16', price: 99 },
    { label: '36 x 24 in', value: '36x24', price: 149 },
  ],
};

export default function ProductDetail() {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(product.sizes[1]);
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <>
      <Head>
        <title>Product Details | Infinite Wall Art</title>
        <meta name="description" content="View details and purchase options for this wall art print." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-6xl mx-auto py-12 px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="relative">
              <div className="aspect-square bg-white rounded-2xl shadow-lg overflow-hidden">
                <Image 
                  src={product.imageUrl} 
                  alt={product.title} 
                  fill
                  style={{ objectFit: 'cover' }}
                  className="transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>

            {/* Product Details */}
            <div className="flex flex-col justify-center space-y-8">
              <div>
                <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">{product.title}</h1>
                <div className="flex items-center gap-3 mb-6">
                  <span className="px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                    Canvas Print
                  </span>
                  <span className="text-3xl font-bold text-primary-600">${selectedSize.price}</span>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Transform your space with this stunning wall art piece. High-quality canvas print with vibrant colors and exceptional detail.
                </p>
              </div>

              {/* Size Selection */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Choose Size</h3>
                <div className="grid grid-cols-3 gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size.value}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                        selectedSize.value === size.value 
                          ? 'border-primary-500 bg-primary-50 text-primary-700' 
                          : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      <div className="text-sm font-medium">{size.label}</div>
                      <div className="text-lg font-bold">${size.price}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Add to Cart */}
              <div className="space-y-4">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => addToCart({ ...product, size: selectedSize.value, price: selectedSize.price, quantity: 1 })}
                  className="w-full"
                >
                  Add to Cart - ${selectedSize.price}
                </Button>
                
                <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    Free shipping
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    30-day returns
                  </div>
                </div>
              </div>

              {/* Share Section */}
              <div className="pt-8 border-t border-gray-200">
                <h4 className="text-lg font-bold text-gray-900 mb-4">Share this artwork</h4>
                <div className="flex gap-3">
                  <FacebookShareButton url={shareUrl} hashtag="#InfiniteWallArt">
                    <FacebookIcon size={40} round />
                  </FacebookShareButton>
                  <TwitterShareButton url={shareUrl} title={product.title} hashtags={["InfiniteWallArt"]}>
                    <TwitterIcon size={40} round />
                  </TwitterShareButton>
                  <PinterestShareButton url={shareUrl} media={product.imageUrl} description={product.title}>
                    <PinterestIcon size={40} round />
                  </PinterestShareButton>
                  <EmailShareButton url={shareUrl} subject={product.title} body={`Check out this wall art: ${product.title}`}>
                    <EmailIcon size={40} round />
                  </EmailShareButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

