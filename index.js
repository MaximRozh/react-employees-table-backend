import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { userAuthRouter, emoployeesRouter } from "./routes/index.js";

const app = express();
const PORT = 4444;

app.use(express.json());
app.use(cors());

app.use("/auth", userAuthRouter);
app.use("/employees", emoployeesRouter);

mongoose
  .connect(
    "mongodb+srv://Maxim:qwerty12345@cluster0.wjfjjkf.mongodb.net/employees-table?retryWrites=true&w=majority"
  )
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));
