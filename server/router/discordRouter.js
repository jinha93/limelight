const express = require('express');
const router = express.Router();

const middleware = require("../middleware/authMiddleware");
const discordController = require("../controller/discordController");

router.route('/roles').get(middleware.adminCheck, discordController.findAllRoles);

module.exports = router;