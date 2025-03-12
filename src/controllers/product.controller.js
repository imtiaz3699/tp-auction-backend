import Product from "../models/product.model.js";
import { productServices } from "../services/services.js";
import { apiErroResponse, apiSuccessResponse } from "../utils/helpers.js";

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
  const check = productServices(req.body);
  if (check) {
    return apiErroResponse(res, 400, check);
  }
  try {
  } catch (e) {
    console.log(e);
    return apiErroResponse()
  }
};
