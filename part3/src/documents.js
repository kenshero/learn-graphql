import gql from 'graphql-tag'

export const getProductsQuery = {
    query : gql`
      query {
        getProducts {
          _id
          name
          price
          category
        } 
      }
    `
}