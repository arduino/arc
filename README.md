# ARC - Arduino React Components

This library contains a React-based implementation of the [Arduino Component Library](https://www.figma.com/file/euysycI6QhSSbN7Qvguce8/🎛UI-Controls).

Storybook is publicly accessible via github pages [here](https://arduino.github.io/arc/)

## Usage

```sh
npm i @arduino/arc
```

Please note that this package has a peer dependecy on `react`, `react-dom` and `react-aria`, you might need to install.

```sh
npm i react@^17.0.2 react-dom@^17.0.2 react-aria@3.6.0
```

### Themes Usage
This package also offers Arduino color themes, provided in the `themes/themes.css` file.


Themes are directly pulled from Figma using the Figma API. As reported on the [website](https://www.figma.com/developers/api) "The Figma API supports read access and interactions with Figma files. This gives you the ability to view and extract any objects or layers, and their properties."

This data is fetched as a `.json` file with the following structure:
- `core` contains the colors library which defines the hex value for each color name, e.g.: `'tealscale-teal0': '#7fcbcd'`
- `ide-default`, `ide-dark`, ..., are the different themes available, each containing two types of information:
   - mapping between color name and semantic value, e.g.: `'accent-strong': 'tealscale-teal0'`
   - mapping between variable name of an element and the semantic value, e.g.: `'button-primary-bg-hover': 'accent-strong'`

This file is parsed to generate a ColorLibrary, a list of colors associated with their hex value, and DesignTokens, an object in which each variable is associated with all the available themes and each theme is associated with a color defined in the ColorLibrary.

A workflow has been implemented to pull themes weekly from Figma. It is also possible to do it manually.

#### Pull themes manually

Whenever you need to update themes manually, follow these steps:

1. Get the `FIGMA_THEME_FILE_ID` from the [URL of the Figma file](https://www.figma.com/file/c9ZP7fwbfB5GWwr2hWXzwe/Colors---Figma-Tokens?node-id=0%3A1)

2. Generate your `FIGMA_API_ACCESS_TOKEN` from [Figma](https://www.figma.com/developers/api#authentication)

3. Export the environment variables

   ```sh
   export FIGMA_API_ACCESS_TOKEN=xxxxxx && export FIGMA_THEME_FILE_ID=xxxxxx
   ```

4. Run the script
   ```sh
   npm run update-json-themes
   ```


#### Generate `themes/themes.css` file

Once the updated themes are pulled from Figma it's possible to generate the `themes/themes.css` file using:
   ```sh
   npm run build
   ```
The generated file will be available in the `dist` folder. This file will contain a `css` rule for each theme with internal mapping between all Arduino variables and their values. 

An example:
```sh
:root .arc-dark {
  --arduino-button-primary-bg: #0ca1a6;
  --arduino-button-primary-bg-hover: #7fcbcd; 
}
```

## Develop

1. Install dependencies with

   ```sh
   npm i
   ```

2. Build the project with

   ```sh
   npm run build
   ```

3. to test the components locally, run storybook

   ```sh
   npm run storybook
   ```

4. to reference a WIP branch from another repo, set the package.json of the other repo to
   ```json
   "dependencies": {
       "@arduino/arc": "github:arduino/arc#your-branch",
       ...
   ```

## Versioning

Versioning is automated, and managed via [semantic-release](https://github.com/semantic-release/)

All the commits that lands to `main` must stick with the Angular Commit Message Conventions (which is **CaseSensitive!**):

- feat: A new feature
- fix: A bug fix
- docs: Documentation only changes
- style: Changes that do not affect the meaning of the code (white-space, - formatting, missing semi-colons, etc)
- refactor: A code change that neither fixes a bug nor adds a feature
- perf: A code change that improves performance
- test: Adding missing or correcting existing tests
- chore: Changes to the build process or auxiliary tools and libraries such as documentation generation

Given the form above in the commits, semantic-release will automatically generate the changelog and bump the version of the libs.

**IMPORTANT**
If you squash merge your commits, only the message in the squashed commit will be read from semantic-release.
Please stick to the convention above ☝️ when squash-merging your PRs.

## Deployment Process

Deployment is handled automatically by the CI when your changes are merged into master. Sit back and relax ☺️
