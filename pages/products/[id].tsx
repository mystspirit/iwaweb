import Head from 'next/head';
import Image from 'next/image';
import Navbar from '../../components/Navbar';
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
      <main className="max-w-4xl mx-auto py-12 px-4 flex flex-col md:flex-row gap-8">
        <div className="flex-1 bg-gray-100 rounded-lg h-96 flex items-center justify-center relative">
          <Image src={product.imageUrl} alt={product.title} className="object-cover h-full w-full rounded" fill style={{ objectFit: 'cover' }} />
        </div>
        <div className="flex-1 flex flex-col gap-4">
          <h2 className="text-3xl font-bold">{product.title}</h2>
          <p className="text-gray-600">Canvas Print</p>
          <div className="flex gap-4 mt-2">
            {product.sizes.map((size) => (
              <button
                key={size.value}
                className={`px-3 py-2 rounded border ${selectedSize.value === size.value ? 'bg-black text-white' : 'bg-white text-black'}`}
                onClick={() => setSelectedSize(size)}
              >
                {size.label}
              </button>
            ))}
          </div>
          <div className="mt-4">
            <button
              className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
              onClick={() => addToCart({ ...product, size: selectedSize.value, price: selectedSize.price, quantity: 1 })}
            >
              Add to Cart - ${selectedSize.price}
            </button>
          </div>
          <div className="mt-6">
            <h4 className="font-semibold mb-2">Share this artwork:</h4>
            <div className="flex gap-3">
              <FacebookShareButton url={shareUrl} hashtag="#InfiniteWallArt">
                <FacebookIcon size={36} round />
              </FacebookShareButton>
              <TwitterShareButton url={shareUrl} title={product.title} hashtags={["InfiniteWallArt"]}>
                <TwitterIcon size={36} round />
              </TwitterShareButton>
              <PinterestShareButton url={shareUrl} media={product.imageUrl} description={product.title}>
                <PinterestIcon size={36} round />
              </PinterestShareButton>
              <EmailShareButton url={shareUrl} subject={product.title} body={`Check out this wall art: ${product.title}`}>
                <EmailIcon size={36} round />
              </EmailShareButton>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

