import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const app = express();
const port = process.env.PORT || 4000;
const apiPrefix = "/api";

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get(`${apiPrefix}/health`, (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = status === 500 ? "Internal Server Error" : error.message;
  if (status === 500) {
    console.error(error);
  }
  res.status(status).json({ error: message });
});

app.listen(port, () => {
  console.log(`API server listening on port ${port}`);
});
