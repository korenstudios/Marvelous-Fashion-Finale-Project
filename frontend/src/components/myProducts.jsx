import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { GlobalState } from "./common/globalState";
import filesService from "../services/filesService";
import productsService from "../services/productsService";
import Product from "./product";
import Loading from "./loading";
import Filters from "./filters";
import LoadMore from "./loadMore";

const MyProducts = () => {
  const state = useContext(GlobalState);
  const [products, setProducts] = state.productsApi.products;
  const [user] = state.usersApi.user;
  const [callback, setCallback] = state.productsApi.callback;
  const [loading, setLoading] = useState(false);
  const [isCheck, setIsCheck] = useState(false);

  const handleCheck = (id) => {
    products.forEach((product) => {
      if (product._id === id) {
        product.checked = !product.checked;
      }
    });

    setProducts([...products]);
  };

  const deleteProduct = async (id, public_id) => {
    try {
      setLoading(true);
      const destroyImage = filesService.destroyFile({
        public_id,
      });
      const removeProduct = productsService.removeProduct(id);
      await destroyImage;
      await removeProduct;
      setCallback(!callback);
      setLoading(false);
      toast.warning("Product deleted.");
    } catch ({ response }) {
      if (response && response.status === 400) {
        toast.error(response.data);
      }
    }
  };

  const checkAll = () => {
    products.forEach((product) => {
      product.checked = !isCheck;
    });

    setProducts([...products]);
    setIsCheck(!isCheck);
  };

  const deleteAll = () => {
    products.forEach((product) => {
      if (product.checked) {
        deleteProduct(product._id, product.image.public_id);
      }
    });
  };

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <>
      <Filters />

      {user?.isAdmin && (
        <div className="delete-all">
          <span>Select all</span>
          <input type="checkbox" checked={isCheck} onChange={checkAll} />
          <button onClick={deleteAll}>Delete All</button>
        </div>
      )}

      <div className="products">
        {products.map((product) => {
          return (
            <Product
              key={product._id}
              product={product}
              user={user}
              deleteProduct={deleteProduct}
              handleCheck={handleCheck}
            />
          );
        })}
      </div>

      <LoadMore />
      {products.length === 0 && <Loading />}
    </>
  );
};

export default MyProducts;
