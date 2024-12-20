import { Router } from "express";
import { appDRecordController } from "../../controller";

const v2Router = Router();

v2Router.post("", appDRecordController.createAppDRecord);
v2Router.get("/", appDRecordController.getAllAppDRecords);
v2Router.get("/:appId", appDRecordController.getAppDRecordById);
v2Router.get("/:appId/intents", appDRecordController.getAppDRecordIntents);

export default v2Router;
