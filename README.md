# components-zeroheight

This library contains a React-based implementation of the [Arduino Component Library](https://www.figma.com/file/euysycI6QhSSbN7Qvguce8/🎛UI-Controls).

Storybook is publicly accessible [here](https://bcmi-labs.github.io/react-components/)

## Usage

```sh
npm i @bcmi-labs/react-components`
```

Please note that this package has a peer dependecy on `react`, `react-dom` and `react-aria`, you might need to install.

```sh
npm i react@^16.13.1 react-dom@^16.12.0 react-aria@3.0.0
```

## Pre-Requisites

To download the packages from the private Github Package Registry you must be authenticated with Github:
- get a valid [access token](https://github.com/settings/tokens/) granting the `repo` AND `read:packages` permissions
- login with `npm login --registry=https://npm.pkg.github.com --scope=@bcmi-labs`
  - use your GitHub username
  - use the token you created in the place of the password
  - if prompted, put insert your public email

> Tip: you might want to put your access token in the global `.npmrc` file, in the form of `//npm.pkg.github.com/:_authToken=<your-token>`

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
        "@bcmi-labs/react-components": "bcmi-labs/react-components#your-branch",
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