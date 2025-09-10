import { NextRequest, NextResponse } from 'next/server';
import pool from '../../../../../lib/database';

export async function GET() {
  try {
    const connection = await pool.getConnection();
    
    try {
      const [rows] = await connection.execute(`
        SELECT * FROM industries 
        ORDER BY order_index ASC, created_at DESC
      `);
      
      return NextResponse.json(rows);
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Industries API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch industries' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, image_url, order_index, is_active } = body;

    const connection = await pool.getConnection();
    
    try {
      const [result] = await connection.execute(
        `INSERT INTO industries (name, description, image_url, order_index, is_active) 
         VALUES (?, ?, ?, ?, ?)`,
        [name, description, image_url, order_index, is_active]
      );

      return NextResponse.json({ 
        id: (result as any).insertId,
        message: 'Industry created successfully' 
      });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Create industry error:', error);
    return NextResponse.json(
      { error: 'Failed to create industry' },
      { status: 500 }
    );
  }
}
