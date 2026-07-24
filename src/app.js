import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.status(200).send("curso de node.js");
});

export default app;
