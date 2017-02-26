const express = require('express');
const graphqlHTTP = require('express-graphql');
const { createServer } = require('http');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const app = express();

const PORT = process.env.port || 3000
const WS_PORT = process.env.WS_PORT || 3333;

const MyGraphQLSchema = require('./graphqlconf/schema');
const { subscriptionManager } = require('./graphqlconf/subscriptions');

var cors = require('cors');
app.use(cors())

app.use('/graphql', graphqlHTTP({
  schema: MyGraphQLSchema,
  graphiql: true
}));

app.listen(PORT);
console.log("Server running on localhost:", PORT);

// WebSocket server for subscriptions
const websocketServer = createServer((request, response) => {
  response.writeHead(404);
  response.end();
});

websocketServer.listen(WS_PORT, () => console.log( // eslint-disable-line no-console
  `Websocket Server is now running on ws://localhost:${WS_PORT}`
));

new SubscriptionServer({ subscriptionManager }, {
    server: websocketServer,
    path: '/'
  });
console.log("Grapql Server running");
