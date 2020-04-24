//1)Getting Router Module
const express = require("express");
const router = express.Router();

//3)Handling /users/profile request by firing usersController
const usersController = require("../controllers/users_controller");
router.get("/profile" , usersController.profile);

module.exports = router;