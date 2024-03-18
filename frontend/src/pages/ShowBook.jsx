import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import { useParams } from "react-router-dom";

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setBook(response.data.data);
        console.log(response.data)
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

    console.log(book)

  return (
    <div className="p-4 w-full">
      <BackButton />
      <h1 className="text-3xl my-4">Show Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className=" flex flex-col border-[4px] rounded-2xl border-spacing-2 p-4 mx-auto border-sky-500 w-fit ">
          <div className="my-4">
            <span className="text-2xl font-semibold text-gray-500 mr-4">Id</span>
            <span className="text-2xl text-gray-500 mx-5">{book._id}</span>
          </div>
          <div className="my-4">
            <span className="text-2xl font-semibold text-gray-500 mr-4">Title</span>
            <span className="text-2xl text-gray-500 mx-5">{book.title}</span>
          </div>
          <div className="my-4">
            <span className="text-2xl font-semibold text-gray-500 mr-4">Author</span>
            <span className="text-2xl text-gray-500 mx-5">{book.author}</span>
          </div>
          <div className="my-4">
            <span className="text-2xl font-semibold text-gray-500 mr-4">Publish Year</span>
            <span className="text-2xl text-gray-500 mx-5">{book.publishYear}</span>
          </div>
          <div className="my-4">
            <span className="text-2xl font-semibold text-gray-500 mr-4">Created At</span>
            <span className="text-2xl text-gray-500 mx-5">{new Date(book.createdAt).toString()}</span>
          </div>
          <div className="my-4">
            <span className="text-2xl font-semibold text-gray-500 mr-4">Updated At</span>
            <span className="text-2xl text-gray-500 mx-5">{new Date(book.updatedAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBook;
