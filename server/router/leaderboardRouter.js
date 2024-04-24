const express = require('express');
const router = express.Router();

const middleware = require("../middleware/testMiddleware");
const leaderController = require("../controller/leaderboardController");

router.route('/').get(middleware.test, leaderController.findAll);
router.route('/ranker').get(middleware.test, leaderController.findRanker);
// router.route('/:userId').get(middleware.test, pointController.get);

module.exports = router;