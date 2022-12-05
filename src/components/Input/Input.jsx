import styles from "./Input.module.css";

export const Input = ({ type, className, ...attrs }) => {
  return (
    <input type={type} className={`${styles.input} ${className}`} {...attrs} />
  );
};
