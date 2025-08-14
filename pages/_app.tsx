import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { CartProvider } from '../context/CartContext';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import GoogleAnalytics from '../components/GoogleAnalytics';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (window.gtag) {
        window.gtag('config', 'G-EZCP2E998Y', { page_path: url });
      }
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        {/* Default SEO tags */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GoogleAnalytics />
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </>
  );
}

export default MyApp;
