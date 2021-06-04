# EVPP Theme

This is a Drupal theme maintained by the Office of the Executive Vice President and Provost for use with the UT Drupal Kit. It is based on the Bootstrap library v4.

**Contents**
- [Development](#development)
  * [Setup](#setup)
  * [Writing & compiling SCSS](#writing--compiling-scss)

## Development

### Setup

Developers first will need to install [NodeJS and NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) on their local development machine.

**Tip**

> Using [Node Version Manager (NVM)](https://www.npmjs.com/package/nvm) is now recommended for installing Node. It is not required, however, and you may continue to use a global installation of Node.

Your subtheme of Forty Acres will include a `package.json` file, which defines package dependencies needed for theme development. The `gulpfile.js` file additionally defines tasks for linting and compiling CSS. From the root directory of your subtheme, run:

`npm install`

This will generate a `node_modules/` directory of dependencies. This directory should **not** be versioned as part your codebase; if you are using Git for version control, you should add this directory to your `.gitignore` file so it will not be committed to your repository.

### Writing & compiling SCSS

The CSS rendered for a Drupal theme is defined in that theme’s `.libraries.yml` file (see [Adding stylesheets (CSS) and JavaScript (JS) to a Drupal theme](https://www.drupal.org/docs/theming-drupal/adding-stylesheets-css-and-javascript-js-to-a-drupal-theme)). When using an SCSS workflow, however, you should not directly modifiy the referenced CSS files: the `/css` directory in your theme represents the compiled version of any SCSS files you are using.

Instead, you should edit the SCSS. There are a handful of boilerplate SCSS files located in the `/src/scss` directory to get started.

To build the CSS for use with your theme, run:

`npm run gulp`

Whenever a code change is saved to your SCSS, Gulp will recompile all SCSS files located in `/src/scss` into CSS equivalents in `/css`, and will autoprefix the CSS for cross-browser support.

Additionally, this Gulp task will “lint” your SCSS, enforcing syntax standards to make your code more consistent and readable. Syntax rule violations will print directly to your terminal window during the build process.

**Hint**

> The command `npm run gulp` (as opposed to simply `gulp`) runs using the locally installed version of Gulp, located at `node_modules/gulp/bin/gulp.js`, ensuring that an expected version of the task runner is used.
