import express, { response } from "express";
import { port, mongodbURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoutes from "./routes/booksRoutes.js";


const app = express();

app.use(express.json());

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
