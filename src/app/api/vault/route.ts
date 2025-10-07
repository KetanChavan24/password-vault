import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import VaultItem from '@/lib/models/VaultItem';
import { verifyToken } from '@/lib/auth';

// GET all vault items
export async function GET(req: NextRequest) {
  try {
    const user = verifyToken(req);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const items = await VaultItem.find({ userId: user.userId }).sort({ createdAt: -1 });

    return NextResponse.json({ items }, { status: 200 });
  } catch (error) {
    console.error('Get vault items error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST create vault item
export async function POST(req: NextRequest) {
  try {
    const user = verifyToken(req);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { title, username, encryptedPassword, url, notes } = await req.json();

    await connectDB();
    const item = await VaultItem.create({
      userId: user.userId,
      title,
      username,
      encryptedPassword,
      url,
      notes,
    });

    return NextResponse.json({ item }, { status: 201 });
  } catch (error) {
    console.error('Create vault item error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}