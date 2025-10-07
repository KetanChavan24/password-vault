import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import VaultItem from '@/lib/models/VaultItem';
import { verifyToken } from '@/lib/auth';

// PUT update vault item
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = verifyToken(req);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { title, username, encryptedPassword, url, notes } = await req.json();

    await connectDB();
    const item = await VaultItem.findOneAndUpdate(
      { _id: params.id, userId: user.userId },
      { title, username, encryptedPassword, url, notes, updatedAt: new Date() },
      { new: true }
    );

    if (!item) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    return NextResponse.json({ item }, { status: 200 });
  } catch (error) {
    console.error('Update vault item error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE vault item
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = verifyToken(req);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const item = await VaultItem.findOneAndDelete({
      _id: params.id,
      userId: user.userId,
    });

    if (!item) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Item deleted' }, { status: 200 });
  } catch (error) {
    console.error('Delete vault item error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}