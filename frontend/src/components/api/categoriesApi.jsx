import { useState, useEffect } from "react";
import categoriesService from "../../services/categoriesService";

const CategoriesApi = () => {
  const [categories, setCategories] = useState([]);
  const [callback, setCallback] = useState(false);

  useEffect(() => {
    const getCategories = async () => {
      const { data } = await categoriesService.getCategories();
      setCategories(data);
    };

    getCategories();
  }, [callback]);

  return {
    categories: [categories, setCategories],
    callback: [callback, setCallback],
  };
};

export default CategoriesApi;
