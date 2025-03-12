import mongoose from "mongoose";

const lotsSchema = new mongoose.Schema({
    title:String,
    description:String,
    products:[{type:mongoose.Schema.Types.ObjectId,ref:"Product"}]
}, { timestamps: true });
export const Lots = mongoose.model("Lot", lotsSchema);



