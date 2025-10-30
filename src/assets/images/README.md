# Image Assets Structure

This directory contains all image assets for the Fundax website. Realistic placeholder SVG files have been generated with improved design matching the Fundax brand colors. Replace these SVG files with actual PNG/JPG images while keeping the same filenames.

## Directory Structure

```
src/assets/images/
├── logos/
│   ├── banks/          # Bank partner logos (150x80px recommended)
│   ├── media/          # Media outlet logos (120x60px recommended)
│   └── trust-badges/   # Trust badge logos (64x64px recommended)
├── testimonials/       # Customer testimonial photos (150x150px recommended)
├── articles/           # Article/blog images (800x400px recommended)
├── team/               # Team photos (400x300px recommended)
├── hero/               # Hero banner images (1920x600px recommended)
└── general/            # General purpose images (varies)
```

## Image Files

### Bank Logos (`logos/banks/`)
- `bank-mandiri.svg` → Replace with `bank-mandiri.png`
- `bank-bca.svg` → Replace with `bank-bca.png`
- `bank-bri.svg` → Replace with `bank-bri.png`
- `bank-bni.svg` → Replace with `bank-bni.png`
- `bank-cimb.svg` → Replace with `bank-cimb.png`
- `bank-danamon.svg` → Replace with `bank-danamon.png`
- `bank-ocbc.svg` → Replace with `bank-ocbc.png`
- `bank-permata.svg` → Replace with `bank-permata.png`
- `bank-maybank.svg` → Replace with `bank-maybank.png`
- `bank-panin.svg` → Replace with `bank-panin.png`
- `bank-btpn.svg` → Replace with `bank-btpn.png`
- `bank-dbs.svg` → Replace with `bank-dbs.png`
- `bank-hsbc.svg` → Replace with `bank-hsbc.png`
- `bank-uob.svg` → Replace with `bank-uob.png`
- `bank-standard-chartered.svg` → Replace with `bank-standard-chartered.png`

### Media Logos (`logos/media/`)
- `swasembada.svg` → Replace with `swasembada.png`
- `bisnis-indonesia.svg` → Replace with `bisnis-indonesia.png`
- `liputan-6.svg` → Replace with `liputan-6.png`
- `kontan.svg` → Replace with `kontan.png`
- `merdeka.svg` → Replace with `merdeka.png`
- `republika.svg` → Replace with `republika.png`
- `suara-pemberitaan.svg` → Replace with `suara-pemberitaan.png`
- `bisnis-com.svg` → Replace with `bisnis-com.png`
- `marketing-co-id.svg` → Replace with `marketing-co-id.png`
- `media-indonesia.svg` → Replace with `media-indonesia.png`

### Trust Badges (`logos/trust-badges/`)
- (Note: OJK and ISO badges have been removed per requirements)

### Testimonials (`testimonials/`)
- `renaldi.svg` → Replace with `renaldi.jpg` (update import in Testimonials.tsx)
- `ridwan.svg` → Replace with `ridwan.jpg` (update import in Testimonials.tsx)
- `siti-nurhaliza.svg` → Replace with `siti-nurhaliza.jpg` (update import in Testimonials.tsx)
- `ahmad-fauzi.svg` → Replace with `ahmad-fauzi.jpg` (update import in Testimonials.tsx)

### Articles (`articles/`)
- `tips-memilih-produk-pinjaman.svg` → Replace with `tips-memilih-produk-pinjaman.jpg` (update import in Berita.tsx)
- `panduan-lengkap-kpr.svg` → Replace with `panduan-lengkap-kpr.jpg` (update import in Berita.tsx)
- `keuntungan-loan-adviser.svg` → Replace with `keuntungan-loan-adviser.jpg` (update import in Berita.tsx)
- `fundax-ekspansi-24-kota.svg` → Replace with `fundax-ekspansi-24-kota.jpg` (update import in Berita.tsx)
- `memahami-bunga-fixed-floating.svg` → Replace with `memahami-bunga-fixed-floating.jpg` (update import in Berita.tsx)

### Team (`team/`)
- `management-team.svg` → Replace with `management-team.jpg` (update import in TentangKami.tsx)
- `loan-advisers-team.svg` → Replace with `loan-advisers-team.jpg` (update import in TentangKami.tsx)
- `customer-service-team.svg` → Replace with `customer-service-team.jpg` (update import in TentangKami.tsx)

### Hero (`hero/`)
- `hero-financial-services.svg` → Replace with `hero-financial-services.jpg` (update import in Hero.tsx)

### General (`general/`)
- `fundax-team-about.svg` → Replace with `fundax-team-about.jpg` (update import in TentangKami.tsx)

## How to Replace Placeholders

1. **Generate realistic placeholders** (already done):
   ```bash
   node scripts/generate-realistic-placeholders.cjs
   ```

2. **Replace with actual images**:
   - Replace SVG files with actual PNG/JPG images
   - Keep the exact same filename (only change extension)
   - Update imports in code files if extension changes (.svg → .jpg/.png)

3. **Recommended image formats**:
   - Logos: PNG with transparent background
   - Photos: JPG (optimized for web, 80-90% quality)
   - Icons: PNG with transparent background

4. **Image optimization**:
   - Compress images before adding
   - Resize to recommended dimensions
   - Use tools like TinyPNG, ImageOptim, or Squoosh
   - Maintain aspect ratios

## Brand Colors Used in Placeholders

The placeholder SVGs use Fundax brand colors:
- Primary: `#0066CC` (Blue)
- Secondary: `#3399FF` (Light Blue)
- Light: `#E6F2FF` (Very Light Blue)
- Dark: `#003366` (Dark Blue)

## Notes

- All placeholder SVG files have been created with realistic designs matching Fundax branding
- The code references these images by their paths
- When replacing SVGs with actual images, update file extensions in import statements
- Make sure to optimize images for web (compress, resize appropriately)
- Maintain aspect ratios when replacing images
