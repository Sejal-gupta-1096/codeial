//1)Getting Router Module
const express = require("express");
const router = express.Router();
const passport = require("passport");

//2)Handling /users/profile request by firing usersController
const usersController = require("../controllers/users_controller");

router.get("/profile", passport.checkAuthentication, usersController.profile);
router.post(
  "/update",
  passport.checkAuthentication,
  usersController.update
);

//3)Handling /users/sign-up ans sign-in request
router.get("/sign-up", usersController.sign_up);
router.get("/sign-in", usersController.sign_in);

router.post("/create", usersController.create_user);

router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/users/sign-in" }),
  usersController.createSession
);

router.get("/sign-out", usersController.destroySession);

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/users/sign-in",
  }),
  usersController.createSession
);

module.exports = router;
