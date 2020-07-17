const express = require('express')
const product = require('../controllers/product')

const route = express.Router()

route.get('/total', product.getTotal)

module.exports = route