const express = require('express');
const router = express.Router();

const middleware = require("../middleware/authMiddleware");
const questController = require("../controller/questController");

// router.route('/').get(middleware.authChecker, questController.findAll);
router.route('/').get(questController.findAll);
router.route('/').post(middleware.adminCheck, questController.create);
router.route('/claim').post(middleware.authChecker, questController.claim);

module.exports = router;