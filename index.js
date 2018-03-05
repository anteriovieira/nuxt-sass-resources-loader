module.exports = function nuxtSassResourcesLoader (moduleOptions = {}) {
    if (typeof moduleOptions === 'string' || Array.isArray(moduleOptions)) {
        moduleOptions = {resources: moduleOptions}
    }

    const options = Object.assign({}, {resources: this.options.sassResources}, moduleOptions) 
    
    // Casts the provided resource as an array if it's not one.
    options.resources = Array.isArray(options.resources) ? options.resources : [options.resources]

    // Try to resolve using NPM resolve path first
    options.resources = options.resources.reduce((resources, resource) => {
        resources.push(this.nuxt.resolvePath(resource))

        return resources
    }, [])

    const sassResourcesLoader = {
        loader: 'sass-resources-loader', options
    }

    this.extendBuild(config => {
        const sassLoader = config.module.rules.filter(({test}) => {
            return ['/\\.sass$/', '/\\.scss$/'].indexOf(test.toString()) !== -1
        })
        const vueLoader = config.module.rules.find(({test}) => {
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

    })
}
  
module.exports.meta = require('./package.json')
