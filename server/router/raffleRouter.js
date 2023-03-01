const express = require('express');
const router = express.Router();

const middleware = require("../middleware/authMiddleware");
const raffleController = require("../controller/raffleController");

router.route('/').get(middleware.authChecker, raffleController.findAll);
router.route('/submit').post(middleware.authChecker, middleware.userWalletChecker, raffleController.submit);

module.exports = router;