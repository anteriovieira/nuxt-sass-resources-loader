# nuxt-sass-resources-loader

[![npm](https://img.shields.io/npm/v/nuxt-sass-resources-loader.svg)](https://www.npmjs.com/package/nuxt-sass-resources-loader)
[![CircleCI](https://img.shields.io/circleci/project/github/anteriovieira/nuxt-sass-resources-loader.svg?style=flat-square)](https://circleci.com/gh/anteriovieira/nuxt-sass-resources-loader)
[![npm](https://img.shields.io/npm/dt/nuxt-sass-resources-loader.svg?style=flat-square)](https://npmjs.com/package/nuxt-sass-resources-loader)
[![donate](https://img.shields.io/badge/donate-%E2%99%A5-ff5f5f.svg)](https://patreon.com/anteriovieira)


This module does all the hard work of configuring [sass-resources-loader](https://github.com/shakacode/sass-resources-loader) for your nuxt application.

> `sass-resources-loader` @import your SASS resources into every required SASS module. So you can use your shared variables & mixins across all SASS styles without manually importing them in each file. Made to work with CSS Modules!

## Install

```sh
npm i nuxt-sass-resources-loader
# or
yarn add nuxt-sass-resources-loader
```

> Note that installing as a dev dependency `--save-dev` or `-D` will not work correctly.

## Usage

You can use the [nuxtjs aliases](https://nuxtjs.org/guide/directory-structure#aliases) to resolve the file path.

```js
module.exports = {
  modules: [
    // provide path to the file with resources
    ['nuxt-sass-resources-loader', '@/path/to/resources.scss'],

    // or array of paths
    ['nuxt-sass-resources-loader', [
        '@/path/to/first-resources.sass',
        '@/path/to/second-resources.scss',
    ]],

    // or the native options
    ['nuxt-sass-resources-loader', {
        resources: '@/path/to/resources.sass'
    }],
    
    // or from the npm package
    ['nuxt-sass-resources-loader', 'my-package/sass/resources.scss']
  ],
}
```

> 

with sass resources option. require v1.1+

```js
// nuxt.config.js
module.exports = {
  modules: [
    'nuxt-sass-resources-loader'
  ],
  sassResources: [
    '@/path/to/first-resources.sass'
  ]
}
```


> You can also use resolve from node to indicate the relative path of the file:
```js
const resolve = require('path').resolve
...
['nuxt-sass-resources-loader', resolve(__dirname, './path/to/resources.scss')]
...
```

### Glob pattern matching

You can specify glob patterns to match your all of your files in the same directory.

```js
// Specify a single path
resources: './path/to/resources/**/*.scss', // will match all files in folder and subdirectories
// or an array of paths
resources: [ './path/to/resources/**/*.scss', './path/to/another/**/*.scss' ]
```

> Note that sass-resources-loader will resolve your files in order. If you want your variables to be accessed across all of your mixins you should specify them in first place.

```js
resources: [ './path/to/variables/vars.scss', './path/to/mixins/**/*.scss' ]
```

[For more details see the official documentation](https://github.com/shakacode/sass-resources-loader#usage)

## License

[MIT](http://opensource.org/licenses/MIT)
