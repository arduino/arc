# components-zeroheight

This library contains the up-to-date components found on zeroheight

## Develop

1. Install dependencies with 

    yarn

2. Build the project with 

    yarn build

To use the components you are developing locally on storybook, follow these instructions:

1. In the libs/packages/components-zeroheight folder, run

    yarn link

2. In the apps/storybook folder, run

    yarn link "@bcmi-labs/components-zeroheight"

3. In the apps/storybook folder, run

    yarn storybook

4. Whenever you make a change , run 

yarn link una volta

yarn build ogni volta che cambia