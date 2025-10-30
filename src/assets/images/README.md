# Image Assets Structure

This directory contains all image assets for the Fundax website. Currently, placeholder SVG files have been created with descriptive names. Replace these SVG files with actual PNG/JPG images while keeping the same filenames.

## Directory Structure

```
src/assets/images/
├── logos/
│   ├── banks/          # Bank partner logos (150x80px recommended)
│   ├── media/          # Media outlet logos (120x60px recommended)
│   └── trust-badges/   # OJK, ISO logos (64x64px recommended)
├── testimonials/       # Customer testimonial photos (150x150px recommended)
├── articles/           # Article/blog images (800x400px recommended)
├── team/               # Team photos (400x300px recommended)
├── hero/               # Hero banner images (1920x600px recommended)
└── general/            # General purpose images (varies)
```

## Image Files

### Bank Logos (`logos/banks/`)
- `bank-mandiri.png`
- `bank-bca.png`
- `bank-bri.png`
- `bank-bni.png`
- `bank-cimb.png`
- `bank-danamon.png`
- `bank-ocbc.png`
- `bank-permata.png`
- `bank-maybank.png`
- `bank-panin.png`
- `bank-btpn.png`
- `bank-dbs.png`
- `bank-hsbc.png`
- `bank-uob.png`
- `bank-standard-chartered.png`

### Media Logos (`logos/media/`)
- `swasembada.png`
- `bisnis-indonesia.png`
- `liputan-6.png`
- `kontan.png`
- `merdeka.png`
- `republika.png`
- `suara-pemberitaan.png`
- `bisnis-com.png`
- `marketing-co-id.png`
- `media-indonesia.png`

### Trust Badges (`logos/trust-badges/`)
- `ojk-logo.png`
- `iso-27001-logo.png`

### Testimonials (`testimonials/`)
- `renaldi.jpg`
- `ridwan.jpg`
- `siti-nurhaliza.jpg`
- `ahmad-fauzi.jpg`

### Articles (`articles/`)
- `tips-memilih-produk-pinjaman.jpg`
- `fundax-terdaftar-ojk.jpg`
- `panduan-lengkap-kpr.jpg`
- `keuntungan-loan-adviser.jpg`
- `fundax-ekspansi-24-kota.jpg`
- `memahami-bunga-fixed-floating.jpg`

### Team (`team/`)
- `management-team.jpg`
- `loan-advisers-team.jpg`
- `customer-service-team.jpg`

### Hero (`hero/`)
- `hero-financial-services.jpg`

### General (`general/`)
- `fundax-team-about.jpg`

## How to Replace Placeholders

1. Simply replace the SVG files with your actual PNG/JPG images
2. Keep the exact same filename
3. Update image extensions in code if needed (some are .png, some are .jpg)
4. Recommended image formats:
   - Logos: PNG with transparent background
   - Photos: JPG (optimized for web)
   - Icons: PNG with transparent background

## Notes

- All placeholder SVG files have been created with descriptive names
- The code references these images by their paths
- Make sure to optimize images for web (compress, resize appropriately)
- Maintain aspect ratios when replacing images
