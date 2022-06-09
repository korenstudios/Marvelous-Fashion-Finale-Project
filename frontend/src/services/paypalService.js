import httpService from "./httpService";
import config from "../config.json";

export function paymentSuccess(cart, paymentID, address) {
  return httpService.post(`${config.apiUrl}/paypal`, {
    cart,
    paymentID,
    address,
  });
}

export function userPaymentsHistory() {
  return httpService.get(`${config.apiUrl}/users/history/paypal`);
}

export function paymentsHistory() {
  return httpService.get(`${config.apiUrl}/paypal`);
}

const paypalService = {
  paymentSuccess,
  paymentsHistory,
  userPaymentsHistory,
};

export default paypalService;
