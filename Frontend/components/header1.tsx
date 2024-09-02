import type { NextPage } from "next";
import styles from "./header1.module.css";

export type Header1Type = {
  className?: string;
};

const Header1: NextPage<Header1Type> = ({ className = "" }) => {
  return (
    <div className={[styles.header, className].join(" ")}>
      <a href='login/'className={styles.about}>Login</a>
    </div>
  );
};

export default Header1;
