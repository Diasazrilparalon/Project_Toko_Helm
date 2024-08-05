const express = require("express");
const router = express.Router();
const controller = require("../controller/users");
const middleware = require("../middleware/auth")
router.post("/", controller.createUsers);
router.get("/",middleware, controller.getAllUsers);
router.get("/:id", middleware,controller.getByIdUsers);

module.exports = router;
