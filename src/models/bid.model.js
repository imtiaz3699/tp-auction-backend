import mongoose from "mongoose";


const bidSchema = new mongoose.Schema({
    user_id:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    auction_id:{type:mongoose.Schema.Types.ObjectId,ref:"Auction"},
    bid_amount:{type:Number},
    bid_date:{type:Date,default:Date.now},
    max_bid:{type:Boolean,default:false},
    lot_id:{type:mongoose.Schema.Types.ObjectId,ref:"Lot"},
})

export const Bid = mongoose.model("Bid",bidSchema);