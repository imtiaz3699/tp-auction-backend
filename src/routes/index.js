import express from "express";
import userRoutes from "./user.routes.js";
import categoryRoutes from './categories.routes.js'
import productRoutes from './product.routes.js'
import sliderRoutes from './slider.routes.js'
const router = express.Router();

router.use("/user", userRoutes);
router.use("/api/category", categoryRoutes);
router.use("/api/product", productRoutes);
router.use("/api/slider", sliderRoutes);
export default router;
