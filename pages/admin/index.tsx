import Head from 'next/head';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import withAdminAuth from '../../utils/withAdminAuth';

const SIZES = [
  { label: '16 x 12 in', value: '16x12', price: 79 },
  { label: '24 x 16 in', value: '24x16', price: 99 },
  { label: '36 x 24 in', value: '36x24', price: 149 },
];

function Admin() {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState('');
  const [error, setError] = useState('');
  const [productTitle, setProductTitle] = useState('');
  const [productDesc, setProductDesc] = useState('');
  const [productType, setProductType] = useState('canvas');
  const [creating, setCreating] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [editId, setEditId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [editType, setEditType] = useState('canvas');
  const [editSize, setEditSize] = useState('16x12');
  const [editPrice, setEditPrice] = useState(0);

  const [products, setProducts] = useState<{ id: string; title: string; description: string; type: string; size: string; price: number; imageUrl: string }[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);

  async function handleUpload() {
    if (!selectedFile) return;
    setUploading(true);
    setError('');
    setUploadedUrl('');
    const formData = new FormData();
    formData.append('image', selectedFile);
    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.url) {
        setUploadedUrl(data.url);
      } else {
        setError(data.error || 'Upload failed');
      }
    } catch {
      console.error('Failed to fetch products');
    } finally {
      setUploading(false);
    }
  }

  async function handleCreateProducts(e: React.FormEvent) {
    e.preventDefault();
    setCreating(true);
    setError('');
    setSuccessMsg('');
    try {
      // Create 3 products, one for each size
      const results = await Promise.all(
        SIZES.map(async (size) => {
          const res = await fetch('/api/admin/create-product', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              title: productTitle,
              description: productDesc,
              imageUrl: uploadedUrl,
              type: productType,
              size: size.value,
              price: size.price,
            }),
          });
          return res.ok;
        })
      );
      if (results.every(Boolean)) {
        setSuccessMsg('Products created successfully!');
        setProductTitle('');
        setProductDesc('');
        setUploadedUrl('');
        setSelectedFile(null);
        fetchProducts();
      } else {
        setError('One or more products failed to create.');
      }
    } catch {
      setError('Product creation failed');
    } finally {
      setCreating(false);
    }
  }

  async function fetchProducts() {
    setLoadingProducts(true);
    try {
      const res = await fetch('/api/admin/products');
      const data = await res.json();
      if (res.ok && data.products) {
        setProducts(data.products);
      }
    } finally {
      setLoadingProducts(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <Head>
        <title>Admin Dashboard | Infinite Wall Art</title>
        <meta name="description" content="Upload images, manage products and blog posts for Infinite Wall Art." />
      </Head>
      <main className="max-w-2xl mx-auto py-12 px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Admin Dashboard</h2>
          <button
            onClick={() => {
              localStorage.removeItem('adminToken');
              router.push('/admin/login');
            }}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
        <div className="space-y-6">
          <div className="border rounded p-4">
            <h4 className="font-semibold mb-2">Upload New Artwork</h4>
            <input
              type="file"
              accept="image/*"
              className="mb-2"
              onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
            />
            <button
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 disabled:opacity-60"
              onClick={handleUpload}
              disabled={!selectedFile || uploading}
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
            {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
            {uploadedUrl && (
              <div className="mt-4">
                <div className="font-semibold mb-1">Uploaded Image Preview:</div>
                <Image src={uploadedUrl} alt="Uploaded artwork" className="rounded border max-h-64" width={256} height={256} style={{ objectFit: 'contain', maxHeight: '16rem' }} />
                <div className="text-xs mt-1 text-gray-500">URL: {uploadedUrl}</div>
              </div>
            )}
          </div>
          {uploadedUrl && (
            <div className="border rounded p-4">
              <h4 className="font-semibold mb-2">Create Products</h4>
              <form className="flex flex-col gap-3" onSubmit={handleCreateProducts}>
                <label>Title</label>
                <input
                  className="border rounded px-2 py-1"
                  value={productTitle}
                  onChange={(e) => setProductTitle(e.target.value)}
                  required
                />
                <label>Description</label>
                <textarea
                  className="border rounded px-2 py-1"
                  value={productDesc}
                  onChange={(e) => setProductDesc(e.target.value)}
                  rows={3}
                />
                <label>Type</label>
                <select
                  className="border rounded px-2 py-1"
                  value={productType}
                  onChange={(e) => setProductType(e.target.value)}
                >
                  <option value="canvas">Canvas</option>
                  <option value="framed">Framed</option>
                </select>
                <button
                  type="submit"
                  className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 disabled:opacity-60 mt-2"
                  disabled={creating || !productTitle}
                >
                  {creating ? 'Creating...' : 'Create 3 Products (All Sizes)'}
                </button>
                {successMsg && <div className="text-green-700 text-sm mt-2">{successMsg}</div>}
                {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
              </form>
            </div>
          )}
          <div className="border rounded p-4">
            <h4 className="font-semibold mb-2">Manage Products</h4>
            {loadingProducts ? (
              <div>Loading...</div>
            ) : products.length === 0 ? (
              <div className="text-gray-500">No products found.</div>
            ) : (
              <ul className="list-disc ml-5">
                {products.map((prod) => (
                  <li key={prod.id} className="mb-2 flex items-center gap-2">
                    {editId === prod.id ? (
                      <form
                        className="flex items-center gap-2 w-full"
                        onSubmit={async (e) => {
                          e.preventDefault();
                          await fetch('/api/admin/update-product', {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                              id: prod.id,
                              title: editTitle,
                              description: editDesc,
                              type: editType,
                              size: editSize,
                              price: editPrice,
                              imageUrl: prod.imageUrl,
                            }),
                          });
                          setEditId(null);
                          fetchProducts();
                        }}
                      >
                        <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} className="border rounded px-1 py-0.5 w-24" />
                        <input value={editDesc} onChange={(e) => setEditDesc(e.target.value)} className="border rounded px-1 py-0.5 w-32" />
                        <select value={editType} onChange={(e) => setEditType(e.target.value)} className="border rounded px-1 py-0.5">
                          <option value="canvas">Canvas</option>
                          <option value="framed">Framed</option>
                        </select>
                        <select value={editSize} onChange={(e) => setEditSize(e.target.value)} className="border rounded px-1 py-0.5">
                          <option value="16x12">16x12</option>
                          <option value="24x16">24x16</option>
                          <option value="36x24">36x24</option>
                        </select>
                        <input value={editPrice} onChange={(e) => setEditPrice(Number(e.target.value))} type="number" className="border rounded px-1 py-0.5 w-16" />
                        <button type="submit" className="text-green-700 border border-green-300 rounded px-2 py-1 text-xs ml-1">Save</button>
                        <button type="button" className="text-gray-600 border border-gray-300 rounded px-2 py-1 text-xs ml-1" onClick={() => setEditId(null)}>Cancel</button>
                      </form>
                    ) : (
                      <>
                        <span className="font-semibold">{prod.type.charAt(0).toUpperCase() + prod.type.slice(1)} Print</span> - &quot;{prod.title}&quot; - {prod.size} in
                        <span className="ml-2 text-gray-500">${prod.price}</span>
                        <Image src={prod.imageUrl} alt={prod.title} className="inline-block ml-2 h-8 w-12 object-cover rounded border align-middle" width={48} height={32} />
                        <button
                          className="ml-2 text-blue-600 hover:text-blue-800 text-xs border border-blue-300 rounded px-2 py-1"
                          onClick={() => {
                            setEditId(prod.id);
                            setEditTitle(prod.title);
                            setEditDesc(prod.description);
                            setEditType(prod.type);
                            setEditSize(prod.size);
                            setEditPrice(prod.price);
                          }}
                        >Edit</button>
                        <button
                          className="ml-2 text-red-600 hover:text-red-800 text-xs border border-red-300 rounded px-2 py-1"
                          onClick={async () => {
                            if (confirm('Delete this product?')) {
                              await fetch('/api/admin/delete-product', {
                                method: 'DELETE',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ id: prod.id }),
                              });
                              fetchProducts();
                            }
                          }}
                        >Delete</button>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="border rounded p-4">
            <h4 className="font-semibold mb-2">Write Blog Post</h4>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">New Post</button>
          </div>
        </div>
      </main>
    </>
  );
}

export default withAdminAuth(Admin);
