This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

**Getting Started:
we need to install the Amplify command line tool which is used to used to create and maintain serverless backends on AWS.

**npm install -g @aws-amplify/cli

Once you have successfully installed it, you need to configure your AWS account by running the following command.

**amplify configure

amplify configure will ask you to sign into the AWS Console.

Once you’re signed in, Amplify CLI will ask you to create an IAM user.

Specify the AWS Region
? region:  # Your preferred region
Specify the username of the new IAM user:
? user name:  # User name for Amplify IAM user
Complete the user creation using the AWS console

After creating user,provide the secret access key and access key.

After successful creation of user lets initialize amplify

**Create React App
npx create-react-app react-amplified

**Adding GraphQL Backend

**amplify init
Enter the name and others details it asks and profile created in amplify configure

Once you successfully initialized the amplify project Its time to add an AppSync graphql API to our project by running the following command.
 **amplify add api

 ? Please select from one of the below-mentioned services (Use arrow keys)
❯ GraphQL
  REST

Name your GraphQL endpoint and choose authorization type Api key.

? Please select from one of the below mentioned services GraphQL
? Provide API name: awsgraphqlreact
? Choose an authorization type for the API (Use arrow keys)
❯ API key
  Amazon Cognito User Pool

? Do you have an annotated GraphQL schema? No
? Do you want a guided schema creation? Yes
? What best describes your project: Single object with fields (e.g., “Todo” with
 ID, name, description)
? Do you want to edit the schema now? Yes

Now run the below command to update your backend schema.
**amplify push

after push api key and graphql endpoint are generated

Thank you!
