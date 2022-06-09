import { useContext, useEffect } from "react";
import { GlobalState } from "./common/globalState";
import paypalService from "../services/paypalService";
import stripeService from "../services/stripeService";
import moment from "moment";
import { Link } from "react-router-dom";

const OrderHistory = () => {
  const state = useContext(GlobalState);
  const [user] = state.usersApi.user;
  const [paypalOrderHistory, setPaypalOrderHistory] =
    state.usersApi.paypalOrderHistory;
  const [stripeOrderHistory, setStripeOrderHistory] =
    state.usersApi.stripeOrderHistory;

  useEffect(() => {
    if (user) {
      const getPaypalOrderHistory = async () => {
        if (user?.isAdmin) {
          const { data } = await paypalService.paymentsHistory();
          setPaypalOrderHistory(data);
        } else {
          const { data } = await paypalService.userPaymentsHistory();
          setPaypalOrderHistory(data);
        }
      };

      getPaypalOrderHistory();
    }
  }, [user, user?.isAdmin, setPaypalOrderHistory]);

  useEffect(() => {
    if (user) {
      const getStripeOrderHistory = async () => {
        if (user?.isAdmin) {
          const { data } = await stripeService.paymentsHistory();
          setStripeOrderHistory(data);
        } else {
          const { data } = await stripeService.userPaymentsHistory();
          setStripeOrderHistory(data);
        }
      };

      getStripeOrderHistory();
    }
  }, [user, user?.isAdmin, setStripeOrderHistory]);

  return (
    <div className="history-page">
      <h2>Order History</h2>

      <h4>You have {paypalOrderHistory.length} ordered.</h4>

      <table>
        <thead>
          <tr>
            <th>Payment ID</th>
            <th>Payment Method</th>
            <th>Date of purchased</th>
          </tr>
        </thead>
        <tbody>
          {paypalOrderHistory.map((item) => (
            <tr key={item._id}>
              <td>{item.paymentID}</td>
              <td>Paypal</td>
              <td>{moment(item.createdAt).format("L")}</td>
              <td>
                <Link to={`/order-history/paypal/${item._id}`}>View</Link>
              </td>
            </tr>
          ))}
          {stripeOrderHistory.map((item) => (
            <tr key={item._id}>
              <td>{item.paymentID}</td>
              <td>Stripe</td>
              <td>{moment(item.createdAt).format("L")}</td>
              <td>
                <Link to={`/order-history/stripe/${item._id}`}>View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderHistory;
