import { Request, Response, Router } from "express";

const v2Router = Router();

v2Router.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "v2 api" });
});

export default v2Router;
