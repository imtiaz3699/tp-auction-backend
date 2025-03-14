export const userServices = (keys) => {
  const { email, password } = keys;
  if (!email) {
    return "Email is required.";
  }
  if (!password) {
    return "Password is required.";
  }
};

export const productServices = (keys) => {
  const { product_name, price, gender, category_id } = keys;
  if (!product_name) {
    return "Product name is required.";
  }
  if (!price) {
    return "Please add a price of product.";
  }
  if (!gender) {
    return "Please select a gender.";
  }
  if (!category_id) {
    return "Category id is required.";
  }
};

export const auctionServices = (keys) => {
  const { title, description, auction_img, start_date, lots } = keys;
  if (!title) {
    return "Title is required.";
  }
  if (!start_date) {
    return "Start date is required.";
  }
  if (!lots && !lots?.length) {
    return "Please select at least one lot.";
  }
};

export const bidServices = (keys) => {
  const { user_id, auction_id, bid_amount, lot_id } = keys;
  if (!user_id) {
    return "User id is required.";
  }
  if (!auction_id) {
    return "Auction id is required.";
  }
  if (!bid_amount) {
    return "Bid amount is required.";
  }
  if (!lot_id) {
    return "Lot id is required.";
  }
};
