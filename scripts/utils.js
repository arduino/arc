// Parse values fetched from Figma by populating designTokens with css variables
// each variable is associated with all the available themes and each theme is associated with a color defined in the ColorLibrary
function generateDesignTokens(tokens, theme, semanticColorsLibrary, designTokens) {
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
      const colorName = semanticColorsLibrary[value].split('.').pop();
      designTokens['--arduino-' + name][themeClass] = '$' + colorName.toLowerCase().replace(/[.\s+]/g, '-');
    }
  }
  return designTokens;
}

// Generate a mapping between the colors defined for each token and the semantic value
function generateSemanticColorsLibrary(semanticColors) {
  const semanticColorsLibrary = {};
  for (semanticColor in semanticColors) {
    const type = semanticColors[semanticColor].name.split('.')[0];
    if (type === 'ide-semantic') {
      const colorName = semanticColors[semanticColor].name;
      semanticColorsLibrary[colorName] = semanticColors[semanticColor].value;
    }
  }
  return semanticColorsLibrary;
}

// Parse values fetched from Figma by generating a list of colors associated with the related hex value
function generateColorsLibrary(colors, colorsLibrary) {
  for (color in colors) {
    const colorName = colors[color].name
      .split('.')
      .pop()
      .toLowerCase()
      .replace(/[.\s+]/g, '-');
    colorsLibrary[colorName] = colors[color].value;
  }
  return colorsLibrary;
}

// Generate semanticColorsLibrary, designTokens and colorsLibrary
function generateThemes(values) {
  let designTokens = {};
  let colorsLibrary = {};

  const { core, ...rest } = values;
  colorsLibrary = generateColorsLibrary(core, colorsLibrary);

  for (const value in rest) {
    const semanticLibrary = generateSemanticColorsLibrary(values[value]);
    designTokens = { ...designTokens, ...generateDesignTokens(values[value], value, semanticLibrary, designTokens) };
  }

  return [designTokens, colorsLibrary];
}

module.exports = {
  generateDesignTokens,
  generateSemanticColorsLibrary,
  generateColorsLibrary,
  generateThemes
};