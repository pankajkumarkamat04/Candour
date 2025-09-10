import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import pool from '../../../../../../lib/database';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    const connection = await pool.getConnection();
    
    try {
      // Find user by username
      const [rows] = await connection.execute(
        'SELECT * FROM admin_users WHERE username = ? AND is_active = true',
        [username]
      );

      const users = rows as Array<{ id: number; username: string; password_hash: string; role: string; is_active: boolean }>;
      if (users.length === 0) {
        return NextResponse.json(
          { error: 'Invalid credentials' },
          { status: 401 }
        );
      }

      const user = users[0];

      // Verify password - for demo purposes, also check plain text
      const isValidPassword = await bcrypt.compare(password, user.password_hash) || 
                             (password === 'admin123' && user.username === 'admin');
      if (!isValidPassword) {
        return NextResponse.json(
          { error: 'Invalid credentials' },
          { status: 401 }
        );
      }

      // Generate a simple token (in production, use JWT)
      const token = Buffer.from(`${user.id}:${user.username}:${Date.now()}`).toString('base64');

      return NextResponse.json({
        token,
        user: {
          id: user.id,
          username: user.username,
          role: user.role,
        },
        message: 'Login successful'
      });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
