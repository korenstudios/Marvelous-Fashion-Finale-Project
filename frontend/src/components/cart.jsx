import { useContext, useState, useEffect } from "react";
import { GlobalState } from "./common/globalState";
import { useNavigate } from "react-router-dom";
import { Close, CreditCard } from "@mui/icons-material";
import cartService from "../services/cartService";
import paypalService from "../services/paypalService";
import PaypalButton from "./paypalButton";
import StripeCheckout from "react-stripe-checkout";
import stripeService from "../services/stripeService";
import { toast } from "react-toastify";
import iconLogo from "../images/icon-logo.png";

const Cart = () => {
  const state = useContext(GlobalState);
  const [cart, setCart] = state.usersApi.cart;
  const [total, setTotal] = useState(0);
  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getTotal = () => {
      const total = cart.reduce((prev, item) => {
        return prev + item.price * item.quantity;
      }, 0);

      setTotal(total);
    };

    getTotal();
  }, [cart]);

  const addToCart = async (cart) => await cartService.addCart({ cart });

  const increment = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity === item.in_stock
          ? (item.quantity = item.in_stock)
          : (item.quantity += 1);
      }
    });

    setCart([...cart]);
    addToCart(cart);
  };

  const decrement = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity === 1 ? (item.quantity = 1) : (item.quantity -= 1);
      }
    });

    setCart([...cart]);
    addToCart(cart);
  };

  const removeProduct = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      cart.forEach((item, index) => {
        if (item._id === id) {
          cart.splice(index, 1);
        }
      });

      setCart([...cart]);
      addToCart(cart);
    }
  };

  const transactionSuccess = async (payment) => {
    const { paymentID, address } = payment;

    try {
      await paypalService.paymentSuccess(cart, paymentID, address);

      setCart([]);
      addToCart([]);
      alert("You have placed an order.");
      navigate("/products");
    } catch ({ response }) {
      if (response && response.status === 400) {
        toast.error(response.data);
      }
    }
  };

  const onToken = (token) => setStripeToken(token);

  useEffect(() => {
    const transactionSuccess = async () => {
      try {
        await stripeService.paymentSuccess(stripeToken.id, total);

        setCart([]);
        addToCart([]);
        alert("You have placed an order.");
        navigate("/products");
      } catch ({ response }) {
        if (response && response.status === 400) {
          toast.error(response.data);
        }
      }
    };

    stripeToken && transactionSuccess();
  }, [stripeToken, total, setCart, navigate]);

  if (cart.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Cart Empty</h2>
      </div>
    );
  }

  return (
    <div>
      {cart.map((product) => (
        <div className="item cart" key={product._id}>
          <img src={product.image.url} alt={product.title} />
          <div className="box-item">
            <h2>{product.title}</h2>
            <h3>$ {product.price * product.quantity}</h3>
            <p>{product.description}</p>
            <p>{product.content}</p>

            <div className="amount">
              <button
                disabled={product.quantity === 1}
                onClick={() => decrement(product._id)}
              >
                -
              </button>
              <span>{product.quantity}</span>
              <button
                disabled={product.quantity === product.in_stock}
                onClick={() => increment(product._id)}
              >
                +
              </button>
            </div>

            <div className="delete" onClick={() => removeProduct(product._id)}>
              <Close />
            </div>
          </div>
        </div>
      ))}

      <div className="total">
        <h3>Total: $ {total}</h3>
        <div className="payment">
          <PaypalButton total={total} transactionSuccess={transactionSuccess} />

          <StripeCheckout
            name="Marvelous Fashion"
            image={iconLogo}
            billingAddress
            shippingAddress
            description={`Total: $ ${total}`}
            amount={total * 100}
            token={onToken}
            stripeKey={process.env.REACT_APP_STRIPE_KEY}
          >
            <button className="stripe-btn">
              <CreditCard fontSize="inherit" /> Credit Card
            </button>
          </StripeCheckout>
        </div>
      </div>
    </div>
  );
};

export default Cart;
