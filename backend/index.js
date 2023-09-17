import express from "express";
import { PORT, MONGODBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";
const app = express();

//Middleware for parsing request body
app.use(express.json());

//Option 1: Allow All Origins with Default of cors(*)
app.use(cors());

//Option 2: Allow Custom Origins
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

app.get("/", (req, res) => {
  console.log("req : ", req);
  return res.status(234).send("Welcom to Book Store");
});

app.use("/books", booksRoute);

//Connecting MongoDB
mongoose
  .connect(MONGODBURL)
  .then(() => {
    console.log(`App connected to db`);
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
