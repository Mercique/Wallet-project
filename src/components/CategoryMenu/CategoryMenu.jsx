import styles from "./CategoryMenu.module.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectCategory, selectCategoryError, selectCategoryLoading } from "../../store/category/selectors";
import { DropSvg } from "../DropSvg/DropSvg";
import { ErrorHandling } from "../ErrorHandling/ErrorHandling";

export const CategoryMenu = ({ categoryId, setCategoryId }) => {
  const [openOption, setOpenOption] = useState(false);

  const categoryList = useSelector(selectCategory);
  const categoryLoading = useSelector(selectCategoryLoading);
  const categoryError = useSelector(selectCategoryError);

  const openDrop = (e) => {
    e.preventDefault();
    setOpenOption(!openOption);
  };

  const selectOption = (id) => {
    setCategoryId(id);
  };

  const getCategoryName = (id) => {
    const index = categoryList.findIndex((category) => category.id === id);

    return categoryList[index]?.name;
  };

  return (
    <>
      { categoryError ? (
        <ErrorHandling classes={styles.categoryError} value={categoryError} />
      ) : (
        <>
          { categoryLoading ? (
            <ErrorHandling classes={styles.categoryLoading} value="Загрузка категорий..." />
          ) : (
            <>
              { !categoryList?.length ? (
                <ErrorHandling classes={styles.categoryEmpty} value="Нет категорий" />
              ) : (
                <details className={styles.categoryDetails} open={openOption} onClick={openDrop}>
                  <summary className={styles.categorySummary}>
                    <span>{!categoryId ? "Введите категорию" : getCategoryName(categoryId)}</span>
                    <DropSvg />
                  </summary>
                  { openOption &&
                    <div className={styles.detailsBox}>
                      <div className={styles.detailsBoxScroll}>
                        <div className={styles.detailsBoxOptions}>
                          {categoryList?.map((category, idx) => (
                            <div
                              className={styles.categoryOption}
                              onClick={() => selectOption(category.id)}
                              key={idx}
                            >
                              {category.name}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  }
                </details>
              ) }
            </>
          ) }
        </>
      ) }
    </>
  );
};
