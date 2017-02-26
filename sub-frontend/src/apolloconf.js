import { SubscriptionClient, addGraphQLSubscriptions} from 'subscriptions-transport-ws';
import ApolloClient, {createNetworkInterface} from 'apollo-client';
import gql from 'graphql-tag'

const networkInterface = createNetworkInterface({ uri: 'http://localhost:3000/graphql'})

const wsClient = new SubscriptionClient('ws://localhost:3333', {
    reconnect: true,
    connectionParams: {
        // Pass any arguments you want for initialization
    }
});

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
    networkInterface,
    wsClient
);

const apolloClient = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions
})

apolloClient.subscribe({
    query: gql`
        subscription postUpvoted {
            postUpvoted {
                id
                title
                votes
            }
        }`,
    variables: {},
    updateQuery: (prev, {subscriptionData}) => {
        console.log(subscriptionData);
        return; // Modify your store and return new state with the new arrived data
    }
});

export default apolloClient