const { resolve } = require('path')

module.exports = {
    rootDir: resolve(__dirname, '../..'),
    srcDir: __dirname,
    dev: false,
    render: {
        resourceHints: false
    },
    modules: [
        '@@'
    ],
    sassResources: [
        '@/assets/sass/colors.scss',
        '@/assets/sass/variables.scss',
    ]
}
