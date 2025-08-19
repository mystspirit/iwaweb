import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// Protect this endpoint with a strong token in your deployment env
// Set ADMIN_MAINTENANCE_TOKEN in Netlify Environment Variables
const ADMIN_TOKEN = process.env.ADMIN_MAINTENANCE_TOKEN;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Simple auth via header or query param
    const provided = (req.headers['x-maintenance-token'] || req.query.token) as string | undefined;
    if (!ADMIN_TOKEN || !provided || provided !== ADMIN_TOKEN) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { email, password } = req.body as { email?: string; password?: string };
    if (!email || !password) {
      return res.status(400).json({ error: 'email and password are required' });
    }

    if (typeof email !== 'string' || typeof password !== 'string') {
      return res.status(400).json({ error: 'invalid payload' });
    }

    const hash = await bcrypt.hash(password, 10);

    const result = await prisma.admin.upsert({
      where: { email },
      update: { passwordHash: hash },
      create: { email, passwordHash: hash },
      select: { id: true, email: true },
    });

    return res.status(200).json({ ok: true, admin: result });
  } catch (err) {
    // Do not leak internals
    return res.status(500).json({ error: 'internal_error' });
  } finally {
    await prisma.$disconnect();
  }
}
