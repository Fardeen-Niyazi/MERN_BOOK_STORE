import React, { useState } from "react";
import { BackButton, Spinner } from "../components";
import { useNavigate, useParams } from "react-router-dom";
import { deletBook } from "../service";
import { enqueueSnackbar } from "notistack";
const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDeleteBook = async () => {
    setLoading(true);
    const reslut = await deletBook(id);
    console.log("deleted : ", reslut);
    if (reslut.status) {
      enqueueSnackbar("Book Deleted successfully", { variant: "success" });

      navigate("/");
    } else {
      enqueueSnackbar("Book Created successfully", { variant: "success" });
    }
    setLoading(false);
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Delete Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col items-center border-2 border-sky-500 rounded-xl w[600px] p-8 mx-auto">
        <h3 className="text-2xl">Are You Sure You want to delete this book?</h3>
        <button className="p-4 bg-red-600 text-white m-8 w-full" onClick={handleDeleteBook}>
          Sure,Delete it
        </button>
      </div>
    </div>
  );
};

export default DeleteBook;
