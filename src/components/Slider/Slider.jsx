import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./Slider.module.css";

export default class SliderCenter extends Component {
    render() {
        const settings = {
            infinite: true,
            centerPadding: "60px",
            width: 800,
            slidesToShow: 4,
            variableWidth: true,
            speed: 500
        };

        return (
            <div className={styles.sliderWrapper}>
                <Slider {...settings}>
                    { this.props.categoryList?.map((category, idx) => (
                        <div
                            style={{ width: 146 }}
                            className={
                            category.img_id !== this.props.categoryEdit?.img_id
                                ? styles.iconWrapper
                                : styles.iconWrapperActive
                            }
                            onClick={() => this.props.handleActive(category)}
                            key={idx}
                        >
                            <img
                                src={`/images/icons/${category.img.img_name}`}
                                alt="icon"
                            />
                        </div>
                    )) }
                </Slider>
            </div>
        );
    }
}