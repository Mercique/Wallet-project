import { useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./Slider.module.css";

export const Slider = ({ categoryList, categoryEdit, handleActive }) => {
  const location = useLocation();
  const [slide, setSlide] = useState(0);
  const [step, setStep] = useState(0);

  const pathStyles = {
    sliderWrapper: location.pathname === "/category" ? styles.sliderCategoryWrapper : styles.sliderOperationsWrapper,
    sliderArrow: location.pathname === "/category" ? {transform: "rotate(-90deg)"} : {transform: "rotate(0)"},
    sliderHidden: location.pathname === "/category" ? styles.sliderCategoryHidden : styles.sliderOperationsHidden,
    sliderLine: location.pathname === "/category" ? styles.sliderCategoryLine : styles.sliderOperationsLine,
    sliderSlide: location.pathname === "/category" ? {left: `${slide}px`} : {top: `${slide}px`},
    sliderStep: location.pathname === "/category" ? step + 7 === categoryList.length : step + 5 === categoryList.length,
  }

  const handleUp = () => {
    setStep((prevStep) => --prevStep);
    setSlide((prevSlide) => prevSlide + 122);
  };

  const handlebottom = () => {
    setStep((prevStep) => ++prevStep);
    setSlide((prevSlide) => prevSlide - 122);
  };

  return (
    <div className={pathStyles.sliderWrapper}>
      <button
        type="button"
        className={styles.sliderArrow}
        onClick={handleUp}
        disabled={step === 0}
      >
        <svg style={pathStyles.sliderArrow} width="50" height="30" viewBox="0 0 50 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21.4225 1.47083C21.1705 1.7228 20.9598 1.99972 20.775 2.28822L1.46417 21.6644C-0.418747 23.5555 -0.413704 26.6144 1.47943 28.4979C3.37256 30.3788 6.43389 30.3738 8.32038 28.4827L24.9494 11.7956L41.7417 28.4923C43.6348 30.3741 46.6961 30.3682 48.5817 28.4771C49.5227 27.5302 49.9938 26.2936 49.9892 25.058C49.9882 23.8216 49.5117 22.5862 48.5647 21.6471L29.0831 2.2706C28.897 1.98203 28.6832 1.70695 28.4283 1.45521C27.4606 0.492907 26.1896 0.0314041 24.9232 0.0565922C23.6585 0.0361508 22.3859 0.504217 21.4225 1.47083Z" fill="#D9D9D9"/>
        </svg>
      </button>

      <div className={pathStyles.sliderHidden}>
        <div className={pathStyles.sliderLine} style={pathStyles.sliderSlide}>
          { categoryList?.map((category, idx) => (
            <div
              className={
                category.img_id !== categoryEdit?.img_id
                  ? styles.categoryIcon
                  : styles.categoryIconActive
              }
              onClick={() => handleActive(category)}
              key={idx}
            >
              <img
                src={`/images/icons/${category.img.img_name}`}
                alt="categoryImg"
              />
            </div>
          )) }
        </div>
      </div>

      <button
        type="button"
        className={styles.sliderArrow}
        onClick={handlebottom}
        disabled={pathStyles.sliderStep}
      >
        <svg style={pathStyles.sliderArrow} width="50" height="30" viewBox="0 0 50 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M28.552 28.5875C28.8049 28.3352 29.0165 28.0577 29.2022 27.7685L48.5821 8.36348C50.4717 6.46958 50.4735 3.39929 48.5821 1.5045C46.6906 -0.387603 43.6252 -0.389398 41.732 1.5045L25.0435 18.2164L8.26622 1.42009C6.37478 -0.472913 3.30936 -0.473811 1.41702 1.42009C0.472642 2.36838 -0.00178862 3.60853 5.06696e-06 4.84868C-0.00178862 6.08972 0.472642 7.33077 1.41881 8.27547L20.883 27.7676C21.0687 28.0577 21.2821 28.3343 21.5368 28.5875C22.5036 29.5556 23.7754 30.0216 25.0435 29.9992C26.3098 30.0225 27.5852 29.5556 28.552 28.5875Z" fill="#D9D9D9"/>
        </svg>
      </button>
    </div>
  );
};
