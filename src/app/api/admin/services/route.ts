import { NextRequest, NextResponse } from 'next/server';
import pool from '../../../../../lib/database';

export async function GET() {
  try {
    const connection = await pool.getConnection();
    
    try {
      const [rows] = await connection.execute(`
        SELECT s.*, sec.name as section_name, sec.title as section_title
        FROM services s
        LEFT JOIN sections sec ON s.section_id = sec.id
        ORDER BY s.order_index ASC, s.created_at DESC
      `);
      
      return NextResponse.json(rows);
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Services API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      section_id, 
      title, 
      description, 
      icon, 
      image_url, 
      price, 
      features, 
      order_index, 
      is_active 
    } = body;

    const connection = await pool.getConnection();
    
    try {
      const [result] = await connection.execute(
        `INSERT INTO services (section_id, title, description, icon, image_url, price, features, order_index, is_active) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [section_id, title, description, icon, image_url, price, features, order_index, is_active]
      );

      return NextResponse.json({ 
        id: (result as any).insertId,
        message: 'Service created successfully' 
      });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Create service error:', error);
    return NextResponse.json(
      { error: 'Failed to create service' },
      { status: 500 }
    );
  }
}
