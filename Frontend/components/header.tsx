import type { NextPage } from "next";
import Logo from "./logo";
import Header1 from "./header1";
import SearchComponentSet from "./search-component-set";
import styles from "./header.module.css";

export type HeaderType = {
  className?: string;
};

const Header: NextPage<HeaderType> = ({ className = "" }) => {
  return (
    <div className={[styles.header, className].join(" ")}>
      <nav className={styles.headerInner}>
        <nav className={styles.logoParent}>
          <Logo />
          <nav className={styles.navigation}>
            <div className={styles.header1}>
              <a href=''className={styles.home}>Home</a>
            </div>
            <div className={styles.header1}>
              <a className={styles.contact}>Contact</a>
            </div>
            <Header1 />
            <div className={styles.header1}>
              <a href='register/'className={styles.signUp}>Sign Up</a>
            </div>
          </nav>
        </nav>
      </nav>
      <div className={styles.searchCart}>
        <SearchComponentSet />
        <div className={styles.wishlistParent}>
          <img className={styles.wishlistIcon} alt="" src="/wishlist.svg" />
          <a href="cart/">
          <img
            className={styles.cart1WithBuy}
            loading="lazy"
            alt=""
            src="/cart1-with-buy.svg"
          />
          </a>
          <img
            className={styles.userIcon}
            loading="lazy"
            alt=""
            src="/user.svg"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
