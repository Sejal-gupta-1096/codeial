//1)Getting Router Module
const express = require("express");
const router = express.Router();

//3)Getting the controller module
const homeController = require("../controllers/home_controller");
router.get("/" , homeController.home);

//2)Exporting the router module
module.exports = router;