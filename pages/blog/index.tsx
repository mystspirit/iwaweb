import Head from 'next/head';

export default function Blog() {
  return (
    <>
      <Head>
        <title>Blog | Infinite Wall Art</title>
        <meta name="description" content="Read inspiration, tips, and stories about wall art and home decor." />
      </Head>
      <main className="max-w-3xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold mb-8">Blog</h2>
        {/* Blog post previews here */}
        <div className="space-y-8">
          {[1,2].map((i) => (
            <div key={i} className="border-b pb-6">
              <h3 className="font-semibold text-xl mb-2">Sample Blog Post {i}</h3>
              <p className="text-gray-600 mb-2">Short excerpt of the blog post goes here. This is a placeholder for content preview.</p>
              <a href="#" className="text-blue-600 hover:underline">Read more →</a>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
