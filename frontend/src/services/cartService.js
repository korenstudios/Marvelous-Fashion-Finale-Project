import httpService from "./httpService";
import config from "../config.json";

export function addCart(cart) {
  return httpService.patch(`${config.apiUrl}/cart`, cart);
}

const cartService = {
  addCart,
};

export default cartService;
