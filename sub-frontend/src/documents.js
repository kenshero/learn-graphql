import gql from 'graphql-tag'

export const getPostsQuery = (variables) => {
  return {
    query : gql`
      query($offset: Int, $limit: Int){
        posts(
              offset: $offset
              limit: $limit
            ) {
          postData {
            id
            title
          }
          postPageInfo {
            offset
            limit
            pageRange
          }
        }
      }
    `,
    variables: variables,
    forceFetch: true
  }
}

export const upVotePost = (variables) => {
     return {
       mutation: gql`
          mutation upvotePost($postID: Int!) {
            upvotePost(
                postID: $postID
            ) {
              id
              title
              votes
            }
          }
      `,
    variables: variables
  }
}
