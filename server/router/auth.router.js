const express = require('express');
const router = express.Router();

const middleware = require("../middleware/test.middleware");
const authController = require("../controller/auth.controller");

router.route('/session').get(middleware.test, authController.session);
router.route('/signIn').get(middleware.test, authController.signIn);
router.route('/signOut').get(middleware.test, authController.signOut);

module.exports = router;