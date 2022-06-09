const CategoryDisplayItem = ({ category }) => {
  return (
    <div className="category-item-container">
      <img src={category.img} alt="Product Category" />
      <div className="category-item-info">
        <h1>{category.title}</h1>
        <button>Shop Now</button>
      </div>
    </div>
  );
};

export default CategoryDisplayItem;
