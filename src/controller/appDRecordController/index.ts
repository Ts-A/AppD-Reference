import { Request, Response } from "express";
import path from "path";
import fs from "fs";
import { AppDError } from "../../util/Error";
import axios from "axios";
import jwt from "jsonwebtoken";

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

export const getAppDRecordIntentsFromGlobal = async (
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
      instances[fqdn] + req.baseUrl + "/" + id + "/intents"
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

const isAuthorized = async (appId: string, authToken: string | undefined) => {
  const configFilePath = path.join(__dirname, "../../../", "appD.config.json");
  if (!fs.existsSync(configFilePath)) return true;
  const fileContent = JSON.parse(
    fs.readFileSync(configFilePath, { encoding: "utf-8" })
  );
  const protectedFiles = fileContent["appd_record_protection"];
  if (!protectedFiles) return true;
  const index = protectedFiles.findIndex(
    (params: any) => params.appId === appId
  );
  if (index === -1) return true;
  const { roles, secret } = protectedFiles[index];
  if (!roles || !secret) return true;
  try {
    if (!authToken) return false;
    const split = authToken.split("Bearer ");
    if (split.length == 1) return false;
    const token = split[1];
    const decoded: any = jwt.verify(token, secret);
    if (roles.includes(decoded["role"])) return true;
    else return false;
  } catch (error) {
    return false;
  }
};

export const getAppDRecordById = async (req: Request, res: Response) => {
  try {
    let appId = req.params.appId.toLowerCase();

    if (appId.includes("@")) {
      const [id, fqdn] = appId.split("@");
      getAppDRecordByIdFromGlobal(req, res, { id, fqdn });
      return;
    }

    const pathToFile = path.join(_appsURL, appId + ".json");

    if (!fs.existsSync(pathToFile)) throw new AppDError("Invalid app id", 400);

    // check for authorization access
    if (!(await isAuthorized(appId, req.headers["authorization"])))
      throw new AppDError("Unauthorized", 403);

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

export const getAppDRecordIntents = async (req: Request, res: Response) => {
  try {
    let appId = req.params.appId.toLowerCase();

    if (appId.includes("@")) {
      const [id, fqdn] = appId.split("@");
      getAppDRecordByIdFromGlobal(req, res, { id, fqdn });
      return;
    }

    const pathToFile = path.join(_appsURL, appId + ".json");

    if (!fs.existsSync(pathToFile)) throw new AppDError("Invalid app id", 400);

    // check for authorization access
    if (!(await isAuthorized(appId, req.headers["authorization"])))
      throw new AppDError("Unauthorized", 403);

    const fileContent = JSON.parse(
      fs.readFileSync(path.join(pathToFile), { encoding: "utf-8" })
    );
    const intents = fileContent?.interop?.intents || [];
    res.status(200).json({ appId, intents });
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

export const createAppDRecord = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const { appId, name, manifest, manifestType, title } = req.body;
    if (!appId || !name || !manifest || !manifestType || !title)
      throw new AppDError(
        "One or more mandatory fields missing: appId, name, manifest, manifestType, title",
        400
      );
    const existingIndex = fs
      .readdirSync(_appsURL)
      .map((fileName) => path.join(_appsURL, fileName))
      .filter((filePath) => {
        return fs.lstatSync(filePath).isFile();
      })
      .findIndex((filePath: string) => {
        const fileContent = JSON.parse(
          fs.readFileSync(filePath, { encoding: "utf-8" })
        );
        return fileContent["appId"] === appId;
      });
    if (existingIndex !== -1) throw new AppDError("Enter a unique appId", 400);

    // TODO: Can add validation
    fs.writeFileSync(
      path.join(_appsURL, appId + ".json"),
      JSON.stringify(req.body),
      {
        encoding: "utf-8",
      }
    );

    res.status(201).json({ message: "success" });
  } catch (error: any) {
    console.log(error);
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
