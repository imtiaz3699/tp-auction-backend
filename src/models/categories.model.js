import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: String,
  img: String,
  description: String,
});

const Category = mongoose.model("Category", categorySchema);
export default Category;
