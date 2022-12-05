import styles from "./Category.module.css";
import { useState } from "react";
import { Balance } from "../Balance/Balance";
import { SubmitButton } from "../SubmitButton/SubmitButton";
import { Input } from "../Input/Input";
import { IconCategoryMenu } from "../IconCategoryMenu/IconCategoryMenu";

export const Category = ({ balance }) => {
    const [category, setCategory] = useState([]);
    const images = [
        { id: 1, img_name: "animal.svg" },
        { id: 2, img_name: "bedroom.svg" },
        { id: 3, img_name: "book.svg" },
        { id: 4, img_name: "bulb.svg" },
        { id: 5, img_name: "car.svg" },
        { id: 6, img_name: "childhood.svg" },
        { id: 7, img_name: "cocktail.svg" },
        { id: 8, img_name: "diamonds.svg" }
    ];

    const [categoryName, setCategoryName] = useState();
    const [categoryImg, setCategoryImg] = useState();

    const addCategory = (e) => {
        e.preventDefault();

        const newCategory = {
            id: Date.now(),
            name: categoryName,
            img_name: categoryImg
        }

        setCategory((prevCategory) => [...prevCategory, newCategory]);

        setCategoryName("");
        setCategoryImg("");

        console.log(category);
    };

    return (
        <div className={styles.categoryWrapper}>
            <Balance balance={balance} />
            <div className={styles.addCategory}>
                <form className={styles.addCategoryForm} onSubmit={addCategory}>
                    <div className={styles.addCategoryBox}>
                        <Input
                            type={"text"}
                            className={styles.inputCategory}
                            value={categoryName}
                            placeholder={"Введите название категории"}
                            onChange={(e) => setCategoryName(e.target.value)}
                        />
                        <IconCategoryMenu images={images} />
                    </div>
                    <SubmitButton
                        className={styles.addCategoryButton}
                        name={"Добавить категорию"}
                        disabled={!categoryName}
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
