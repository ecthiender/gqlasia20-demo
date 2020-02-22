0. create the schema:

```sql
create table
```

1. npm init -y

2. npm i node-postgres apollo-server graphql

3. create schema.js with the following:

```graphql
const { gql } = require('apollo-server');

const typeDefs = gql`
  type Artist {
      id: Int!
      name: String!
      google_id: String!
      albums: [Album!]!
    }

  type Album {
      id: Int!
      title: String!
      artist_id: Int!
      tracks: [Track]!
  }

  type Track {
      id: Int!
      title: String!
      duration: Int!
      album_id: Int!
      album: Album!
  }

  type Query {
    getArtist(id: Int): Artist
    getTrack(id: Int): Track
  }
`;

module.exports = typeDefs;
```

4. create the index.js file

```graphql
const {ApolloServer} = require('apollo-server');
const typeDefs = require('./schema.js');
const resolvers = require('./resolvers.js');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: (ctx) => { return {google_id: ctx.req.headers.google_id}; }
});

server
  .listen()
  .then(({ url }) => console.log('Server is running on localhost:4000'));
```
