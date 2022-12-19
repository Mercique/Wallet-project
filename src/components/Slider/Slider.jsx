import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./Slider.module.css";

export default class SliderCenter extends Component {
    render() {
        const settings = {
            className: "center",
            centerMode: true,
            infinite: true,
            centerPadding: "60px",
            width: 800,
            slidesToShow: 4,
            variableWidth: true,
            speed: 500
        };
        const categoryList = this.props.categoryList;
        console.log('slider categoryList', categoryList)

        return (
            <div className={styles.sliderWrapper}>
                <div className={styles.sliderHeader}>Изменить категорию:</div>
                <Slider {...settings}>
                    { categoryList &&
                    categoryList.map(category => (
                        <div className={styles.iconWrapper} style={{ width: 200 }}>
                            <img src={`/images/icons/${category.img.img_name}`} alt="icon" />
                        </div>
                    ))
                    }
                </Slider>
            </div>
        );
    }
}