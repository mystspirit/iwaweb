import Head from 'next/head';
import Navbar from '../components/Navbar';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    const line_items = cart.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: `${item.title} (${item.type}, ${item.size})`,
          images: [item.imageUrl],
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));
    const res = await fetch('/api/checkout_sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ line_items }),
    });
    const data = await res.json();
    if (data.id) {
      clearCart();
      window.location.href = `https://checkout.stripe.com/pay/${data.id}`;
    } else {
      alert('Checkout failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Cart | Infinite Wall Art</title>
        <meta name="description" content="View your shopping cart and proceed to checkout." />
      </Head>
      <Navbar />
      <main className="max-w-2xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold mb-8">Your Cart</h2>
        {cart.length === 0 ? (
          <div className="border rounded p-4 mb-4">No items in cart.</div>
        ) : (
          <div className="space-y-4 mb-8">
            {cart.map((item, idx) => (
              <div key={idx} className="flex items-center border rounded p-4 justify-between">
                <div>
                  <div className="font-semibold">{item.title}</div>
                  <div className="text-sm text-gray-500">{item.type}, {item.size}</div>
                  <div className="text-sm">Qty: {item.quantity}</div>
                  <div className="font-bold mt-1">${item.price}</div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id, item.size, item.type)}
                  className="ml-4 text-red-500 hover:underline"
                >Remove</button>
              </div>
            ))}
          </div>
        )}
        <button
          className="bg-black text-white px-6 py-3 rounded disabled:opacity-50"
          disabled={cart.length === 0 || loading}
          onClick={handleCheckout}
        >
          {loading ? 'Redirecting…' : 'Proceed to Checkout'}
        </button>
      </main>
    </>
  );
}
