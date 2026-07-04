#!/usr/bin/env node

// Auto-discover hero images from the public/images/hero directory
// Run this script during build to generate an up-to-date list of hero images
// that will be imported into siteConfig.js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const heroDir = path.join(__dirname, '../public/images/hero');
const outputFile = path.join(__dirname, '../src/config/heroImages.json');

// Supported image extensions
const imageExtensions = ['.webp', '.jpg', '.jpeg', '.png', '.gif'];

try {
  // Read all files from hero directory
  const files = fs.readdirSync(heroDir);

  // Filter to only image files and sort alphabetically
  const heroImages = files
    .filter((file) => imageExtensions.includes(path.extname(file).toLowerCase()))
    .sort()
    .map((file) => `/images/hero/${file}`);

  if (heroImages.length === 0) {
    console.warn('⚠️  No images found in public/images/hero/');
  }

  // Write to JSON file that can be imported
  fs.writeFileSync(outputFile, JSON.stringify({ heroImages }, null, 2));

  console.log(`✓ Generated hero images config (${heroImages.length} images)`);
  heroImages.forEach((img) => console.log(`  • ${img}`));
} catch (error) {
  console.error('✗ Error generating hero images:', error.message);
  process.exit(1);
}
