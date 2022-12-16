import styles from "./InputAuth.module.css";

export const InputAuth = ({ id, labelName, error, ...attrs }) => {
  return (
    <div className={!error ? styles.inputBox : styles.inputBoxError}>
      <label htmlFor={id} className={styles.label}>{labelName}</label>
      <input id={id} className={styles.input} {...attrs} />
      { error && <span className={styles.inputError}>{error}</span> }
    </div>
  );
};
