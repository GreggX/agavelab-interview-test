const chai = require('chai')
const expect = chai.expect
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
chai.use(sinonChai)
const rewire = require('rewire')
const request = require('supertest')

var server = rewire('../src/server')
var products = require('../src/controllers/product')
var sandbox = sinon.createSandbox()

describe('app', () => {
  afterEach(() => {
    server = rewire('../src/server')
    sandbox.restore()
  })

  context('GET /total', () => {
    it('Should get /total', async () => {
      await require('../src/index')
      const routes = await require('../src/routes/routes')
      server.use(routes)

      let res = await request(server)
        .get('/total')
        .expect(200)
       console.log(`res 1: ${res}`)
    })

    it('Should get total for 32.5', async () => {
      await require('../src/index')
      const routes = await require('../src/routes/routes')
      server.use(routes)

      let res = await request(server)
        .get('/total')
        .query({
          items: 'pants,tshirt,hat'
        })
        .expect(200)

        console.log(`res 2: ${res}`)

    })
  })
})