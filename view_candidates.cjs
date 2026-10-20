const fs = require('fs');
const html = fs.readFileSync('public/glyphs_preview.html', 'utf8');

const targetGids = [4, 12, 22, 24, 30, 38, 39, 40, 48, 49, 50, 51, 90];
for (const gid of targetGids) {
  const match = html.match(new RegExp(`<div[^>]*>[\\s\\S]*?G:\\s*${gid}[\\s\\S]*?<\\/div>`, 'i'));
  if (match) {
    console.log(`=== GID ${gid} ===`);
    const svgMatch = match[0].match(/viewBox="([^"]+)"/);
    console.log('viewBox:', svgMatch ? svgMatch[1] : '');
  }
}

