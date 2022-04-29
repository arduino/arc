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

import { generateThemes } from './utils';

// Environment variables
// Must be exported with: 'export FIGMA_API_ACCESS_TOKEN=xxxxxx && export FIGMA_THEME_FILE_ID=c9ZP7fwbfB5GWwr2hWXzwe'
const FIGMA_API_ACCESS_TOKEN = process.env.FIGMA_API_ACCESS_TOKEN;
const FIGMA_THEME_FILE_ID = process.env.FIGMA_THEME_FILE_ID;

const main = async () => {
  const api = new Figma.Api({
    personalAccessToken: FIGMA_API_ACCESS_TOKEN,
  });

  const file = await api.getFile(FIGMA_THEME_FILE_ID, { plugin_data: '843461159747178978,shared' }); // Figma tokens plugin id = '843461159747178978'
  const values = JSON.parse(file.document.sharedPluginData.tokens.values);

  const [designTokens, colorsLibrary] = generateThemes(values);

  // Write colorsLibrary in the corresponding json file
  fs.writeFile('./src/themes/colors-library.json', JSON.stringify(colorsLibrary), (err: Error) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('Color library file saved!');
  });

  // Write designTokens in the corresponding json file
  fs.writeFile('./src/themes/design-tokens.json', JSON.stringify(designTokens), (err: Error) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('Design tokens file saved!');
  });
};

main();
