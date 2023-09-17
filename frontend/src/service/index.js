import axios from "axios";

const BASEURL = "http://localhost:5555";

//Axios Instance
const bookClient = axios.create({
  baseURL: BASEURL,
});

const getResponse = (response) => {
  if (response.status == 200 || response.status == 201) {
    let result = {
      status: true,
      data: response.data,
      error: response.data.message,
    };
    return result;
  } else {
    let result = {
      status: false,
      data: response.data,
      params: response.config ? response.config.params : "",
      error: response.data.message,
    };
    return result;
  }
};

const getAllBooks = async () => {
  const response = await bookClient.get("/books");
  return getResponse(response);
};

const getBookById = async (id) => {
  const response = await bookClient.get(`/books/${id}`);
  return getResponse(response);
};

const createBook = async (data) => {
  const response = await bookClient.post(`/books`, data);
  return getResponse(response);
};

const editBook = async (id, data) => {
  const response = await bookClient.put(`/books/${id}`, data);
  return getResponse(response);
};

const deletBook = async (id) => {
  const response = await bookClient.delete(`/books/${id}`);
  return getResponse(response);
};

export { getAllBooks, getBookById, createBook, editBook, deletBook };
