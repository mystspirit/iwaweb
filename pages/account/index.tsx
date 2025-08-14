import Head from 'next/head';

export default function Account() {
  return (
    <>
      <Head>
        <title>My Account | Infinite Wall Art</title>
        <meta name="description" content="View your orders, manage your profile, and access your Infinite Wall Art account." />
      </Head>
      <main className="max-w-xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold mb-8">My Account</h2>
        {/* Account details and order history here */}
        <div className="space-y-6">
          <div className="border rounded p-4">
            <h4 className="font-semibold mb-2">Profile</h4>
            <p>Name: Jane Doe</p>
            <p>Email: jane@example.com</p>
          </div>
          <div className="border rounded p-4">
            <h4 className="font-semibold mb-2">Order History</h4>
            <ul className="list-disc ml-5">
              <li>Order #1234 - Canvas Print 24x16in - $129.00</li>
            </ul>
          </div>
        </div>
      </main>
    </>
  );
}
