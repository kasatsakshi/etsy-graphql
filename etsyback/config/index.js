export default {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/etsyclone',
    connectionOptions: { maxPoolSize: 5, useNewUrlParser: true, useUnifiedTopology: true },
  },
};
