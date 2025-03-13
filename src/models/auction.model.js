import mongoose from 'mongoose';

const auctionSchema = new mongoose.Schema({
    title:String,
    description:String,
    start_date:{ type: Date },
    end_date:{type:Date},
    status:{
        type:String,
        default:"upcoming"
    },
    lots:[{type:mongoose.Schema.Types.ObjectId,ref:"Lot"}]  
})

export const Auctions = mongoose.model("Auction",auctionSchema);