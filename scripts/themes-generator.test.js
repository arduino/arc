const { generateDesignTokens, generateSemanticColorsLibrary, generateColorsLibrary, generateThemes } = require('./utils');

const values = {
  core: [
    {
      name: 'core.TealScale.Teal6',
      value: '#a5f2ee',
      type: 'color',
    },
    {
      name: 'core.TealScale.Teal5',
      value: '#005c5f',
      type: 'color',
    },
  ],

  'ide-default': [
    {
      name: 'ide-semantic.fg.default',
      value: '$core.Grayscale.Gris',
      type: 'color',
    },
    {
      name: 'ide-semantic.fg.strong',
      value: '$core.Grayscale.Black',
      type: 'color',
    },
    {
      name: 'ide-semantic.accent.secondary',
      value: '$core.TealScale.Teal0',
      type: 'color',
    },
    {
      name: 'ide-semantic.accent.strong',
      value: '$core.TealScale.Teal5',
      type: 'color',
    },
    {
      name: 'ide-contextual.cta.primary.button-primary-bg-hover',
      value: '$ide-semantic.accent.strong',
      type: 'color',
    },
    {
      name: 'ide-contextual.cta.primary.button-primary-outline',
      value: '$ide-semantic.accent.secondary',
      type: 'color',
    },
  ],

  'ide-dark': [
    {
      name: 'ide-semantic.accent.secondary',
      value: '$core.Grayscale.Fog',
      type: 'color',
    },
    {
      name: 'ide-semantic.accent.strong',
      value: '$core.TealScale.Teal0',
      type: 'color',
    },
    {
      name: 'ide-contextual.cta.primary.button-primary-bg-hover',
      value: '$ide-semantic.accent.strong',
      type: 'color',
    },
    {
      name: 'ide-contextual.cta.primary.button-primary-outline',
      value: '$ide-semantic.accent.secondary',
      type: 'color',
    },
  ],
};

const colorsLibraryExpected = {
  teal6: '#a5f2ee',
  teal5: '#005c5f',
};

const semanticDefaultColorsLibraryExpected = {
  'ide-semantic.fg.default': '$core.Grayscale.Gris',
  'ide-semantic.fg.strong': '$core.Grayscale.Black',
  'ide-semantic.accent.secondary': '$core.TealScale.Teal0',
  'ide-semantic.accent.strong': '$core.TealScale.Teal5',
};

const semanticDarkColorsLibraryExpected = {
  'ide-semantic.accent.secondary': '$core.Grayscale.Fog',
  'ide-semantic.accent.strong': '$core.TealScale.Teal0',
};

const designTokensExpected = {
  '--arduino-button-primary-bg-hover': {
    dark: '$teal0',
    default: '$teal5',
  },
  '--arduino-button-primary-outline': {
    dark: '$fog',
    default: '$teal0',
  },
};

describe('Fetch data from Figma and generate styles', () => {
  it('should generate the DesignTokens', () => {
    const designTokens = {};
    const ideDefaultTokens = generateDesignTokens(
      values['ide-default'],
      'ide-default',
      semanticDefaultColorsLibraryExpected,
      designTokens
    );
    const ideDarkTokens = generateDesignTokens(
      values['ide-dark'],
      'ide-dark',
      semanticDarkColorsLibraryExpected,
      designTokens
    );
    expect({ ...ideDefaultTokens, ...ideDarkTokens }).toEqual(designTokensExpected);
  });

  it('should generate the SemanticColorsLibrary', () => {
    expect(generateSemanticColorsLibrary(values['ide-default'])).toEqual(semanticDefaultColorsLibraryExpected);
    expect(generateSemanticColorsLibrary(values['ide-dark'])).toEqual(semanticDarkColorsLibraryExpected);
  });

  it('should generate the ColorsLibrary', () => {
    const colorsLibrary = {};
    expect(generateColorsLibrary(values['core'], colorsLibrary)).toEqual(colorsLibraryExpected);
  });

  it('should generate themes', () => {
    expect([designTokensExpected, colorsLibraryExpected]).toEqual(generateThemes(values));
  });
});
