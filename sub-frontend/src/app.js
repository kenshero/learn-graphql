import client from './apolloconf'
import { getPostsQuery, upVotePost } from './documents'

let app = new Vue({
  el: '#app',
  data: {
    posts: []
  },
  methods: {
    getPosts: function() {
        client.query(getPostsQuery).then( gqlResult => {
            const {errors, data} = gqlResult
            this.posts = data.posts
        }).catch( (error) => {
            console.error(error)
        });
    },
    upvoted: function(id) {
        console.log(client)
        const variables = {
            postID: id
        }
        client.mutate(upVotePost(variables)).then( gqlResult => {
            
        }).catch( (error) => {
            console.error(error)
        });
    }
  }
})

app.getPosts()