import express from 'express';
import { addAuction, deleteAllAuction, getAllAuctions, updateAuction } from '../controllers/auction.controller.js';
const router = express.Router();
router.post("/add-auction",addAuction)
router.put("/update-auction/:id",updateAuction)
router.get("/get-all-auctions",getAllAuctions)
router.delete("/delete-auctions",deleteAllAuction)
export default router;