import styles from "./Logo.module.css";

export function Logo() {
  console.log('x')
  return <a href="/" className={styles.logoImage}><img src="/logo.svg" width={50} height={50} alt={'logo'}/></a>;
}
