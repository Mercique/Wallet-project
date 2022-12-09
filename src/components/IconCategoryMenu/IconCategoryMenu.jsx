import styles from "./IconCategoryMenu.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIcons, selectIconsError, selectIconsLoading } from "../../store/icons/selectors";
import { getIcons } from "../../store/icons/actions";

export const IconCategoryMenu = ({ categoryImgId, setCategoryImgId }) => {
  const [openIconDrop, setOpenIconDrop] = useState(false);

  const dispatch = useDispatch();
  const iconsList = useSelector(selectIcons);
  const iconsLoading = useSelector(selectIconsLoading);
  const iconsError = useSelector(selectIconsError);

  const getData = async () => {
    dispatch(getIcons());
  };

  useEffect(() => {
    getData();
  }, []);

  const openDrop = (e) => {
    e.preventDefault();
    setOpenIconDrop(!openIconDrop);
  };

  const selectIcon = (id) => {
    setCategoryImgId(id);
  };

  return (
    <details className={styles.iconCategoryDetails} open={openIconDrop} onClick={openDrop}>
      <summary className={styles.iconCategorySummary}>
      <span>{!categoryImgId ? "Введите иконку" : iconsList[+categoryImgId - 1].img_name}</span>
        <svg width="26" height="15" viewBox="0 0 26 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_387_5348)">
            <path d="M14.847 11.5709C14.9785 11.4953 15.0886 11.4121 15.1851 11.3255L25.2627 5.51153C26.2453 4.9441 26.2462 4.02421 25.2627 3.4565C24.2791 2.88961 22.6851 2.88907 21.7006 3.4565L13.0226 8.46359L4.29844 3.43121C3.31488 2.86405 1.72087 2.86378 0.73685 3.43121C0.245774 3.71533 -0.000930084 4.08689 2.63482e-06 4.45846C-0.000930084 4.83029 0.245774 5.20212 0.737783 5.48517L10.8592 11.3252C10.9557 11.4121 11.0667 11.495 11.1992 11.5709C11.7019 11.8609 12.3632 12.0006 13.0226 11.9938C13.6811 12.0008 14.3443 11.8609 14.847 11.5709Z" fill="#604B4B"/>
          </g>
          <defs>
            <clipPath id="clip0_387_5348">
              <rect width="26" height="15" fill="white"/>
            </clipPath>
          </defs>
        </svg>
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
  );
};
