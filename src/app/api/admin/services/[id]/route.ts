import { NextRequest, NextResponse } from 'next/server';
import pool from '../../../../../../lib/database';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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
    const { id } = await params;

    const connection = await pool.getConnection();
    
    try {
      await connection.execute(
        `UPDATE services 
         SET section_id = ?, title = ?, description = ?, icon = ?, image_url = ?, 
             price = ?, features = ?, order_index = ?, is_active = ?
         WHERE id = ?`,
        [section_id, title, description, icon, image_url, price, features, order_index, is_active, id]
      );

      return NextResponse.json({ message: 'Service updated successfully' });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Update service error:', error);
    return NextResponse.json(
      { error: 'Failed to update service' },
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
      await connection.execute('DELETE FROM services WHERE id = ?', [id]);
      
      return NextResponse.json({ message: 'Service deleted successfully' });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Delete service error:', error);
    return NextResponse.json(
      { error: 'Failed to delete service' },
      { status: 500 }
    );
  }
}
