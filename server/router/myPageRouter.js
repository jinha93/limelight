const express = require("express");
const router = express.Router();

const middleware = require("../middleware/testMiddleware");
const myPageController = require("../controller/myPageController");

router
  .route("/getUserUseHisList")
  .get(middleware.test, myPageController.getUserUseHisList);

module.exports = router;
