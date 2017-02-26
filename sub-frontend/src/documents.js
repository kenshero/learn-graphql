import gql from 'graphql-tag'

export const getPostsQuery = {
    query : gql`
      query {
        posts {
          id
          title
          votes
        } 
      }
    `,
    forceFetch: true
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
