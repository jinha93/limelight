const express = require('express');
const router = express.Router();

const middleware = require("../middleware/authMiddleware");
const limemonController = require("../controller/limemonController");

router.route('/').get(limemonController.findAll);
router.route('/ownerdItems').get(limemonController.findAllOwnerdItems);
router.route('/item/equip').put(limemonController.equip);
router.route('/item/unequip').put(limemonController.unequip);

module.exports = router;