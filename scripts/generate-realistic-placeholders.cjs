const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const imagesDir = path.join(rootDir, 'src', 'assets', 'images');

// Color palette for Fundax brand
const fundaxColors = {
  primary: '#0066CC',
  secondary: '#3399FF',
  light: '#E6F2FF',
  dark: '#003366',
  accent: '#00CC66',
  gray: '#666666',
  lightGray: '#CCCCCC'
};

// Create realistic SVG placeholders with better design
function createRealisticSVG(name, width, height, type, colors = fundaxColors) {
  let svgContent = '';
  
  switch(type) {
    case 'hero':
      svgContent = createHeroSVG(width, height, colors);
      break;
    case 'article':
      svgContent = createArticleSVG(name, width, height, colors);
      break;
    case 'testimonial':
      svgContent = createTestimonialSVG(name, width, height, colors);
      break;
    case 'team':
      svgContent = createTeamSVG(name, width, height, colors);
      break;
    case 'logo':
      svgContent = createLogoSVG(name, width, height, colors);
      break;
    case 'general':
      svgContent = createGeneralSVG(name, width, height, colors);
      break;
    default:
      svgContent = createDefaultSVG(name, width, height, colors);
  }
  
  return svgContent;
}

function createHeroSVG(width, height, colors) {
  return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="heroGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:${colors.primary};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${colors.secondary};stop-opacity:1" />
    </linearGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="${colors.light}" stroke-width="1" opacity="0.3"/>
    </pattern>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#heroGrad)"/>
  <rect width="${width}" height="${height}" fill="url(#grid)"/>
  <g opacity="0.1">
    <circle cx="${width * 0.2}" cy="${height * 0.3}" r="80" fill="white"/>
    <circle cx="${width * 0.8}" cy="${height * 0.7}" r="120" fill="white"/>
  </g>
  <text x="${width / 2}" y="${height / 2}" font-family="Arial, sans-serif" font-size="48" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle" opacity="0.9">Financial Services</text>
</svg>`;
}

function createArticleSVG(name, width, height, colors) {
  const title = name.replace(/-/g, ' ').replace(/\.svg$/, '');
  const words = title.split(' ').slice(0, 4);
  const displayTitle = words.join(' ');
  
  return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="articleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:${colors.light};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${colors.secondary};stop-opacity:0.3" />
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#articleGrad)"/>
  <rect x="0" y="0" width="${width}" height="${height * 0.4}" fill="${colors.primary}" opacity="0.1"/>
  <rect x="${width * 0.1}" y="${height * 0.15}" width="${width * 0.3}" height="${height * 0.25}" rx="8" fill="${colors.secondary}" opacity="0.2"/>
  <rect x="${width * 0.5}" y="${height * 0.2}" width="${width * 0.35}" height="${height * 0.15}" rx="8" fill="${colors.primary}" opacity="0.3"/>
  <text x="${width / 2}" y="${height * 0.7}" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="${colors.dark}" text-anchor="middle" dominant-baseline="middle">${displayTitle}</text>
  <text x="${width / 2}" y="${height * 0.8}" font-family="Arial, sans-serif" font-size="14" fill="${colors.gray}" text-anchor="middle" dominant-baseline="middle">Article Image</text>
</svg>`;
}

function createTestimonialSVG(name, width, height, colors) {
  const initials = name.split('-')[0].substring(0, 2).toUpperCase();
  
  return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="avatarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${colors.secondary};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${colors.primary};stop-opacity:1" />
    </linearGradient>
  </defs>
  <circle cx="${width / 2}" cy="${height / 2}" r="${Math.min(width, height) / 2 - 5}" fill="url(#avatarGrad)"/>
  <text x="${width / 2}" y="${height / 2}" font-family="Arial, sans-serif" font-size="${Math.min(width, height) / 3}" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle">${initials}</text>
</svg>`;
}

function createTeamSVG(name, width, height, colors) {
  return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="teamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${colors.light};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${colors.secondary};stop-opacity:0.4" />
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#teamGrad)"/>
  <rect x="${width * 0.1}" y="${height * 0.1}" width="${width * 0.8}" height="${height * 0.8}" rx="12" fill="${colors.primary}" opacity="0.1"/>
  <text x="${width / 2}" y="${height / 2}" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="${colors.dark}" text-anchor="middle" dominant-baseline="middle">${name.replace(/-/g, ' ').replace(/\.svg$/, '')}</text>
</svg>`;
}

function createLogoSVG(name, width, height, colors) {
  const logoName = name.replace(/^(bank-|logo-|)/, '').replace(/\.svg$/, '').replace(/-/g, ' ').toUpperCase();
  
  return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${colors.primary};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${colors.secondary};stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="white" rx="4"/>
  <rect x="5" y="5" width="${width - 10}" height="${height - 10}" fill="url(#logoGrad)" rx="4" opacity="0.1"/>
  <text x="${width / 2}" y="${height / 2}" font-family="Arial, sans-serif" font-size="${Math.min(width, height) / 6}" font-weight="bold" fill="${colors.primary}" text-anchor="middle" dominant-baseline="middle">${logoName}</text>
</svg>`;
}

function createGeneralSVG(name, width, height, colors) {
  return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="genGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${colors.light};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${colors.secondary};stop-opacity:0.3" />
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#genGrad)"/>
  <circle cx="${width * 0.3}" cy="${height * 0.3}" r="40" fill="${colors.primary}" opacity="0.2"/>
  <circle cx="${width * 0.7}" cy="${height * 0.7}" r="60" fill="${colors.secondary}" opacity="0.2"/>
  <text x="${width / 2}" y="${height / 2}" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="${colors.dark}" text-anchor="middle" dominant-baseline="middle">${name.replace(/-/g, ' ').replace(/\.svg$/, '')}</text>
</svg>`;
}

function createDefaultSVG(name, width, height, colors) {
  return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" fill="${colors.light}"/>
  <text x="${width / 2}" y="${height / 2}" font-family="Arial, sans-serif" font-size="16" fill="${colors.gray}" text-anchor="middle" dominant-baseline="middle">${name}</text>
</svg>`;
}

// Define image configurations
const imageConfigs = [
  // Hero images
  { path: 'hero/hero-financial-services.svg', width: 1920, height: 600, type: 'hero' },
  
  // Article images
  { path: 'articles/tips-memilih-produk-pinjaman.svg', width: 800, height: 400, type: 'article' },
  { path: 'articles/panduan-lengkap-kpr.svg', width: 800, height: 400, type: 'article' },
  { path: 'articles/keuntungan-loan-adviser.svg', width: 800, height: 400, type: 'article' },
  { path: 'articles/fundax-ekspansi-24-kota.svg', width: 800, height: 400, type: 'article' },
  { path: 'articles/memahami-bunga-fixed-floating.svg', width: 800, height: 400, type: 'article' },
  
  // Testimonial images
  { path: 'testimonials/renaldi.svg', width: 150, height: 150, type: 'testimonial' },
  { path: 'testimonials/ridwan.svg', width: 150, height: 150, type: 'testimonial' },
  { path: 'testimonials/siti-nurhaliza.svg', width: 150, height: 150, type: 'testimonial' },
  { path: 'testimonials/ahmad-fauzi.svg', width: 150, height: 150, type: 'testimonial' },
  
  // Team images
  { path: 'team/management-team.svg', width: 400, height: 300, type: 'team' },
  { path: 'team/loan-advisers-team.svg', width: 400, height: 300, type: 'team' },
  { path: 'team/customer-service-team.svg', width: 400, height: 300, type: 'team' },
  
  // General images
  { path: 'general/fundax-team-about.svg', width: 600, height: 400, type: 'general' },
  
  // Bank logos
  { path: 'logos/banks/bank-mandiri.svg', width: 150, height: 80, type: 'logo' },
  { path: 'logos/banks/bank-bca.svg', width: 150, height: 80, type: 'logo' },
  { path: 'logos/banks/bank-bri.svg', width: 150, height: 80, type: 'logo' },
  { path: 'logos/banks/bank-bni.svg', width: 150, height: 80, type: 'logo' },
  { path: 'logos/banks/bank-cimb.svg', width: 150, height: 80, type: 'logo' },
  { path: 'logos/banks/bank-danamon.svg', width: 150, height: 80, type: 'logo' },
  { path: 'logos/banks/bank-ocbc.svg', width: 150, height: 80, type: 'logo' },
  { path: 'logos/banks/bank-permata.svg', width: 150, height: 80, type: 'logo' },
  { path: 'logos/banks/bank-maybank.svg', width: 150, height: 80, type: 'logo' },
  { path: 'logos/banks/bank-panin.svg', width: 150, height: 80, type: 'logo' },
  { path: 'logos/banks/bank-btpn.svg', width: 150, height: 80, type: 'logo' },
  { path: 'logos/banks/bank-dbs.svg', width: 150, height: 80, type: 'logo' },
  { path: 'logos/banks/bank-hsbc.svg', width: 150, height: 80, type: 'logo' },
  { path: 'logos/banks/bank-uob.svg', width: 150, height: 80, type: 'logo' },
  { path: 'logos/banks/bank-standard-chartered.svg', width: 150, height: 80, type: 'logo' },
  
  // Media logos
  { path: 'logos/media/swasembada.svg', width: 120, height: 60, type: 'logo' },
  { path: 'logos/media/bisnis-indonesia.svg', width: 120, height: 60, type: 'logo' },
  { path: 'logos/media/liputan-6.svg', width: 120, height: 60, type: 'logo' },
  { path: 'logos/media/kontan.svg', width: 120, height: 60, type: 'logo' },
  { path: 'logos/media/merdeka.svg', width: 120, height: 60, type: 'logo' },
  { path: 'logos/media/republika.svg', width: 120, height: 60, type: 'logo' },
  { path: 'logos/media/suara-pemberitaan.svg', width: 120, height: 60, type: 'logo' },
  { path: 'logos/media/bisnis-com.svg', width: 120, height: 60, type: 'logo' },
  { path: 'logos/media/marketing-co-id.svg', width: 120, height: 60, type: 'logo' },
  { path: 'logos/media/media-indonesia.svg', width: 120, height: 60, type: 'logo' },
];

// Main function
function generateRealisticPlaceholders() {
  console.log('Generating realistic placeholder images...\n');
  
  imageConfigs.forEach(config => {
    const filePath = path.join(imagesDir, config.path);
    const dir = path.dirname(filePath);
    const fileName = path.basename(config.path);
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    // Generate SVG content
    const svgContent = createRealisticSVG(fileName, config.width, config.height, config.type);
    
    // Write file
    fs.writeFileSync(filePath, svgContent);
    console.log(`✓ Created: ${config.path}`);
  });
  
  console.log('\n✅ All realistic placeholder images generated successfully!');
  console.log('\nNote: These are still placeholder SVGs but with improved design.');
  console.log('Replace them with actual images when ready, keeping the same filenames.');
}

// Run the script
generateRealisticPlaceholders();

