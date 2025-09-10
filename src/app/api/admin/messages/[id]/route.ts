import { NextRequest, NextResponse } from 'next/server';
import pool from '../../../../../../lib/database';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json();
    const { status } = body;
    const { id } = await params;

    const connection = await pool.getConnection();
    
    try {
      await connection.execute(
        `UPDATE contact_messages 
         SET status = ?
         WHERE id = ?`,
        [status, id]
      );

      return NextResponse.json({ message: 'Message status updated successfully' });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Update message error:', error);
    return NextResponse.json(
      { error: 'Failed to update message' },
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
      await connection.execute('DELETE FROM contact_messages WHERE id = ?', [id]);
      
      return NextResponse.json({ message: 'Message deleted successfully' });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Delete message error:', error);
    return NextResponse.json(
      { error: 'Failed to delete message' },
      { status: 500 }
    );
  }
}
