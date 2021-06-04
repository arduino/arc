# components-zeroheight

This library contains a React-based implementation of the [Arduino Component Library](https://www.figma.com/file/euysycI6QhSSbN7Qvguce8/🎛UI-Controls).

Storybook is publicly accessible via github pages [here](https://bcmi-labs.github.io/react-components/)

## Pre-Requisites

Packages are hosted in the private Github Package Registry (GPR). To install the packages you need to be authenticated using a token:

1. Specify to npm/yarn to use the Github registry as a proxy for the requests
   - create a .npmrc file in your project root with this line: `@bcmi-labs:registry=https://npm.pkg.github.com/`
2. Authenticate with Github running `npm login --registry=https://npm.pkg.github.com`
   - Username: your github username
   - Password: a **GITHUB TOKEN** with both `packages:read` and `repo` permission. You can create token in the [Developer Settings](https://github.com/settings/tokens) on Github website
   - Email: your **public** github email
3. Some packages have a dependancy on [arduino-sass](https://github.com/bcmi-labs/sass.git#2.4.0) repo. You will get an error if yarn/npm are unable to download from that repository.

   - Ensure you have access to the repo. If you don't, open a ticket.
   - Configure git to access the repo. You have _three_ options (**_CHOOSE ONE_**)

     1. Export the access token

     - export the access token to REPO_ACCESS_TOKEN environment variable

     ```sh
     export REPO_ACCESS_TOKEN=<your github token>
     ```

     - if you are installing this library from another repository, make sure your `.npmrc` files has the following lines:

       ```
       @bcmi-labs:registry=https://npm.pkg.github.com/
       //npm.pkg.github.com/:_authToken=${REPO_ACCESS_TOKEN}
       ```

     > Tip: for your convenience, add `export REPO_ACCESS_TOKEN=<your github token>` to your `.bashrc` or `.zshrc`, in your user directory.

   2. Force git to always use ssh on github

      ```sh
      git config --global url."git@github.com:".insteadOf "https://github.com/"
      ```

   3. Sign https requests with your token. Replace <REPO_ACCESS_TOKEN> with the token generated before.

      ```sh
      git config --global url."https://$REPO_ACCESS_TOKEN:x-oauth-basic@github.com/bcmi-labs".insteadOf "https://github.com/bcmi-labs
      ```

## Usage

```sh
npm i @bcmi-labs/react-components`
```

Please note that this package has a peer dependecy on `react`, `react-dom` and `react-aria`, you might need to install.

```sh
npm i react@^16.13.1 react-dom@^16.12.0 react-aria@3.0.0
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
