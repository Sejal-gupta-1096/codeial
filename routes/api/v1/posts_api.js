const express = require("express");
const router = express.Router();
const postsAPIController = require("../../../controllers/api/v1/posts_api_controller");

router.get("/" , postsAPIController.index);
router.delete("/:id" , postsAPIController.deletePost);

module.exports = router;