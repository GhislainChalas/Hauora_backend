import express from "express";
import { client, database } from "../core/const";

const collection = database.collection("users");
const router = express.Router();

router.get("/list", async (req, res) => {
  await client.connect();
  const result = await collection.find({}).toArray();
  res.send(result);
  await client.close();
});

export default router;
