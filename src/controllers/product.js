function estimatePants(ammount, price) {
  if (ammount > 1) { 
    const trigger = ammount % 2 === 0 ? true : false
    return trigger ? ( ammount / 2 ) * price : (((ammount - 1) / 2) * price ) + price
  }

  return price * ammount
}

function estimateTshirt(ammount, price) {
  if (ammount >= 3) {
    return ammount * (price - 1)
  }

  return ammount * price
}

async function getTotal(request, response) {
  if (request.query.items) {
    const items = request.query.items.split(',')
    const pantsObj = await request.context.models.Product.findByCode('PANTS')
    const tshirtObj = await request.context.models.Product.findByCode('TSHIRT')
    const hatObj = await request.context.models.Product.findByCode('HAT')
    const totalPants = items.filter(e => e.toUpperCase() === pantsObj.code).length
    const totalTShirts = items.filter(e => e.toUpperCase() === tshirtObj.code).length
    const totalHats = items.filter(e => e.toUpperCase() === hatObj.code).length
    const totalHatsPrice = totalHats * hatObj.price

    const total = estimatePants(totalPants, pantsObj.price) + estimateTshirt(totalTShirts, tshirtObj.price) + totalHatsPrice

    return response.status(200).send({ total })
  }

  return response.status(200).send({
    message: 'Your cart is empty'
  })
}

module.exports = {
  getTotal
}