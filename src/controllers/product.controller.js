import Product from "../models/product.model.js";
import { productServices } from "../services/services.js";
import { apiErroResponse, apiSuccessResponse } from "../utils/helpers.js";
import mongoose from "mongoose";
export const addProduct = async (req, res) => {
  const check = productServices(req.body);
  if (check) {
    return apiErroResponse(res, 400, check);
  }
  try {
    const product = await Product(req.body);
    await product.save();
    return apiSuccessResponse(res, 200, "Product added successfully.");
  } catch (e) {
    console.log(e);
    return apiSuccessResponse(res, 500, "Internal server error.");
  }
};

export const updateProduct = async (req, res) => {
  const productId = req.params.id;
  const check = productServices(req.body);
  if (check) {
    return apiErroResponse(res, 400, check);
  }
  if (!productId) {
    return apiErroResponse(res, 400, "Product id is required.");
  }
  if (check) {
    return apiErroResponse(res, 400, check);
  }
  try {
    const updateProduct = await Product.findByIdAndUpdate(productId, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updateProduct) {
      return apiErroResponse(res, 400, "Product does not exists");
    }
    return apiSuccessResponse(
      res,
      200,
      "Product updated successfully.",
      updateProduct
    );
  } catch (e) {
    console.log(e);
    return apiErroResponse(res, 500, "Internal server error.");
  }
};

export const getProducts = async (req, res) => {
  const { page = 1, limit = 10, categoryId } = req.query;
  let products;
  let totalProducts;
  try {
    if (categoryId) {
      products = await Product.find({ category_id: categoryId })
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();
      totalProducts = await Product.countDocuments({ category_id: categoryId });
    } else {
      products = await Product.find()
        .populate("category_id")
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();
      totalProducts = await Product.countDocuments();
    }
    const data = {
      data: products,
      page: page,
      limit: limit,
      totalRecords: totalProducts,
    };
    return apiSuccessResponse(res, 200, "Product fetched successfully,", data);
  } catch (e) {
    console.log(e);
    return apiErroResponse(res, 500, "Internal server error.");
  }
};

export const deleteProduct = async (req, res) => {
  const productId = req.params.id;
  if (!productId) {
    return apiErroResponse(res, 400, "Product id is required.");
  }
  try {
    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
      return apiErroResponse(res, 400, "Product does not exists.");
    }
    return apiSuccessResponse(res, 200, "Product deleted successfully.");
  } catch (e) {
    console.log(e);
    return apiErroResponse(res, 500, "Internal server error.");
  }
};

export const getSingleProduct = async (req, res) => {
  const productId = req.params.id;
  if (!productId) {
    return apiErroResponse(res, 400, "Product id is required.");
  }
  if (productId && !mongoose.Types.ObjectId.isValid(productId)) {
    return apiErroResponse(res, 400, "Invalid product id");
  }
  try {
    const products = await Product.findById(productId);
    return apiSuccessResponse(
      res,
      200,
      "Product fetched successfully.",
      products
    );
  } catch (e) {
    console.log(e);
    return apiErroResponse(res, 500, "Internal server error.");
  }
};
