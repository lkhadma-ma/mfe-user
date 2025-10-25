const fs = require('fs');
const path = require('path');

const distPath = 'dist/user/browser';
const manifestPath = path.join(distPath, 'styles-manifest.json');

/**
 * 
 * @param {string} directory 
 * @returns file name of styles file
 * 
 */
function findStylesFile(directory) {
  const files = fs.readdirSync(directory);
  const stylesFile = files.find(file => file.startsWith('styles') && file.endsWith('.css'));
  return stylesFile;
}

/**
 * this function generates a styles-manifest.json file in the dist directory
 * by finding the styles file and writing its name to the manifest.
 * @returns void
 */
function generateStylesManifest() {
  const stylesFileName = findStylesFile(distPath);

  if (!stylesFileName) {
    console.error('Styles file not found in the output directory.');
    return;
  }

  const manifestData = {
    styles: stylesFileName
  };

  fs.writeFileSync(manifestPath, JSON.stringify(manifestData, null, 2), 'utf-8');
  console.log(`Successfully generated styles-manifest.json at ${manifestPath}`);
}

generateStylesManifest();