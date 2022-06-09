import { categories } from "../utils/demoData";
import CategoryDisplayItem from "./categoryDisplayItem";

const CategoriesDisplay = () => {
  return (
    <div className="categories-display-container">
      {categories.map((category, index) => (
        <CategoryDisplayItem key={index} category={category} />
      ))}
    </div>
  );
};

export default CategoriesDisplay;
