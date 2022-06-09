import { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalState } from "./common/globalState";
import filesService from "../services/filesService";
import productsService from "../services/productsService";
import Loading from "./loading";
import { Close } from "@mui/icons-material";
import { toast } from "react-toastify";

const initialState = {
  product_id: "",
  title: "",
  price: "",
  in_stock: "",
  description: "",
  content: "",
  category: "",
};

const ProductFactory = () => {
  const state = useContext(GlobalState);
  const [product, setProduct] = useState(initialState);
  const [categories] = state.categoriesApi.categories;
  const [image, setImage] = useState(false);
  const [loading, setLoading] = useState(false);

  const [user] = state.usersApi.user;

  const navigate = useNavigate();
  const params = useParams();

  const [products] = state.productsApi.products;
  const [callback, setCallback] = state.productsApi.callback;
  const [onEdit, setOnEdit] = useState(false);

  useEffect(() => {
    if (params.id) {
      setOnEdit(true);
      products.forEach((product) => {
        if (product._id === params.id) {
          setProduct(product);
          setImage(product.image);
        }
      });
    } else {
      setOnEdit(false);
      setProduct(initialState);
      setImage(false);
    }
  }, [params.id, products]);

  const handleUpload = async (e) => {
    e.preventDefault();

    try {
      if (!user?.isAdmin) {
        return alert("You are not an admin.");
      }

      const file = e.target.files[0];

      if (!file) {
        return alert("File does not exist.");
      }

      if (file.size > 1024 * 1024) {
        return alert("File size is too large.");
      }

      if (file.type !== "image/jpeg" && file.type !== "image/png") {
        return alert("Unsupported file format.");
      }

      let formData = new FormData();
      formData.append("file", file);

      setLoading(true);
      const { data } = await filesService.uploadFile(formData);
      setLoading(false);
      setImage(data);
    } catch ({ response }) {
      if (response && response.status === 400) {
        toast.error(response.data);
      }
    }
  };

  const handleDestroy = async () => {
    try {
      if (!user?.isAdmin) {
        return alert("You are not an admin.");
      }

      setLoading(true);

      await filesService.destroyFile({
        public_id: image.public_id,
      });

      setLoading(false);
      setImage(false);
    } catch ({ response }) {
      if (response && response.status === 400) {
        toast.error(response.data);
      }
    }
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!user?.isAdmin) {
        return alert("You are not an admin.");
      }

      if (!image) {
        return alert("No image Uploaded.");
      }

      if (onEdit) {
        await productsService.editProduct(product._id, product, image);
        toast.info("Product updated.");
      } else {
        await productsService.createProduct(product, image);
        toast.success("Product created.");
      }

      setCallback(!callback);
      navigate("/products");
    } catch ({ response }) {
      if (response && response.status === 400) {
        toast.error(response.data);
      }
    }
  };

  const styleUpload = {
    display: image ? "block" : "none",
  };

  return (
    <div className="product-factory">
      <div className="upload">
        <input
          type="file"
          name="file"
          id="file-upload"
          onChange={handleUpload}
          required
        />
        {loading ? (
          <div id="file-img">
            <Loading />
          </div>
        ) : (
          <div id="file-img" style={styleUpload}>
            <img src={image ? image.url : ""} alt="Product Preview" />
            <span onClick={handleDestroy}>
              <Close />
            </span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="row">
          <label htmlFor="product_id">Product ID:</label>

          <input
            type="text"
            value={product.product_id}
            name="product_id"
            id="product_id"
            disabled={onEdit}
            onChange={handleChangeInput}
            required
          />
        </div>

        <div className="row">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            value={product.title}
            name="title"
            id="title"
            onChange={handleChangeInput}
            required
          />
        </div>

        <div className="row">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            value={product.price}
            name="price"
            id="price"
            onChange={handleChangeInput}
            required
          />
        </div>

        <div className="row">
          <label htmlFor="in_stock">In Stock:</label>
          <input
            type="number"
            value={product.in_stock}
            name="in_stock"
            id="in_stock"
            onChange={handleChangeInput}
            required
          />
        </div>

        <div className="row">
          <label htmlFor="description">Description:</label>
          <textarea
            type="text"
            value={product.description}
            name="description"
            id="description"
            rows="5"
            onChange={handleChangeInput}
            required
          ></textarea>
        </div>

        <div className="row">
          <label htmlFor="content">Content:</label>
          <textarea
            type="text"
            value={product.content}
            name="content"
            id="content"
            rows="7"
            onChange={handleChangeInput}
            required
          ></textarea>
        </div>

        <div className="row">
          <label htmlFor="category">Categories:</label>
          <select
            name="category"
            value={product.category}
            onChange={handleChangeInput}
            required
          >
            <option value="">Please select a category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <button>{onEdit ? "Update" : "Create"}</button>
      </form>
    </div>
  );
};

export default ProductFactory;
