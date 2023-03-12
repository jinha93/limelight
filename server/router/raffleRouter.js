const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require("path");

const middleware = require("../middleware/authMiddleware");
const raffleController = require("../controller/raffleController");


// 업로드된 파일을 "uploads/" 라는 폴더에 저장함.
// 해당 폴더가 없을 경우 에러 발생.
const storage = multer.diskStorage({
    destination: function (req, res, callback) {
        callback(null, "../client/src/assets/images/raffle");
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, path.basename(file.originalname, ext) + "-" + Date.now() + ext);
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 10} // 10MB로 제한
});

router.route('/').get(middleware.authChecker, raffleController.findAll);
router.route('/submit').post(middleware.authChecker, middleware.userWalletChecker, raffleController.submit);
router.route('/addRaffle').post(middleware.adminCheck, upload.single('image'), raffleController.addRaffle);
router.route('/getWinnerList/:raffleId').get(middleware.adminCheck, raffleController.getWinnerList);


module.exports = router;