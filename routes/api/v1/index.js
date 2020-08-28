const express = require("express");
const router = express.Router();

router.use("/posts" , require("./posts_api"));
router.use("/users" , require("./users_api"));

module.exports = router;