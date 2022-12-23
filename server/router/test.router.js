const express = require('express');
const router = express.Router();

const middleware = require("../middleware/test.middleware");
const test = require("../controller/test.controller");

router.route('/test').get(middleware.test, test.test_api);

module.exports = router;