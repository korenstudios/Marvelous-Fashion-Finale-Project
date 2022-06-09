import ProductButtons from "./productButtons";

const Product = ({ product, user, deleteProduct, handleCheck }) => {
  return (
    <div className="product-card">
      {user?.isAdmin && (
        <input
          type="checkbox"
          checked={product.checked}
          onChange={() => handleCheck(product._id)}
        />
      )}

      <img src={product.image.url} alt={product.title} />

      <div className="product-box">
        <h2 title={product.title}>{product.title}</h2>
        <span>$ {product.price}</span>
        <p>{product.description}</p>
      </div>

      <ProductButtons product={product} deleteProduct={deleteProduct} />
    </div>
  );
};

export default Product;
