const express = require("express");


const router = express.Router();
const userController = require("../controller/user");

router.route("/adduserquery").post(userController.addUserQuery);
router.route("/updatequery/:id").put(userController.userQueryUpdate);
router.route("/deleteuserquery/:id").delete(userController.deleteUserQuery);
router.route("/alluserquery").get(userController.allUserQuery);
router.route("/userquery").post(userController.userQuery);


module.exports = router;
