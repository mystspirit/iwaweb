import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Head>
        <title>Infinite Wall Art - Transform Your Space</title>
        <meta name="description" content="Discover stunning wall art that transforms your space. Premium canvas and framed prints with modern designs. Free shipping on orders over $100." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Infinite Wall Art - Transform Your Space" />
        <meta property="og:description" content="Discover stunning wall art that transforms your space." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/og-image.jpg" />
      </Head>
      <Navbar />
      
      {/* Hero Section */}
      <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
              <span className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                Infinite
              </span>
              <span className="block mt-2 text-gray-900">
                Wall Art
              </span>
            </h1>
            
            <p className="max-w-2xl mx-auto text-xl md:text-2xl text-gray-700 mb-10">
              Transform your space with <span className="font-bold text-indigo-600">stunning wall art</span> that tells your story.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16">
              <Link 
                href="/products" 
                className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition duration-300 text-lg"
              >
                Shop Collection
              </Link>
              
              <Link 
                href="/blog" 
                className="px-8 py-4 bg-white text-gray-800 font-bold rounded-xl shadow-lg hover:shadow-xl border-2 border-purple-200 transform hover:-translate-y-1 transition duration-300 text-lg"
              >
                Get Inspired
              </Link>
            </div>
          </div>
          
          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-purple-100 transform hover:-translate-y-2 transition duration-300">
              <div className="text-4xl mb-4 text-indigo-600">🎨</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Premium Quality</h3>
              <p className="text-gray-600">Museum-quality prints on premium canvas and paper with archival inks that last generations.</p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-purple-100 transform hover:-translate-y-2 transition duration-300">
              <div className="text-4xl mb-4 text-purple-600">📏</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Perfect Sizes</h3>
              <p className="text-gray-600">Choose from 3 carefully curated sizes: 16×12&quot;, 24×16&quot;, or 36×24&quot; to fit any space perfectly.</p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-purple-100 transform hover:-translate-y-2 transition duration-300">
              <div className="text-4xl mb-4 text-pink-600">🚚</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Fast & Free</h3>
              <p className="text-gray-600">Free shipping on orders over $100. Fast, secure packaging ensures your art arrives perfect.</p>
            </div>
          </div>
          
          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 text-center">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
              <div className="text-3xl font-bold">1000+</div>
              <div className="text-lg">Artworks</div>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-6 text-white shadow-lg">
              <div className="text-3xl font-bold">5000+</div>
              <div className="text-lg">Happy Customers</div>
            </div>
            <div className="bg-gradient-to-br from-pink-500 to-red-600 rounded-xl p-6 text-white shadow-lg">
              <div className="text-3xl font-bold">99%</div>
              <div className="text-lg">Satisfaction</div>
            </div>
            <div className="bg-gradient-to-br from-red-500 to-orange-600 rounded-xl p-6 text-white shadow-lg">
              <div className="text-3xl font-bold">24h</div>
              <div className="text-lg">Fast Shipping</div>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-700">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Space?
            </h2>
            <p className="text-xl text-purple-100 mb-10 max-w-2xl mx-auto">
              Browse our curated collection of stunning wall art and find the perfect piece for your home.
            </p>
            <Link 
              href="/products" 
              className="inline-block px-10 py-4 bg-white text-indigo-700 font-bold rounded-xl shadow-lg hover:bg-gray-100 transform hover:-translate-y-1 transition duration-300 text-lg"
            >
              Start Shopping
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
