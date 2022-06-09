import { useContext, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { GlobalState } from "./common/globalState";
import MyProducts from "./myProducts";
import Product from "./product";

const ProductItem = () => {
  const params = useParams();
  const state = useContext(GlobalState);
  const [products] = state.productsApi.products;
  const [user] = state.usersApi.user;
  const addCart = state.usersApi.addCart;
  const [productItem, setProductItem] = useState([]);

  useEffect(() => {
    if (params.id) {
      products.forEach((product) => {
        if (product._id === params.id) {
          setProductItem(product);
        }
      });
    }
  }, [params.id, products]);

  if (productItem.length === 0) {
    return <MyProducts />;
  }

  return (
    <>
      <div className="item">
        <img src={productItem.image.url} alt={productItem.title} />
        <div className="box-item">
          <div className="row">
            <h2>{productItem.title}</h2>
            <h6>#id: {productItem.product_id}</h6>
          </div>
          <span>$ {productItem.price}</span>
          <p>{productItem.description}</p>
          <p>{productItem.content}</p>
          <p>In Stock: {productItem.in_stock}</p>
          <p>Sold: {productItem.sold}</p>
          {productItem.in_stock === 0 ? (
            <Link to="" className="out-of-stock">
              Out Of Stock
            </Link>
          ) : (
            <Link
              to={user ? "/cart" : "/login"}
              className="cart"
              onClick={() => addCart(productItem)}
            >
              Buy Now
            </Link>
          )}
        </div>
      </div>

      <div>
        <h2>Related Products</h2>
        <div className="products">
          {products.map((product) => {
            return (
              product.category === productItem.category && (
                <Product key={product._id} product={product} />
              )
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ProductItem;
