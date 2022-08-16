const { ApolloServer } = require('apollo-server');
const typeDefs = require('./src/schema');
const resolvers = require('./src/resolvers');
const MovieAPI = require('./dataSources/movieAPI');

async function startApolloServer(typeDefs, resolvers) {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        dataSources: () => {
            return {
                movieAPI: new MovieAPI(),
            };
        },
    });

    const { url, port } = await server.listen({ port: process.env.PORT || 4000 });
    console.log(`
      🚀  Server is running
      🔉  Listening on port ${port}
      📭  Query at ${url}
    `);
}

startApolloServer(typeDefs, resolvers);
