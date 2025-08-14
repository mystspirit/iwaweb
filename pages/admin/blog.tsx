import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import Head from 'next/head';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

export default function AdminBlog() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [published, setPublished] = useState(false);
  const [author, setAuthor] = useState('');
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [error, setError] = useState('');
  const [posts, setPosts] = useState<{ id: string; title: string; content: string; published: boolean; author: string; createdAt: string }[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editAuthor, setEditAuthor] = useState('');
  const [editPublished, setEditPublished] = useState(false);
  const [editSaving, setEditSaving] = useState(false);

  async function fetchPosts() {
    setLoadingPosts(true);
    try {
      const res = await fetch('/api/admin/blog-posts');
      const data = await res.json();
      if (res.ok && data.posts) {
        setPosts(data.posts);
      }
    } finally {
      setLoadingPosts(false);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg('');
    setError('');
    try {
      const res = await fetch('/api/admin/create-blog-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, published, author }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccessMsg('Blog post created!');
        setTitle('');
        setContent('');
        setPublished(false);
        setAuthor('');
        fetchPosts();
      } else {
        setError(data.error || 'Failed to create post');
      }
    } catch {
      setError('Failed to create post');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this blog post?')) return;
    await fetch('/api/admin/delete-blog-post', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    fetchPosts();
  }

  async function handleEditSave(id: string) {
    setEditSaving(true);
    await fetch('/api/admin/update-blog-post', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id,
        title: editTitle,
        content: editContent,
        published: editPublished,
        author: editAuthor,
      }),
    });
    setEditId(null);
    setEditSaving(false);
    fetchPosts();
  }

  return (
    <>
      <Head>
        <title>Admin Blog | Infinite Wall Art</title>
      </Head>
      <main className="max-w-2xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold mb-8">Write Blog Post</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSave}>
          <label className="font-semibold">Title</label>
          <input
            className="border rounded px-2 py-1"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
          <label className="font-semibold">Content</label>
          <ReactQuill theme="snow" value={content} onChange={setContent} className="bg-white" />
          <label className="font-semibold">Author</label>
          <input
            className="border rounded px-2 py-1"
            value={author}
            onChange={e => setAuthor(e.target.value)}
          />
          <label className="inline-flex items-center gap-2">
            <input type="checkbox" checked={published} onChange={e => setPublished(e.target.checked)} />
            Published
          </label>
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 disabled:opacity-60"
            disabled={saving || !title || !content}
          >
            {saving ? 'Saving...' : 'Save Post'}
          </button>
          {successMsg && <div className="text-green-700 text-sm mt-2">{successMsg}</div>}
          {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
        </form>

        <div className="mt-12">
          <h3 className="text-2xl font-semibold mb-4">All Blog Posts</h3>
          {loadingPosts ? (
            <div>Loading...</div>
          ) : posts.length === 0 ? (
            <div className="text-gray-500">No blog posts found.</div>
          ) : (
            <ul className="space-y-6">
              {posts.map(post => (
                <li key={post.id} className="border rounded p-4">
                  {editId === post.id ? (
                    <div className="flex flex-col gap-2">
                      <input
                        className="border rounded px-2 py-1"
                        value={editTitle}
                        onChange={e => setEditTitle(e.target.value)}
                      />
                      <ReactQuill theme="snow" value={editContent} onChange={setEditContent} className="bg-white" />
                      <input
                        className="border rounded px-2 py-1"
                        value={editAuthor}
                        onChange={e => setEditAuthor(e.target.value)}
                      />
                      <label className="inline-flex items-center gap-2">
                        <input type="checkbox" checked={editPublished} onChange={e => setEditPublished(e.target.checked)} />
                        Published
                      </label>
                      <div className="flex gap-2 mt-2">
                        <button
                          className="bg-green-700 text-white px-3 py-1 rounded text-xs"
                          onClick={() => handleEditSave(post.id)}
                          disabled={editSaving}
                        >Save</button>
                        <button
                          className="bg-gray-300 text-gray-700 px-3 py-1 rounded text-xs"
                          onClick={() => setEditId(null)}
                        >Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex gap-2 items-center">
                        <span className="font-semibold text-lg">{post.title}</span>
                        {post.published && <span className="text-green-700 text-xs ml-1">Published</span>}
                      </div>
                      <div className="prose prose-sm mt-2" dangerouslySetInnerHTML={{ __html: post.content }} />
                      <div className="text-xs text-gray-500 mt-2">By {post.author || 'Unknown'} on {new Date(post.createdAt).toLocaleString()}</div>
                      <div className="flex gap-2 mt-2">
                        <button
                          className="bg-blue-700 text-white px-3 py-1 rounded text-xs"
                          onClick={() => {
                            setEditId(post.id);
                            setEditTitle(post.title);
                            setEditContent(post.content);
                            setEditAuthor(post.author || '');
                            setEditPublished(post.published);
                          }}
                        >Edit</button>
                        <button
                          className="bg-red-600 text-white px-3 py-1 rounded text-xs"
                          onClick={() => handleDelete(post.id)}
                        >Delete</button>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </>
  );
}
