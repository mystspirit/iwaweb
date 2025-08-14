import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { id, title, description, type, size, price, imageUrl } = req.body;
  if (!id) {
    return res.status(400).json({ error: 'Missing product ID' });
  }
  try {
    const updated = await prisma.product.update({
      where: { id },
      data: { title, description, type, size, price: price ? Number(price) : undefined, imageUrl },
    });
    res.status(200).json({ product: updated });
  } catch {
    res.status(500).json({ error: 'Failed to update product' });
  }
}
