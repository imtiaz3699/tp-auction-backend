import express from 'express';
import { addSlider, deleteSlider, getSlider, updateSlider } from '../controllers/slider.controller.js';
const router = express.Router();
router.post("/create-slider",addSlider)
router.put("/update-slider/:id",updateSlider);
router.get("/get-slider",getSlider);
router.delete("/delete-slider/:id",deleteSlider);
export default router;