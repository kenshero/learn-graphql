const { PubSub, SubscriptionManager } = require('graphql-subscriptions');
const MyGraphQLSchema = require('./schema');

const pubsub = new PubSub();
const subscriptionManager = new SubscriptionManager({
  MyGraphQLSchema,
  pubsub,
});

module.exports = {
    subscriptionManager,
    pubsub
};