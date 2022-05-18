export default {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://127.0.0.1:27017/etsyclone',
    connectionOptions: { maxPoolSize: 5, useNewUrlParser: true, useUnifiedTopology: true },
  },
};
