const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [192, 512];
const inputSvg = path.join(__dirname, '../public/logo-black.svg');
const outputDir = path.join(__dirname, '../public');

// Create PNG icons from SVG
async function generateIcons() {
  console.log('Generating PWA icons...');
  
  for (const size of sizes) {
    const outputPath = path.join(outputDir, `icon-${size}.png`);
    
    await sharp(inputSvg)
      .resize(size, size, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      })
      .png()
      .toFile(outputPath);
    
    console.log(`✓ Created ${outputPath}`);
  }
  
  // Create apple-touch-icon
  const appleTouchIcon = path.join(outputDir, 'apple-touch-icon.png');
  await sharp(inputSvg)
    .resize(180, 180, {
      fit: 'contain',
      background: { r: 255, g: 255, b: 255, alpha: 1 }
    })
    .png()
    .toFile(appleTouchIcon);
  
  console.log(`✓ Created ${appleTouchIcon}`);
  
  // Create favicon
  const favicon = path.join(outputDir, 'favicon.ico');
  await sharp(inputSvg)
    .resize(32, 32, {
      fit: 'contain',
      background: { r: 255, g: 255, b: 255, alpha: 1 }
    })
    .png()
    .toFile(favicon);
  
  console.log(`✓ Created ${favicon}`);
  
  console.log('\n✅ All icons generated successfully!');
}

generateIcons().catch(console.error);
