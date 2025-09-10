import { NextRequest, NextResponse } from 'next/server';
import pool from '../../../../../lib/database';

export async function GET() {
  try {
    const connection = await pool.getConnection();
    
    try {
      const [rows] = await connection.execute(`
        SELECT * FROM offices 
        ORDER BY order_index ASC, created_at DESC
      `);
      
      return NextResponse.json(rows);
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Offices API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch offices' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, address, phone, email, map_url, image_url, order_index, is_active } = body;

    const connection = await pool.getConnection();
    
    try {
      const [result] = await connection.execute(
        `INSERT INTO offices (name, address, phone, email, map_url, image_url, order_index, is_active) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [name, address, phone, email, map_url, image_url, order_index, is_active]
      );

      return NextResponse.json({ 
        id: (result as any).insertId,
        message: 'Office created successfully' 
      });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Create office error:', error);
    return NextResponse.json(
      { error: 'Failed to create office' },
      { status: 500 }
    );
  }
}
