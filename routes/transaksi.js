const express = require("express");
const router = express.Router();
const controller = require("../controller/transaksi");
const middleware = require("../middleware/auth")
router.post("/", middleware,controller.createTransaksi);
router.get("/", middleware, controller.getAllTransaksi);
router.get("/:id", middleware, controller.getByIdTransaksi);

module.exports = router;
