const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const url = process.env.LIGHTHOUSE_URL || 'https://mismanosabiertas.netlify.app/';
const outputDir = path.join(process.cwd(), 'reports', 'lighthouse');
const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const outputPath = path.join(outputDir, `lighthouse-${timestamp}.json`);

fs.mkdirSync(outputDir, { recursive: true });

console.log(`Running Lighthouse audit for ${url}...`);
const result = spawnSync('npx', [
  'lighthouse',
  url,
  '--output=json',
  `--output-path=${outputPath}`,
  '--preset=desktop',
  '--chrome-flags=--headless',
  '--quiet'
], { stdio: 'inherit' });

if (result.error || result.status !== 0) {
  console.error('Lighthouse audit failed.', result.error || 'See output above.');
  process.exit(result.status || 1);
}

const report = JSON.parse(fs.readFileSync(outputPath, 'utf8'));
console.log('\nScores:');
for (const [name, info] of Object.entries(report.categories || {})) {
  if (info.score !== null) {
    console.log(`${name.padEnd(20)} ${(info.score * 100).toFixed(0)}%`);
  }
}

console.log(`\nReport saved to: ${outputPath}`);
