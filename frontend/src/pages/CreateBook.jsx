import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createBook } from "../service";
import { BackButton, Spinner } from "../components";
import { enqueueSnackbar } from "notistack";

const CreateBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const navigate = useNavigate();

  const handleSaveBook = async () => {
    setLoading(true);
    const data = {
      title,
      author,
      publishYear,
    };
    const result = await createBook(data);
    console.log("result :", result);
    if (result.status) {
      enqueueSnackbar("Book Created successfully", { variant: "success" });
      navigate("/");
    } else {
      enqueueSnackbar("Error", { variant: "error" });
      console.log("error : ", result);
    }
    setLoading(false);
  };

  const isButtonDisable = () => {
    if (title.length > 0 && author.length > 0 && publishYear > 1200) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  useEffect(() => {
    isButtonDisable();
  }, [title, author, publishYear]);

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Create Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 max-auto">
          <div className="my-4 ">
            <label className="text-xl mr-4 text-gray-500">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-2 border-gray-500 px-4 py-2 w-full"
            />
          </div>
          <div className="my-4 ">
            <label className="text-xl mr-4 text-gray-500">Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="border-2 border-gray-500 px-4 py-2 w-full"
            />
          </div>
          <div className="my-4 ">
            <label className="text-xl mr-4 text-gray-500">Publish Year</label>
            <input
              type="number"
              value={publishYear}
              onChange={(e) => setPublishYear(parseInt(e.target.value))}
              className="border-2 border-gray-500 px-4 py-2 w-full"
            />
          </div>
          <button
            className={`p-2 ${showButton ? `bg-sky-300` : `bg-gray-400`} m-8`}
            disabled={!showButton}
            onClick={() => (showButton ? handleSaveBook() : null)}
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateBook;
