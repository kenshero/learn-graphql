const { pubsub } = require('../../subscriptions');

const posts = [
  { id: 1, authorId: 1, title: 'Introduction to GraphQL', votes: 2 },
  { id: 2, authorId: 2, title: 'GraphQL Rocks', votes: 3 },
  { id: 3, authorId: 2, title: 'Advanced GraphQL', votes: 1 },
  { id: 4, authorId: 1, title: 'Fucker', votes: 2 },
  { id: 5, authorId: 2, title: 'Fucker FUcck', votes: 3 },
  { id: 6, authorId: 2, title: 'eiei gum', votes: 1 },
  { id: 7, authorId: 1, title: 'jomyut', votes: 2 },
  { id: 8, authorId: 2, title: 'Warrior', votes: 3 },
  { id: 9, authorId: 2, title: 'Samurai', votes: 1 },
  { id: 10, authorId: 1, title: 'Nin Nin', votes: 2 },
  { id: 11, authorId: 2, title: 'GoGo', votes: 3 },
  { id: 12, authorId: 2, title: 'sos', votes: 1 },
];

const resolveFunctions = {
  Query: {
    posts(_, {offset, limit}) {
      let resPost = {
          postData: posts.slice(offset, offset + limit),
          postPageInfo: {
            offset: offset,
            limit: limit,
            pageRange: Math.ceil(posts.length / limit)
          }
        }
      return resPost
    },
    post(_, {postID}){
        return posts.find( (post) => post.id == postID);
    },
    postByAuthor(_, {authorID, offset, limit}) {
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
      return post;
    },
  }
};

module.exports = resolveFunctions;