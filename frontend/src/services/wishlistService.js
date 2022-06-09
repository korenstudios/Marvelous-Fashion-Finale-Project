import httpService from "./httpService";
import config from "../config.json";

export function addWishlist(wishlist) {
  return httpService.patch(`${config.apiUrl}/wishlist`, wishlist);
}

const wishlistService = {
  addWishlist,
};

export default wishlistService;
