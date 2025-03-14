import { Bid } from "../models/bid.model.js";
import { bidServices } from "../services/services.js";
import { apiErroResponse } from "../utils/helpers";


export const addBid = async (res,req) => {
    const {user_id,auction_id,bid_amount,lot_id} = req.body;
    const check = bidServices(req.body);
    if(check) {
        return apiErroResponse(res,400,check);
    }
    try {
         const bid = new Bid (user_id)
    }catch (e) {
        console.log(e);
        return apiErroResponse(res,500,'Internal server error.')
    }
}