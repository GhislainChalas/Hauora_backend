import express from "express";
import { client, database } from "../core/const";
import bodyParser from "body-parser";

const collection = database.collection("consultations");
const router = express.Router();
const jsonParser = bodyParser.json();

router.get("/:patientId", async (req, res) => {
  await client.connect();
  const result = await collection
    .find({ patientId: req.params.patientId })
    .sort({ date: -1 })
    .toArray();
  if (result) {
    res.status(200).send(result);
  } else {
    res.status(404).send("Aucune consultation disponible");
  }
  await client.close();
});

router.get("/:patientId/last", async (req, res) => {
  await client.connect();
  const result = await collection
    .find({ patientId: req.params.patientId })
    .sort({ date: -1 })
    .limit(5)
    .toArray();
  if (result) {
    res.status(200).send(result);
  } else {
    res.status(404).send("Aucune consultation disponible");
  }
  await client.close();
});

router.post("/create", jsonParser, async (req, res) => {
  await client.connect();
  try {
    const result = await collection.insertOne(req.body);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err);
  } finally {
    await client.close();
  }
});

export default router;
