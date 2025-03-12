import express from "express";
import {
  createCategory,
  deleteCategory,
  getCategory,
  updateCategory,
} from "../controllers/categories.controller.js";
const router = express.Router();

router.post("/create-category", createCategory);
router.put("/update-category/:id", updateCategory);
router.get("/get-category", getCategory);
router.delete("/delete-category/:id", deleteCategory);

export default router;
