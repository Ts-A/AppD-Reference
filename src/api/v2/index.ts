import { Request, Response, Router } from "express";
import path from "path";
import fs from "fs";

const v2Router = Router();

v2Router.get("/:name", (req: Request, res: Response) => {
  try {
    const pathToFile = path.join(
      __dirname,
      "../../../",
      "_apps",
      req.params.name
    );
    res.header("Content-Type", "application/json");

    if (!fs.existsSync(pathToFile)) throw new Error("No such file found");

    return res.sendFile(pathToFile);
  } catch (error) {
    // res.header("Content-Type", "application/json");
    // return res.json({ message: "not found" });
    return res.sendFile("");
  }
});

export default v2Router;
