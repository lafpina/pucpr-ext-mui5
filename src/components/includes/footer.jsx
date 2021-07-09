import styles from "../../styles/Home.module.css";
import Image from "next/image";
const Footer = () => (
  <footer className={styles.footer}>
    <a>
      <Image
        src="/gt-logo.png"
        alt="Dipano Logo"
        className={styles.logo}
        width={80}
        height={42}
      />
    </a>
  </footer>
);

export default Footer;
