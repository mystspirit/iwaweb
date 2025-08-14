import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ error: 'Missing blog post ID' });
  }
  try {
    await prisma.blogPost.delete({ where: { id } });
    res.status(200).json({ success: true });
  } catch {
    res.status(500).json({ error: 'Failed to delete blog post' });
  }
}
