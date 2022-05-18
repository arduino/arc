interface Color {
  name: string;
  value: string;
  type: string;
}

type Values = Record<string, Color[]>;
type ColorsLibrary = Record<string, string>;
type Themes = Record<string, string>;
type DesignTokens = Record<string, Themes>;

// Parse values fetched from Figma by populating designTokens with css variables
// each variable is associated with all the available themes and each theme is associated with a color defined in the ColorLibrary
export function generateDesignTokens(
  tokens: Color[],
  theme: string,
  semanticColorsLibrary: ColorsLibrary,
  designTokens: DesignTokens
): DesignTokens {
  const themeClass = theme.split('-').pop().toLowerCase();

  for (const token in tokens) {
    const tokenName = tokens[token].name.split('.');
    const type = tokenName[0];
    const name = `--arduino-${tokenName.pop()}`;

    if (type !== 'ide-semantic') {
      if (!designTokens[name]) {
        designTokens[name] = {};
      }
      const value = tokens[token].value.substring(1);
      const colorName = semanticColorsLibrary[value].split('.').pop();
      designTokens[name][themeClass] = '$' + colorName.toLowerCase().replace(/[.\s+]/g, '-');
    }
  }

  return designTokens;
}

// Generate a mapping between the colors defined for each token and the semantic value
export function generateSemanticColorsLibrary(semanticColors: Color[]): ColorsLibrary {
  const semanticColorsLibrary = {};

  for (const semanticColor in semanticColors) {
    const type = semanticColors[semanticColor].name.split('.')[0];
    if (type === 'ide-semantic') {
      const colorName = semanticColors[semanticColor].name;
      semanticColorsLibrary[colorName] = semanticColors[semanticColor].value;
    }
  }

  return semanticColorsLibrary;
}

// Parse values fetched from Figma by generating a list of colors associated with the related hex value
export function generateColorsLibrary(colors: Color[]): ColorsLibrary {
  let colorsLibrary = {};

  for (const color in colors) {
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
export function generateThemes(values: Values): [DesignTokens, ColorsLibrary] {
  let designTokens = {};
  const { core, ...rest } = values;
  const colorsLibrary = generateColorsLibrary(core);

  for (const value in rest) {
    const semanticLibrary = generateSemanticColorsLibrary(values[value]);
    designTokens = { ...designTokens, ...generateDesignTokens(values[value], value, semanticLibrary, designTokens) };
  }

  return [designTokens, colorsLibrary];
}
