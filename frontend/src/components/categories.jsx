import { useState, useContext } from "react";
import { GlobalState } from "./common/globalState";
import { toast } from "react-toastify";
import categoriesService from "../services/categoriesService";
import { Save, Edit, Update, Delete } from "@mui/icons-material";
import { Alert } from "@mui/material";

const Categories = () => {
  const state = useContext(GlobalState);
  const [categories] = state.categoriesApi.categories;
  const [callback, setCallback] = state.categoriesApi.callback;
  const [category, setCategory] = useState("");
  const [onEdit, setOnEdit] = useState(false);
  const [id, setId] = useState("");
  const [error, setError] = useState(false);

  const handleChangeInput = (e) => {
    setCategory(e.target.value);
    setError(false);
  };

  const createCategory = async (e) => {
    e.preventDefault();

    if (!category) {
      return setError(true);
    }

    try {
      if (onEdit) {
        await categoriesService.editCategory(id, category);
        toast.info("Category updated.");
      } else {
        await categoriesService.createCategory(category);
        toast.success("Category created.");
      }
      setError(false);
      setOnEdit(false);
      setCategory("");
      setCallback(!callback);
    } catch ({ response }) {
      if (response && response.status === 400) {
        toast.error(response.data);
      }
    }
  };

  const editCategory = async (id, name) => {
    setId(id);
    setCategory(name);
    setError(false);
    setOnEdit(true);
  };

  const removeCategory = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete this category?")) {
        await categoriesService.removeCategory(id);
        toast.warning("Category deleted.");
        setError(false);
        setCallback(!callback);
      }
    } catch ({ response }) {
      if (response && response.status === 400) {
        toast.error(response.data);
      }
    }
  };

  return (
    <div className="categories">
      <form onSubmit={createCategory} noValidate autoComplete="off">
        <label htmlFor="category">Category</label>
        <input
          type="text"
          name="category"
          value={category}
          onChange={handleChangeInput}
        />

        <button>
          {onEdit ? <Update color="success" /> : <Save color="success" />}
        </button>
        {error && (
          <Alert
            style={{ margin: 15 }}
            elevation={10}
            severity="error"
            variant="filled"
          >
            "category" is not allowed to be empty
          </Alert>
        )}
      </form>

      <div className="col">
        {categories.map((category) => (
          <div className="row" key={category._id}>
            <p>{category.name}</p>
            <div>
              <button onClick={() => editCategory(category._id, category.name)}>
                <Edit color="warning" />
              </button>
              <button onClick={() => removeCategory(category._id)}>
                <Delete color="error" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
