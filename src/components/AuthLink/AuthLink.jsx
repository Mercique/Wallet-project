import styles from "./AuthLink.module.css";
import { Link } from "react-router-dom";

export const AuthLink = ({ path, name }) => {
  return (
    <Link to={path} className={path === "/" ? `${styles.link} ${styles.linkReg}` : styles.link}>
      <span>{name}</span>
      <svg width="23" height="14" viewBox="0 0 23 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 7.6929L20.2264 7.6929L15.6674 12.0537L16.692 13.0337L23 6.99998L16.692 0.966176L15.6674 1.94622L20.2264 6.30697L0 6.30697V7.6929Z" fill="#787878"/>
      </svg>
    </Link>
  );
};
