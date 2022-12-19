import { useSelector } from "react-redux";
import { selectCategory } from "../../store/category/selectors";
import styles from "./TestSlider.module.css";

export const TestSlider = ({ className, categoryEdit, handleActive }) => {
  const categoryList = useSelector(selectCategory);

  return (
    <div className={`${styles.testSlider} ${className}`}>
      <div className={styles.categorySlider}>
        {categoryList?.map((category, idx) => (
          <div
            className={
              category.img_id !== categoryEdit?.img_id
                ? styles.categorySliderItem
                : styles.categoryActive
            }
            onClick={() => handleActive(category)}
            key={idx}
          >
            <img
              className={styles.categoriesImg}
              src={`/images/icons/${category.img.img_name}`}
              alt="categoryImg"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
