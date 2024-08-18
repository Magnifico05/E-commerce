import type { NextPage } from "next";
import styles from "./logo.module.css";

export type LogoType = {
  className?: string;
};

const Logo: NextPage<LogoType> = ({ className = "" }) => {
  return (
    <div className={[styles.logo, className].join(" ")}>
      <a className={styles.exclusive}>Exclusive</a>
    </div>
  );
};

export default Logo;
