import { NextResponse } from 'next/server';
import pool from '../../../../../lib/database';

export async function GET() {
  try {
    const connection = await pool.getConnection();
    
    try {
      const [rows] = await connection.execute(`
        SELECT * FROM contact_messages 
        ORDER BY created_at DESC
      `);
      
      return NextResponse.json(rows);
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Messages API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}
