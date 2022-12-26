import styles from "./Logo.module.css";

export function Logo({ width, height }) {
  return (
    <a
      href={document.cookie ? "/operations" : "/"}
      className={styles.logoImage}
    >
      <img src="/logo.svg" width={width} height={height} alt={"logo"} />
    </a>
  );
}
