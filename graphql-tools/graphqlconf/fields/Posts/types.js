const typeAuthor = require('../Authors/types');

const Posts = `
    type Posts {
      id: Int!
      title: String
      content: String
      votes: Int
      author: Authors
    }
`;

module.exports = () => [Posts, typeAuthor]
