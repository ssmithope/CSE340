import express from "express";
import invController from "../controllers/baseController.js";
import errorController from "../controllers/errorController.js";

const router = express.Router();

router.get("/type/:classificationId", invController.buildByClassificationId);
router.get("/detail/:invId", invController.showVehicleDetail);
router.get("/trigger-error", errorController.throwError);

export default router;
