import { NextResponse } from 'next/server';
import pool from '../../../../../lib/database';

export async function GET() {
  try {
    const connection = await pool.getConnection();
    
    try {
      // Get counts for all tables
      const [sectionsResult] = await connection.execute('SELECT COUNT(*) as count FROM sections');
      const [servicesResult] = await connection.execute('SELECT COUNT(*) as count FROM services');
      const [industriesResult] = await connection.execute('SELECT COUNT(*) as count FROM industries');
      const [officesResult] = await connection.execute('SELECT COUNT(*) as count FROM offices');
      const [brandsResult] = await connection.execute('SELECT COUNT(*) as count FROM brands');
      const [divisionsResult] = await connection.execute('SELECT COUNT(*) as count FROM divisions');
      const [blogResult] = await connection.execute('SELECT COUNT(*) as count FROM blog_posts');
      const [messagesResult] = await connection.execute('SELECT COUNT(*) as count FROM contact_messages');

      // Get recent messages
      const [recentMessages] = await connection.execute(`
        SELECT id, name, email, subject, created_at 
        FROM contact_messages 
        ORDER BY created_at DESC 
        LIMIT 5
      `);

      const stats = {
        sections: (sectionsResult as Array<{ count: number }>)[0].count,
        services: (servicesResult as Array<{ count: number }>)[0].count,
        industries: (industriesResult as Array<{ count: number }>)[0].count,
        offices: (officesResult as Array<{ count: number }>)[0].count,
        brands: (brandsResult as Array<{ count: number }>)[0].count,
        divisions: (divisionsResult as Array<{ count: number }>)[0].count,
        blogPosts: (blogResult as Array<{ count: number }>)[0].count,
        messages: (messagesResult as Array<{ count: number }>)[0].count,
      };

      return NextResponse.json({
        stats,
        recentMessages: recentMessages as Array<{ id: number; name: string; email: string; message: string; created_at: string }>
      });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Dashboard API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
}
