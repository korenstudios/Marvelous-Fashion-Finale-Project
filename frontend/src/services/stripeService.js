import httpService from "./httpService";
import config from "../config.json";

export function paymentSuccess(stripeToken, total) {
  return httpService.post(`${config.apiUrl}/stripe`, {
    tokenId: stripeToken,
    amount: total * 100,
  });
}

export function userPaymentsHistory() {
  return httpService.get(`${config.apiUrl}/users/history/stripe`);
}

export function paymentsHistory() {
  return httpService.get(`${config.apiUrl}/stripe`);
}

const stripeService = {
  paymentSuccess,
  paymentsHistory,
  userPaymentsHistory,
};

export default stripeService;
