import express from "express";
import { client, database } from "../core/const";
import bodyParser from "body-parser";
import { ObjectId } from "mongodb";

const collection = database.collection("admissions");
const router = express.Router();
const jsonParser = bodyParser.json();

router.get("/:patientId/last", async (req, res) => {
  await client.connect();
  const result = await collection
    .find({ patientId: req.params.patientId })
    .sort({ date: -1 })
    .toArray();
  if (result) {
    res.status(200).send(result);
  } else {
    res.status(404).send("Aucune admission disponible");
  }
});

router.post("/create", jsonParser, async (req, res) => {
  try {
    await client.connect();
    const result = await collection.insertOne(req.body);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.put("/:id/close", jsonParser, async (req, res) => {
  try {
    await client.connect();
    const result = await collection.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { status: "closed" } }
    );
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

export default router;
