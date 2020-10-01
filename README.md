This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Getting Started with the Amplify Framework

We need to install the Amplify command line tool which is used create and maintain serverless backends on AWS.

**npm install -g @aws-amplify/cli**

Once you have successfully installed it, you need to configure your AWS account

**amplify configure**

amplify configure will ask you to sign into the AWS Console.

Once you’re signed in, Amplify CLI will ask you to create an IAM user.

Specify the AWS Region
? region: # Your preferred region
Specify the username of the new IAM user:
? user name: # User name for Amplify IAM user
Complete the user creation using the AWS console

After creating user,provide the secret access key and access key.

After successful creation of user lets initialize amplify

## Create React App

Use the create-react-app to create the react app.

**:npx create-react-app react-amplified**
cd awsgraphql-react

## Adding GraphQL Backend

Initialize the new amplify project.

**amplify init**

You’ll be prompted for some information about the app.

After initializing open your project folder in your code editor you will see a amplify folder and .amplifyrc 
file is added to your react app.

## Adding API

Run the following command
**amplify add api**

Select the following

? Please select from one of the below-mentioned services (Use arrow keys)
❯ GraphQL
REST

? Please select from one of the below mentioned services GraphQL
? Provide API name: awsgraphqlreact
? Choose an authorization type for the API (Use arrow keys)
❯ API key
? Do you have an annotated GraphQL schema? No
? Do you want a guided schema creation? Yes
? What best describes your project: Single object with fields (e.g., “Todo” with
ID, name, description)
? Do you want to edit the schema now? Yes

Now run the below command to update your backend schema.
**amplify push**

Now a api key and a graphql endpoint are generated.

In frontend use Appolo client for graphql queries.

## Hosting the app

By using amplify-cli we can also host our react app in Aws s3 bucket and CloudFront.

**amplify hosting add**

Select the following from the prompt
eg:
? Select the plugin module to execute Amazon CloudFront and S3
? Select the environment setup: DEV (S3 only with HTTP)
? hosting bucket name reactamplified-20201001015943-hostingbucket
? index doc for the website index.html
? error doc for the website index.html


Now you can now publish your app using the following command:

**amplify publish**

Thank you!
