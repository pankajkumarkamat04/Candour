# Admin Panel Setup Guide

This guide will help you set up the admin panel for the Candour International website.

## Prerequisites

1. **MySQL Database**: Make sure you have MySQL installed and running on your system.
2. **Node.js**: Ensure you have Node.js installed (version 18 or higher).

## Database Setup

1. **Create MySQL Database**:
   ```sql
   CREATE DATABASE candour_admin;
   ```

2. **Configure Environment Variables**:
   Create a `.env.local` file in the root directory with the following content:
   ```env
   # Database Configuration
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=candour_admin
   DB_PORT=3306

   # JWT Secret
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

   # NextAuth Configuration
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-nextauth-secret-key-change-this-in-production
   ```

3. **Initialize Database**:
   ```bash
   npm run init-db
   ```

## Installation

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```

## Admin Panel Access

1. **Access the Admin Panel**:
   - Navigate to `http://localhost:3000/admin`
   - You will be redirected to the login page

2. **Default Admin Credentials**:
   - Username: `admin`
   - Password: `admin123`

   **Important**: Change these credentials immediately after first login!

## Admin Panel Features

### 1. Dashboard
- Overview of blog posts, users, and site statistics
- Quick access to all admin functions

### 2. Blog Management
- Create, edit, and delete blog posts
- Rich text editor with TinyMCE
- SEO settings (meta title, description)
- Featured image support
- Draft/Published status management

### 3. Settings Management
- Site name and description
- Logo and favicon URLs
- Contact information (email, phone, address)
- Social media links
- All settings are automatically applied to the frontend

### 4. User Management (Admin Only)
- Create and manage admin users
- Assign roles (admin/editor)
- Delete users

## Frontend Integration

The admin panel is fully integrated with the frontend:

- **Blog Posts**: All published blog posts from the admin panel appear on the frontend blog page
- **Settings**: Site settings (logo, name, contact info) are automatically applied to the frontend
- **Dynamic Content**: The frontend fetches content from the database in real-time

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/logout` - Admin logout
- `GET /api/auth/me` - Get current user info

### Admin APIs (Protected)
- `GET /api/admin/settings` - Get site settings
- `PUT /api/admin/settings` - Update site settings
- `GET /api/admin/blogs` - Get all blog posts
- `POST /api/admin/blogs` - Create new blog post
- `GET /api/admin/blogs/[id]` - Get specific blog post
- `PUT /api/admin/blogs/[id]` - Update blog post
- `DELETE /api/admin/blogs/[id]` - Delete blog post
- `GET /api/admin/users` - Get all users
- `POST /api/admin/users` - Create new user
- `DELETE /api/admin/users/[id]` - Delete user

### Public APIs
- `GET /api/settings` - Get public site settings
- `GET /api/blogs` - Get published blog posts
- `GET /api/blogs/[slug]` - Get specific published blog post

## Security Features

- JWT-based authentication
- HTTP-only cookies for token storage
- Role-based access control
- Password hashing with bcrypt
- Input validation with Zod schemas

## File Structure

```
src/
├── app/
│   ├── admin/                 # Admin panel pages
│   │   ├── layout.tsx        # Admin layout with sidebar
│   │   ├── login/page.tsx    # Login page
│   │   ├── page.tsx          # Dashboard
│   │   ├── blogs/            # Blog management
│   │   ├── settings/page.tsx # Settings management
│   │   └── users/page.tsx    # User management
│   ├── api/                  # API routes
│   │   ├── auth/             # Authentication APIs
│   │   ├── admin/            # Admin APIs
│   │   ├── blogs/            # Public blog APIs
│   │   └── settings/         # Public settings API
│   └── blog/                 # Frontend blog pages
├── components/
│   └── BlogEditor.tsx        # Rich text editor component
├── lib/
│   ├── auth.ts               # Authentication utilities
│   └── database.ts           # Database connection
└── scripts/
    └── init-db.js            # Database initialization script
```

## Troubleshooting

### Database Connection Issues
- Verify MySQL is running
- Check database credentials in `.env.local`
- Ensure the database exists

### Admin Panel Not Loading
- Check if all dependencies are installed
- Verify environment variables are set
- Check browser console for errors

### Blog Posts Not Showing
- Ensure blog posts are published (not draft)
- Check database connection
- Verify API endpoints are working

## Production Deployment

1. **Environment Variables**: Set production environment variables
2. **Database**: Use a production MySQL database
3. **Security**: Change default admin credentials
4. **HTTPS**: Ensure SSL certificates are configured
5. **Build**: Run `npm run build` before deployment

## Support

For technical support or questions about the admin panel, please contact the development team.
