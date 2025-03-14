import mongoose from "mongoose";

const auctionSchema = new mongoose.Schema({
    title:String,
    description:String,
    auction_img:String,
    start_date:{ type: Date,
        required:true,
        validate:{
            validator:(value)=> {
                const now = new Date();
                return value > now || (value.toDateString() === now.toDateString() && value.getTime() > now.getTime());
            },
            message:"Auction date must be a future date!"
        }
     },
    end_date:{type:Date},
    status:{
        type:String,
        default:"upcoming"
    },
    lots:[{type:mongoose.Schema.Types.ObjectId,ref:"Lot"}]  
});

export const Auctions = mongoose.model("Auction",auctionSchema);