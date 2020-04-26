//1)Getting Router Module
const express = require("express");
const router = express.Router();

//2)Handling /users/profile request by firing usersController
const usersController = require("../controllers/users_controller");

router.get("/profile" , usersController.profile);

//3)Handling /users/sign-up ans sign-in request
router.get("/sign-up" , usersController.sign_up);
router.get("/sign-in" , usersController.sign_in);

router.post("/create" , usersController.create_user);
module.exports = router;