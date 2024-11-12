// src/index.ts
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import apiRouter from "./api";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import path from "path";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.get("/", (_req: Request, res: Response) => {
  res.redirect("http://localhost:3000");
});

app.use("/api/appd", apiRouter);
if (fs.readFileSync(path.join(__dirname, "../app-directory.json")))
  app.use(
    "/docs",
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
