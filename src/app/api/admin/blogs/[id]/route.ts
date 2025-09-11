import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/database';
import { verifyToken } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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
      WHERE b.id = ?
    `, [(await params).id]);

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

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    await pool.execute(`
      UPDATE blogs SET 
        title = ?, slug = ?, content = ?, excerpt = ?, featured_image = ?,
        status = ?, meta_title = ?, meta_description = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `, [
      title, slug, content, excerpt, featured_image, status, meta_title, meta_description, (await params).id
    ]);

    return NextResponse.json({ success: true, message: 'Blog updated successfully' });
  } catch (error) {
    console.error('Update blog error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = request.cookies.get('auth-token')?.value;
    const user = token ? verifyToken(token) : null;

    if (!user || user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await pool.execute('DELETE FROM blogs WHERE id = ?', [(await params).id]);

    return NextResponse.json({ success: true, message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Delete blog error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
