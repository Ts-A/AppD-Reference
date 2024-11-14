// src/index.ts
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import apiRouter from "./api";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import path from "path";
import axios from "axios";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get("/", async (req: Request, res: Response) => {
  try {
    const response = await axios.get("http://localhost:3000/ping");
    if (response.status !== 200) {
      throw new Error("No UI catalog found.");
    }
    res.redirect("http://localhost:3000");
  } catch (error: any) {
    res.status(200).json({
      message: "ok",
      details: "No UI Catalog found.",
    });
  }
});

app.use("/api/appd", apiRouter);

app.use(
  "/docs",
  (_req: Request, res: Response, next: any) => {
    if (fs.readFileSync(path.join(__dirname, "../app-directory.json")))
      return next();
    res.status(400).json({
      message:
        "No docs setup. Consider adding app-directory.json in the root directory.",
    });
  },
  swaggerUi.serve,
  swaggerUi.setup(
    JSON.parse(
      fs.readFileSync(path.join(__dirname, "../app-directory.json"), {
        encoding: "utf-8",
      })
    )
  )
);

app.all("*", (_req: Request, res: Response) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(port, () => {
  console.log(
    `Running AppD Reference Server Implementation on http://localhost:${port}`
  );
});
