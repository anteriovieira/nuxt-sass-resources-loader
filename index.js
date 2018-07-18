const Module = require('module')

const defaults = {
    resources: []
}

module.exports = function nuxtSassResourcesLoader (moduleOptions = {}) {
    if (typeof moduleOptions === 'string' || Array.isArray(moduleOptions)) {
        moduleOptions = {resources: moduleOptions}
    }

    const options = Object.assign({}, defaults, {resources: this.options.sassResources}, moduleOptions)

    // Casts the provided resource as an array if it's not one.
    options.resources = Array.isArray(options.resources) ? options.resources : [options.resources]

    // Try to resolve using NPM resolve path first
    options.resources = options.resources.filter(r => !!r).reduce((resources, resource) => {
        resources.push(resolvePath.call(this.nuxt, resource))

        return resources
    }, [])

    const sassResourcesLoader = {
        loader: 'sass-resources-loader', options
    }

    const version = this.nuxt.constructor.version
    const [major, minor, patch] = version.split('.')

    this.extendBuild(config => {
        if (major === '1') {
            extendV1(config, { sassResourcesLoader })
        } else {
            extend(config, { sassResourcesLoader })
        }
    })
}

function extendV1(config, { sassResourcesLoader }) {
    const sassLoader = config.module.rules.filter(({ test = '' }) => {
        return ['/\\.sass$/', '/\\.scss$/'].indexOf(test.toString()) !== -1
    })
  const vueLoader = config.module.rules.find(({ test = '' }) => {
        return test.toString() === '/\\.vue$/'
    })

    const loaders = vueLoader.options.loaders

    Object.keys(loaders).forEach(loader => {
        if (['sass', 'scss'].indexOf(loader) !== -1) {
            loaders[loader].push(sassResourcesLoader)
        }
    })

    Object.keys(sassLoader).forEach(loader => {
        sassLoader[loader].use.push(sassResourcesLoader)
    })
}

function extend(config, { sassResourcesLoader }) {
    const sassLoaders = config.module.rules.filter(({ test = '' }) => {
        return ['/\\.sass$/', '/\\.scss$/'].indexOf(test.toString()) !== -1
    })

    for (const sassLoader of sassLoaders) {
        for (const rule of sassLoader.oneOf) {
            rule.use.push(sassResourcesLoader)
        }
    }
}

// custom resolvePath nuxt.js/lib/core/nuxt.js
function resolvePath(_path) {
    try {
      const resolvedPath = Module._resolveFilename(_path, {
        paths: this.options.modulesDir
      })
      return resolvedPath
    } catch (error) {
      if (error.code !== 'MODULE_NOT_FOUND') {
        throw error
      }
    }

    return this.resolveAlias(_path)
  }

module.exports.meta = require('./package.json')
