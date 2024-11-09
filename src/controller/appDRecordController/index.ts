import { Request, Response, Router } from "express";
import path from "path";
import fs from "fs";
import { AppDError } from "../../util/Error";

const _appsURL = path.join(__dirname, "../../../_apps/");

export const getAllAppDRecords = (_req: Request, res: Response) => {
  try {
    const files = fs
      .readdirSync(_appsURL)
      .map((fileName) => path.join(_appsURL, fileName))
      .filter((filePath) => {
        return fs.lstatSync(filePath).isFile();
      });
    const fileContents = files.map((filePath: string) =>
      JSON.parse(fs.readFileSync(filePath, { encoding: "utf-8" }))
    );
    res.status(200).json({ applications: fileContents });
  } catch (error: any) {
    if (error instanceof AppDError) {
      res
        .status(error.statusCode)
        .json({ message: error.message, code: error.statusCode });
      return;
    }

    res.status(500).json({
      message: error.message,
      code: 500,
    });
    return;
  }
};

export const getAppDRecordById = (req: Request, res: Response) => {
  try {
    let appId = req.params.appId;

    if (!appId || !appId.endsWith(".json")) appId += ".json";

    const pathToFile = path.join(_appsURL, appId);

    if (!fs.existsSync(pathToFile)) throw new AppDError("Invalid app id", 400);

    res.setHeader("Content-Type", "application/json");
    res.status(200).sendFile(pathToFile);
  } catch (error: any) {
    if (error instanceof AppDError) {
      res
        .status(error.statusCode)
        .json({ message: error.message, code: error.statusCode });
      return;
    }

    res.status(500).json({
      message: error.message,
      code: 500,
    });
    return;
  }
};
