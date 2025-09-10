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
        `UPDATE divisions 
         SET name = ?, description = ?, image_url = ?, order_index = ?, is_active = ?
         WHERE id = ?`,
        [name, description, image_url, order_index, is_active, id]
      );

      return NextResponse.json({ message: 'Division updated successfully' });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Update division error:', error);
    return NextResponse.json(
      { error: 'Failed to update division' },
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
      await connection.execute('DELETE FROM divisions WHERE id = ?', [id]);
      
      return NextResponse.json({ message: 'Division deleted successfully' });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Delete division error:', error);
    return NextResponse.json(
      { error: 'Failed to delete division' },
      { status: 500 }
    );
  }
}
