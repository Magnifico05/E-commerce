import type { NextPage } from "next";
import Filter1 from "./filter1";
import styles from "./index.module.css";

export type FilterType = {
  className?: string;
};

const Filter: NextPage<FilterType> = ({ className = "" }) => {
  return (
    <div className={[styles.filter, className].join(" ")}>
      <Filter1 />
    </div>
  );
};

export default Filter;
