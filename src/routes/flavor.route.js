const express = require("express");
const controller = require("../controllers/flavor.controller");
const router = express.Router();

router.get("/findAll", controller.findAllFlavors);
router.get("/find", controller.findFlavorByName);

router.post("/create", controller.createFlavor);

router.put("/update/:id", controller.updateFlavor);

router.delete("/delete/:id", controller.deleteFlavor);

module.exports = router;