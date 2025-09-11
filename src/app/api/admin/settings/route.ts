import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/database';
import { verifyToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value;
    const user = token ? verifyToken(token) : null;

    if (!user || user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const [rows] = await pool.execute('SELECT * FROM settings ORDER BY id DESC LIMIT 1');
    const settings = (rows as { [key: string]: unknown }[])[0] || {};

    return NextResponse.json({ success: true, settings });
  } catch (error) {
    console.error('Get settings error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value;
    const user = token ? verifyToken(token) : null;

    if (!user || user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const settingsData = await request.json();
    
    const {
      site_name,
      site_description,
      logo_url,
      favicon_url,
      contact_email,
      contact_phone,
      whatsapp_number,
      contact_address,
      social_facebook,
      social_twitter,
      social_linkedin,
      social_instagram
    } = settingsData;

    // Check if settings exist
    const [existingSettings] = await pool.execute('SELECT id FROM settings ORDER BY id DESC LIMIT 1');
    
    if ((existingSettings as { [key: string]: unknown }[]).length > 0) {
      // Update existing settings
      await pool.execute(`
        UPDATE settings SET 
          site_name = ?, site_description = ?, logo_url = ?, favicon_url = ?,
          contact_email = ?, contact_phone = ?, whatsapp_number = ?, contact_address = ?,
          social_facebook = ?, social_twitter = ?, social_linkedin = ?, social_instagram = ?,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = (SELECT id FROM (SELECT id FROM settings ORDER BY id DESC LIMIT 1) as temp)
      `, [
        site_name, site_description, logo_url, favicon_url,
        contact_email, contact_phone, whatsapp_number, contact_address,
        social_facebook, social_twitter, social_linkedin, social_instagram
      ]);
    } else {
      // Create new settings
      await pool.execute(`
        INSERT INTO settings (
          site_name, site_description, logo_url, favicon_url,
          contact_email, contact_phone, whatsapp_number, contact_address,
          social_facebook, social_twitter, social_linkedin, social_instagram
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        site_name, site_description, logo_url, favicon_url,
        contact_email, contact_phone, whatsapp_number, contact_address,
        social_facebook, social_twitter, social_linkedin, social_instagram
      ]);
    }

    return NextResponse.json({ success: true, message: 'Settings updated successfully' });
  } catch (error) {
    console.error('Update settings error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
