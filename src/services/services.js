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
  const {
    product_name,
    price,
    gender,
    category_id,
  } = keys;
  if(!product_name) {
    return "Product name is required.";
  }
  if(!price) {
    return "Please add a price of product."
  }
  if(!gender) {
    return "Please select a gender."
  }
  if(!category_id) {
    return "Category id is required."
  }
};
