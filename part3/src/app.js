import client from './apolloconf'
import { getProductsQuery, createProduct, deleteProduct} from './documents'

let app = new Vue({
  el: '#app',
  data: {
    prouductName: "",
    prouductPrice: "",
    prouductCategory: "",
    products: []
  },
  methods: {
    getProducts: function() {
        client.query(getProductsQuery).then( gqlResult => {
            const {errors, data} = gqlResult
            this.products = data.getProducts
        }).catch( (error) => {
            console.error(error)
        });
    },
    addProduct: function() {
        const variables = {
            name: this.prouductName,
            price: parseInt(this.prouductPrice),
            category: this.prouductCategory.split(",")
        }
        client.mutate(createProduct(variables)).then( gqlResult => {
            this.getProducts()
        }).catch( (error) => {
            console.error(error)
        });
    },
    deleteProduct: function(productID) {
        const variables = {
            id: productID
        }
        client.mutate(deleteProduct(variables)).then( gqlResult => {
            this.getProducts()
        }).catch( (error) => {
            console.error(error)
        });
    }
  }
})

app.getProducts()