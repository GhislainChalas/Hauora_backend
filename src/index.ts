import express from "express";
import cors from "cors";
import UserController from "./controllers/user.controller";
import PatientController from "./controllers/patient.controller";
import AdmissionController from "./controllers/admission.controller";
import { client } from "./core/const";

const app = express();
const port = 3000;

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/users", UserController);
app.use("/patients", PatientController);
app.use("/admissions", AdmissionController);

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
