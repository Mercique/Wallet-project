import styles from "./Category.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Balance } from "../../components/Balance/Balance";
import { SubmitButton } from "../../components/SubmitButton/SubmitButton";
import { Input } from "../../components/Input/Input";
import { IconCategoryMenu } from "../../components/IconCategoryMenu/IconCategoryMenu";
import { addCategory } from "../../store/category/actions";
import { apiCategory } from "../../utils/constants";

export const Category = () => {
    const [categoryName, setCategoryName] = useState("");
    const [categoryImgId, setCategoryImgId] = useState("");

    const dispatch = useDispatch();

    const addNewCategory = (e) => {
        e.preventDefault();

        const newCategory = {
            img_id: categoryImgId,
            name: categoryName
        }

        dispatch(addCategory(apiCategory, "POST", newCategory));

        setCategoryName("");
        setCategoryImgId("");
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
                            value={categoryName}
                            placeholder="Введите название категории"
                            onChange={(e) => setCategoryName(e.target.value)}
                        />
                        <IconCategoryMenu categoryImgId={categoryImgId} setCategoryImgId={setCategoryImgId} />
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
                    <div className={styles.sliderHeader}>Изменить категорию:</div>
                    <img className={styles.categoriesImg} src="/images/categories.svg" alt="categories"/>
                    <div className={styles.categoryName}>Название: Интернет</div>
                </div>
                <div className={styles.changeArea}>
                    <input className={styles.changeCategoryName} type="text" name="categoryName"
                           placeholder="Изменить  название"/>
                    <button className={styles.renameButton}>
                        Добавить изменение
                    </button>
                    <button className={styles.deleteButton}>
                        Удалить категорию
                    </button>
                </div>
            </div>
        </div>
    );
};
