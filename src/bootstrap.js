const { Sequelize } = require ('sequelize')

async function createModel(instance) {
  try {
    const model = {
      Product: await require('./models/product')(instance, Sequelize.DataTypes)
    }

    Object.keys(model).forEach(key => {
      if ('associate' in model[key]) {
        model[key].associate(model)
      }
    })

    return model
  } catch(e) {
    console.error(e)
  }
}

async function postgresConnection() {
  let db = await new Sequelize('postgres://postgres:admin@db:5432/products')
  try {
    console.log('Connected to postgres')
    return db
  } catch (e) {
    console.error(`Unable to connect database: ${e}`)
  }
}

async function startWS() {
  return new Promise(resolve => {
    const app = require('./server')
    const routes = require('./routes/routes')
    const expressPort = 3001

    app.use(routes)
    app.listen(expressPort, () => {
      console.log(`WS started at port ${expressPort}`)
      resolve(true)
    })
  })
}

module.exports = {
  postgresConnection,
  startWS,
  createModel
}