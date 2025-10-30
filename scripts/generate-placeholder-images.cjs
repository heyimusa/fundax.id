const fs = require('fs');
const path = require('path');

// Create directory structure
const directories = [
  'src/assets/images/logos/banks',
  'src/assets/images/logos/media',
  'src/assets/images/logos/trust-badges',
  'src/assets/images/testimonials',
  'src/assets/images/articles',
  'src/assets/images/team',
  'src/assets/images/hero',
  'src/assets/images/general'
];

directories.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Bank logos
const banks = [
  'bank-mandiri.png',
  'bank-bca.png',
  'bank-bri.png',
  'bank-bni.png',
  'bank-cimb.png',
  'bank-danamon.png',
  'bank-ocbc.png',
  'bank-permata.png',
  'bank-maybank.png',
  'bank-panin.png',
  'bank-btpn.png',
  'bank-dbs.png',
  'bank-hsbc.png',
  'bank-uob.png',
  'bank-standard-chartered.png'
];

// Media logos
const media = [
  'swasembada.png',
  'bisnis-indonesia.png',
  'liputan-6.png',
  'kontan.png',
  'merdeka.png',
  'republika.png',
  'suara-pemberitaan.png',
  'bisnis-com.png',
  'marketing-co-id.png',
  'media-indonesia.png'
];

// Trust badges
const trustBadges = [
  'ojk-logo.png',
  'iso-27001-logo.png'
];

// Testimonials
const testimonials = [
  'renaldi.jpg',
  'ridwan.jpg',
  'siti-nurhaliza.jpg',
  'ahmad-fauzi.jpg'
];

// Articles
const articles = [
  'tips-memilih-produk-pinjaman.jpg',
  'fundax-terdaftar-ojk.jpg',
  'panduan-lengkap-kpr.jpg',
  'keuntungan-loan-adviser.jpg',
  'fundax-ekspansi-24-kota.jpg',
  'memahami-bunga-fixed-floating.jpg'
];

// Team
const team = [
  'management-team.jpg',
  'loan-advisers-team.jpg',
  'customer-service-team.jpg'
];

// Hero
const hero = [
  'hero-financial-services.jpg'
];

// General
const general = [
  'fundax-team-about.jpg'
];

// Create placeholder files (simple SVG placeholders)
function createPlaceholderSVG(name, width, height, text) {
  const textLines = text.split(' ');
  const fontSize = Math.min(width / text.length * 2, 20);
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" fill="#f5f7fa"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="${fontSize}" 
        fill="#1e5c9d" text-anchor="middle" dominant-baseline="middle">
    ${text}
  </text>
</svg>`;
}

function createPlaceholderImage(filePath, width, height, text) {
  const ext = path.extname(filePath);
  const name = path.basename(filePath, ext);
  
  if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
    // For images, create a simple SVG placeholder
    const svgContent = createPlaceholderSVG(name, width, height, text);
    const svgPath = filePath.replace(/\.(png|jpg|jpeg)$/i, '.svg');
    fs.writeFileSync(svgPath, svgContent);
    console.log(`Created: ${svgPath}`);
  }
}

// Generate bank logos
banks.forEach(bank => {
  const name = bank.replace('.png', '').replace(/-/g, ' ').toUpperCase();
  createPlaceholderImage(
    path.join('src/assets/images/logos/banks', bank),
    150, 80, name
  );
});

// Generate media logos
media.forEach(medium => {
  const name = medium.replace('.png', '').replace(/-/g, ' ').toUpperCase();
  createPlaceholderImage(
    path.join('src/assets/images/logos/media', medium),
    120, 60, name
  );
});

// Generate trust badges
trustBadges.forEach(badge => {
  const name = badge.replace('.png', '').replace(/-/g, ' ').toUpperCase();
  createPlaceholderImage(
    path.join('src/assets/images/logos/trust-badges', badge),
    64, 64, name
  );
});

// Generate testimonial images
testimonials.forEach(img => {
  const name = img.replace('.jpg', '').replace(/-/g, ' ').toUpperCase();
  createPlaceholderImage(
    path.join('src/assets/images/testimonials', img),
    150, 150, name
  );
});

// Generate article images
articles.forEach(article => {
  const name = article.replace('.jpg', '').replace(/-/g, ' ').toUpperCase();
  createPlaceholderImage(
    path.join('src/assets/images/articles', article),
    800, 400, name
  );
});

// Generate team images
team.forEach(img => {
  const name = img.replace('.jpg', '').replace(/-/g, ' ').toUpperCase();
  createPlaceholderImage(
    path.join('src/assets/images/team', img),
    400, 300, name
  );
});

// Generate hero images
hero.forEach(img => {
  const name = img.replace('.jpg', '').replace(/-/g, ' ').toUpperCase();
  createPlaceholderImage(
    path.join('src/assets/images/hero', img),
    1920, 600, name
  );
});

// Generate general images
general.forEach(img => {
  const name = img.replace('.jpg', '').replace(/-/g, ' ').toUpperCase();
  createPlaceholderImage(
    path.join('src/assets/images/general', img),
    800, 600, name
  );
});

console.log('\n✅ All placeholder images created!');
console.log('📝 Note: SVG placeholders were created. Replace them with actual PNG/JPG images.');
