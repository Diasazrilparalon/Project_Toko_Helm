const express = require("express");
const router = express.Router();
const controller = require("../controller/helm");
const middleware = require("../middleware/auth")
router.post("/", middleware, controller.createHelm);
router.get("/",  middleware,controller.getAllHelm);
router.get("/:id", middleware, controller.getByIdHelm);

module.exports = router;
