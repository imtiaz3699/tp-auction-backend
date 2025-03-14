import { User } from "../models/user.model.js";
import { userServices } from "../services/services.js";
import { apiErroResponse, apiSuccessResponse } from "../utils/helpers.js";
import mongoose from "mongoose";

export const addUser = async (req, res) => {
  const { name, email, password } = req.body;
  const check = userServices(req.body);
  if (check) {
    return apiErroResponse(res, 400, check);
  }
  try {
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      return apiErroResponse(res, 400, "Email already exists.", userExists);
    }
    const newUser = await User({ name, email, password });
    await newUser.save();
    return apiSuccessResponse(res, 200, "User added successfully.", newUser);
  } catch (e) {
    console.log(e);
  }
};

export const updateUser = async (req, res) => {
  const userid = req.params.id;
  const check = userServices(req.body);
  if (check) {
    return apiErroResponse(res, 400, check, null);
  }
  if (userid && !mongoose.Types.ObjectId.isValid(userid)) {
    return apiErroResponse(res, 400, "Invalid user id");
  }
  try {
    const updateUser = await User.findByIdAndUpdate(userid, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updateUser) {
      return apiErroResponse(res, 400, "User does not exists");
    }
    return apiSuccessResponse(
      res,
      200,
      "User updated successfully.",
      updateUser
    );
  } catch (e) {
    console.log(e);
    return apiErroResponse(res, 500, "Internal server error.");
  }
};

export const getUser = async (req, res) => {
  const { userId } = req.query;
  if (userId && !mongoose.Types.ObjectId.isValid(userId)) {
    return apiErroResponse(res, 400, "User ID is invalid.");
  }
  try {
    const user = await User.findById(userId);
    if (!user) {
      return apiErroResponse(res, 404, "User not found.");
    }
    return apiSuccessResponse(res, 200, "User fetched successfully.", user);
  } catch (error) {
    return apiErroResponse(res, 500, "Internal Server Error", error.message);
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const user = await User.find();
    return apiSuccessResponse(res, 200, "User fetched successfully", user);
  } catch (e) {
    console.log(e);
    return apiErroResponse(res, 500, "Internal server error.");
  }
};

export const deleteUser = async (req, res) => {
  const userId = req.params.id;
  if (userId && !mongoose.Types.ObjectId.isValid(userId)) {
    return apiErroResponse(res, 400, "Invalid user id.");
  }
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return apiErroResponse(res, 400, "User does not exists.", null);
    }
    return apiSuccessResponse(res, 200, "User has been deleted successfully.");
  } catch (e) {
    console.log(e);
    return apiErroResponse(res, 500, "Internal server error.");
  }
};
