const Figma = require('figma-api');
const fs = require('fs');

import { generateThemes } from './utils';

// Environment variables
const FIGMA_API_ACCESS_TOKEN = process.env.FIGMA_API_ACCESS_TOKEN;
const FIGMA_THEME_FILE_ID = process.env.FIGMA_THEME_FILE_ID;

// Figma Tokens plugin ID
const FIGMA_TOKENS_PLUGIN_DATA = '843461159747178978';

const main = async () => {
  const api = new Figma.Api({
    personalAccessToken: FIGMA_API_ACCESS_TOKEN,
  });

  const file = await api.getFile(FIGMA_THEME_FILE_ID, { plugin_data: `${FIGMA_TOKENS_PLUGIN_DATA},shared` });
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
