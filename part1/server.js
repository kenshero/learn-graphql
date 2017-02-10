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
    }
  })
});

var MyGraphQLSchema = new GraphQLSchema({
  query: queryType
});

app.use('/graphql', graphqlHTTP({
  schema: MyGraphQLSchema,
  graphiql: true
}));
app.listen(PORT);
console.log("Server running on localhost:", PORT);