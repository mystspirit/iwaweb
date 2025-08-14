import { useRouter } from 'next/router';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import { useEffect, useState } from 'react';
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

interface BlogPost {
  id: string;
  title: string;
  content: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  author?: string;
}

export default function BlogPostDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`/api/admin/blog-posts?id=${id}`)
        .then((res) => res.json())
        .then((data) => {
          setPost(data.post || null);
          setLoading(false);
        });
    }
  }, [id]);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span>Loading...</span>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span>Blog post not found.</span>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{post.title} | Infinite Wall Art Blog</title>
        <meta name="description" content={post.title} />
      </Head>
      <Navbar />
      <main className="max-w-3xl mx-auto py-10 px-4">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="text-gray-500 text-sm mb-6">
          {post.author && <span>By {post.author} · </span>}
          {new Date(post.createdAt).toLocaleDateString()}
        </div>
        <article className="prose prose-lg max-w-none mb-8" dangerouslySetInnerHTML={{ __html: post.content }} />
        <div className="mt-8">
          <h4 className="font-semibold mb-2">Share this post:</h4>
          <div className="flex gap-3">
            <FacebookShareButton url={shareUrl} hashtag="#InfiniteWallArt">
              <FacebookIcon size={36} round />
            </FacebookShareButton>
            <TwitterShareButton url={shareUrl} title={post.title} hashtags={["InfiniteWallArt"]}>
              <TwitterIcon size={36} round />
            </TwitterShareButton>
            <PinterestShareButton url={shareUrl} media="" description={post.title}>
              <PinterestIcon size={36} round />
            </PinterestShareButton>
            <EmailShareButton url={shareUrl} subject={post.title} body={`Check out this blog post: ${post.title}`}>
              <EmailIcon size={36} round />
            </EmailShareButton>
          </div>
        </div>
      </main>
    </>
  );
}
