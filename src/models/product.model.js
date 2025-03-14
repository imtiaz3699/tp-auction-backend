import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    product_name: String,
    product_description: String,
    product_images: Array,
    price: {
      type: Number,
      default: 0,
    },
    model: String,
    case_dimension: String,
    model_number: String,
    year: Number,
    movement: String,
    gender: String,
    bezel_material: String,
    service_recommended: Boolean,
    bracelet_material: String,
    manufacturer_warranty: Boolean,
    include_box: Boolean,
    include_papers: Boolean,
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
