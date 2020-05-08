const express = require("express");
const router = express.Router();

router.use("/posts" , require("./posts_api"));

module.exports = router;