import { Router } from "express";
import { appDRecordController } from "../../controller";

const v2Router = Router();

v2Router.get("/", appDRecordController.getAllAppDRecords);
v2Router.get("/:appId", appDRecordController.getAppDRecordById);

export default v2Router;
