ng-on-rest
[![Build Status](https://travis-ci.org/paulsouche/ng-on-rest.svg?branch=master)](https://travis-ci.org/paulsouche/ng-on-rest)
[![Dependency Status](https://david-dm.org/paulsouche/ng-on-rest.svg)](https://david-dm.org/paulsouche/ng-on-rest)
[![devDependency Status](https://david-dm.org/paulsouche/ng-on-rest/dev-status.svg)](https://david-dm.org/paulsouche/ng-on-rest#info=devDependencies)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
========

This is the monorepo for ng-on-rest packages. For documentation about a specific module please follow links

 - [ng-on-rest-core](/ng-on-rest/core)
 - [ng-on-rest-create](/ng-on-rest/create)
 - [ng-on-rest-detail](/ng-on-rest/detail)
 - [ng-on-rest-forms](/ng-on-rest/forms)
 - [ng-on-rest-list](/ng-on-rest/list)

Build
========

 In order to build this project you will need

```
node 8.X.X
npm 5.X.X
yarn 1.X.X
```

```bash
  # Clone the repository
  git clone https://github.com/paulsouche/ng-on-rest
  # Install the dependencies (postinstall should symlink node_modules)
  yarn
  # Build each module with lerna
  yarn build
  # Launch demo
  cd demo && yarn start
  # Build demo
  cd demo && yarn build
```

Tests
========

```bash
  # Launch all tests in parallel with lerna
  yarn test
  # Launch tests for one specificmodule
  cd ng-on-rest/${specificModuleName} && yarn test
```

Publish
========

The main package.json version is the version of each module. In order to upgrade the version of the modules, just upgrade it in the main and run

```bash
  # Upgrade each module version with lerna
  yarn upgrade-version
```

The CI takes care of publishing module in case of any version upgrade but in order to publish the modules, just run

```bash
  # Publish all modules if not already published
  yarn publish-version
```

Todos
========

 - Demo docs + translation + publish
 - i18n module
 - Dynamic entities mappers
 - tsdoc
 - find a better solution for client interfaces
 - Dynamic form templates
