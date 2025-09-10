import { NextRequest, NextResponse } from 'next/server';
import pool from '../../../../../lib/database';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  try {
    const { name: sectionName } = await params;
    const connection = await pool.getConnection();
    
    try {
      const [rows] = await connection.execute(
        'SELECT * FROM sections WHERE name = ?',
        [sectionName]
      );
      
      const sections = rows as Array<{ id: number; name: string; title: string; content: string; image_url: string; created_at: string; updated_at: string }>;
      if (sections.length === 0) {
        return NextResponse.json(
          { error: 'Section not found' },
          { status: 404 }
        );
      }

      return NextResponse.json(sections[0]);
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Section API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch section' },
      { status: 500 }
    );
  }
}
