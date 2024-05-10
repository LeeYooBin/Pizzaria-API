import { Router } from "express";
import swaggerUI from "swagger-ui-express";
const swaggerDocument = require("../../swagger.json");

const router = Router();

router.use("/api-doc", swaggerUI.serve);
router.get("/api-doc", swaggerUI.setup(swaggerDocument));


export default router;