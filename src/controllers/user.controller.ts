import express from "express";

const router = express.Router();
export default router;

router.get("/list", (req, res) => {
  res.send("Hello World!");
});
