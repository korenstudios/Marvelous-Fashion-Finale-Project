import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GlobalState } from "./common/globalState";
import OrderHistory from "./orderHistory";

const StripeOrderDetails = () => {
  const state = useContext(GlobalState);
  const [stripeOrderHistory] = state.usersApi.stripeOrderHistory;
  const [stripeOrderDetails, setStripeOrderDetails] = useState([]);

  const params = useParams();

  useEffect(() => {
    if (params.id) {
      stripeOrderHistory.forEach((item) => {
        if (item._id === params.id) {
          setStripeOrderDetails(item);
        }
      });
    }
  }, [params.id, stripeOrderHistory]);

  if (stripeOrderDetails.length === 0) {
    return <OrderHistory />;
  }

  return (
    <div className="history-page">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Postal Code</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{stripeOrderDetails.address.recipient_name}</td>
            <td>
              {stripeOrderDetails.address.line1 +
                " - " +
                stripeOrderDetails.address.city}
            </td>
            <td>{stripeOrderDetails.address.postal_code}</td>
            <td>{stripeOrderDetails.address.country}</td>
          </tr>
        </tbody>
      </table>

      <table style={{ margin: "30px 0" }}>
        <thead>
          <tr>
            <th></th>
            <th>Products</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {stripeOrderDetails.cart.map((item) => (
            <tr key={item._id}>
              <td>
                <img src={item.image.url} alt={item.title} />
              </td>
              <td>{item.title}</td>
              <td>{item.quantity}</td>
              <td>$ {item.price * item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default StripeOrderDetails;
