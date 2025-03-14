import { Auctions } from "../models/auction.model.js";
import { auctionServices } from "../services/services.js";
import { apiErroResponse, apiSuccessResponse } from "../utils/helpers.js";

export const addAuction = async (req, res) => {
  const check = auctionServices(req.body);
  if (check) {
    return apiErroResponse(res, 400, check);
  }
  if (new Date(req.body.start_date) <= new Date()) {
    return apiErroResponse(res, 400, "Auction date must be a future date!");
  }
  req.body.start_date = new Date(req.body.start_date);
  try {
    const auction = await Auctions(req.body);
    await auction.save();
    return apiSuccessResponse(res, 200, "Auction added successfully.", auction);
  } catch (e) {
    console.log(e);
    return apiErroResponse(res, 500, e);
  }
};

export const updateAuction = async (req, res) => {
  const check = auctionServices(req.body);
  if (check) {
    return apiErroResponse(res, 400, check);
  }
  if (new Date(req.body.startDate) <= new Date()) {
    return apiErroResponse(res, 400, "Auction date must be a future date!");
  }
  req.body.start_date = new Date(req.body.start_date);
  try {
    const auction = await Auctions.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!auction) {
      return apiErroResponse(res, 400, "Auction does not exists.");
    }
    return apiSuccessResponse(
      res,
      200,
      "Auction updated successfully.",
      auction
    );
  } catch (e) {
    console.log(e);
    return apiErroResponse(res, 500, "Internal server error.");
  }
};

export const getAllAuctions = async (req, res) => {
  const { page = 1, limit = 10, auctionId } = req.query;
  let auction;
  let totalRecords;
  try {
    if (auctionId) {
      auction = await Auctions.findById(auctionId);
    } else {
      auction = await Auctions.find()
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();
      totalRecords = await Auctions.countDocuments();
    }
    const data = {
      data: auction,
      page,
      limit,
      totalRecords,
    };
    return apiSuccessResponse(res, 200, "Auction fetched successfully.", data);
  } catch (e) {
    console.log(e);
    return apiErroResponse(res, 500, "Internal server error.");
  }
};

export const deleteAllAuction = async (req, res) => {
  const { auctionIds } = req.body;
  if (!auctionIds?.length) {
    return apiErroResponse(res, 400, "Please select an auction.");
  }
  try {
    const deleteAuction = await Auctions.deleteMany({
      _id: { $in: auctionIds },
    });
    if (deleteAuction.deletedCount === 0) {
      return apiErroResponse(res, 400, "Auction does not exists.");
    }
    return apiSuccessResponse(res, 200, "Auction deleted successfully.");
  } catch (e) {
    console.log(e);
    return apiErroResponse(res, 400, "Internal server error.");
  }
};
