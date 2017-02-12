var graphql = require('graphql');
var GraphQLSchema = graphql.GraphQLSchema;
var GraphQLObjectType = graphql.GraphQLObjectType;
var { getHey, getProducts, getProductByPrice } = require('./products/queryfields');
var { addProduct, deleteProduct } = require('./products/mutationfields');
var queryType = new GraphQLObjectType({
  name: "queryProduct",
  description: "query of product",
  fields: {
    hey: getHey,
    getProducts: getProducts,
    getProductByPrice: getProductByPrice
  }
});
var mutationType = new GraphQLObjectType({
  name: "mutationProduct",
  description: "mutation of product",
  fields: {
    addProduct: addProduct,
    deleteProduct: deleteProduct
  }
});
var MyGraphQLSchema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType
});
module.exports = MyGraphQLSchema