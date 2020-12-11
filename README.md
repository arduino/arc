# components-zeroheight

This library contains a React-based implementation of the [Arduino Component Library](https://www.figma.com/file/euysycI6QhSSbN7Qvguce8/🎛UI-Controls).

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

## Versioning

Versions must stick with [semver](https://semver.org/) guidelines:

> Given a version number MAJOR.MINOR.PATCH, increment the:
> 1. MAJOR version when you make incompatible API changes
> 2. MINOR version when you add functionality in a backwards compatible manner
> 3. PATCH version when you make backwards compatible bug fixes.
>
>Additional labels for pre-release and build metadata are available as extensions to the MAJOR.MINOR.PATCH format.

Please note that, when major version is `0`, any increment in MINOR is considered a breaking change.

## Deployment Process

1. Update the `version` in `package.json`
2. As soon as a new version is merged in `main`, the CI will build the library and publish it in github package registry