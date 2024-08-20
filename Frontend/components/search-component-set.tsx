import type { NextPage } from "next";
import React, { useState } from "react";
import styles from "./search-component-set.module.css";

export type SearchComponentSetType = {
  className?: string;
};

const SearchComponentSet: NextPage<SearchComponentSetType> = ({
  className = "",
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // You can add the logic to handle the search action here.
  };

  return (
    <div className={[styles.searchComponentSet, className].join(" ")}>
      <form onSubmit={handleSearch} className={styles.searchForm}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="What are you looking for?"
          value={searchQuery}
          onChange={handleInputChange}
        />
        <button type="submit" className={styles.searchButton}>
          <img
            className={styles.component2Icon}
            alt="Search"
            src="/component-2.svg" // Update this to a search icon if needed
          />
        </button>
      </form>
    </div>
  );
};

export default SearchComponentSet;
