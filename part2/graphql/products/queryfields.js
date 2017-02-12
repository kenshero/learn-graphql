var graphql = require('graphql');
var GraphQLObjectType = graphql.GraphQLObjectType;
var GraphQLString = graphql.GraphQLString;
var GraphQLList = graphql.GraphQLList;
var GraphQLInt = graphql.GraphQLInt;
var { productType } = require('./inputtype')

var productServices = require('./services')

var getHey = {
  type: GraphQLString,
  resolve: function(_, args){
    return "Hello GraphQL"
  }
}

var getProducts = {
  type: new GraphQLList(productType),
  resolve: function(_, args){
    return new Promise(function(resolve, reject) {
      productServices.getProducts(function(data){
        resolve(data)
      })
    })
  }
}

var getProductByPrice = {
  type: new GraphQLList(productType),
  args: {
    price: {
      type: GraphQLInt
    }
  },
  resolve: function(_, args){
    var priceParams = args.price
    return new Promise(function(resolve, reject) {
      productServices.getProductByPrice(priceParams, function(data){
        resolve(data)
      })
    })
  }
}

module.exports = {
  getHey: getHey, // ไม่จำเป็นที่ชื่อต้องซ้ำกัน
  getProducts: getProducts,
  getProductByPrice: getProductByPrice,
}