import { NextRequest, NextResponse } from 'next/server';
import pool from '../../../../../lib/database';

export async function GET() {
  try {
    const connection = await pool.getConnection();
    
    try {
      const [rows] = await connection.execute(`
        SELECT * FROM brands 
        ORDER BY order_index ASC, created_at DESC
      `);
      
      return NextResponse.json(rows);
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Brands API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch brands' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, logo_url, description, website_url, order_index, is_active } = body;

    const connection = await pool.getConnection();
    
    try {
      const [result] = await connection.execute(
        `INSERT INTO brands (name, logo_url, description, website_url, order_index, is_active) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [name, logo_url, description, website_url, order_index, is_active]
      );

      return NextResponse.json({ 
        id: (result as any).insertId,
        message: 'Brand created successfully' 
      });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Create brand error:', error);
    return NextResponse.json(
      { error: 'Failed to create brand' },
      { status: 500 }
    );
  }
}
