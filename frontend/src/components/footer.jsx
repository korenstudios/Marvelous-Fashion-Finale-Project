import {
  Facebook,
  Instagram,
  MailOutline,
  Phone,
  Pinterest,
  Room,
  Twitter,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import logoImg from "../images/marvelous_fasion_logo.png";
import paymentImg from "../images/payment.png";

const Footer = () => {
  return (
    <footer>
      <div className="left-side">
        <Link to="/">
          <img src={logoImg} alt="Marvelous Fashion Logo" />
        </Link>
        <p>
          MARVELOUS FASHION &copy; {new Date().getFullYear()} | All Rights
          Reserved.
        </p>
        <div className="social-container">
          <div>
            <Facebook />
          </div>
          <div>
            <Instagram />
          </div>
          <div>
            <Twitter />
          </div>
          <div>
            <Pinterest />
          </div>
        </div>
      </div>
      <div className="center-side">
        <h3>Useful Links</h3>
        <ul>
          <li>Home</li>
          <li>Cart</li>
          <li>Hoodies</li>
          <li>Bags</li>
          <li>Accessories</li>
          <li>My Account</li>
          <li>Order Tracking</li>
          <li>Privacy Policy</li>
          <li>Wishlist</li>
          <li>Terms Of Use</li>
        </ul>
      </div>
      <div className="right-side">
        <h3>Contact</h3>
        <div className="contact-item">
          <Room style={{ marginRight: "10px" }} /> 80 Alenbi , Tel Aviv, Israel
        </div>
        <div className="contact-item">
          <Phone style={{ marginRight: "10px" }} /> +972 52 737 73 73
        </div>
        <div className="contact-item">
          <MailOutline style={{ marginRight: "10px" }} />
          marvelous.fashion.shop@gmail.com
        </div>
        <img src={paymentImg} alt="Payment Methods" />
      </div>
    </footer>
  );
};

export default Footer;
