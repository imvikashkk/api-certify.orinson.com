import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import { getCertificateById } from "./controllers/certificate.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// middleware
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
     res.send(`<h1 style="text-align:center; margin-top:20px; font-size:22px; font-weight:700;">Certificate APIs | Orinson Technologies</h1>`)
  });


app.get("/certificate/:cert_id", getCertificateById);


/* Database connection & Server Run */
const mongodb_USER = process.env.mongodb_USER;
const mongodb_PASS = process.env.mongodb_PASS;

(async () => {
    console.log("Connecting...");
    try{
      await mongoose.connect(`mongodb+srv://${mongodb_USER}:${mongodb_PASS}@cluster0.u2bd7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);
      console.log("Connected to Database Successfully !!");
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT} ......................`);
      });
    }catch(error){
      console.log("Error : Database Connection Failed !!");
      console.log("Error: ", error);
    }
  })();