import "./categoryItem.css";

export const CategoryItem = ({ img, category }) => {
  return (
    <div className="category-item">
      <div>
        <img src={img} alt={category}></img>
      </div>
      <span className="category-item_title">{category}</span>
    </div>
  );
};
