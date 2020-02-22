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
