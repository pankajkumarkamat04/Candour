import { NextResponse } from 'next/server';
import pool from '@/lib/database';

export async function GET() {
  try {
    const [rows] = await pool.execute(`
      SELECT * FROM quote_requests 
      ORDER BY created_at DESC
    `);
    
    return NextResponse.json({ 
      success: true, 
      quotes: rows 
    });
  } catch (error) {
    console.error('Get quotes error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
