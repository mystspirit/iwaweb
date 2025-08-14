import { getCsrfToken, signIn } from 'next-auth/react';
import { useState } from 'react';
import Head from 'next/head';
import Navbar from '../../components/Navbar';

export default function Login({ csrfToken }: { csrfToken: string }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  return (
    <>
      <Head>
        <title>Login | Infinite Wall Art</title>
      </Head>
      <Navbar />
      <main className="max-w-md mx-auto py-20 px-4">
        <h2 className="text-2xl font-bold mb-6">Sign In</h2>
        <form
          method="post"
          action="/api/auth/callback/credentials"
          className="flex flex-col gap-4"
          onSubmit={async (e) => {
            e.preventDefault();
            const res = await signIn('credentials', {
              redirect: false,
              email,
              password,
            });
            if (res?.error) setError('Invalid credentials');
          }}
        >
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="border rounded px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="border rounded px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <button type="submit" className="bg-black text-white px-4 py-2 rounded mt-4 hover:bg-gray-800">Sign In</button>
        </form>
      </main>
    </>
  );
}

Login.getInitialProps = async (context: { req?: { headers: { host?: string } } }) => {
  return {
    csrfToken: await getCsrfToken(context),
  };
};
