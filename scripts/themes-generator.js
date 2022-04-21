// themes-generator.js script performs several tasks:
// - fetch data from Figma
// - generate color library and create color-library json
// - generate design tokens and create design-tokens json

// Data received form Figma is a json file which has the following structure:
// -'core' contains the colors library which defines the hex value for each color name, e.g.: 'tealscale-teal0': '#7fcbcd'
// -'ide-default', 'ide-dark', ..., each contain two types of information:
//    > mapping between color name and semantic value, e.g.: 'accent-strong': 'tealscale-teal0'
//    > mapping between variable name of an element and the semantic value, e.g.: 'button-primary-bg-hover': 'accent-strong'


// Data fetch from Figma is handled using the Figma API. As reported on the website (https://www.figma.com/developers/api)
// "The Figma API supports read access and interactions with Figma files. This gives you the ability to view and extract any objects or layers, and their properties."
const Figma = require('figma-api');
const fs = require('fs');

// Environment variables 
// Must be exported with: 'export FIGMA_API_ACCESS_TOKEN=xxxxxx && export FIGMA_THEME_FILE_ID=c9ZP7fwbfB5GWwr2hWXzwe'
const FIGMA_API_ACCESS_TOKEN = process.env.FIGMA_API_ACCESS_TOKEN;
const FIGMA_THEME_FILE_ID = process.env.FIGMA_THEME_FILE_ID;

const semanticColorsLibrary = {};
const colorsLibrary = {};
const designTokens = {};

const main = async () => {
  const api = new Figma.Api({
    personalAccessToken: FIGMA_API_ACCESS_TOKEN,
  });
  const file = await api.getFile(FIGMA_THEME_FILE_ID, { plugin_data: '843461159747178978,shared' }); // Figma tokens plugin id = '843461159747178978'
  const values = JSON.parse(file.document.sharedPluginData.tokens.values);

  generateThemes(values);

  // Write colorsLibrary in the corresponding json file
  fs.writeFile('./src/themes/colors-library.json', JSON.stringify(colorsLibrary), (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('Color library file saved!');
  });

  // Write designTokens in the corresponding json file
  fs.writeFile('./src/themes/design-tokens.json', JSON.stringify(designTokens), (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('Design tokens file saved!');
  });
};

// Parse values fetched from Figma by populating designTokens with css variables
// each variable is associated with all the available themes and each theme is associated with a color defined in the ColorLibrary
function generateDesignTokens(tokens, theme) {
  const themeClass = theme.split('-').pop().toLowerCase();

  for (const token in tokens) {
    const tokenName = tokens[token].name.split('.');
    const type = tokenName[0];
    const name = tokenName.pop();

    if (type !== 'ide-semantic') {
      if (!designTokens['--arduino-' + name]) {
        designTokens['--arduino-' + name] = {};
      }
      const value = tokens[token].value.substring(1);
      designTokens['--arduino-' + name][themeClass] = semanticColorsLibrary[value].toLowerCase().replace(/[.\s+]/g, '-');
    }
  }
}

// Generate a mapping between the colors defined for each token and the semantic value
function generateSemanticColorsLibrary(semanticColors) {
  for (semanticColor in semanticColors) {
    const type = semanticColors[semanticColor].name.split('.')[0];
    if (type === 'ide-semantic') {
      const colorName = semanticColors[semanticColor].name;
      semanticColorsLibrary[colorName] = semanticColors[semanticColor].value;
    }
  }
}

// Parse values fetched from Figma by generating a list of colors associated with the related hex value
function generateColorsLibrary(colors) {
  for (color in colors) {
    const colorName = colors[color].name.toLowerCase().replace(/[.\s+]/g, '-');
    colorsLibrary[colorName] = colors[color].value;
  }
}

// Generate semanticColorsLibrary, designTokens and colorsLibrary
function generateThemes(values) {
  for (const value in values) {
    if (value !== 'core') {
      generateSemanticColorsLibrary(values[value]);
      generateDesignTokens(values[value], value);
    } else {
      generateColorsLibrary(values[value]);
    }
  }
}

main();
