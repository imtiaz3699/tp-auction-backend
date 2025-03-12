import express from "express";
import {
  addLots,
  deleteLots,
  getLots,
  updateLots,
} from "../controllers/lots.controller.js";
const router = express.Router();
router.post("/create-lot", addLots);
router.put("/update-lot/:id", updateLots);
router.get("/get-lots", getLots);
router.delete("/delete-lots/:id", deleteLots);

export default router;
