import mongoose from "mongoose";

const sliderSchema = new mongoose.Schema({
  heading: String,
  description: String,
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
});
export const Slider = mongoose.model("Slider", sliderSchema);
