import express from "express";
import userRoutes from "./user.routes.js";
import categoryRoutes from './categories.routes.js'
const router = express.Router();

router.use("/user", userRoutes);
router.use("/api/category", categoryRoutes);
export default router;
