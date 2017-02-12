var { Products } = require('../../db/setup');

var getProducts = function(callback) {
    Products.find(function(err, result) {
      if (err) {
        console.log(err);
      } else {
        callback(result)
      }
    });
}

var getProductByPrice = function(price, callback) {
    Products.find({price: { $lt: price } }, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        callback(result)
      }
    });
}

var createProduct = function(args, callback) {
    var productParams = args.product;
    var product = new Products({
        name: productParams.name,
        price: productParams.price,
        category: productParams.category
    });
    product.save(function (err, result) {
      if (err) {
        console.log(err);
      } else {
        callback(result)
      }
    });
}

var deleteProduct = function(args, callback) {
    var productId = args.id;
    Products.remove({_id : productId}, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        callback(result)
      }
    });
}

module.exports = {
    getProducts : getProducts,
    getProductByPrice : getProductByPrice,
};
