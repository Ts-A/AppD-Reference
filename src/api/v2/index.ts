import { Router } from "express";
import { appDRecordController } from "../../controller";

const v2Router = Router();

v2Router.get("/apps/", appDRecordController.getAllAppDRecords);
v2Router.get("/apps/:appId", appDRecordController.getAppDRecordById);

export default v2Router;
