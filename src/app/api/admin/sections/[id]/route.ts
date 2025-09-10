import { NextRequest, NextResponse } from 'next/server';
import pool from '../../../../../../lib/database';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json();
    const { name, title, subtitle, description, image_url, background_image } = body;
    const { id } = await params;

    const connection = await pool.getConnection();
    
    try {
      await connection.execute(
        `UPDATE sections 
         SET name = ?, title = ?, subtitle = ?, description = ?, image_url = ?, background_image = ?
         WHERE id = ?`,
        [name, title, subtitle, description, image_url, background_image, id]
      );

      return NextResponse.json({ message: 'Section updated successfully' });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Update section error:', error);
    return NextResponse.json(
      { error: 'Failed to update section' },
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
      await connection.execute('DELETE FROM sections WHERE id = ?', [id]);
      
      return NextResponse.json({ message: 'Section deleted successfully' });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Delete section error:', error);
    return NextResponse.json(
      { error: 'Failed to delete section' },
      { status: 500 }
    );
  }
}
