import { Lots } from "../models/lots.model.js";
import { apiErroResponse, apiSuccessResponse } from "../utils/helpers.js";

export const addLots = async (req, res) => {
  const { title, description, products } = req.body;
  if (!title) {
    return apiErroResponse(res, 400, "Title is required.");
  }
  try {
    if (!Array.isArray(products) || products?.length === 0) {
      return apiErroResponse(res, 400, "Products IDs are required.");
    }
    const lot = new Lots(req.body);
    await lot.save();
    return apiSuccessResponse(
      res,
      200,
      "Lots has been created successfully.",
      lot
    );
  } catch (e) {
    console.log(e);
    return apiErroResponse(res, 500, "Internal server error.");
  }
};
export const updateLots = async (req, res) => {
  const lotsId = req.params.id;
  const { title, description, products } = req.body;
  if (!title) {
    return apiErroResponse(res, 400, "Title is required.");
  }

  try {
    if (!Array.isArray(products) || products?.length === 0) {
      return apiErroResponse((res, 400, "Products IDs are required."));
    }
    const updateLot = await Lots.findByIdAndUpdate(lotsId, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updateLot) {
      return apiErroResponse(res, 400, "Lot does not exists.");
    }
    return apiSuccessResponse(res, 200, "Lot updated successfully.", updateLot);
  } catch (e) {
    console.log(e);
    return apiErroResponse(res, 200, "Internal server error.");
  }
};

export const getLots = async (req, res) => {
  const lotId = req.query.lotsId;
  const { page = 1, limit = 10 } = req.query;
  let lots;
  let totalLots;
  try {
    if (lotId) {
      lots = await Lots.findById(lotId).populate("products");
    } else {
      lots = await Lots.find()
        .populate("products")
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();
      totalLots = await Lots.countDocuments();
    }
    const data = {
      data: lots,
      page: page,
      limit: limit,
      totalRecords: totalLots,
    };
    return apiSuccessResponse(res, 200, "Lots fetched successfully.", data);
  } catch (e) {
    console.log(e);
    return apiErroResponse(res, 500, "Internal server error.");
  }
};
export const deleteLots = async (req, res) => {
  const lotsId = req.params.id;
  try {
    const deleteLot = await Lots.findByIdAndDelete(lotsId);
    if (!deleteLot) {
      return apiErroResponse(res, 400, "Lot does not exists.");
    }
    return apiSuccessResponse(res, 200, "Lot deleted successfully.");
  } catch (e) {
    console.log(e);
    return apiErroResponse(res, 500, "Internal server error.");
  }
};
