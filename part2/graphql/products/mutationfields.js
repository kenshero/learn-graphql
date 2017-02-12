var graphql = require('graphql');
var GraphQLObjectType = graphql.GraphQLObjectType;
var GraphQLString = graphql.GraphQLString;
var GraphQLList = graphql.GraphQLList;
var GraphQLInt = graphql.GraphQLInt;
var { productType } = require('./inputtype')

var productServices = require('./services')

var addProduct = {
  type: productType,
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
    return new Promise(function(resolve, reject) {
      productServices.createProduct(args, function(data){
        console.log(data);
        resolve(data)
      })
    })
  }
}

var deleteProduct = {
  type: productType,
  args: {
    id: {
     type: GraphQLString
   }
  },
  resolve: function(_, args){
    return new Promise(function(resolve, reject) {
      productServices.deleteProduct(args.id, function(data){
        console.log(data);
        resolve(data)
      })
    })
  }
}

module.exports = {
  addProduct: addProduct, 
  deleteProduct: deleteProduct
}