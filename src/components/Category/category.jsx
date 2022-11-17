import "./category.css";
import { useState } from "react";
import { CategoryItem } from "../CategoryItem/categoryItem";

export const Category = () => {
  const [category, setCategory] = useState([
    { id: 1, img: "/images/img-category-1.png", category: "Одежда" },
    { id: 2, img: "/images/img-category-2.png", category: "транспорт" },
    { id: 3, img: "/images/img-category-3.png", category: "Кафе и рестораны" },
    { id: 4, img: "/images/img-category-4.png", category: "Супермаркеты" },
    { id: 5, img: "/images/img-category-5.png", category: "Жкх, связь. интернет", },
    { id: 6, img: "/images/img-category-6.png", category: "медицина" },
    { id: 7, img: "/images/img-category-7.png", category: "образование" },
    { id: 8, img: "/images/img-category-8.png", category: "прочие расходы" },
  ]);

  return (
    <div className="category">
      {category.map((item) => (
        <CategoryItem img={item.img} category={item.category} key={item.id} />
      ))}
    </div>
  );
};
