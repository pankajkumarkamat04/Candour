import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/database';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const [rows] = await pool.execute(`
      SELECT b.*, u.username as author_name 
      FROM blogs b 
      LEFT JOIN users u ON b.author_id = u.id 
      WHERE b.slug = ? AND b.status = 'published'
    `, [(await params).slug]);

    const blogs = rows as { [key: string]: unknown }[];
    if (blogs.length === 0) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, blog: blogs[0] });
  } catch (error) {
    console.error('Get blog error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
