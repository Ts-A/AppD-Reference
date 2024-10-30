import { Request, Response, Router } from "express";

const v1Router = Router();

v1Router.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "v1 api" });
});

export default v1Router;
