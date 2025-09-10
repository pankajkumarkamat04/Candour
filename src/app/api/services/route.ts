import { NextRequest, NextResponse } from 'next/server';
import pool from '../../../../lib/database';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sectionId = searchParams.get('section_id');
    const activeOnly = searchParams.get('active_only') === 'true';

    const connection = await pool.getConnection();
    
    try {
      let query = `
        SELECT s.*, sec.name as section_name, sec.title as section_title
        FROM services s
        LEFT JOIN sections sec ON s.section_id = sec.id
      `;
      
      const conditions = [];
      const params = [];

      if (sectionId) {
        conditions.push('s.section_id = ?');
        params.push(sectionId);
      }

      if (activeOnly) {
        conditions.push('s.is_active = true');
      }

      if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ');
      }

      query += ' ORDER BY s.order_index ASC, s.created_at DESC';

      const [rows] = await connection.execute(query, params);
      
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
