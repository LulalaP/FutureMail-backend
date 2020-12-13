# Future Mail Backend

This is a GraphQL API for Future Mail application. The relative React web app is here: [FutureMail](https://github.com/LulalaP/FutureMail)

## ✔️ Requirements

Node (versions `12.X.X` are tested, but later versions _might_ work as well) and npm. If you haven't installed Node or npm, [nvm](https://github.com/nvm-sh/nvm) is an easy to use tool for installing both. Nvm is also handy if you want to quickly switch between different Node versions.

## 🚀 Getting started

1. Clone this repository and run `npm install` in the ``future-mail-backend`` directory.

3. Create a file `.env` in the `future-mail-backend` directory and copy the contents of the `.env.template` file there. 

4. Run `npm run build`. This will setup the SQLite database and run the migrations.

5. **(Optional)** To populate the database with some seed data you can run `npm run seed:run`. **Note:** running this command will remove all existing data.

6. All done! Just run `npm start` to start the server. After the server has started you should be able to access the GraphQL playground at http://localhost:5001/graphql.

## 🔑 Authorization

To list all the registered users, you can run this query in the GraphQL playground:

```javascript
{
  users {
    edges {
      node {
        username
      }
    }
  }
}
```

You can retrieve an access token by performing the `authorize` mutation:

```javascript
mutation {
  authorize(credentials: { username: "kalle", password: "password" }) {
    accessToken
  }
}
```

All access tokens expire after **seven days**. If you performed step 3. in the "Getting started" section, users "kalle", "elina" and "matti" all have the password "password".

You can also register a new user by performing the `createUser` mutation:

```javascript
mutation {
  createUser(user: { username: "myusername", password: "mypassword" }) {
    id
    username
  }
}
```

### Authorize requests in the GraphQL playground

A handy way to authorize requests in the GraphQL playground is to retrieve an access token using the `authorize` mutation (see above for details) and then add the following in the "HTTP HEADERS" tab below the query editor:

```json
{
  "Authorization": "Bearer <ACCESS_TOKEN>"
}
```

Replace the `<ACCESS_TOKEN>` part with your access token.

## 📖 Documentation

GraphQL playground offers documentation on how to use the API. Start the server by running `npm start`, open the GraphQL playground at http://localhost:5000/graphql and click the "docs" tab.

## 🐛 Found a bug?

Submit an issue with the bug description and a way to reproduce the bug. If you have already come up with a solution, we will gladly accept a pull request.

## ❓ FAQ

- **How to reset the database?** If you are absolutely sure that you want to remove _all_ the existing data, just remove the `database.sqlite` file in the `future-mail-backend` directory and run `npm run build`. You can run `npm run seed:run` to initialize the new database with seed data.

- **Is this production ready?** Almost. The current version of the API utilizes the SQLite database, which is not quite suitable for production. Luckily, all database queries are performed with [Objection](https://vincit.github.io/objection.js/) ORM, and changing the underlying database driver is just a matter of [configuration](http://knexjs.org/#Installation-client).
