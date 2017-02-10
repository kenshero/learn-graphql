var express = require('express');
var graphqlHTTP = require('express-graphql');
var graphql = require('graphql');
var GraphQLSchema = graphql.GraphQLSchema;
var GraphQLObjectType = graphql.GraphQLObjectType;
var GraphQLString = graphql.GraphQLString;
var GraphQLList = graphql.GraphQLList;
var GraphQLInt = graphql.GraphQLInt;
var products = require('./data');
var app = express();
var PORT = process.env.port || 3000

var voteType = new GraphQLObjectType({
  name: "vote",
  description: "vote of The product",
  fields: () => ({
   star: {
     type: GraphQLInt,
     description: "one_star of the vote",
   },
   men: {
     type: GraphQLInt,
     description: "men of vote",
   },
   women: {
     type: GraphQLInt,
     description: "women of vote",
   }
 })
});

var productType = new GraphQLObjectType({
  name: "products",
  description: "Detail of The product",
  fields: () => ({
   name: {
     type: GraphQLString,
     description: "Name of the product",
   },
   price: {
     type: GraphQLInt,
     description: "price of product",
   },
   category: {
     type: new GraphQLList(GraphQLString),
     description: "category of product",
   },
   vote: {
     type: new GraphQLList(voteType),
     description: "vote of product",
   }
 })
});

var queryType = new GraphQLObjectType({
  name: "queryProduct",
  description: "query of product",
  fields: () => ({
    hey: {
      type: GraphQLString,
      resolve: function(_, args){
        return products[0].name
      }
    },
    getProducts: {
      type: new GraphQLList(productType),
      resolve: function(_, args){
        return products
      }
    },
    getProductByPrice: {
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
  })
});

var mutationType = new GraphQLObjectType({
  name: "mutationProduct",
  description: "mutation of product",
  fields: () => ({
    addProduct: {
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
  })
});

var MyGraphQLSchema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType
});

app.use('/graphql', graphqlHTTP({
  schema: MyGraphQLSchema,
  graphiql: true
}));

app.listen(PORT);
console.log("Server running on localhost:", PORT);