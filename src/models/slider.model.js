import mongoose from "mongoose";

const sliderSchema = new mongoose.Schema({
    name:String,
})

export const Slider = mongoose.model("Slider",sliderSchema)