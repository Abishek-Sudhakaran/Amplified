import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Amplify from "aws-amplify";
import awsExports from "./aws-exports";
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from "apollo-link-context";
import AWSAppSyncClient from 'aws-appsync'
import { Rehydrated } from 'aws-appsync-react' // 

Amplify.configure(awsExports);

// const httpLink = createHttpLink({
//   uri: 'http://192.168.1.6:20002/graphql',
//   apiKey: awsmobile.aws_appsync_apiKey
// })
// const authLink = setContext((_, { headers }) => {

//   return {
//     headers: {
//       ...headers,
//       apiKey: awsmobile.aws_appsync_apiKey
//     }
//   };
// });

// const client = new ApolloClient({
//   link:authLink.concat(httpLink) ,
//   cache: new InMemoryCache(),

//   auth: {
//     type: "API_KEY",
//     credentials:awsmobile
//   }
// })
const client = new AWSAppSyncClient({
  url: awsExports.aws_appsync_graphqlEndpoint,
  region: awsExports.aws_appsync_region,
  auth: {
    type: awsExports.aws_appsync_authenticationType,
    apiKey: awsExports.aws_appsync_apiKey,
    // jwtToken: async () => token, // Required when you use Cognito UserPools OR OpenID Connect. token object is obtained previously
  }
})
ReactDOM.render(
  <ApolloProvider client={client}>
    <Rehydrated>
      <App />
    </Rehydrated>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
