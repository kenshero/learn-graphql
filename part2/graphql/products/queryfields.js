var graphql = require('graphql');
var GraphQLObjectType = graphql.GraphQLObjectType;
var GraphQLString = graphql.GraphQLString;
var GraphQLList = graphql.GraphQLList;
var GraphQLInt = graphql.GraphQLInt;
var { productType } = require('./inputtype')
var products = require('../../data');
var getHey = {
  type: GraphQLString,
  resolve: function(_, args){
    return products[0].name
  }
}
var getProducts = {
  type: new GraphQLList(productType),
  resolve: function(_, args){
    return products
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
    var filterProduct = products.filter(function(product){
      return product.price <= args.price
    })
    return filterProduct
  }
}
module.exports = {
  getHey: getHey, // ไม่จำเป็นที่ชื่อต้องซ้ำกัน
  getProducts: getProducts,
  getProductByPrice: getProductByPrice,
}