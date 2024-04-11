import express from "express";
import cors from "cors";
import AdmissionController from "./controllers/admission.controller";
import ConsultationController from "./controllers/consultation.controller";
import OrganizationController from "./controllers/organization.controller";
import PatientController from "./controllers/patient.controller";
import UserController from "./controllers/user.controller";
import { client } from "./core/const";

const app = express();
const port = 3000;

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/admissions", AdmissionController);
app.use("/consultations", ConsultationController);
app.use("/organizations", OrganizationController);
app.use("/patients", PatientController);
app.use("/users", UserController);

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
