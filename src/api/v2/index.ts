import { Request, Response, Router } from "express";
import path from "path";
import fs from "fs";

const v2Router = Router();

const _appsURL = path.join(__dirname, "../../../_apps/");

v2Router.get("/", (req: Request, res: Response) => {
  try {
    const files = fs.readdirSync(_appsURL);
    const fileContents = files.map((fileName: string) =>
      JSON.parse(
        fs.readFileSync(path.join(_appsURL, fileName), { encoding: "utf-8" })
      )
    );
    res.status(200).json({ applications: fileContents });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
});

v2Router.get("/:appId", (req: Request, res: Response) => {
  try {
    let appId = req.params.appId;

    if (!appId.endsWith(".json")) appId += ".json";

    const pathToFile = path.join(_appsURL, appId);

    if (!fs.existsSync(pathToFile)) throw new Error("Invalid app id");

    res.setHeader("Content-Type", "application/json");
    res.status(200).sendFile(pathToFile);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
});

export default v2Router;
