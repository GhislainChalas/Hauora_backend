import express from "express";
import cors from "cors";
import { MongoClient, ServerApiVersion } from "mongodb";

const uri =
  "mongodb+srv://admin:dXord4nuDcfRQsy1@cluster-test.97c9j8y.mongodb.net/?retryWrites=true&w=majority";
const app = express();
const port = 3000;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const database = client.db("test");

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", async (req, res) => {
  await client.connect();
  const collection = database.collection("users");
  const result = await collection.find({}).toArray();
  res.send(result);
  await client.close();
});

app.listen(port, () => {
  run().catch(console.dir);
  return console.log(`Express is listening at http://localhost:${port}`);
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
