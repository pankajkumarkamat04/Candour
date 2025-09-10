import { NextRequest, NextResponse } from 'next/server';
import pool from '../../../../../lib/database';

export async function GET() {
  try {
    const connection = await pool.getConnection();
    
    try {
      const [rows] = await connection.execute(`
        SELECT * FROM blog_posts 
        ORDER BY created_at DESC
      `);
      
      return NextResponse.json(rows);
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Blog API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, slug, excerpt, content, featured_image, author, is_published } = body;

    const connection = await pool.getConnection();
    
    try {
      const [result] = await connection.execute(
        `INSERT INTO blog_posts (title, slug, excerpt, content, featured_image, author, is_published) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [title, slug, excerpt, content, featured_image, author, is_published]
      );

      return NextResponse.json({ 
        id: (result as any).insertId,
        message: 'Blog post created successfully' 
      });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Create blog post error:', error);
    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    );
  }
}
