import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GlobalState } from "./common/globalState";
import OrderHistory from "./orderHistory";

const PaypalOrderDetails = () => {
  const state = useContext(GlobalState);
  const [paypalOrderHistory] = state.usersApi.paypalOrderHistory;
  const [paypalOrderDetails, setPaypalOrderDetails] = useState([]);

  const params = useParams();

  useEffect(() => {
    if (params.id) {
      paypalOrderHistory.forEach((item) => {
        if (item._id === params.id) {
          setPaypalOrderDetails(item);
        }
      });
    }
  }, [params.id, paypalOrderHistory]);

  if (paypalOrderDetails.length === 0) {
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
            <th>Country Code</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{paypalOrderDetails.address.recipient_name}</td>
            <td>
              {paypalOrderDetails.address.line1 +
                " - " +
                paypalOrderDetails.address.city}
            </td>
            <td>{paypalOrderDetails.address.postal_code}</td>
            <td>{paypalOrderDetails.address.country_code}</td>
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
          {paypalOrderDetails.cart.map((item) => (
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

export default PaypalOrderDetails;
