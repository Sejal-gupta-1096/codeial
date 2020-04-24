//1)Getting Router Module
const express = require("express");
const router = express.Router();

//3)Handling / request by firing homeController
const homeController = require("../controllers/home_controller");
router.get("/" , homeController.home);

 //4)Handling /user request by first requiring users module and then firing the request asked (/user/request)
 router.use("/users" , require("./users"));


//2)Exporting the router module
module.exports = router;