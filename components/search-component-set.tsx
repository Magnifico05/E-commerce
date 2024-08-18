import type { NextPage } from "next";
import styles from "./search-component-set.module.css";

export type SearchComponentSetType = {
  className?: string;
};

const SearchComponentSet: NextPage<SearchComponentSetType> = ({
  className = "",
}) => {
  return (
    <div className={[styles.searchComponentSet, className].join(" ")}>
      <div className={styles.searchInput}>
        <a className={styles.whatAreYou}>What are you looking for?</a>
        <img className={styles.component2Icon} alt="" src="/component-2.svg" />
      </div>
    </div>
  );
};

export default SearchComponentSet;
