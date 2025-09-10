import { NextRequest, NextResponse } from 'next/server';
import pool from '../../../../../../lib/database';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json();
    const { name, address, phone, email, map_url, image_url, order_index, is_active } = body;
    const { id } = await params;

    const connection = await pool.getConnection();
    
    try {
      await connection.execute(
        `UPDATE offices 
         SET name = ?, address = ?, phone = ?, email = ?, map_url = ?, image_url = ?, order_index = ?, is_active = ?
         WHERE id = ?`,
        [name, address, phone, email, map_url, image_url, order_index, is_active, id]
      );

      return NextResponse.json({ message: 'Office updated successfully' });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Update office error:', error);
    return NextResponse.json(
      { error: 'Failed to update office' },
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
      await connection.execute('DELETE FROM offices WHERE id = ?', [id]);
      
      return NextResponse.json({ message: 'Office deleted successfully' });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Delete office error:', error);
    return NextResponse.json(
      { error: 'Failed to delete office' },
      { status: 500 }
    );
  }
}
