import express from "express";
import { port, mongodbURL } from "./config.js";
import mongoose from "mongoose";

const app = express();

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome to MERN Stack Tutorial");
});


mongoose
  .connect(mongodbURL)
  .then(() => {
    console.log('App connected to DB')
    app.listen(port, () => {
      console.log(`App is listening to port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
