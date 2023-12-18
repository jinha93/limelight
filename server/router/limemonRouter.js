const express = require('express');
const router = express.Router();

const middleware = require("../middleware/authMiddleware");
const limemonController = require("../controller/limemonController");

router.route('/').get(limemonController.findAll);
router.route('/equipItems').get(limemonController.findAllEquipItems);
router.route('/:limemonId/levelUp').put(limemonController.levelUp);
router.route('/:limemonId/reset').put(limemonController.reset);

module.exports = router;