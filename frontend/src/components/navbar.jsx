import { useContext, useState } from "react";
import { GlobalState } from "./common/globalState";
import {
  Menu,
  Close,
  ShoppingCartSharp,
  FavoriteSharp,
} from "@mui/icons-material";
import { Badge } from "@mui/material";
import { Link } from "react-router-dom";
import logoImg from "../images/marvelous_fasion_logo.png";

const Navbar = () => {
  const state = useContext(GlobalState);
  const [user] = state.usersApi.user;
  const [socialMediaUser] = state.usersApi.socialMediaUser;
  const [userProfile] = state.usersApi.userProfile;
  const [cart] = state.usersApi.cart;
  const [wishlist] = state.usersApi.wishlist;
  const [menu, setMenu] = useState(false);

  const styleMenu = {
    left: menu ? 0 : "-100%",
  };

  return (
    <header>
      <div className="menu" onClick={() => setMenu(!menu)}>
        <Menu style={{ width: 30 }} />
      </div>

      <div className="logo">
        <Link to="/">
          <img src={logoImg} alt="Marvelous Fashion Logo" />
        </Link>
      </div>

      <ul style={styleMenu}>
        {user?.isAdmin ? null : (
          <li>
            <Link to={user ? `/profile/${user._id}` : "#"}>
              {userProfile && `Welcome, ${userProfile.name}!`}
              {socialMediaUser && `Welcome, ${socialMediaUser.displayName}!`}
              {!userProfile && !socialMediaUser && "Welcome, guest!"}
            </Link>
          </li>
        )}
        <li>
          <Link to="/products">Products</Link>
        </li>
        <li>
          <Link to="/about-us">About Us</Link>
        </li>

        {user?.isAdmin && (
          <>
            <li>
              <Link to="/product-factory">Product Factory</Link>
            </li>
            <li>
              <Link to="/categories">Categories</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </>
        )}

        {user || socialMediaUser ? (
          <>
            <li>
              <Link to="/order-history">Order History</Link>
            </li>
            <li>
              <Link to="/logout">Logout</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}

        <li onClick={() => setMenu(!menu)}>
          <Close className="menu" style={{ width: 30 }} />
        </li>
      </ul>

      {user?.isAdmin ? null : (
        <>
          <div className="cart-icon">
            <Badge badgeContent={cart.length} color="primary">
              <Link to="/cart">
                <ShoppingCartSharp
                  className="cart-anime"
                  style={{ width: 30 }}
                />
              </Link>
            </Badge>
          </div>

          <div className="wishlist-icon">
            <Badge badgeContent={wishlist.length} color="primary">
              <Link to="/wishlist">
                <FavoriteSharp
                  className="wishlist-anime"
                  style={{ width: 30 }}
                />
              </Link>
            </Badge>
          </div>
        </>
      )}
    </header>
  );
};

export default Navbar;
