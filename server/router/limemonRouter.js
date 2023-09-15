const express = require('express');
const router = express.Router();

const middleware = require("../middleware/authMiddleware");
const limemonController = require("../controller/limemonController");

router.route('/').get(middleware.authChecker, limemonController.findByUser);

module.exports = router;