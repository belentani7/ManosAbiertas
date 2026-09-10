import { existsSync } from 'node:fs';
import sharp from 'sharp';

if (!existsSync('public/logo.svg')) {
  throw new Error('public/logo.svg is required to generate PWA icons');
}

await Promise.all([192, 512].map((size) =>
  sharp('public/logo.svg')
    .resize(size, size)
    .png()
    .toFile(`public/icon-${size}.png`)
));

console.log('PWA icons generated');
