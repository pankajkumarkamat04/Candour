import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from './database';

export interface User {
  id: number;
  username: string;
  email: string;
  role: 'admin' | 'editor';
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export async function authenticateUser(credentials: LoginCredentials): Promise<User | null> {
  try {
    const [rows] = await pool.execute(
      'SELECT id, username, email, password, role FROM users WHERE username = ? OR email = ?',
      [credentials.username, credentials.username]
    );

    const users = rows as { [key: string]: unknown }[];
    if (users.length === 0) {
      return null;
    }

    const user = users[0];
    const isValidPassword = await bcrypt.compare(credentials.password, String(user.password));

    if (!isValidPassword) {
      return null;
    }

    return {
      id: Number(user.id),
      username: String(user.username),
      email: String(user.email),
      role: String(user.role) as 'admin' | 'editor'
    };
  } catch (error) {
    console.error('Authentication error:', error);
    return null;
  }
}

export function generateToken(user: User): string {
  return jwt.sign(
    { 
      id: user.id, 
      username: user.username, 
      email: user.email, 
      role: user.role 
    },
    process.env.JWT_SECRET || 'fallback-secret',
    { expiresIn: '7d' }
  );
}

export function verifyToken(token: string): User | null {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as { id: number; username: string; email: string; role: string };
    return {
      id: decoded.id,
      username: decoded.username,
      email: decoded.email,
      role: decoded.role as 'admin' | 'editor'
    };
  } catch {
    return null;
  }
}

export async function createUser(userData: {
  username: string;
  email: string;
  password: string;
  role?: 'admin' | 'editor';
}): Promise<User | null> {
  try {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const [result] = await pool.execute(
      'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
      [userData.username, userData.email, hashedPassword, userData.role || 'editor']
    );

    const insertResult = result as { insertId: number };
    return {
      id: insertResult.insertId,
      username: userData.username,
      email: userData.email,
      role: userData.role || 'editor'
    };
  } catch (error) {
    console.error('User creation error:', error);
    return null;
  }
}

export async function getAllUsers(): Promise<User[]> {
  try {
    const [rows] = await pool.execute(
      'SELECT id, username, email, role, created_at FROM users ORDER BY created_at DESC'
    );
    return rows as User[];
  } catch (error) {
    console.error('Get users error:', error);
    return [];
  }
}

export async function deleteUser(userId: number): Promise<boolean> {
  try {
    await pool.execute('DELETE FROM users WHERE id = ?', [userId]);
    return true;
  } catch (error) {
    console.error('Delete user error:', error);
    return false;
  }
}
