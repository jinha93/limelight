const express = require("express");
const router = express.Router();

const middleware = require("../middleware/authMiddleware");
const myPageController = require("../controller/myPageController");

router.route("/getUserUseHisList").get(middleware.authChecker, myPageController.getUserUseHisList);
router.route("/getUserInfo").get(middleware.authChecker, myPageController.getUserInfo);
router.route("/wallet").put(middleware.authChecker, myPageController.walletUpdate)

module.exports = router;
