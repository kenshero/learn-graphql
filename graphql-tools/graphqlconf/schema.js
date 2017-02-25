const { makeExecutableSchema } = require('graphql-tools');
const typePosts = require('./fields/Posts/types');
const resolverPosts = require('./fields/Posts/resolvers');

const typeAuthors = require('./fields/Authors/types');
const resolverAuthors = require('./fields/Authors/resolvers');

var merge = require('lodash.merge');

const Query = `
  type Query {
    posts: [Posts]
    post(postID: Int!): Posts
    authors: [Authors]
    postByAuthor(authorID: Int!): [Posts]
  }
`;

const Mutation = `
  type Mutation {
    upvotePost (postID: Int!): Posts
  }
`;

const Subscription = `
  type Subscription { postUpvoted: Posts }
`;

const SchemaDefinition = `
  schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
  }
`;

const resolvers = merge(resolverPosts, resolverAuthors);

const MyGraphQLSchema = makeExecutableSchema({
  typeDefs: [SchemaDefinition, Query, Mutation, Subscription, typePosts, typeAuthors],
  resolvers
});

module.exports = MyGraphQLSchema
