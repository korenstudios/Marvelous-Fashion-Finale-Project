import { useState, useEffect } from "react";
import cartService from "../../services/cartService";
import usersService from "../../services/usersService";
import wishlistService from "../../services/wishlistService";

const UsersApi = () => {
  const [user, setUser] = useState(null);
  const [socialMediaUser, setSocialMediaUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [users, setUsers] = useState([]);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [paypalOrderHistory, setPaypalOrderHistory] = useState([]);
  const [stripeOrderHistory, setStripeOrderHistory] = useState([]);
  const [callback, setCallback] = useState(false);

  useEffect(() => {
    const getUser = () => {
      setUser(usersService.getUser());
    };

    getUser();
  }, []);

  useEffect(() => {
    const getSocialMediaUser = async () => {
      const { data } = await usersService.getSocialMediaUser();
      setSocialMediaUser(data);
    };

    getSocialMediaUser();
  }, []);

  useEffect(() => {
    if (user) {
      const getUserProfile = async () => {
        const { data } = await usersService.getUserInfo();

        setUserProfile(data);
      };

      getUserProfile();
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      const getUserProducts = async () => {
        const { data } = await usersService.getUserInfo();

        setCart(data.cart);
        setWishlist(data.wishlist);
      };

      getUserProducts();
    }
  }, [user]);

  const addCart = async (product) => {
    if (!user) {
      alert("Please Login.");
      window.location = "/login";
      return;
    }

    const check = cart.every((item) => {
      return item._id !== product._id;
    });

    if (check) {
      setCart([...cart, { ...product, quantity: 1 }]);

      await cartService.addCart({
        cart: [...cart, { ...product, quantity: 1 }],
      });
    } else {
      alert("This product has been added to cart.");
    }
  };

  const addWishlist = async (product) => {
    if (!user) {
      alert("Please Login.");
      window.location = "/login";
      return;
    }

    const check = wishlist.every((item) => {
      return item._id !== product._id;
    });

    if (check) {
      setWishlist([...wishlist, { ...product }]);

      await wishlistService.addWishlist({
        wishlist: [...wishlist, { ...product }],
      });
    } else {
      alert("This product has been added to wishlist.");
    }
  };

  return {
    user: [user, setUser],
    socialMediaUser: [socialMediaUser, setSocialMediaUser],
    userProfile: [userProfile, setUserProfile],
    users: [users, setUsers],
    cart: [cart, setCart],
    addCart: addCart,
    wishlist: [wishlist, setWishlist],
    addWishlist: addWishlist,
    paypalOrderHistory: [paypalOrderHistory, setPaypalOrderHistory],
    stripeOrderHistory: [stripeOrderHistory, setStripeOrderHistory],
    callback: [callback, setCallback],
  };
};

export default UsersApi;
