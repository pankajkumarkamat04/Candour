import { NextRequest, NextResponse } from 'next/server';
import pool from '../../../../../../lib/database';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json();
    const { name, description, image_url, order_index, is_active } = body;
    const { id } = await params;

    const connection = await pool.getConnection();
    
    try {
      await connection.execute(
        `UPDATE industries 
         SET name = ?, description = ?, image_url = ?, order_index = ?, is_active = ?
         WHERE id = ?`,
        [name, description, image_url, order_index, is_active, id]
      );

      return NextResponse.json({ message: 'Industry updated successfully' });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Update industry error:', error);
    return NextResponse.json(
      { error: 'Failed to update industry' },
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
      await connection.execute('DELETE FROM industries WHERE id = ?', [id]);
      
      return NextResponse.json({ message: 'Industry deleted successfully' });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Delete industry error:', error);
    return NextResponse.json(
      { error: 'Failed to delete industry' },
      { status: 500 }
    );
  }
}
