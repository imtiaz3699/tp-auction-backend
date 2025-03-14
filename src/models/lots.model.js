import mongoose from "mongoose";

const lotsSchema = new mongoose.Schema({
    title:String,
    description:String,
    starting_bid:Number,
    lot_status:{type:String,default:"open"},
    products:[{type:mongoose.Schema.Types.ObjectId,ref:"Product"}]
}, { timestamps: true });
export const Lots = mongoose.model("Lot", lotsSchema);




