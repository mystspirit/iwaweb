import type { Handler } from '@netlify/functions';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const ADMIN_TOKEN = process.env.ADMIN_MAINTENANCE_TOKEN;
    const provided = (event.headers['x-maintenance-token'] || event.queryStringParameters?.token) as string | undefined;
    if (!ADMIN_TOKEN || !provided || provided !== ADMIN_TOKEN) {
      return { statusCode: 401, body: JSON.stringify({ error: 'Unauthorized' }) };
    }

    if (!event.body) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Missing body' }) };
    }

    const { email, password } = JSON.parse(event.body) as { email?: string; password?: string };
    if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
      return { statusCode: 400, body: JSON.stringify({ error: 'email and password are required' }) };
    }

    const hash = await bcrypt.hash(password, 10);

    const admin = await prisma.admin.upsert({
      where: { email },
      update: { passwordHash: hash },
      create: { email, passwordHash: hash },
      select: { id: true, email: true },
    });

    return { statusCode: 200, body: JSON.stringify({ ok: true, admin }) };
  } catch (e) {
    console.error('admin-upsert error', e);
    return { statusCode: 500, body: JSON.stringify({ error: 'internal_error' }) };
  } finally {
    await prisma.$disconnect();
  }
};
