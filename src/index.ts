// src/index.ts
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import apiRouter from "./api";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

app.get("/", (_req: Request, res: Response) => {
  res.redirect("http://localhost:3000");
});

app.use("/api/appd", apiRouter);

app.all("*", (_req: Request, res: Response) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(port, () => {
  console.log(
    `Running AppD Reference Server Implementation on http://localhost:${port}`
  );
});
