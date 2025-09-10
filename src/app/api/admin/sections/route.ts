import { NextRequest, NextResponse } from 'next/server';
import pool from '../../../../../lib/database';

export async function GET() {
  try {
    const connection = await pool.getConnection();
    
    try {
      const [rows] = await connection.execute(`
        SELECT * FROM sections 
        ORDER BY created_at DESC
      `);
      
      return NextResponse.json(rows);
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Sections API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch sections' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, title, subtitle, description, image_url, background_image } = body;

    const connection = await pool.getConnection();
    
    try {
      const [result] = await connection.execute(
        `INSERT INTO sections (name, title, subtitle, description, image_url, background_image) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [name, title, subtitle, description, image_url, background_image]
      );

      return NextResponse.json({ 
        id: (result as any).insertId,
        message: 'Section created successfully' 
      });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Create section error:', error);
    return NextResponse.json(
      { error: 'Failed to create section' },
      { status: 500 }
    );
  }
}
