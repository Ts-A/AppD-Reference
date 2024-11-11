import { Router } from "express";
import v1Router from "./v1";
import v2Router from "./v2";

const apiRouter = Router();

apiRouter.use("/v1/apps", v1Router);
apiRouter.use("/v2/apps", v2Router);

// Latest Version
apiRouter.use("/", v2Router);

export default apiRouter;
