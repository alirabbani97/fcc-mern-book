
import express from "express";
import { Book } from "../models/bookModel.js";

    const router = express.Router();

    /* Route for Posting Book to database */
  router.post("/", async (request, response) => {
    try {
      if (
        !request.body.title |
        !request.body.author |
        !request.body.publishYear
      ) {
        return response.status(400).send({
          message: "Send all required fields: title, author, publishYear.",
        });
      }
      const newBook = {
        title: request.body.title,
        author: request.body.author,
        publishYear: request.body.publishYear,
      };
      const book = await Book.create(newBook);
  
      return response.status(201).send(book);
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  
  /* Route for Get All Books from database */
  router.get("/", async (request, response) => {
    try {
      const books = await Book.find({});
  
      return response.status(200).json({
        count: books.length,
        data: books,
      });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  
  /* Route for Get One Book from database */
  router.get("/:id", async (request, response) => {
    try {
      const { id } = request.params;
      const book = await Book.findById(id);
  
      return response.status(200).json({
        data: book,
      });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  
  /* Route for Update One Book from database */
  router.put("/:id", async (request, response) => {
    try {
      const { id } = request.params;
      const result = await Book.findByIdAndUpdate(id, request.body);
  
      if (!result) {
        return response.status(404).json({ message: "Book Not Found" });
      }
  
      return response.status(200).send("Book Updated Successfully");
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  
  /* Route to Delete a Book from Database */
  
  router.delete("/:id", async (request, response) => {
    try {
      const { id } = request.params;
  
      const result = await Book.findByIdAndDelete(id);
  
      if (!result) {
        return response.status(404).send("Book not Found");
      }
      return response.status(200).json({ message: "Book Deleted Successfully" });
    } catch (error) {
      console.log(error);
      response.status(500).send({ message: error.message });
    }
  });

  export default router