import { NextResponse } from 'next/server';
import pool from '@/lib/database';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, company, email, phone, projectType, description } = body;

    // Validate required fields
    if (!fullName || !company || !email || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Insert quote request into database
    const [result] = await pool.execute(
      'INSERT INTO quote_requests (full_name, company, email, phone, project_type, description, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())',
      [fullName, company, email, phone, projectType || null, description || null]
    );

    // Here you would typically send an email notification
    // For now, we'll just log the request
    console.log('New quote request:', {
      id: (result as { insertId: number }).insertId,
      fullName,
      company,
      email,
      phone,
      projectType,
      description
    });

    return NextResponse.json({
      success: true,
      message: 'Quote request submitted successfully',
      id: (result as { insertId: number }).insertId
    });
  } catch (error) {
    console.error('Quote submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
