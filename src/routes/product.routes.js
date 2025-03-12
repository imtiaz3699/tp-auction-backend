import e from "express";
import {
  addProduct,
  deleteProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
} from "../controllers/product.controller.js";
const router = e.Router();
router.post("/add-product", addProduct);
router.get("/get-product", getProducts);
router.put("/update-product/:id", updateProduct);
router.delete("/delete-product/:id", deleteProduct);
router.get("/get-single-product/:id", getSingleProduct);
export default router;
