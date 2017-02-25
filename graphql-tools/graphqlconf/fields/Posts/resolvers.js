const { pubsub } = require('../../subscriptions');

const posts = [
  { id: 1, authorId: 1, title: 'Introduction to GraphQL', votes: 2 },
  { id: 2, authorId: 2, title: 'GraphQL Rocks', votes: 3 },
  { id: 3, authorId: 2, title: 'Advanced GraphQL', votes: 1 },
];

const resolveFunctions = {
  Query: {
    posts() {
      return posts;
    },
    post(_, {postID}){
        return posts.find( (post) => post.id == postID);
    },
    postByAuthor(_, {authorID}) {
        return posts.filter( (post) => post.authorId == authorID);
    }
  },
  Mutation: {
    upvotePost(_, { postID }) {
      const post = posts.find( (post) => post.id == postID );
      if (!post) {
        throw new Error(`Couldn't find post with id ${postID}`);
      }
      post.votes += 1;
      pubsub.publish('postUpvoted', post);
      return post;
    },
  },
  Subscription: {
    postUpvoted(post) {
      console.log(post);
      return post;
    },
  }
};

module.exports = resolveFunctions;