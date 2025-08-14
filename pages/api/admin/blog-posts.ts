import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const { id } = req.query;
    if (id) {
      const post = await prisma.blogPost.findUnique({ where: { id: String(id) } });
      if (!post) return res.status(404).json({ error: 'Not found' });
      return res.status(200).json({ post });
    }
    const posts = await prisma.blogPost.findMany({ orderBy: { createdAt: 'desc' } });
    res.status(200).json({ posts });
  } catch {
    res.status(500).json({ error: 'Failed to fetch blog posts' });
  }
}
