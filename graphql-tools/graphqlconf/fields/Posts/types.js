const typeAuthor = require('../Authors/types');

const PostsData = `
    type PostsData {
      postData: [Posts]
      postPageInfo: PostPageInfo
    }
`;

const Posts = `
    type Posts {
      id: String
      title: String
      content: String
      votes: Int
      author: Authors
    }
`;

const PostPageInfo = `
    type PostPageInfo {
      offset: Int
      limit: Int
      pageRange: Int
    }
`;

module.exports = () => [PostsData, Posts, PostPageInfo, typeAuthor]
