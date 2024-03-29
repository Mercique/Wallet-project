import styles from "./Category.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Balance } from "../../components/Balance/Balance";
import { SubmitButton } from "../../components/SubmitButton/SubmitButton";
import { Input } from "../../components/Input/Input";
import { IconCategoryMenu } from "../../components/IconCategoryMenu/IconCategoryMenu";
import { addCategory, deleteCategory, deleteCategoryFailure, putCategory } from "../../store/category/actions";
import { apiCategory } from "../../utils/constants";
import { selectCategory, selectCategoryError, selectCategoryErrorDelete, selectCategoryLoading } from "../../store/category/selectors";
import { Slider } from "../../components/Slider/Slider";
import ReactLoading from "react-loading";

export const Category = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryImgId, setCategoryImgId] = useState("");
  const [categoryEdit, setCategoryEdit] = useState("");
  const [editName, setEditName] = useState("");

  const dispatch = useDispatch();
  const categoryList = useSelector(selectCategory);
  const categoryLoading = useSelector(selectCategoryLoading);
  const categoryError = useSelector(selectCategoryError);
  const categoryErrorDelete = useSelector(selectCategoryErrorDelete);

  const handleActive = (el) => {
    if (el.id !== categoryEdit?.id) {
      setCategoryEdit({id: el.id, name: el.name, img_id: el.img_id});
      dispatch(deleteCategoryFailure(null));
    } else {
      setCategoryEdit("");
    }
  };

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
    setCategoryEdit("");
  };

  const handleDeleteCategory = () => {
    dispatch(deleteCategory(`${apiCategory}/${categoryEdit.id}`, "DELETE"));
    setCategoryEdit("");
  };

  return (
    <div className={styles.categoryWrapper}>
      <div className={styles.categoryLeft}>
        <form className={styles.addCategoryForm} onSubmit={addNewCategory}>
          <div className={styles.addCategoryBox}>
            <Input
              type="text"
              className={styles.inputCategory}
              value={categoryName}
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
        <div className={styles.editCategory}>
          <div className={styles.slider}>
            { categoryLoading || categoryError ? (
              <div className={styles.categoryLoad}>
                <ReactLoading type="spin" color="#fff" height={100} width={100} />
              </div>
            ) : (
              <div className={styles.categorySuccess}>
                <h2 className={styles.sliderHeader}>Изменить категорию:</h2>
                <Slider
                  idx={7}
                  wrapper={styles.sliderWrap}
                  sliderIconWrapper={styles.categoryIconWrapper}
                  leftArrow={styles.leftArrow}
                  rightArrow={styles.rightArrow}
                  sliderLine={styles.sliderLine}
                  categoryList={categoryList}
                  categoryEdit={categoryEdit}
                  handleActive={handleActive}
                />
                { !categoryErrorDelete ? (
                  <h3 className={styles.categoryName}>{!categoryEdit ? "Выберите категорию:" : `Название: ${categoryEdit.name}`}</h3>
                ) : (
                  <h3 className={styles.categoryErrorDelete}>{categoryErrorDelete}</h3>
                ) }
              </div>
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
              onClick={handleEditCategory}
              disabled={!categoryEdit | !editName}
            />
            <SubmitButton
              className={styles.deleteButton}
              name="Удалить категорию"
              onClick={handleDeleteCategory}
              disabled={!categoryEdit}
            />
          </form>
        </div>
      </div>
      <Balance />
    </div>
  );
};
