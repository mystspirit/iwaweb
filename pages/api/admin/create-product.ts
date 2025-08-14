import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { title, description, imageUrl, type, size, price } = req.body;
  if (!title || !imageUrl || !type || !size || !price) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    const product = await prisma.product.create({
      data: {
        title,
        description,
        imageUrl,
        type,
        size,
        price: Number(price),
      },
    });
    res.status(200).json({ product });
  } catch {
    res.status(500).json({ error: 'Failed to create product' });
  }
}
