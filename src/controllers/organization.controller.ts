import express from "express";
import { client, database } from "../core/const";
import bodyParser from "body-parser";
import { ObjectId } from "mongodb";

const collection = database.collection("organizations");
const router = express.Router();
const jsonParser = bodyParser.json();

router.get("/list", async (req, res) => {
  await client.connect();
  const result = await collection.find({}).toArray();
  res.send(result);
  await client.close();
});

router.post("/create", jsonParser, async (req, res) => {
  await client.connect();
  try {
    const result = await collection.insertOne(req.body);
    res.status(200).send({ id: result.insertedId });
  } catch (err) {
    res.status(500).send(err);
  } finally {
    await client.close();
  }
});
router.post("/:id", jsonParser, async (req, res) => {
  await client.connect();
  try {
    const result = await collection.findOne({
      _id: new ObjectId(req.params.id),
    });
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err);
  } finally {
    await client.close();
  }
});

export default router;
