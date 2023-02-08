const express = require('express');
const router = express.Router();

const middleware = require("../middleware/testMiddleware");
const test = require("../controller/testController");

router.route('/test').get(middleware.test, test.test_api);

module.exports = router;