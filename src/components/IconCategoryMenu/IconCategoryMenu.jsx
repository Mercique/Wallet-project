import styles from "./IconCategoryMenu.module.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectIcons, selectIconsError, selectIconsLoading } from "../../store/icons/selectors";
import { DropSvg } from "../DropSvg/DropSvg";
import { ErrorHandling } from "../ErrorHandling/ErrorHandling";

export const IconCategoryMenu = ({ categoryImgId, setCategoryImgId }) => {
  const [openIconDrop, setOpenIconDrop] = useState(false);

  const iconsList = useSelector(selectIcons);
  const iconsLoading = useSelector(selectIconsLoading);
  const iconsError = useSelector(selectIconsError);

  const openDrop = (e) => {
    e.preventDefault();
    setOpenIconDrop(!openIconDrop);
  };

  const selectIcon = (id) => {
    setCategoryImgId(id);
  };

  return (
    <>
      { iconsError ? (
        <ErrorHandling classes={styles.iconsError} value={iconsError} />
      ) : (
        <>
          { iconsLoading ? (
            <ErrorHandling classes={styles.iconsLoading} value="Загрузка иконок..." />
          ) : (
            <>
              { !iconsList?.length ? (
                <ErrorHandling classes={styles.iconsEmpty} value="Нет иконок" />
              ) : (
                <details className={styles.iconCategoryDetails} open={openIconDrop} onClick={openDrop}>
                  <summary className={styles.iconCategorySummary}>
                  <span>{!categoryImgId ? "Введите иконку" : iconsList[+categoryImgId - 1].img_name}</span>
                    <DropSvg />
                  </summary>
                  { openIconDrop &&
                    <div className={styles.iconCategoryDrop}>
                      <div className={styles.iconCategoryScroll}>
                        <div className={styles.iconCategoryOptions}>
                          { iconsList.map((icon, idx) => (
                            <div className={styles.iconCategoryIcon} onClick={() => selectIcon(icon.id)} key={idx}>
                              <img src={`/images/icons/${icon.img_name}`} alt="icon" />
                            </div>
                          )) }
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
