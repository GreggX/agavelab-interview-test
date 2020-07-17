const bootstrap = require('./bootstrap')
const products = require('./models/inventory')

module.exports = bootstrap.postgresConnection()
  .then(async seqObj => {
    const models =  await bootstrap.createModel(seqObj)
    let app = require('./server')
    app.use((req, res, next) => {
      req.context = {
        models,
      }
      next()
    })

    try {
      await seqObj.sync({ force: true })
      products.map(async product => {
          models.Product.create(product)

      })
    } catch(e) {
      console.error(e)
    }
  })
  .then(bootstrap.startWS)