import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { verifyToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const token = request.cookies.get('auth-token')?.value;
    const user = token ? verifyToken(token) : null;

    if (!user || user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;
    const type: string | null = data.get('type') as string; // 'logo', 'favicon', 'blog'

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    if (!type || !['logo', 'favicon', 'blog'].includes(type)) {
      return NextResponse.json(
        { error: 'Invalid type. Must be logo, favicon, or blog' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPEG, PNG, GIF, WebP, and SVG are allowed.' },
        { status: 400 }
      );
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 5MB.' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique filename
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 8);
    const extension = file.name.split('.').pop();
    const filename = `${timestamp}_${randomString}.${extension}`;

    // Determine upload directory based on type
    let uploadDir: string;
    switch (type) {
      case 'logo':
        uploadDir = 'public/images/branding';
        break;
      case 'favicon':
        uploadDir = 'public/images/branding';
        break;
      case 'blog':
        uploadDir = 'public/images/content';
        break;
      default:
        uploadDir = 'public/images/content';
    }

    // Ensure directory exists
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch {
      // Directory might already exist, ignore error
    }

    // Save file
    const path = join(process.cwd(), uploadDir, filename);
    await writeFile(path, buffer);

    // Return the public URL based on type
    let publicUrl: string;
    switch (type) {
      case 'logo':
      case 'favicon':
        publicUrl = `/images/branding/${filename}`;
        break;
      case 'blog':
        publicUrl = `/images/content/${filename}`;
        break;
      default:
        publicUrl = `/images/content/${filename}`;
    }

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename: filename,
      type: type,
      size: file.size
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handle DELETE request to remove uploaded files
export async function DELETE(request: NextRequest) {
  try {
    // Check authentication
    const token = request.cookies.get('auth-token')?.value;
    const user = token ? verifyToken(token) : null;

    if (!user || user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename');
    const type = searchParams.get('type');

    if (!filename || !type) {
      return NextResponse.json(
        { error: 'Filename and type are required' },
        { status: 400 }
      );
    }

    // Determine file path
    let uploadDir: string;
    switch (type) {
      case 'logo':
      case 'favicon':
        uploadDir = 'public/images/branding';
        break;
      case 'blog':
        uploadDir = 'public/images/content';
        break;
      default:
        return NextResponse.json(
          { error: 'Invalid type' },
          { status: 400 }
        );
    }

    const path = join(process.cwd(), uploadDir, filename);
    
    // Check if file exists and delete it
    const { unlink } = await import('fs/promises');
    try {
      await unlink(path);
      return NextResponse.json({
        success: true,
        message: 'File deleted successfully'
      });
    } catch {
      return NextResponse.json(
        { error: 'File not found or could not be deleted' },
        { status: 404 }
      );
    }

  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
