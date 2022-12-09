import styles from "./Category.module.css";
import { useState } from "react";
import { Balance } from "../../components/Balance/Balance";
import { SubmitButton } from "../../components/SubmitButton/SubmitButton";
import { Input } from "../../components/Input/Input";
import { IconCategoryMenu } from "../../components/IconCategoryMenu/IconCategoryMenu";

export const Category = () => {
    const [categoryName, setCategoryName] = useState("");
    const [categoryImgId, setCategoryImgId] = useState("");

    const addCategory = (e) => {
        // e.preventDefault();

        // addNewCategory({
        //     name: categoryName,
        //     img_id: categoryImgId
        // });

        // setCategoryName("");
        // setCategoryImgId("");
    };

    return (
        <div className={styles.categoryWrapper}>
            <Balance />
            <div className={styles.addCategory}>
                <form className={styles.addCategoryForm} onSubmit={addCategory}>
                    <div className={styles.addCategoryBox}>
                        <Input
                            type="text"
                            className={styles.inputCategory}
                            value={categoryName}
                            placeholder="Введите название категории"
                            onChange={(e) => setCategoryName(e.target.value)}
                        />
                        <IconCategoryMenu />
                    </div>
                    <SubmitButton
                        className={styles.addCategoryButton}
                        name={"Добавить категорию"}
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
