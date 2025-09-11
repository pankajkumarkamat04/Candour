import { NextResponse } from 'next/server';
import pool from '@/lib/database';

export async function GET() {
  try {
    const [rows] = await pool.execute('SELECT * FROM settings ORDER BY id DESC LIMIT 1');
    const settings = (rows as { [key: string]: unknown }[])[0] || {};

    return NextResponse.json({ success: true, settings });
  } catch (error) {
    console.error('Get settings error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
