import { MongoClient, ServerApiVersion } from "mongodb";

const uri =
  "mongodb+srv://admin:dXord4nuDcfRQsy1@cluster-test.97c9j8y.mongodb.net/?retryWrites=true&w=majority";

export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const database = client.db("test");
