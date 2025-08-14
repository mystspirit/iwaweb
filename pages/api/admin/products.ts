import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const products = await prisma.product.findMany({ orderBy: { createdAt: 'desc' } });
    res.status(200).json({ products });
  } catch {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
}
