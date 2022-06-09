import { useContext } from "react";
import { GlobalState } from "./common/globalState";
import { Close } from "@mui/icons-material";
import wishlistService from "../services/wishlistService";

const Wishlist = () => {
  const state = useContext(GlobalState);
  const [wishlist, setWishlist] = state.usersApi.wishlist;

  const addToWishlist = async (wishlist) => {
    await wishlistService.addWishlist({ wishlist });
  };

  const removeProduct = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      wishlist.forEach((item, index) => {
        if (item._id === id) {
          wishlist.splice(index, 1);
        }
      });

      setWishlist([...wishlist]);
      addToWishlist(wishlist);
    }
  };

  if (wishlist.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Wishlist Empty</h2>
      </div>
    );
  }

  return (
    <div>
      {wishlist.map((product) => (
        <div className="item cart" key={product._id}>
          <img src={product.image.url} alt={product.title} />
          <div className="box-item">
            <h2>{product.title}</h2>
            <h3>$ {product.price}</h3>
            <p>{product.description}</p>
            <p>{product.content}</p>

            <div className="delete" onClick={() => removeProduct(product._id)}>
              <Close />
            </div>
          </div>
        </div>
      ))}

      <div className="total">
        <h3>Total: {wishlist.length}</h3>
      </div>
    </div>
  );
};

export default Wishlist;
