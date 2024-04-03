const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const bodyParser = require('body-parser');
const router = express.Router();

router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());

router.post("/signupuser",authController.signUpSeeker);
router.route("/updateUser").patch(authController.protect,userController.updateUserProfile).delete(authController.protect,userController.deleteUserProfile);

module.exports = router;