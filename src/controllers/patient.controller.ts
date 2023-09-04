import { ObjectId } from "mongodb";
import express from "express";
import { client, database } from "../core/const";
import bodyParser from "body-parser";

const collection = database.collection("patient");
const router = express.Router();
const jsonParser = bodyParser.json();

router.get("/:id", async (req, res) => {
  await client.connect();
  const result = await collection.findOne({ _id: new ObjectId(req.params.id) });
  if (result) {
    res.status(200).send(result);
  } else {
    res.status(404).send("Aucun patient identifié");
  }
  await client.close();
});

router.post("/create", jsonParser, async (req, res) => {
  await client.connect();
  try {
    const result = await collection.insertOne(req.body);
    console.log(result);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

export default router;
