import express, { response } from "express";
import { port, mongodbURL } from "./config.js";
import mongoose from "mongoose";
import booksRoutes from "./routes/booksRoutes.js";
import cors from "cors"

const app = express();


//MiddleWare(MW) for parsing resquest body
app.use(express.json());

//MiddleWare(MW) for handling CORS POLICY
//Option1: Allowing all origins with default cors(*)
app.use(cors())

//Option2: Allow custom origins
/* app.use(cors(
  {
    origin: 'http://localhost:3000',
    methods: ['GET' , 'POST' , 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'] 
  }
)) */

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome to MERN Stack Tutorial");
});

app.use("/books", booksRoutes)

mongoose
  .connect(mongodbURL)
  .then(() => {
    console.log("App connected to DB");
    app.listen(port, () => {
      console.log(`App is listening to port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
