const fs = require('fs');
const path = require('path');

async function extractTextFromPDF(filePath) {
  // Dynamic import for ESM-only pdfjs-dist
  const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf.mjs');

  const data = new Uint8Array(fs.readFileSync(filePath));
  const standardFontDataUrl = path.join(
    __dirname, '..', 'node_modules', 'pdfjs-dist', 'standard_fonts'
  ) + '/';
  const doc = await pdfjsLib.getDocument({ data, standardFontDataUrl }).promise;

  let fullText = '';
  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items.map(item => item.str).join(' ');
    fullText += pageText + '\n';
  }

  return fullText.trim();
}

module.exports = { extractTextFromPDF };
