//1)Getting Router Module
const express = require("express");
const router = express.Router();

//3)Handling / request by firing homeController
const homeController = require("../controllers/home_controller");
router.get("/" , homeController.home);

 //4)Handling /user request by first requiring users module and then firing the request asked (/user/request)
 router.use("/users" , require("./users"));
 router.use("/posts" , require("./posts"));
 router.use("/comments" , require("./comments"));
 router.use("/api" , require("./api"));
 router.use("/likes" , require("./likes"));
 router.use("/friends" , require("./friends"));
 router.use("/auth" , require("./auth"));

 router.use("/api",require("./api"));

//2)Exporting the router module
module.exports = router;