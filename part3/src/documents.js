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
    `,
    forceFetch: true
}

export const createProduct = (variables) => {
     return {
       mutation: gql`
          mutation addProduct($name: String, $price: Int, $category: [String]) {
            addProduct(
                name: $name,
                price: $price,
                category: $category
            ) {
              _id
              name
              price
              category
            }
          }
      `,
    variables: variables
  }
}

export const deleteProduct = (variables) => {
  return {
    mutation: gql`
      mutation ($id: String!) {
        deleteProduct(id: $id) {
            _id
            name
            price
            category
          }
        }
      `,
    variables: variables
  }
}