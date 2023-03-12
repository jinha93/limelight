const express = require("express");
const router = express.Router();

const middleware = require("../middleware/authMiddleware");
const myPageController = require("../controller/myPageController");

router.route("/getUserUseHisList").get(middleware.authChecker, myPageController.getUserUseHisList);
router.route("/getUserInfo").get(middleware.authChecker, myPageController.getUserInfo);
router.route("/userInfoRegister").post(middleware.authChecker, myPageController.userInfoRegister)

module.exports = router;
