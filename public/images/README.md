# Images Directory Structure

This directory contains all images organized by category for better management and performance.

## Directory Structure

```
public/images/
├── branding/          # Site branding assets
│   ├── logo.png       # Main site logo
│   ├── logo1.jpg      # Alternative logos
│   └── favicon.png    # Site favicon
│
├── brands/            # Brand-specific images
│   ├── ken.png        # KEN Tools brand images
│   ├── ken2.png
│   └── ...
│
├── content/           # General content images
│   ├── about.png      # About section images
│   ├── banner.jpg     # Hero banners
│   ├── map.jpg        # Location maps
│   ├── Project.jpg    # Project showcases
│   └── Tools.jpg      # Tool showcases
│
├── heroes/            # Hero section images
│   └── (reserved for hero-specific images)
│
├── icons/             # Icon files
│   ├── whatsapp.png   # WhatsApp icon
│   ├── file.svg       # File icons
│   ├── globe.svg      # Navigation icons
│   └── ...
│
└── services/          # Service-related images
    ├── MRO.png        # MRO division images
    ├── mro1.jpg
    └── industrial.png
```

## Usage Guidelines

### Upload API Integration
- **Logos & Favicons**: Upload to `/images/branding/`
- **Blog Images**: Upload to `/images/content/`
- **Service Images**: Upload to `/images/services/`

### Image Optimization
- Use appropriate formats (PNG for logos, JPG for photos, SVG for icons)
- Optimize file sizes for web performance
- Use Next.js Image component for automatic optimization

### Naming Convention
- Use descriptive, lowercase names with hyphens
- Include version numbers for multiple variations (logo1, logo2, etc.)
- Use consistent file extensions

## Migration Notes
All images have been moved from the root `/public/` directory to this organized structure. Update any hardcoded paths to use the new structure:

- `/logo.png` → `/images/branding/logo.png`
- `/banner.jpg` → `/images/content/banner.jpg`
- `/MRO.png` → `/images/services/MRO.png`
- `/whatsapp.png` → `/images/icons/whatsapp.png`
