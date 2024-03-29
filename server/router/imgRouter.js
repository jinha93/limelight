const express = require('express');
const router = express.Router();

const middleware = require("../middleware/testMiddleware");
const imgController = require("../controller/imgController");

router.route('/').get(middleware.test, imgController.get);

module.exports = router;