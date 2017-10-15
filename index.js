const path = require('path')

module.exports = function nuxtSassResourcesLoader (moduleOptions) {
    this.extendBuild((config, { isClient, isServer }) => {
        const sassLoader = config.module.rules.find(rule => rule.test.toString() === '/\\.sass$/')

        if (typeof options === 'String') {
            moduleOptions = {
                resources: path.resolve(__dirname, moduleOptions)
            }
        }

        sassLoader.use.push({
            loader: 'sass-resources-loader',
            options: moduleOptions
        })
    })
}
  
module.exports.meta = require('./package.json')
