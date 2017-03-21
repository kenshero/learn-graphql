import client from './apolloconf'
import { getPostsQuery, upVotePost } from './documents'

let app = new Vue({
  el: '#app',
  data: {
    posts: [],
    pageInfo : {},
    offset: 0,
    activePage: 0,
    limit: 4,
    pageRange: 0,
  },
  methods: {
    getPosts: function() {
      console.log(this.offset)
      const variables = {
        offset: this.offset,
        limit: this.limit
      }
        client.query(getPostsQuery(variables)).then( gqlResult => {
            const {errors, data} = gqlResult
            this.posts = data.posts.postData
            this.pageInfo = data.posts.postPageInfo
        }).catch( (error) => {
            console.error(error)
        });
    },
    upvoted: function(id) {
        const variables = {
            postID: id
        }
        client.mutate(upVotePost(variables)).then( gqlResult => {
            
        }).catch( (error) => {
            console.error(error)
        });
    },
    paging: function(offset, activePage) {
      this.offset = offset 
      this.activePage = activePage 
      this.getPosts()
    }
  }
})

app.getPosts()