import client from './apolloconf'
import { getProductsQuery } from './documents'
let app = new Vue({
  el: '#app',
  data: {
    products: [],
  },
  methods: {
    getProducts: function() {
        client.query(getProductsQuery).then( gqlResult => {
            const {errors, data} = gqlResult
            this.products = data.getProducts
        }).catch( (error) => {
            console.error(error)
        });
    }
  }
})
app.getProducts()