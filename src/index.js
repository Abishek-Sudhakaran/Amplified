import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Amplify from "aws-amplify";
import awsExports from "./aws-exports";
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import AWSAppSyncClient from 'aws-appsync';
import { Rehydrated } from 'aws-appsync-react';
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";

Amplify.configure(awsExports);

const client = new AWSAppSyncClient({
  url: awsExports.aws_appsync_graphqlEndpoint,
  region: awsExports.aws_appsync_region,
  auth: {
    type: awsExports.aws_appsync_authenticationType,
    apiKey: awsExports.aws_appsync_apiKey,
  },
},
  {
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network', // <-- HERE: check the apollo fetch policy options
        errorPolicy: 'ignore'
      },
      query: {
        fetchPolicy: 'cache-and-network',
        errorPolicy: 'all'
      }
    }
  })
ReactDOM.render(
  <ApolloProvider client={client}>
    <ApolloHooksProvider client={client}>
      <Rehydrated>
        <App />
      </Rehydrated>
    </ApolloHooksProvider>

  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
