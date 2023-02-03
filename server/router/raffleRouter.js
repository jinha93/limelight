const express = require('express');
const router = express.Router();

const middleware = require("../middleware/testMiddleware");
const raffleController = require("../controller/raffleController");

router.route('/').get(middleware.test, raffleController.findAll);

module.exports = router;