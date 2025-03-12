import Category from "../models/categories.model.js";
import { apiErroResponse, apiSuccessResponse } from "../utils/helpers.js";
import mongoose from "mongoose";

export const createCategory = async (req, res) => {
  const { name, img, description } = req.body;
  if (!name) {
    return apiErroResponse(res, 400, "Name is required.");
  }
  try {
    const categoryExists = await Category.findOne({ name: name });
    if (categoryExists) {
      return apiErroResponse(res, 400, "Category already exists.");
    }
    const newCategory = new Category({ name, img, description });
    await newCategory.save();
    return apiSuccessResponse(
      res,
      200,
      "Category created successfully.",
      newCategory
    );
  } catch (e) {
    console.log(e);
    return apiErroResponse(res, 500, "Internal server error.");
  }
};

export const updateCategory = async (req, res) => {
  const categoryId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(categoryId)) {
    return apiErroResponse(res, 400, "Invalid category Id.");
  }
  const { name, img, description } = req.body;
  if (!categoryId) {
    return apiErroResponse(res, 400, "Please select a category.");
  }
  if (!name) {
    return apiErroResponse(res, 400, "Name is required.");
  }
  try {
    const updateCategory = await Category.findByIdAndUpdate(categoryId, {
      name,
      img,
      description,
    });
    if (!updateCategory) {
      return apiErroResponse(res, 400, "Category does not exists");
    }
    return apiSuccessResponse(res, 200, "Category updated.", updateCategory);
  } catch (e) {
    console.log(e);
    return apiErroResponse(res, 500, "Internal server error.");
  }
};

export const getCategory = async (req, res) => {
  const categoryId = req.query.categoryId;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  if (categoryId && !mongoose.Types.ObjectId.isValid(categoryId)) {
    return apiErroResponse(res, 400, "Invalid category id");
  }
  try {
    const category = categoryId
      ? await Category.findById(categoryId)
      : await Category.find()
          .skip((page - 1) * limit)
          .limit(limit);
    const totalCategories = await Category.countDocuments();
    const data = {
      data: category,
      page: page,
      limit: limit,
      total: totalCategories,
    };
    return apiSuccessResponse(res, 200, "Category fetched successfully.", data);
  } catch (e) {
    console.log(e);
    return apiErroResponse(res, 400, "Internal server error.");
  }
};

export const deleteCategory = async (req, res) => {
  const categoryId = req.params.id;
  try {
    const deleteCategory = await Category.findByIdAndDelete(categoryId);
    if (!deleteCategory) {
      return apiErroResponse(res, 400, "Category does not exists.");
    }
    return apiSuccessResponse(res, 400, "Category deleted successfully.", null);
  } catch (e) {
    return apiErroResponse(res, 500, "Internal server error.");
  }
};
