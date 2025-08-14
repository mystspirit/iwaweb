import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* SEO meta tags */}
        <meta name="author" content="Infinite Wall Art" />
        <meta name="keywords" content="wall art, canvas prints, framed prints, modern art, home decor, minimalistic art, online shop, blog" />
        {/* Google Fonts for modern, clean typography */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
      </Head>
      <body className="font-sans bg-white text-black">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
