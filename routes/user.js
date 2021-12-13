const express = require("express");


const router = express.Router();
const userController = require("../controller/user");

router.route("/adduser").post(userController.addUser);
router.route("/update/:id").put(userController.userUpdate);
router.route("/userdetails/:id").get(userController.userDetails);
router.route("/deleteuser/:id").delete(userController.deleteUser);
router.route("/alluser").get(userController.allUser);
router.route("/userquery").post(userController.userQuery);


module.exports = router;
