var express = require('express');
var graphqlHTTP = require('express-graphql');
var app = express();
var PORT = process.env.port || 3000
var MyGraphQLSchema = require('./graphql/schema');

app.use('/graphql', graphqlHTTP({
  schema: MyGraphQLSchema,
  graphiql: true
}));

app.listen(PORT);
console.log("Server running on localhost:", PORT);