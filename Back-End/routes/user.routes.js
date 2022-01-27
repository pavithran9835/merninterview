const express = require("express");
const userRouter = express.Router();
const {
  createUser,
  getUser,
  editUser,
  deleteUser,
  getAllUser,
} = require("../controller/user.controller");

userRouter.route("/create_user").post(createUser);
userRouter.route("/get_user/:id").get(getUser);
userRouter.route("/get_all_user").get(getAllUser);
userRouter.route("/edit_user/:id").put(editUser);
userRouter.route("/delete_user/:id").put(deleteUser);

module.exports = userRouter;
