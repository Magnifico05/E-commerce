import React from "react";
import styles from "./fillWithUpArrow.module.css"; // Replace with your actual stylesheet

const ScrollToTopButton = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button className={styles.scrollToTopButton} onClick={handleScrollToTop}>
      <img
        className={styles.fillWithUpArrow}
        loading="lazy"
        alt="Scroll to Top"
        src="/fill-with-up-arrow.svg"
      />
    </button>
  );
};

export default ScrollToTopButton;
