import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { title, content, published, author } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    const post = await prisma.blogPost.create({
      data: {
        title,
        content,
        published: !!published,
        author,
      },
    });
    res.status(200).json({ post });
  } catch {
    res.status(500).json({ error: 'Failed to create blog post' });
  }
}
