const mysql = require('mysql2/promise');
require('dotenv').config({ path: '.env.local' });

const dbConfig = {
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  port: parseInt(process.env.DB_PORT || '3306'),
};

async function initializeDatabase() {
  let connection;
  
  try {
    // Connect to MySQL server (without database)
    connection = await mysql.createConnection(dbConfig);
    
    // Create database if it doesn't exist
    const dbName = process.env.DB_NAME || 'candour_cms';
    await connection.execute(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
    console.log(`Database '${dbName}' created or already exists`);
    
    // Connect to the specific database
    await connection.end();
    connection = await mysql.createConnection({
      ...dbConfig,
      database: dbName,
    });
    
    // Create tables
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS sections (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL UNIQUE,
        title VARCHAR(255),
        subtitle TEXT,
        description TEXT,
        image_url VARCHAR(500),
        background_image VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS services (
        id INT AUTO_INCREMENT PRIMARY KEY,
        section_id INT,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        icon VARCHAR(100),
        image_url VARCHAR(500),
        price VARCHAR(50),
        features JSON,
        order_index INT DEFAULT 0,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (section_id) REFERENCES sections(id) ON DELETE CASCADE
      )
    `);

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS industries (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        image_url VARCHAR(500),
        order_index INT DEFAULT 0,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS offices (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        address TEXT,
        phone VARCHAR(50),
        email VARCHAR(100),
        map_url VARCHAR(500),
        image_url VARCHAR(500),
        order_index INT DEFAULT 0,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS brands (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        logo_url VARCHAR(500),
        description TEXT,
        website_url VARCHAR(500),
        order_index INT DEFAULT 0,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS divisions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        image_url VARCHAR(500),
        order_index INT DEFAULT 0,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS blog_posts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE,
        excerpt TEXT,
        content LONGTEXT,
        featured_image VARCHAR(500),
        author VARCHAR(100),
        published_at TIMESTAMP NULL,
        is_published BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(100) NOT NULL,
        phone VARCHAR(50),
        company VARCHAR(255),
        subject VARCHAR(255),
        message TEXT,
        status ENUM('new', 'read', 'replied') DEFAULT 'new',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS admin_users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        role ENUM('admin', 'editor') DEFAULT 'editor',
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);


    // Insert default admin user (password: admin123)
    await connection.execute(`
      INSERT IGNORE INTO admin_users (username, email, password_hash, role) 
      VALUES ('admin', 'admin@candour.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin')
    `);

    // Clear existing data and insert comprehensive homepage data
    await connection.execute('DELETE FROM services');
    await connection.execute('DELETE FROM industries');
    await connection.execute('DELETE FROM offices');
    await connection.execute('DELETE FROM brands');
    await connection.execute('DELETE FROM divisions');
    await connection.execute('DELETE FROM sections');

    // 1. SECTIONS DATA - All homepage sections
    const sectionsData = [
      {
        name: 'hero',
        title: 'Leading provider of engineering solutions and MRO equipment across Saudi Arabia.',
        subtitle: 'WELCOME TO CANDOUR',
        description: 'Headquartered in the Kingdom, we specialize in delivering tailored, cost-effective supply chain and logistics solutions that meet the evolving demands of industrial operations—both locally and globally.',
        image_url: '/banner.jpg',
        background_image: '/banner.jpg'
      },
      {
        name: 'services',
        title: 'Our Services',
        subtitle: 'What We Offer',
        description: 'Comprehensive MRO solutions and procurement services',
        image_url: '/MRO.png',
        background_image: '/banner.jpg'
      },
      {
        name: 'construction',
        title: 'Construction Services',
        subtitle: 'Building Excellence',
        description: 'Professional construction and project management services',
        image_url: '/banner.jpg',
        background_image: '/banner.jpg'
      },
      {
        name: 'pricing',
        title: 'Our Approach',
        subtitle: 'How We Work',
        description: 'Customized solutions tailored to your specific needs',
        image_url: '/banner.jpg',
        background_image: '/banner.jpg'
      },
      {
        name: 'company',
        title: 'About Our Company',
        subtitle: 'Industry Expertise',
        description: 'Leading industrial MRO solutions with global presence',
        image_url: '/banner.jpg',
        background_image: '/banner.jpg'
      },
      {
        name: 'quality',
        title: 'Quality Services',
        subtitle: 'Excellence in Every Project',
        description: 'Committed to delivering superior quality in all our services',
        image_url: '/banner.jpg',
        background_image: '/banner.jpg'
      },
      {
        name: 'industries',
        title: 'Industries We Serve',
        subtitle: 'Diverse Expertise',
        description: 'Serving multiple industries with specialized solutions',
        image_url: '/banner.jpg',
        background_image: '/banner.jpg'
      },
      {
        name: 'quote',
        title: 'Get a Quote',
        subtitle: 'Contact Us',
        description: 'Ready to start your project? Get in touch with our experts',
        image_url: '/banner.jpg',
        background_image: '/banner.jpg'
      },
      {
        name: 'partners',
        title: 'Our Partners',
        subtitle: 'Trusted Brands',
        description: 'Working with leading brands and manufacturers',
        image_url: '/banner.jpg',
        background_image: '/banner.jpg'
      },
      {
        name: 'offices',
        title: 'Our Offices',
        subtitle: 'Global Presence',
        description: 'Strategic locations worldwide to serve you better',
        image_url: '/banner.jpg',
        background_image: '/banner.jpg'
      }
    ];

    for (const section of sectionsData) {
      await connection.execute(
        `INSERT INTO sections (name, title, subtitle, description, image_url, background_image) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [section.name, section.title, section.subtitle, section.description, section.image_url, section.background_image]
      );
    }
    console.log('✅ Sections data inserted');

    // 2. DIVISIONS DATA
    const divisionsData = [
      {
        name: 'MRO Division',
        description: 'Comprehensive maintenance, repair, and operations solutions for industrial equipment',
        image_url: '/MRO.png',
        order_index: 1,
        is_active: true
      },
      {
        name: 'Tools Consumables Division',
        description: 'High-quality tools and consumables for all industrial applications',
        image_url: '/Tools.jpg',
        order_index: 2,
        is_active: true
      },
      {
        name: 'Projects Division',
        description: 'End-to-end project management and execution for complex industrial projects',
        image_url: '/Project.jpg',
        order_index: 3,
        is_active: true
      }
    ];

    for (const division of divisionsData) {
      await connection.execute(
        `INSERT INTO divisions (name, description, image_url, order_index, is_active) 
         VALUES (?, ?, ?, ?, ?)`,
        [division.name, division.description, division.image_url, division.order_index, division.is_active]
      );
    }
    console.log('✅ Divisions data inserted');

    // 3. SERVICES DATA - Get the services section ID first
    const [servicesSectionResult] = await connection.execute(
      'SELECT id FROM sections WHERE name = ?',
      ['services']
    );
    const servicesSectionId = servicesSectionResult[0]?.id;

    if (servicesSectionId) {
      const servicesData = [
        {
          section_id: servicesSectionId,
          title: 'Customized Solutions',
          description: 'We thoroughly assess your procurement processes and MRO requirements to deliver customized solutions aligned with your specific objectives.',
          image_url: '/MRO.png',
          price: 'Contact Us',
          features: '["Process Assessment", "Custom Solutions", "Objective Alignment"]',
          order_index: 1,
          is_active: true
        },
        {
          section_id: servicesSectionId,
          title: 'Global Supplier Reach',
          description: 'Our strategic partnerships with a diverse supplier network across the globe, ensuring consistent quality and service through regular evaluations and feedback.',
          image_url: '/Tools.jpg',
          price: 'Contact Us',
          features: '["Global Network", "Quality Assurance", "Regular Evaluations"]',
          order_index: 2,
          is_active: true
        },
        {
          section_id: servicesSectionId,
          title: 'Seamless Integration',
          description: 'By leveraging advanced procurement technologies and seamless system with ERP\'s, we enhance the efficiency of your procurement operations.',
          image_url: '/Project.jpg',
          price: 'Contact Us',
          features: '["Advanced Technology", "ERP Integration", "Efficiency Enhancement"]',
          order_index: 3,
          is_active: true
        }
      ];

      for (const service of servicesData) {
        await connection.execute(
          `INSERT INTO services (section_id, title, description, image_url, price, features, order_index, is_active) 
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [service.section_id, service.title, service.description, service.image_url, service.price, service.features, service.order_index, service.is_active]
        );
      }
      console.log('✅ Services data inserted');
    } else {
      console.log('⚠️ Services section not found, skipping services data');
    }

    // 4. INDUSTRIES DATA - All 10 industries from homepage
    const industriesData = [
      {
        name: 'Coal Mine',
        description: 'Complete MRO solutions for upstream, midstream, and downstream operations',
        image_url: '/banner.jpg',
        order_index: 1,
        is_active: true
      },
      {
        name: 'Steel',
        description: 'Specialized equipment and materials for chemical processing plants',
        image_url: '/banner.jpg',
        order_index: 2,
        is_active: true
      },
      {
        name: 'Oil',
        description: 'Critical spares and maintenance solutions for power plants',
        image_url: '/banner.jpg',
        order_index: 3,
        is_active: true
      },
      {
        name: 'Gas',
        description: 'Heavy-duty equipment and safety systems for mining operations',
        image_url: '/banner.jpg',
        order_index: 4,
        is_active: true
      },
      {
        name: 'Power Station',
        description: 'Industrial machinery and automation solutions',
        image_url: '/banner.jpg',
        order_index: 5,
        is_active: true
      },
      {
        name: 'Chemistry',
        description: 'Tools, equipment, and materials for construction projects',
        image_url: '/banner.jpg',
        order_index: 6,
        is_active: true
      },
      {
        name: 'Lab',
        description: 'Specialized equipment for marine and offshore operations',
        image_url: '/banner.jpg',
        order_index: 7,
        is_active: true
      },
      {
        name: 'Biogas',
        description: 'Pumps, valves, and treatment equipment for water facilities',
        image_url: '/banner.jpg',
        order_index: 8,
        is_active: true
      },
      {
        name: 'Municipal',
        description: 'Hygienic equipment and processing solutions',
        image_url: '/banner.jpg',
        order_index: 9,
        is_active: true
      },
      {
        name: 'Food & Beverage',
        description: 'Precision equipment and compliance solutions',
        image_url: '/banner.jpg',
        order_index: 10,
        is_active: true
      }
    ];

    for (const industry of industriesData) {
      await connection.execute(
        `INSERT INTO industries (name, description, image_url, order_index, is_active) 
         VALUES (?, ?, ?, ?, ?)`,
        [industry.name, industry.description, industry.image_url, industry.order_index, industry.is_active]
      );
    }
    console.log('✅ Industries data inserted');

    // 5. OFFICES DATA
    const officesData = [
      {
        name: 'Jubail Office',
        address: '123 Industrial Zone, Jubail, Saudi Arabia',
        phone: '+966 13 123 4567',
        email: 'jubail@candour-intl.com',
        map_url: 'https://maps.google.com/jubail',
        image_url: '/banner.jpg',
        order_index: 1,
        is_active: true
      },
      {
        name: 'Riyadh Office',
        address: '456 Business District, Riyadh, Saudi Arabia',
        phone: '+966 11 234 5678',
        email: 'riyadh@candour-intl.com',
        map_url: 'https://maps.google.com/riyadh',
        image_url: '/banner.jpg',
        order_index: 2,
        is_active: true
      },
      {
        name: 'Dubai Office',
        address: '789 Trade Center, Dubai, UAE',
        phone: '+971 4 345 6789',
        email: 'dubai@candour-intl.com',
        map_url: 'https://maps.google.com/dubai',
        image_url: '/banner.jpg',
        order_index: 3,
        is_active: true
      }
    ];

    for (const office of officesData) {
      await connection.execute(
        `INSERT INTO offices (name, address, phone, email, map_url, image_url, order_index, is_active) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [office.name, office.address, office.phone, office.email, office.map_url, office.image_url, office.order_index, office.is_active]
      );
    }
    console.log('✅ Offices data inserted');

    // 6. BRANDS DATA
    const brandsData = [
      {
        name: 'KEN Tools',
        description: 'Professional tool solutions and equipment',
        logo_url: '/logo1.jpg',
        website_url: 'https://kentools.com',
        order_index: 1,
        is_active: true
      },
      {
        name: 'KolArc Welding',
        description: 'Welding equipment and services',
        logo_url: '/logo2.png',
        website_url: 'https://kolarc.com',
        order_index: 2,
        is_active: true
      },
      {
        name: 'Industrial Partners',
        description: 'Trusted industrial equipment manufacturers',
        logo_url: '/logo3.jpg',
        website_url: '#',
        order_index: 3,
        is_active: true
      },
      {
        name: 'Global Suppliers',
        description: 'International supply chain partners',
        logo_url: '/logo4.png',
        website_url: '#',
        order_index: 4,
        is_active: true
      }
    ];

    for (const brand of brandsData) {
      await connection.execute(
        `INSERT INTO brands (name, description, logo_url, website_url, order_index, is_active) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [brand.name, brand.description, brand.logo_url, brand.website_url, brand.order_index, brand.is_active]
      );
    }
    console.log('✅ Brands data inserted');


    console.log('\n🎉 Database initialization completed successfully!');
    console.log('\n📊 Summary:');
    console.log('- 10 Sections created (all homepage sections)');
    console.log('- 3 Divisions created (MRO, Tools, Projects)');
    console.log('- 3 Services created (Customized Solutions, Global Reach, Integration)');
    console.log('- 10 Industries created (Coal Mine, Steel, Oil, Gas, Power Station, Chemistry, Lab, Biogas, Municipal, Food & Beverage)');
    console.log('- 3 Offices created (Jubail, Riyadh, Dubai)');
    console.log('- 4 Brands created (KEN Tools, KolArc Welding, Industrial Partners, Global Suppliers)');
    console.log('\n👤 Default admin user created:');
    console.log('Username: admin');
    console.log('Password: admin123');
    
  } catch (error) {
    console.error('Error initializing database:', error);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

initializeDatabase();
