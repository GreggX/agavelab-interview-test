const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true,
}))
app.get('/', (req, res) => {
  res.status(200).send({ foo: 'bar' })
})

module.exports = app