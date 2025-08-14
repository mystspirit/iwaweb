import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { id, title, content, published, author } = req.body;
  if (!id) {
    return res.status(400).json({ error: 'Missing blog post ID' });
  }
  try {
    const updated = await prisma.blogPost.update({
      where: { id },
      data: { title, content, published, author },
    });
    res.status(200).json({ post: updated });
  } catch {
    res.status(500).json({ error: 'Failed to update blog post' });
  }
}
