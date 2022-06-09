import { useContext } from "react";
import { Link } from "react-router-dom";
import {
  AddShoppingCartSharp,
  InfoOutlined,
  FavoriteSharp,
  Delete,
  Edit,
} from "@mui/icons-material";
import { GlobalState } from "./common/globalState";

const ProductButtons = ({ product, deleteProduct }) => {
  const state = useContext(GlobalState);
  const [user] = state.usersApi.user;
  const addCart = state.usersApi.addCart;
  const addWishlist = state.usersApi.addWishlist;

  return (
    <div className="row-btn">
      {user?.isAdmin ? (
        <>
          <Link
            id="btn-add"
            className="btn"
            to=""
            onClick={() => deleteProduct(product._id, product.image.public_id)}
          >
            <Delete />
          </Link>
          <Link id="btn-info" className="btn" to={`/item/edit/${product._id}`}>
            <Edit />
          </Link>
        </>
      ) : (
        <>
          {product.in_stock === 0 ? null : (
            <Link
              id="btn-add"
              className="btn"
              to=""
              onClick={() => addCart(product)}
            >
              <AddShoppingCartSharp />
            </Link>
          )}
          <Link id="btn-info" className="btn" to={`/item/${product._id}`}>
            <InfoOutlined />
          </Link>
          <Link
            id="btn-fav"
            className="btn"
            to=""
            onClick={() => addWishlist(product)}
          >
            <FavoriteSharp />
          </Link>
        </>
      )}
    </div>
  );
};

export default ProductButtons;
