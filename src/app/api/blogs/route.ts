import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'published';
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');

    const [rows] = await pool.execute(`
      SELECT b.*, u.username as author_name 
      FROM blogs b 
      LEFT JOIN users u ON b.author_id = u.id 
      WHERE b.status = ?
      ORDER BY b.created_at DESC
      LIMIT ? OFFSET ?
    `, [status, limit, offset]);

    return NextResponse.json({ success: true, blogs: rows });
  } catch (error) {
    console.error('Get blogs error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
