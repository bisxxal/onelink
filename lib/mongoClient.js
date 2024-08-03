
const { MongoClient, ServerApiVersion } = require("mongodb");


if (!process.env.MONGO_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGO_URI"');
}

const uri = process.env.MONGO_URI;


const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};


let client;
let clientPromise;


if (process.env.NODE_ENV === "development") {
  
  global._mongoClientPromise = global._mongoClientPromise || new MongoClient(uri, options).connect();
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, create new MongoClient instance and connect
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}


module.exports = clientPromise;
