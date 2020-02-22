const {ApolloServer} = require('apollo-server');
const typeDefs = require('./schema.js');
const resolvers = require('./resolvers.js');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: (ctx) => { return {session_id: parseInt(ctx.req.headers.session_id, 10)}; }
});

server
  .listen()
  .then(({ url }) => console.log('Server is running on localhost:4000'));
