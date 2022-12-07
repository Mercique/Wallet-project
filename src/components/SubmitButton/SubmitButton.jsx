import styles from "./SubmitButton.module.css";

export const SubmitButton = ({ className, name, ...attrs }) => {
  return (
    <button
      type="submit"
      className={`${styles.submitButton} ${className}`}
      {...attrs}
    >
      <span>{name}</span>
    </button>
  );
};
