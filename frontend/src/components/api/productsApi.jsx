import { useState, useEffect } from "react";
import productsService from "../../services/productsService";

const ProductsApi = () => {
  const [products, setProducts] = useState([]);
  const [callback, setCallback] = useState(false);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [result, setResult] = useState(0);

  useEffect(() => {
    const getProducts = async () => {
      const { data } = await productsService.getProducts(
        page,
        category,
        sort,
        search
      );
      setProducts(data);
      setResult(data.length);
    };

    getProducts();
  }, [callback, page, category, sort, search]);

  return {
    products: [products, setProducts],
    callback: [callback, setCallback],
    category: [category, setCategory],
    sort: [sort, setSort],
    search: [search, setSearch],
    page: [page, setPage],
    result: [result, setResult],
  };
};

export default ProductsApi;
