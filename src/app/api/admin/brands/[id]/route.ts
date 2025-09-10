import { NextRequest, NextResponse } from 'next/server';
import pool from '../../../../../../lib/database';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json();
    const { name, logo_url, description, website_url, order_index, is_active } = body;
    const { id } = await params;

    const connection = await pool.getConnection();
    
    try {
      await connection.execute(
        `UPDATE brands 
         SET name = ?, logo_url = ?, description = ?, website_url = ?, order_index = ?, is_active = ?
         WHERE id = ?`,
        [name, logo_url, description, website_url, order_index, is_active, id]
      );

      return NextResponse.json({ message: 'Brand updated successfully' });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Update brand error:', error);
    return NextResponse.json(
      { error: 'Failed to update brand' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const connection = await pool.getConnection();
    
    try {
      await connection.execute('DELETE FROM brands WHERE id = ?', [id]);
      
      return NextResponse.json({ message: 'Brand deleted successfully' });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Delete brand error:', error);
    return NextResponse.json(
      { error: 'Failed to delete brand' },
      { status: 500 }
    );
  }
}
