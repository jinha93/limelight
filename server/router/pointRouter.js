const express = require('express');
const router = express.Router();

const middleware = require("../middleware/testMiddleware");
const pointController = require("../controller/pointController");

router.route('/').get(middleware.test, pointController.getAll);
router.route('/:userId').get(middleware.test, pointController.get);
// router.route('/update/:userId/:paramPoint').get(middleware.test, pointController.update);

module.exports = router;