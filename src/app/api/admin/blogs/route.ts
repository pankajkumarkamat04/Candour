import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/database';
import { verifyToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value;
    const user = token ? verifyToken(token) : null;

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const [rows] = await pool.execute(`
      SELECT b.*, u.username as author_name 
      FROM blogs b 
      LEFT JOIN users u ON b.author_id = u.id 
      ORDER BY b.created_at DESC
    `);

    return NextResponse.json({ success: true, blogs: rows });
  } catch (error) {
    console.error('Get blogs error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value;
    const user = token ? verifyToken(token) : null;

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const blogData = await request.json();
    const {
      title,
      slug,
      content,
      excerpt,
      featured_image,
      status,
      meta_title,
      meta_description
    } = blogData;

    const [result] = await pool.execute(`
      INSERT INTO blogs (
        title, slug, content, excerpt, featured_image, status, author_id, meta_title, meta_description
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      title, slug, content, excerpt, featured_image, status || 'draft', user.id, meta_title, meta_description
    ]);

    const insertResult = result as { insertId: number };
    return NextResponse.json({
      success: true,
      message: 'Blog created successfully',
      blogId: insertResult.insertId
    });
  } catch (error) {
    console.error('Create blog error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
