import express from 'express';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';
import { createServer } from 'http';
import { ApolloServer } from 'apollo-server-express';
import config from './config';
import {
  typeDefs,
  publicTypeDefs,
  resolvers,
  publicResolvers,
} from './schema/schema';
import upload from './controllers/upload';
import passport from './helpers/passport';

const app = express();
const corsOptions = { origin: '*', exposedHeaders: 'X-Auth-Token' };

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.json({ message: 'Etsy backend server is running' });
});

app.post('/api/upload', passport.authenticate('jwt', { session: false }), upload);

app.use('/api', passport.authenticate('jwt', { session: false }));

app.get('/public/*', (req, res) => {
  const filePath = req.path;
  const fileName = req.params[0];
  const __dirname = path.dirname(fileName);
  res.sendFile(filePath, { root: __dirname });
});

// Connect to MongoDB
mongoose
  .connect(config.mongo.uri, config.mongo.connectionOptions)
  .then(() => {
    console.log('Mongo Connected!');
  })
  .catch((err) => {
    console.log('Cannot connect to the database!', err);
    process.exit();
  });

mongoose.Promise = global.Promise;

const port = 8080;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: (req) => {
    return req;
  },
});

await server.start();

// Apply express middleware.
server.applyMiddleware({
  app,
  path: '/api',
});

const graphServer = new ApolloServer({
  typeDefs: publicTypeDefs,
  resolvers: publicResolvers,
  context: (req) => {
    return req;
  },
});

await graphServer.start();

// Apply express middleware.
graphServer.applyMiddleware({
  app,
  path: '/graph',
});

const httpServer = createServer(app);

httpServer.listen({ port }, () => {
  console.log(`🚀 Server ready at http://localhost:${port}/api`);
  console.log(`🚀 Public Server ready at http://localhost:${port}/graph`);
});
