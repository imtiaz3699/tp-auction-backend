import express from "express";

import { addBid, deleteBid, getAllBids } from "../controllers/bid.controller.js";

const router = express.Router();
router.post("/add-bid",addBid);
router.get("/get-all-bids",getAllBids);
router.delete("/delete-bid",deleteBid);
export default router;