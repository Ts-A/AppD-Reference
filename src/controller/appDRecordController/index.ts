import { Request, Response } from "express";
import path from "path";
import fs from "fs";
import { AppDError } from "../../util/Error";
import axios from "axios";

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

export const getAppDRecordByIdFromGlobal = async (
  req: Request,
  res: Response,
  { id, fqdn }: { id: string; fqdn: string }
) => {
  try {
    const configFilePath = path.join(
      __dirname,
      "../../../",
      "appD.config.json"
    );
    const fileContent = JSON.parse(
      fs.readFileSync(configFilePath, { encoding: "utf-8" })
    );
    const instances = fileContent["instances"];
    if (!instances || !instances[fqdn])
      throw new AppDError(
        `${fqdn} domain is not found. Make sure to add it in the appD.config.json`,
        400
      );

    const responseFromGlobalInstance = await axios.get(
      instances[fqdn] + req.baseUrl + "/" + id
    );

    if (responseFromGlobalInstance.status !== 200)
      throw new AppDError(responseFromGlobalInstance.data.message, 400);

    res.status(200).json(responseFromGlobalInstance.data);
  } catch (error) {
    if (error instanceof AppDError) {
      res
        .status(error.statusCode)
        .json({ message: error.message, code: error.statusCode });
      return;
    }

    res.status(400).json({ error: "Something went wrong" });
  }
};

export const getAppDRecordById = (req: Request, res: Response) => {
  try {
    let appId = req.params.appId;

    if (appId.includes("@")) {
      const [id, fqdn] = appId.split("@");
      getAppDRecordByIdFromGlobal(req, res, { id, fqdn });
      return;
    }

    const pathToFile = path.join(_appsURL, appId + ".json");

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
