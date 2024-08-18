import type { NextPage } from "next";
import Badge from "./badge";
import styles from "./category-list.module.css";

export type CategoryListType = {
  className?: string;
};

const CategoryList: NextPage<CategoryListType> = ({ className = "" }) => {
  return (
    <div className={[styles.categoryList, className].join(" ")}>
      <Badge
        propBackgroundColor="#0acf83"
        labtops="Headphone"
        propMinWidth="77px"
        propTextDecoration="none"
        propColor="#fff"
      />
      <Badge
        propBackgroundColor="unset"
        labtops="phones"
        propMinWidth="50px"
        propTextDecoration="unset"
        propColor="#7f7f7f"
      />
      <Badge
        propBackgroundColor="unset"
        labtops="Earpads"
        propMinWidth="55px"
        propTextDecoration="none"
        propColor="#7f7f7f"
      />
      <Badge labtops="Lab" />
    </div>
  );
};

export default CategoryList;
