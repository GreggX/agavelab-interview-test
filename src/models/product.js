const product = (sequalize, DataTypes) => {
  const Product = sequalize.define('product', {
    code: {
      type: DataTypes.STRING,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      unique: true
    },
    price: {
      type: DataTypes.DOUBLE,
      unique: false
    }
  })

  Product.findByCode = async code => {
    let product = await Product.findOne({
      where: { code: code }
    })

    return product
  }

  return Product
}

module.exports = product