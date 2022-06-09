import { useContext } from "react";
import { GlobalState } from "./common/globalState";

const Filters = () => {
  const state = useContext(GlobalState);
  const [categories] = state.categoriesApi.categories;
  const [category, setCategory] = state.productsApi.category;
  const [sort, setSort] = state.productsApi.sort;
  const [search, setSearch] = state.productsApi.search;

  const handleCategory = (e) => {
    setCategory(e.target.value);
    setSearch("");
  };

  const handleSearch = (e) => setSearch(e.target.value.toLowerCase());

  const handleSort = (e) => setSort(e.target.value);

  return (
    <div className="filter-menu">
      <div className="row">
        <span>Category: </span>
        <select name="category" value={category} onChange={handleCategory}>
          <option value="">All Products</option>
          {categories.map((category) => (
            <option key={category._id} value={`category=${category._id}`}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <input
        type="text"
        value={search}
        placeholder="Search product"
        onChange={handleSearch}
      />

      <div className="row sort">
        <span>Sort By: </span>
        <select value={sort} onChange={handleSort}>
          <option value="">Newest</option>
          <option value="sort=oldest">Oldest</option>
          <option value="sort=-sold">Best Sales</option>
          <option value="sort=-price">Price: High-Low</option>
          <option value="sort=price">Price: Low-High</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
