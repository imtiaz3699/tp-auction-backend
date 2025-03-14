import { Auctions } from "../models/auction.model.js";
import { Bid } from "../models/bid.model.js";
import { Lots } from "../models/lots.model.js";
import { bidServices } from "../services/services.js";
import { apiErroResponse, apiSuccessResponse } from "../utils/helpers.js";

export const addBid = async (res, req) => {
  const { user_id, auction_id, bid_amount, lot_id } = req.body;
  const check = bidServices(req.body);
  if (check) {
    return apiErroResponse(res, 400, check);
  }
  try {
    const auction = await Auctions.findById(auction_id);
    if (!auction) {
      return apiErroResponse(res, 400, "Auction does not exists.");
    }
    if (auction.status === "upcoming") {
      return apiErroResponse(res, 400, "Auction is not started yet.");
    }
    if (auction.status === "closed") {
      return apiErroResponse(res, 400, "Auction is closed.");
    }
    const highestBid = await Bid.aggregate([
      { $match: { lot_id: lot_id } },
      { $group: { _id: "$lot_id", highestBid: { $max: "$bid_amount" } } },
    ]);
    const lotPrice = await Lots.findById({ lot_id: lot_id }).populate(
      "products"
    );
    if (lotPrice.products[0]?.price > highestBid[0]?.highestBid) {
      return apiErroResponse(
        res,
        400,
        "Bid price must be higher then the product price."
      );
    }
    if (bid_amount <= highestBid[0]?.highestBid) {
      return apiErroResponse(
        res,
        400,
        "Bid amount must be greater than highest bid."
      );
    }
    const bid = new Bid({ user_id, auction_id, bid_amount, lot_id });
    await bid.save();
    return apiSuccessResponse(res, 200, "Bid added successfully.", bid);
  } catch (e) {
    console.log(e);
    return apiErroResponse(res, 500, "Internal server error.");
  }
};

export const getAllBids = async (req, res) => {
  const { page = 1, limit = 10, user_id } = req.query;
  let bids;
  let totalRecords;
  try {
    if (user_id) {
      bids = await Bid.aggregate([
        { $match: { user_id: user_id } },
        { $sort: { bid_amount: -1 } },
      ])
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();
      totalRecords = await Bid.countDocuments({ user_id: user_id });
    } else {
      bids = await Bid.find()
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();
      totalRecords = await Bid.countDocuments();
    }
    const data = {
      data: bids,
      page,
      limit,
      totalRecords,
    };
    return apiSuccessResponse(res, 200, "Bids fetched successfully.", data);
  } catch (e) {
    console.log(e);
    return apiErroResponse(res, 500, "Internal server error.");
  }
};
export const deleteBid = async (req, res) => {
  const { bidId, user_id } = req.body;
  try {
    const bid = await Bid.findById(bidId);
    if (!bid) {
      return apiErroResponse(res, 400, "Bid does not exists.");
    }
    if (bid.user_id !== user_id) {
      return apiErroResponse(
        res,
        400,
        "You are not authorized to delete this bid."
      );
    }
    const deleteBid = await Bid.findByIdAndDelete(bidId);
    if (!deleteBid) {
      return apiErroResponse(res, 400, "Bid does not exists.");
    }
  } catch (e) {
    console.log(e);
    return apiErroResponse(res, 500, "Internal server error.");
  }
};
