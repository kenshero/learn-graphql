var graphql = require('graphql');
var GraphQLObjectType = graphql.GraphQLObjectType;
var GraphQLString = graphql.GraphQLString;
var GraphQLList = graphql.GraphQLList;
var GraphQLInt = graphql.GraphQLInt;
var { productType } = require('./inputtype')
var products = require('../../data');
var addProduct = {
  type: new GraphQLList(productType),
  args: {
    name: {
     type: GraphQLString
   },
   price: {
     type: GraphQLInt
   },
   category: {
     type: new GraphQLList(GraphQLString)
   }
  },
  resolve: function(_, args){
    var product = {
      name: args.name,
      price: args.price,
      category: args.category
    }
    products.push(product)
    return products
  }
}
var deleteProduct = {
  type: new GraphQLList(productType),
  args: {
    name: {
     type: GraphQLString
   }
  },
  resolve: function(_, args){
    return products.filter(function(product){
      return product.name != args.name // bad
    })
  }
}
module.exports = {
  addProduct: addProduct, 
  deleteProduct: deleteProduct
}