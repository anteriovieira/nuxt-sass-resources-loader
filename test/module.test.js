const { Nuxt, Builder } = require('nuxt')
const request = require('request-promise-native')

const url = (path) => `http://localhost:3000${path}`
const get = (path) => request(url(path))

// describe('Config mode 1', () => {
//     let nuxt
//     const config = require('./fixture/nuxt.config.1')

//     beforeAll(async () => {
//         nuxt = new Nuxt(config)
//         await new Builder(nuxt).build()
//         await nuxt.listen(3000)
//     }, 60000)

//     afterAll(async () => {
//         await nuxt.close()
//     })

//     test('render', async () => {
//         let html = await get('/')
//         expect(html).toContain('color:#35495e;')
//         expect(html).toContain('background:#42b883')
//     })
// })

// describe('Config mode 2', () => {
//     let nuxt
//     const config = require('./fixture/nuxt.config.2')

//     beforeAll(async () => {
//         nuxt = new Nuxt(config)
//         await new Builder(nuxt).build()
//         await nuxt.listen(3000)
//     }, 60000)

//     afterAll(async () => {
//         await nuxt.close()
//     })

//     test('render', async () => {
//         let html = await get('/')
//         expect(html).toContain('color:#35495e;')
//         expect(html).toContain('background:#42b883')
//     })
// })

// describe('Config mode 3', () => {
//     let nuxt
//     const config = require('./fixture/nuxt.config.3')

//     beforeAll(async () => {
//         nuxt = new Nuxt(config)
//         await new Builder(nuxt).build()
//         await nuxt.listen(3000)
//     }, 60000)

//     afterAll(async () => {
//         await nuxt.close()
//     })

//     test('render', async () => {
//         let html = await get('/')
//         expect(html).toContain('color:#35495e;')
//         expect(html).toContain('background:#42b883')
//     })
// })

describe('Config mode 4', () => {
    let nuxt
    const config = require('./fixture/nuxt.config.4')

    beforeAll(async () => {
        nuxt = new Nuxt(config)
        await new Builder(nuxt).build()
        await nuxt.listen(3000)
    }, 60000)

    afterAll(async () => {
        await nuxt.close()
    })

    test('render', async () => {
        let html = await get('/')
        expect(html).toContain('color:#35495e;')
        expect(html).toContain('background:#42b883')
    })
})