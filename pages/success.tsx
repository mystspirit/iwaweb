import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';

export default function Success() {
  return (
    <>
      <Head>
        <title>Order Success | Infinite Wall Art</title>
        <meta name="description" content="Thank you for your purchase! Your order was successful." />
      </Head>
      <Navbar />
      <main className="max-w-xl mx-auto py-12 px-4 flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-4">Thank You!</h2>
        <p className="text-lg mb-8">Your order was successful. You’ll receive a confirmation email soon.</p>
        <Link href="/products" className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800">Continue Shopping</Link>
      </main>
    </>
  );
}
