import styles from "./Category.module.css";

export const Category = () => {
    // const [category, setCategory] = useState([
    //   { id: 1, img: "/images/img-category-1.png", category: "Одежда" },
    //   { id: 2, img: "/images/img-category-2.png", category: "транспорт" },
    //   { id: 3, img: "/images/img-category-3.png", category: "Кафе и рестораны" },
    //   { id: 4, img: "/images/img-category-4.png", category: "Супермаркеты" },
    //   { id: 5, img: "/images/img-category-5.png", category: "Жкх, связь. интернет", },
    //   { id: 6, img: "/images/img-category-6.png", category: "медицина" },
    //   { id: 7, img: "/images/img-category-7.png", category: "образование" },
    //   { id: 8, img: "/images/img-category-8.png", category: "прочие расходы" },
    // ]);

    return (
        <div className={styles.categoryWrapper}>
            <div className={styles.balance}>
                <div className={styles.balanceHeader}>Баланс:</div>
                <div className={styles.balanceValue}>143 607,31</div>
            </div>
            <div className={styles.addCategory}>
                <div className={styles.actionArea}>
                    <input className={styles.addCategoryName} type="text" name="name"
                           placeholder="Введите название категории"/>
                    <select
                        className={styles.addCategoryPic}
                        name="category"
                    >
                        <option value="" disabled selected hidden>Выберите иконку</option>
                    </select>
                </div>
                <div className={styles.addButton}><div>Добавить категорию</div></div>
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
