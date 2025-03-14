import { Slider } from "../models/slider.model.js";
import { apiErroResponse, apiSuccessResponse } from "../utils/helpers.js";
import mongoose from "mongoose";
export const addSlider = async (req, res) => {
  const { heading,  product_id } = req.body;
  if (!heading) {
    return apiErroResponse(res, 400, "Heading is required.");
  }
  if (!product_id) {
    return apiErroResponse(res, 400, "Product id is required.");
  }
  try {
    const sliderCount = await Slider.countDocuments();
    if (sliderCount >= 5) {
      const oldestSlider = await Slider.findOne().sort({ createAt: 1 });
      if (oldestSlider) {
        await Slider.findByIdAndDelete(oldestSlider._id);
      }
    }
    const newSlider = new Slider(req.body);
    await newSlider.save();
    return apiSuccessResponse(res, 200, "Slider has been added.", newSlider);
  } catch (e) {
    console.log(e);
    return apiErroResponse(res, 500, "Internal server error.");
  }
};

export const updateSlider = async (req, res) => {
  const sliderId = req.params.id;
  const { heading, product_id } = req.body;
  if (!heading) {
    return apiErroResponse(res, 400, "Heading is required.");
  }
  if (!product_id) {
    return apiErroResponse(res, 400, "Product id is required.");
  }
  if (sliderId && !mongoose.Types.ObjectId.isValid(sliderId)) {
    return apiErroResponse(res, 400, "Invalid slider id.");
  }
  try {
    const sliderUpdate = await Slider.findByIdAndUpdate(sliderId, req.body, {
      new: true,
      runValidators: true,
    });
    if (!sliderUpdate) {
      return apiErroResponse(res, 400, "Slider does not exists.");
    }
    return apiSuccessResponse(
      res,
      200,
      "Slider updated successfully.",
      sliderUpdate
    );
  } catch (e) {
    console.log(e);
    return apiErroResponse(res, 500, "Internal server error.");
  }
};

export const deleteSlider = async (req, res) => {
  const sliderId = req.params.id;
  if (sliderId && !mongoose.Types.ObjectId.isValid(sliderId)) {
    return apiErroResponse(res, 400, "Invalid slider id.");
  }
  try {
    const deleteSlider = await Slider.findByIdAndDelete(sliderId);
    if (!deleteSlider) {
      return apiErroResponse(res, 400, "Return does not exists.");
    }
    return apiSuccessResponse(res, 200, "Slider has been deleted.");
  } catch (e) {
    console.log(e);
    return apiErroResponse(res, 400, "Internal server error.");
  }
};

export const getSlider = async (req, res) => {
  try {
    const slider = await Slider.find().populate("product_id");
    return apiSuccessResponse(res, 200, "Slider fetched successfully.", slider);
  } catch (e) {
    console.log(e);
    return apiErroResponse(res, 500, "Internal server error.");
  }
};
