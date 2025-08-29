const fs = require('fs');
const path = require('path');

const distPath = 'dist/user/browser'; // Replace with your actual output path
const manifestPath = path.join(distPath, 'styles-manifest.json');

// This function finds the styles file, regardless of its name
function findStylesFile(directory) {
  const files = fs.readdirSync(directory);
  const stylesFile = files.find(file => file.startsWith('styles') && file.endsWith('.css'));
  return stylesFile;
}

// Generate the manifest
function generateStylesManifest() {
  const stylesFileName = findStylesFile(distPath);

  if (!stylesFileName) {
    console.error('Styles file not found in the output directory.');
    return;
  }

  const manifestData = {
    styles: stylesFileName,
    // Add other properties if needed
  };

  fs.writeFileSync(manifestPath, JSON.stringify(manifestData, null, 2), 'utf-8');
  console.log(`Successfully generated styles-manifest.json at ${manifestPath}`);
}

generateStylesManifest();