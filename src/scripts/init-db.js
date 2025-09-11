const mysql = require('mysql2/promise');
require('dotenv').config({ path: '.env.local' });

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'candour_admin',
  port: parseInt(process.env.DB_PORT || '3306'),
};

async function initializeDatabase() {
  let connection;
  
  try {
    // Connect to MySQL server
    connection = await mysql.createConnection(dbConfig);
    console.log('Connected to MySQL server');

    // Create database if it doesn't exist
    const dbName = process.env.DB_NAME || 'candour_admin';
    await connection.execute(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
    console.log(`Database '${dbName}' created or already exists`);

    // Close current connection and reconnect with database
    await connection.end();
    connection = await mysql.createConnection({
      ...dbConfig,
      database: dbName
    });

    // Create tables
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role ENUM('admin', 'editor') DEFAULT 'editor',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('Users table created');

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS settings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        site_name VARCHAR(100) NOT NULL DEFAULT 'Candour International',
        site_description TEXT,
        logo_url VARCHAR(255),
        favicon_url VARCHAR(255),
        contact_email VARCHAR(100),
        contact_phone VARCHAR(20),
th         whatsapp_number VARCHAR(20),
        contact_address TEXT,
        social_facebook VARCHAR(255),
        social_twitter VARCHAR(255),
        social_linkedin VARCHAR(255),
        social_instagram VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('Settings table created');

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS blogs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        content LONGTEXT NOT NULL,
        excerpt TEXT,
        featured_image VARCHAR(255),
        status ENUM('draft', 'published') DEFAULT 'draft',
        author_id INT,
        author_name VARCHAR(100),
        category VARCHAR(100),
        meta_title VARCHAR(255),
        meta_description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL
      )
    `);
    console.log('Blogs table created');

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS quote_requests (
        id INT AUTO_INCREMENT PRIMARY KEY,
        full_name VARCHAR(100) NOT NULL,
        company VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        project_type VARCHAR(100),
        description TEXT,
        status ENUM('new', 'contacted', 'quoted', 'closed') DEFAULT 'new',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('Quote requests table created');

    // Insert default admin user if no users exist
    const [users] = await connection.execute('SELECT COUNT(*) as count FROM users');
    if (users[0].count === 0) {
      const bcrypt = require('bcryptjs');
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await connection.execute(
        'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
        ['admin', 'admin@candour.com', hashedPassword, 'admin']
      );
      console.log('Default admin user created (username: admin, password: admin123)');
    }

    // Insert default settings if no settings exist
    const [settings] = await connection.execute('SELECT COUNT(*) as count FROM settings');
    if (settings[0].count === 0) {
      await connection.execute(`
        INSERT INTO settings (site_name, site_description, contact_email, contact_phone, contact_address) 
        VALUES (?, ?, ?, ?, ?)
      `, [
        'Candour International',
        'Leading Industrial MRO Solutions',
        'info@candour.com',
        '+1-555-0123',
        '123 Industrial Ave, Manufacturing City, MC 12345'
      ]);
      console.log('Default settings created');
    }

    console.log('Database initialization completed successfully!');
    
  } catch (error) {
    console.error('Database initialization error:', error);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Run the initialization
initializeDatabase();
