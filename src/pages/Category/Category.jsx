import styles from "./Category.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Balance } from "../../components/Balance/Balance";
import { SubmitButton } from "../../components/SubmitButton/SubmitButton";
import { Input } from "../../components/Input/Input";
import { IconCategoryMenu } from "../../components/IconCategoryMenu/IconCategoryMenu";
import { addCategory, deleteCategory, putCategory } from "../../store/category/actions";
import { apiCategory } from "../../utils/constants";
import { selectCategory, selectCategoryError } from "../../store/category/selectors";
import { getCategory } from "../../store/category/actions";
import { getIcons } from "../../store/icons/actions";

export const Category = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryImgId, setCategoryImgId] = useState("");
  const [categoryEdit, setCategoryEdit] = useState();
  const [editName, setEditName] = useState("");

  const dispatch = useDispatch();
  const categoryList = useSelector(selectCategory);
  const categoryError = useSelector(selectCategoryError);

  useEffect(() => {
    dispatch(getIcons());
    dispatch(getCategory());
  }, [dispatch]);

  const addNewCategory = (e) => {
    e.preventDefault();

    const newCategory = {
      img_id: categoryImgId,
      name: categoryName,
    };

    dispatch(addCategory(apiCategory, "POST", newCategory));

    setCategoryName("");
    setCategoryImgId("");
  };

  const handleEditCategory = () => {
    dispatch(putCategory(`${apiCategory}/${categoryEdit.id}`, "PUT", { name: editName, img_id: categoryEdit.img_id }));
    setEditName("");
    setCategoryEdit();
  };

  const handleDeleteCategory = () => {
    dispatch(deleteCategory(`${apiCategory}/${categoryEdit.id}`, "DELETE"));
    setCategoryEdit();
  };

  return (
    <div className={styles.categoryWrapper}>
      <Balance />
      <div className={styles.addCategory}>
        <form className={styles.addCategoryForm} onSubmit={addNewCategory}>
          <div className={styles.addCategoryBox}>
            <Input
              type="text"
              className={styles.inputCategory}
              placeholder="Введите название категории"
              onChange={(e) => setCategoryName(e.target.value)}
            />
            <IconCategoryMenu
              categoryImgId={categoryImgId}
              setCategoryImgId={setCategoryImgId}
            />
          </div>
          <SubmitButton
            className={styles.addCategoryButton}
            name="Добавить категорию"
            disabled={!categoryName | !categoryImgId}
          />
        </form>
      </div>
      <div className={styles.changeCategory}>
        <div className={styles.slider}>
          { categoryError ? (
            <div className={styles.categoryError}>{categoryError}</div>
          ) : (
            <>
              <h2 className={styles.sliderHeader}>Изменить категорию:</h2>
              <div className={styles.categorySlider}>
                {categoryList?.map((category, idx) => (
                  <div
                    className={category.img_id !== categoryEdit?.img_id ? styles.categorySliderItem : `${styles.categorySliderItem} ${styles.active}`}
                    onClick={() => setCategoryEdit({id: category.id, name: category.name, img_id: category.img_id})}
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
              <h3 className={styles.categoryName}>{!categoryEdit ? "Выберите категорию" : `Название: ${categoryEdit.name}`}</h3>
            </>
          ) }
        </div>
        <form className={styles.changeArea} onSubmit={(e) => e.preventDefault()}>
          <Input
            type="text"
            className={styles.changeCategoryName}
            value={editName}
            placeholder="Изменить название"
            onChange={(e) => setEditName(e.target.value)}
          />
          <SubmitButton
            className={styles.renameButton}
            name="Добавить изменение"
            onClick={() => handleEditCategory()}
            disabled={!categoryEdit | !editName}
          />
          <SubmitButton
            className={styles.deleteButton}
            name="Удалить категорию"
            onClick={() => handleDeleteCategory()}
            disabled={!categoryEdit}
          />
        </form>
      </div>
    </div>
  );
};
