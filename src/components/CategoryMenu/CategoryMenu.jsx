import styles from "./CategoryMenu.module.css";
import { useState } from "react";
import { CategoryError } from "../CategoryError/CategoryError";

export const CategoryMenu = ({ categoryList, category, setCategory}) => {
  const [openOption, setOpenOption] = useState(false);

  return (
    <>
      { categoryList?.error ? (
        <CategoryError summaryStyle={styles.categorySummary} errorName={categoryList.name} />
      ) : (
        <details className={styles.categoryDetails} open={openOption} onClick={(e) => {e.preventDefault();setOpenOption(!openOption);}}>
          <summary className={styles.categorySummary}>
            <span>{!category ? "Введите категорию" : categoryList[+category - 1].name}</span>
            <svg width="26" height="15" viewBox="0 0 26 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_223_96)">
                <path d="M14.847 11.5709C14.9785 11.4953 15.0886 11.4122 15.1851 11.3255L25.2627 5.51156C26.2453 4.94413 26.2462 4.02424 25.2627 3.45653C24.2791 2.88964 22.6851 2.8891 21.7006 3.45653L13.0226 8.46362L4.29844 3.43124C3.31488 2.86408 1.72087 2.86381 0.73685 3.43124C0.245774 3.71536 -0.000930084 4.08693 2.63482e-06 4.45849C-0.000930084 4.83032 0.245774 5.20215 0.737783 5.4852L10.8592 11.3253C10.9557 11.4122 11.0667 11.495 11.1992 11.5709C11.7019 11.861 12.3632 12.0006 13.0226 11.9939C13.6811 12.0009 14.3443 11.861 14.847 11.5709Z" fill="#604B4B"/>
              </g>
              <defs>
                <clipPath id="clip0_223_96">
                  <rect width="26" height="15" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          </summary>
          { openOption &&
            <div className={styles.detailsBox}>
              <div className={styles.detailsBoxScroll}>
                <div className={styles.detailsBoxOptions}>
                  {categoryList?.map((category, idx) => (
                    <button
                      type="button"
                      onClick={() => {
                        setCategory(category.id);
                        setOpenOption(!openOption);
                      }}
                      key={idx}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          }
        </details>
      ) }
    </>
  );
};
