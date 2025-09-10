import { NextRequest, NextResponse } from 'next/server';
import pool from '../../../../../../lib/database';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json();
    const { title, slug, excerpt, content, featured_image, author, is_published } = body;
    const { id } = await params;

    const connection = await pool.getConnection();
    
    try {
      await connection.execute(
        `UPDATE blog_posts 
         SET title = ?, slug = ?, excerpt = ?, content = ?, featured_image = ?, author = ?, is_published = ?
         WHERE id = ?`,
        [title, slug, excerpt, content, featured_image, author, is_published, id]
      );

      return NextResponse.json({ message: 'Blog post updated successfully' });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Update blog post error:', error);
    return NextResponse.json(
      { error: 'Failed to update blog post' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const connection = await pool.getConnection();
    
    try {
      await connection.execute('DELETE FROM blog_posts WHERE id = ?', [id]);
      
      return NextResponse.json({ message: 'Blog post deleted successfully' });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Delete blog post error:', error);
    return NextResponse.json(
      { error: 'Failed to delete blog post' },
      { status: 500 }
    );
  }
}
